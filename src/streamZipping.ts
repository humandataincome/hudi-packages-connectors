import {
    AsyncUnzipInflate,
    FlateError,
    unzip,
    Unzip,
    UnzipFile,
    UnzipFileInfo,
    UnzipInflate,
    Unzipped,
    Zip
} from "fflate";
import {ValidatorFacebook} from "./validator";


export class StreamZipping {
    static unzipStream(readableStream: NodeJS.ReadableStream) {
        const unzipStream = new Unzip((stream: UnzipFile) => {
            //console.log(stream.name)
            stream.ondata = (err, chunk, final) => {
                //console.log(chunk)
            } ;
            stream.start();
        });
        unzipStream.register(UnzipInflate); //AsyncUnzipInflate

        readableStream.on('error', function (error: Error) {
            console.log(`error: ${error.message}`);
        });
        readableStream.on('data', (chunk: Buffer) => {
            unzipStream.push(chunk, false);
        });
        readableStream.on('end', async () => {
            unzipStream.push(new Uint8Array(0), true);
        });
    }

    static zipStream() {
        const zipStream = new Zip();

        let finalData: Uint8Array;
        zipStream.ondata = (err: FlateError | null, data: Uint8Array, final: boolean) => {
            let tmpData = finalData;
            //migliorabile se si conosce la dimensione totale a priori
            finalData = new Uint8Array(finalData.length + data.length);
            finalData.set(tmpData);
            finalData.set(data, tmpData.length);
        };
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
