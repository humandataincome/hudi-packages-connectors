import {DataSourceCode, FileCode, FileFormat, Language, RetrievingProcedureType} from "./descriptor.enum";


export interface SupportedSources {
    list: Array<DataSourceCode>;
}

export interface SourceDescription {
    sourceName: string;
    sourceCode: DataSourceCode;
    supportedFormats: Array<FileFormat>;
    retrievingProcedures: Array<RetrievingProcedure>;
}

export interface RetrievingProcedure {
    languageCode: Language;
    description: string;
    procedures: Array<Procedure>;
    filesDescription: Array<FileContent>;
}

export interface Procedure {
    procedureType: RetrievingProcedureType;
    retrievingSteps: Array<RetrievingStep>;
}

export interface RetrievingStep{
    index: string;
    description: string;
    attributeDescription?: string;
    link?: string;
}

export interface FileContent {
    filePath: string;
    fileContent: string;
    fileCode: FileCode;
}

//used by processor
export interface SourceDescription {
    fileLanguage: Language;
    fileTIdays: number; //days of temporal unit
}