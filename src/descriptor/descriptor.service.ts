import {Descriptor, FileContent, Procedure, SourceDescription} from "./descriptor.model";
import {
    DataSourceCode, FileCodeAmazon,
    FileCodeFacebook, FileCodeGoogle, FileCodeLinkedIn, FileCodeNetflix, FileCodeShopify,
    FileExtension,
    LanguageCode,
    RetrievingProcedureType
} from "./descriptor.enum";
import {ValidatorFiles} from "../validator";
import {FileCodeInstagram} from "../../dist";
import {DescriptorErrorEnum} from "../utils";


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
     * @param filePath
     * @param dataSourceCode - code of the data source
     * @param language - language of the data source
     * @return all the files descriptions for a given data source and language code
     */
    static getFileDescription(filePath: string, dataSourceCode: DataSourceCode, language: LanguageCode): string | undefined {
        try {
            const datasourceFilesDescriptors = descriptor?.datasourceFilesDescriptions?.find(
                ({sourceCode, fileDescriptions}) => sourceCode === dataSourceCode && fileDescriptions.length);
            if (datasourceFilesDescriptors) {
                const filesDescription = datasourceFilesDescriptors.fileDescriptions?.find(
                    ({languageCode, filesDescription}) => languageCode === language && filesDescription.length);
                if (filesDescription) {
                    const enumInstance = this.getRespectiveFileCodeEnum(dataSourceCode);
                    if (enumInstance) {
                        const found = filesDescription.filesDescription.find((description: FileContent) => {
                            const indexOfPath = Object.keys(enumInstance).indexOf(description.fileCode);
                            if (indexOfPath !== -1) {
                                const regex = <RegExp>Object.values(enumInstance)[indexOfPath];
                                if (regex && filePath.match(regex)) {
                                    return true;
                                }
                            }
                            return false;
                        });
                        if (found) {
                            return found.fileContent;
                        }
                    }
                }
            }
            return undefined;
        } catch (error) {
            throw new Error(`${DescriptorErrorEnum.SOURCE_FILES_DESCRIPTION}: ${error}`);
        }
    }

    private static getRespectiveFileCodeEnum(dataSourceCode: DataSourceCode): any | undefined {
        if (dataSourceCode === DataSourceCode.INSTAGRAM) {
            return FileCodeInstagram;
        } else if (dataSourceCode === DataSourceCode.FACEBOOK) {
            return FileCodeFacebook;
        } else if (dataSourceCode === DataSourceCode.AMAZON) {
            return FileCodeAmazon;
        } else if (dataSourceCode === DataSourceCode.GOOGLE) {
            return FileCodeGoogle;
        } else if (dataSourceCode === DataSourceCode.LINKEDIN) {
            return FileCodeLinkedIn;
        } else if (dataSourceCode === DataSourceCode.NETFLIX) {
            return FileCodeNetflix;
        } else if (dataSourceCode === DataSourceCode.SHOPIFY_PRODUCTS
            || dataSourceCode === DataSourceCode.SHOPIFY_ORDERS
            || dataSourceCode === DataSourceCode.SHOPIFY_DISCOUNTS
            || dataSourceCode === DataSourceCode.SHOPIFY_CUSTOMERS) {
            return FileCodeShopify;
        } else {
            return undefined;
        }
    }
}
