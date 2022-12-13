import {parse, ParseConfig} from "papaparse";
import Logger from "./logger";
import * as pdf from "pdf-parse";

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

    static extractJsonFromTwitterFile(file: Buffer): Buffer | undefined {
        try {
            if (file) {
                const text = file.toString();
                //window.aaa.bbb.ccc = [JSON file] OR window.aaa.bbb.ccc = {JSON file}
                const regex: RegExp = /window(?:\..*)* = ((\[((\n)|(.*))*])|(\{((\n)|(.*))*}))/;
                const match = text.match(regex);
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

    static async parsePdf(file: Buffer): Promise<pdf.Result | undefined> {
        try {
            return await pdf(file);
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parsePdf');
            return undefined;
        }
    }
}

