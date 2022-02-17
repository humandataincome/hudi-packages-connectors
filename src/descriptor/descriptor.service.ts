
import {
    FileContent,
    Procedure,
    RetrievingProcedure,
    SourceDescription,
    SupportedSources
} from "./descriptor.model";
import {DataSourceCode, FileFormat, Language, RetrievingProcedureType} from "./descriptor.enum";
import {Validator} from "../validator/validator";

export class DescriptorService {

    /**
     * @return {Promise<Array<DataSourceCode> | undefined>} - all available data sources' respective codes
     */
    async availableDataSources(): Promise<Array<DataSourceCode> | undefined> {
        try {
            const document = require('./descriptor.json');
            if (document) {
                return document.supportedSources;
            }
        } catch (error) {
            throw ('Error in availableDataSources function: '+ error);
        }
    }

    /**
     * @param dataSourceCode
     * @return {Promise<string | undefined>} - return source name given a data source code
     */
    async getSourceName(dataSourceCode: DataSourceCode): Promise<string | undefined> {
        try {
            const document = require('./descriptor.json');
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
            throw ('Error in getSourceName function: '+ error);
        }
    }

    /**
     * @param dataSourceCode
     * @return {Promise<Array<FileFormat> | undefined>} - return the array of valid format for a specific data source
     */
    async getSourceFormats(dataSourceCode: DataSourceCode): Promise<Array<FileFormat> | undefined> {
        try {
            const document = require('./descriptor.json');
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
            throw ('Error in getSourceFormats function: '+ error);
        }
    }

    /**
     * @param dataSourceCode - code of the procedure's data source we want to retrieve
     * @param language - code of procedure's language we want to retrieve
     * @param procedureType - type of procedure we want to retrieve
     * @return {Promise<Procedure | undefined>} - list of all the steps
     */
    async getDataSourceProcedure(dataSourceCode: DataSourceCode, language: Language, procedureType: RetrievingProcedureType): Promise<Procedure | undefined> {
        try {
            const document = require('./descriptor.json');
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
            throw ('Error in getDataSourceProcedure function: '+ error);
        }
    }

    /**
     * @param dataSourceCode - code of the description's data source we want to retrieve
     * @param language - code of description's language we want to retrieve
     * @return {Promise<Array<FileContent>  | undefined>} - list of all useful files and their description content
     */
    async getAllDataSourceProcedures(dataSourceCode: DataSourceCode, language: Language): Promise<Array<FileContent> | undefined> {
        try {
            const document = require('./descriptor.json');
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
            throw ('Error in getAllDataSourceProcedures function: '+ error);
        }
    }

    /**
     * @return {Promise<SupportedSources | undefined>} - list of supported sources
     */
    async getAllDataSourcesDescriptions(): Promise<SupportedSources | undefined> {
        try {
            const document = require('./descriptor.json');
            if (document) {
                return document.sourceDescription;
            }
        } catch (error) {
            throw ('Error in getAllDataSourcesDescriptions function: '+ error);
        }
    }

    /**
     * @param dataSourceCode
     * @return {Promise<SourceDescription | undefined>} - list of supported source descriptions (all languages for a specific source)
     */
    async getDataSourceDescription(dataSourceCode: DataSourceCode): Promise<SourceDescription | undefined> {
        try {
            const document = require('./descriptor.json');
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
            throw ('Error in getDataSourceDescription function: '+ error);
        }
    }
}