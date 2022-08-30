import {from, Observable, Subscriber} from "rxjs";
import {
    ValidatorObject
} from "../validator";
import {DataAggregator, DataSourceCode, FileExtension} from "../../descriptor";
import {FlateError, Unzip, UnzipFile, UnzipInflate, unzipSync} from "fflate";
import {Selector} from "../selector";
import {Parser} from "../parser";
import Logger from "../logger";

export interface ProcessingReturn {
    aggregatorModel: DataAggregator,
    usedFiles: string[],
    notUsedFiles: string[],
}

export enum ProcessingStatus {
    PROCESSING = 'PROCESSING',
    DONE = 'DONE',
    ERROR = 'ERROR'
}

export interface ProcessingZipStatus {
    status: ProcessingStatus;
    bytesRead?: number;
    processingResult?: ProcessingReturn | undefined;
}

export interface ProcessingObjectSupport {
    readableStream: ReadableStream;
    returnObject: ProcessingReturn;
    subscriber?: Subscriber<ProcessingZipStatus>
    code: DataSourceCode
}

interface FilesBuilder {
    [fileName: string]: {fileChunk: Uint8Array, isCorrupted: boolean};
}

export class ProcessorFiles {
    private static readonly logger = new Logger("Processor Files");

    static processingZipStream(readableStream: ReadableStream, code: DataSourceCode): Observable<ProcessingZipStatus> {
        return new Observable<ProcessingZipStatus>((subscriber: Subscriber<ProcessingZipStatus>) => {
            const model = Selector.getInitAggregator(code);
            if (model) {
                const processingReturn: ProcessingReturn = {
                    aggregatorModel: model,
                    usedFiles: [],
                    notUsedFiles: [],
                }
                const support: ProcessingObjectSupport = {
                    readableStream: readableStream,
                    returnObject: processingReturn,
                    subscriber: subscriber,
                    code: code
                }
                from(this.unzipFileFromStream(support)).subscribe({
                    error(error) {
                        subscriber.error(error);
                    },
                    complete() {
                        if (!ValidatorObject.objectIsEmpty(model)) {
                            subscriber.next(
                                {
                                    status: ProcessingStatus.DONE,
                                    processingResult: processingReturn
                                });
                        } else {
                            subscriber.next(
                                {
                                    status: ProcessingStatus.ERROR
                                });
                        }
                        subscriber.complete();
                    }
                });
            }
        });
    }
    private static async unzipFileFromStream(support: ProcessingObjectSupport) {
        const unzipStream: Unzip = this.getUnzipStream(support);
        let bytesTotal = 0;
        unzipStream.register(UnzipInflate); //can't be async otherwise the RAM usage would be too much
        if (support.readableStream) {
            const reader = support.readableStream.getReader();
            for (let finished = false; !finished;) {
                const {done, value} = await reader.read();
                if (value) {
                    bytesTotal =  bytesTotal + (<Uint8Array>value).byteLength;
                    if (support.subscriber) {
                        support.subscriber.next(
                            {
                                bytesRead: bytesTotal,
                                status: ProcessingStatus.PROCESSING
                            });
                    }
                    unzipStream.push(value);
                }
                finished = done;
            }
        }
    }

    private static buildFile(file: FilesBuilder, chunk: Uint8Array, fileName: string) {
        if (chunk) {
            if (file[fileName]) {
                if (!file[fileName].isCorrupted) {
                    if (file[fileName].fileChunk.length > 0) {
                        const fileLength = file[fileName].fileChunk.length;
                        const chunkLength = chunk.length;
                        const finalBuffer = new Uint8Array(fileLength + chunkLength);
                        finalBuffer.set(new Uint8Array(file[fileName].fileChunk), 0);
                        finalBuffer.set(new Uint8Array(chunk), fileLength);
                        file[fileName] = {fileChunk: finalBuffer, isCorrupted: file[fileName].isCorrupted};
                    }
                }
            } else {
                file[fileName] = {fileChunk: chunk, isCorrupted: false};
            }
        } else {
            file[fileName] = {fileChunk: new Uint8Array, isCorrupted: true}
        }
    }

    private static getUnzipStream(support: ProcessingObjectSupport): Unzip {
        let file: FilesBuilder = {};
        return new Unzip((stream: UnzipFile) => {
            stream.ondata = async (error: FlateError | null, chunk: Uint8Array, final: boolean) => {
                if (error) {
                    if ((!file[stream.name]) || (file[stream.name] && !file[stream.name].isCorrupted)) {
                        this.logger.log('error', 'An error occurred while streaming: ' + stream.name, 'getUnzipStream');
                        file[stream.name] = {
                            fileChunk: new Uint8Array(),
                            isCorrupted: true
                        };
                        support.returnObject.notUsedFiles.push(stream.name);
                    }
                }
                this.buildFile(file, chunk, stream.name);
                if (final) {
                    await this.processFile(file[stream.name].fileChunk, stream.name, support);
                    delete file[stream.name];
                }
            };
            stream.start();
        });
    }

    private static async processFile(fileContent: Uint8Array, pathName: string, support: ProcessingObjectSupport, recursiveZipPrefix?: string) {
        if (!ValidatorObject.isDirectory(pathName)) {
            if (fileContent && fileContent.length > 0) {
                (recursiveZipPrefix) && (pathName = recursiveZipPrefix + '/' + pathName);
                const extension = this.getFileExtension(pathName);
                if (extension) {
                    if (extension === FileExtension.ZIP) {
                        const recursiveZipFiles = unzipSync(fileContent);
                        for (let key in recursiveZipFiles) {
                            await this.processFile(recursiveZipFiles[key], key, support, recursiveZipPrefix ? recursiveZipPrefix + '/' + pathName.slice(0, -4) : pathName.slice(0, -4));
                        }
                    } else {
                        if (this.isValidContent(extension, fileContent, pathName)) {
                            pathName = recursiveZipPrefix ? recursiveZipPrefix + '/' + pathName : pathName;
                            const validPathName = Selector.getValidator(support.code)!.getValidPath(pathName);
                            if (validPathName) {
                                await Selector.getAggregatorBuilder(support.code, Buffer.from(fileContent, fileContent.byteOffset, fileContent.length), pathName, support.returnObject.aggregatorModel);
                                support.returnObject.usedFiles.push(pathName);
                            } else {
                                support.returnObject.notUsedFiles.push(pathName);
                            }
                        } else {
                            support.returnObject.notUsedFiles.push(pathName);
                        }
                    }
                } else {
                    support.returnObject.notUsedFiles.push(pathName);
                }
            } else {
                support.returnObject.notUsedFiles.push(pathName);
            }
        }
    }

    /**
     * @param fileName - name of the file
     * @return FileExtension if the name matches one of the supported extensions, undefined otherwise
     */
    static getFileExtension(fileName: string): FileExtension | undefined {
        let extension = fileName.split('.').pop();
        if (extension) {
            return FileExtension[extension.toUpperCase() as keyof typeof FileExtension];
        }
        this.logger.log('info', `Extension of \'${fileName}\' hasn't been recognized`, 'getFileExtension');
        return undefined;
    }

    /**
     * @param extension - extension of the file (e.g. json, csv, txt)
     * @param file - file as buffer
     * @param pathName - evaluated file name
     * @return TRUE if the file is valid, FALSE otherwise
     */
    static isValidContent(extension: FileExtension, file: Uint8Array, pathName: string): boolean {
        switch (extension) {
            case FileExtension.JSON:
                return this.validateJSON(file, pathName);
            case FileExtension.JS:
                const fileJson = Parser.extractJsonFromTwitterFile(Buffer.from(file, file.byteOffset, file.length));
                if (fileJson) {
                    return this.validateJSON(fileJson, pathName);
                }
                return false;
            case FileExtension.CSV:
                return this.validateCSV(file, pathName);
            default:
                return true;
        }
    }

    /**
     * @param file - file as buffer
     * @param pathName - evaluated file name
     * @return TRUE if the file is a valid JSON, FALSE otherwise
     */
    static validateJSON(file: Uint8Array, pathName?: string): boolean {
        try {
            return !!JSON.parse(new TextDecoder().decode(file));
        } catch (error) {
            (pathName)
                ? this.logger.log('info', `File \"${pathName}\" is not a valid JSON`, 'validateJSON')
                : this.logger.log('info', `File is not a valid JSON`, 'validateJSON');
            return false;
        }
    }

    /**
     * @param file - file as buffer
     * @param pathName - evaluated file name
     * @return TRUE if the file is a valid CSV, FALSE otherwise
     */
    static validateCSV(file: Uint8Array, pathName?: string): boolean {
        try {
            return !!Parser.parseCSVfromBuffer(Buffer.from(file, file.byteOffset, file.length));
        } catch (error) {
            (pathName)
                ? this.logger.log('info', `File \"${pathName}\" is not a valid CSV`, 'validateCSV')
                : this.logger.log('info', `File is not a valid CSV`, 'validateCSV');
            return false;
        }
    }
}
