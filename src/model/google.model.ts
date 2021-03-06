
export interface ProfileGO {
    givenName?: string;
    familyName?: string;
    formattedName?: string;
    displayName?: string;
    emails?: string[];
    birthdate?: Date;
    gender?: string;
}

export interface BrowserHistoryGO {
    list: Array<BrowserSearchGO>;
}

export interface SearchEnginesGO {
    list: Array<SearchEngineGO>;
}

export interface BrowserSearchGO {
    title?: string;
    url?: string;
    pageTransition?: string;
    faviconUrl?: string;
    clientId?: string;
    time?: Date;
}

export interface SearchEngineGO {
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

export interface ImageDataGO {
    title?: string;
    description?: string;
    imageViews?: number;
    creationTime?: Date;
    photoTakenTime?: Date;
    geoData?: GeoDataGO;
    geoDataExif?: GeoDataGO;
    url?: string;
    deviceType?: string;
    photoLastModifiedTime?: Date;
}

export interface GeoDataGO {
    latitude?: number;
    longitude?: number;
    altitude?: number;
    latitudeSpan?: number;
    longitudeSpan?: number;
}
export interface TransactionsGO {
    list: Array<TransactionGO>;
}

export interface TransactionGO {
    date?: Date;
    IDtransaction?: string;
    description?: string;
    productName?: string;
    paymentMethod?: string;
    state?: string;
    amount?: number;
    currency?: string;
}

export interface DocLibraryGO {
    list: Array<DocGO>;
}

export interface DocGO {
    type?: string;
    title?: string;
    acquisitionDate?: Date;
}

export interface PurchaseHistoryGO {
    list: Array<PurchaseGO>;
}

export interface PurchaseGO {
    invoicePrice?: string;
    paymentMethod?: string;
    userLanguageCode?: string;
    userCountry?: string;
    document?: DocGO;
}

export interface OrderHistoryGO {
    list: Array<OrderGO>;
}

export interface OrderGO {
    orderId?: string;
    creationTime?: Date;
    billingInstrument?: BillingInstrumentGO;
    billingContacts?: ContactGO;
    associatedContacts?: Array<ContactGO>;
    ipAddress?: string;
    ipCountry?: string;
    totalPrice?: number;
    tax?: number;
    refundAmount?: number;
    preorder?: boolean;
    lineItems?: Array<LineItemGO>;
}

export interface LineItemGO {
    doc?: DocGO;
    quantity?: number;
}

export interface ContactGO {
    name?: string;
    addressLine?: Array<string>;
    countryCode?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    phoneNumber?: number;
}

export interface BillingInstrumentGO {
    cardClass?: string;
    cardType?: string;
    expiration?: string;
    displayName?: string;
}


//POSITION HISTORY
export interface SemanticLocationsGO {
    listVisitedPlaces: Array<PlaceVisitedGO>;
    listActivities: Array<ActivitySegmentGO>;
}

export interface PlaceVisitedGO {
    location?: ProbableLocationGO;
    startDate?: Date;
    endDate?: Date;
    placeConfidence?: string;
    childVisits?: PlaceVisitedGO;
    centerLatE7?: number;
    centerLngE7?: number;
    visitConfidence?: number;
    otherProbableLocations?: Array<ProbableLocationGO>;
}

export interface ProbableLocationGO {
    latitudeE7?: number;
    longitudeE7?: number;
    placeId?: string;
    locationConfidence?: number;
    name?: string;
    address?: string;
    deviceTag?: number;
}

export interface ActivitySegmentGO {
    startLocation?: ProbableLocationGO;
    endLocation?: ProbableLocationGO;
    startDate?: Date;
    endDate?: Date;
    distance?: number;
    activityType?: ActivityTypeGO;
    confidence?: string;
    allActivitiesProbabilities?: Array<ProbableActivityGO>;
    transitPath?: TransitPathGO;
    simplifiedRawPath?: Array<PointGO>;
    editConfirmationStatus?: string;
}

export interface TransitPathGO {
    transitStops?: Array<ProbableLocationGO>;
    name?: string;
    hexRgbColor?: string
}

export interface ProbableActivityGO {
    activityType?: ActivityTypeGO;
    probability?: number;
}

export enum ActivityTypeGO {
    UNKNOWN_ACTIVITY_TYPE = 'UNKNOWN_ACTIVITY_TYPE',
    IN_PASSENGER_VEHICLE = 'IN_PASSENGER_VEHICLE',
    MOTORCYCLING = 'MOTORCYCLING',
    STILL = 'STILL',
    IN_BUS = 'IN_BUS',
    WALKING = 'WALKING',
    CYCLING = 'CYCLING',
    IN_TRAIN = 'IN_TRAIN',
    IN_SUBWAY = 'IN_SUBWAY',
    RUNNING = 'RUNNING',
    FLYING = 'FLYING',
    IN_FERRY = 'IN_FERRY',
    SAILING = 'SAILING',
    SKIING = 'SKIING',
    IN_TRAM = 'IN_TRAM',
    IN_VEHICLE = 'IN_VEHICLE'
}

export interface PointGO {
    latitudeE7?: number;
    longitudeE7?: number;
    date?: Date;
    accuracyMeters?: number;
}

//ACTIVITIES
export interface ShoppingActivitiesGO {
    list: Array<ShoppingActivityGO>;
}

export interface ShoppingActivityGO {
    product?: string;
    link?: string;
    date?: Date;
}

export interface DailyDiscoverActivitiesGO {
    list: Array<DailyDiscoverActivityGO>;
}

export interface DailyDiscoverActivityGO {
    searchKeys: Array<string>;
    date?: Date;
}

export interface SearchActivitiesGO {
    list: Array<SearchActivityGO>;
}

export interface SearchActivityGO {
    searchKey?: string;
    link?: string;
    date?: Date;
}

export interface YoutubeActivitiesGO {
    list: Array<YoutubeActivityGO>;
}

export interface YoutubeActivityGO {
    activity?: string;
    linkVideo?: string;
    titleVideo?: string;
    linkChannel?: string;
    nameChannel?: string;
    date?: Date;
}

export interface NewsActivitiesGO {
    list: Array<NewsActivityGO>;
}

export interface NewsActivityGO {
    titleArticle?: string;
    linkArticle?: string;
    date?: Date;
}

export interface AccountGO {
    id?: string;
    creationDate?: Date;
    contactEmail?: string;
    recoveryEmail?: string;
    recoverySMS?: string;
    recoverySMSCountryCode?: string;
}

export interface PlayStoreReviewsGO {
    list: PlayStoreReviewGO[];
}

export interface PlayStoreReviewGO {
    documentType?: string;
    title?: string;
    creationTime?: Date;
    starRating?: number;
    comment?: string;
    structuredReviewResponse?: Array<{
        question?: string;
        responseOptionType?: string;
    }>
}

export interface MapsReviewsGO {
    list: MapsReviewGO[];
}

export interface MapsReviewGO {
    type?: string;
    geoCoordinates?: GeoDataGO;
    googleMapsURL?: string;
    address?: string;
    businessName?: string;
    countryCode?: string;
    published?: Date;
    starRating?: number;
}
