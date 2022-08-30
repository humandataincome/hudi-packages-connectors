/**
 * Aggregation of information from Instagram's models
 */
export interface InstagramDataAggregator {
    //from FileCodeInstagram.PERSONAL_INFO model
    username?: string;
    name?: string;
    email?: string;
    birthdate?: Date;
    phoneNumber?: string;
    gender?: string;
    //from FileCodeInstagram.ACCOUNT_NOT_INTERESTED model
    accountsNotInterestedIn?: AccountsYouAreNotInterestedIG;
    //from FileCodeInstagram.ADS_CLICKED model
    adsClicked?: AdsClickedIG;
    //from FileCodeInstagram.ADS_USING_YOUR_INFO model
    adsUsingYourInfo?: AdsUsingYourInformationIG;
    //from FileCodeInstagram.ADS_VIEWED model
    adsViewed?: AdsViewedIG;
    //from FileCodeInstagram.POSTS_VIEWED model
    postsViewed?: PostViewedIG;
    //from FileCodeInstagram.ACCOUNT_VIEWED model
    suggestedAccountsViewed?: SuggestedAccountsViewedIG;
    //from FileCodeInstagram.AUTOFILL_INFO model
    autofillInfo?: AutofillInformationIG;
    //from FileCodeInstagram.POST_COMMENT model
    commentsPosted?: CommentsPostedIG;
    //from FileCodeInstagram.FOLLOWING_HASHTAGS model
    followingHashtags?: FollowingHashtagsIG;
    //from FileCodeInstagram.INFO_ADS_INTERESTS model
    adsInterests?: AdsInterestsIG;
    //from FileCodeInstagram.INFO_ACCOUNT_BASED_IN model
    locations?: LocationInformationIG;
    //from FileCodeInstagram.ELIGIBILITY in model
    eligibility?: EligibilityIG;
    //from FileCodeInstagram.ACCOUNT_SEARCHES in model
    searches?: SearchesIG;
    //from FileCodeInstagram.YOUR_REEL_TOPICS model
    reelTopics?: ReelTopicsIG;
    //from FileCodeInstagram.YOUR_TOPICS model
    yourTopics?: YourTopicsIG;
    //from FileCodeInstagram.SHOPPING_VIEWED_ITEMS
    shoppingItemsViewed?: ShoppingViewedItemsIG;
    engagement: EngagementAggregatorIG;
    creationDate?: Date;
}

export interface EngagementAggregatorIG {
    /**
     * Interval of Time in days
     * @default 365
     */
    timeInterval?: number;
    //from FileCodeInstagram.ADS_CLICKED model
    adsClicked?: number;
    adsClickedTI?: number;
    //from FileCodeInstagram.ADS_VIEWED model
    adsViewed?: number;
    adsViewedTI?: number;
    //from FileCodeInstagram.POST_COMMENT model
    commentsPosted?: number;
    commentsPostedTI?: number;
    //from FileCodeInstagram.FOLLOWING_HASHTAGS model
    followingHashtagsCounter?: number;
    //from FileCodeInstagram.FOLLOWING_ACCOUNTS model
    followingCounter?: number;
    ////from FileCodeInstagram.FOLLOWERS model
    followersCounter?: number;
    //from FileCodeInstagram.EMOJI_SLIDERS model
    emojiSliders?: number;
    emojiSlidersTI?: number;
    //from FileCodeInstagram.LIKE_COMMENTS model
    likesComments?: number;
    likesCommentsTI?: number;
    //from FileCodeInstagram.LIKE_POSTS model
    likesPosts?: number;
    likesPostsTI?: number;
    //from FileCodeInstagram.POLLS model
    polls?: number;
    pollsTI?: number;
    //from FileCodeInstagram.POSTS_CREATED model
    postsCreated?: number;
    postsCreatedTI?: number;
    //from FileCodeInstagram.POSTS_VIEWED model
    postsViewed?: number;
    postsViewedTI?: number;
    //from FileCodeInstagram.QUIZZES model
    quizzes?: number;
    quizzesTI?: number;
    //from FileCodeInstagram.STORIES_CREATED model
    storiesCreated?: number;
    storiesCreatedTI?: number;
    //from FileCodeInstagram.VIDEO_VIEWED model
    videosViewed?: number;
    videosViewedTI?: number;
}

//FileCodeInstagram.PERSONAL_INFO model
export interface PersonalInformationIG {
    username?: string;
    name?: string;
    email?: string;
    private?: boolean;
    birthdate?: Date;
    phoneNumber?: string;
    biography? :string;
    gender?: string;
}

//FileCodeInstagram.ELIGIBILITY model
export interface EligibilityIG {
    value?: string;
    decision?: string;
    reason?: string;
}

//FileCodeInstagram.INFO_ACCOUNT_BASED_IN model
export interface LocationInformationIG {
    basedIn?:string;
}

//FileCodeInstagram.ADS_CLICKED model
export interface AdsClickedIG {
    list: AdvIG[];
}

//FileCodeInstagram.ADS_VIEWED model
export interface AdsViewedIG {
    list: AdvIG[];
}

export interface AdsInterestsIG {
    list: AdvIG[];
}

export interface MusicHeardInStoriesIG {
    list: MediaIG[];
}

export interface MusicRecentlyUsedInStoriesIG {
    list: MediaIG[];
}

/*
 *  if it's a post crated then date is the creation date
 *  if it's other people's post then date is the viewing date and uri doesn't exist
 */
export interface PostIG {
    uri?: string;
    title?: string;
    date?: Date;
}

//FileCodeInstagram.POSTS_VIEWED model
export interface PostViewedIG {
    list: PostIG[];
}

//FileCodeInstagram.POSTS_ARCHIVED model
export interface ArchivedPostsIG {
    list: PostIG[];
}

//FileCodeInstagram.POSTS_CREATED model
export interface PersonalPostsIG {
    list: PostIG[];
}

//FileCodeInstagram.VIDEO_VIEWED model
export interface VideoWatchedIG {
    list: MediaIG[];
}

export interface AccountIG {
    href?: string;
    name?: string;
    date?: Date;
}

//FileCodeInstagram.ACCOUNT_VIEWED model
export interface SuggestedAccountsViewedIG {
    list: AccountIG[];
}

//FileCodeInstagram.ACCOUNT_NOT_INTERESTED model
export interface AccountsYouAreNotInterestedIG {
    list: AccountIG[];
}

//FileCodeInstagram.FOLLOWERS model
export interface FollowersIG {
    list: AccountIG[];
}

//FileCodeInstagram.FOLLOWING_ACCOUNTS model
export interface FollowingAccountsIG {
    list: AccountIG[];
}

//FileCodeInstagram.FOLLOWING_HASHTAGS model
export interface FollowingHashtagsIG {
    list: AccountIG[];
}

//FileCodeInstagram.POST_COMMENT model
export interface CommentsPostedIG {
    list: CommentPostedIG[];
}

//FileCodeInstagram.SYNCED_CONTACTS model
export interface SyncedContractsIG {
    list: ContactSyncedIG[];
}

//FileCodeInstagram.STORIES_CREATED model
export interface PersonalStoriesIG {
    list: StoryIG[];
}

//FileCodeInstagram.LIKE_POSTS model
export interface LikedPostsIG {
    list: LikeIG[];
}

//FileCodeInstagram.LIKE_COMMENTS model
export interface LikedCommentsIG {
    list: LikeIG[];
}

//FileCodeInstagram.ACCOUNT_SEARCHES model
export interface SearchesIG {
    list: SearchIG[];
}

//FileCodeInstagram.YOUR_REEL_SENTIMENTS model
export interface ReelSentimentsIG {
    list: SentimentIG[];
}

//FileCodeInstagram.YOUR_REEL_TOPICS model
export interface ReelTopicsIG {
    list: TopicIG[];
}

//FileCodeInstagram.YOUR_TOPICS model
export interface YourTopicsIG {
    list: TopicIG[];
}

//FileCodeInstagram.EMOJI_SLIDERS model
export interface EmojiSlidersIG {
    list: EmojiSliderIG[];
}

//FileCodeInstagram.POLLS model
export interface PollsIG {
    list: PollIG[];
}

//from FileCodeInstagram.QUIZZES model
export interface QuizzesIG {
    list: QuizIG[];
}

//FileCodeInstagram.MESSAGE_REQUESTS and FileCodeInstagram.MESSAGE_CONVERSATION models
export interface ConversationsIG {
    listInbox?: ConversationIG[];
}

export interface StoryIG {
    uri?: string;
    title?: string;
    date?: Date;
}

export interface ContactSyncedIG {
    firstName?: string;
    secondName?: string;
    contactInfo?: string;
}

export interface CommentPostedIG {
    text?: string;
    toUser?: string;
    date?: Date;
}

export interface LikeIG {
    title?: string;
    href?: string;
    emoticon?: string;
    date?: Date;
}

export interface SearchIG {
    text?: string;
    date?: Date;
}

export interface ConversationIG {
    title?: string;
    listMessages?: MessageIG[];
    participants?: string[];
    isStillParticipant?: boolean;
}

export interface MessageIG {
    senderName?: string;
    date?: Date;
    content?: string;
    link?: string;
    type?: string;
    isUnsent?: boolean;
}

//Song or Video
export interface MediaIG {
    title?: string;
    artist?: string;
    date?: Date;
}

export interface AdvIG {
    title?: string;
    date?: Date;
}

export interface TopicIG {
    value?: string;
}

export interface EmojiSliderIG {
    title?: string;
    date?: Date;
}

export interface PollIG {
    title?: string;
    date?: Date;
}

export interface QuizIG {
    title?: string;
    date?: Date;
}

export interface SentimentIG {
    value?: string;
}

//FileCodeInstagram.ADS_USING_YOUR_INFO model
export interface AdsUsingYourInformationIG {
    list: AdvUsingYourInformationIG[];
}

export interface AdvUsingYourInformationIG {
    advertiserName?: string;
    hasDataFileCustomAudience?: boolean;
    hasRemarketingCustomAudience?: boolean;
    hasInPersonStoreVisit?: boolean;
}

//FileCodeInstagram.SHOPPING_VIEWED_ITEMS model
export interface ShoppingViewedItemsIG {
    list: ShoppingViewedItemIG[];
}

export interface ShoppingViewedItemIG {
    productID?: string;
    productName?: string;
    handlerID?: string;
    handlerName?: string;
}

//FileCodeInstagram.AUTOFILL_INFO model
export interface AutofillInformationIG {
    tel?: string;
    telCountryCode?: string;
    telNational?: string;
    telAreaCode?: string;
    telLocal?: string;
    telLocalPrefix?: string;
    telLocalSuffix?: string;
    streetAddress?: string;
    streetLine1?: string;
    streetLine2?: string;
    streetLine3?: string;
    streetLevel1?: string;
    streetLevel2?: string;
    streetLevel3?: string;
    streetLevel4?: string;
    country?: string;
    countryName?: string;
    postalCode?: string;
    email?: string;
    familyName?: string;
    givenName?: string;
}
