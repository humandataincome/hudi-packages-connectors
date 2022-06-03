import {
    AsyncUnzipInflate,
    AsyncZippable,
    FlateError,
    Unzip,
    unzip,
    UnzipFile,
    UnzipFileInfo,
    UnzipInflate,
    Unzipped,
    zip,
} from "fflate";
import {
    ValidateZipOptions,
    ValidatorAmazon,
    ValidatorDatasource,
    ValidatorFacebook, ValidatorGoogle,
    ValidatorInstagram, ValidatorLinkedIn, ValidatorNetflix
} from "./validator";
import {DataSourceCode, FileExtension} from "./descriptor";
import {Parser} from "./utils/parser";
import {ValidatorShopify} from "./validator/validator.shopify";
import Logger from "./utils/logger";

export interface ValidationReturn2 {
    zipFile: Uint8Array,
    includedFiles: string[],
    excludedFiles: string[],
}

interface StreamingObjectsSupport {
    readableStream: NodeJS.ReadableStream;
    returnObject: ValidationReturn2;
    validFiles: AsyncZippable;
    options: ValidateZipOptions;
}

interface FileBuilder {
    tmpChunks: Uint8Array[];
    finalChunk: Uint8Array | undefined;
    hasCorruptedChunk: boolean;
}

export class StreamZipping {
    private static readonly logger = new Logger("Files Validator");

    public static MAX_BYTE_FILE_SIZE = 6e6; //6 MB
    public static MIN_BYTE_FILE_SIZE = 30; //30 B

    static async validateZip(readableStream: NodeJS.ReadableStream, options: ValidateZipOptions = {}): Promise<ValidationReturn2> {
        const ret: ValidationReturn2 = {
            zipFile: new Uint8Array(),
            includedFiles: [],
            excludedFiles: [],
        }

        const support: StreamingObjectsSupport = {
            readableStream: readableStream,
            returnObject: ret,
            validFiles: {},
            options: options,
        };

        await this._validateZip(support);
        //BUILD NEW ZIP
        await this.zipFile(support);
        return ret;
    }

    private static async _validateZip(support: StreamingObjectsSupport) {
        await this.unzipFile(support);
    }

    private static zipFile(support: StreamingObjectsSupport) {
        return new Promise((resolve, reject) => {
            zip(support.validFiles, {},
                (err: FlateError | null, data: Uint8Array) => {
                    if(err) {
                        reject(err);
                    }
                    support.returnObject.zipFile = data;
                    resolve('Zipping ended');
                });
        });
    }

    private static unzipFile(support: StreamingObjectsSupport) {
        const unzipStream: Unzip = this.getUnzipStream(support);
        unzipStream.register(UnzipInflate); //can't be async

        return new Promise((resolve, reject) => {
            support.readableStream.on('error', function (error: Error) {
                reject(`Error: ${error.message}`);
            });
            support.readableStream.on('data', (chunk: Buffer) => {
                unzipStream.push(chunk);
            });
            support.readableStream.on('end', async () => {
                resolve('Reading stream in input ended');
            });
        });
    }


    private static getUnzipStream(support: StreamingObjectsSupport): Unzip {
        let fileBuilder: FileBuilder = {
            tmpChunks: [],
            finalChunk: undefined,
            hasCorruptedChunk: false,
        };

         return new Unzip((stream: UnzipFile) => {
             stream.ondata = async (err: FlateError | null, chunk: Uint8Array, final: boolean) => {
                if (err) {
                    console.log('An error occurred on ' + stream.name + ' file');
                }
                if (!fileBuilder.hasCorruptedChunk) {
                    this.composeFile(chunk, final, fileBuilder);
                }
                if (final && fileBuilder.finalChunk) {
                    if (fileBuilder.finalChunk.length > 0) {
                        if (this.isValidSize(fileBuilder.finalChunk, stream.name)) {
                            const extension = this.getFileExtension(stream.name);
                            if (extension) {
                                if (extension === FileExtension.ZIP) {
                                    /*
                                    const {Readable} = require('stream');
                                    const streamFile = Readable.from(fileBuilder.finalChunk.toString());

                                    const supportRecursive: StreamingObjectsSupport = {
                                        readableStream: streamFile,
                                        returnObject: support.returnObject,
                                        validFiles: support.validFiles,
                                        options: support.options,
                                    };
                                    await this._validateZip(supportRecursive);
                                    support.returnObject.includedFiles = supportRecursive.returnObject.includedFiles;
                                    support.returnObject.excludedFiles = supportRecursive.returnObject.excludedFiles;
                                    support.validFiles = supportRecursive.validFiles;
                                     */
                                } else {
                                    if (!fileBuilder.hasCorruptedChunk && this.isValidContent(extension, fileBuilder.finalChunk, stream.name)) {
                                        if (support.options.filterDataSource) {
                                            const validaPathName = this.getValidPathName(stream.name, support.options);
                                            if (validaPathName) {
                                                support.validFiles[validaPathName] = fileBuilder.finalChunk;
                                                support.returnObject.includedFiles.push(validaPathName);
                                            } else {
                                                support.returnObject.excludedFiles.push(stream.name);
                                            }
                                        } else {
                                            support.validFiles[stream.name] = fileBuilder.finalChunk;
                                            support.returnObject.includedFiles.push(stream.name);
                                        }
                                    } else {
                                        support.returnObject.excludedFiles.push(stream.name);
                                    }
                                }
                                //support.returnObject.excludedFiles.push(stream.name);
                            }
                        } else {
                            support.returnObject.excludedFiles.push(stream.name);
                        }
                    }
                    this.initFileBuilder(fileBuilder);
                }
            };
            stream.start();
        });
    }

    private static initFileBuilder(tmpSupport: FileBuilder): void {
        tmpSupport.tmpChunks = [];
        tmpSupport.finalChunk = undefined;
        tmpSupport.hasCorruptedChunk = false;
    }

    private static composeFile (chunk: Uint8Array, finalChunk: boolean, tmpSupport: FileBuilder,  optionsValidation: ValidateZipOptions = {}){
        if(chunk) {
            if (!finalChunk) {
                tmpSupport.tmpChunks.push(chunk);
            } else {
                //final chunk
                if (!tmpSupport.hasCorruptedChunk) {
                    tmpSupport.tmpChunks.push(chunk);
                    tmpSupport.finalChunk = this.mergeBuffers(tmpSupport.tmpChunks);
                }
            }
        } else {
            tmpSupport.hasCorruptedChunk = true;
            this.logger.log('info', `Corrupted chunk`, 'composeFile');
        }
    }

    private static getValidPathName(pathName: string, optionsValidation: ValidateZipOptions): string | undefined {
        if (optionsValidation && optionsValidation.filterDataSource && optionsValidation.filterDataSource.dataSourceCode) {
            const datasource = this.validatorSelector(optionsValidation.filterDataSource?.dataSourceCode);
            if (datasource) {
                return datasource.getValidPath(pathName, optionsValidation);
            }
        }
        return undefined;
    }

    private static mergeBuffers(buffers: Uint8Array[]): Uint8Array {
        const finalBuffer = new Uint8Array(buffers.reduce(
            (previousBufferLength: number, currentBuffer: Uint8Array) => previousBufferLength + currentBuffer.length,
            0
        ));
        let lastOffset = 0;
        buffers.forEach((buffer: Uint8Array) => {
            finalBuffer.set(buffer, lastOffset);
            lastOffset += buffer.length;
        });
        return finalBuffer;
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
     * @param file - file as Buffer
     * @param pathName - evaluated file name
     * @param maxSize - max file's size in bytes, MAX_BYTE_FILE_SIZE as default.
     * @param minSize - min file's size in bytes, MIN_BYTE_FILE_SIZE as default.
     * @return TRUE if the file's size is between the minSize and the maxSize, FALSE otherwise
     */
    static isValidSize(file: Uint8Array, pathName: string, maxSize: number = this.MAX_BYTE_FILE_SIZE, minSize: number = this.MIN_BYTE_FILE_SIZE): boolean {
        const size = file.length;
        if (size < maxSize) {
            if (size > minSize) {
                return true;
            } else {
                this.logger.log('info', `File \"${pathName}\" (${size} bytes) is too Small to be validated'`, 'isValidSize');
            }
        } else {
            this.logger.log('info', `File \"${pathName}\" (${size} bytes) is too Big to be validated'`, 'isValidSize');
        }
        return false;
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

    /**
     * @param obj - an object in input
     * @return FALSE if this is a not empty object (it has at least a key and a parameter not empty), TRUE otherwise.
     */
    static objectIsEmpty(obj: any): boolean {
        if (Object.getPrototypeOf(obj) === Object.prototype) {
            if (obj && Object.keys(obj).length > 0) {
                const reducer = (previousValue: boolean, currentValue: string) => {
                    return (obj[currentValue] === '') && previousValue;
                };
                return Object.keys(obj).reduce(reducer, true);
            }
            return true;
        }
        return true;
    }

    static isCSVFieldValid(value: any): boolean {
        try {
            return (value !== undefined && value !== '' && value !== 'N/A');
        } catch {
            return false;
        }
    }

    /**
     * @param dataSourceCode - a DataSourceCode
     * @return the corresponded instance of the DataSourceCode's Validation Class. E.g. DataSourceCode.INSTAGRAM -> ValidatorInstagram.getInstance(). Return undefined if none Validation class matches.
     */
    static validatorSelector(dataSourceCode: DataSourceCode): ValidatorDatasource | undefined {
        switch (dataSourceCode) {
            case DataSourceCode.INSTAGRAM:
                return ValidatorInstagram.getInstance();
            case DataSourceCode.FACEBOOK:
                return ValidatorFacebook.getInstance();
            case DataSourceCode.AMAZON:
                return ValidatorAmazon.getInstance();
            case DataSourceCode.GOOGLE:
                return ValidatorGoogle.getInstance();
            case DataSourceCode.NETFLIX:
                return ValidatorNetflix.getInstance();
            case DataSourceCode.LINKEDIN:
                return ValidatorLinkedIn.getInstance();
            case DataSourceCode.SHOPIFY_CUSTOMERS:
                return ValidatorShopify.getInstance();
            case DataSourceCode.SHOPIFY_DISCOUNTS:
                return ValidatorShopify.getInstance();
            case DataSourceCode.SHOPIFY_ORDERS:
                return ValidatorShopify.getInstance();
            case DataSourceCode.SHOPIFY_PRODUCTS:
                return ValidatorShopify.getInstance();
            default:
                this.logger.log('info', `${dataSourceCode} is not a valid DataSourceCode`, 'validatorSelector');
                return undefined;
        }
    }


    static async validateZipAsync(zipFile: Buffer): Promise<void> {
        const decompressed = await unzip(zipFile, {
                filter(file: UnzipFileInfo) {
                    if (file.size > 0) {
                        return ValidatorFacebook.getInstance().getValidPath(file.name) !== undefined;
                    }
                    return false;
                }
            },
            (err: FlateError | null, data: Unzipped) => {
                console.log(data);
            });
        console.log("AAAAA");
    }
}
