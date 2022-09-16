import {APIAccountBI} from "./model.binance";
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

    private static async APIRequest(apiSecret: string, config: ConfigAPIRequest): Promise<any> {
        const queryString = 'timestamp=' + Date.now();
        const signatureBinance = this.createSignature(queryString, apiSecret);
        config = {...config, url: `${config.url}?${queryString}&signature=${signatureBinance}`};

        if (!this.isBrowser()) { //if NOT browser
            return axios(config);
        } else { //if browser, then must get around CORS
            //TODO: use HDN from hudi-protocol-core
            return
        }
    }

    /**
     * API call to https://api.binance.com/api/v3/account
     */
    static async getAccountAPI(apiKey: string, apiSecret: string): Promise<APIAccountBI | undefined> {
        try {
            const config = {
                url: `https://api.binance.com/api/v3/account`,
                method: 'GET',
                headers: {
                    'X-MBX-APIKEY': apiKey
                }
            };
            const response = await this.APIRequest(apiSecret, config);

            const model: APIAccountBI = {};
            model.makerCommission = response.data.makerCommission;
            model.takerCommission = response.data.takerCommission;
            model.buyerCommission = response.data.buyerCommission;
            model.sellerCommission = response.data.sellerCommission;
            model.canTrade = response.data.canTrade;
            model.canWithdraw = response.data.canWithdraw;
            model.canDeposit = response.data.canDeposit;
            model.updateTime = response.data.updateTime;
            model.accountType = response.data.accountType;
            model.balances = response.data.balances;
            model.permissions = response.data.permissions;
            return !ValidatorObject.objectIsEmpty(model) ? model : undefined;
        } catch(error: any) {
            this.logger.log('error', error.message, 'getAccount');
            throw error;
        }
    }

}
