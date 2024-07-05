import { from, Observable, Subscriber } from 'rxjs';
import { ValidatorFiles, ValidatorObject } from '../validator';
import {
    DataAggregator,
    FileExtension,
    GDPRDataSourceCode,
    LanguageCode,
} from '../descriptor';
import { FlateError, Unzip, UnzipFile, UnzipInflate, unzipSync } from 'fflate';
import { SelectorUtils } from '../utils/selector.utils';
import LoggerUtils from '../utils/logger.utils';
import { ProcessorErrorEnums } from '../enums/errors.enum';
import { Mutex } from 'async-mutex';

export interface ProcessingZipOptions {
    throwExceptions?: boolean;
    maxBytesPerFile?: number;
}

export interface ProcessingReturn {
    aggregatorModel: DataAggregator;
}

export enum ProcessingStatus {
    PROCESSING = 'PROCESSING',
    DONE = 'DONE',
    ERROR = 'ERROR',
}

export interface ProcessingZipStatus {
    status: ProcessingStatus;
    bytesRead?: number;
    processingResult?: ProcessingReturn | undefined;
}

export interface ProcessingObjectSupport {
    readableStreams: ReadableStream[];
    returnObject: ProcessingReturn;
    subscriber: Subscriber<ProcessingZipStatus>;
    code: GDPRDataSourceCode;
    languageCode?: LanguageCode | undefined;
    filesToParse: FilesBuilder;
    options: ProcessingZipOptions;
}

interface FilesBuilder {
    [fileName: string]: {
        fileChunk: Uint8Array;
        isCorrupted: boolean;
        isTooLarge?: boolean;
        lock: Mutex;
    };
}

export class ProcessorFiles {
    public static MAX_BYTE_FILE_SIZE = 500e6; //500 MB
    private static readonly logger = new LoggerUtils('Processor Files');

    /**
     * @param readableStreams - array of file as ReadableStream (can be used with data sources composed by multiple files)
     * @param code - code of the Data source
     * @param options - optional parameters defined into ProcessingZipOptions interface
     */
    static processingZipStream(
        readableStreams: ReadableStream[],
        code: GDPRDataSourceCode,
        options: ProcessingZipOptions = {},
    ): Observable<ProcessingZipStatus> {
        return new Observable<ProcessingZipStatus>(
            (subscriber: Subscriber<ProcessingZipStatus>) => {
                const model = SelectorUtils.getInitAggregator(code);
                if (model) {
                    const processingReturn: ProcessingReturn = {
                        aggregatorModel: model,
                    };
                    const support: ProcessingObjectSupport = {
                        readableStreams,
                        returnObject: processingReturn,
                        subscriber,
                        code,
                        filesToParse: {},
                        options,
                    };

                    from(this.unzipFileFromStream(support)).subscribe({
                        error(error) {
                            subscriber.error(error);
                        },
                        async complete() {
                            try {
                                for (const pathName in support.filesToParse) {
                                    const fileContent =
                                        support.filesToParse[pathName]
                                            .fileChunk;
                                    await SelectorUtils.getAggregatorBuilder(
                                        support.code,
                                        Buffer.from(
                                            fileContent,
                                            fileContent.byteOffset,
                                            fileContent.length,
                                        ),
                                        pathName,
                                        support.returnObject.aggregatorModel,
                                        { language: support.languageCode },
                                    );
                                }
                                if (!ValidatorObject.objectIsEmpty(model)) {
                                    model.creationDate = new Date();
                                    subscriber.next({
                                        status: ProcessingStatus.DONE,
                                        processingResult: processingReturn,
                                    });
                                } else {
                                    throw Error(
                                        `${ProcessorErrorEnums.NOT_RELEVANT_INFO_AGGREGATED}: file zip has not any relevant file for the aggregator model`,
                                    );
                                }
                                subscriber.complete();
                            } catch (error: any) {
                                subscriber.next({
                                    status: ProcessingStatus.ERROR,
                                });
                                error &&
                                    error.message &&
                                    ProcessorFiles.logger.log(
                                        'error',
                                        error.message,
                                        'processingZipStream',
                                    );
                                if (
                                    options.throwExceptions !== undefined &&
                                    options.throwExceptions
                                ) {
                                    throw Error(error);
                                } else {
                                    subscriber.error(error);
                                }
                            }
                        },
                    });
                }
            },
        );
    }
    private static async unzipFileFromStream(support: ProcessingObjectSupport) {
        const unzipStream: Unzip = this.getUnzipStream(support);
        let bytesTotal = 0;
        unzipStream.register(UnzipInflate);
        for (const stream of support.readableStreams) {
            const reader = stream.getReader();
            for (let finished = false; !finished; ) {
                const { done, value } = await reader.read();
                if (value) {
                    bytesTotal = bytesTotal + (value as Uint8Array).byteLength;
                    support.subscriber.next({
                        bytesRead: bytesTotal,
                        status: ProcessingStatus.PROCESSING,
                    });
                    unzipStream.push(value);
                }
                finished = done;
            }
        }
    }

    private static async buildFile(
        chunk: Uint8Array,
        fileName: string,
        support: ProcessingObjectSupport,
    ) {
        if (chunk) {
            if (support.filesToParse[fileName]) {
                if (!support.filesToParse[fileName].isCorrupted) {
                    if (!support.filesToParse[fileName].isTooLarge) {
                        if (
                            support.filesToParse[fileName].fileChunk.length > 0
                        ) {
                            const release =
                                await support.filesToParse[
                                    fileName
                                ].lock.acquire();
                            const maxBytesFile =
                                support.options &&
                                support.options.maxBytesPerFile
                                    ? support.options.maxBytesPerFile
                                    : this.MAX_BYTE_FILE_SIZE;
                            const fileLength =
                                support.filesToParse[fileName].fileChunk.length;
                            const chunkLength = chunk.length;
                            const finalBuffer = new Uint8Array(
                                fileLength + chunkLength,
                            );
                            finalBuffer.set(
                                new Uint8Array(
                                    support.filesToParse[fileName].fileChunk,
                                ),
                                0,
                            );
                            finalBuffer.set(new Uint8Array(chunk), fileLength);
                            support.filesToParse[fileName] = {
                                fileChunk: finalBuffer,
                                isCorrupted:
                                    support.filesToParse[fileName].isCorrupted,
                                lock: new Mutex(),
                            };
                            if (fileLength + chunkLength > maxBytesFile) {
                                support.filesToParse[fileName] = {
                                    fileChunk: new Uint8Array(),
                                    isCorrupted:
                                        support.filesToParse[fileName]
                                            .isCorrupted,
                                    isTooLarge: true,
                                    lock: new Mutex(),
                                };
                            }
                            release();
                        }
                    }
                }
            } else {
                support.filesToParse[fileName] = {
                    fileChunk: chunk,
                    isCorrupted: false,
                    lock: new Mutex(),
                };
            }
        } else {
            support.filesToParse[fileName] = {
                fileChunk: new Uint8Array(),
                isCorrupted: true,
                lock: new Mutex(),
            };
        }
    }

    private static getUnzipStream(support: ProcessingObjectSupport): Unzip {
        return new Unzip((stream: UnzipFile) => {
            stream.ondata = async (
                error: FlateError | null,
                chunk: Uint8Array,
                final: boolean,
            ) => {
                if (error) {
                    if (
                        !support.filesToParse[stream.name] ||
                        (support.filesToParse[stream.name] &&
                            !support.filesToParse[stream.name].isCorrupted)
                    ) {
                        this.logger.log(
                            'error',
                            'An error occurred while streaming: ' + stream.name,
                            'getUnzipStream',
                        );
                        support.filesToParse[stream.name] = {
                            fileChunk: new Uint8Array(),
                            isCorrupted: true,
                            lock: new Mutex(),
                        };
                    }
                }
                await this.buildFile(chunk, stream.name, support);
                if (final) {
                    if (
                        !support.filesToParse[stream.name].isCorrupted &&
                        !support.filesToParse[stream.name].isTooLarge
                    ) {
                        await this.processFile(
                            support.filesToParse[stream.name].fileChunk,
                            stream.name,
                            support,
                        );
                    }
                }
            };
            stream.start();
        });
    }

    private static async processFile(
        fileContent: Uint8Array,
        pathName: string,
        support: ProcessingObjectSupport,
        recursiveZipPrefix?: string,
    ) {
        if (!ValidatorObject.isDirectory(pathName)) {
            if (fileContent && fileContent.length > 0) {
                recursiveZipPrefix &&
                    (pathName = recursiveZipPrefix + '/' + pathName);
                const extension = ValidatorFiles.getFileExtension(pathName);
                if (extension) {
                    if (extension === FileExtension.ZIP) {
                        const recursiveZipFiles = unzipSync(fileContent);
                        for (const key in recursiveZipFiles) {
                            await this.processFile(
                                recursiveZipFiles[key],
                                key,
                                support,
                                pathName.slice(0, -4),
                            );
                        }
                    } else {
                        if (
                            ValidatorFiles.isValidContent(
                                extension,
                                fileContent,
                                pathName,
                            )
                        ) {
                            const validPathName = SelectorUtils.getValidator(
                                support.code,
                            )?.getValidPath(pathName);
                            if (validPathName) {
                                if (
                                    SelectorUtils.serviceNeedsLanguageCode(
                                        support.code,
                                    )
                                ) {
                                    if (!support.languageCode) {
                                        support.languageCode =
                                            await SelectorUtils.getValidator(
                                                support.code,
                                            )?.getLanguage(
                                                pathName,
                                                fileContent,
                                            );
                                    }
                                    if (support.languageCode) {
                                        await SelectorUtils.getAggregatorBuilder(
                                            support.code,
                                            Buffer.from(
                                                fileContent,
                                                fileContent.byteOffset,
                                                fileContent.length,
                                            ),
                                            pathName,
                                            support.returnObject
                                                .aggregatorModel,
                                            { language: support.languageCode },
                                        );
                                        delete support.filesToParse[pathName];
                                    }
                                } else {
                                    await SelectorUtils.getAggregatorBuilder(
                                        support.code,
                                        Buffer.from(
                                            fileContent,
                                            fileContent.byteOffset,
                                            fileContent.length,
                                        ),
                                        pathName,
                                        support.returnObject.aggregatorModel,
                                    );
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
