import Logger from "../../utils/logger";
import {HttpMethod, HTTPRequest, ValidatorObject} from "../../utils";
import {UserCB} from "./model.coinbase";

export interface Authenticated {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    refreshToken: string;
    scope: string;
}

export class ServiceBinance {
    private readonly logger = new Logger("Service Coinbase");
    private readonly httpMethod: HttpMethod;
    private readonly authenticated: Promise<Authenticated>;

    private async createAuth(code: string): Promise<Authenticated> {
        try {
            const configRequest: HTTPRequest = {
                url: 'https://api.coinbase.com/oauth/token',
                method: 'POST',
                body: JSON.stringify({
                    "grant_type": "authorization_code",
                    "code": code,
                    "client_id": '',
                    "client_secret": '',
                    "redirect_uri": ''
                }),
            };
            const response = await this.httpMethod(configRequest);
            return {...response};
        } catch(error: any) {
            this.logger.log('error', error.message, 'createAuth');
            throw error;
        }
    }

    constructor(code: string, httpMethod: HttpMethod) {
        this.httpMethod = httpMethod;
        this.authenticated = this.createAuth(code);
    }

    /**
     * Model building from API call to https://api.coinbase.com/v2/user
     */
    async getUserAPI(): Promise<UserCB | undefined> {
        try {
            const configRequest: HTTPRequest = {
                url: 'https://api.coinbase.com/v2/user',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${(await this.authenticated).accessToken}`,
                }
            }
            const response = await this.httpMethod(configRequest);
            const model: UserCB = {...response};
            return !ValidatorObject.objectIsEmpty(model) ? model : undefined;
        } catch(error: any) {
            this.logger.log('error', error.message, 'getUserAPI');
        }
    }
}
