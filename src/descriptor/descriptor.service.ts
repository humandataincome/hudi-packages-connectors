
import {
    Descriptor,
    FileContent,
    Procedure,
    RetrievingProcedure,
    SourceDescription
} from "./descriptor.model";
import {DataSourceCode, FileExtension, LanguageCode, RetrievingProcedureType} from "./descriptor.enum";
import {Validator} from "../validator";
import {DescriptorErrorEnum} from "./descriptor.error";

export class DescriptorService {

    /**
     * @return {Promise<Array<DataSourceCode> | undefined>} - all available data sources' respective codes
     */
    static async getAllDataSourcesCodes(): Promise<Array<DataSourceCode> | undefined> {
        try {
            const document: Descriptor = require('./descriptor.json');
            return document?.sourceDescription.map((item: SourceDescription) => item.sourceCode);
        } catch (error) {
            throw new Error(`${DescriptorErrorEnum.ALL_SOURCES_CODES_ERROR}: ${error}`);
        }
    }

    /**
     * @param dataSourceCode - code of the data source
     * @return {Promise<SourceDescription | undefined>} - get the whole description of a given data source
     */
    static async getDataSourceDescription(dataSourceCode: DataSourceCode): Promise<SourceDescription | undefined> {
        try {
            const document = require('./descriptor.json');
            return document?.sourceDescription.find(({sourceCode}: SourceDescription) => sourceCode === dataSourceCode);
        } catch (error) {
            throw new Error(`${DescriptorErrorEnum.SOURCE_DESCRIPTION_ERROR}: ${error}`);
        }
    }

    /**
     * @param dataSourceCode - code of the data source
     * @return {Promise<string | undefined>} - return source name of a given data source code
     */
    static async getDataSourceName(dataSourceCode: DataSourceCode): Promise<string | undefined> {
        try {
            const document: Descriptor = require('./descriptor.json');
            return document?.sourceDescription.find(({sourceCode}: SourceDescription) => sourceCode == dataSourceCode)?.sourceName;
        } catch (error) {
            throw new Error(`${DescriptorErrorEnum.SOURCE_NAME_ERROR}: ${error}`);
        }
    }

    /**
     * @param dataSourceCode - code of the data source
     * @return {Promise<Array<FileExtension> | undefined>} - return the array of valid format of a given data source
     */
    static async getDataSourceFormats(dataSourceCode: DataSourceCode): Promise<Array<FileExtension> | undefined> {
        try {
            const document = require('./descriptor.json');
            return document?.sourceDescription.find(({sourceCode}: SourceDescription) => sourceCode == dataSourceCode)?.supportedFormats;
        } catch (error) {
            throw new Error(`${DescriptorErrorEnum.SOURCE_FORMAT_ERROR}: ${error}`);
        }
    }


    /**
     * @param dataSourceCode - code of the data source
     * @param language - language of the data source
     * @param procedureType - procedure type of the data source
     * @return {Promise<Procedure | undefined>} - return the specific procedure and relative steps to retrieve a given data source, language code and retrieving procedure code
     */
    static async getDataSourceProcedure(dataSourceCode: DataSourceCode, language: LanguageCode, procedureType: RetrievingProcedureType): Promise<Procedure | undefined> {
        try {
            const document = require('./descriptor.json');
            let model;
            if (document.sourceDescription.length > 0) {
                document.sourceDescription.find((item: SourceDescription) => {
                    if(item.sourceCode === dataSourceCode && item.retrievingProcedures.length > 0) {
                        item.retrievingProcedures.find((item: RetrievingProcedure) => {
                            if(item.languageCode == language && item.procedures.length > 0) {
                                item.procedures.find((item: Procedure) => {
                                    if(item.procedureType === procedureType) {
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
     * @param dataSourceCode - code of the data source
     * @return {Promise<Array<LanguageCode> | undefined>} - return all the procedure languages available for a given data source
     */
    static async getAllDataSourceLanguages(dataSourceCode: DataSourceCode): Promise<Array<LanguageCode> | undefined> {
        try {
            const document = require('./descriptor.json');
            let model;
            if (document.sourceDescription.length > 0) {
                document.sourceDescription.find((item: SourceDescription) => {
                    if (item.sourceCode === dataSourceCode && item.retrievingProcedures.length > 0) {
                        model = item.retrievingProcedures.map(({languageCode}: RetrievingProcedure) => languageCode);
                    }
                });
            }
            return model;
        } catch (error) {
            throw new Error(`${DescriptorErrorEnum.SOURCE_ALL_LANGUAGES_ERROR}: ${error}`);
        }
    }

    /**
     * @param dataSourceCode - code of the data source
     * @param language - language of the data source
     * @return {Promise<Array<FileContent> | undefined>} - return all the retrieving procedure types for a given data source and language code
     */
    static async getAllDataSourceProcedureTypes(dataSourceCode: DataSourceCode, language: LanguageCode): Promise<Array<RetrievingProcedureType> | undefined> {
        try {
            const document = require('./descriptor.json');
            let model;
            if (document.sourceDescription.length > 0) {
                document.sourceDescription.find((item: SourceDescription) => {
                    if (item.sourceCode === dataSourceCode && item.retrievingProcedures.length > 0) {
                        item.retrievingProcedures.find((item: RetrievingProcedure) => {
                            if (item.languageCode == language && item.procedures.length > 0) {
                                model = item.procedures.map(({procedureType}: Procedure) => procedureType)
                            }
                        });
                    }
                });
            }
            return model;
        } catch (error) {
            throw new Error(`${DescriptorErrorEnum.SOURCE_ALL_PROCEDURES_ERROR}: ${error}`);
        }
    }

}