import {staticImplements} from "../../utils/decorator.utils";
import {HttpMethod, ProcessorAPIDatasource, ValidatorObject} from "../../utils";
import LoggerUtils from "../../utils/logger.utils";
import {AccountCB, CoinbaseDataAggregator, MovementsAggregatorCB} from "./model.coinbase";
import {ServiceCoinbase} from "./service.coinbase";

@staticImplements<ProcessorAPIDatasource>()
export class ProcessorCoinbase {
    private static readonly logger = new LoggerUtils("Processor Coinbase");

    static initAggregator(): CoinbaseDataAggregator {
        return {
            movements: {}
        }
    }

    static async aggregatorBuilder(apiKey: string, apiSecretKey: string, method: HttpMethod) {
        try {
            const service = new ServiceCoinbase(apiKey, apiSecretKey, method);
            const model: CoinbaseDataAggregator = this.initAggregator();
            model.user = await service.getUserAPI();
            model.accounts = await service.getAccountsAPI();
            if (model.accounts) {
                const currencies: string[] = [
                    //top 20 cryptos for market price
                    'BTC','ETH','USDT','USDC','BNB','XRP','BUSD','ADA','SOL','DOGE',
                    'DOT','SHIB','DAI','STETH','TRX','MATIC','AVAX','UNI','LTC'
                ];
                let currenciesAnalyzed: string[] = [];
                //cycle asynchronously between all the possible currency types (around 228)
                //rate limits at: https://docs.cloud.coinbase.com/sign-in-with-coinbase/docs/rate-limiting
                await Promise.all(model.accounts.list.map(async (account: AccountCB) => {
                    if(account.currency) {
                        if ((account.balance && account.balance.amount && account.balance.amount > 0)
                        || (currencies.includes(account.currency) && !currenciesAnalyzed.includes(account.currency))) {
                            if (await this.buildMovementsAggregator(account, model, service)) {
                                currenciesAnalyzed.push(account.currency);
                            }
                        }
                    }
                }));
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
    private static async buildMovementsAggregator(account: AccountCB, model: CoinbaseDataAggregator, service: ServiceCoinbase) {
        const accountId = account.id;
        if (accountId) {
            const values = await Promise.all([
                service.getTransactionsAPI(accountId),
                service.getDepositHistoryAPI(accountId),
                service.getWithdrawHistoryAPI(accountId),
                service.getBuysAPI(accountId),
                service.getSellsAPI(accountId)
            ]);
            const subModel: MovementsAggregatorCB = {};
            (values[0]) && (subModel.transactions = values[0]);
            (values[1]) && (subModel.deposits = values[1]);
            (values[2]) && (subModel.withdraws = values[2]);
            (values[3]) && (subModel.buys = values[3]);
            (values[4]) && (subModel.sells = values[4]);
            if (!ValidatorObject.objectIsEmpty(subModel)) {
                model.movements[account.currency!] = subModel;
                return true;
            }
        }
        return false;
    }
}
