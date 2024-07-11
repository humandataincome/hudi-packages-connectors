import {
    GDPRDataSourceCode,
    FileExtension, ProcessingStatus, ProcessingZipStatus, ProcessorFiles,
    ValidationStatus,
    ValidationZipStatus,
    ValidatorFiles, ValidationReturn
} from "../../src";
import {Observable} from "rxjs";
import {SelectorUtils} from "../../src";
import {findNotMappedFiles} from "../../src/utils/monitoring.utils";
import { createReadStream, readFileSync, statSync } from "fs";
import { join } from "path";

// getNotMappedFiles(['../mock/datasource/zip files/private/google-001.zip',], GDPRDataSourceCode.GOOGLE).then(x => console.log(x));
getAggregatorResult(['../mock/datasource/zip files/private/google-001.zip',], GDPRDataSourceCode.GOOGLE).then(x => console.log(x));

function getFilesStreams(pathsToFiles: string[]) {
    return pathsToFiles.map((path) => {
        const stream = createReadStream(join(__dirname, path));
        return new ReadableStream({
            async start(controller) {
                stream.on("data", (chunk: Buffer | string) => {
                    controller.enqueue(chunk);
                });
                stream.on("end", () => controller.close());
                stream.on("error", () => controller.error());
            }
        })
    });
}

async function getAggregatorResult(pathsToFiles: string[], code: GDPRDataSourceCode) {
    try {
        const validation = await getValidationResult(pathsToFiles, code);
        if (validation) {
            return await SelectorUtils.getZipAggregatorBuilder(code, validation.zipFile, {
                timeIntervalDays: 180,
                throwExceptions: false,
            });
        }
    } catch(error) {
        console.error('Error:', error);
    }
}

async function getNotMappedFiles(pathToZips: string[], code: GDPRDataSourceCode) {
    let notMapped: string[] = [];
    for (const filePath of pathToZips) {
        const data = readFileSync(join(__dirname, filePath));
        const fileNames = await findNotMappedFiles(data, code, {
            permittedFilesExtensions: [FileExtension.JSON, FileExtension.JS, FileExtension.XML, FileExtension.CSV, FileExtension.HTML]
        });
        notMapped = notMapped.concat(fileNames ?? []);
    }
    return notMapped;
}

async function getValidationResult(pathToZips: string[], code: GDPRDataSourceCode): Promise<ValidationReturn | undefined> {
    const streams = getFilesStreams(pathToZips);
    const validation: Observable<ValidationZipStatus> = ValidatorFiles.validateZipStream(streams, {
        throwExceptions: true,
        filterDataSource: {dataSourceCode: code}
    });
    return await new Promise((resolve, reject) => {
        validation.subscribe({
            next(chunk: ValidationZipStatus) {
                if (chunk.status === ValidationStatus.DONE) {
                    resolve(chunk.validationResult);
                }
            },
            error(error) {
                reject(error);
            }
        });
    });
}

async function processingStream(pathsToZip: string[], code: GDPRDataSourceCode) {
    let totalSize = 0;
    let streams: ReadableStream[] = [];
    pathsToZip.forEach((pathToZip: string) => {
        totalSize += statSync(join(__dirname, pathToZip)).size;
        const readStream = createReadStream(join(__dirname, pathToZip));
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
