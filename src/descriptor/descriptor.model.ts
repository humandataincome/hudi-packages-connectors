import {DataSourceCode, FileCode, RetrievingProcedureType} from "./descriptor.enum";
import {Language} from "../utils/utils.enum";

export interface SourceDescription {
    sourceName: string;
    sourceCode: DataSourceCode;
    retrievingProcedures: Array<RetrievingProcedure>;
}

export interface RetrievingProcedure {
    languageCode: Language;
    procedures: Array<Procedure>;
    dataDescription: Array<FileContent>;
}

export interface Procedure {
    procedureType: RetrievingProcedureType;
    retrievingSteps: Array<RetrieveStep>;
}

export interface RetrieveStep{
    index: string;
    description: string;
    link?: string;
}

export interface FileContent {
    filePath: string;
    fileContent: string;
    fileCode: FileCode;
}