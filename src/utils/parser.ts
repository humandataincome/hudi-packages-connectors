import fs from "fs";
import * as Papa from "papaparse";
import Logger from "./logger";

export class Parser {
    private static logger = new Logger("Parser");

    /**
     * Function returns the respective month number given its abbreviation.
     * @param key - string representing the month's abbreviation (i.e. JAN for January).
     * @return number
     */
    static parseAudibleDate(key: string): number{
        switch(key) {
            //sure values
            case 'JAN': return 1;
            case 'FEB': return 2;
            //not sure from here since they never occur into the mock files: MAR,APR,.. may be not the right values representing that particular month
            case 'MAR': return 3;
            case 'APR': return 4;
            case 'MAY': return 5;
            case 'JUN': return 6;
            case 'JUL': return 7;
            case 'AUG': return 8;
            case 'SEP': return 9;
            case 'OCT': return 10;
            case 'NOV': return 11;
            case 'DEC': return 12;
            default: return -1;
        }
    }

    static parseCSVfromBuffer(source: Buffer,
                              options: object = {escapeChar: '"', header: true, skipEmptyLines: true}): Array<object> | undefined {
        try {
            let matrix = source.toString();
            let result = Papa.parse(matrix, options);
            return <Array<object>>result.data;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseCSVfromBuffer');
        }
    }

}

