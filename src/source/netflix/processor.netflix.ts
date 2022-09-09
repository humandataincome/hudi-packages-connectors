import {staticImplements} from "../../utils/decorator";
import {ProcessorDatasource, ProcessorOptions, ValidatorObject} from "../../utils";
import Logger from "../../utils/logger";
import {NetflixDataAggregator} from "./model.netflix";
import {Unzipped, unzipSync} from "fflate";
import {FileCodeNetflix} from "./enum.netflix";
import {ServiceNetflix} from "./service.netflix";

@staticImplements<ProcessorDatasource>()
export class ProcessorNetflix {
    private static readonly logger = new Logger("Processor Netflix");

    static initAggregator(): NetflixDataAggregator {
        return {};
    }

    static async zipAggregatorBuilder(zipFile: Uint8Array, options?: ProcessorOptions): Promise<NetflixDataAggregator | undefined> {
        try {
            const files: Unzipped = unzipSync(zipFile);
            const model: NetflixDataAggregator = this.initAggregator();
            for (let pathName in files) {
                const file = files[pathName];
                const data = Buffer.from(file, file.byteOffset, file.length);
                if (!ValidatorObject.isDirectory(pathName)) {
                    await this.aggregatorBuilder(data, pathName, model, options);
                }
            }
            if (!ValidatorObject.objectIsEmpty(model)) {
                model.creationDate = new Date();
                return model;
            }
        } catch (error: any) {
            (error && error.message) && (this.logger.log('error', error.message, 'zipAggregatorBuilder'));
            if (options && options.throwExceptions !== undefined && options.throwExceptions) {
                throw error;

            }
        }
        return undefined;
    }

    static async aggregatorBuilder(data: Buffer, pathName: string, model: NetflixDataAggregator, options: ProcessorOptions = {}) {
        let result, regex;
        if ((regex = new RegExp(FileCodeNetflix.ACCOUNT_DETAILS)) && (regex.test(pathName))) {
            result = await ServiceNetflix.parsePersonalInformation(data);
            (result) && (model.accountInfo = result);
        } else if ((regex = new RegExp(FileCodeNetflix.PROFILES)) && (regex.test(pathName))) {
            result = await ServiceNetflix.parseProfiles(data);
            (result) && (model.profiles = result);
        } else if ((regex = new RegExp(FileCodeNetflix.CONTENT_INTERACTION_PREFERENCES)) && (regex.test(pathName))) {
            result = await ServiceNetflix.parsePreferences(data);
            (result) && (model.preferences = result);
        } else if ((regex = new RegExp(FileCodeNetflix.CONTENT_INTERACTION_MY_LIST)) && (regex.test(pathName))) {
            result = await ServiceNetflix.parseMyList(data);
            (result) && (model.titles = result);
        } else if ((regex = new RegExp(FileCodeNetflix.CONTENT_INTERACTION_SEARCH_HISTORY)) && (regex.test(pathName))) {
            result = await ServiceNetflix.parseSearchHistory(data);
            (result) && (model.searches = result);
        } else if ((regex = new RegExp(FileCodeNetflix.CONTENT_INTERACTION_VIEWING_ACTIVITY)) && (regex.test(pathName))) {
            result = await ServiceNetflix.parseViewingActivity(data);
            (result) && (model.viewingActivity = result);
        }
    }
}
