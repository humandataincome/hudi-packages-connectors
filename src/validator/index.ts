import {DataSourceCode, FileCode, FileExtension} from "../descriptor";

export * from './validator.files';
export * from './validator.error';
export * from './validator.datasource';
export * from './validator.instagram';
export * from './validator.facebook';
export * from './validator.amazon';
export * from './validator.google';

export type InputFileFormat = string | number[] | Blob | NodeJS.ReadableStream | Uint8Array | ArrayBuffer;
export type OutputFileFormat = string | number[] | Blob | Buffer | Uint8Array | ArrayBuffer;

export type ProcessorOptions = {
    timeIntervalDays?: number;
    permittedFileExtensions?: FileExtension[]; //include only files with these extensions, if omitted includes everything
    filterDataSource?: {
        dataSourceCode: DataSourceCode;
        fileCodesIncluded?: FileCode[];  //include only files with these Codes, if omitted includes everything
    }
    throwExceptions?: boolean;
}
