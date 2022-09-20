import Logger from "../../utils/logger";
import {staticImplements} from "../../utils/decorator";
import {HttpMethod, ProcessorAPIDatasource} from "../../utils";
import {BinanceDataAggregator} from "./model.binance";

@staticImplements<ProcessorAPIDatasource>()
export class ProcessorBinance {
    private static readonly logger = new Logger("Processor Binance");

    static initAggregator(): BinanceDataAggregator {
        return {}
    }

    static aggregatorBuilder(apiKey: string, apiSecretKey: string, method: HttpMethod) {

    }
}
