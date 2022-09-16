
export interface BinanceDataAggregator {
    account?: APIAccountBI;
    creationDate?: Date;
}

// https://api.binance.com/api/v3/account model
export interface APIAccountBI {
    makerCommission?: number;
    takerCommission?: number;
    buyerCommission?: number;
    sellerCommission?: number;
    canTrade?: boolean;
    canWithdraw?: boolean;
    canDeposit?: boolean;
    updateTime?: number;
    accountType?: string;
    balances?: Array<any>;
    permissions?: Array<string>;
}
