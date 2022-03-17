
export interface SearchDataCustomerEngagementAM {
    list: Array<SearchAM>;
}

export interface SearchAM {
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

export interface AdvertiserAudiencesAM {
    list: Array<AdvertiserAM>;
}

export interface AdvertiserClickedAM {
    list: Array<AdvertiserAM>;
}

export interface ThirdPartyAudiencesAM {
    list: Array<AdvertiserAM>;
}

export interface AmazonAudiencesAM {
    list: Array<AdvertiserAM>;
}

export interface AdvertiserAM {
    value?: string;
}

export interface AmazonWishlistsAM {
    lists: Array<WishListAM>;
}

export interface WishListAM {
    itemList: Array<ItemAM>;
    privacy?: string;
    nodeFlags?: Array<string>;
    listName?: string;
    view?: string;
    recentActivityDate?: Date;
    emailAddress?: string;
    roleName?: string;
}

export interface ItemAM {
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
export interface AudibleLibraryAM {
    list: Array<AudioBookAM>;
}

export interface AudioBookAM {
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
export interface PrimeVideoWatchlistAM {
    list: Array<TitleAM>;
}

export interface PrimeVideoWatchlistHistoryAM {
    list: Array<TitleAM>;
}

export interface PrimeVideoViewingHistoryAM {
    list: Array<ViewingActivityAM>;
}

export interface TitleAM {
    listId?: string;
    itemAddedDate?: Date;
    itemType?: string;
    deleted?: boolean;
    catalogTitle?: string;
}

export interface ViewingActivityAM {
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
export interface TwitchPrimeSubscriptionsAM {
    list: Array<TwitchPrimeSubscriptionAM>;
}

export interface TwitchPrimeSubscriptionAM {
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

//RETAIL
export interface RetailOrderHistoryAM {
    list: Array<RetailOrderAM>;
}

export interface RetailOrderAM {
    website?: string;
    orderID?: string;
    orderDate?: Date;
    purchaseOrderNumber?: string;
    currency?: string;
    unitPrice?: number;
    unitPriceTax?: number;
    shippingCharge?: number;
    totalDiscounts?: number;
    totalOwed?: number;
    shipmentItemSubtotal?: number;
    shipmentItemSubtotalTax?: number;
    ASIN?: string;
    productCondition?: string;
    quantity?: number;
    paymentInstrumentType?: string;
    orderStatus?: string;
    shipmentStatus?: string;
    shipDate?: Date;
    shippingOption?: string;
    shippingAddress?: string;
    billingAddress?: string;
    carrierNameAndTrackingNumber?: string;
    productName?: string;
    giftMessage?: string;
    giftSenderName?: string;
    giftRecipientContactDetails?: string;
}
