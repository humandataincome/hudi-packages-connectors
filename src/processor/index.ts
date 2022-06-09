export * from './processor.aggregator.model';
export * from './processor.instagram';
export * from './processor.facebook';
export * from './processor.amazon';
export * from './processor.google';
export * from './processor.utils';

export type ProcessorOptions = {
    timeIntervalDays?: number;
    throwExceptions?: boolean;
}

