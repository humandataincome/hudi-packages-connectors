import {
    DataSourceCode,
    ValidationReturn,
    ValidationStatus,
    ValidationZipStatus,
    ValidatorFiles
} from "../../src";
import {ReadableStream} from 'node:stream/web';
import {lastValueFrom, Observable} from "rxjs";
import ErrnoException = NodeJS.ErrnoException;

describe('Validation Test', () => {
    const pathToZip = "../../src/mock/datasource/zip files/instagram.zip";
    const expectedBytes = 107857;
    test('validateZip', async () => {
        const validatedZip = await validateZip(pathToZip);
        expect(validatedZip!.zipFile.length).toBe(expectedBytes);
    });
    test('validateZipStream', async () => {
        const validatedZip = await validateZipStream(pathToZip);
        expect(validatedZip!.zipFile.length).toBe(expectedBytes);
    });
});


async function validateZip(pathToZip: string): Promise<ValidationReturn | undefined> {
    const fs = require('fs');
    const path = require('path');
    const data = fs.readFileSync(path.join(__dirname, pathToZip));
    return ValidatorFiles.validateZip(data,
        {
            filterDataSource: {
                dataSourceCode: DataSourceCode.INSTAGRAM,
            }
        }
    );
}

async function validateZipStream(pathToZip: string): Promise<ValidationReturn | undefined> {
    const fs = require('fs');
    const path = require('path');
    let finalZip: ValidationReturn | undefined;
    const readStream = fs.createReadStream(path.join(__dirname, pathToZip));
    const readableStream = new ReadableStream({
        async start(controller) {
            readStream.on("data", (chunk: Buffer | string) => {
                controller.enqueue(chunk);
            });
            readStream.on("end", () => controller.close());
            readStream.on("error", () => controller.error());
        }
    });
    const validation$: Observable<ValidationZipStatus> = ValidatorFiles.validateZipStream(readableStream, {
        filterDataSource: {
            dataSourceCode: DataSourceCode.INSTAGRAM
        }
    });
    const finalResult = await lastValueFrom(validation$);
    if (finalResult.status === ValidationStatus.DONE) {
        finalZip = finalResult.validationResult;
    }
    return finalZip;
}

function mergingTest() {
    const fs =  require('fs');
    const path =  require('path');
    fs.readFile(path.join(__dirname,"../src/mock/datasource/zip files/ds2.zip"),async function(err:ErrnoException, data1: Buffer) {
        const validation1 = await ValidatorFiles.validateZip(data1,{maxBytesZipFile: 3e9, filterDataSource: {
                dataSourceCode: DataSourceCode.FACEBOOK,
            }});
        fs.readFile(path.join(__dirname,"../src/mock/datasource/zip files/instagram.zip"),async function(err:ErrnoException, data2: Buffer) {
            const validation2 = await ValidatorFiles.validateZip(data2,
                {
                    filterDataSource: {
                        dataSourceCode: DataSourceCode.INSTAGRAM,
                    }
                });
            fs.readFile(path.join(__dirname,"../src/mock/datasource/zip files/amazon.zip"),async function(err:ErrnoException, data3: Buffer) {
                const validation3 = await ValidatorFiles.validateZip(data3,
                    {
                        filterDataSource: {
                            dataSourceCode: DataSourceCode.AMAZON,
                        }
                    });
                const mergedFile = await ValidatorFiles.mergeZipFiles([validation1!.zipFile, validation2!.zipFile, validation3!.zipFile], {throwExceptions: true, maxBytesZipFile: 3e9});
                console.log(await ValidatorFiles.getPathsIntoZip(mergedFile!));
            });
        });
    });
}
