import Logger from "../../utils/logger";
import {ProcessorGDPRDatasource, ProcessorOptions, ValidatorObject} from "../../utils";
import {Unzipped, unzipSync} from "fflate";
import {staticImplements} from "../../utils/decorator";
import {FileCodeTwitter} from "./enum.twitter";
import {ServiceTwitter} from "./service.twitter";
import {TwitterDataAggregator} from "./model.twitter";

@staticImplements<ProcessorGDPRDatasource>()
export class ProcessorTwitter {
    private static readonly logger = new Logger("Processor Twitter");

    static initAggregator(): TwitterDataAggregator {
        return {};
    }

    static async zipAggregatorBuilder(zipFile: Uint8Array, options?: ProcessorOptions): Promise<TwitterDataAggregator | undefined> {
        try {
            const files: Unzipped = unzipSync(zipFile);
            const model: TwitterDataAggregator = this.initAggregator();
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

    static async aggregatorBuilder(data: Buffer, pathName: string, model: TwitterDataAggregator, options: ProcessorOptions = {}) {
        let result, regex;
        if ((regex = new RegExp(FileCodeTwitter.ACCOUNT)) && (regex.test(pathName))) {
            result = await ServiceTwitter.parseAccount(data);
            if (result) {
                model.account = result;
            }
        }
    }
}
