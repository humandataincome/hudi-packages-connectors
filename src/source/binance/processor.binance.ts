import Logger from "../../utils/logger";
import {staticImplements} from "../../utils/decorator";
import {HttpMethod, ProcessorAPIDatasource, ValidatorObject} from "../../utils";
import {DepositHistoryBI, TradeListBI, BinanceDataAggregator, WithdrawHistoryBI} from "./model.binance";
import {ServiceBinance} from "./service.binance";

@staticImplements<ProcessorAPIDatasource>()
export class ProcessorBinance {
    private static readonly logger = new Logger("Processor Binance");

    static initAggregator(): BinanceDataAggregator {
        return {trades: {}}
    }
    static async aggregatorBuilder(apiKey: string, apiSecretKey: string, method: HttpMethod) {
        try {
            const service = new ServiceBinance(apiKey, apiSecretKey, method);
            const model: BinanceDataAggregator = this.initAggregator();
            model.account = await service.getAccountAPI();

            //fill the 'trades' parameter
            let limitDays = 8 * 90 //must be multiple of 90 (8*90 = 2 years)
            const symbols = [
                'ADABUSD',
                'BNBBTC', 'BNBBUSD', 'BNBETH', 'BNBEUR', 'BNBUSDT',
                'BTCBUSD',
                'ETHBUSD',
                'SOLBNB', 'SOLBUSD',
            ];
            for (let symbol in symbols) {
                let trades: TradeListBI = {list: []};
                for (let i = 1; i < limitDays/90; i++) {
                    const days = i * 90;
                    const tradesInterval = await service.getTradeListAPI(`timestamp=${Date.now()}&recvWindow=60000&symbol=${symbol}&startTime=${days}&endTime=${days - 90}`);
                    tradesInterval && trades.list.concat(tradesInterval.list);
                }
                if (trades.list.length > 0) {
                    model.trades.symbol = trades;
                }
            }

            //fill the 'depositHistory' parameter
            limitDays = 8 * 90 //must be multiple of 90
            let deposits: DepositHistoryBI = {list: []};
            for (let i = 1; i < limitDays/90; i++) {
                const days = i * 90;
                const depositHistory = await service.getDepositHistoryAPI(`timestamp=${Date.now()}&recvWindow=60000&startTime=${days}&endTime=${days - 90}`);
                depositHistory && deposits.list.concat(depositHistory.list);
            }
            if (deposits.list.length > 0) {
                model.depositHistory = deposits;
            }

            //fill the 'withdrawHistory' parameter
            limitDays = 8 * 90 //must be multiple of 90
            let withdraw: WithdrawHistoryBI = {list: []};
            for (let i = 1; i < limitDays/90; i++) {
                const days = i * 90;
                const withdrawHistory = await service.getWithdrawHistoryAPI(`timestamp=${Date.now()}&recvWindow=60000&startTime=${days}&endTime=${days - 90}`);
                withdrawHistory && deposits.list.concat(withdrawHistory.list);
            }
            if (withdraw.list.length > 0) {
                model.withdrawHistory = withdraw;
            }

            if (!ValidatorObject.objectIsEmpty(model)) {
                model.creationDate = new Date();
                return model;
            }
        } catch(error: any) {
            this.logger.log('error', error.message, 'aggregatorBuilder')
        }
    }
}
