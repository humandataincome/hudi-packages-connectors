/**
 * Aggregation of information from Reddit's models
 */
export interface RedditDataAggregator {
    subreddits?: SubscribedSubredditRE;
    comments?: CommentsRE;
    friends?: FriendsRE;
    messages?: MessagesRE;
    posts?: PostsRE;
    goldInfo?: GoldInfoRE;
    statistics?: StatisticsRE;
    creationDate?: Date;
}

//model FileCodeReddit.STATISTICS
export interface StatisticsRE {
    accountName?: string;
    exportDate?: Date;
    isDeleted?: boolean;
    registrationDate?: Date;
    emailVerified?: boolean;
    emailAddress?: string;
}

//model FileCodeReddit.REDDIT_GOLD_INFO
export interface GoldInfoRE {
    list: GoldInfoEntryRE[];
}

export interface GoldInfoEntryRE {
    processor?: string;
    transactionID?: string;
    date?: Date;
    cost?: string;
    payerEmail?: string;
}

//model FileCodeReddit.POSTS
export interface PostsRE {
    list: PostRE[];
}

export interface PostRE {
    id?: string;
    permalink?: string;
    date?: Date;
    ip?: string;
    subreddit?: string;
    gildings?: string;
    title?: string;
    url?: string;
    body?: string;
}

//model FileCodeReddit.MESSAGES
export interface MessagesRE {
    list: MessageRE[];
}

export interface MessageRE {
    id?: string;
    permalink?: string;
    threadId?: string;
    date?: Date;
    ip?: string;
    from?: string;
    to?: string;
    subject?: string;
    body?: string;
}

//model FileCodeReddit.FRIENDS
export interface FriendsRE {
    list: FriendRE[];
}

export interface FriendRE {
    username?: string;
    note?: string;
}

//model FileCodeReddit.COMMENTS
export interface CommentsRE {
    list: CommentRE[];
}

export interface CommentRE {
    id?: string;
    permalink?: string;
    date?: Date;
    ip?: string;
    subreddit?: string;
    gildings?: string;
    link?: string;
    parent?: string;
    body?: string;
}

//model FileCodeReddit.SUBSCRIBED_SUBREDDITS
export interface SubscribedSubredditRE {
    list: string[];
}
