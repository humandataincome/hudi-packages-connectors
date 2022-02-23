import {FileExtension} from "../descriptor/descriptor.enum";
import * as JSZip from "jszip";

export class Validator {

    private MAX_BYTE_FILE_SIZE: number = 6e6;
    private MIN_BYTE_FILE_SIZE: number = 100;

    /*TO ADD:
    - check validity of the single file based on its extension (csv, json, ecc)
    - return a zip file as buffer with only the useful files
     */
    async validateZIP(zipDataBuffer: Buffer) {
        JSZip.loadAsync(zipDataBuffer).then((zip: JSZip) => {
            Object.keys(zip.files).map((fileName: string) => {
                const file = zip.files[fileName];
                if (!file.dir) {
                    // @ts-ignore
                    const fileSizeInByte = file["_data"].uncompressedSize;
                    if(fileSizeInByte < this.MAX_BYTE_FILE_SIZE && fileSizeInByte > this.MIN_BYTE_FILE_SIZE) {
                        file.async('string')
                            .then(async (data: string) => {
                                if (await this.isValideFile(this.getFileExtension(fileName), data)) {
                                    //add the file to a new zip



                                }
                            });
                    }
                }
            });
        });
    }

    getFileExtension(fileName: string): FileExtension {
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

    private async isValideFile(extension: FileExtension, file: string): Promise<boolean> {
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

    async validateJSON(file: string): Promise<boolean> {
        return false;
    }

    async validateXML(file: string): Promise<boolean> {
        return false;
    }

    async validateCSV(file: string): Promise<boolean> {
        const regex = /^([^;\r\n]*)$/;
        //regex (parte iniziale)(sequenza di xxx,)(stringa finale)
        return false;
    }

    async validateHTML(file: string): Promise<boolean> {
        return false;
    }

    async validateTXT(file: string): Promise<boolean> {
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