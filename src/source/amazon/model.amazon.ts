/**
 * Aggregation of information from Amazon's models
 */
export interface AmazonDataAggregator {
    advertisers: AdvertisersAggregatorAM;
    audible: AudibleAggregatorAM;
    primeVideo: PrimeVideoAggregatorAM;
    orders: OrdersAggregatorAM;
    retail: RetailAggregatorAM;
    twitch: TwitchAggregatorAM;
    //from FileCodeAmazon.WISHLIST model
    wishlists?: AmazonWishlistsAM;
    //from FileCodeAmazon.CUSTOMER_ENGAGEMENT model
    searchDataEngagement?: SearchDataCustomerEngagementAM;
    creationDate?: Date;
}

export interface AdvertisersAggregatorAM {
    //from FileCodeAmazon.ADV_AUDIENCES model
    adsAudiences?: AdvertisersAudienceAM;
    //from FileCodeAmazon.ADV_THIRDPARTIES model
    adsThirdParties?: ThirdPartiesAudienceAM;
    //from FileCodeAmazon.ADV_CLICKS model
    adsClicked?: AdvertisersClickedAM;
    //from FileCodeAmazon.AUDIENCES model
    amazonAudience?: AmazonAudienceAM;
}

export interface AudibleAggregatorAM {
    //from FileCodeAmazon.AUDIBLE_LIBRARY model
    library?: AudibleLibraryAM;
    //from FileCodeAmazon.AUDIBLE_LISTENING model
    listening?: AudibleListeningListAM;
    //from FileCodeAmazon.AUDIBLE_MEMBERSHIP_BILLINGS model
    membershipBillings?: AudibleMembershipBillingsAM;
}

export interface PrimeVideoAggregatorAM {
    //from FileCodeAmazon.PRIMEVIDEO_WATCHLIST model
    watchlist?: PrimeVideoWatchlistAM;
    //from FileCodeAmazon.PRIMEVIDEO_WATCHLIST_HISTORY model
    watchlistHistory?: PrimeVideoWatchlistHistoryAM;
    //from FileCodeAmazon.PRIMEVIDEO_VIEW_COUNT model
    viewCounts?: DigitalPrimeVideoViewCountsAM;
    //from FileCodeAmazon.PRIMEVIDEO_VIEWINGHISTORY model
    viewingHistory?: PrimeVideoViewingHistoryAM;
}

export interface OrdersAggregatorAM {
    //from FileCodeAmazon.DIGITAL_ORDERING_ITEM model
    digitalItems?: DigitalItemsAM;
    //from FileCodeAmazon.DIGITAL_ORDERING_ORDERS model
    digitalOrders?: DigitalOrdersAM;
    //from FileCodeAmazon.DIGITAL_ORDERING_MONETARY model
    digitalMonetaryOrders?: DigitalOrdersMonetaryAM;
    //from FileCodeAmazon.DIGITAL_SUBSCRIPTION model
    digitalSubscriptions?: DigitalSubscriptionsAM;
}

export interface RetailAggregatorAM {
    //from FileCodeAmazon.RETAIL_LIGHT_WEIGHT_INTERACTIONS model
    lightWeightInteractions?: LightWeightInteractionsAM;
    //from FileCodeAmazon.RETAIL_CART_ITEMS model
    cartItems?: RetailCartItemsAM;
    //from FileCodeAmazon.RETAIL_ORDER_HISTORY model
    orderHistory?: RetailOrderHistoryAM;
    //from FileCodeAmazon.RETAIL_REGION_AUTHORITY model
    regionAuthorities?: RetailRegionAuthoritiesAM;
    //from FileCodeAmazon.RETAIL_SELLER_FEEDBACK model
    sellerFeedbacks?: RetailSellerFeedbacksAM;
}

export interface TwitchAggregatorAM {
    subscriptions?: TwitchPrimeSubscriptionsAM;
}

export interface EngagementAggregatorAM {
    /**
     * Interval of Time in days
     * @default 365
     */
    timeInterval?: number;
}

//FileCodeAmazon.CUSTOMER_ENGAGEMENT model
export interface SearchDataCustomerEngagementAM {
    list: SearchAM[];
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

//FileCodeAmazon.ADV_AUDIENCES model
export interface AdvertisersAudienceAM {
    list: AdvertiserAM[];
}

//FileCodeAmazon.ADV_CLICKS model
export interface AdvertisersClickedAM {
    list: AdvertiserAM[];
}

//FileCodeAmazon.ADV_THIRDPARTIES model
export interface ThirdPartiesAudienceAM {
    list: AdvertiserAM[];
}

//FileCodeAmazon.AUDIENCES model
export interface AmazonAudienceAM {
    list: AdvertiserAM[];
}

export interface AdvertiserAM {
    value?: string;
}

//FileCodeAmazon.WISHLIST model
export interface AmazonWishlistsAM {
    lists: WishlistAM[];
}

export interface WishlistAM {
    itemList: ItemAM[];
    privacy?: string;
    nodeFlags?: string[];
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

//FileCodeAmazon.AUDIBLE_LIBRARY model
export interface AudibleLibraryAM {
    list: AudioBookAM[];
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

//FileCodeAmazon.PRIMEVIDEO_WATCHLIST models
export interface PrimeVideoWatchlistAM {
    list: TitleAM[];
}

//FileCodeAmazon.PRIMEVIDEO_WATCHLIST_HISTORY model
export interface PrimeVideoWatchlistHistoryAM {
    list: TitleAM[];
}

export interface TitleAM {
    listId?: string;
    itemAddedDate?: Date;
    itemType?: string;
    deleted?: boolean;
    catalogTitle?: string;
}

//FileCodeAmazon.PRIMEVIDEO_VIEWINGHISTORY model
export interface PrimeVideoViewingHistoryAM {
    list: ViewingActivityAM[];
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

//GAMES_TWITCHPRIME_SUB_HISTORY model
export interface TwitchPrimeSubscriptionsAM {
    list: TwitchPrimeSubscriptionAM[];
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

//FileCodeAmazon.RETAIL_ORDER_HISTORY model
export interface RetailOrderHistoryAM {
    list: RetailOrderAM[];
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

//FileCodeAmazon.AUDIBLE_LISTENING model
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

//FileCodeAmazon.AUDIBLE_MEMBERSHIP_BILLINGS model
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

//FileCodeAmazon.PRIMEVIDEO_VIEW_COUNT model
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

//FileCodeAmazon.DIGITAL_SUBSCRIPTION model
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

//FileCodeAmazon.RETAIL_LIGHT_WEIGHT_INTERACTIONS model
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

//FileCodeAmazon.RETAIL_SELLER_FEEDBACK model
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

//FileCodeAmazon.RETAIL_REGION_AUTHORITY model
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

//FileCodeAmazon.RETAIL_CART_ITEMS model
export interface RetailCartItemsAM {
    list: RetailCartItemAM[];
}

export interface RetailCartItemAM {
    dateAddedToCart?: Date;
    source?: string;
    ASIN?: string;
    cartDomain?: string;
    cartList?: string;
    quantity?: number;
    oneClickBuyable?: boolean;
    toBeGiftWrapped?: boolean;
    primeSubscription?: boolean;
    pantry?: boolean;
    addOn?: boolean;
}

//FileCodeAmazon.DIGITAL_ORDERING_ITEM
export interface DigitalItemsAM {
    list: DigitalItemAM[];
}

export interface DigitalItemAM {
    ASIN?: string;
    title?: string;
    orderId?: string;
    digitalOrderItemId?: string;
    declaredCountryCode?: string;
    baseCurrencyCode?: string;
    fulfilledDate?: Date;
    isFulfilled?: boolean;
    marketplace?: string;
    orderDate?: Date;
    originalQuantity?: number;
    ourPrice?: number;
    ourPriceCurrencyCode?: string;
    ourPriceTax?: number;
    ourPriceTaxCurrencyCode?: string;
    sellerOfRecord?: string;
    publisher?: string;
    thirdPartyDisplayPrice?: string;
    thirdPartyDisplayCurrencyCode?: string;
    listPriceAmount?: number;
    listPriceCurrencyCode?: string;
    listPriceTaxAmount?: number;
    listPriceTaxCurrencyCode?: string;
    giftItem?: boolean;
    orderingCustomerNickname?: string;
    giftCustomerNickname?: string;
    giftMessage?: string;
    giftEmail?: string;
    recipientEmail?: string;
    giftRedemption?: string;
    itemMergedFromAnotherOrder?: string;
    quantityOrdered?: number;
    itemFulfilled?: boolean;
    shipFrom?: string;
    shipTo?: string;
    isOrderEligibleForPrimeBenefit?: boolean;
    offeringSKU?: string;
    fulfillmentMobileNumber?: string;
    rechargeAmount?: number;
    rechargeAmountCurrencyCode?: string;
    subscriptionOrderInfoList?: string;
    previouslyPaidDigitalOrderItemId?: string;
    previouslyPaidOrderId?: string;
    installmentOurPrice?: string;
    installmentOurPricePlusTax?: string;
    digitalOrderItemAttributes?: string;
    installmentOurPriceCurrencyCode?: string;
    installmentOurPricePlusTaxCurrencyCode?: string;
}

//FileCodeAmazon.DIGITAL_ORDERING_ORDERS model
export interface DigitalOrdersAM {
    list: DigitalOrderAM[];
}

export interface DigitalOrderAM {
    orderId?: string;
    billingAddress?: string;
    shippingAddress?: string;
    customerDeclaredAddress?: string;
    orderStatus?: string;
    marketplace?: string;
    isOrderFreeReplacement?: boolean;
    isOrderAPreorder?: boolean;
    doesOrderDependOnAnotherOrder?: boolean;
    orderingLocationCountry?: string;
    orderDate?: Date;
    relatedPhysicalOrderId?: string;
    shoppingMarketplaceId?: string;
    paidByOtherCustomer?: string;
    multifactorAuthenticationStatus?: string;
    subscriptionOrderType?: string;
    alternativeOrderProvidingPayment?: string;
    paymentInformation?: string;
    deliveryPacketId?: string;
    deliveryStatus?: string;
    deliveryDate?: Date;
    giftClaimDate?: Date;
    sessionId?: string;
    uniqueBrowserId?: string;
}

//FileCodeAmazon.DIGITAL_ORDERING_MONETARY model
export interface DigitalOrdersMonetaryAM {
    list: DigitalOrderMonetaryAM[];
}

export interface DigitalOrderMonetaryAM {
    digitalOrderItemId?: string;
    deliveryPacketId?: string;
    affectedItemQuantity?: number;
    transactionAmount?: number;
    baseCurrencyCode?: string;
    claimCode?: string;
    FXTransactionAmount?: string;
    FXCurrencyCode?: string;
    monetaryComponentTypeCode?: string;
    offerTypeCode?: string;
}
