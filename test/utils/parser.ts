import fs from "fs";

export class Parser{
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
                console.log(`CSVToBuffer: Module: `+source+' not found');
            } else {
                console.log(`CSVToBuffer: ${error}`);
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
}
