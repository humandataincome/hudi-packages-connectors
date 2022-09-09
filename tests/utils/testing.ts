import {MonitoringService} from "../../src/utils/monitoring/monitoring.source";
import {
    DataSourceCode,
    FileExtension, ProcessingStatus, ProcessingZipStatus, ProcessorFiles,
    ValidationStatus,
    ValidationZipStatus,
    ValidatorFiles
} from "../../src";
import {Observable} from "rxjs";
import {Selector} from "../../src";
import {ReadableStream} from 'node:stream/web';

processingStream([
    '../../src/mock/datasource/zip files/private/netflix.zip',
], DataSourceCode.NETFLIX);
//validateStream('../../src/mock/datasource/zip files/private/amazon.zip', DataSourceCode.AMAZON);
//showAggregator('../../src/mock/datasource/zip files/private/google.zip', DataSourceCode.GOOGLE);
//showAggregator('../../src/mock/datasource/zip files/private/amazon.zip', DataSourceCode.AMAZON);
//testNotMappedFiles('../../src/mock/datasource/zip files/private/google.zip');

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
    const aggregate = await Selector.getZipAggregatorBuilder(code, validation!.zipFile, {
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
    const size = fs.statSync(path.join(__dirname, pathToZip)).size;
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
    const validation$: Observable<ValidationZipStatus> = ValidatorFiles.validateZipStream([readableStream], {
        throwExceptions: true,
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
            console.log(fileUnzippedBytes, size)
        }
    });
}

async function processingStream(pathsToZip: string[], code: DataSourceCode) {
    const fs = require('fs');
    const path = require('path');
    let totalSize = 0;
    let streams: ReadableStream[] = [];
    pathsToZip.forEach((pathToZip: string) => {
        totalSize += fs.statSync(path.join(__dirname, pathToZip)).size;
        const readStream = fs.createReadStream(path.join(__dirname, pathToZip));
        streams.push(new ReadableStream({
            async start(controller) {
                readStream.on("data", (chunk: Buffer | string) => {
                    controller.enqueue(chunk);
                });
                readStream.on("end", () => controller.close());
                readStream.on("error", () => controller.error());
            }
        }));
    });
    let fileUnzippedBytes = 0;
    const processing$: Observable<ProcessingZipStatus> = ProcessorFiles.processingZipStream(streams, code);
    processing$.subscribe({
        next(x: ProcessingZipStatus) {
            if (x.status === ProcessingStatus.PROCESSING) {
                fileUnzippedBytes = x.bytesRead!;
                //console.log('%: ', (fileUnzippedBytes*100)/totalSize);
            }
            if (x.status === ProcessingStatus.DONE) {
                console.log('Last iteration: ', x.processingResult!.aggregatorModel);
            }
        },
        error(err) {
            console.error('ERROR: ' + err);
        },
        complete() {}
    });
}
