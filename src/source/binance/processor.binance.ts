import LoggerUtils from "../../utils/logger.utils";
import {staticImplements} from "../../utils/decorator.utils";
import {HttpMethod, ProcessorAPIDatasource, ValidatorObject} from "../../utils";
import {DepositHistoryBI, TradeListBI, BinanceDataAggregator, WithdrawHistoryBI} from "./model.binance";
import {ServiceBinance} from "./service.binance";

@staticImplements<ProcessorAPIDatasource>()
export class ProcessorBinance {
    private static readonly logger = new LoggerUtils("Processor Binance");

    static initAggregator(): BinanceDataAggregator {
        return {}
    }

    static async aggregatorBuilder(apiKey: string, apiSecretKey: string, method: HttpMethod) {
        try {
            const service = new ServiceBinance(apiKey, apiSecretKey, method);
            const model: BinanceDataAggregator = this.initAggregator();
            model.account = await service.getAccountAPI();

            //fill the 'trades' parameter
            let segment90Days = 4; //90*4 days, each one is a different API call
            const symbols = [
                'ADABUSD',
                'BNBBTC', 'BNBBUSD', 'BNBETH', 'BNBEUR', 'BNBUSDT',
                'BTCBUSD',
                'ETHBUSD',
                'SOLBNB', 'SOLBUSD',
            ];
            for (let symbol in symbols) {
                const trades: TradeListBI = {list: []};
                let tradesResults: Promise<TradeListBI | undefined>[] = [];
                for (let i = 1; i < segment90Days+1; i++) {
                    const days = i * 90;
                    tradesResults.push(service.getTradeListAPI(i === 1 ? `timestamp=${Date.now()}&recvWindow=60000` : `timestamp=${Date.now()}&recvWindow=60000&symbol=${symbol}&startTime=${days}&endTime=${days - 90}`));
                }
                trades.list = trades.list.concat(...(<TradeListBI[]>((await Promise.all(tradesResults)).filter((x: TradeListBI | undefined) => !!x))).map((x) => x.list));
                if (trades.list.length > 0) {
                    (!model.trades) && (model.trades = {});
                    model.trades.symbol = trades;
                }
            }

            //fill the 'depositHistory' parameter
            const deposits: DepositHistoryBI = {list: []};
            let depositsResults: Promise<DepositHistoryBI | undefined>[] = [];
            for (let i = 1; i < segment90Days + 1; i++) {
                const days = i * 90;
                depositsResults.push(service.getDepositHistoryAPI(i === 1 ? `timestamp=${Date.now()}&recvWindow=60000` : `timestamp=${Date.now()}&recvWindow=60000&startTime=${days}&endTime=${days - 90}`));
            }
            deposits.list = deposits.list.concat(...(<DepositHistoryBI[]>((await Promise.all(depositsResults)).filter((x: DepositHistoryBI | undefined) => !!x))).map((x) => x.list));
            if (deposits.list.length > 0) {
                model.depositHistory = deposits;
            }

            //fill the 'withdrawHistory' parameter
            const withdraw: WithdrawHistoryBI = {list: []};
            let withdrawResults: Promise<WithdrawHistoryBI | undefined>[] = [];
            for (let i = 1; i < segment90Days+1; i++) {
                const days = i * 90;
                withdrawResults.push(service.getWithdrawHistoryAPI(i === 1 ? `timestamp=${Date.now()}&recvWindow=60000` : `timestamp=${Date.now()}&recvWindow=60000&startTime=${days}&endTime=${days - 90}`));
            }
            withdraw.list = withdraw.list.concat(...(<WithdrawHistoryBI[]>((await Promise.all(withdrawResults)).filter((x: WithdrawHistoryBI | undefined) => !!x))).map((x) => x.list));
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
        return undefined;
    }
}
