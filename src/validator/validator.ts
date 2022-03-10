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
     * @return Promise<Array<string>> - filter all the file paths from the directories paths
     */
    static async filterFilesPathsIntoZip(zipFile: Buffer): Promise<string[]> {
        const zip = await JSZip.loadAsync(zipFile);
        const keys = Object.keys(zip.files);

        return keys
            .filter((pathName) => zip.files[pathName].dir)
            .map((pathName) => pathName);
    }

    /**
     * @param zipFile - file zip as Buffer
     * @return {Promise<Buffer>} - zip file containing all the files from input that passed the validation
     */
    async validateZIP(zipFile: Buffer): Promise<Buffer> {
        const validatedFiles = new JSZip();
        const zip = await JSZip.loadAsync(zipFile);

        for (let pathName of Object.keys(zip.files)) {
            const file = zip.files[pathName];
            if (!file.dir) {
                const data = await file.async('nodebuffer');
                if (await this.isValideFile(await this.getFileExtension(pathName), data)) {
                    validatedFiles.file(pathName, data, {comment: file.comment});
                }
            }
        }
        return await validatedFiles.generateAsync({type: "nodebuffer"});
    }

    /**
     * @param fileName - string containing the file name
     * @return {Promise<FileExtension>} - return its extension (e.g. json, csv).
     */
    async getFileExtension(fileName: string): Promise<FileExtension> {
        const extension = fileName.split('.').pop();
        if (extension === 'csv') {
            return FileExtension.CSV;
        } else if (extension === 'json') {
            return FileExtension.JSON;
        } else if (extension === 'txt') {
            return FileExtension.TXT
        } else if (extension === 'xml') {
            return FileExtension.XML;
        } else if (extension === 'html') {
            return FileExtension.HTML;
        } else {
            throw new Error(`${ValidationErrorEnums.FILE_EXTENSION_ERROR}`);
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
        switch (extension) {
            case FileExtension.JSON:
                return await this.validateJSON(file);
            case FileExtension.TXT:
                return await this.validateTXT(file);
            case FileExtension.CSV:
                return await this.validateCSV(file);
            case FileExtension.XML:
                return await this.validateXML(file);
            case FileExtension.HTML:
                return await this.validateHTML(file);
            default:
                return false;
        }
    }

    /**
     * @param file - file as buffer
     * @return {boolean} - true if the file is valid and the size is supported
     */
    async validateJSON(file: Buffer): Promise<boolean> {
        if (Validator.isValideSize(file)) {
            try {
                return !!JSON.parse(file.toString());
            } catch (error) {
                throw new Error(`${ValidationErrorEnums.JSON_ERROR}: ${error}`);
            }
        }
        return false;
    }

    async validateXML(file: Buffer): Promise<boolean> {
        if (Validator.isValideSize(file)) {
            try {
                return true;
            } catch (error) {
                throw new Error(`${ValidationErrorEnums.XML_ERROR}: ${error}`);
            }
        }
        return false;
    }

    async validateCSV(file: Buffer): Promise<boolean> {
        if (Validator.isValideSize(file)) {
            try {
                return true;
            } catch (error) {
                throw new Error(`${ValidationErrorEnums.CSV_ERROR}: ${error}`);
            }
        }
        return false;
    }

    async validateHTML(file: Buffer): Promise<boolean> {
        if (Validator.isValideSize(file)) {
            try {
                return true;
            } catch (error) {
                throw new Error(`${ValidationErrorEnums.HTML_ERROR}: ${error}`);
            }
        }
        return false;
    }

    async validateTXT(file: Buffer): Promise<boolean> {
        if (Validator.isValideSize(file)) {
            try {
                return true;
            } catch (error) {
                throw new Error(`${ValidationErrorEnums.TXT_ERROR}: ${error}`);
            }
        }
        return false;
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
