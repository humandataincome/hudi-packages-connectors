import {FileCode} from "../descriptor/descriptor.enum";
import {Language} from "../utils/utils.enum";

export interface FileContainer {
    fileCode: FileCode;
    fileBuffer: Buffer;
    fileTIdays?: number; //days of temporal unit
    fileLanguage?: Language;
}