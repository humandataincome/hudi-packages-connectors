import {FileExtension} from "../descriptor/descriptor.enum";
import * as JSZip from "jszip";

export class Validator {

    private MAX_BYTE_FILE_SIZE: number = 6e6; //6 MB
    private MIN_BYTE_FILE_SIZE: number = 50; //50 B

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
                    // @ts-ignore
                    const fileSizeInByte = file["_data"].uncompressedSize;
                    if(this.isValideSize(fileSizeInByte)) {
                        await file.async('nodebuffer').then(async (data: Buffer) => {
                            if (await this.isValideFile(await this.getFileExtension(pathName), data)) {
                                validatedFiles.file(pathName, data, {comment: file.comment});
                            }
                        });
                    }
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
            throw Error("File Extension not recognized");
        }
    }

    private isValideSize(fileSizeInByte: number): boolean {
        return fileSizeInByte < this.MAX_BYTE_FILE_SIZE && fileSizeInByte > this.MIN_BYTE_FILE_SIZE
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
        return !!JSON.parse(file.toString());
    }

    async validateXML(file: Buffer): Promise<boolean> {
        return true;
    }

    async validateCSV(file: Buffer): Promise<boolean> {
        return true;
    }

    async validateHTML(file: Buffer): Promise<boolean> {
        return true;
    }

    async validateTXT(file: Buffer): Promise<boolean> {
        return true;
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