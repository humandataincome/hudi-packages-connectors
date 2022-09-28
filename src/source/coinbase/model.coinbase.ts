export interface CoinbaseDataAggregator {
    user?: UserCB;
    creationDate?: Date;
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
        code: string,
        name: string,
        isInEurope: boolean
    };
    nationality?: {
        code: string,
        name: string
    };
    regionSupportsFiatTransfers?: boolean;
    regionSupportsCryptoToCryptoTransfers?: boolean;
    createdAt?: Date;
    supportsRewards?: boolean;
    hasBlockingBuyRestrictions?: boolean,
    hasMadePurchase?: boolean,
    hasBuyDepositPaymentMethods?: boolean,
    hasUnverifiedBuyDepositPaymentMethods?: boolean,
    needsKycRemediation?: boolean,
    showInstantAchUx?: boolean,
    userType?: string
    /*
    tiers: {
        completed_description: string,
        upgrade_button_text: string,
        header: any,
        body: any
    },
    referralMoney: {
        amount: string,
        currency: string,
        currency_symbol: string,
        referral_threshold: string
    },
    secondFactor: {
        method: string,
        totp: any,
        sms: any,
        authy: any,
        u2f: any
    },
     */
}

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

export interface BalanceCB {
    amount?: number,
    currency?: number
}

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
    application?: ApplicationCB;
    details?: DetailsCB;
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

export interface ApplicationCB {
    id?: string;
    resource?: string;
    resourcePath?: string;
}

export interface DetailsCB {
    title?: string;
    subtitle?: string;
    header?: string;
    health?: string;
}
