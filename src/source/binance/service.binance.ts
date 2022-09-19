import {APIAccountBI, APIDepositHistoryBI, APITradeListBI, APIWithdrawHistoryBI} from "./model.binance";
import {ValidatorObject} from "../../utils";
import Logger from "../../utils/logger";

export interface APIRequest {
    url: string,
    method: string;
    body?: JSON; //TODO: better type is probably needed
    headers: Record<string,string>;
}

export type HttpMethod = (request: APIRequest) => Promise<any>;

export class ServiceBinance {
    private readonly logger = new Logger("Service Binance");
    private readonly apiKey: string;
    private readonly apiSecret: string;
    private readonly httpMethod: HttpMethod;

    private createSignature(queryString: string, apiSecret: string) {
        const CryptoJS = require("crypto-js");
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
    async getAccountAPI(query?: string): Promise<APIAccountBI | undefined> {
        try {
            const queryString = query ? query : 'timestamp=' + Date.now();
            const signatureBinance = this.createSignature(queryString, this.apiKey);
            console.log(`https://api.binance.com/api/v3/account?${queryString}&signature=${signatureBinance}`);
            const configRequest = {
                url: `https://api.binance.com/api/v3/account?${queryString}&signature=${signatureBinance}`,
                method: 'GET',
                headers: {
                    'X-MBX-APIKEY': this.apiSecret
                }
            };
            //console.log(await fetch(configRequest.url, {method: configRequest.method, headers: configRequest.headers}));
            const response = await this.httpMethod(configRequest);
            console.log(response)
            const model: APIAccountBI = {...response.data, updateTime: new Date(response.data.updateTime)};
            return !ValidatorObject.objectIsEmpty(model) ? model : undefined;
        } catch(error: any) {
            this.logger.log('error', error.message, 'getAccountAPI');
        }
    }


    /**
     * Model building from API call to https://api.binance.com/api/v3/myTrades
     */
    /*
    static async getTradeListAPI(apiKey: string, apiSecret: string, query?: string): Promise<APITradeListBI | undefined> {
        try {
            const queryString = query ? query : 'timestamp=' + Date.now() + `&symbol=BNBBTC`;
            const signatureBinance = this.createSignature(queryString, apiSecret);
            const config = {
                url: `https://api.binance.com/api/v3/myTrades?${queryString}&signature=${signatureBinance}`,
                method: 'GET',
                headers: {
                    'X-MBX-APIKEY': apiKey
                }
            };
            const response = await this.APIRequest(config);

            const model: APITradeListBI = {};
            model.symbol = response.data.symbol;
            model.id = response.data.id;
            model.orderId = response.data.orderId;
            model.orderListId = response.data.orderListId;
            model.price = response.data.price;
            model.qty = response.data.qty;
            model.quoteQty = response.data.quoteQty;
            model.commission = response.data.commission;
            model.commissionAsset = response.data.commissionAsset;
            model.time = new Date(response.data.time);
            model.isBuyer = response.data.isBuyer;
            model.isMaker = response.data.isMaker;
            model.isBestMatch = response.data.isBestMatch;
            return !ValidatorObject.objectIsEmpty(model) ? model : undefined;
        } catch(error: any) {
            this.logger.log('error', error.message, 'getTradeListAPI');
        }
    }

     */

    /**
     * Model building from API call to https://api.binance.com/sapi/v1/capital/deposit/hisrec
     */
    /*
    static async getDepositHistoryAPI(apiKey: string, apiSecret: string, query?: string): Promise<APIDepositHistoryBI | undefined> {
        try {
            const queryString = query ? query : 'timestamp=' + Date.now();
            const signatureBinance = this.createSignature(queryString, apiSecret);
            const config = {
                url: `https://api.binance.com/sapi/v1/capital/deposit/hisrec?${queryString}&signature=${signatureBinance}`,
                method: 'GET',
                headers: {
                    'X-MBX-APIKEY': apiKey
                }
            };
            const response = await this.APIRequest(config);

            const model: APIDepositHistoryBI = {};
            model.id = response.data.id;
            model.amount = response.data.amount;
            model.coin = response.data.coin;
            model.network = response.data.network;
            model.status = response.data.status;
            model.address = response.data.address;
            model.addressTag = response.data.addressTag;
            model.txId = response.data.txId;
            model.insertTime = response.data.insertTime;
            model.transferType = response.data.transferType;
            model.confirmTimes = response.data.confirmTimes;
            model.unlockConfirm = response.data.unlockConfirm;
            model.walletType = response.data.walletType;
            return !ValidatorObject.objectIsEmpty(model) ? model : undefined;
        } catch(error: any) {
            this.logger.log('error', error.message, 'getDepositHistoryAPI');
        }
    }

     */

    /**
     * Model building from API call to https://api.binance.com/sapi/v1/capital/withdraw/history
     */
    /*
    static async getWithdrawHistoryAPI(apiKey: string, apiSecret: string, query?: string): Promise<APIWithdrawHistoryBI | undefined> {
        try {
            const queryString = query ? query : 'timestamp=' + Date.now();
            const signatureBinance = this.createSignature(queryString, apiSecret);
            const config = {
                url: `https://api.binance.com/sapi/v1/capital/withdraw/history?${queryString}&signature=${signatureBinance}`,
                method: 'GET',
                headers: {
                    'X-MBX-APIKEY': apiKey
                }
            };
            const response = await this.APIRequest(config);

            const model: APIWithdrawHistoryBI = {list: []};
            response.data.map((item: any) => {return {...item, applyTime: new Date(item.applyTime)}});

            return model.list.length > 0 ? model : undefined;
        } catch(error: any) {
            this.logger.log('error', error.message, 'getWithdrawHistoryAPI');
        }
    }

     */
}
