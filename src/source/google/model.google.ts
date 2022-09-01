export interface GoogleDataAggregator {
    //from FileCodeGoogle.PROFILE model
    profile?: ProfileGO;
    //FileCodeGoogle.LOCATION_HISTORY_SEMANTIC model
    locationsHistory?: SemanticLocationsGO;
    //from FileCodeGoogle.PAY_TRANSACTIONS model
    transactions?: TransactionsGO;
    //from FileCodeGoogle.MAPS_YOUR_PLACES_REVIEWS model
    mapReviews?: MapsReviewsGO;
    chrome: ChromeAggregatorGO;
    playStore: PlayStoreAggregatorGO;
    youtube: YouTubeAggregatorGO;
    fit: FitAggregatorGO;
    activities: ActivityAggregatorGO;
    creationDate?: Date;
}

export interface YouTubeAggregatorGO {
    //from FileCodeGoogle.YOUTUBE_LIKED_VIDEOS model
    videoLiked?: YoutubePlaylistsGO;
    //from FileCodeGoogle.YOUTUBE_PLAYLIST_UPLOADS model
    videoUploaded?: YoutubePlaylistsGO;
}

export interface PlayStoreAggregatorGO {
    //from FileCodeGoogle.PLAY_STORE_LIBRARY model
    docLibrary?: DocLibraryGO;
    //from FileCodeGoogle.PLAY_STORE_PURCHASE_HISTORY model
    purchaseHistory?: PurchaseHistoryGO;
    //from FileCodeGoogle.PLAY_STORE_ORDER_HISTORY model
    orderHistory?: OrderHistoryGO;
    //from FileCodeGoogle.PLAY_STORE_REVIEWS model
    reviews?: PlayStoreReviewsGO;
}

export interface ChromeAggregatorGO {
    //from FileCodeGoogle.CHROME_BROWSER_HISTORY model
    browserHistory?: BrowserHistoryGO;
}

export interface FitAggregatorGO{
    //from FileCodeGoogle.FIT_DAILY_ACTIVITIES_METRICS model
    dailyActivityMetrics?: DailyActivityMetricsGO;
}

export interface ActivityAggregatorGO {
    //from FileCodeGoogle.ACTIVITY_NEWS model
    news?: ActivitiesGO;
    //from FileCodeGoogle.ACTIVITY_BOOKS model
    books?: ActivitiesGO;
    //from FileCodeGoogle.ACTIVITY_IMAGE_SEARCH model
    imageSearch?: ActivitiesGO;
    //from FileCodeGoogle.ACTIVITY_SHOPPING model
    shopping?: ActivitiesGO;
    //from FileCodeGoogle.ACTIVITY_DISCOVER model
    discovery?: ActivitiesGO;
    //from FileCodeGoogle.ACTIVITY_PLAY_GAMES model
    playStoreGames?: ActivitiesGO;
    //from FileCodeGoogle.ACTIVITY_PLAY_MOVIES model
    playStoreMovies?: ActivitiesGO;
}

//FileCodeGoogle.PROFILE model
export interface ProfileGO {
    givenName?: string;
    familyName?: string;
    formattedName?: string;
    displayName?: string;
    emails?: string[];
    birthdate?: Date;
    gender?: string;
}

//FileCodeGoogle.CHROME_BROWSER_HISTORY model
export interface BrowserHistoryGO {
    list: BrowserSearchGO[];
}

export interface BrowserSearchGO {
    title?: string;
    url?: string;
    pageTransition?: PageTransitionSearchGO;
    faviconUrl?: string;
    clientId?: string;
    time?: Date;
}

export enum PageTransitionSearchGO {
    RELOAD = 'RELOAD',
    LINK = 'LINK',
    TYPED = 'TYPED',
    GENERATED = 'GENERATED',
    FORM_SUBMIT = 'FORM_SUBMIT',
    AUTO_TOPLEVEL = 'AUTO_TOPLEVEL',
    AUTO_BOOKMARK = 'AUTO_BOOKMARK',
}

//FileCodeGoogle.CHROME_SEARCH_ENGINES model
export interface SearchEnginesGO {
    list: SearchEngineGO[];
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

//FileCodeGoogle.PHOTO_JSON model
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

//FileCodeGoogle.PAY_TRANSACTIONS model
export interface TransactionsGO {
    list: TransactionGO[];
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

//FileCodeGoogle.PLAY_STORE_LIBRARY model
export interface DocLibraryGO {
    list: DocGO[];
}

export interface DocGO {
    type?: string;
    title?: string;
    acquisitionDate?: Date;
}

//FileCodeGoogle.PLAY_STORE_PURCHASE_HISTORY model
export interface PurchaseHistoryGO {
    list: PurchaseGO[];
}

export interface PurchaseGO {
    invoicePrice?: string;
    paymentMethod?: string;
    userLanguageCode?: string;
    userCountry?: string;
    document?: DocGO;
}

//FileCodeGoogle.PLAY_STORE_ORDER_HISTORY model
export interface OrderHistoryGO {
    list: OrderGO[];
}

export interface OrderGO {
    orderId?: string;
    creationTime?: Date;
    billingInstrument?: BillingInstrumentGO;
    billingContacts?: ContactGO;
    associatedContacts?: ContactGO[];
    ipAddress?: string;
    ipCountry?: string;
    totalPrice?: number;
    tax?: number;
    refundAmount?: number;
    preorder?: boolean;
    lineItems?: LineItemGO[];
}

export interface LineItemGO {
    doc?: DocGO;
    quantity?: number;
}

export interface ContactGO {
    name?: string;
    addressLine?: string[];
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


//FileCodeGoogle.LOCATION_HISTORY_SEMANTIC model
export interface SemanticLocationsGO {
    listVisitedPlaces: PlaceVisitedGO[];
    listActivities: ActivitySegmentGO[];
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
    otherProbableLocations?: ProbableLocationGO[];
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
    allActivitiesProbabilities?: ProbableActivityGO[];
    transitPath?: TransitPathGO;
    simplifiedRawPath?: PointGO[];
    editConfirmationStatus?: string;
}

export interface TransitPathGO {
    transitStops?: ProbableLocationGO[];
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

//FileCodeGoogle.YOUTUBE_LIKED_VIDEOS and FileCodeGoogle.YOUTUBE_PLAYLIST_UPLOADS model
export interface YoutubePlaylistsGO {
    playlists: YoutubePlaylistGO[];
}

export interface YoutubePlaylistGO {
    playlistID?: string;
    channelID?: string;
    creationDate?: Date;
    uploadDate?: Date;
    title?: string;
    description?: string;
    visibility?: string;
    list: YoutubeVideoGO[];
}

export interface YoutubeVideoGO {
    videoID?: string;
    date?: Date;
}

//FileCodeGoogle.ACCOUNT_INFO model
export interface AccountGO {
    id?: string;
    creationDate?: Date;
    contactEmail?: string;
    recoveryEmail?: string;
    recoverySMS?: string;
    recoverySMSCountryCode?: string;
}

//FileCodeGoogle.PLAY_STORE_REVIEWS model
export interface PlayStoreReviewsGO {
    list: PlayStoreReviewGO[];
}

export interface PlayStoreReviewGO {
    documentType?: string;
    title?: string;
    creationTime?: Date;
    starRating?: number;
    comment?: string;
    structuredReviewResponse?: {
        question?: string;
        responseOptionType?: string;
    }[]
}

//FileCodeGoogle.MAPS_YOUR_PLACES_REVIEWS model
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

//FileCodeGoogle.FIT_DAILY_ACTIVITIES_METRICS model
export interface DailyActivityMetricsGO {
    list: DailyActivityMetricGO[];
}

export interface DailyActivityMetricGO {
    date?: Date;
    moveMinutesCount?: number;
    //Calories as (kcal)
    calories?: number;
    //Distance as (m)
    distance?: number;
    heartPoints?: number;
    heartMinutes?: number;
    //Latitudes as (deg)
    lowLatitude?: number;
    lowLongitude?: number;
    highLatitude?: number;
    highLongitude?: number;
    //Speeds as (m/s)
    averageSpeed?: number;
    maxSpeed?: number;
    minSpeed?: number;
    stepCount?: number;
    //Weight as (kg)
    averageWeight?: number;
    maxWeight?: number;
    minWeight?: number;
    //Duration (ms)
    inactiveDuration?: number;
    walkingDuration?: number;
    runningDuration?: number;
    calisthenicsDuration?: number;
}

//all FileCodeGoogle.ACTIVITY_ models
export interface ActivitiesGO {
    list: ActivityGO[];
}

export interface ActivityGO {
    header?: string;
    title?: string;
    titleUrl?: string;
    date?: Date;
    products?: string[];
    activityControls?: string[];
    subtitles?: SubtitleActivityGO[]
    details?: DetailActivityGO[]
    locationInfos?: LocationActivityGO[]
}

export interface SubtitleActivityGO {
    name?: string;
    url?: string;
}

export interface DetailActivityGO {
    name?: string;
}

export interface LocationActivityGO {
    name?: string;
    url?: string;
    source?: string;
    sourceUrl?: string;
}


