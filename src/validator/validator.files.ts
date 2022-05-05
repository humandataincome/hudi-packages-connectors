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

export type ValidateZipOptions = {
    permittedFileExtensions?: FileExtension[]; //include only files with these extensions, if omitted includes everything
    filterDataSource?: {
        dataSourceCode: DataSourceCode;
        fileCodesIncluded?: FileCode[];  //include only files with these Codes, if omitted includes everything
    }
}

export class ValidatorFiles {
    public static MAX_BYTE_FILE_SIZE = 6e6; //6 MB
    public static MIN_BYTE_FILE_SIZE = 50; //50 B

    /**
     * @param zipFile - file zip as BufferLike
     * @return filter all the file paths from the directories paths
     */
    static async getFilesPathsIntoZip(zipFile: InputFileFormat): Promise<string[]> {
        const zip = await JSZip.loadAsync(zipFile);
        return Object.keys(zip.files)
           .filter((pathName) => !zip.files[pathName].dir)
            .map((pathName) => pathName);
    }


    /**
     * @param zipFile - file zip as BufferLike
     * @param options - OPTIONAL: can be used to filter the FileExtensions.
     * @return zip file containing all the files from input that passed the zip_files
     */
    static async validateZIP(zipFile: InputFileFormat, options?: ValidateZipOptions): Promise<Buffer> {
        const validatedFiles = new JSZip();
        if (await this._validateZIP(zipFile, validatedFiles, options)) {
            return await validatedFiles.generateAsync({type: 'nodebuffer'});
        } else {
            throw new Error(`${ValidationErrorEnums.EMPTY_FILE_ERROR}: File ZIP has not any valid file`);
        }
    }

    private static async _validateZIP(zipFile: InputFileFormat, validatedFiles: JSZip, options?: ValidateZipOptions, prefix: string = ''): Promise<boolean> {
        const zip = await JSZip.loadAsync(zipFile);
        let hasAnyFile: boolean = false;
        const ValidatorDatasource = (options && options.filterDataSource) ?
            await ValidatorFiles.ValidatorSelector(options.filterDataSource.dataSourceCode) : undefined;
        //ValidationDatasource is a singleton class and the ValidatorDatasource.LANGUAGE_CODE might be different from undefined
        (ValidatorDatasource) && (ValidatorDatasource.LANGUAGE_CODE = undefined);
        for (let pathName of Object.keys(zip.files)) {
            const file = zip.files[pathName];
            if (!file.dir) {
                const fileBuffer = await file.async('nodebuffer');
                const fileExtension = ValidatorFiles.getFileExtension(pathName);
                console.log(fileExtension, pathName)
                if (fileExtension && (options && options.permittedFileExtensions ? options.permittedFileExtensions.includes(fileExtension) : true)) {
                    if (fileExtension === FileExtension.ZIP) {
                        //remove .zip from the pathname and continue the execution recursively into the file
                        hasAnyFile = await this._validateZIP(fileBuffer, validatedFiles, options, pathName.slice(0, -4)) || hasAnyFile;
                    } else if (ValidatorFiles.isValidSize(fileBuffer) && ValidatorFiles.isValidFile(fileExtension, fileBuffer)) {
                        if (ValidatorDatasource) {
                            const compatiblePathName = options && options.filterDataSource && options.filterDataSource.fileCodesIncluded
                                ? await ValidatorDatasource.getValidPath(pathName, zip, options.filterDataSource.fileCodesIncluded)
                                : await ValidatorDatasource.getValidPath(pathName, zip);
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
        return extension ? FileExtension[extension.toUpperCase() as keyof typeof FileExtension] : undefined;
    }

    /**
     * @param file - file as Buffer
     * @param maxSize - max file's size in bytes, MAX_BYTE_FILE_SIZE as default.
     * @param minSize - min file's size in bytes, MIN_BYTE_FILE_SIZE as default.
     * @return TRUE if the file's size is between the minSize and the maxSize, FALSE otherwise
     */
    static isValidSize(file: Buffer, maxSize: number = ValidatorFiles.MAX_BYTE_FILE_SIZE, minSize: number = ValidatorFiles.MIN_BYTE_FILE_SIZE): boolean {
        return (file.byteLength < maxSize) && (file.byteLength > minSize);
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


    static ValidatorSelector(sourceCode: DataSourceCode): ValidatorDatasource | undefined {
        switch (sourceCode) {
            case DataSourceCode.INSTAGRAM:
                return ValidatorInstagram.getInstance();
            case DataSourceCode.FACEBOOK:
                return ValidatorFacebook.getInstance();
            case DataSourceCode.AMAZON:
                return ValidatorAmazon.getInstance();
            case DataSourceCode.GOOGLE:
                return ValidatorGoogle.getInstance();
            default:
                return undefined;
        }
    }
}
