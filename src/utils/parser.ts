import fs from "fs";
import Logger from "./logger";

export class Parser {
    private static logger = new Logger("Parser");

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

    static parseFromBufferToJson(data: Buffer, checkReplace: boolean): Array<any> | undefined {
        try {
            // /,(?![^\(\[]*[\]\)])/
            let matrix = data.toString().split(/\r?\n/).map((row: string) => row.split( /,(?=(?:(?:[^"]*"){2})*[^"]*$)/));
            (checkReplace) && (matrix = this.replaceCharacters('"','',matrix));
            //console.log(matrix);
            if (matrix && matrix.length > 2) {
                //matrix = matrix.map((s: string) => s.replace(/"/g, ''));
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

    static replaceCharacters(toChange: string, replaceValue: string, input: string[][]): string[][] {
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

    /** casi da gestire: "[{},{},...,{}]" oppure "425917031,518109031"**/
    /**portare fuori s.replace(/"/g, '') **/

    static parseAudibleDate(s: string): number{
        switch(s) {
            //sure values
            case 'JAN':
                return 1;
            case 'FEB':
                return 2;
            //not sure from here: MAR,APR may be not the true values representing that particular month
            case 'MAR':
                return 3;
            case 'APR':
                return 4;
            case 'MAY':
                return 5;
            case 'JUN':
                return 6;
            case 'JUL':
                return 7;
            case 'AUG':
                return 8;
            case 'SEP':
                return 9;
            case 'OCT':
                return 10;
            case 'NOV':
                return 11;
            case 'DEC':
                return 12;
            default:
                return -1;
        }
    }

    /**NOT WORKING: write function doesn't start from the last buffer position that has already had been written**/
    /*
    static CSVToBuffer2(source: string): Promise<Buffer>{
        let starting_length = 500;
        let counter_write = 0;
        let buffer: Buffer = Buffer.alloc(starting_length);
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
                function recursiveWrite() {
                    let res = buffer.write(chunk);
                    counter_write += res;
                    if (counter_write == starting_length) {
                        starting_length *= 2;
                        let new_buffer = Buffer.alloc(starting_length);
                        let res2 = buffer.copy(new_buffer, 0, 0,starting_length/2-res);
                        buffer = new_buffer;
                        counter_write = res2;
                        recursiveWrite();
                    }
                }
                recursiveWrite();
            });
            readStream.on('end', () => {
                //console.log(chunks);
                resolve(buffer);
            });
        });
    }
     */
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

