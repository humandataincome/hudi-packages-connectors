
export interface SearchDataCustomerEngagement {
    list: Array<Search>;
}

export interface Search {
    firstSearchTime?: Date;
    countryID?: string;
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
    firstBrowseNode?:string;
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
    list: Array<ADV>;
}

export interface AdvertiserClicked {
    list: Array<ADV>;
}

export interface ThirdPartyAudiences {
    list: Array<ADV>;
}

export interface AmazonAudiences {
    list: Array<ADV>;
}

export interface ADV {
    value?: string;
}

export interface AmazonWishlists {
    lists: Array<WishList>;
}

export interface WishList {
    itemList: Array<Item>;
    privacy?: string;
    nodeFlags?: Array<string>;
    listName?: string;
    view?: string;
    recentActivityDate?: Date;
    emailAddress?: string;
    roleName?: string;
}

export interface Item {
    asin?: string;
    quantity?: number;
    privacy?: string;
    value?: number;
    currencyUnit?: string;
    deleted?: boolean;
    fullyPurchasedWithoutSpoilingSurprise?: boolean;
    fullyPurchased?: boolean;
}

//AUDIBLE MODELS
export interface AudibleLibrary {
    list: Array<AudioBook>;
}

export interface AudioBook {
    dateAdded?:Date;
    title?:string;
    asin?:string;
    isDownloaded?:boolean;
    isDeleted?:boolean;
    deleteBy?:string;
    dateDeleted?:Date;
    isPublic?:boolean;
    isStreamed?:boolean;
    isPreorder?:boolean
    downloads?:number;
    dateFirstDownloaded?:Date;
    orderNumber?:number;
    originType?:string;
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

//twitch prime subscription
export interface TwitchPrimeSubscriptions {
    list: Array<TwitchPrimeSubscription>;
}

export interface TwitchPrimeSubscription {
    date?: Date;
    balanceTrackerOperation?: string;
    subscriptionCreditOperation?: string;
    subscriptionCreditsSpent?: number;
    processedSubscriptionCreditsSpent?: number;
    subscriptionCreditBalanceChange?: number;
    remainingSubscriptionCreditBalance?: number;
    streamerName?: string;
    streamerLinkedChannels?: string;
    spenderTwitchUserID?: number;
    customerServiceNote?: string;
}
