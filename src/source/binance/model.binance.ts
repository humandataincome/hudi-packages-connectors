
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
    updateTime?: Date;
    accountType?: string;
    balances?: Array<BalanceBI>;
    permissions?: Array<string>;
}

export interface BalanceBI {
    asset: string;
    free: string;
    locked: string;
}

// https://api.binance.com/api/v3/myTrades model
export interface APITradeListBI {
    list: APITradeBI[];
}

export interface APITradeBI {
    symbol?: string;
    id?: number;
    orderId?: number;
    orderListId?: number;
    price?: string;
    qty?: string;
    quoteQty?: string;
    commission?: string;
    commissionAsset?: string;
    time?: Date;
    isBuyer?: boolean;
    isMaker?: boolean;
    isBestMatch?: boolean;
}


// https://api.binance.com/sapi/v1/capital/deposit/hisrec model
export interface APIDepositHistoryBI {
    list: APIDepositBI[];
}

export interface APIDepositBI {
    id?: string;
    amount?: string;
    coin?: string;
    network?: string;
    status?: number;
    address?: string;
    addressTag?: string;
    txId?: string;
    insertTime?: number;
    transferType?: number;
    confirmTimes?: string;
    unlockConfirm?: number;
    walletType?: number;
}

// https://api.binance.com/sapi/v1/capital/withdraw/history model
export interface APIWithdrawHistoryBI {
    list: APIWithdrawBI[];
}

export interface APIWithdrawBI {
    address?: string;
    amount?: string;
    applyTime?: Date;
    coin?: string;
    id?: string;
    withdrawOrderId?: string;
    network?: string;
    transferType?: number;
    status?: number;
    transactionFee?: string;
    confirmNo?: string;
    info?: string;
    txId?: string;
}
