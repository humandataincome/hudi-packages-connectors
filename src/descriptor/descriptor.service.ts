import {Language} from "../utils/utils.enum";
import {DataSourceCode, RetrievingProcedureType} from "./descriptor.enum";
import {FileContent, Procedure, RetrieveStep, RetrievingProcedure, SourceDescription} from "./descriptor.model";
import Logger from "../utils/logger";

export class DescriptorService {
    private logger = new Logger("Descriptor Service");

    /**
     * @return {Promise<Array<DataSourceCode>>} - array of available data sources' respective codes
     */
    async availableDataSources(): Promise<Array<DataSourceCode>> {
        return [
            DataSourceCode.INSTAGRAM,
            /*
            DataSource.FACEBOOK,
            DataSource.GOOGLE,
            DataSource.NETFLIX,
            DataSource.AMAZON,
            DataSource.LINKEDIN
             */
        ];
    }

    /**
     * @param dataSourceCode - code of the procedure's data source we want to retrieve
     * @param language - code of procedure's language we want to retrieve
     * @param procedureType - type of procedure we want to retrieve
     * @return {Promise<Array<RetrieveStep>  | undefined>} - list of all the steps
     */
    async retrieveDataSourceProcedure(dataSourceCode: DataSourceCode, language: Language, procedureType: RetrievingProcedureType = RetrievingProcedureType.DEFAULT): Promise<Array<RetrieveStep> | undefined> {
        try {
            const document = require('./descriptor.json');
            let model: Array<RetrieveStep> = [];
            if (document.supportedSources.length > 0) {
                document.supportedSources.map((item: SourceDescription) => {
                    if(item.sourceCode == dataSourceCode && item.retrievingProcedures.length > 0) {
                        item.retrievingProcedures.map((item: RetrievingProcedure) => {
                            if(item.languageCode == language && item.procedures.length > 0) {
                                item.procedures.map((item: Procedure) => {
                                    if(item.procedureType == procedureType) {
                                        model = item.retrievingSteps;
                                    }
                                });
                            }
                        });
                    }
                });
            }
            return model.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'retrieveDataSourceProcedure');
        }
    }

    async retrieveDataContentDescription(dataSourceCode: DataSourceCode, language: Language): Promise<Array<FileContent> | undefined> {
        try {
            const document = require('./descriptor.json');
            let model: Array<FileContent> = [];
            if (document.supportedSources.length > 0) {
                document.supportedSources.map((item: SourceDescription) => {
                    if(item.sourceCode == dataSourceCode && item.retrievingProcedures.length > 0) {
                        item.retrievingProcedures.map((item: RetrievingProcedure) => {
                            if(item.languageCode == language) {
                                model = item.dataDescription;
                            }
                        });
                    }
                });
            }
            return model.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'retrieveDataContentDescription');
        }
    }
}