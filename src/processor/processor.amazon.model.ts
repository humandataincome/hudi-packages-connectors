export interface AmazonDataAggregator {
    //from AMAZON_ADV_AUDIENCES
    advAudiences?: number;
    //from AMAZON_ADV_CLICKS
    advClicks?: number;
    //from AMAZON_AUDIENCES
    amazonAudiences?: number;
    //from AMAZON_AUDIBLE_LISTENING
    audibleListening?: number;
    //from AMAZON_PRIMEVIDEO_VIEW_COUNT
    movies?: number;
    //from AMAZON_RETAIL_ORDER_HISTORY (only from the most used currency)
    orders?: number;
    ordersTI?: number;
    //from AMAZON_PRIMEVIDEO_VIEW_COUNT
    rents?: number;
    //from AMAZON_ADV_THIRDPARTIES
    thirdPartyAudiences?: number;
    //from AMAZON_PRIMEVIDEO_VIEW_COUNT
    tvSeries?: number;
    //from AMAZON_AUDIBLE_LISTENING | AMAZON_AUDIBLE_LIBRARY | AMAZON_AUDIBLE_MEMBERSHIP_BILLINGS | AMAZON_AUDIBLE_MEMBERSHIP_EVENT
    audibleSubscription?: boolean;
    audibleListened?: number;
    //from AMAZON_RETAIL_LIGHT_WEIGHT_INTERACTIONS
    helpfulReviews?: number;
    //from AMAZON_RETAIL_SELLER_FEEDBACK
    feedbacks?: number;
    //from AMAZON_DIGITAL_SUBSCRIPTION
    subscriptions?: number;
    primeSubscription?: boolean;
    //???from AMAZON_RETAIL_ORDER_HISTORY
    avgSpentTI?: number;
    //manca indirizzo intervallato da virgole from AMAZON_RETAIL_REGION_AUTHORITY



}
