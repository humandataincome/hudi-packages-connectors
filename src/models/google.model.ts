
export interface Profile {
    givenName?: string;
    familyName?: string;
    formattedName?: string;
    displayName?: string;
    emails?: string[];
    birthdate?: Date;
    gender?: string;
}

export interface BrowserHistory {
    list: Array<BrowserSearch>;
}

export interface SearchEngines {
    list: Array<SearchEngine>;
}

export interface BrowserSearch {
    title?: string;
    url?: string;
    pageTransition?: string;
    faviconUrl?: string;
    clientId?: string;
    time?: Date;
}

export interface SearchEngine {
    suggestionsUrl?: string;
    faviconUrl?: string;
    safeForAutoreplace?: boolean;
    isActive?: string;
    dateCreated?: Date;
    url?: string;
    newTabUrl?: string;
    originatingUrl?: string;
    syncGuid?: string;
    shortName?: string;
    keyword?: string;
    inputEncodings?: string;
    prepopulateId?: number;
    lastModified?: Date;
}