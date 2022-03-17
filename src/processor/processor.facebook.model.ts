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
    //from FACEBOOK_PAGES_FOLLOWED | FACEBOOK_PAGES_LIKED | FACEBOOK_PAGES_RACCOMENDED
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
