/**
 * Aggregation of information from Twitter's models
 */
export interface TwitterDataAggregator {
    account?: AccountTW;
    creationDate?: Date;
}

//from FileCodeTwitter.ACCOUNT
export interface AccountTW {
    email?: string;
    createdVia?: string;
    username?: string;
    accountId?: string;
    createdAt?: Date;
    accountDisplayName?: string;
}
