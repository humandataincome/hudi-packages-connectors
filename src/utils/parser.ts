import * as Papa from "papaparse";
import Logger from "./logger";

export class Parser {
    private static logger = new Logger("Parser");

    static parseCSVfromBuffer(source: Buffer, options: object = {escapeChar: '"', header: true, skipEmptyLines: true}) {
        try {
            let data = source.toString();
            let result = Papa.parse(data, options);
            return result.data;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseCSVfromBuffer');
            return undefined;
        }
    }

}

