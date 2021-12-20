import {parse} from "csv-parse";
import fs from "fs";

export class Parser {

    static parseCSV(source: string, options: object, filter: Function = (x: any) => (x)) {
        return new Promise((resolve, reject) => {
            const parser = parse(options, function (error, csvLine) {
                try {
                    let result = csvLine.map(filter);
                    resolve(result);
                } catch {
                    if (error) {
                        console.error("Error "+error?.code+" parsing file: "+ source);
                    } else {
                        console.error("Error parsing file: "+ source);
                    }
                    reject(error);
                }
            });
            fs.createReadStream(source, {encoding: 'utf8'}).pipe(parser);
        });
    }
}