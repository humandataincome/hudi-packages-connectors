import {MonitoringService} from "../../src/utils/monitoring/monitoring.source";
import {DataSourceCode, FileExtension, ValidationStatus, ValidationZipStatus, ValidatorFiles} from "../../src";
import {Observable} from "rxjs";
import {Selector} from "../../src";


//testNotMappedFiles('../../src/mock/datasource/zip files/private/google.zip');
//validateStream('../../src/mock/datasource/zip files/private/google.zip', DataSourceCode.GOOGLE);
showAggregator('../../src/mock/datasource/zip files/private/google.zip', DataSourceCode.GOOGLE);
//showAggregator('../../src/mock/datasource/zip files/private/amazon.zip', DataSourceCode.AMAZON);



async function showAggregator(pathToZip: string, code: DataSourceCode) {
    const fs =  require('fs');
    const path =  require('path');
    const data = fs.readFileSync(path.join(__dirname, pathToZip));
    const validation = await ValidatorFiles.validateZip(data,
        {
            maxBytesPerFile: 15e6,
            minBytesPerFile: 0,
            filterDataSource: {
                dataSourceCode: code,
            },
            throwExceptions: true,
        });
    //console.log(await ValidatorFiles.getPathsIntoZip(validation!.zipFile));
    const aggregate = await Selector.getAggregator(code, validation!.zipFile, {
        timeIntervalDays: 180,
        throwExceptions: false,
    });
    console.log(aggregate);
}

async function testNotMappedFiles(pathToZip: string) {
    const fs = require('fs');
    const path = require('path');

    const data = fs.readFileSync(path.join(__dirname, pathToZip));
    console.log(await MonitoringService.findNotMappedFiles(data, DataSourceCode.GOOGLE, {
        permittedFilesExtensions: [FileExtension.JSON, FileExtension.JS, FileExtension.XML, FileExtension.CSV, FileExtension.HTML]
    }));
}

async function validateStream(pathToZip: string, code: DataSourceCode) {
    const fs = require('fs');
    const path = require('path');
    fs.readFile(path.join(__dirname, pathToZip), (error: any, data: Buffer) => {
        const fileZippedBytes = data.byteLength;
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
        let fileUnzippedBytes = 0;
        const validation$: Observable<ValidationZipStatus> = ValidatorFiles.validateZipStream(readableStream, {
            throwExceptions: false,
            filterDataSource: {dataSourceCode: code}
        });
        validation$.subscribe({
            next(x: ValidationZipStatus) {
                if (x.status === ValidationStatus.VALIDATING) {
                    fileUnzippedBytes = x.bytesRead!;
                }
                if (x.status === ValidationStatus.DONE) {
                    console.log('Last iteration: ', x.validationResult);
                }
            },
            error(err) {
                console.error('ERROR: ' + err);
            },
            complete() {
                console.log(fileUnzippedBytes, fileZippedBytes)
            }
        });
    });
}
