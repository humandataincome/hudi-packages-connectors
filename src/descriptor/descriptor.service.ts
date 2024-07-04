import {Descriptor, FileDescription, Procedure, SourceDescription} from "./descriptor.model";
import {
    APIDataSourceCode,
    DataSourceCode,
    GDPRDataSourceCode,
    LanguageCode,
    RetrievingProcedureType
} from "./descriptor.enum";
import {SelectorUtils, ValidatorObject} from "../utils";
import {DescriptorErrorEnum} from "../enums";

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
    static getLogo(code: DataSourceCode) {
        return require(`../../assets/${ code.toLowerCase() }.svg`);
    }

    /**
     * @param code - code of the datasource
     * @return the name of a given datasource, if it exists
     */
    static getName(code: DataSourceCode): string | undefined {
        try {
            const sourceDescription = this.getSourceDescription(code);
            return sourceDescription?.sourceName;
        } catch (error) {
            throw new Error(`${DescriptorErrorEnum.SOURCE_NAME_ERROR}: ${error}`);
        }
    }

    /**
     * @param code - code of the datasource
     * @return the description of a given datasource, if it exists
     */
    static getSourceDescription(code: DataSourceCode): SourceDescription | undefined {
        const list: SourceDescription[] = descriptor?.sourceGDPRDescriptions.concat(descriptor?.sourceAPIDescriptions);
        return list.find(
            ({sourceCode, retrievingProcedures}) => sourceCode === code && retrievingProcedures.length
        );
    }

    /**
     * @param code - code of the datasource
     * @return all the procedure languages available for a given datasource
     */
    static getLanguagesList(code: DataSourceCode): LanguageCode[] | undefined {
        try {
            const sourceDescription = this.getSourceDescription(code);
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
    static getProcedureLists(code: DataSourceCode, language: LanguageCode): Procedure[] | undefined {
        try {
            const sourceDescription = this.getSourceDescription(code);
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
        code: DataSourceCode,
        language: LanguageCode = LanguageCode.ENGLISH,
        procedureType: RetrievingProcedureType = RetrievingProcedureType.DESKTOP,
        procedureName?: string
    ): Procedure | undefined {
        try {
            const sourceDescription = this.getSourceDescription(code);

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
                    const enumInstance = SelectorUtils.getFileCodeEnum(code);
                    if (enumInstance) {
                        const found = filesDescription.list.find((description: FileDescription) => {
                            const indexOfPath = Object.keys(enumInstance).indexOf(description.fileCode);
                            if (indexOfPath !== -1) {
                                const regex = Object.values(enumInstance)[indexOfPath];
                                if (SelectorUtils.getValidator(code)?.getFileCode(filePath) === regex) {
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
