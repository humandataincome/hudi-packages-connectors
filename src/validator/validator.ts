import {FileCode} from "../descriptor/descriptor.enum";
import fs, {Stats} from "fs";
import ErrnoException = NodeJS.ErrnoException;

export class Validator {

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

    async valideSize(fileCode: FileCode, filePath: string): Promise<boolean> {
        try {
            fs.stat(filePath, (err: ErrnoException | null, stats: Stats) => {
                if (err) {
                    throw (`Error opening file stats.`);
                } else {
                    switch (fileCode) {
                        case FileCode.INSTAGRAM_ADS_CLICKED:
                            return stats.size > 10000; //> 10KB
                        default:
                            throw ("File Code not recognized");
                    }
                }
            });
            return false;
        } catch(error) {
            throw ("Error in valideSize function: " + error);
        }
    }

}