
export interface PersonalInformation {
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

export interface PreferencesAccount {
    list: Array<Preference>;
}

export interface MyListAccount {
    list: Array<Title>;
}

export interface SearchHistory {
    list: Array<Search>;
}

export interface ViewingActivity {
    list: Array<Activity>;
}

export interface PlaybackEvents {
    list: Array<Event>;
}

export interface Profiles {
    list: Array<Profile>;
}
//----------------------------------
export interface Preference {
    profileName?: string;
    show?: string;
    hasWatched?: boolean;
    isInterested?: boolean;
    eventDate?: Date;
}

export interface Title {
    profileName?: string;
    titleName?: string;
    country?: string;
    titleAddDate?: Date;
}

export interface Search {
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

export interface Activity{
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

export interface Event {
    profileName?: string;
    titleDescription?: string;
    device?: string;
    playbackStartTime?: Date;
    country?: string;
    playtraces?: string;
}

export interface Profile {
    profileName?: string;
    emailAddress?: string;
    profileCreationTime?: Date;
    maturityLevel?: string;
    primaryLanguage?: string;
    hasAutoPlayback?: boolean;
    maxStreamQuality?: string;
    profileLockEnabled?: boolean;
}