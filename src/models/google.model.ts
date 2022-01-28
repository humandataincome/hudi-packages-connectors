
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

export interface DocLibrary {
    list: Array<Doc>;
}

export interface Doc {
    type?: string;
    title?: string;
    acquisitionDate?: Date;
}

export interface PurchaseHistory {
    list: Array<Purchase>;
}

export interface Purchase {
    invoicePrice?: string;
    paymentMethod?: string;
    userLanguageCode?: string;
    userCountry?: string;
    document?: Doc;
}

export interface OrderHistory {
    list: Array<Order>;
}

export interface Order {
    orderId?: string;
    creationTime?: Date;
    billingInstrument?: BillingInstrument;
    billingContacts?: Contact;
    associatedContacts?: Array<Contact>;
    ipAddress?: string;
    ipCountry?: string;
    totalPrice?: number;
    tax?: number;
    refundAmount?: number;
    preorder?: boolean;
    lineItems?: Array<LineItem>;
}

export interface LineItem {
    doc?: Doc;
    quantity?: number;
}

export interface Contact {
    name?: string;
    addressLine?: Array<string>;
    countryCode?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    phoneNumber?: number;
}

export interface BillingInstrument {
    cardClass?: string;
    cardType?: string;
    expiration?: string;
    displayName?: string;
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

//ACTIVITIES
export interface ShoppingActivities {
    list: Array<ShoppingActivity>;
}

export interface ShoppingActivity {
    product?: string;
    link?: string;
    date?: Date;
}

export interface DailyDiscoverActivities {
    list: Array<DailyDiscoverActivity>;
}

export interface DailyDiscoverActivity {
    searchKeys: Array<string>;
    date?: Date;
}

export interface SearchActivities {
    list: Array<SearchActivity>;
}

export interface SearchActivity {
    searchKey?: string;
    link?: string;
    date?: Date;
}

export interface YoutubeActivities {
    list: Array<YoutubeActivity>;
}

export interface YoutubeActivity {
    activity?: string;
    linkVideo?: string;
    titleVideo?: string;
    linkChannel?: string;
    nameChannel?: string;
    date?: Date;
}

export interface NewsActivities {
    list: Array<NewsActivity>;
}

export interface NewsActivity {
    titleArticle?: string;
    linkArticle?: string;
    date?: Date;
}