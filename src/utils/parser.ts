import fs from "fs";
import * as Papa from "papaparse";
import Logger from "./logger";

export class Parser {
    private static logger = new Logger("Parser");

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

