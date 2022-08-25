import {MonitoringService} from "../../src/utils/monitoring/monitoring.source";
import {DataSourceCode, FileExtension} from "../../src";


async function testNotMappedFiles(pathToZip: string) {
    const fs = require('fs');
    const path = require('path');

    const data = fs.readFileSync(path.join(__dirname, pathToZip));
    console.log(await MonitoringService.findNotMappedFiles(data, DataSourceCode.GOOGLE, {
        permittedFilesExtensions: [FileExtension.JSON, FileExtension.JS, FileExtension.XML, FileExtension.CSV, FileExtension.HTML]
    }));
}


/*
async function validateStream() {
    const fs = require('fs');
    const path = require('path');
    const pathToZip = "../src/mock/datasource/zip files/google.zip";
    fs.readFile(path.join(__dirname, pathToZip),(err: ErrnoException, data: Buffer) => {
        const fileZippedBytes = data.byteLength;
        const readStream = fs.createReadStream(path.join(__dirname, pathToZip));
        const readableStream = new ReadableStream({
            async start(controller) {
                readStream.on("data", (chunk: Buffer|string) => {
                    controller.enqueue(chunk);
                });
                readStream.on("end", () => controller.close());
                readStream.on("error", () => controller.error());
            }
        });
        let fileUnzippedBytes = 0;
        const validation$: Observable<ValidationZipStatus> = ValidatorFiles.validateZipStream(readableStream, {throwExceptions: false, filterDataSource: {dataSourceCode: DataSourceCode.LINKEDIN }});
        validation$.subscribe({
            next(x: ValidationZipStatus) {
                if(x.status === ValidationStatus.VALIDATING) {
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
 */
testNotMappedFiles('../../src/mock/datasource/zip files/private/google_light.zip');
