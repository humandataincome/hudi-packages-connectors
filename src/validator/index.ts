import {DataSourceCode} from "../descriptor";
import {ValidatorInstagram} from "./validator.instagram";
import {ValidatorFacebook} from "./validator.facebook";
import {ValidatorAmazon} from "./validator.amazon";

export * from './validator';
export * from './validator.error';
export * from './validator.datasource';
export * from './validator.instagram';
export * from './validator.facebook';
export * from './validator.amazon';

export default {
    [DataSourceCode.INSTAGRAM]: ValidatorInstagram,
    [DataSourceCode.FACEBOOK]: ValidatorFacebook,
    [DataSourceCode.AMAZON]: ValidatorAmazon,
};

export type InputFileFormat = string | number[] | Blob | NodeJS.ReadableStream | Uint8Array | ArrayBuffer;
export type OutputFileFormat = string | number[] | Blob | Buffer | Uint8Array | ArrayBuffer;
