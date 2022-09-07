import {staticImplements} from "../../utils/decorator";
import {ProcessorDatasource, ProcessorOptions, ValidatorObject} from "../../utils";
import Logger from "../../utils/logger";
import {Unzipped, unzipSync} from "fflate";
import {LinkedInDataAggregator} from "./model.linkedin";

@staticImplements<ProcessorDatasource>()
export class ProcessorLinkedin {
    private static readonly logger = new Logger("Processor Instagram");

    static initAggregator(): LinkedInDataAggregator {
        return {profile: {}, jobs: {}, ads:{}};
    }

    /**
     * @param zipFile - file zip as Uint8Array
     * @param options - optional set of options
     * @return aggregation of data from LinkedIn datasource
     */
    static async zipAggregatorBuilder(zipFile: Uint8Array, options?: ProcessorOptions): Promise<LinkedInDataAggregator | undefined> {
        try {
            const files: Unzipped = unzipSync(zipFile);
            const model: LinkedInDataAggregator = this.initAggregator();
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

    static async aggregatorBuilder(data: Buffer, pathName: string, model: LinkedInDataAggregator, options: ProcessorOptions = {}) {

    }
}
