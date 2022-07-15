import { parse } from "papaparse";
import Logger from "./logger";

export class Parser {
    private static logger = new Logger("Parser");

    static parseCSVfromBuffer(source: Buffer, options: object = {escapeChar: '"', header: true, skipEmptyLines: true}) {
        try {
            let data = source.toString();
            let result = parse(data, options);
            return result.data;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseCSVfromBuffer');
            return undefined;
        }
    }

    static extractJsonFromTwitterFile(file: Buffer): Buffer | undefined {
        try {
            if (file) {
                const text = file.toString();
                //window.aaa.bbb.ccc = [JSON file] OR window.aaa.bbb.ccc = {JSON file}
                const match = text.match(/^window(?:\..*)* = ((\[((\n)|(.*))*])|(\{((\n)|(.*))*}))$/);
                if (match && match[1]) {
                    if (match[1] !== '[ ]') {
                        return Buffer.from(match[1]);
                    }
                }
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`,'extractJsonFromTwitterFile');
        }
        return undefined;
    }
}

