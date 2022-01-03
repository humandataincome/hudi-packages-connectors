import fs from "fs";
import Logger from "./logger";

export class Parser {
    private static logger = new Logger("Parser");

    /**
     * Functions return a Buffer given a CSV file.
     * @param source - is the path to the csv file we want to transform into Buffer.
     * @return {Promise<Buffer>}
     */
    static CSVToBuffer(source: string): Promise<Buffer>{
        let buffer: Buffer[] = [];
        const readStream = fs.createReadStream(source, {encoding: 'utf8'});
        return new Promise((resolve, reject) => {
            readStream.on('error', (error: any) => {
                if (error.code == 'ENOENT') {
                    this.logger.log('error', `Module: `+source+' not found', 'CSVToBuffer');
                } else {
                    this.logger.log('error', `${error.code}`, 'CSVToBuffer');
                }
                reject(error);
            });
            readStream.on('data', (chunk: string) => {
                buffer.push(Buffer.from(chunk));
            });
            readStream.on('end', () => {
                let x = Buffer.concat(buffer);
                resolve(x);
            });
        });
    }

    /**
     * Function returns a JSON Array given a Buffer representing a CSV file.
     * Objects are mapped using the first line parameters ad keys and all the others lines as values.
     * @param data - Buffer representing the csv file we want to parse into JSON.
     * @param checkReplace - boolean value is true if replacing double brackets is needed.
     * @return {Array<any>} - Array of JSON objects.
     */
    static parseFromBufferToJson(data: Buffer, checkReplace: boolean): Array<any> | undefined {
        try {
            /** regex is made to ignore all commas inside fields delimited by double brackets**/
            let regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
            let matrix = data.toString().split(/\r?\n/).map((row: string) => row.split( regex));
            (checkReplace) && (matrix = this.replaceCharacters('"','',matrix));
            if (matrix && matrix.length > 2) {
                matrix.pop();
                let keys = matrix.shift();
                let values: any[] = [];
                matrix.map(array => {
                    let result: any = {};
                    array.map((value, i) => {
                        keys && (result[keys[i]] = value);
                    });
                    values.push(result);
                });
                return values;
            }
        } catch (e: any) {
            this.logger.log('error', `${e.code}`,'parseFromBufferToJson');
        }
    }

    /**
     * This function is usually used to change all the double brackets occurrences in some csv files.
     * @param toChange - string value representing the characters that we want to change.
     * @param replaceValue - change occurrences with this string.
     * @param input - matrix of strings that we want to modify.
     * @return {string[][]} - the same string in input, but modified.
     */
    private static replaceCharacters(toChange: string, replaceValue: string, input: string[][]): string[][] {
        input = input.map((array: string[]) => {
            array = array.map((value: string) => {
                let regex = new RegExp(toChange, 'g');
                value = value.replace(regex, replaceValue);
                return value;
            });
            return array;
        });
        return input;
    }

    /**
     * Function returns the respective month number given its abbreviation.
     * @param key - string representing the month's abbreviation (i.e. JAN for January).
     * @return number
     */
    static parseAudibleDate(key: string): number{
        switch(key) {
            //sure values
            case 'JAN': return 1;
            case 'FEB': return 2;
            //not sure from here since they never occur into the mock files: MAR,APR,.. may be not the right values representing that particular month
            case 'MAR': return 3;
            case 'APR': return 4;
            case 'MAY': return 5;
            case 'JUN': return 6;
            case 'JUL': return 7;
            case 'AUG': return 8;
            case 'SEP': return 9;
            case 'OCT': return 10;
            case 'NOV': return 11;
            case 'DEC': return 12;
            default: return -1;
        }
    }

    /*
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
     */
}

