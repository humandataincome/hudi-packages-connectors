import {DataSourceCode, FileExtension, LanguageCode, RetrievingProcedureType} from "./descriptor.enum";

export interface Descriptor {
    sourceDescriptions: SourceDescription[];
    datasourceFilesDescriptions: DatasourceFilesDescriptions[];
}

export interface SourceDescription {
    sourceName: string;
    sourceCode: DataSourceCode;
    retrievingProcedures: RetrievingProcedure[];
}

export interface RetrievingProcedure {
    languageCode: LanguageCode;
    procedures: Procedure[];
}

export interface Procedure {
    type: RetrievingProcedureType;
    name?: string;
    description: string;
    fileExtension: FileExtension;
    retrievingSteps: RetrievingStep[];
}

export interface RetrievingStep {
    index: string;
    description: string;
    attributeDescription?: string;
    link?: string;
}

export interface DatasourceFilesDescriptions {
    sourceCode: DataSourceCode;
    filesDescriptions: LocalFileDescriptions[];
}

export interface LocalFileDescriptions {
    languageCode: LanguageCode;
    list: FileDescription[];
}

export interface FileDescription {
    fileCode: string;
    fileContent: string;
}
