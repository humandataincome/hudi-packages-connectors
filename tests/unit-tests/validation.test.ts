import {
    DataSourceCode,
    ValidationReturn,
    ValidationStatus,
    ValidationZipStatus,
    ValidatorFiles
} from "../../src";
import {ReadableStream} from 'node:stream/web';
import {lastValueFrom, Observable} from "rxjs";

describe('Validation Test', () => {
    const pathToZip = "../../src/mock/datasource/zip files/instagram.zip";
    const expectedBytes = 26155;
    test('validateZip', async () => {
        const validatedZip = await validateZip(pathToZip);
        expect(validatedZip!.zipFile.length).toBe(expectedBytes);
    });
    test('validateZipStream', async () => {
        const validatedZip = await validateZipStream(pathToZip);
        expect(validatedZip!.zipFile.length).toBe(expectedBytes);
    });
    test('mergeZipFiles', async () => {
        const pathToZip1 = "../../src/mock/datasource/zip files/instagram_part_1.zip";
        //instagram_part_2.zip has 1 not recognized file that should be excluded
        const pathToZip2 = "../../src/mock/datasource/zip files/instagram_part_2.zip";
        const mergedZip = await mergeZipFiles(pathToZip1, pathToZip2);
        expect(mergedZip!.length).toBe(expectedBytes);
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

async function mergeZipFiles(pathToZip1: string, pathToZip2: string): Promise<Uint8Array | undefined> {
    const fs = require('fs');
    const path = require('path');
    const data1 = fs.readFileSync(path.join(__dirname, pathToZip1));
    const validation1 = await ValidatorFiles.validateZip(data1, {
        filterDataSource: {
            dataSourceCode: DataSourceCode.INSTAGRAM
        }
    });
    const data2 = fs.readFileSync(path.join(__dirname, pathToZip2));
    const validation2 = await ValidatorFiles.validateZip(data2, {
        filterDataSource: {
            dataSourceCode: DataSourceCode.INSTAGRAM
        }
    });
    return await ValidatorFiles.mergeZipFiles([validation1!.zipFile, validation2!.zipFile]);
}
