export interface PersonalInformationFB {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    emails?: Array<string>;
    birthdate?: Date;
    gender?: string;
    currentCity?: string;
    homeTown?: string;
    relationship?: RelationshipFB;
    educationExperiences?: Array<EducationExperienceFB>;
    workExperience?: Array<WorkExperienceFB>;
    languages?: Array<string>;
    gendersInterests?: Array<string>;
    politicalView?: ViewFB;
    religiousView?: ViewFB;
    bloodInfo?: string;
    websites?: Array<string>;
    address?: AddressLocationFB;
    phoneNumbers?: Array<string>;
    placesLived?: Array<PlaceLivedFB>;
    pagesInterests?: Array<PagesFB>;
    registrationDate?: Date;
    profileUri?: string;
}
export interface LanguagesFB {
    settingsLanguage?: string;
    languagesKnown?: Array<string>;
    favouriteLanguage?: string;
}

export interface AdsInteractedWithFB {
    list: Array<AdvInteractionFB>;
}

export interface AdsUsingYourInfoFB {
    list: Array<AdvUsingYourInfoFB>;
}

export interface SearchHistoryFB {
    listSearches: Array<SearchFB>;
}

export interface CommentsPostedFB {
    list: Array<CommentPostedFB>;
}

export interface ReactionsFB {
    list: Array<ReactionFB>;
}

export interface PagesLikedFB {
    list: Array<PageFB>;
}

export interface PagesFollowFB {
    list: Array<PageFB>;
}

export interface PagesRecommendedFB {
    list: Array<PageFB>;
}

 export interface AppsConnectedFB {
    list: Array<AppConnectedFB>;
 }

export interface ConversationsFB {
    listInbox?: Array<ConversationFB>;
}

export interface RecentlyViewedFB {
    timeSpentOnPageVideos?: Array<VisualizationFB>;
    videoWatched?: Array<VisualizationFB>;
    timeSpentOnSingleVideo?: Array<VisualizationFB>;
    postsShownInNewsLast90Days?: Array<VisualizationFB>;
    peopleVisualizedWhenSuggested?: Array<VisualizationFB>;
    marketplaceArticlesVisualized?: Array<VisualizationFB>;
    insertionsVisualized?: Array<VisualizationFB>;
    //marketplaceSearchesDays?: Array<VisualizationFB>;
    //marketplaceVendorsContactedDays?: Array<VisualizationFB>;
    //marketplaceArticleDetailsVisualizedDays?: Array<VisualizationFB>;
    //marketplaceYourTabVisualizationDays?: Array<VisualizationFB>;
}

export interface YourPostsFB {
    list: Array<YourPostFB>;
}

export interface YourPostFB {
    title?: string;
    post?: string;
    url?: string;
    date?: Date;
    updateDate?: Date;
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
    educationTopics?: Array<string>;
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
    pages?: Array<string>;
}

export interface ViewFB {
    name?: string;
    description?: string;
}

export interface ConversationFB {
    title?: string;
    listMessages?: Array<MessageFB>;
    participants?: Array<string>;
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
