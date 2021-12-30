
export interface SearchDataCustomerEngagement {
    list: Array<Search>;
}

export interface Search {
    firstSearchTime?: Date;
    countryID?: number;
    APSorCategory?:string;
    siteVariant?:string;
    appOrBrowser?:string;
    deviceModel?:string;
    searchType?:string;
    sessionID?:string;
    queryID?:string;
    primeCustomer?:boolean;
    isFromExternalLink?:boolean;
    searchFromExternalSite?:boolean;
    firstSearchQuery?:string;
    applicationName?:string;
    appVersion?:string;
    operatingSystemName?:string;
    operatingSystemVersion?:string;
    deviceTypeID?:string;
    deviceCategory?:string;
    customerIP?:string;
    searchMethod?:string;
    keywords?:string;
    isBusinessCustomer?:boolean;
    language?:string;
    server?:string;
    isFreshCustomer?:boolean;
    isMusicSubscriber?:boolean;
    firstBrowserNode?:string;
    lastSearchTime?:Date;
    lastDepartment?:string;
    lastBrowseNode?:string;
    lastKnownCustomerID?:string;
    firstAddedItem?:string;
    firstPurchasedItem?:string;
    firstConsumedItem?:string;
    numberClickedItem?:string;
    numberItemsAddedCart?:string;
    numberItemsOrdered?:string;
    numberPaidItemsOrdered?:string;
    numberFreeItemsOrdered?:string;
    unitsOrdered?:string;
    paidUnitsOrdered?:string;
    freeUnitsOrdered?:string;
    maximumPurchasePrice?:string;
    clickedAnyItem?:boolean;
    addedAnyItem?:boolean;
    purchasedAnyItem?:boolean;
    departmentCount?:string;
    shoppingRefinement?:string;
    numberShoppingRefinements?:string;
    highestNumberShoppingRefinements?:string;
    itemConsumed?:string;
    shoppingRefinementPickers?:string;
    paidPurchase?:boolean;
    isItemBorrowed?:boolean;
    itemsBorrowed?:string;
    nextQueryGroupViaClick?:string;
    queryAbandoned?:boolean;
    queryReformulated?:boolean;
    amazonFresh?:boolean;
    storeVisited?:string;
    department?:string;
    browserNode?:string;
    firstSearchDomain?:string;
    isFirstSearchFromExternalAd?:boolean;
    userAgentInfoFamily?:string;
    LKCI?:string;
}

export interface AdvertiserAudiences {
    list: Array<string>;
}

export interface AdvertiserClicked {
    list: Array<string>;
}

//AUDIBLE MODELS
export interface AudibleLibrary {
    listAudioBooks?: Array<AudioBook>;
}

export interface AudioBook {
    DateAdded?:string;
    Title?:string;
    Asin?:string;
    IsDownloaded?:string;
    IsDeleted?:string;
    DeleteBy?:string;
    DateDeleted?:string;
    IsPublic?:string;
    IsStreamed?:string;
    IsPreorder?:string;
    Downloads?:string;
    DateFirstDownloaded?:string;
    OrderNumber?:string;
    OriginType?:string;
 }

//PRIME VIDEO MODELS
export interface PrimeVideoWatchlist {
    list: Array<Title>;
}

export interface PrimeVideoWatchlistHistory {
    list: Array<Title>;
}

export interface PrimeVideoViewingHistory {
    list: Array<ViewingActivity>;
}

export interface Title {
    listId?: string;
    itemAddedDate?: Date;
    itemType?: string;
    deleted?: boolean;
    catalogTitle?: string;
}

export interface ViewingActivity {
    playbackHour?: Date;
    operatingSystem?: string;
    browser?: string;
    deliveryType?: string;
    city?: string;
    country?: string;
    ISP?: string;
    state?: string;
    contentQuality?: string;
    entitlementType?: string;
    videoType?: string;
    audioLanguage?: string;
    title?: string;
}


