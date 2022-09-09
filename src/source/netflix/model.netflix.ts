/**
 * Aggregation of information from Netflix's models
 */
export interface NetflixDataAggregator {
    accountInfo?: PersonalInformationNF;
    profiles?: ProfilesNF;
    preferences?: PreferencesAccountNF;
    titles?: MyListAccountNF;
    searches?: SearchHistoryNF;
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
    list: Array<PreferenceNF>;
}

//FileCodeNetflix.CONTENT_INTERACTION_MY_LIST model
export interface MyListAccountNF {
    list: Array<TitleNF>;
}

//FileCodeNetflix.ACCOUNT_DETAILS model
export interface SearchHistoryNF {
    list: Array<SearchNF>;
}

//FileCodeNetflix.ACCOUNT_DETAILS model
export interface ViewingActivityNF {
    list: Array<ActivityNF>;
}

//FileCodeNetflix.ACCOUNT_DETAILS model
export interface PlaybackEventsNF {
    list: Array<EventNF>;
}

//FileCodeNetflix.ACCOUNT_DETAILS model
export interface ProfilesNF {
    list: Array<ProfileNF>;
}
//----------------------------------
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
    list: Array<PlaytraceNF>;
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
