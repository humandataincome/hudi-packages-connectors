import {staticImplements} from "../../utils/decorator";
import {ProcessorDatasource, ProcessorOptions} from "../../utils";
import Logger from "../../utils/logger";
import {TiktokDataAggregator} from "./model.tiktok";

@staticImplements<ProcessorDatasource>()
export class ProcessorTiktok {
    private static readonly logger = new Logger("Processor TikTok");

    static initAggregator(): TiktokDataAggregator {
        return {};
    }

    static async zipAggregatorBuilder(zipFile: Uint8Array, options?: ProcessorOptions): Promise<TiktokDataAggregator | undefined> {
        return ;
    }

    static async aggregatorBuilder(data: Buffer, pathName: string, model: TiktokDataAggregator, options: ProcessorOptions = {}) {

    }
}
