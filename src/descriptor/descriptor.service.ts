import {
    Descriptor, FileContent,
    Procedure,
    SourceDescription
} from "./descriptor.model";
import {DataSourceCode, FileExtension, LanguageCode, RetrievingProcedureType} from "./descriptor.enum";
import {ValidatorFiles} from "../validator";
import {DescriptorErrorEnum} from "./descriptor.error";


const descriptor: Descriptor = require('./descriptor.json');

export class DescriptorService {
    static readonly document: Descriptor = descriptor;

    /**
     * @return  all available data sources' respective codes
     */
    static getAllCodes(): DataSourceCode[] {
        return descriptor?.sourceDescriptions?.map(({sourceCode}) => sourceCode) || [];
    }

    /**
     * @param dataSourceCode - code of the data source
     * @return get the whole description of a given data source
     */
    static getDescription(dataSourceCode: DataSourceCode): SourceDescription | undefined {
        try {
            return descriptor?.sourceDescriptions?.find(({sourceCode}) => sourceCode === dataSourceCode);
        } catch (error) {
            throw new Error(`${DescriptorErrorEnum.SOURCE_DESCRIPTION_ERROR}: ${error}`);
        }
    }

    static getDataSourceLogo(dataSourceCode: DataSourceCode) {
        return require(`../../assets/${ dataSourceCode.toLowerCase() }.svg`);
    }

    /**
     * @param dataSourceCode - code of the data source
     * @return the source name of a given data source code
     */
    static getName(dataSourceCode: DataSourceCode): string | undefined {
        try {
            return descriptor?.sourceDescriptions?.find(
                ({sourceCode}) => sourceCode === dataSourceCode
            )?.sourceName;
        } catch (error) {
            throw new Error(`${DescriptorErrorEnum.SOURCE_NAME_ERROR}: ${error}`);
        }
    }

    /**
     * @param dataSourceCode - code of the data source
     * @return an array containing all valid formats of a given data source
     */
    static getFormats(dataSourceCode: DataSourceCode): FileExtension[] | undefined {
        try {
            return descriptor?.sourceDescriptions?.find(
                ({sourceCode}) => sourceCode === dataSourceCode
            )?.supportedFormats;
        } catch (error) {
            throw new Error(`${DescriptorErrorEnum.SOURCE_FORMAT_ERROR}: ${error}`);
        }
    }


    /**
     * @param dataSourceCode - code of the data source
     * @param language - language of the data source
     * @return a string containing the description text
     **/
     static getDescriptionText(dataSourceCode: DataSourceCode, language: LanguageCode): string | undefined {
        try {
            const sourceDescription = descriptor?.sourceDescriptions?.find(
                ({sourceCode, retrievingProcedures}) => sourceCode === dataSourceCode && retrievingProcedures.length
            );

            const retrievingProcedure = sourceDescription?.retrievingProcedures?.find(
                ({languageCode, procedures}) => languageCode === language && procedures.length
            );

            return retrievingProcedure?.descriptionText;
        } catch (error) {
            throw new Error(`${DescriptorErrorEnum.SOURCE_TEXT_DESCRIPTION_ERROR}: ${error}`);
        }
    }


    /**
     * @param dataSourceCode - code of the data source
     * @param language - language of the data source
     * @param retrievingProcedureType - procedure type of the data source
     * @return a specific procedure and relative steps to retrieve a given data source, language code and retrieving procedure code
     */
    static getProcedure(
        dataSourceCode: DataSourceCode,
        language: LanguageCode,
        retrievingProcedureType: RetrievingProcedureType
    ): Procedure | undefined {
        try {
            const sourceDescription = descriptor?.sourceDescriptions?.find(
                ({sourceCode, retrievingProcedures}) => sourceCode === dataSourceCode && retrievingProcedures.length
            );

            const retrievingProcedure = sourceDescription?.retrievingProcedures?.find(
                ({languageCode, procedures}) => languageCode === language && procedures.length
            );

            const procedure = retrievingProcedure?.procedures?.find(
                ({procedureType}) => procedureType === retrievingProcedureType
            );

            return !ValidatorFiles.objectIsEmpty(procedure) ? procedure : undefined;
        } catch (error) {
            throw new Error(`${DescriptorErrorEnum.SOURCE_PROCEDURE_ERROR}: ${error}`);
        }
    }

    /**
     * @param dataSourceCode - code of the data source
     * @return all the procedure languages available for a given data source
     */
    static getAllLanguages(dataSourceCode: DataSourceCode): LanguageCode[] | undefined {
        try {
            const sourceDescription = descriptor?.sourceDescriptions?.find(
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
     * @return all the retrieving procedure types for a given data source and language code
     */
    static getAllProcedureTypes(dataSourceCode: DataSourceCode, language: LanguageCode): RetrievingProcedureType[] | undefined {
        try {
            const sourceDescription = descriptor?.sourceDescriptions?.find(
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

    /**
     * @param dataSourceCode - code of the data source
     * @param language - language of the data source
     * @return all the files descriptions for a given data source and language code
     */
    static getFilesDescription(dataSourceCode: DataSourceCode, language: LanguageCode): FileContent[] | undefined {
        try {
            const datasourceFilesDescriptors = descriptor?.datasourceFilesDescriptions?.find(
                ({sourceCode, fileDescriptions}) => sourceCode === dataSourceCode && fileDescriptions.length);
            const filesDescription = datasourceFilesDescriptors?.fileDescriptions?.find(
                ({languageCode, filesDescription}) => languageCode === language && filesDescription.length);
            return filesDescription?.filesDescription;
        } catch (error) {
            throw new Error(`${DescriptorErrorEnum.SOURCE_FILES_DESCRIPTION}: ${error}`);
        }
    }

}
