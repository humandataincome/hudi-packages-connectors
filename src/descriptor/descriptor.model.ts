import {DataSourceCode, FileExtension, LanguageCode, RetrievingProcedureType} from "./descriptor.enum";

export interface Descriptor {
    sourceDescription: Array<SourceDescription>;
}

export interface SupportedSources {
    list: Array<DataSourceCode>;
}

export interface SourceDescription {
    sourceName: string;
    sourceCode: DataSourceCode;
    supportedFormats: Array<FileExtension>;
    retrievingProcedures: Array<RetrievingProcedure>;
}

export interface RetrievingProcedure {
    languageCode: LanguageCode;
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
}
