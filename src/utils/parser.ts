import {parse, ParseConfig} from "papaparse";
import Logger from "./logger";

export class Parser {
    private static logger = new Logger("Parser");

    static parseCSVfromBuffer(source: Buffer, options: ParseConfig = {escapeChar: '"', header: true, skipEmptyLines: true}) {
        try {
            let data = source.toString();
            let result = parse(data, options);
            return result.data;
        } catch (error: any) {
            this.logger.log('error', `${error}`,'parseCSVfromBuffer');
            return undefined;
        }
    }

    static extractJsonFromTwitterFile(file: Buffer): any | undefined {
        try {
            if (file) {
                let text = file.toString();
                let strings = text.split('[');
                strings.shift();
                let textJSON = '['+strings.join('[');
                if (textJSON !== ' ' && textJSON !== '') {
                    return JSON.parse(textJSON);
                } else {
                    let strings = text.split('{');
                    strings.shift();
                    let textJSON = '[' + strings.join('{');
                    if (textJSON !== ' ' && textJSON !== '') {
                        return JSON.parse(textJSON);
                    }
                }
            }
        } catch (error: any) {
            this.logger.log('error', `${error}`,'extractJsonFromTwitterFile');
        }
        return undefined;
    }
}

