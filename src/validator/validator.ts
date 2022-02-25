import {FileExtension} from "../descriptor/descriptor.enum";
import * as JSZip from "jszip";
import {ValidatedFile} from "./validator.model";

export class Validator {

    private MAX_BYTE_FILE_SIZE: number = 6e6; //6 MB
    private MIN_BYTE_FILE_SIZE: number = 50; //50 B

    /*TO ADD:
    - check validity of the single file based on its extension (csv, json, ecc)
     */
    async validateZIP(zipDataBuffer: Buffer): Promise<Array<ValidatedFile>> {
        let validatedFiles: Array<ValidatedFile> = [];
        await JSZip.loadAsync(zipDataBuffer).then(async (zip: JSZip) => {
            const keys = Object.keys(zip.files);
            await Promise.all(keys.map(async (pathName: string) => {
                const file = zip.files[pathName];
                if (!file.dir) {
                    // @ts-ignore
                    const fileSizeInByte = file["_data"].uncompressedSize;
                    if(this.isValideSize(fileSizeInByte)) {
                        await file.async('string').then((data: string) => {
                            if (this.isValideFile(this.getFileExtension(pathName), data)) {
                                const validatedFile: ValidatedFile = {data: Buffer.from(data), path: pathName};
                                validatedFiles.push(validatedFile);
                            }
                        });
                    }
                }
            }));
        });
        return validatedFiles;
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

    private isValideSize(fileSizeInByte: number): boolean {
        return fileSizeInByte < this.MAX_BYTE_FILE_SIZE && fileSizeInByte > this.MIN_BYTE_FILE_SIZE
    }

    private isValideFile(extension: FileExtension, file: string): boolean {
        return true;
        /*
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

         */
    }

    async validateJSON(file: string): Promise<boolean> {
        return true;
    }

    async validateXML(file: string): Promise<boolean> {
        return true;
    }

    async validateCSV(file: string): Promise<boolean> {
        const regex = /^([^;\r\n]*)$/;
        //regex (parte iniziale)(sequenza di xxx,)(stringa finale)
        return true;
    }

    async validateHTML(file: string): Promise<boolean> {
        return true;
    }

    async validateTXT(file: string): Promise<boolean> {
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