import {FileExtension} from "../descriptor";
import * as JSZip from "jszip";
import {ValidationErrorEnums} from "./validator.error";
import {InputFileFormat} from "./index";
import {Parser} from "../utils/parser";

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
     * @return zip file containing all the files from input that passed the zip_files
     */
    static async validateZIP(zipFile: InputFileFormat): Promise<Buffer> {
        const validatedFiles = new JSZip();
        if (await this._validateZIP(zipFile, validatedFiles)) {
            return await validatedFiles.generateAsync({type: 'nodebuffer'});
        } else {
            throw new Error(`${ValidationErrorEnums.EMPTY_FILE_ERROR}: File ZIP has not any valid file`);
        }
    }

    private static async _validateZIP(zipFile: InputFileFormat, validatedFiles: JSZip, prefix: string = ''): Promise<boolean> {
        const zip = await JSZip.loadAsync(zipFile);
        let hasAnyFile: boolean = false;
        for (let pathName of Object.keys(zip.files)) {
            const file = zip.files[pathName];
            if (!file.dir) {
                const fileBuffer = await file.async('nodebuffer');
                const fileExtension = Validator.getFileExtension(pathName);
                if(fileExtension) {
                    if (fileExtension === FileExtension.ZIP) {
                        hasAnyFile = await this._validateZIP(fileBuffer, validatedFiles, pathName.slice(0, -4)) || hasAnyFile;
                    } else if (Validator.isValidFile(fileExtension, fileBuffer)) {
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
        const extension = fileName.split('.').pop();
        if (extension === 'csv') {
            return FileExtension.CSV;
        } else if (extension === 'json') {
            return FileExtension.JSON;
        } else if (extension === 'zip') {
            return FileExtension.ZIP;
        } else if (extension === 'pdf') {
            return FileExtension.PDF;
        } else if (extension === 'eml') {
            return FileExtension.EML;
        } else if (extension === 'ics') {
            return FileExtension.ICS;
        } else if (extension === 'tcx') {
            return FileExtension.TCX;
        } else if (extension === 'mbox') {
            return FileExtension.MBOX;
        } else if (extension === 'xml') {
            return FileExtension.XML;
        } else if (extension === 'html') {
            return FileExtension.HTML;
        } else if (extension === 'txt') {
            return FileExtension.TXT;
        } else if (extension === 'jpg') {
            return FileExtension.JPG;
        } else if (extension === 'png') {
            return FileExtension.PNG;
        } else if (extension === 'gif') {
            return FileExtension.GIF;
        } else if (extension === 'vcf') {
            return FileExtension.VCF;
        } else {
            return undefined;
        }
    }

    private static isValidSize(file: Buffer): boolean {
        return (file.byteLength < Validator.MAX_BYTE_FILE_SIZE) && (file.byteLength > Validator.MIN_BYTE_FILE_SIZE);
    }

    /**
     * @param extension - extension of the file (e.g. json, csv, txt)
     * @param file - file as buffer
     * @return TRUE if the file is valid, FALSE otherwise
     */
    private static isValidFile(extension: FileExtension, file: Buffer): boolean {
        if (Validator.isValidSize(file)) {
            switch (extension) {
                case FileExtension.JSON:
                    return Validator.validateJSON(file);
                case FileExtension.CSV:
                    return Validator.validateCSV(file);
                case FileExtension.HTML || FileExtension.PDF || FileExtension.EML || FileExtension.ICS || FileExtension.TCX || FileExtension.MBOX || FileExtension.XML:
                    return true;
                default:
                    return false;
            }
        }
        return false;
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
