import {FileExtension} from "../descriptor";
import * as JSZip from "jszip";
import {ValidationErrorEnums} from "./validator.error";
import {InputFileFormat} from "./index";
import {Parser} from "../utils/parser";

export type ValidateZipOptions = {
    permittedFileExtensions: FileExtension[];
}

export class Validator {
    public static MAX_BYTE_FILE_SIZE = 6e6;
    public static MIN_BYTE_FILE_SIZE = 50;

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
        for (let pathName of Object.keys(zip.files)) {
            const file = zip.files[pathName];
            if (!file.dir) {
                const fileBuffer = await file.async('nodebuffer');
                const fileExtension = Validator.getFileExtension(pathName);
                if(fileExtension && (options ? options.permittedFileExtensions.includes(fileExtension) : true)) {
                    if (fileExtension === FileExtension.ZIP) {
                        //remove .zip from the pathname and continue the execution recursively into the file
                        hasAnyFile = await this._validateZIP(fileBuffer, validatedFiles, options, pathName.slice(0, -4)) || hasAnyFile;
                    } else if (Validator.isValidSize(fileBuffer) && Validator.isValidFile(fileExtension, fileBuffer)) {
                        console.log(pathName);
                        validatedFiles.file(prefix === '' ? pathName : prefix + '/' + pathName, fileBuffer, {comment: file.comment});
                        (!hasAnyFile) && (hasAnyFile = true);
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
    static isValidSize(file: Buffer, maxSize: number = Validator.MAX_BYTE_FILE_SIZE, minSize: number = Validator.MIN_BYTE_FILE_SIZE): boolean {
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
                return Validator.validateJSON(file);
            case FileExtension.CSV:
                return Validator.validateCSV(file);
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

    /**
     * @param time - is the 17 digit timestamp of Google Chrome (Webkit Timestamp)
     * @return a compatible Date format
     */
    static convertWebkitTimestamp(time: number): Date {
        const dateInSeconds = Math.round(time / 1000000) - 11644473600;
        return new Date(dateInSeconds * 1000);
    }

}
