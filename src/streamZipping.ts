import {
    zip,
    FlateError,
    unzip,
    Unzip,
    UnzipFile,
    UnzipFileInfo,
    UnzipInflate,
    Unzipped,
    AsyncZippable,
} from "fflate";
import {ValidateZipOptions, ValidatorFacebook} from "./validator";

export interface ValidationReturn2 {
    zipFile: Uint8Array,
    includedFiles: string[],
    excludedFiles: string[],
}

interface StreamingObjectsSupport {
    readableStream: NodeJS.ReadableStream;
    returnObject: ValidationReturn2;
    validFiles: AsyncZippable;
    options: ValidateZipOptions;
}

interface FileBuilder {
    tmpChunks: Uint8Array[];
    finalChunk: Uint8Array | undefined;
    hasCorruptedChunk: boolean;
}

export class StreamZipping {

    static async validateZip(readableStream: NodeJS.ReadableStream, options: ValidateZipOptions = {}): Promise<ValidationReturn2> {
        const ret: ValidationReturn2 = {
            zipFile: new Uint8Array(),
            includedFiles: [],
            excludedFiles: [],
        }

        const support: StreamingObjectsSupport = {
            readableStream: readableStream,
            returnObject: ret,
            validFiles: {},
            options: options,
        };

        await this.unzipStream(support);

        //BUILD NEW ZIP
        await zip(support.validFiles, {},
            (err: FlateError | null, data: Uint8Array) => {
                ret.zipFile = data;
            });
        return ret;
    }


    private static unzipStream(support: StreamingObjectsSupport) {
        const unzipStream: Unzip = this.getUnzipStream(support);
        unzipStream.register(UnzipInflate); //AsyncUnzipInflate

        return new Promise((resolve, reject) => {
            support.readableStream.on('error', function (error: Error) {
                reject(`Error: ${error.message}`);
            });
            support.readableStream.on('data', (chunk: Buffer) => {
                unzipStream.push(chunk);
            });
            support.readableStream.on('end', async () => {
                resolve('Reading stream in input ended');
            });
        });
    }


    private static getUnzipStream(support: StreamingObjectsSupport): Unzip {
        let fileBuilder: FileBuilder = {
            tmpChunks: [],
            finalChunk: undefined,
            hasCorruptedChunk: false,
        };

         return new Unzip((stream: UnzipFile) => {
            stream.ondata = (err: FlateError | null, chunk: Uint8Array, final: boolean) => {
                if (err) {
                    console.log('An error occurred on ' + stream.name + ' file');
                }
                if (!fileBuilder.hasCorruptedChunk) {
                    this.composeFile(stream.name, chunk, final, fileBuilder);
                }
                if (final) {
                    if (!fileBuilder.hasCorruptedChunk && fileBuilder.finalChunk) {
                        support.returnObject.includedFiles.push(stream.name);
                        if (support.options.filterDataSource) {
                            const validaPathName = this.getValidPathName(stream.name, support.options);
                            if (validaPathName) {
                                support.validFiles[validaPathName] = fileBuilder.finalChunk;
                            } else {
                                support.returnObject.excludedFiles.push(stream.name);
                            }
                        } else {
                            support.validFiles[stream.name] = fileBuilder.finalChunk;
                        }
                    } else {
                        support.returnObject.excludedFiles.push(stream.name);
                    }
                    this.initFileBuilder(fileBuilder);
                }
            };
            stream.start();
        });
    }

    private static initFileBuilder(tmpSupport: FileBuilder): void {
        tmpSupport.tmpChunks = [];
        tmpSupport.finalChunk = undefined;
        tmpSupport.hasCorruptedChunk = false;
    }

    private static composeFile (fileName: string, chunk: Uint8Array, finalChunk: boolean, tmpSupport: FileBuilder,  optionsValidation: ValidateZipOptions = {}){
        if(chunk) {
            if (!finalChunk) {
                tmpSupport.tmpChunks.push(chunk);
            } else {
                //final chunk
                if (!tmpSupport.hasCorruptedChunk) {
                    tmpSupport.tmpChunks.push(chunk);
                    tmpSupport.finalChunk = this.mergeBuffers(tmpSupport.tmpChunks);
                }
            }
        } else {
            tmpSupport.hasCorruptedChunk = true;
        }
    }

    private static getValidPathName(pathName: string, optionsValidation: ValidateZipOptions): string | undefined {
        return pathName;
    }

    private static mergeBuffers(buffers: Uint8Array[]): Uint8Array {
        const finalBuffer = new Uint8Array(buffers.reduce(
            (previousBufferLength: number, currentBuffer: Uint8Array) => previousBufferLength + currentBuffer.length,
            0
        ));
        let lastOffset = 0;
        buffers.forEach((buffer: Uint8Array) => {
            finalBuffer.set(buffer, lastOffset);
            lastOffset += buffer.length;
        });
        return finalBuffer;
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
