import {FileExtension} from "../descriptor";
import * as JSZip from "jszip";
import {ValidationErrorEnums} from "./validator.error";

export class Validator {
    private static _MAX_BYTE_FILE_SIZE: number = 6e6;
    private static _MIN_BYTE_FILE_SIZE: number = 50;

    get MAX_BYTE_FILE_SIZE(): number {
        return Validator._MAX_BYTE_FILE_SIZE;
    }

    set MAX_BYTE_FILE_SIZE(value: number) {
        Validator._MAX_BYTE_FILE_SIZE = value;
    }

    get MIN_BYTE_FILE_SIZE(): number {
        return Validator._MIN_BYTE_FILE_SIZE;
    }

    set MIN_BYTE_FILE_SIZE(value: number) {
        Validator._MIN_BYTE_FILE_SIZE = value;
    }

    /**
     * @param zipFile - file zip as Buffer
     * @return {Promise<Array<string>} - filter all the file paths from the directories paths
     */
    static async getFilesPathsIntoZip(zipFile: Buffer): Promise<string[]> {
        const zip = await JSZip.loadAsync(zipFile);
        const keys = Object.keys(zip.files);

        return keys
            .filter((pathName) => !zip.files[pathName].dir)
            .map((pathName) => pathName);
    }

    /**
     * @param zipFile - file zip as Buffer
     * @param validatedFiles - optional
     * @return {Promise<Buffer>} - zip file containing all the files from input that passed the validation
     */
    async validateZIP(zipFile: Buffer, validatedFiles: JSZip = new JSZip()): Promise<Buffer> {
        const zip = await JSZip.loadAsync(zipFile);
        let hasAnyFile = false;
        for (let pathName of Object.keys(zip.files)) {
            const file = zip.files[pathName];
            if (!file.dir) {
                const fileBuffer = await file.async('nodebuffer');
                const fileExtension = this.getFileExtension(pathName);
                if(fileExtension === FileExtension.ZIP) {
                    await this.validateZIP(fileBuffer, validatedFiles);
                } else if (await this.isValideFile(fileExtension, fileBuffer)) {
                    validatedFiles.file(pathName, fileBuffer, {comment: file.comment});
                    (!hasAnyFile) && (hasAnyFile = true);
                }
            }
        }
        if(hasAnyFile) {
            return await validatedFiles.generateAsync({type: "nodebuffer"});
        } else {
            throw new Error(`${ValidationErrorEnums.EMPTY_FILE_ERROR}: File ZIP is empty`);
        }
    }

    /**
     * @param fileName - string containing the file name
     * @return {Promise<FileExtension>} - return its extension (e.g. json, csv).
     */
    getFileExtension(fileName: string): FileExtension {
        const segments = fileName.split('.');
        if (segments[segments.length-1] === 'csv') {
            return FileExtension.CSV;
        } else if (segments[segments.length-1] === 'json') {
            return FileExtension.JSON;
        } else if (segments[segments.length-1] === 'zip') {
            return FileExtension.ZIP;
        } else {
            //throw new Error(`${ValidationErrorEnums.FILE_EXTENSION_ERROR}: File extension ${segments[segments.length-1]} not supported`);
            return FileExtension.OTHER;
        }
    }

    /**
     * @param file - file as buffer
     * @return {boolean} - true if the size is included between MAX_BYTE_FILE_SIZE and MIN_BYTE_FILE_SIZE
     */
    private static isValideSize(file: Buffer): boolean {
        return (file.byteLength < Validator._MAX_BYTE_FILE_SIZE) && (file.byteLength > Validator._MIN_BYTE_FILE_SIZE);
    }

    private async isValideFile(extension: FileExtension, file: Buffer): Promise<boolean> {
        if (Validator.isValideSize(file)) {
            switch (extension) {
                case FileExtension.JSON:
                    return await this.validateJSON(file);
                case FileExtension.CSV:
                    return await this.validateCSV(file);
                case FileExtension.OTHER:
                    return false;
                default:
                    return false;
            }
        } else {
            return false;
        }
    }

    /**
     * @param file - file as buffer
     * @return {boolean} - true if the file is valid and the size is supported
     */
    async validateJSON(file: Buffer): Promise<boolean> {
        try {
            return !!JSON.parse(file.toString());
        } catch (error) {
            throw new Error(`${ValidationErrorEnums.JSON_ERROR}: ${error}`);
        }
    }

    async validateCSV(file: Buffer): Promise<boolean> {
        try {
            return true;
        } catch (error) {
            throw new Error(`${ValidationErrorEnums.CSV_ERROR}: ${error}`);
        }
    }

    /**
     * Given any input, if this is a not empty object (it has at least a key and a parameter not empty) return false,
     * otherwise return true.
     * @param obj
     * @return boolean
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
     * @return Date
     */
    static convertWebkitTimestamp(time: number): Date {
        const dateInSeconds = Math.round(time / 1000000) - 11644473600;
        return new Date(dateInSeconds * 1000);
    }

}
