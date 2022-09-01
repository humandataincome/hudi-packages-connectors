import {from, Observable, Subscriber} from "rxjs";
import {ValidatorFiles, ValidatorObject} from "../validator";
import {DataAggregator, DataSourceCode, FileExtension, LanguageCode} from "../../descriptor";
import {FlateError, Unzip, UnzipFile, UnzipInflate, unzipSync} from "fflate";
import {Selector} from "../selector";
import Logger from "../logger";
import {ProcessorErrorEnums} from "../utils.error";
import {Mutex} from "async-mutex";

export interface ProcessingZipOptions {
    throwExceptions?: boolean;
    maxBytesPerFile?: number;
}

export interface ProcessingReturn {
    aggregatorModel: DataAggregator
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
    subscriber?: Subscriber<ProcessingZipStatus>;
    code: DataSourceCode;
    languageCode?: LanguageCode | undefined;
    filesToParse: FilesBuilder;
    options: ProcessingZipOptions;
}

interface FilesBuilder {
    [fileName: string]: {fileChunk: Uint8Array, isCorrupted: boolean, isTooLarge?: boolean};
}

export class ProcessorFiles {
    public static MAX_BYTE_FILE_SIZE = 500e6; //500 MB
    private static readonly logger = new Logger("Processor Files");

    static processingZipStream(readableStream: ReadableStream, code: DataSourceCode, options: ProcessingZipOptions = {}): Observable<ProcessingZipStatus> {
        return new Observable<ProcessingZipStatus>((subscriber: Subscriber<ProcessingZipStatus>) => {
            const model = Selector.getInitAggregator(code);
            if (model) {
                const processingReturn: ProcessingReturn = {
                    aggregatorModel: model
                }
                const support: ProcessingObjectSupport = {
                    readableStream: readableStream,
                    returnObject: processingReturn,
                    subscriber: subscriber,
                    code: code,
                    filesToParse: {},
                    options: options,
                }

                from(this.unzipFileFromStream(support)).subscribe({
                    error(error) {
                        subscriber.error(error);
                    },
                    async complete() {
                        try {
                            for (let pathName in support.filesToParse) {
                                const fileContent = support.filesToParse[pathName].fileChunk;
                                await Selector.getAggregatorBuilder(support.code, Buffer.from(fileContent, fileContent.byteOffset, fileContent.length), pathName, support.returnObject.aggregatorModel, {language: support.languageCode});
                            }
                            if (!ValidatorObject.objectIsEmpty(model)) {
                                model.creationDate = new Date();
                                subscriber.next(
                                    {
                                        status: ProcessingStatus.DONE,
                                        processingResult: processingReturn
                                    });
                            } else {
                                throw Error(`${ProcessorErrorEnums.NOT_RELEVANT_INFO_AGGREGATED}: file zip has not any relevant file for the aggregator model`);
                            }
                            subscriber.complete();
                        } catch (error: any) {
                            subscriber.next(
                                {
                                    status: ProcessingStatus.ERROR,
                                });
                            (error && error.message) && (ProcessorFiles.logger.log('error', error.message, 'processingZipStream'));
                            if (options.throwExceptions != undefined && options.throwExceptions) {
                                throw Error(error);
                            } else {
                                subscriber.error(error);
                            }
                        }
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

    private static buildFile(chunk: Uint8Array, fileName: string, support: ProcessingObjectSupport) {
        if (chunk) {
            if (support.filesToParse[fileName]) {
                if (!support.filesToParse[fileName].isCorrupted) {
                    if (!support.filesToParse[fileName].isTooLarge) {
                        if (support.filesToParse[fileName].fileChunk.length > 0) {
                            const maxBytesFile = (support.options && support.options.maxBytesPerFile) ? support.options.maxBytesPerFile : this.MAX_BYTE_FILE_SIZE;
                            const fileLength = support.filesToParse[fileName].fileChunk.length;
                            const chunkLength = chunk.length;
                            const finalBuffer = new Uint8Array(fileLength + chunkLength);
                            finalBuffer.set(new Uint8Array(support.filesToParse[fileName].fileChunk), 0);
                            finalBuffer.set(new Uint8Array(chunk), fileLength);
                            support.filesToParse[fileName] = {fileChunk: finalBuffer, isCorrupted: support.filesToParse[fileName].isCorrupted};
                            if (fileLength + chunkLength > maxBytesFile) {
                                support.filesToParse[fileName] = {
                                    fileChunk: new Uint8Array,
                                    isCorrupted: support.filesToParse[fileName].isCorrupted,
                                    isTooLarge: true
                                };
                            }
                        }
                    }
                }
            } else {
                support.filesToParse[fileName] = {fileChunk: chunk, isCorrupted: false};
            }
        } else {
            support.filesToParse[fileName] = {fileChunk: new Uint8Array, isCorrupted: true}
        }
    }

    private static getUnzipStream(support: ProcessingObjectSupport): Unzip {
        const mutex = new Mutex()
        return new Unzip((stream: UnzipFile) => {
            stream.ondata = async (error: FlateError | null, chunk: Uint8Array, final: boolean) => {
                const release = await mutex.acquire()
                if (error) {
                    if ((!support.filesToParse[stream.name]) || (support.filesToParse[stream.name] && !support.filesToParse[stream.name].isCorrupted)) {
                        this.logger.log('error', 'An error occurred while streaming: ' + stream.name, 'getUnzipStream');
                        support.filesToParse[stream.name] = {
                            fileChunk: new Uint8Array(),
                            isCorrupted: true
                        };
                    }
                }
                this.buildFile(chunk, stream.name, support);
                if (final) {
                    if (!support.filesToParse[stream.name].isCorrupted && !support.filesToParse[stream.name].isTooLarge) {
                        await this.processFile(support.filesToParse[stream.name].fileChunk, stream.name, support)
                    }
                }
                release();
            };
            stream.start();
        });
    }

    private static async processFile(fileContent: Uint8Array, pathName: string, support: ProcessingObjectSupport, recursiveZipPrefix?: string) {
        if (!ValidatorObject.isDirectory(pathName)) {
            if (fileContent && fileContent.length > 0) {
                (recursiveZipPrefix) && (pathName = recursiveZipPrefix + '/' + pathName);
                const extension = ValidatorFiles.getFileExtension(pathName);
                if (extension) {
                    if (extension === FileExtension.ZIP) {
                        const recursiveZipFiles = unzipSync(fileContent);
                        for (let key in recursiveZipFiles) {
                            await this.processFile(recursiveZipFiles[key], key, support, pathName.slice(0, -4));
                        }
                    } else {
                        if (ValidatorFiles.isValidContent(extension, fileContent, pathName)) {
                            const validPathName = Selector.getValidator(support.code)!.getValidPath(pathName);
                            if (validPathName) {
                                if (Selector.serviceNeedsLanguageCode(support.code)) {
                                    if (!support.languageCode) {
                                        support.languageCode = await (Selector.getValidator(support.code))?.getLanguage(pathName, fileContent);
                                    }
                                    if (support.languageCode) {
                                        await Selector.getAggregatorBuilder(support.code, Buffer.from(fileContent, fileContent.byteOffset, fileContent.length), pathName, support.returnObject.aggregatorModel, {language: support.languageCode});
                                        delete support.filesToParse[pathName];
                                    }
                                } else {
                                    await Selector.getAggregatorBuilder(support.code, Buffer.from(fileContent, fileContent.byteOffset, fileContent.length), pathName, support.returnObject.aggregatorModel);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
