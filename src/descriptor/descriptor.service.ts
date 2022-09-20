import {Descriptor, FileDescription, Procedure} from "./descriptor.model";
import {APIDataSourceCode, GDPRDataSourceCode, LanguageCode, RetrievingProcedureType} from "./descriptor.enum";
import {DescriptorErrorEnum, Selector, ValidatorObject} from "../utils";

const descriptor: Descriptor = require('./descriptor.json');

export class DescriptorService {
    static readonly document: Descriptor = descriptor;

    /**
     * @return  all available GDPR data sources' codes (someone may not be described into descriptor.json)
     */
    static getAllGDPRCodes(): GDPRDataSourceCode[] {
        let list: GDPRDataSourceCode[] = []
         for (let enumMember in GDPRDataSourceCode) {
             list.push(GDPRDataSourceCode[<GDPRDataSourceCode>enumMember]);
        }
        return list;
    }

    /**
     * @return  all available API data sources' codes (someone may not be described into descriptor.json)
     */
    static getAllAPICodes(): APIDataSourceCode[] {
        let list: APIDataSourceCode[] = []
        for (let enumMember in APIDataSourceCode) {
            list.push(APIDataSourceCode[<APIDataSourceCode>enumMember]);
        }
        return list;
    }

    /**
     * @param code - code of the datasource
     * @return  all available datasource' respective codes
     */
    static getLogo(code: GDPRDataSourceCode) {
        return require(`../../assets/${ code.toLowerCase() }.svg`);
    }

    /**
     * @param code - code of the datasource
     * @return the name of a given datasource
     */
    static getName(code: GDPRDataSourceCode): string | undefined {
        try {
            return descriptor?.sourceDescriptions?.find(
                ({sourceCode}) => sourceCode === code
            )?.sourceName;
        } catch (error) {
            throw new Error(`${DescriptorErrorEnum.SOURCE_NAME_ERROR}: ${error}`);
        }
    }

    /**
     * @param code - code of the datasource
     * @return all the procedure languages available for a given datasource
     */
    static getLanguagesList(code: GDPRDataSourceCode): LanguageCode[] | undefined {
        try {
            const sourceDescription = descriptor?.sourceDescriptions?.find(
                ({sourceCode, retrievingProcedures}) => sourceCode === code && retrievingProcedures.length
            );
            return sourceDescription?.retrievingProcedures?.map(({languageCode}) => languageCode);
        } catch (error) {
            throw new Error(`${DescriptorErrorEnum.SOURCE_LANGUAGES_ERROR}: ${error}`);
        }
    }

    /**
     * @param code - code of the datasource
     * @param language - language of the datasource
     * @return all the retrieving procedure for a given datasource and language code
     */
    static getProcedureLists(code: GDPRDataSourceCode, language: LanguageCode): Procedure[] | undefined {
        try {
            const sourceDescription = descriptor?.sourceDescriptions?.find(
                ({sourceCode, retrievingProcedures}) => sourceCode === code && retrievingProcedures.length
            );
            return sourceDescription?.retrievingProcedures?.find(
                ({languageCode, procedures}) => languageCode === language && procedures.length
            )?.procedures;
        } catch (error) {
            throw new Error(`${DescriptorErrorEnum.SOURCE_PROCEDURES_ERROR}: ${error}`);
        }
    }

    /**
     * @param code - code of the datasource
     * @param language - language of the datasource
     * @param procedureType
     * @param procedureName
     * @return the corresponding retrieving procedure for that datasource
     */
    static getProcedure(
        code: GDPRDataSourceCode,
        language: LanguageCode = LanguageCode.ENGLISH,
        procedureType: RetrievingProcedureType = RetrievingProcedureType.DESKTOP,
        procedureName?: string
    ): Procedure | undefined {
        try {
            const sourceDescription = descriptor?.sourceDescriptions?.find(
                ({sourceCode}) => sourceCode === code
            );

            const retrievingProcedure = sourceDescription?.retrievingProcedures?.find(
                ({languageCode, procedures}) => languageCode === language && procedures.length
            );

            const procedure = retrievingProcedure?.procedures?.filter(
                ({type}) => procedureType === type
            );

            if (procedure!.length > 0 && procedureName) {
                return retrievingProcedure?.procedures?.find(
                    ({name}) => procedureName === name
                );
            }
            return !ValidatorObject.objectIsEmpty(procedure![0]) ? procedure![0] : undefined;
        } catch (error) {
            throw new Error(`${DescriptorErrorEnum.SOURCE_PROCEDURE_ERROR}: ${error}`);
        }
    }

    /**
     * @param filePath - file pathname
     * @param code - code of the data source
     * @param language - language of the data source
     * @return the description of a file given a file pathname validated, a Datasource code and the language code
     */
    static getFileDescription(filePath: string, code: GDPRDataSourceCode, language: LanguageCode = LanguageCode.ENGLISH): string | undefined {
        try {
            const datasourceDescriptors = descriptor?.datasourceFilesDescriptions?.find(
                ({sourceCode}) => sourceCode === code);
            if (datasourceDescriptors) {
                const filesDescription = datasourceDescriptors.filesDescriptions?.find(
                    ({languageCode, list}) => languageCode === language && list.length);
                if (filesDescription) {
                    const enumInstance = Selector.getFileCodeEnum(code);
                    if (enumInstance) {
                        const found = filesDescription.list.find((description: FileDescription) => {
                            const indexOfPath = Object.keys(enumInstance).indexOf(description.fileCode);
                            if (indexOfPath !== -1) {
                                const regex = Object.values(enumInstance)[indexOfPath];
                                if (Selector.getValidator(code)?.getFileCode(filePath) === regex) {
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
}
