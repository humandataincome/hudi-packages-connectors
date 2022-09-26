import {parse, ParseConfig} from "papaparse";
import Logger from "./logger";

export class Parser {
    private static logger = new Logger("Parser");

    static parseCSVfromBuffer(source: Buffer, options: ParseConfig = {escapeChar: '"', header: true, skipEmptyLines: true}) {
        try {
            let data = source.toString();
            let result = parse(data, options);
            return result.data;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseCSVfromBuffer');
            return undefined;
        }
    }

    static extractJsonFromTwitterFile(file: Buffer): any | undefined {
        try {
            if (file) {
                const text = file.toString();
                //const regex: RegExp = /window(?:\..*)* = ((\[((\n)|(.*))*])|(\{((\n)|(.*))*}))/;
                //const regex: RegExp = /^window[.\w+]+ = \[\n((?:\n|.)*)]$/;
                const regex: RegExp = /^window[.\w+]+ = (\[\n(\n|.)*])$/
                const match = text.match(regex);
                //match && console.log(match[1]);
                if (match && match[1]) {
                    if (match[1] !== ' ') {
                        return JSON.parse(match[1]);
                    }
                }
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`,'extractJsonFromTwitterFile');
        }
        return undefined;
    }
}

