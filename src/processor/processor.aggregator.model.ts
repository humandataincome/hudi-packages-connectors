import {ActivityTypeGO} from "../model";

export interface InstagramDataAggregator {
    //from INSTAGRAM_ADS_CLICKED
    adsClick?: number;
    adsClickTI?: number;
    //from INSTAGRAM_ADS_VIEWED
    adsViewed?: number;
    adsViewedTI?: number;
    //from INSTAGRAM_POST_COMMENT
    commentsPosts?: number;
    commentsPostsTI?: number;
    //from INSTAGRAM_EMOJI_SLIDERS
    emojiSliders?: number;
    emojiSlidersTI?: number;
    //from INSTAGRAM_FOLLOWERS
    followers?: number;
    //from INSTAGRAM_FOLLOWING
    following?: number;
    //from INSTAGRAM_LIKE_COMMENTS
    likesComments?: number;
    likesCommentsTI?: number;
    //from INSTAGRAM_LIKE_POSTS
    likesPosts?: number;
    likesPostsTI?: number;
    //from INSTAGRAM_ELIGIBILITY
    isMonetizable?: boolean;
    //from INSTAGRAM_POLLS
    polls?: number;
    pollsTI?: number;
    //from INSTAGRAM_POSTS_CREATED
    postsCreated?: number;
    postsCreatedTI?: number;
    //from INSTAGRAM_POSTS_VIEWED
    postsViewed?: number;
    postsViewedTI?: number;
    //from INSTAGRAM_QUIZZES
    quizzes?: number;
    quizzesTI?: number;
    //from INSTAGRAM_STORIES_CREATED
    storiesCreated?: number;
    storiesCreatedTI?: number;
    //from INSTAGRAM_VIDEO_VIEWED
    videosViewed?: number;
    videosViewedTI?: number;
}

export interface FacebookDataAggregator {
    //from FACEBOOK_ADS_INTERACTED
    adsClick?: number;
    adsClickTI?: number;
    //from FACEBOOK_COMMENTS
    commentsPosts?: number;
    commentsPostsTI?: number;
    //from FACEBOOK_REACTIONS
    angryReactions?: number;
    hugReaction?: number;
    laughReactions?: number;
    likeReactions?: number;
    loveReactions?: number;
    sadReactions?: number;
    wowReactions?: number;
    //from FACEBOOK_LANGUAGE | FACEBOOK_PROFILE_INFO
    languages?: number;
    languagesList?: Array<string>;
    //from FACEBOOK_PAGES_FOLLOWED | FACEBOOK_PAGES_LIKED | FACEBOOK_PAGES_RECOMMENDED
    pages?: number;
    //from FACEBOOK_PROFILE_INFO
    mainPageCategory?: string;
    genderPreferences?: Array<string>;
    //from FACEBOOK_RECENTLY_VIEWED
    videosViewed?: number;
    videosViewedTI?: number;
    //from FACEBOOK_POSTS
    postsCreated?: number;
    postsCreatedTI?: number;
    //from FACEBOOK_FRIEND_REQUEST_SENT
    friends?: number;
}

export interface AmazonDataAggregator {
    //from AMAZON_ADV_AUDIENCES
    advAudiences?: number;
    //from AMAZON_ADV_CLICKS
    advClicks?: number;
    //from AMAZON_AUDIENCES
    amazonAudiences?: number;
    //from AMAZON_AUDIBLE_LISTENING
    audibleListening?: number;
    //from AMAZON_PRIMEVIDEO_VIEW_COUNT
    movies?: number;
    tvSeries?: number;
    rents?: number;
    //from AMAZON_RETAIL_ORDER_HISTORY
    orders?: number;
    ordersTI?: number;
    //???from AMAZON_RETAIL_ORDER_HISTORY (only from the most used currency)
    avgSpentTI?: number;
    //from AMAZON_ADV_THIRDPARTIES
    thirdPartyAudiences?: number;
    //from AMAZON_RETAIL_SELLER_FEEDBACK
    feedbacks?: number;
    //from AMAZON_RETAIL_LIGHT_WEIGHT_INTERACTIONS
    helpfulReviews?: number;
    //from AMAZON_DIGITAL_SUBSCRIPTION
    subscriptions?: number;
    primeSubscription?: boolean;
    audibleSubscription?: boolean;
    //from AMAZON_AUDIBLE_LIBRARY
    audibleListened?: number;
    //from AMAZON_RETAIL_REGION_AUTHORITY
    address?: string;
}

export interface GoogleDataAggregator {
    //from ACCOUNT_INFO
    email?: string;
    recoveryEmail?: string;
    recoveryNUmber?: number;
    creationAccount?: Date;
    //from all SEMANTIC_LOCATION_HISTORY
    mostFrequentActivityTypes?: Array<ActivityTypeGO>[3];
    averageDistancesForActivityType?: Array<number>[3];
    //from PLAY_STORE_REVIEWS
    counterPlayStoreReviewsTI?: number;
    averagePlayStoreReviewsTI?: number;
    //from MAPS_YOUR_PLACES_REVIEWS
    counterMapsReviewsTI?: number;
    averageMapsReviewsTI?: number;
}


