import Logger from "../../utils/logger";
import {HttpMethod, ValidatorObject} from "../../utils";
import {
    AccountCB,
    AccountsCB, AddressCB, ApplicationCB,
    BalanceCB, DetailsCB,
    NetworkCB,
    ToCB,
    TransactionCB,
    TransactionsCB,
    UserCB
} from "./model.coinbase";

export class ServiceCoinbase {
    private readonly logger = new Logger("Service Coinbase");
    private readonly apiKey: string;
    private readonly apiSecret: string;
    private readonly httpMethod: HttpMethod;

    private createSignature(message: string, apiSecret: string) {
        const CryptoJS = require("crypto-js");
        return CryptoJS.HmacSHA256(message, apiSecret).toString();
    }

    private getConfig(method: string, path: string) {
        const timestamp = Math.floor(Date.now() / 1000);
        const req = {
            method: method,
            path: path,
            body: ''
        };
        const message = timestamp + req.method + req.path + req.body;
        const signature = this.createSignature(message, this.apiSecret);
        return {
            url: `https://api.coinbase.com` + req.path,
            method: req.method,
            headers: {
                'CB-ACCESS-SIGN': signature,
                'CB-ACCESS-TIMESTAMP': timestamp.toString(),
                'CB-ACCESS-KEY': this.apiKey,
                'CB-VERSION': '2015-07-22'
            }
        };
    }

    constructor(apiKey: string, apiSecret: string, httpMethod: HttpMethod) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.httpMethod = httpMethod;
    }

    /**
     * Model building from API call to https://api.coinbase.com/v2/user
     */
    async getUserAPI(): Promise<UserCB | undefined> {
        try {
            let response = await this.httpMethod(this.getConfig('GET', '/v2/user'));
            const model: UserCB = {};
            if (response.data) {
                response = response.data;
                (response.id) && (model.id = response.id);
                (response.name) && (model.name = response.name);
                (response.username) && (model.username = response.username);
                (response.profile_location) && (model.profileLocation = response.profile_location);
                (response.profile_bio) && (model.profileBio = response.profile_bio);
                (response.profile_url) && (model.profileUrl = response.profile_url);
                (response.avatar_url) && (model.avatarUrl = response.avatar_url);
                (response.resource) && (model.resource = response.resource);
                (response.resource_path) && (model.resourcePath = response.resource_path);
                (response.email) && (model.email = response.email);
                (response.legacy_id) && (model.legacyId = response.legacy_id);
                (response.time_zone) && (model.timezone = response.time_zone);
                (response.native_currency) && (model.nativeCurrency = response.native_currency);
                (response.bitcoin_unit) && (model.bitcoinUnit = response.bitcoin_unit);
                (response.state) && (model.state = response.state);
                (response.country) && (model.country = {
                    code: response.country.code,
                    name: response.country.name,
                    isInEurope: response.country.is_in_europe});
                (response.nationality) && (model.nationality = {
                    code: response.country.code,
                    name: response.country.name});
                (response.region_supports_fiat_transfers !== undefined) && (model.regionSupportsFiatTransfers = response.region_supports_fiat_transfers);
                (response.region_supports_crypto_to_crypto_transfers !== undefined) && (model.regionSupportsCryptoToCryptoTransfers = response.region_supports_crypto_to_crypto_transfers);
                (response.created_at) && (model.createdAt = new Date(response.created_at));
                (response.supports_rewards !== undefined) && (model.supportsRewards = response.supports_rewards);
                (response.has_blocking_buy_restrictions !== undefined) && (model.hasBlockingBuyRestrictions = response.has_blocking_buy_restrictions);
                (response.has_made_a_purchase !== undefined) && (model.hasMadePurchase = response.has_made_a_purchase);
                (response.has_buy_deposit_payment_methods !== undefined) && (model.hasBuyDepositPaymentMethods = response.has_buy_deposit_payment_methods);
                (response.has_unverified_buy_deposit_payment_methods !== undefined) && (model.hasUnverifiedBuyDepositPaymentMethods = response.has_unverified_buy_deposit_payment_methods);
                (response.needs_kyc_remediation !== undefined) && (model.needsKycRemediation = response.needs_kyc_remediation);
                (response.show_instant_ach_ux !== undefined) && (model.showInstantAchUx = response.show_instant_ach_ux);
                (response.user_type) && (model.userType = response.user_type);

            }
            return !ValidatorObject.objectIsEmpty(model) ? model : undefined;
        } catch(error: any) {
            this.logger.log('error', error.message, 'getUserAPI');
        }
    }

    /**
     * Model building from API call to https://api.coinbase.com/v2/accounts
     */
    async getAccountsAPI(): Promise<AccountsCB | undefined> {
        try {
            let response = await this.httpMethod(this.getConfig('GET', '/v2/accounts'));
            const model: AccountsCB = {list: []};
            (response.data) && (model.list = response.data.map((account: any) => {
                const subModel: AccountCB = {};
                (account.id) && (subModel.id = account.id);
                (account.name) && (subModel.name = account.name);
                (account.primary !== undefined) && (subModel.primary = account.primary);
                (account.type) && (subModel.type = account.type);
                (account.currency) && (subModel.currency = account.currency);
                (account.resource) && (subModel.resource = account.resource);
                (account.resource_path) && (subModel.resourcePath = account.resource_path);
                (account.allow_deposits !== undefined) && (subModel.allowDeposits = account.allow_deposits);
                (account.allow_withdrawals !== undefined) && (subModel.allowWithdrawals = account.allow_withdrawals);
                (account.created_at) && (subModel.createdAt = new Date(account.created_at));
                (account.updated_at) && (subModel.updatedAt = new Date(account.updated_at));
                (account.balance) && (subModel.balance = this.buildBalance(account.balance));
                (account.native_balance) && (subModel.nativeBalance = this.buildBalance(account.native_balance));
                return !ValidatorObject.objectIsEmpty(subModel) ? subModel : undefined;
            }));
            return model.list.length > 0 ? model : undefined;
        } catch(error: any) {
            this.logger.log('error', error.message, 'getAccountsAPI');
        }
    }

    /**
     * Model building from API call to https://api.coinbase.com/v2/accounts
     */
    async getTransactionsAPI(accountId: string): Promise<TransactionsCB | undefined> {
        try {
            let response = await this.httpMethod(this.getConfig('GET', `/v2/accounts/${accountId}/transactions`));
            const model: TransactionsCB = {list: []};
            (response.data) && (model.list = response.data.map((account: any) => {
                const subModel: TransactionCB = {};
                (account.id) && (subModel.id = account.id);
                (account.type) && (subModel.type = account.type);
                (account.status) && (subModel.status = account.status);
                (account.amount) && (subModel.amount = this.buildBalance(account.amount));
                (account.native_amount) && (subModel.amount = this.buildBalance(account.native_amount));
                (account.description) && (subModel.description = account.description);
                (account.created_at) && (subModel.createdAt = new Date(account.created_at));
                (account.updated_at) && (subModel.updatedAt = new Date(account.updated_at));
                (account.resource) && (subModel.resource = account.resource);
                (account.resourcePath) && (subModel.resourcePath = account.resourcePath);
                (account.instantExchange !== undefined) && (subModel.instantExchange = account.instantExchange);
                (account.idem) && (subModel.idem = account.idem);
                (account.hideNativeAmount !== undefined) && (subModel.hideNativeAmount = account.hideNativeAmount);
                (account.network) && (subModel.network = this.buildNetwork(account.network));
                (account.to) && (subModel.to = this.buildTo(account.to));
                (account.application) && (subModel.application = this.buildApplication(account.application));
                (account.details) && (subModel.details = this.buildDetails(account.details));
                return !ValidatorObject.objectIsEmpty(subModel) ? subModel : undefined;
            }));
            return model.list.length > 0 ? model : undefined;
        } catch(error: any) {
            this.logger.log('error', error.message, 'getTransactionsAPI');
        }
    }

    private buildBalance(document: any) {
        const model: BalanceCB = {};
        (document.amount) && (model.amount = parseInt(document.amount));
        (document.amount) && (model.amount = document.currency);
        return model;
    }

    private buildNetwork(document: any) {
        const model: NetworkCB = {};
        (document.status) && (model.status = document.status);
        (document.status_description) && (model.statusDescription = document.status_description);
        (document.hash) && (model.hash = document.hash);
        (document.transaction_url) && (model.transactionUrl = document.transaction_url);
        (document.transaction_fee) && (model.transactionFee = this.buildBalance(document.transaction_fee));
        (document.transaction_amount) && (model.transactionAmount = this.buildBalance(document.transaction_amount));
        (document.confirmations) && (model.confirmations = document.confirmations);
        return model;
    }

    private buildTo(document: any) {
        const model: ToCB = {};
        (document.resource) && (model.resource = document.resource);
        (document.address) && (model.address = document.address);
        (document.currency) && (model.currency = document.currency);
        (document.address_info) && (model.addressInfo = this.buildAddress(document.address_info));
        (document.address_url) && (model.addressUrl = document.address_url);
        return model;
    }

    private buildAddress(document: any) {
        const model: AddressCB = {};
        (document.address) && (model.address = document.address);
        return model;
    }

    private buildApplication(document: any) {
        const model: ApplicationCB = {};
        (document.id) && (model.id = document.id);
        (document.resource) && (model.resource = document.resource);
        (document.resource_path) && (model.resourcePath = document.resource_path);
        return model;
    }

    private buildDetails(document: any) {
        const model: DetailsCB = {};
        (document.title) && (model.title = document.title);
        (document.subtitle) && (model.subtitle = document.subtitle);
        (document.header) && (model.header = document.header);
        (document.health) && (model.health = document.health);
        return model;
    }
}
