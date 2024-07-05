import {
    HTTPRequest,
    GDPRDataSourceCode,
    FileExtension, HttpMethod, ProcessingStatus, ProcessingZipStatus, ProcessorFiles,
    ValidationStatus,
    ValidationZipStatus,
    ValidatorFiles, ProcessorBinance, ProcessorCoinbase
} from "../../src";
import {Observable} from "rxjs";
import {ServiceBloodAnalysis, SelectorUtils} from "../../src";
import {findNotMappedFiles} from "../../src/utils/monitoring.utils";

const httpMethod: HttpMethod = (options: HTTPRequest) => {
    const https = require('https')
    return new Promise((resolve, reject) => {
        const req = https.request(options.url, options, (res: any) => {
            let data = '';
            res.on('data', (chunk: any) => {
                data+=chunk;
            });
            res.on('end', () => {
                resolve(JSON.parse(data.toString()));
            });
        });
        req.on('error', (error: Error) => {
            reject(error);
        });
        req.end();
    });
};

// parsePdfTest();
//coinbaseTest();
//binanceTest();
//processingStream(['../../src/mock/datasource/zip files/private/spotify.zip',], GDPRDataSourceCode.SPOTIFY);
validateStream('../../src/mock/datasource/zip files/private/instagram.zip', GDPRDataSourceCode.INSTAGRAM);
//showAggregator('../../src/mock/datasource/zip files/private/google.zip', GDPRDataSourceCode.GOOGLE);
//showAggregator('../../src/mock/datasource/zip files/private/amazon.zip', GDPRDataSourceCode.AMAZON);
// testNotMappedFiles('../../src/mock/datasource/zip files/private/instagram.zip', GDPRDataSourceCode.INSTAGRAM);

async function parsePdfTest() {
    const fs =  require('fs');
    const path =  require('path');

    const result = await ServiceBloodAnalysis.parsePdfToJson(fs.readFileSync(path.join(__dirname, '../../src/mock/pdf/private/file1.pdf')));
    // Stampa i risultati in formato JSON
    console.log(JSON.stringify(result, null, 2));
}

async function coinbaseTest() {
    const apiKey = '';
    const apiSecretKey = '';
    console.log(await ProcessorCoinbase.aggregatorBuilder(apiKey, apiSecretKey, httpMethod));
}

async function binanceTest() {
    const apiKey = '';
    const apiSecretKey = '';
    console.log(await ProcessorBinance.aggregatorBuilder(apiKey, apiSecretKey, httpMethod));
}

async function showAggregator(pathToZip: string, code: GDPRDataSourceCode) {
    const fs =  require('fs');
    const path =  require('path');
    const data = fs.readFileSync(path.join(__dirname, pathToZip));
    const validation = ValidatorFiles.validateZip(data,
        {
            maxBytesPerFile: 15e6,
            minBytesPerFile: 0,
            filterDataSource: {
                dataSourceCode: code,
            },
            throwExceptions: true,
        });
    //console.log(await ValidatorFiles.getPathsIntoZip(validation!.zipFile));
    const aggregate = await SelectorUtils.getZipAggregatorBuilder(code, validation!.zipFile, {
        timeIntervalDays: 180,
        throwExceptions: false,
    });
    console.log(aggregate);
}

async function testNotMappedFiles(pathToZip: string, code: GDPRDataSourceCode) {
    const fs = require('fs');
    const path = require('path');

    const data = fs.readFileSync(path.join(__dirname, pathToZip));
    console.log(await findNotMappedFiles(data, code, {
        permittedFilesExtensions: [FileExtension.JSON, FileExtension.JS, FileExtension.XML, FileExtension.CSV, FileExtension.HTML]
    }));
}

async function validateStream(pathToZip: string, code: GDPRDataSourceCode) {
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
                console.log('Last iteration: ', x.validationResult?.excludedFiles.slice(100, 150));
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

async function processingStream(pathsToZip: string[], code: GDPRDataSourceCode) {
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
