import {FileExtension} from "../descriptor/descriptor.enum";
import * as JSZip from "jszip";
import {ValidationErrorEnums} from "./validator.error";

export class Validator {

    constructor(private readonly MAX_BYTE_FILE_SIZE: number = 6e6, private readonly MIN_BYTE_FILE_SIZE: number = 50) {}

    async getFilesPathsIntoZip(zipFile: Buffer): Promise<Array<string>> {
        let filesPath: Array<string> = [];
        await JSZip.loadAsync(zipFile).then(async (zip: JSZip) => {
            const keys = Object.keys(zip.files);
            await Promise.all(keys.map(async (pathName: string) => {
                const file = zip.files[pathName];
                if (!file.dir) {
                    filesPath.push(pathName);
                }
            }));
        });
        return filesPath;
    }

    async validateZIP(zipFile: Buffer): Promise<Buffer> {
        let validatedFiles = new JSZip();
        await JSZip.loadAsync(zipFile).then(async (zip: JSZip) => {
            const keys = Object.keys(zip.files);
            await Promise.all(keys.map(async (pathName: string) => {
                const file = zip.files[pathName];
                if (!file.dir) {
                    await file.async('nodebuffer').then(async (data: Buffer) => {
                        if (await this.isValideFile(await this.getFileExtension(pathName), data)) {
                            validatedFiles.file(pathName, data, {comment: file.comment});
                        }
                    });
                }
            }));
        });
        return await validatedFiles.generateAsync({type: "nodebuffer"});
    }

    async getFileExtension(fileName: string): Promise<FileExtension> {
        const extension = fileName.split('.').pop();
        if (extension == 'csv') {
            return FileExtension.CSV;
        } else if (extension == 'json') {
            return FileExtension.JSON;
        } else if (extension == 'txt') {
            return FileExtension.TXT
        } else if (extension == 'xml') {
            return FileExtension.XML;
        } else if (extension == 'html') {
            return FileExtension.HTML;
        } else {
            throw new Error(`${ValidationErrorEnums.FILE_EXTENSION_ERROR}`);
        }
    }

    private isValideSize(file: Buffer): boolean {
        return (file.byteLength < this.MAX_BYTE_FILE_SIZE) && (file.byteLength > this.MIN_BYTE_FILE_SIZE);
    }

    private async isValideFile(extension: FileExtension, file: Buffer): Promise<boolean> {
        switch(extension){
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

    async validateJSON(file: Buffer): Promise<boolean> {
        if(this.isValideSize(file)) {
            try {
                return !!JSON.parse(file.toString());
            } catch (error) {
                throw new Error(`${ValidationErrorEnums.JSON_ERROR}: ${error}`);
            }
        }
        return false;
    }

    async validateXML(file: Buffer): Promise<boolean> {
        if(this.isValideSize(file)) {
            try {
                return true;
            } catch (error) {
                throw new Error(`${ValidationErrorEnums.XML_ERROR}: ${error}`);
            }
        }
        return false;
    }

    async validateCSV(file: Buffer): Promise<boolean> {
        if(this.isValideSize(file)) {
            try {
                return true;
            } catch (error) {
                throw new Error(`${ValidationErrorEnums.CSV_ERROR}: ${error}`);
            }
        }
        return false;
    }

    async validateHTML(file: Buffer): Promise<boolean> {
        if(this.isValideSize(file)) {
            try {
                return true;
            } catch (error) {
                throw new Error(`${ValidationErrorEnums.HTML_ERROR}: ${error}`);
            }
        }
        return false;
    }

    async validateTXT(file: Buffer): Promise<boolean> {
        if(this.isValideSize(file)) {
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
        if(Object.getPrototypeOf(obj) === Object.prototype) {
            if (obj && Object.keys(obj).length > 0) {
                const reducer = (previousValue: boolean, currentValue: string) => {
                    return (obj[currentValue] == '') && previousValue;
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