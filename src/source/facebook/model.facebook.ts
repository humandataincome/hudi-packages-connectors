export interface FacebookDataAggregator {
    //from FileCodeFacebook.PROFILE_INFO model
    personalInfo?: PersonalInformationFB;
    //from FileCodeFacebook.LANGUAGE model
    languagesKnown?: Array<string>;
    //from FileCodeFacebook.ADS_INTERACTED_WITH model
    adsInteractedWith?: AdsInteractedWithFB;
    //from FileCodeFacebook.ADS_USING_YOUR_ACTIVITY model
    adsUsingYourInfo?: AdsUsingYourInfoFB;
    //from FileCodeFacebook.ADS_INTERESTS model
    adsInterests?: AdsInterestsFB;
    //from FileCodeFacebook.INFO_SUBMITTED_ADS model
    infoSubmittedToAds?: InformationSubmittedAdsFB;
    //from FileCodeFacebook.SEARCH_HISTORY model
    searchHistory?: SearchHistoryFB;
    //from FileCodeFacebook.COMMENTS model
    commentsPosted?: CommentsPostedFB;
    //from FileCodeFacebook.PAGES_LIKED model
    pagesLiked?: PagesLikedFB;
    //from FileCodeFacebook.PAGES_FOLLOWED model
    pagesFollowed?: PagesFollowFB;

    //from FileCodeFacebook.PAGES_RECOMMENDED model
    pagesRecommended?: PagesRecommendedFB;
    //from FileCodeFacebook.PAGES_UNFOLLOWED model
    pagesUnfollowed?: PagesUnfollowedFB;
    //from FileCodeFacebook.YOUR_POSTS model
    postsCreated?: YourPostsFB;

    //from FileCodeFacebook.YOUR_TOPICS model
    yourTopics?: YourTopicsFB;
    //from FileCodeFacebook.RECENTLY_VIEWED model
    recentlyViewed?: RecentlyViewedFB;
    //from FileCodeFacebook.RECENTLY_VISITED model
    recentlyVisited?: RecentlyVisitedFB;
    engagement?: EngagementFB;
    creationDate?: Date;
}

export interface EngagementFB {
    /**
     * Interval of Time in days
     * @default 365
     */
    timeInterval?: number;
    //from FileCodeFacebook.ADS_INTERACTED model
    adsInteractions?: number;
    adsInteractionsTI?: number;
    //from FileCodeFacebook.COMMENTS model
    commentsPosts?: number;
    commentsPostsTI?: number;
    //from FileCodeFacebook.YOUR_POSTS model
    postsCreated?: number;
    postsCreatedTI?: number;
    //from FileCodeFacebook.FRIENDS model
    friendsCounter?: number;
    //from FileCodeFacebook.FRIENDS_WHO_YOU_FOLLOW  model
    followingCounter?: number;
    //from FACEBOOK_REACTIONS model
    angryReactions?: number;
    hugReactions?: number;
    laughReactions?: number;
    likeReactions?: number;
    loveReactions?: number;
    sadReactions?: number;
    wowReactions?: number;
    angryReactionsTI?: number;
    hugReactionsTI?: number;
    laughReactionsTI?: number;
    likeReactionsTI?: number;
    loveReactionsTI?: number;
    sadReactionsTI?: number;
    wowReactionsTI?: number;
    //from FileCodeFacebook.PAGES_FOLLOWED model
    pagesFollowed?: number;
    pagesFollowedTI?: number;
    //from FileCodeFacebook.PAGES_LIKED model
    pagesLiked?: number;
    pagesLikedTI?: number;
    //from FileCodeFacebook.PAGES_RECOMMENDED model
    pagesRecommended?: number;
    pagesRecommendedTI?: number;
    //from FileCodeFacebook.RECENTLY_VIEWED model
    videoWatched?: number;
    videoWatchedTI?: number;
}

//FileCodeFacebook.PROFILE_INFO model
export interface PersonalInformationFB {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    emails?: string[];
    birthdate?: Date;
    gender?: string;
    currentCity?: string;
    homeTown?: string;
    relationship?: RelationshipFB;
    educationExperiences?: EducationExperienceFB[];
    workExperience?: WorkExperienceFB[];
    languages?: string[];
    gendersInterests?: string[];
    politicalView?: ViewFB;
    religiousView?: ViewFB;
    bloodInfo?: string;
    websites?: string[];
    address?: AddressLocationFB;
    phoneNumbers?: string[];
    placesLived?: PlaceLivedFB[];
    pagesInterests?: PagesFB[];
    registrationDate?: Date;
    profileUri?: string;
}

//FileCodeFacebook.LANGUAGE model
export interface LanguagesFB {
    settingsLanguage?: string;
    languagesKnown?: string[];
    favouriteLanguage?: string;
}

//FileCodeFacebook.ADS_INTERACTED_WITH model
export interface AdsInteractedWithFB {
    list: AdvInteractionFB[];
}

//FileCodeFacebook.ADS_USING_YOUR_ACTIVITY model
export interface AdsUsingYourInfoFB {
    list: AdvUsingYourInfoFB[];
}

//FileCodeFacebook.SEARCH_HISTORY model
export interface SearchHistoryFB {
    list: SearchFB[];
}

//FileCodeFacebook.COMMENTS model
export interface CommentsPostedFB {
    list: CommentPostedFB[];
}

//FileCodeFacebook.REACTIONS model
export interface ReactionsFB {
    list: ReactionFB[];
}

//FileCodeFacebook.PAGES_LIKED model
export interface PagesLikedFB {
    list: PageFB[];
}

//FileCodeFacebook.PAGES_FOLLOWED model
export interface PagesFollowFB {
    list: PageFB[];
}

//FileCodeFacebook.PAGES_RECOMMENDED model
export interface PagesRecommendedFB {
    list: PageFB[];
}

//FileCodeFacebook.PAGES_UNFOLLOWED model
export interface PagesUnfollowedFB {
    list: PageFB[];
}

//FileCodeFacebook.APP_WEBSITES model
 export interface AppsConnectedFB {
    list: AppConnectedFB[];
 }

export interface ConversationsFB {
    listInbox?: ConversationFB[];
}

//FileCodeFacebook.RECENTLY_VIEWED model
export interface RecentlyViewedFB {
    timeSpentOnPageVideos?: VisualizationFB[];
    videoWatched?: VisualizationFB[];
    timeSpentOnSingleVideo?: VisualizationFB[];
    postsShownInNewsLast90Days?: VisualizationFB[];
    peopleVisualizedWhenSuggested?: VisualizationFB[];
    marketplaceArticlesVisualized?: VisualizationFB[];
    insertionsVisualized?: VisualizationFB[];
}

//FileCodeFacebook.FRIENDS model
export interface FriendsFB {
    list: FriendActivityFB[];
}

//FileCodeFacebook.FRIENDS_REQUESTS_SENT model
export interface FriendRequestsSentFB {
    list: FriendActivityFB[];
}

//FileCodeFacebook.FRIENDS_REJECTED_REQUESTS model
export interface RejectedFriendshipRequestsFB {
    list: FriendActivityFB[];
}

//FileCodeFacebook.FRIENDS_REMOVED model
export interface RemovedFriendsFB {
    list: FriendActivityFB[];
}

//FileCodeFacebook.FRIENDS_WHO_YOU_FOLLOW model
export interface WhoYouFollowFB {
    list: FriendActivityFB[];
}

export interface FriendActivityFB {
    name?: string;
    date?: Date;
}

//FileCodeFacebook.YOUR_POSTS model
export interface YourPostsFB {
    list: YourPostFB[];
}

export interface YourPostFB {
    post?: string;
    title?: string;
    date?: Date;
}

export interface VisualizationFB {
    name?: string;
    uri?: string;
    watchTimeInSeconds?: number;
    date?: Date;

}

export interface AppConnectedFB {
    name?: string;
    userAppScopedId?: number;
    category?: string;
    addedTimestamp?: Date;
    removedTimestamp?: Date;
}

export interface PageFB {
    name?: string;
    date?: Date;
    url?: string;
}

export interface AdvInteractionFB {
    title?: string;
    action?: string;
    date?: Date;
}

export interface CommentPostedFB {
    text?: string;
    author?: string;
    title?: string;
    date?: Date;
}

export interface ReactionFB {
    title?: string;
    actor?: string;
    reaction?: string;
    date?: Date;
}

export interface AdvUsingYourInfoFB {
    advertiserName?: string;
    hasDataFileCustomAudience?: boolean;
    hasRemarketingCustomAudience?: boolean;
    hasInPersonStoreVisit?: boolean;
}

export interface RelationshipFB {
    status?: string,
    anniversary?: DateAlternativeFB,
    dateAdded?: Date
}
export interface AddressLocationFB {
    street?: string;
    city?: string;
    zipcode?: number;
    neighborhood?: string;
    country?: string;
    countryCode?: string;
    region?: string;
}

export interface EducationExperienceFB {
    name?: string;
    startDate?: Date;
    endDate?: Date;
    graduated?: boolean;
    description?: string;
    educationTopics?: string[];
    degree?: string;
    schoolType?: string;
}

export interface WorkExperienceFB {
    employer?: string;
    title?: string;
    location?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
}

export interface PlaceLivedFB {
    place?: string;
    startDate?: Date;
}

export interface PagesFB {
    category?: string;
    pages?: string[];
}

export interface ViewFB {
    name?: string;
    description?: string;
}

//FileCodeFacebook.MESSAGE_FILTERED and FileCodeFacebook.MESSAGE_CONVERSATION model
export interface ConversationFB {
    title?: string;
    listMessages?: MessageFB[];
    participants?: string[];
    isStillParticipant?: boolean;
}

export interface MessageFB {
    senderName?: string;
    content?: string;
    link?: string;
    type?: string;
    isUnsent?: boolean;
    date?: Date;
}

export interface DateAlternativeFB {
    year?:number,
    month?:number,
    day?:number
}

export interface SearchFB {
    text?: string;
    date?: Date;
}

//FileCodeFacebook.ADS_INTERESTS model
export interface YourTopicsFB {
    list: string[];
}

//FileCodeFacebook.YOUR_TOPICS model
export interface AdsInterestsFB {
    list: string[];
}

//FileCodeFacebook.INFO_SUBMITTED_ADS model
export interface InformationSubmittedAdsFB {
    list: InformationAdsFB[];
}

export interface InformationAdsFB {
    label?: string;
    value?: string;
}

//FileCodeFacebook.STORIES_REACTION model
export interface StoriesReactionsFB {
    list: StoryReactionFB[];
}

export interface StoryReactionFB {
    title?: string;
    date?: Date;
}

//FileCodeFacebook.RECENTLY_VISITED model
export interface RecentlyVisitedFB {
    list: VisitedListFB[];
}

export interface VisitedListFB {
    name?: string;
    list: VisitedFB[];
}

export interface VisitedFB {
    name?: string;
    uri?: string;
    date?: Date;
}
