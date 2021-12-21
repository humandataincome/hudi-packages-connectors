import {parse} from "csv-parse";
import fs from "fs";
import Logger from "./logger";

export class Parser {
    private static logger = new Logger("Parser");

    static parseCSV(source: string, options: object, filter: Function = (x: any) => (x)) {
        return new Promise((resolve, reject) => {
            const parser = parse(options, function (error, csvLine) {
                try {
                    let result = csvLine.map(filter);
                    resolve(result);
                } catch {
                    reject(error);
                }
            });
            const stream = fs.createReadStream(source, {encoding: 'utf8'});
            stream.on('error', (error: any) => {
                if (error.code == 'ENOENT') {
                    this.logger.log('error', 'module '+source+' not found');
                } else {
                    throw error;
                }
            });
            stream.pipe(parser);
        });
    }
}