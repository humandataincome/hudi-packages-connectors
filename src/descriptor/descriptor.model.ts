import {DataSourceCode, FileExtension, LanguageCode, RetrievingProcedureType} from "./descriptor.enum";

export interface Descriptor {
    sourceDescriptions: SourceDescription[];
    datasourceFilesDescriptions: DatasourceFilesDescriptions[];
}

export interface SourceDescription {
    sourceName: string;
    sourceCode: DataSourceCode;
    supportedFormats: FileExtension[];
    retrievingProcedures: RetrievingProcedure[];
}

export interface RetrievingProcedure {
    languageCode: LanguageCode;
    descriptionText: string;
    procedures: Procedure[];
}

export interface Procedure {
    procedureType: RetrievingProcedureType;
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
    fileDescriptions: LocalFileDescription[];
}

export interface LocalFileDescription {
    languageCode: LanguageCode;
    filesDescription: FileContent[];
}

export interface FileContent {
    filePath: string;
    fileContent: string;
}
