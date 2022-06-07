import {
    AsyncZippable,
    FlateError,
    Unzip,
    unzip,
    UnzipFile,
    UnzipInflate,
    Unzipped, unzipSync,
    zip,
} from "fflate";
import {
    ValidateZipOptions, ValidationErrorEnums,
    ValidatorAmazon,
    ValidatorDatasource,
    ValidatorFacebook, ValidatorGoogle,
    ValidatorInstagram, ValidatorLinkedIn, ValidatorNetflix, ValidatorShopify
} from "./validator";
import {DataSourceCode, FileExtension} from "./descriptor";
import {Parser} from "./utils/parser";

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
    recursiveZipPrefix?: string;
}

interface FileBuilder {
    [fileName: string]: {fileChunk: Uint8Array, isCorrupted: boolean};
}

export class StreamZipping {
    private static readonly logger = new Logger("Files Validator");

    public static MAX_BYTE_FILE_SIZE = 6e6; //6 MB
    public static MIN_BYTE_FILE_SIZE = 30; //30 B
    public static MAX_BYTE_ZIP = 1e9; //1 GB

    static async validateZipStream(readableStream: NodeJS.ReadableStream, options: ValidateZipOptions = {}): Promise<ValidationReturn2 | undefined> {
        try {
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

            await this.unzipFileFromStream(support);
            await this.zipFile(support);
            if (ret.zipFile.length > this.MAX_BYTE_ZIP) {
                throw new Error(`${ValidationErrorEnums.VALIDATED_FILES_TOO_BIG}`);
            }
            if (ret.includedFiles.length === 0) {
                throw new Error(`${ValidationErrorEnums.NOT_VALID_FILES_ERROR}`);
            }
            return ret;
        } catch(error: any) {
            (error && error.message) && (this.logger.log('error', error.message, 'validateZIP'));
            if (options && options.throwExceptions !== undefined && options.throwExceptions) {
                throw error;
            }
        }
        return undefined;
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

    private static unzipFileFromStream(support: StreamingObjectsSupport) {
        const unzipStream: Unzip = this.getUnzipStream(support);
        unzipStream.register(UnzipInflate); //can't be async

        return new Promise((resolve, reject) => {
            support.readableStream.on('error', (error: Error) => {
                reject(`Error: ${error.message}`);
            });
            support.readableStream.on('data', (chunk: Buffer) => {
                unzipStream.push(chunk);
            });
            support.readableStream.on('end', () => {
                resolve('Reading stream in input ended');
            });
        });
    }

    private static buildFile(file: FileBuilder, chunk: Uint8Array, fileName: string) {
        if (chunk) {
            if (file[fileName] && !file[fileName].isCorrupted && file[fileName].fileChunk.length > 0 ) {
                const finalBuffer = new Uint8Array(file[fileName].fileChunk.length + chunk.length);
                finalBuffer.set(new Uint8Array(file[fileName].fileChunk), 0);
                finalBuffer.set(new Uint8Array(chunk), file[fileName].fileChunk.length);
                file[fileName] = {fileChunk: finalBuffer, isCorrupted: file[fileName].isCorrupted};
            } else {
                file[fileName] = {fileChunk: chunk, isCorrupted: false};
            }
        } else {
            file[fileName] = {fileChunk: new Uint8Array, isCorrupted: true}
        }
    }

    private static getUnzipStream(support: StreamingObjectsSupport): Unzip {
        let file: FileBuilder = {};
        return new Unzip((stream: UnzipFile) => {
            stream.ondata = (err: FlateError | null, chunk: Uint8Array, final: boolean) => {
                if (err) {
                    console.log('An error occurred on ' + stream.name + ' file');
                }
                this.buildFile(file, chunk, stream.name);
                //console.log(file)
                if (final && !file[stream.name].isCorrupted) {
                    this.filterFile(file[stream.name].fileChunk, stream.name, support);
                    delete file[stream.name]; //= new Uint8Array()
                }
            };
            stream.start();
        });
    }

    private static filterFile(fileContent: Uint8Array, fileName: string, support: StreamingObjectsSupport, recursiveZipPrefix?: string) {
        if (!this.isDirectory(fileName)) {
            if (fileContent && fileContent.length > 0) {
                (recursiveZipPrefix) && (fileName = recursiveZipPrefix+'/'+fileName);
                if (this.isValidSize(fileContent, fileName)) {
                    const extension = this.getFileExtension(fileName);
                    if (extension) {
                        if (extension === FileExtension.ZIP) {
                            const recursiveZipFiles = unzipSync(fileContent); //await this.validateZipSync(fileContent);
                            for (let key in recursiveZipFiles) {
                                this.filterFile(recursiveZipFiles[key], key, support, recursiveZipPrefix ? recursiveZipPrefix+'/'+fileName.slice(0, -4) : fileName.slice(0, -4));
                            }
                        } else {
                            if (this.isValidContent(extension, fileContent, fileName)) {
                                if (support.options.filterDataSource) {
                                    let validPathName = (recursiveZipPrefix)
                                        ? (this.getValidPathName(fileName, support.options))
                                        : (this.getValidPathName(fileName, support.options));
                                    if (validPathName) {
                                        support.validFiles[validPathName] = fileContent;
                                        support.returnObject.includedFiles.push(validPathName);
                                    } else {
                                        support.returnObject.excludedFiles.push(fileName);
                                    }
                                } else {
                                    support.validFiles[fileName] = fileContent;
                                    support.returnObject.includedFiles.push(fileName);
                                }
                            } else {
                                support.returnObject.excludedFiles.push(fileName);
                            }
                        }
                    } else {
                        support.returnObject.excludedFiles.push(fileName);
                    }
                } else {
                    support.returnObject.excludedFiles.push(fileName);
                }
            } else {
                support.returnObject.excludedFiles.push(fileName);
            }
        }
    }

    private static isDirectory(path: string): boolean {
        return path.endsWith('/');
    }

    private static async validateZipSync(zipFile: Uint8Array): Promise<Unzipped> {
        let result: Unzipped = {};
        const unzipAsync = new Promise((resolve, reject) => {
            unzip(zipFile, {},
                (err: FlateError | null, data: Unzipped) => {
                    if (err) {
                        reject(err);
                    }
                    result = data;
                    resolve('Unzip ended');
                });
        });
        await unzipAsync;
        return result;
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
}