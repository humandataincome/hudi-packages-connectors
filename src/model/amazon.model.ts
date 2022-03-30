
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

export interface AudibleListeningListAM {
    list: AudibleListeningAM[];
}

export interface AudibleListeningAM {
    deviceType?: string;
    startDate?: Date;
    endDate?: Date;
    eventDuration?: number;
    startPosition?: number;
    endPosition?: number;
    title?: string;
    asin?: string;
    bookLength?: number;
    deliveryType?: string;
    narrationSpeed?: string;
    bookmark?: number;
    audioType?: string;
    asinOwned?: boolean;
    listeningMode?: string;
    store?: string;
    appVersion?: string;
    localTimezone?: string;
}

export interface AudibleMembershipBillingsAM {
    list: AudibleMembershipBillingAM[];
}

export interface AudibleMembershipBillingAM {
    taxCreateDate?: Date;
    billingPeriodEndDate?: Date;
    billingPeriodStartDate?: Date;
    statusLastUpdatedDate?: Date;
    baseAmount?: number;
    tax?: number;
    totalAmount?: number;
    currency?: string;
    type?: string;
    plan?: string;
    planBillingFreq?: number;
    planBillingFee?: number;
    offerName?: string;
    offerType?: string;
    transactionId?: string;
    subscriptionIdentifier?: string;
    planSelectionIdentifier?: string;
    merchantName?: string;
    taxReason?: string;
    status?: string;
}

export interface DigitalPrimeVideoViewCountsAM {
    showTVWatched?: number;
    kidsTitlesWatched?: number;
    moviesWatched?: number;
    nonKidsTitlesWatched?: number;
    primeTVTitlesWatched?: number;
    primeMovieTitlesWatched?: number;
    primeTitlesWatched?: number;
    rentBuyTVTitlesWatched?: number;
    rentBuyMoviesWatched?: number;
    rentBuyTitlesWatched?: number;
    titlesAddedToWatchlist?: number;
    titlesPurchasedRented?: number;
    titlesWatched?: number;
    homeCountry?: string;
}

export interface DigitalSubscriptionsAM {
    list: DigitalSubscriptionAM[];
}

export interface DigitalSubscriptionAM {
    subscriptionId?: string;
    baseSubscriptionId?: string;
    shippingAddress?: string;
    marketplace?: string;
    subscriptionPlanId?: string;
    subscriptionStatus?: string;
    subscriptionStatusDate?: Date;
    activePaymentPlanId?: string;
    autoRenew?: boolean;
    subscriptionStartDate?: Date;
    walletCyclingPreferenceEnabled?: boolean;
    serviceProvider?: string;
    recordVersionNumber?: string;
    contractTimeInterval?: string;
    version?: string;
    haveSubscriptionProblem?: boolean;
    maxNumOfBeneficiaries?: number;
    scheduledResumeDateForPausedSubscription?: Date;
    currentPlanGifted?: boolean;
    billingScheduleId?: string;
    nextBillDate?: Date;
    nextBillAmount?: number;
    baseCurrencyCode?: string;
    currentBillingPeriod?: number;
    billingPeriodStartDate?: Date;
    currentContractPeriod?: number;
    contractPeriodStartDate?: Date;
    contractEndDate?: Date;
}

export interface LightWeightInteractionsAM {
    list: LightWeightInteractionAM[];
}

export interface LightWeightInteractionAM {
    creationTime?: Date;
    interactableType?: string;
    interactableURL?: string;
    interactionTime?: Date;
    interactionType?: string;
    interactionValue?: string;
    marketplace?: string;
    modificationTime?: Date;
    suppressed?: boolean;
    version?: string;
}

export interface RetailSellerFeedbacksAM {
    list: RetailSellerFeedbackAM[];
}

export interface RetailSellerFeedbackAM {
    orderId?: string;
    marketplace?: string;
    feedbackDate?: Date;
    feedbackText?: string;
    feedbackRating?: number;
    dealAgain?: string;
    didItemArrivedOnTime?: boolean;
    itemAsDescribedBySeller?: boolean;
    promptAndCourteousService?: boolean;
    whatWentWrong?: string;
    isFeedbackRemoved?: boolean;
    feedbackRemovedBy?: string;
    reasonForRemoval?: string;
}

export interface RetailRegionAuthoritiesAM {
    list: RetailRegionAuthorityAM[];
}

export interface RetailRegionAuthorityAM {
    postalCode?: string;
    district?: string;
    city?: string;
    stateOrProvince?: string;
    stateCode?: string;
    countryCode?: string;
    date?: Date;
}
 export interface RegionAuthorityAM {

 }
