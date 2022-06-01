import {DataSourceCode, FileCode, FileExtension} from "../descriptor";
import * as JSZip from "jszip";
import {ValidationErrorEnums} from "./validator.error";
import {
    InputFileFormat,
    ValidatorAmazon,
    ValidatorDatasource,
    ValidatorFacebook,
    ValidatorInstagram,
    ValidatorNetflix
} from "./index";
import {Parser} from "../utils/parser";
import {ValidatorGoogle} from "./validator.google";
import Logger from "../utils/logger";
import {ValidatorLinkedIn} from "./validator.linkedin";
import {ValidatorShopify} from "./validator.shopify";

export interface ValidateZipOptions {
    permittedFileExtensions?: FileExtension[]; //include only files with these extensions, if omitted includes everything
    filterDataSource?: {
        dataSourceCode: DataSourceCode;
        fileCodesIncluded?: FileCode[];  //include only files with these Codes, if omitted includes everything
    }
    throwExceptions?: boolean;
}

export interface ValidationReturn {
    zipFile: Buffer;
    includedFiles: string[];
    excludedFiles: string[];
}

interface ValidateZipOptionsSupport {
    prefix: string;
    includedFiles: string[];
    excludedFiles: string[];
}

interface ValidationReturnSupport {
    includedFiles: string[];
    excludedFiles: string[];
}

export class ValidatorFiles {
    private static readonly logger = new Logger("Files Validator");

    public static MAX_BYTE_FILE_SIZE = 6e6; //6 MB
    public static MIN_BYTE_FILE_SIZE = 30; //30 B

    /**
     * @param zipFiles - list of 2 or more zip files that you want to merge
     * @return a new file zip containing all the files from the zip given in input
     */
    static async mergeZipFiles(zipFiles: InputFileFormat[]): Promise<Buffer | undefined> {
        try {
            if (zipFiles.length === 1) {
                if (zipFiles[0]) {
                    return zipFiles[0] as Buffer;
                } else {
                    return undefined;
                }
            }
            if (zipFiles.length > 1) {
                const mergedZip = new JSZip();
                for (const zipFile of zipFiles) {
                    if (zipFile) {
                        let zip = await JSZip.loadAsync(zipFile);
                        if (zip) {
                            for (let pathName of Object.keys(zip.files)) {
                                const file = zip.files[pathName];
                                const fileBuffer = await file.async('nodebuffer');
                                mergedZip.file(pathName, fileBuffer, {comment: file.comment});
                            }
                        }
                    }
                }
                return await mergedZip.generateAsync({type: 'nodebuffer'});
            } else {
                this.logger.log('error', `Empty array in input`, 'mergeZipFiles');
                return undefined;
            }
        } catch (error: any) {
            (error && error.message) && (this.logger.log('error', error.message, 'mergeZipFiles'));
        }
        return undefined;
    }

    /**
     * @param zipFile - file zip as one of the Buffer-like types supported
     * @return get all the file paths from the directories paths
     */
    static async getPathsIntoZip(zipFile: InputFileFormat): Promise<string[] | undefined> {
        try {
            if(zipFile) {
                const zip = await JSZip.loadAsync(zipFile);
                return Object.keys(zip.files)
                    .filter((pathName) => !zip.files[pathName].dir)
                    .map((pathName) => pathName);
            }
            this.logger.log('error', `${ValidationErrorEnums.ZIPPING_FILE_ERROR}: Wrong ZIP file in input`, 'getPathsIntoZip');
            return undefined;
        } catch (error: any) {
            (error && error.message) && (this.logger.log('error', error.message, 'getPathsIntoZip'));
        }
        return undefined;
    }

    static validateZipStream(zipFile:  NodeJS.ReadableStream) {

    }

    /**
     * @param zipFile - file zip as one of the Buffer-like types supported
     * @param options - OPTIONAL: a set of options described into ValidateZipOptions type.
     * @return zip file containing all the files from input that passed the datasource zip files
     */
    static async validateZip(zipFile: InputFileFormat, options?: ValidateZipOptions): Promise<ValidationReturn | undefined> {
        try {
            const validatedFiles = new JSZip();
            const optionsSupport: ValidateZipOptionsSupport = {
                prefix: '',
                includedFiles: [],
                excludedFiles: [],
            }
            const validationReturnSupport = await this._validateZip(zipFile, validatedFiles, optionsSupport, options);
            if (validationReturnSupport && validationReturnSupport.includedFiles.length > 0) {
                return {
                    zipFile: await validatedFiles.generateAsync({type: 'nodebuffer'}),
                    includedFiles: validationReturnSupport.includedFiles,
                    excludedFiles: validationReturnSupport.excludedFiles,
                };
            } else {
                throw new Error(`${ValidationErrorEnums.NOT_VALID_FILES_ERROR}: File ZIP has not any valid file`);
            }
        } catch (error: any) {
            (error && error.message) && (this.logger.log('error', error.message, 'validateZIP'));
            if (options && options.throwExceptions !== undefined && options.throwExceptions) {
                throw error;
            }
        }
        return undefined;
    }

    private static async _validateZip(zipFile: InputFileFormat, validatedFiles: JSZip, optionsSupport: ValidateZipOptionsSupport, options?: ValidateZipOptions): Promise<ValidationReturnSupport> {
        const zip = await JSZip.loadAsync(zipFile);
        let languageCode = undefined;
        const ValidatorDatasource = (options && options.filterDataSource) ?
            await ValidatorFiles.validatorSelector(options.filterDataSource.dataSourceCode) : undefined;
        for (let pathName of Object.keys(zip.files)) {
            const file = zip.files[pathName];
            if (!file.dir) {
                const fileBuffer = await file.async('nodebuffer');
                const fileExtension = ValidatorFiles.getFileExtension(pathName);
                if (fileExtension && (options && options.permittedFileExtensions ? options.permittedFileExtensions.includes(fileExtension) : true)) {
                    if (fileExtension === FileExtension.ZIP) {
                        //remove .zip from the pathname and continue the execution recursively into the file
                        const recursiveValidation = await this._validateZip(fileBuffer, validatedFiles,
                            {
                                prefix: optionsSupport.prefix === '' ? pathName.slice(0, -4) : optionsSupport.prefix + '/' + pathName.slice(0, -4),
                                includedFiles: optionsSupport.includedFiles,
                                excludedFiles: optionsSupport.excludedFiles,
                            }, options);
                        optionsSupport.includedFiles = recursiveValidation.includedFiles;
                        optionsSupport.excludedFiles = recursiveValidation.excludedFiles;
                    } else if (ValidatorFiles.isValidSize(fileBuffer, pathName) && ValidatorFiles.isValidContent(fileExtension, fileBuffer, pathName)) {
                        if (ValidatorDatasource) {
                            if (options && options.filterDataSource) {
                                if (options.filterDataSource.dataSourceCode === DataSourceCode.INSTAGRAM) {
                                    if (languageCode === undefined) {
                                        languageCode = await ValidatorDatasource.getLanguage(
                                            {
                                                throwExceptions: options.throwExceptions!,
                                                externalZip: zip,
                                            });
                                    }
                                }
                                let validPathName = await ValidatorDatasource.getValidPath(
                                    optionsSupport.prefix === '' ? pathName : optionsSupport.prefix + '/' + pathName,
                                    {
                                        throwExceptions: options.throwExceptions!,
                                        fileCodes: options.filterDataSource.fileCodesIncluded!,
                                        languageCode: languageCode!,
                                    });
                                if (validPathName) {
                                    (languageCode !== null && languageCode !== undefined)
                                        ? validatedFiles.file(validPathName, fileBuffer, {comment: languageCode})
                                        : validatedFiles.file(validPathName, fileBuffer, {comment: file.comment});
                                    optionsSupport.includedFiles.push(validPathName);
                                } else {
                                    optionsSupport.excludedFiles.push(pathName);
                                }
                            }
                        } else {
                            validatedFiles.file(optionsSupport.prefix === '' ? pathName : optionsSupport.prefix + '/' + pathName, fileBuffer, {comment: file.comment});
                            optionsSupport.includedFiles.push(pathName);
                        }
                    } else {
                        //file isn't big enough or has a wrong content
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
    static isValidSize(file: Buffer, pathName: string, maxSize: number = ValidatorFiles.MAX_BYTE_FILE_SIZE, minSize: number = ValidatorFiles.MIN_BYTE_FILE_SIZE): boolean {
        const size = file.byteLength;
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
    static isValidContent(extension: FileExtension, file: Buffer, pathName: string): boolean {
        switch (extension) {
            case FileExtension.JSON:
                return ValidatorFiles.validateJSON(file, pathName);
            case FileExtension.JS:
                const fileJson = Parser.extractJsonFromTwitterFile(file);
                if (fileJson) {
                    return ValidatorFiles.validateJSON(fileJson, pathName);
                }
                return false;
            case FileExtension.CSV:
                return ValidatorFiles.validateCSV(file, pathName);
            default:
                return true;
        }
    }

    /**
     * @param file - file as buffer
     * @param pathName - evaluated file name
     * @return TRUE if the file is a valid JSON, FALSE otherwise
     */
    static validateJSON(file: Buffer, pathName?: string): boolean {
        try {
            return !!JSON.parse(file.toString());
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
    static validateCSV(file: Buffer, pathName?: string): boolean {
        try {
            return !!Parser.parseCSVfromBuffer(file);
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
