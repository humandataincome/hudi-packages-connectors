import {
    Descriptor,
    Procedure,
    SourceDescription
} from "./descriptor.model";
import {DataSourceCode, FileExtension, LanguageCode, RetrievingProcedureType} from "./descriptor.enum";
import {Validator} from "../validator";
import {DescriptorErrorEnum} from "./descriptor.error";


const descriptor: Descriptor = require('./descriptor.json');

export class DescriptorService {
    static readonly document: Descriptor = descriptor;

    /**
     * @return  all available data sources' respective codes
     */
    static getAllDataSourcesCodes(): DataSourceCode[] {
        return descriptor?.sourceDescription?.map(({sourceCode}) => sourceCode) || [];
    }

    /**
     * @param dataSourceCode - code of the data source
     * @return get the whole description of a given data source
     */
    static getDataSourceDescription(dataSourceCode: DataSourceCode): SourceDescription | undefined {
        try {
            return descriptor?.sourceDescription?.find(({sourceCode}) => sourceCode === dataSourceCode);
        } catch (error) {
            throw new Error(`${DescriptorErrorEnum.SOURCE_DESCRIPTION_ERROR}: ${error}`);
        }
    }

    /**
     * @param dataSourceCode - code of the data source
     * @return return source name of a given data source code
     */
    static getDataSourceName(dataSourceCode: DataSourceCode): string | undefined {
        try {
            return descriptor?.sourceDescription?.find(
                ({sourceCode}) => sourceCode === dataSourceCode
            )?.sourceName;
        } catch (error) {
            throw new Error(`${DescriptorErrorEnum.SOURCE_NAME_ERROR}: ${error}`);
        }
    }

    /**
     * @param dataSourceCode - code of the data source
     * @return {Promise<Array<FileExtension> | undefined>} - return the array of valid format of a given data source
     */
    static getDataSourceFormats(dataSourceCode: DataSourceCode): FileExtension[] | undefined {
        try {
            return descriptor?.sourceDescription?.find(
                ({sourceCode}) => sourceCode === dataSourceCode
            )?.supportedFormats;
        } catch (error) {
            throw new Error(`${DescriptorErrorEnum.SOURCE_FORMAT_ERROR}: ${error}`);
        }
    }


    /**
     * @param dataSourceCode - code of the data source
     * @param language - language of the data source
     * @param retrievingProcedureType - procedure type of the data source
     * @return {Promise<Procedure | undefined>} - return the specific procedure and relative steps to retrieve a given data source, language code and retrieving procedure code
     */
    static getDataSourceProcedure(
        dataSourceCode: DataSourceCode,
        language: LanguageCode,
        retrievingProcedureType: RetrievingProcedureType
    ): Procedure | undefined {
        try {
            const sourceDescription = descriptor?.sourceDescription?.find(
                ({sourceCode, retrievingProcedures}) => sourceCode === dataSourceCode && retrievingProcedures.length
            );

            const retrievingProcedure = sourceDescription?.retrievingProcedures?.find(
                ({languageCode, procedures}) => languageCode === language && procedures.length
            );

            const procedure = retrievingProcedure?.procedures?.find(
                ({procedureType}) => procedureType === retrievingProcedureType
            );

            return !Validator.objectIsEmpty(procedure) ? procedure : undefined;
        } catch (error) {
            throw new Error(`${DescriptorErrorEnum.SOURCE_PROCEDURE_ERROR}: ${error}`);
        }
    }

    /**
     * @param dataSourceCode - code of the data source
     * @return {LanguageCode[] | undefined} - return all the procedure languages available for a given data source
     */
    static getAllDataSourceLanguages(dataSourceCode: DataSourceCode): LanguageCode[] | undefined {
        try {
            const sourceDescription = descriptor?.sourceDescription?.find(
                ({sourceCode, retrievingProcedures}) => sourceCode === dataSourceCode && retrievingProcedures.length
            );

            return sourceDescription?.retrievingProcedures?.map(({languageCode}) => languageCode);
        } catch (error) {
            throw new Error(`${DescriptorErrorEnum.SOURCE_ALL_LANGUAGES_ERROR}: ${error}`);
        }
    }

    /**
     * @param dataSourceCode - code of the data source
     * @param language - language of the data source
     * @return {RetrievingProcedureType[] | undefined } - return all the retrieving procedure types for a given data source and language code
     */
    static getAllDataSourceProcedureTypes(dataSourceCode: DataSourceCode, language: LanguageCode): RetrievingProcedureType[] | undefined {
        try {
            const sourceDescription = descriptor?.sourceDescription?.find(
                ({sourceCode, retrievingProcedures}) => sourceCode === dataSourceCode && retrievingProcedures.length
            );

            const retrievingProcedure = sourceDescription?.retrievingProcedures?.find(
                ({languageCode, procedures}) => languageCode === language && procedures.length
            );

            return retrievingProcedure?.procedures?.map(({procedureType}) => procedureType);
        } catch (error) {
            throw new Error(`${DescriptorErrorEnum.SOURCE_ALL_PROCEDURES_ERROR}: ${error}`);
        }
    }

}
