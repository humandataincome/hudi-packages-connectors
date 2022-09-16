import {AccountBI} from "./model.binance";
import {ValidatorObject} from "../../utils";
import Logger from "../../utils/logger";
import axios from "axios";

export class ServiceBinance {
    private static readonly logger = new Logger("Service Binance");

    static isBrowser(){
        return typeof window !== "undefined" && typeof window.document !== "undefined";
    }
    static createSignature(queryString: string, apiSecret: string) {
        const crypto = require('crypto');
        return crypto
            .createHmac('sha256', apiSecret)
            .update(queryString)
            .digest('hex');
    }

    static async getAccount(apiKey: string, apiSecret: string): Promise<AccountBI | undefined> {
        try {
            let response;
            const queryString = 'timestamp=' + Date.now();
            const signatureBinance = this.createSignature(queryString, apiSecret);
            const config = {
                url: `https://api.binance.com/api/v3/account?${queryString}&signature=${signatureBinance}`,
                method: 'GET',
                headers: {
                    'X-MBX-APIKEY': apiKey
                }
            };
            if (!this.isBrowser()) { //if NOT browser
                response = await axios(config);
            } else { //if browser, then must get around CORS
                //use HDN from sdk
                //response =
            }
            return this.buildAccountBI(response);
        } catch(error: any) {
            this.logger.log('error', error.message, 'getAccount');
            throw error;
        }
    }

    private static buildAccountBI(response: any): AccountBI | undefined {
        const model: AccountBI = {};
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
    }
}
