
import {
    FileContent,
    Procedure,
    RetrievingProcedure,
    SourceDescription,
    SupportedSources
} from "./descriptor.model";
import {DataSourceCode, FileExtension, LanguageCode, RetrievingProcedureType} from "./descriptor.enum";
import {Validator} from "../validator/validator";
import {DescriptorErrorEnum} from "./descriptor.error";

export class DescriptorService {

    /**
     * @param document - JSON descriptor file
     * @return {Promise<Array<DataSourceCode> | undefined>} - all available data sources' respective codes
     */
    async getDataSourcesCodes(document: any): Promise<Array<DataSourceCode> | undefined> {
        try {
            if (document) {
                return document.supportedSources;
            }
        } catch (error) {
            throw new Error(`${DescriptorErrorEnum.ALL_SOURCES_CODES_ERROR}: ${error}`);
        }
    }

    /**
     * @param document - JSON descriptor file
     * @param dataSourceCode - code of the procedure's data source we want to retrieve
     * @return {Promise<string | undefined>} - return source name given a data source code
     */
    async getSourceName(document: any, dataSourceCode: DataSourceCode): Promise<string | undefined> {
        try {
            let name;
            if (document) {
                document.sourceDescription.map((source: SourceDescription) => {
                    if (source.sourceCode == dataSourceCode) {
                        name = source.sourceName;
                    }
                });
            }
            return name;
        } catch (error) {
            throw new Error(`${DescriptorErrorEnum.SOURCE_NAME_ERROR}: ${error}`);
        }
    }

    /**
     * @param document - JSON descriptor file
     * @param dataSourceCode - code of the procedure's data source we want to retrieve
     * @return {Promise<Array<FileExtension> | undefined>} - return the array of valid format for a specific data source
     */
    async getSourceFormats(document: any, dataSourceCode: DataSourceCode): Promise<Array<FileExtension> | undefined> {
        try {
            let formats;
            if (document) {
                document.sourceDescription.map((source: SourceDescription) => {
                    if (source.sourceCode == dataSourceCode) {
                        formats = source.supportedFormats;
                    }
                });
            }
            return formats;
        } catch (error) {
            throw new Error(`${DescriptorErrorEnum.SOURCE_FORMAT_ERROR}: ${error}`);
        }
    }

    /**
     * @param document - JSON descriptor file
     * @param dataSourceCode - code of the procedure's data source we want to retrieve
     * @param language - code of procedure's language we want to retrieve
     * @param procedureType - type of procedure we want to retrieve
     * @return {Promise<Procedure | undefined>} - list of all the steps
     */
    async getDataSourceProcedure(document: any, dataSourceCode: DataSourceCode, language: LanguageCode, procedureType: RetrievingProcedureType): Promise<Procedure | undefined> {
        try {
            let model;
            if (document.sourceDescription.length > 0) {
                document.sourceDescription.map((item: SourceDescription) => {
                    if(item.sourceCode == dataSourceCode && item.retrievingProcedures.length > 0) {
                        item.retrievingProcedures.map((item: RetrievingProcedure) => {
                            if(item.languageCode == language && item.procedures.length > 0) {
                                item.procedures.map((item: Procedure) => {
                                    if(item.procedureType == procedureType) {
                                        model = item;
                                    }
                                });
                            }
                        });
                    }
                });
            }
            return !Validator.objectIsEmpty(model) ? model : undefined;
        } catch (error) {
            throw new Error(`${DescriptorErrorEnum.SOURCE_PROCEDURE_ERROR}: ${error}`);
        }
    }

    /**
     * @param document - JSON descriptor file
     * @param dataSourceCode - code of the description's data source we want to retrieve
     * @param language - code of description's language we want to retrieve
     * @return {Promise<Array<FileContent>  | undefined>} - list of all useful files and their description content
     */
    async getAllDataSourceProcedures(document: any, dataSourceCode: DataSourceCode, language: LanguageCode): Promise<Array<FileContent> | undefined> {
        try {
            let model: Array<FileContent> = [];
            if (document.sourceDescription.length > 0) {
                document.sourceDescription.map((item: SourceDescription) => {
                    if(item.sourceCode == dataSourceCode && item.retrievingProcedures.length > 0) {
                        item.retrievingProcedures.map((item: RetrievingProcedure) => {
                            if(item.languageCode == language) {
                                model = item.filesDescription;
                            }
                        });
                    }
                });
            }
            return model.length > 0 ? model : undefined;
        } catch (error) {
            throw new Error(`${DescriptorErrorEnum.ALL_SOURCE_PROCEDURE_ERROR}: ${error}`);
        }
    }

    /**
     * @param document - JSON descriptor file
     * @return {Promise<SupportedSources | undefined>} - list of supported sources
     */
    async getAllDataSourcesDescriptions(document: any): Promise<SupportedSources | undefined> {
        try {
            if (document) {
                return document.sourceDescription;
            }
        } catch (error) {
            throw new Error(`${DescriptorErrorEnum.ALL_SOURCES_DESCRIPTION_ERROR}: ${error}`);
        }
    }

    /**
     * @param document - JSON descriptor file
     * @param dataSourceCode - code of the description's data source we want to retrieve
     * @return {Promise<SourceDescription | undefined>} - list of supported source descriptions (all languages for a specific source)
     */
    async getDataSourceDescription(document: any, dataSourceCode: DataSourceCode): Promise<SourceDescription | undefined> {
        try {
            let description;
            if (document) {
                document.sourceDescription.map((item: SourceDescription) => {
                    if(item.sourceCode == dataSourceCode) {
                        description = item;
                    }
                });
            }
            return description;
        } catch (error) {
            throw new Error(`${DescriptorErrorEnum.SOURCE_DESCRIPTION_ERROR}: ${error}`);
        }
    }
}