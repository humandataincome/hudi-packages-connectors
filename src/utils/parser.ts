import {parse} from "csv-parse";
import fs from "fs";

export class Parser {

    static parseCSV(source: string, options: object) {
        return new Promise((resolve, reject) => {
            let result: any[] = [];
            const parser = parse(options, function (error, csvLine) {
                try {
                    for (let l = 0; l < csvLine.length; l++) {
                        result.push(csvLine[l]);
                    }
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