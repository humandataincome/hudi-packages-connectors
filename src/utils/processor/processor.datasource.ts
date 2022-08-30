import {DataAggregator, LanguageCode} from "../../descriptor";

/**
 * @timeIntervalDays set the number of days for the data relevance's time interval. Default is 3654 days.
 * @maxEntitiesPerArray set the max length for arrays of objects.
 * @language language code used during parsing, used by services like Instagram.
 * @throwExceptions TRUE to throw exception outside the Processor method, FALSE otherwise. Default is False.
 */
export type ProcessorOptions = {
    timeIntervalDays?: number;
    maxEntitiesPerArray?: number;
    language?: LanguageCode;
    throwExceptions?: boolean;
}

export interface ProcessorDatasource {
    initAggregator(): DataAggregator;
    aggregatorBuilder(data: Buffer, pathName: string, model: DataAggregator, options?: ProcessorOptions): void;
    zipAggregatorBuilder(zipFile: Uint8Array, options?: ProcessorOptions): Promise<DataAggregator | undefined>;
}
