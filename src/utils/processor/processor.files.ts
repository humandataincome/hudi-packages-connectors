import {from, Observable, Subscriber} from "rxjs";
import {ValidationErrorEnum} from "../utils.error";
import {
    ValidationReturn,
    ValidationStatus,
    ValidationZipOptions,
    ValidationZipStatus
} from "../validator/validator.files";
import {DataAggregator, DataSourceCode, FileCode, FileExtension} from "../../descriptor";

export interface ProcessingReturn {
    aggregator: DataAggregator,
    includedFiles: string[],
    excludedFiles: string[],
}

export enum ProcessingStatus {
    PROCESSING = 'PROCESSING',
    VALIDATING = 'VALIDATING',
    DONE = 'DONE',
    ERROR = 'ERROR'
}

export interface ProcessingZipStatus {
    status: ProcessingStatus;
    bytesRead?: number;
    validationResult?: ProcessingReturn | undefined;
}

export interface ProcessingObjectSupport {
    readableStream: ReadableStream;
    returnObject: ProcessingReturn;
    subscriber?: Subscriber<ProcessingZipStatus>
}

export class ProcessorFiles {
    /*
    static processingZipStream(readableStream: ReadableStream, code: DataSourceCode): Observable<ProcessingZipStatus> {
        return new Observable<ProcessingZipStatus>((subscriber: Subscriber<ProcessingZipStatus>) => {
            const processingReturn: ProcessingReturn = {
                aggregator: {},
                includedFiles: [],
                excludedFiles: [],
            }
            const support: ProcessingObjectSupport = {
                readableStream: readableStream,
                returnObject: processingReturn,
                subscriber: subscriber,
            }

            from(this.unzipFileFromStream(support)).subscribe({
                error(error) {
                    subscriber.error(error);
                },
                complete() {
                    try {
                        subscriber.next(
                            {
                                status: ValidationStatus.ZIPPING
                            });
                }
        });
    }

     */
}
