
export interface BinanceDataAggregator {
    creationDate?: Date;
}

export interface AccountBI {
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
