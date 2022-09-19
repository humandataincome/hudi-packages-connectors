import {APIAccountBI} from "./model.binance";
import {ValidatorObject} from "../../utils";
import Logger from "../../utils/logger";

export interface APIRequest {
    url: string,
    method: string;
    body?: JSON;
    headers: Record<string,string>;
}

/**
 * Must return only the response object
 */
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
            const signatureBinance = this.createSignature(queryString, this.apiSecret);
            const configRequest = {
                url: `https://api.binance.com/api/v3/account?${queryString}&signature=${signatureBinance}`,
                method: 'GET',
                headers: {
                    'X-MBX-APIKEY': this.apiKey
                }
            };
            const response = await this.httpMethod(configRequest);
            const model: APIAccountBI = {...response, updateTime: new Date(response.updateTime)};
            return !ValidatorObject.objectIsEmpty(model) ? model : undefined;
        } catch(error: any) {
            this.logger.log('error', error.message, 'getAccountAPI');
        }
    }
}
