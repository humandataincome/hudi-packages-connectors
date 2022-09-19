import {APIAccountBI, APIDepositHistoryBI, APITradeListBI} from "./model.binance";
import {ValidatorObject} from "../../utils";
import Logger from "../../utils/logger";
import axios from "axios";

interface ConfigAPIRequest {
    url: string;
    method: string;
    headers: Record<string,string>;
}

export class ServiceBinance {
    private static readonly logger = new Logger("Service Binance");

    private static isBrowser(){
        return typeof window !== "undefined" && typeof window.document !== "undefined";
    }

    private static createSignature(queryString: string, apiSecret: string) {
        const CryptoJS = require("crypto-js");
        return CryptoJS.HmacSHA256(queryString, apiSecret).toString();
    }

    private static async APIRequest(config: ConfigAPIRequest): Promise<any> {
        if (!this.isBrowser()) { //if NOT browser
            return axios(config);
        } else { //if browser, then must get around CORS
            //TODO: use HDN from hudi-protocol-core
            return
        }
    }

    /**
     * Model building from API call to https://api.binance.com/api/v3/account
     */
    static async getAccountAPI(apiKey: string, apiSecret: string): Promise<APIAccountBI | undefined> {
        try {
            const queryString = 'timestamp=' + Date.now();
            const signatureBinance = this.createSignature(queryString, apiSecret);
            const config = {
                url: `https://api.binance.com/api/v3/account?${queryString}&signature=${signatureBinance}`,
                method: 'GET',
                headers: {
                    'X-MBX-APIKEY': apiKey
                }
            };
            const response = await this.APIRequest(config);

            const model: APIAccountBI = {};
            model.makerCommission = response.data.makerCommission;
            model.takerCommission = response.data.takerCommission;
            model.buyerCommission = response.data.buyerCommission;
            model.sellerCommission = response.data.sellerCommission;
            model.canTrade = response.data.canTrade;
            model.canWithdraw = response.data.canWithdraw;
            model.canDeposit = response.data.canDeposit;
            model.updateTime = new Date(response.data.updateTime);
            model.accountType = response.data.accountType;
            model.balances = response.data.balances;
            model.permissions = response.data.permissions;
            return !ValidatorObject.objectIsEmpty(model) ? model : undefined;
        } catch(error: any) {
            this.logger.log('error', error.message, 'getAccountAPI');
            throw error;
        }
    }

    /**
     * Model building from API call to https://api.binance.com/api/v3/myTrades
     * @param apiKey
     * @param apiSecret
     * @param symbol e.g BNBBTC
     */
    static async getTradeListAPI(apiKey: string, apiSecret: string, symbol: string): Promise<APITradeListBI | undefined> {
        try {
            const queryString = 'timestamp=' + Date.now() + '&symbol=BNBBTC';
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
            throw error;
        }
    }

    /**
     * Model building from API call to https://api.binance.com/api/v1/capital/deposit/hisrec
     */
    static async getDepositHistoryAPI(apiKey: string, apiSecret: string): Promise<APIDepositHistoryBI | undefined> {
        try {
            const queryString = 'timestamp=' + Date.now();
            const signatureBinance = this.createSignature(queryString, apiSecret);
            const config = {
                url: `https://api.binance.com/api/v1/capital/deposit/hisrec?${queryString}&signature=${signatureBinance}`,
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
            throw error;
        }
    }
}
