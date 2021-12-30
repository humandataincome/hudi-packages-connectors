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

    static parseFromBufferToJson<Type>(data: Buffer, checkBrackets: boolean): Array<Type> | undefined {
        try {
            let matrix = this.clearDataBuffer(data, checkBrackets);
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
    /** casi da gestire: "[{},{},...,{}]" oppure "425917031,518109031"**/
    /**portare fuori s.replace(/"/g, '') **/

    private static clearDataBuffer(data: Buffer, checkBrackets: boolean): string[][] | undefined{
        try {
            if(checkBrackets){
                return data.toString().split(/\r?\n/).map((s: string) => s.replace(/"/g, '')).map((row: string) => row.split(/,(?![^\(\[]*[\]\)])/));
            } else {
                return data.toString().split(/\r?\n/).map((row: string) => row.split(/,(?![^\(\[]*[\]\)])/));
            }
        } catch (e: any) {
            this.logger.log('error', `${e.code}`,'clearDataBuffer');
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

