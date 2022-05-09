import {DataSourceCode, FileCode, FileExtension} from "../descriptor";
import * as JSZip from "jszip";
import {ValidationErrorEnums} from "./validator.error";
import {
    InputFileFormat,
    ValidatorAmazon,
    ValidatorDatasource,
    ValidatorFacebook,
    ValidatorInstagram
} from "./index";
import {Parser} from "../utils/parser";
import {ValidatorGoogle} from "./validator.google";
import Logger from "../utils/logger";

export type ValidateZipOptions = {
    permittedFileExtensions?: FileExtension[]; //include only files with these extensions, if omitted includes everything
    filterDataSource?: {
        dataSourceCode: DataSourceCode;
        fileCodesIncluded?: FileCode[];  //include only files with these Codes, if omitted includes everything
    }
    throwExceptions?: boolean;
}

export class ValidatorFiles {
    private static readonly logger = new Logger("Files Validator");

    public static MAX_BYTE_FILE_SIZE = 6e6; //6 MB
    public static MIN_BYTE_FILE_SIZE = 30; //30 B

    /**
     * @param zipFile - file zip as one of the Buffer-like types supported
     * @return get all the file paths from the directories paths
     */
    static async getPathsIntoZip(zipFile: InputFileFormat): Promise<string[] | undefined> {
        if(zipFile) {
            const zip = await JSZip.loadAsync(zipFile);
            return Object.keys(zip.files)
                .filter((pathName) => !zip.files[pathName].dir)
                .map((pathName) => pathName);
        }
        this.logger.log('info', `${ValidationErrorEnums.ZIPPING_FILE_ERROR}: Wrong ZIP file in input`, 'getPathsIntoZip');
        return undefined;
    }


    /**
     * @param zipFile - file zip as one of the Buffer-like types supported
     * @param options - OPTIONAL: a set of options described into ValidateZipOptions type.
     * @return zip file containing all the files from input that passed the zip_files
     */
    static async validateZIP(zipFile: InputFileFormat, options?: ValidateZipOptions): Promise<Buffer | undefined> {
        try {
            const validatedFiles = new JSZip();
            if (await this._validateZIP(zipFile, validatedFiles, options)) {
                return await validatedFiles.generateAsync({type: 'nodebuffer'});
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

    private static async _validateZIP(zipFile: InputFileFormat, validatedFiles: JSZip, options?: ValidateZipOptions, prefix: string = ''): Promise<boolean> {
        const zip = await JSZip.loadAsync(zipFile);
        let hasAnyFile: boolean = false;
        const ValidatorDatasource = (options && options.filterDataSource) ?
            await ValidatorFiles.validatorSelector(options.filterDataSource.dataSourceCode) : undefined;
        //ValidationDatasource is a singleton class and the ValidatorDatasource.LANGUAGE_CODE might be different from undefined
        (ValidatorDatasource) && (ValidatorDatasource.LANGUAGE_CODE = undefined);
        for (let pathName of Object.keys(zip.files)) {
            const file = zip.files[pathName];
            if (!file.dir) {
                const fileBuffer = await file.async('nodebuffer');
                const fileExtension = ValidatorFiles.getFileExtension(pathName);
                if (fileExtension && (options && options.permittedFileExtensions ? options.permittedFileExtensions.includes(fileExtension) : true)) {
                    if (fileExtension === FileExtension.ZIP) {
                        //remove .zip from the pathname and continue the execution recursively into the file
                        hasAnyFile = await this._validateZIP(fileBuffer, validatedFiles, options, pathName.slice(0, -4)) || hasAnyFile;
                    } else if (ValidatorFiles.isValidSize(fileBuffer, pathName) && ValidatorFiles.isValidFile(fileExtension, fileBuffer)) {
                        if (ValidatorDatasource) {
                            const compatiblePathName = options && options.filterDataSource && options.filterDataSource.fileCodesIncluded
                                ? await ValidatorDatasource.getValidPath(pathName,
                                    {
                                        fileCodes: options.filterDataSource.fileCodesIncluded,
                                        externalZip: zip //only needed for IG validation, ignored otherwise
                                    })
                                : await ValidatorDatasource.getValidPath(pathName, {externalZip: zip});
                            if (compatiblePathName) {
                                ValidatorDatasource.addFileToZip(validatedFiles, compatiblePathName, fileBuffer, file);
                                (!hasAnyFile) && (hasAnyFile = true);
                            }
                        } else {
                            validatedFiles.file(prefix === '' ? pathName : prefix + '/' + pathName, fileBuffer, {comment: file.comment});
                            (!hasAnyFile) && (hasAnyFile = true);
                        }
                    }
                }
            }
        }
        return hasAnyFile;
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
     * @param pathName - optional evaluated file name
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
     * @return TRUE if the file is valid, FALSE otherwise
     */
    static isValidFile(extension: FileExtension, file: Buffer): boolean {
        switch (extension) {
            case FileExtension.JSON:
                return ValidatorFiles.validateJSON(file);
            case FileExtension.CSV:
                return ValidatorFiles.validateCSV(file);
            default:
                return true;
        }
    }

    /**
     * @param file - file as buffer
     * @return TRUE if the file is a valid JSON, FALSE otherwise
     */
    static validateJSON(file: Buffer): boolean {
        try {
            return !!JSON.parse(file.toString());
        } catch (error) {
            this.logger.log('info', `File is not a valid JSON`, 'validateJSON');
            return false;
        }
    }

    /**
     * @param file - file as buffer
     * @return TRUE if the file is a valid CSV, FALSE otherwise
     */
    static validateCSV(file: Buffer): boolean {
        try {
            return !!Parser.parseCSVfromBuffer(file);
        } catch (error) {
            this.logger.log('info', `File is not a valid CSV`, 'validateCSV');
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
            default:
                this.logger.log('info', `${dataSourceCode} is not a valid DataSourceCode`, 'validatorSelector');
                return undefined;
        }
    }
}
