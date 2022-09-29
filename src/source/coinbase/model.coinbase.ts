export interface CoinbaseDataAggregator {
    user?: UserCB;
    accounts?: AccountsCB;
    movements: Record<string, MovementsAggregatorCB>; //string parameter is currency name
    creationDate?: Date;
}

export interface MovementsAggregatorCB {
    transactions?: TransactionsCB;
    deposits?: MovementsCB;
    withdraws?: MovementsCB;
    buys?: MovementsCB;
    sells?: MovementsCB;
}

export interface UserCB {
    id?: string;
    name?: string;
    username?: string;
    profileLocation?: any;
    profileBio?: any;
    profileUrl?: string;
    avatarUrl?: string;
    resource?: string;
    resourcePath?: string;
    email?: string;
    legacyId?: string;
    timezone?: string;
    nativeCurrency?: string;
    bitcoinUnit?: string;
    state?: string;
    country?: {
        code: string;
        name: string;
        isInEurope: boolean;
    };
    nationality?: {
        code: string;
        name: string;
    };
    regionSupportsFiatTransfers?: boolean;
    regionSupportsCryptoToCryptoTransfers?: boolean;
    createdAt?: Date;
    supportsRewards?: boolean;
    hasBlockingBuyRestrictions?: boolean;
    hasMadePurchase?: boolean;
    hasBuyDepositPaymentMethods?: boolean;
    hasUnverifiedBuyDepositPaymentMethods?: boolean;
    needsKycRemediation?: boolean;
    showInstantAchUx?: boolean;
    userType?: string;
}

//https://api.coinbase.com/v2/accounts model
export interface AccountsCB {
    list: AccountCB[];
}

export interface AccountCB {
    id?: string;
    name?: string;
    primary?: boolean;
    type?: string;
    currency?: string;
    resource?: string;
    resourcePath?: string;
    createdAt?: Date;
    updatedAt?: Date;
    allowDeposits?: boolean;
    allowWithdrawals?: boolean;
    balance?: BalanceCB;
    nativeBalance?: BalanceCB;
}

//https://api.coinbase.com/v2/accounts/:account_id/transactions model
export interface TransactionsCB {
    list: TransactionCB[];
}

export interface TransactionCB {
    id?: string;
    type?: string;
    status?: string;
    amount?: BalanceCB;
    nativeAmount?: BalanceCB;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
    resource?: string;
    resourcePath?: string;
    instantExchange?: boolean;
    idem?: string;
    hideNativeAmount?: boolean;
    network?: NetworkCB;
    to?: ToCB;
    application?: ResourceCB;
    details?: DetailsCB;
}

//Model for this API calls:
// https://api.coinbase.com/v2/accounts/:account_id/deposits
// https://api.coinbase.com/v2/accounts/:account_id/withdrawals
// https://api.coinbase.com/v2/accounts/:account_id/buys
// https://api.coinbase.com/v2/accounts/:account_id/sells
export interface MovementsCB {
    list: CurrencyMovementCB[];
}

export interface CurrencyMovementCB {
    id?: string;
    status?: string;
    transaction?: ResourceCB;
    userReference?: string;
    createdAt?: Date;
    updatedAt?: Date;
    resource?: string;
    resourcePath?: string;
    paymentMethod?: ResourceCB;
    committed?: boolean;
    payoutAt?: Date;
    instant?: boolean;
    fees?: FeeCB[];
    amount?: BalanceCB;
    subtotal?: BalanceCB;
    holdUntil?: string; //not sure about the type
    holdDays?: number;
    idem?: string;
    holdStep?: string; //not sure about the type
    feeExplanationUrl?: string;
}

//----------------------
export interface FeeCB {
    type?: string;
    amount?: BalanceCB
}

export interface ResourceCB {
    id?: string;
    resource?: string;
    resourcePath?: string;
}

export interface BalanceCB {
    amount?: number,
    currency?: number
}

export interface NetworkCB {
    status?: string;
    statusDescription?: string;
    hash?: string;
    transactionUrl?: string;
    transactionFee?: BalanceCB;
    transactionAmount?: BalanceCB;
    confirmations?: number;
}

export interface ToCB {
    resource?: string;
    address?: string;
    currency?: string;
    addressInfo?: AddressCB;
    addressUrl?: string;
}

export interface AddressCB {
    address?: string;
}

export interface DetailsCB {
    title?: string;
    subtitle?: string;
    header?: string;
    health?: string;
}
