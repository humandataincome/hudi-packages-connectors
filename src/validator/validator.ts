import {FileCode, FileFormat} from "../descriptor/descriptor.enum";
import ErrnoException = NodeJS.ErrnoException;

export class Validator {

    private readonly MIN_BYTE_FILE_SIZE: number = 100;
    private readonly MAX_BYTE_FILE_SIZE: number = 6e6; //6 MB

    /*
    async isValideFile(filePath: string): Promise<boolean> {
        if (stats.size > this.MIN_BYTE_FILE_SIZE) {
            if (stats.size < this.MAX_BYTE_FILE_SIZE) {
                let code = path.parse(filePath).ext;
                switch (code) {
                    case FileFormat.XML:
                        return Validator.validateXML(filePath);
                    case FileFormat.CSV:
                        return Validator.validateCSV(filePath);
                    case FileFormat.JSON:
                        return Validator.validateJSON(filePath);
                    case FileFormat.HTML:
                        return Validator.validateHTML(filePath);
                    case FileFormat.TXT:
                        return Validator.validateTXT(filePath);
                    default:
                        throw new Error('File Format not recognized');
                }
            } else {
                throw new Error("File too large");
            }
        } else {
            throw new Error("Empty File");
        }
    }
     */

    private static validateXML(path: string): boolean {
        return false;
    }
    private static validateCSV(path: string): boolean {
        return false;
    }
    private static validateJSON(path: string): boolean {
        return false;
    }
    private static validateHTML(path: string): boolean {
        return false;
    }
    private static validateTXT(path: string): boolean {
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