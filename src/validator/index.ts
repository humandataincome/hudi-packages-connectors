export * from './validator.files';
export * from './validator.error';
export * from './validator.datasource';
export * from './validator.instagram';
export * from './validator.facebook';
export * from './validator.amazon';

export type InputFileFormat = string | number[] | Blob | NodeJS.ReadableStream | Uint8Array | ArrayBuffer;
export type OutputFileFormat = string | number[] | Blob | Buffer | Uint8Array | ArrayBuffer;
