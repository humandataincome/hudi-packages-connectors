import {
    AccountBI,
    DepositHistoryBI,
    TradeListBI,
    WithdrawHistoryBI,
} from './model.binance';
import { HttpMethod } from '../../utils';
import LoggerUtils from '../../utils/logger.utils';
import { ValidatorObject } from '../../validator';

export class ServiceBinance {
    private readonly logger = new LoggerUtils('Service Binance');
    private readonly apiKey: string;
    private readonly apiSecret: string;
    private readonly httpMethod: HttpMethod;

    private createSignature(queryString: string, apiSecret: string) {
        const CryptoJS = require('crypto-js');
        return CryptoJS.HmacSHA256(queryString, apiSecret).toString();
    }

    constructor(apiKey: string, apiSecret: string, httpMethod: HttpMethod) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.httpMethod = httpMethod;
    }

    /**
     * Model building from API call to https://api.binance.com/api/v3/account
     */
    async getAccountAPI(query?: string): Promise<AccountBI | undefined> {
        try {
            const queryString = query
                ? query
                : `timestamp=${Date.now()}&recvWindow=60000`;
            const signatureBinance = this.createSignature(
                queryString,
                this.apiSecret,
            );
            const configRequest = {
                url: `https://api.binance.com/api/v3/account?${queryString}&signature=${signatureBinance}`,
                method: 'GET',
                headers: {
                    'X-MBX-APIKEY': this.apiKey,
                },
            };
            const response = await this.httpMethod(configRequest);
            const model: AccountBI = {
                ...response,
                updateTime: new Date(response.updateTime),
            };
            return !ValidatorObject.objectIsEmpty(model) ? model : undefined;
        } catch (error: any) {
            this.logger.log('error', error.message, 'getAccountAPI');
        }
    }

    async getTradeListAPI(query?: string): Promise<TradeListBI | undefined> {
        try {
            const queryString = query
                ? query
                : `timestamp=${Date.now()}&recvWindow=60000&symbol=BNBBTC`;
            const signatureBinance = this.createSignature(
                queryString,
                this.apiSecret,
            );
            const configRequest = {
                url: `https://api.binance.com/api/v3/myTrades?${queryString}&signature=${signatureBinance}`,
                method: 'GET',
                headers: {
                    'X-MBX-APIKEY': this.apiKey,
                },
            };
            const response = await this.httpMethod(configRequest);
            const model: TradeListBI = {
                list:
                    response.length > 0
                        ? response.data.map((item: any) => {
                              return { ...item, time: new Date(item.time) };
                          })
                        : [],
            };
            return !ValidatorObject.objectIsEmpty(model) ? model : undefined;
        } catch (error: any) {
            this.logger.log('error', error.message, 'getTradeListAPI');
            throw error;
        }
    }

    /**
     * Model building from API call to https://api.binance.com/sapi/v1/capital/deposit/hisrec
     */
    async getDepositHistoryAPI(
        query?: string,
    ): Promise<DepositHistoryBI | undefined> {
        try {
            const queryString = query
                ? query
                : `timestamp=${Date.now()}&recvWindow=60000`;
            const signatureBinance = this.createSignature(
                queryString,
                this.apiSecret,
            );
            const configRequest = {
                url: `https://api.binance.com/sapi/v1/capital/deposit/hisrec?${queryString}&signature=${signatureBinance}`,
                method: 'GET',
                headers: {
                    'X-MBX-APIKEY': this.apiKey,
                },
            };
            const response = await this.httpMethod(configRequest);
            const model: DepositHistoryBI = { list: response };
            return !ValidatorObject.objectIsEmpty(model) ? model : undefined;
        } catch (error: any) {
            this.logger.log('error', error.message, 'getDepositHistoryAPI');
        }
    }

    /**
     * Model building from API call to https://api.binance.com/sapi/v1/capital/withdraw/history
     */
    async getWithdrawHistoryAPI(
        query?: string,
    ): Promise<WithdrawHistoryBI | undefined> {
        try {
            const queryString = query
                ? query
                : `timestamp=${Date.now()}&recvWindow=60000`;
            const signatureBinance = this.createSignature(
                queryString,
                this.apiSecret,
            );
            const configRequest = {
                url: `https://api.binance.com/sapi/v1/capital/withdraw/history?${queryString}&signature=${signatureBinance}`,
                method: 'GET',
                headers: {
                    'X-MBX-APIKEY': this.apiKey,
                },
            };
            const response = await this.httpMethod(configRequest);
            const model: WithdrawHistoryBI = {
                list:
                    response.length > 0
                        ? response.data.map((item: any) => {
                              return {
                                  ...item,
                                  applyTime: new Date(item.applyTime),
                              };
                          })
                        : [],
            };
            return !ValidatorObject.objectIsEmpty(model) ? model : undefined;
        } catch (error: any) {
            this.logger.log('error', error.message, 'getWithdrawHistoryAPI');
        }
    }
}
