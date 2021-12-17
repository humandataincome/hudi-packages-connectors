import {parse} from "csv-parse";
import fs from "fs";

export class Parser {

    static parseCSV(source: string) {
        return new Promise((resolve, reject) => {
            let result: any[] = [];
            const parser = parse({delimiter: ',', columns: true}, function (err, csvLine) {
                for (let l = 0; l < csvLine.length; l++) {
                    result.push(csvLine[l]);
                }
                resolve(result);
            });
            fs.createReadStream(source, {encoding: 'utf8'}).pipe(parser);
        });
    }
}