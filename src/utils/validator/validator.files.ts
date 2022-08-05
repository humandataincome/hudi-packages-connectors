import {
    AsyncZippable,
    FlateError,
    Unzip,
    UnzipFile,
    UnzipInflate, Unzipped,
    unzipSync, Zippable,
    zipSync,
} from "fflate";
import {DataSourceCode, FileCode, FileExtension} from "../../descriptor";
import {Parser} from "../parser";
import Logger from "../logger";
import {ValidationErrorEnum} from "../index";
import {ValidatorDatasource} from "./validator.datasource";
import {
    ValidatorAmazon,
    ValidatorFacebook,
    ValidatorGoogle,
    ValidatorInstagram,
    ValidatorLinkedIn, ValidatorReddit,
    ValidatorShopify, ValidatorTikTok, ValidatorTwitter
} from "../../source";
import {ValidatorNetflix} from "../../source";
import {ValidatorObject} from "./validator.object";
import {from, Observable, Subscriber} from 'rxjs';

/**
 * @permittedFileExtensions list of extensions of file that we want to include exclusively.
 * @dataSourceCode code of the datasource we want to validate using its specific validation instance.
 * @fileCodesIncluded list of files codes we want to admit during the validation. This overwrites the default one given by its specific validation instance.
 * @maxBytesPerFile max dimension (in bytes) that a single file into the zip can have
 * @minBytesPerFile min dimension (in bytes) that a single file into the zip can have
 * @maxBytesZipFile max dimension (in bytes) that the final zip validated can have
 * @throwException TRUE and the function will throw an error when occurred, FALSE and it won't. This field doesn't affect validateZipStream function execution.
 */
export interface ValidationZipOptions {
    permittedFileExtensions?: FileExtension[]; //include only files with these extensions, if omitted includes everything
    filterDataSource?: {
        dataSourceCode: DataSourceCode;
        fileCodesIncluded?: FileCode[];  //include only files with these Codes, if omitted includes everything
    }
    maxBytesPerFile?: number;
    minBytesPerFile?: number;
    maxBytesZipFile?: number;
    throwExceptions?: boolean;
}

export enum ValidationStatus {
    VALIDATING = 'VALIDATING',
    ZIPPING = 'ZIPPING',
    DONE = 'DONE',
    ERROR = 'ERROR'
}
export interface ValidationZipStatus {
    status: ValidationStatus;
    bytesRead?: number;
    validationResult?: ValidationReturn | undefined;
}

export interface MergingOptions {
    maxBytesZipFile?: number;
    throwExceptions?: boolean;
}

export interface ValidationReturn {
    zipFile: Uint8Array,
    includedFiles: string[],
    excludedFiles: string[],
}

interface ValidationObjectSupport {
    readableStream?: ReadableStream;
    returnObject: ValidationReturn;
    validFiles: AsyncZippable;
    options: ValidationZipOptions;
    bytesRead?: number;
    subscriber?: Subscriber<ValidationZipStatus>
    recursiveZipPrefix?: string;
}

interface FilesBuilder {
    [fileName: string]: {fileChunk: Uint8Array, isCorrupted: boolean, isTooLarge?: boolean};
}

export class ValidatorFiles {
    private static readonly logger = new Logger("Files Validator");

    public static MAX_BYTE_FILE_SIZE = 6e6; //6 MB
    public static MIN_BYTE_FILE_SIZE = 30; //30 B
    public static MAX_BYTE_ZIP = 1e9; //1 GB

    /**
     * An observable taking in input a zip file as ReadableStream. Every time a file is read and validated the observable emits an event containing a status:
     * if the status is VALIDATING the event contains also the number of bytes read until that moment, if the event is DONE the event return an object of ValidationReturn type
     * @param readableStream - streaming in input
     * @param options - optional parameters defined into ValidationZipOptions interface
     */
    static validateZipStream(readableStream: ReadableStream, options: ValidationZipOptions = {}): Observable<ValidationZipStatus> {
        return new Observable<ValidationZipStatus>((subscriber: Subscriber<ValidationZipStatus>) => {
            const validationReturn: ValidationReturn = {
                zipFile: new Uint8Array(),
                includedFiles: [],
                excludedFiles: [],
            }

            const support: ValidationObjectSupport = {
                readableStream: readableStream,
                returnObject: validationReturn,
                validFiles: {},
                subscriber: subscriber,
                options: options,
            }

            from(this.unzipFileFromStream(support)).subscribe({
                    error(error) {
                        subscriber.error(error);
                    },
                    complete() {
                        try {
                            subscriber.next(
                                {
                                    status: ValidationStatus.ZIPPING
                                });
                            validationReturn.zipFile = ValidatorFiles.zipFiles(support.validFiles);
                            const maxBytesZip = (options && options.maxBytesZipFile) ? options.maxBytesZipFile : ValidatorFiles.MAX_BYTE_ZIP;
                            if (validationReturn.zipFile.length > maxBytesZip) {
                                throw Error(`${ValidationErrorEnum.VALIDATED_FILES_TOO_BIG}: expected zip file containing valid files is exceeding bytes limit (${maxBytesZip / 1e9} GB)`);
                            }
                            if (validationReturn.includedFiles.length === 0) {
                                throw Error(`${ValidationErrorEnum.NOT_VALID_FILES_ERROR}: file zip has not any valid file`);
                            }
                            subscriber.next(
                                {
                                    status: ValidationStatus.DONE,
                                    validationResult: validationReturn
                                });
                            subscriber.complete();
                        } catch(error: any) {
                            subscriber.next(
                                {
                                    status: ValidationStatus.ERROR,
                                });
                            (error && error.message) && (ValidatorFiles.logger.log('error', error.message, 'validateZipStream'));
                            if (options.throwExceptions != undefined && options.throwExceptions) {
                                throw Error(error);
                            } else {
                                subscriber.error(error);
                            }
                        }
                    }
                }
            );
        });
    }

    private static async unzipFileFromStream(support: ValidationObjectSupport) {
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
                                status: ValidationStatus.VALIDATING
                            });
                    }
                    unzipStream.push(value);
                }
                finished = done;
            }
        }
    }

    private static buildFile(file: FilesBuilder, chunk: Uint8Array, fileName: string, support: ValidationObjectSupport) {
        if (chunk) {
            if (file[fileName]) {
                if (!file[fileName].isCorrupted) {
                    if (!file[fileName].isTooLarge) {
                        if (file[fileName].fileChunk.length > 0) {
                            const maxBytesFile = (support.options && support.options.maxBytesZipFile) ? support.options.maxBytesZipFile : this.MAX_BYTE_ZIP;
                            const fileLength = file[fileName].fileChunk.length;
                            const chunkLength = chunk.length;
                            const finalBuffer = new Uint8Array(fileLength + chunkLength);
                            finalBuffer.set(new Uint8Array(file[fileName].fileChunk), 0);
                            finalBuffer.set(new Uint8Array(chunk), fileLength);
                            file[fileName] = {fileChunk: finalBuffer, isCorrupted: file[fileName].isCorrupted};
                            if (fileLength + chunkLength > maxBytesFile) {
                                file[fileName] = {
                                    fileChunk: new Uint8Array,
                                    isCorrupted: file[fileName].isCorrupted,
                                    isTooLarge: true
                                };
                            }
                        }
                    }
                }
            } else {
                file[fileName] = {fileChunk: chunk, isCorrupted: false};
            }
        } else {
            file[fileName] = {fileChunk: new Uint8Array, isCorrupted: true}
        }
    }

    /**
     * @param files - object containing name as key and content as Uint8Array of files that you want to zip
     * @return zipped files as Uint8Array
     */
    public static zipFiles(files: Zippable): Uint8Array {
        return zipSync(files);
    }

    private static getUnzipStream(support: ValidationObjectSupport): Unzip {
        let file: FilesBuilder = {};
        return new Unzip((stream: UnzipFile) => {
            stream.ondata = (error: FlateError | null, chunk: Uint8Array, final: boolean) => {
                if (error) {
                    if ((!file[stream.name]) || (file[stream.name] && !file[stream.name].isCorrupted)) {
                        this.logger.log('error', 'An error occurred while streaming: ' + stream.name, 'getUnzipStream');
                        file[stream.name] = {
                            fileChunk: new Uint8Array(),
                            isCorrupted: true
                        };
                        support.returnObject.excludedFiles.push(stream.name);
                    }
                }
                this.buildFile(file, chunk, stream.name, support);
                if (final) {
                    if (!file[stream.name].isCorrupted && !file[stream.name].isTooLarge) {
                        this.filterFile(file[stream.name].fileChunk, stream.name, support);
                    }
                    delete file[stream.name];
                }
            };
            stream.start();
        });
    }

    private static filterFile(fileContent: Uint8Array, fileName: string, support: ValidationObjectSupport, recursiveZipPrefix?: string) {
        if (!ValidatorObject.isDirectory(fileName)) {
            if (fileContent && fileContent.length > 0) {
                (recursiveZipPrefix) && (fileName = recursiveZipPrefix+'/'+fileName);
                const extension = this.getFileExtension(fileName);
                if (extension) {
                    if (extension === FileExtension.ZIP) {
                        const recursiveZipFiles = unzipSync(fileContent);
                        for (let key in recursiveZipFiles) {
                            this.filterFile(recursiveZipFiles[key], key, support, recursiveZipPrefix ? recursiveZipPrefix+'/'+fileName.slice(0, -4) : fileName.slice(0, -4));
                        }
                    } else {
                        if (this.isValidSize(fileContent, fileName, support.options)) {
                            if (this.isValidContent(extension, fileContent, fileName)) {
                                if (support.options.filterDataSource) {
                                    let validPathName = (recursiveZipPrefix)
                                        ? (this.getValidPathName(fileName, support.options))
                                        : (this.getValidPathName(fileName, support.options));
                                    if (validPathName) {
                                        support.validFiles[validPathName] = fileContent;
                                        support.returnObject.includedFiles.push(fileName);
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
        }
    }

    private static getValidPathName(pathName: string, optionsValidation: ValidationZipOptions): string | undefined {
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
     * @param options - used if parameter maxBytesPerFile or minBytesPerFile are defined into it
     * @return TRUE if the file's size is between the minSize and the maxSize, FALSE otherwise
     */
    static isValidSize(file: Uint8Array, pathName: string, options: ValidationZipOptions = {}): boolean {
        const maxSize = (options && options.maxBytesPerFile) ? options.maxBytesPerFile : this.MAX_BYTE_FILE_SIZE;
        const minSize = (options && options.minBytesPerFile) ? options.minBytesPerFile : this.MIN_BYTE_FILE_SIZE;
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
            case DataSourceCode.SHOPIFY_ORDERS:
            case DataSourceCode.SHOPIFY_PRODUCTS:
            case DataSourceCode.SHOPIFY_DISCOUNTS:
                return ValidatorShopify.getInstance();
            case DataSourceCode.TWITTER:
                return ValidatorTwitter.getInstance();
            case DataSourceCode.TIKTOK:
                return ValidatorTikTok.getInstance();
            case DataSourceCode.REDDIT:
                return ValidatorReddit.getInstance();
            default:
                this.logger.log('info', `${dataSourceCode} is not a valid DataSourceCode`, 'validatorSelector');
                return undefined;
        }
    }

    /**
     * @param zipFiles - list of 2 or more zip files that you want to merge
     * @param options - can contain parameters maxBytesZipFile and throwExceptions
     * @return a new file zip containing all the files from the zip given in input
     */
    static async mergeZipFiles(zipFiles: Uint8Array[], options: MergingOptions = {}): Promise<Uint8Array | undefined> {
        try {
            const maxBytesZip = (options && options.maxBytesZipFile) ? options.maxBytesZipFile : this.MAX_BYTE_ZIP;
            if (zipFiles.reduce((partialSum: number, currentValue:Uint8Array) => currentValue.length+partialSum, 0) > maxBytesZip) {
                throw new Error(`${ValidationErrorEnum.VALIDATED_FILES_TOO_BIG}: expected merged zip file is exceeding bytes limit (${maxBytesZip/1e9} GB)`);
            } else {
                if (zipFiles.length === 1 && zipFiles[0]) {
                    return zipFiles[0];
                }
                if (zipFiles.length > 1) {
                    let files: Unzipped = {};
                    zipFiles.forEach((zipFile: Uint8Array) => {
                        files = {...files,...unzipSync(zipFile)};
                    });
                    return this.zipFiles(files);
                }
            }
        } catch (error: any) {
            (error && error.message) && (this.logger.log('error', error.message, 'mergeZipFiles'));
            if (options && options.throwExceptions !== undefined && options.throwExceptions) {
                throw error;
            }
        }
        return undefined;
    }

    /**
     * @param zipFile - file zip as one of the Buffer-like types supported
     * @return get all the file paths from the directories paths
     */
    static async getPathsIntoZip(zipFile: Uint8Array): Promise<string[] | undefined> {
        try {
            if(zipFile) {
                const files: Unzipped = unzipSync(zipFile);
                return Object.keys(files).filter(file => !ValidatorObject.isDirectory(file));
            }
            this.logger.log('error', `${ValidationErrorEnum.ZIPPING_FILE_ERROR}: error in zip file given in input`, 'getPathsIntoZip');
        } catch (error: any) {
            (error && error.message) && (this.logger.log('error', error.message, 'getPathsIntoZip'));
        }
        return undefined;
    }

    /**
     * @param zipFile - file zip as one of the Buffer-like types supported
     * @param options - OPTIONAL: a set of options described into ValidationZipOptions type.
     * @return zip file containing all the files from input that passed the datasource zip files
     */
    static validateZip(zipFile: Uint8Array, options: ValidationZipOptions = {}): ValidationReturn | undefined {
        try {
            const validationReturn: ValidationReturn = {
                zipFile: new Uint8Array(),
                includedFiles: [],
                excludedFiles: [],
            }
            const optionsSupport: ValidationObjectSupport = {
                returnObject: validationReturn,
                validFiles: {},
                options: options,
            }

            const files = unzipSync(zipFile);
            for (let pathName in files) {
                this.filterFile(files[pathName], pathName, optionsSupport);
            }

            if (validationReturn.includedFiles.length > 0) {
                return {
                    zipFile: this.zipFiles(optionsSupport.validFiles),
                    includedFiles: validationReturn.includedFiles,
                    excludedFiles: validationReturn.excludedFiles,
                };
            } else {
                throw new Error(`${ValidationErrorEnum.NOT_VALID_FILES_ERROR}: file zip has not any valid file`);
            }
        } catch (error: any) {
            (error && error.message) && (this.logger.log('error', error.message, 'validateZip'));
            if (options && options.throwExceptions !== undefined && options.throwExceptions) {
                throw error;
            }
        }
        return undefined;
    }
}
