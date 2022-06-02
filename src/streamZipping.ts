import {
    zip,
    FlateError,
    unzip,
    Unzip,
    UnzipFile,
    UnzipFileInfo,
    UnzipInflate,
    Unzipped,
    Zip, Zippable, zipSync, AsyncZippable
} from "fflate";
import {ValidatorFacebook} from "./validator";

interface ValidationReturn {
    zipFile: Uint8Array,
    includedFiles: string[],
    excludedFiles: string[],
}

export class StreamZipping {
    private static mergeBuffers(buffer1: Uint8Array, buffer2: Uint8Array): Uint8Array {
        const tmp = new Uint8Array(buffer1.length + buffer2.length);
        tmp.set(buffer1, 0);
        tmp.set(buffer2, buffer1.length);
        return tmp;
    }

    static unzipStream(readableStream: NodeJS.ReadableStream): ValidationReturn {
        const ret: ValidationReturn = {
            zipFile: new Uint8Array(0),
            includedFiles: [],
            excludedFiles: [],
        }

        const validFiles: AsyncZippable = {};
        let finalZip: Uint8Array;
        let tmpChunk: Uint8Array = new Uint8Array();

        const unzipStream = new Unzip((stream: UnzipFile) => {
            stream.ondata = (err: FlateError | null, chunk: Uint8Array, final: boolean) => {
                //if(err) console.log(err);
                console.log(stream.name);
                if (true) {
                    if (final) {
                        console.log(tmpChunk.length);
                        tmpChunk = this.mergeBuffers(tmpChunk, chunk);
                        console.log(chunk.length, tmpChunk.length);
                        if (tmpChunk.length > 0) {
                            validFiles[stream.name] = tmpChunk;
                        }
                        tmpChunk = new Uint8Array();
                    } else {
                        console.log(tmpChunk.length);
                        tmpChunk = this.mergeBuffers(tmpChunk, chunk);
                        console.log(chunk.length, tmpChunk.length);
                    }
                }
            };
            stream.start();
            /*
            //BUILD NEW ZIP
            zip(validFiles,{},
                (err:FlateError|null, data: Uint8Array) => {
                    finalZip = data;
                });

             */
        });
        unzipStream.register(UnzipInflate); //AsyncUnzipInflate
        console.log(validFiles);


        readableStream.on('error', function (error: Error) {
            console.log(`error: ${error.message}`);
        });
        readableStream.on('data', (chunk: Buffer) => {
            unzipStream.push(chunk);
        });
        readableStream.on('end', async () => {
            console.log('END READING');
        });
        return ret;

    }



    static async validateZipAsync(zipFile: Buffer): Promise<void> {
        const decompressed = await unzip(zipFile, {
                filter(file: UnzipFileInfo) {
                    if (file.size > 0) {
                        return ValidatorFacebook.getInstance().getValidPath(file.name) !== undefined;
                    }
                    return false;
                }
            },
            (err: FlateError | null, data: Unzipped) => {
                console.log(data);
            });
        console.log("AAAAA");
    }
}
