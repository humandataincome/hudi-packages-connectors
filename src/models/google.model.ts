
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

export interface ImageData {
    title?: string;
    description?: string;
    imageViews?: number;
    creationTime?: Date;
    photoTakenTime?: Date;
    geoData?: GeoData;
    geoDataExif?: GeoData;
    url?: string;
    deviceType?: string;
    photoLastModifiedTime?: Date;
}

export interface GeoData {
    latitude?: number;
    longitude?: number;
    altitude?: number;
    latitudeSpan?: number;
    longitudeSpan?: number;
}
export interface Transactions {
    list: Array<Transaction>;
}

export interface Transaction {
    date?: Date;
    IDtransaction?: string;
    description?: string;
    productName?: string;
    paymentMethod?: string;
    state?: string;
    amount?: number;
    currency?: string;
}

//POSITION HISTORY
export interface SemanticLocations {
    listVisitedPlaces: Array<PlaceVisited>;
    listActivities: Array<ActivitySegment>;
}

export interface PlaceVisited {
    location?: ProbableLocation;
    startDate?: Date;
    endDate?: Date;
    placeConfidence?: string;
    childVisits?: PlaceVisited;
    centerLatE7?: number;
    centerLngE7?: number;
    visitConfidence?: number;
    otherProbableLocations?: Array<ProbableLocation>;
}

export interface ProbableLocation {
    latitudeE7?: number;
    longitudeE7?: number;
    placeId?: string;
    locationConfidence?: number;
    name?: string;
    address?: string;
    deviceTag?: number;
}

export interface ActivitySegment {
    startLocation?: ProbableLocation;
    endLocation?: ProbableLocation;
    startDate?: Date;
    endDate?: Date;
    distance?: number;
    activityType?: string;
    confidence?: string;
    allActivitiesProbabilities?: Array<ProbableActivity>;
    transitPath?: TransitPath;
    simplifiedRawPath?: Array<Point>;
    editConfirmationStatus?: string;
}

export interface TransitPath {
    transitStops?: Array<ProbableLocation>;
    name?: string;
    hexRgbColor?: string
}

export interface ProbableActivity {
    activityType?: string;
    probability?: number;
}

export interface Point {
    latitudeE7?: number;
    longitudeE7?: number;
    date?: Date;
    accuracyMeters?: number;
}

//PLAY STORE
export interface DocLibrary {
    list: Array<Doc>;
}

export interface Doc {
    type?: string;
    title?: string;
    acquisitionDate?: Date;
}