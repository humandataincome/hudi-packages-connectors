/**
 * Aggregation of information from Netflix's models
 */
export interface NetflixDataAggregator {
    //from FileCodeNetflix.ACCOUNT_DETAILS model
    accountInfo?: PersonalInformationNF;
    //from FileCodeNetflix.PROFILES model
    profiles?: ProfilesNF;
    //from FileCodeNetflix.CONTENT_INTERACTION_PREFERENCES model
    preferences?: PreferencesAccountNF;
    //from FileCodeNetflix.CONTENT_INTERACTION_MY_LIST model
    titles?: MyListAccountNF;
    //from FileCodeNetflix.CONTENT_INTERACTION_SEARCH_HISTORY model
    searches?: SearchHistoryNF;
    //from FileCodeNetflix.CONTENT_INTERACTION_VIEWING_ACTIVITY model
    viewingActivity?: ViewingActivityNF;
    creationDate?: Date;
}

//FileCodeNetflix.ACCOUNT_DETAILS model
export interface PersonalInformationNF {
    firstName?: string;
    lastName?: string;
    emailAddress?: string;
    phoneNumber?: string;
    countryRegistration?: string;
    countrySignup?: string;
    primaryLang?: string;
    cookieDisclosure?: boolean;
    membershipStatus?: string;
    creationTime?: Date;
    hasRejoined?: boolean;
    netflixUpdates?: boolean;
    nowOnNetflix?: boolean;
    netflixOffers?: boolean;
    netflixSurveys?: boolean;
    netflixKidsFamily?: boolean;
    smsAccountRelated?: boolean;
    smsContentUpdates?: boolean;
    testParticipation?: boolean;
    whatsApp?: boolean;
    marketingCommunications?: boolean;
}

//FileCodeNetflix.CONTENT_INTERACTION_PREFERENCES model
export interface PreferencesAccountNF {
    list: PreferenceNF[];
}

//FileCodeNetflix.CONTENT_INTERACTION_MY_LIST model
export interface MyListAccountNF {
    list: TitleNF[];
}

//FileCodeNetflix.CONTENT_INTERACTION_SEARCH_HISTORY model
export interface SearchHistoryNF {
    list: SearchNF[];
}

//FileCodeNetflix.CONTENT_INTERACTION_VIEWING_ACTIVITY model
export interface ViewingActivityNF {
    list: ActivityNF[];
}

//FileCodeNetflix.CONTENT_INTERACTION_PLAYBACK_EVENTS model
export interface PlaybackEventsNF {
    list: EventNF[];
}

//FileCodeNetflix.PROFILES model
export interface ProfilesNF {
    list: ProfileNF[];
}

export interface PreferenceNF {
    profileName?: string;
    show?: string;
    hasWatched?: boolean;
    isInterested?: boolean;
    eventDate?: Date;
}

export interface TitleNF {
    profileName?: string;
    titleName?: string;
    country?: string;
    titleAddDate?: Date;
}

export interface SearchNF {
    profileName?: string;
    countryIsoCode?: string;
    device?: string;
    isKids?: boolean;
    queryTyped?: string;
    displayedName?: string;
    action?: string;
    section?: string;
    time?: Date;
}

export interface ActivityNF {
    profileName?: string;
    startTime?: Date;
    duration?: string;
    attributes?: string;
    title?: string;
    videoType?: string;
    deviceType?: string;
    bookmark?: string;
    latestBookmark?: string;
    country?: string;
}

export interface EventNF {
    profileName?: string;
    titleDescription?: string;
    device?: string;
    playbackStartTime?: Date;
    country?: string;
    playtraces?: PlaytracesNF;
}

export interface PlaytracesNF {
    list: PlaytraceNF[];
}

export interface PlaytraceNF {
    eventType?: string;
    sessionOffsetMs?: number;
    mediaOffsetMs?: number;
}

export interface ProfileNF {
    profileName?: string;
    emailAddress?: string;
    profileCreationTime?: Date;
    maturityLevel?: string;
    primaryLanguage?: string;
    hasAutoPlayback?: boolean;
    maxStreamQuality?: string;
    profileLockEnabled?: boolean;
}
