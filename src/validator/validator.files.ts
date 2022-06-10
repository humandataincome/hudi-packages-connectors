import {
    AsyncZippable,
    FlateError,
    Unzip,
    UnzipFile,
    UnzipInflate, Unzipped,
    unzipSync,
    zipSync,
} from "fflate";
import {
    ValidatorAmazon,
    ValidatorDatasource,
    ValidatorFacebook, ValidatorGoogle,
    ValidatorInstagram, ValidatorLinkedIn, ValidatorNetflix, ValidatorShopify
} from "./index";
import {DataSourceCode, FileCode, FileExtension} from "../descriptor";
import {Parser} from "../utils/parser";
import Logger from "../utils/logger";
import {ValidationErrorEnum} from "../utils";


export interface ValidateZipOptions {
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

export interface MergingOptions {
    maxBytesZipFile?: number;
    throwExceptions?: boolean;
}

export interface ValidationReturn {
    zipFile: Uint8Array,
    includedFiles: string[],
    excludedFiles: string[],
}

interface StreamingObjectsSupport {
    readableStream: ReadableStream;
    returnObject: ValidationReturn;
    validFiles: AsyncZippable;
    options: ValidateZipOptions;
    recursiveZipPrefix?: string;
}

interface ValidateZipOptionsSupport {
    validatedFiles: Unzipped;
    prefix: string;
    includedFiles: string[];
    excludedFiles: string[];
}

interface ValidationReturnSupport {
    includedFiles: string[];
    excludedFiles: string[];
}

interface FileBuilder {
    [fileName: string]: {fileChunk: Uint8Array, isCorrupted: boolean, isTooLarge?: boolean};
}

export class ValidatorFiles {
    private static readonly logger = new Logger("Files Validator");

    public static MAX_BYTE_FILE_SIZE = 6e6; //6 MB
    public static MIN_BYTE_FILE_SIZE = 30; //30 B
    public static MAX_BYTE_ZIP = 1e9; //1 GB

    /**
     * @param readableStream - streaming in input
     * @param options - optional parameters defined into ValidateZipOptions interface
     */
    static async validateZipStream(readableStream: ReadableStream, options: ValidateZipOptions = {}): Promise<ValidationReturn | undefined> {
        try {
            const validationReturn: ValidationReturn = {
                zipFile: new Uint8Array(),
                includedFiles: [],
                excludedFiles: [],
            }

            const support: StreamingObjectsSupport = {
                readableStream: readableStream,
                returnObject: validationReturn,
                validFiles: {},
                options: options,
            };

            await this.unzipFileFromStream(support);
            validationReturn.zipFile = zipSync(support.validFiles);
            const maxBytesZip = (options && options.maxBytesZipFile) ? options.maxBytesZipFile : this.MAX_BYTE_ZIP;
            if (validationReturn.zipFile.length > maxBytesZip) {
                throw new Error(`${ValidationErrorEnum.VALIDATED_FILES_TOO_BIG}: expected zip file containing valid files is exceeding bytes limit (${maxBytesZip/1e9} GB)`);
            }
            if (validationReturn.includedFiles.length === 0) {
                throw new Error(`${ValidationErrorEnum.NOT_VALID_FILES_ERROR}: file zip has not any valid file`);
            }
            return validationReturn;
        } catch(error: any) {
            (error && error.message) && (this.logger.log('error', error.message, 'validateZipStream'));
            if (options && options.throwExceptions !== undefined && options.throwExceptions) {
                throw error;
            }
        }
        return undefined;
    }

    private static async unzipFileFromStream(support: StreamingObjectsSupport) {
        const unzipStream: Unzip = this.getUnzipStream(support);
        unzipStream.register(UnzipInflate); //can't be async otherwise the RAM usage is too much

        const reader = support.readableStream.getReader();
        for (let finished = false; !finished;) {
            const {done, value} = await reader.read();
            if (value)
                unzipStream.push(value);
            finished = done;
        }
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
            stream.ondata = (error: FlateError | null, chunk: Uint8Array, final: boolean) => {
                if (error && !file[stream.name]) {
                    this.logger.log('error', 'An error occurred while streaming: ' + stream.name, 'getUnzipStream');
                    file[stream.name] = {
                        fileChunk: new Uint8Array(),
                        isCorrupted: true
                    };
                } else if (error && file[stream.name] && !file[stream.name].isCorrupted) {
                    file[stream.name].isCorrupted = true;
                }
                this.buildFile(file, chunk, stream.name);
                if (final) {
                    if (!file[stream.name].isCorrupted) {
                        this.filterFile(file[stream.name].fileChunk, stream.name, support);
                    }
                    delete file[stream.name];
                }
            };
            stream.start();
        });
    }

    private static filterFile(fileContent: Uint8Array, fileName: string, support: StreamingObjectsSupport, recursiveZipPrefix?: string) {
        if (!this.isDirectory(fileName)) {
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

    /**
     * @param path - a string representing a directory path
     * @return True if ends with a '/' like /marcus/documents/, False if is a file like /marcus/documents/file.txt
     */
    public static isDirectory(path: string): boolean {
        return path.endsWith('/');
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
     * @param options - used if parameter maxBytesPerFile or minBytesPerFile are defined into it
     * @return TRUE if the file's size is between the minSize and the maxSize, FALSE otherwise
     */
    static isValidSize(file: Uint8Array, pathName: string, options: ValidateZipOptions = {}): boolean {
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
                    return zipSync(files);
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
                return Object.keys(files);
            }
            this.logger.log('error', `${ValidationErrorEnum.ZIPPING_FILE_ERROR}: error in zip file given in input`, 'getPathsIntoZip');
        } catch (error: any) {
            (error && error.message) && (this.logger.log('error', error.message, 'getPathsIntoZip'));
        }
        return undefined;
    }

    /**
     * @param zipFile - file zip as one of the Buffer-like types supported
     * @param options - OPTIONAL: a set of options described into ValidateZipOptions type.
     * @return zip file containing all the files from input that passed the datasource zip files
     */
    static validateZip(zipFile: Uint8Array, options?: ValidateZipOptions): ValidationReturn | undefined {
        try {
            const optionsSupport: ValidateZipOptionsSupport = {
                validatedFiles: {},
                prefix: '',
                includedFiles: [],
                excludedFiles: [],
            }
            const validationReturnSupport = this._validateZip(zipFile, optionsSupport, options);
            if (validationReturnSupport && validationReturnSupport.includedFiles.length > 0) {
                return {
                    zipFile: zipSync(optionsSupport.validatedFiles),
                    includedFiles: validationReturnSupport.includedFiles,
                    excludedFiles: validationReturnSupport.excludedFiles,
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

    private static _validateZip(zipFile: Uint8Array, optionsSupport: ValidateZipOptionsSupport, options: ValidateZipOptions = {}): ValidationReturnSupport {
        const ValidatorDatasource = (options && options.filterDataSource) ?
            this.validatorSelector(options.filterDataSource.dataSourceCode) : undefined;
        const extractedFiles = unzipSync(zipFile);
        for (let pathName in extractedFiles) {
            if(!this.isDirectory(pathName)) {
                const fileExtension = this.getFileExtension(pathName);
                if (fileExtension && (options && options.permittedFileExtensions ? options.permittedFileExtensions.includes(fileExtension) : true)) {
                    if (fileExtension === FileExtension.ZIP) {
                        const recursiveValidation = this._validateZip(extractedFiles[pathName],
                            {
                                validatedFiles: optionsSupport.validatedFiles,
                                prefix: optionsSupport.prefix === '' ? pathName.slice(0, -4) : optionsSupport.prefix + '/' + pathName.slice(0, -4),
                                includedFiles: optionsSupport.includedFiles,
                                excludedFiles: optionsSupport.excludedFiles,
                            }, options);
                        optionsSupport.includedFiles = recursiveValidation.includedFiles;
                        optionsSupport.excludedFiles = recursiveValidation.excludedFiles;
                    } else if (this.isValidSize(extractedFiles[pathName], pathName, options) && this.isValidContent(fileExtension, extractedFiles[pathName], pathName)) {
                        if (ValidatorDatasource) {
                            if (options && options.filterDataSource) {
                                let validPathName = ValidatorDatasource.getValidPath(
                                    optionsSupport.prefix === '' ? pathName : optionsSupport.prefix + '/' + pathName,
                                    {
                                        throwExceptions: options.throwExceptions!,
                                        fileCodes: options.filterDataSource.fileCodesIncluded!,
                                    });
                                if (validPathName) {
                                    optionsSupport.validatedFiles = {...optionsSupport.validatedFiles, ...{[validPathName]: extractedFiles[pathName]}};
                                    optionsSupport.includedFiles.push(validPathName);
                                } else {
                                    optionsSupport.excludedFiles.push(pathName);
                                }
                            }
                        } else {
                            optionsSupport.validatedFiles = {...optionsSupport.validatedFiles, ...{[optionsSupport.prefix === '' ? pathName : optionsSupport.prefix + '/' + pathName]: extractedFiles[pathName]}};
                            optionsSupport.includedFiles.push(pathName);
                        }
                    } else {
                        optionsSupport.excludedFiles.push(pathName);
                    }
                }
            }
        }
        return {
            includedFiles: optionsSupport.includedFiles,
            excludedFiles: optionsSupport.excludedFiles,
        }
    }

}
