import Logger from "../utils/logger";
import {Parser} from "../utils/parser";
import {Months} from "../utils/utils.enum";
import {
    AdvertiserAudiencesAM,
    AdvertiserClickedAM,
    AmazonAudiencesAM,
    AmazonWishlistsAM,
    AudibleLibraryAM,
    AudibleListeningAM,
    AudibleListeningListAM,
    AudibleMembershipBillingAM,
    AudibleMembershipBillingsAM,
    AudioBookAM,
    DigitalPrimeVideoViewCountsAM,
    DigitalSubscriptionAM,
    DigitalSubscriptionsAM,
    ItemAM,
    LightWeightInteractionAM,
    LightWeightInteractionsAM,
    PrimeVideoViewingHistoryAM,
    PrimeVideoWatchlistAM,
    PrimeVideoWatchlistHistoryAM,
    RetailOrderAM,
    RetailOrderHistoryAM,
    RetailRegionAuthoritiesAM,
    RetailRegionAuthorityAM,
    RetailSellerFeedbackAM,
    RetailSellerFeedbacksAM,
    SearchAM,
    SearchDataCustomerEngagementAM,
    ThirdPartyAudiencesAM,
    TitleAM,
    TwitchPrimeSubscriptionAM,
    TwitchPrimeSubscriptionsAM,
    ViewingActivityAM,
    WishListAM
} from "../model";
import {Validator} from "../validator";

/**
 * Class used to parse most important files into the directory returned by Amazon in CSV and JSON format.
 * All the files are given in input as Buffer, parsed to JSON and then mapped into a specific interface model.
 * All functions return the relevant information (if there are any) as a promised model if the parsing is successful, undefined otherwise.
 */
export class AmazonService {
    private static readonly logger = new Logger("Amazon Service");
    private static readonly INIT_CHAR = '﻿';
    /**
     * @param data - file 'Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.Watchlist.csv' in input as Buffer
     */
    static async parsePrimeVideoWatchlist(data: Buffer): Promise<PrimeVideoWatchlistAM | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: PrimeVideoWatchlistAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: TitleAM = {}, match;
                    (listItem.catalogTitle !== '') && (newItem.catalogTitle = listItem.catalogTitle);
                    if (listItem[`${this.INIT_CHAR}"itemAddedDate"`] !== '') {
                        (listItem[`${this.INIT_CHAR}"itemAddedDate"`] !== '') && (match = listItem[`${this.INIT_CHAR}"itemAddedDate"`].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+)/));
                        (match) && (newItem.itemAddedDate = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), 0)));
                    }
                    return newItem;
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error){
            this.logger.log('error', `${error}`,'parsePrimeVideoWatchlist');
            return undefined;
        }
    }

    /**
     * @param data - file 'Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.WatchlistHistory.csv' in input as Buffer
     */
    static async parsePrimeVideoWatchlistHistory(data: Buffer): Promise<PrimeVideoWatchlistHistoryAM | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: PrimeVideoWatchlistHistoryAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: TitleAM = {}, match;
                    (listItem[`${this.INIT_CHAR}"listId"`] !== '') && (newItem.listId = listItem[`${this.INIT_CHAR}"listId"`]);
                    (listItem.itemAddedDate !== '') && (match = listItem.itemAddedDate.match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+)/));
                    (listItem.itemAddedDate !== '') && (newItem.itemAddedDate = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), 0)));
                    (listItem.itemType !== '') && (newItem.itemType = listItem.itemType);
                    (listItem.deleted !== '') && (newItem.deleted = listItem.deleted == '1');
                    (listItem.catalogTitle !== '') && (newItem.catalogTitle = listItem.catalogTitle);
                    return newItem;
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error){
            this.logger.log('error', `${error}`,'parsePrimeVideoWatchlistHistory');
            return undefined;
        }
    }

    /**
     * @param data - file 'Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.WatchlistHistory.csv' in input as Buffer
     */
    static async parsePrimeVideoViewingHistory(data: Buffer): Promise<PrimeVideoViewingHistoryAM | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: PrimeVideoViewingHistoryAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: ViewingActivityAM = {}, match;
                    (listItem[`${this.INIT_CHAR}Playback Hour`]  !== '') && (match = listItem[`${this.INIT_CHAR}Playback Hour`].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+)/));
                    (listItem[`${this.INIT_CHAR}Playback Hour`]  !== '') && (newItem.playbackHour = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    (listItem['Operating System'] !== '') && (newItem.operatingSystem = listItem['Operating System']);
                    (listItem['Browser'] !== '') && (newItem.browser = listItem['Browser']);
                    (listItem['Delivery Type'] !== '') && (newItem.deliveryType = listItem['Delivery Type']);
                    (listItem['City'] !== '') && (newItem.city = listItem['City']);
                    (listItem['Country'] !== '') && (newItem.country = listItem['Country']);
                    (listItem['ISP'] !== '') && (newItem.ISP = listItem['ISP']);
                    (listItem['State'] !== '') && (newItem.state = listItem['State']);
                    (listItem['Content Quality Entitled'] !== '') && (newItem.contentQuality = listItem['Content Quality Entitled']);
                    (listItem['Entitlement Type'] !== '') && (newItem.entitlementType = listItem['Entitlement Type']);
                    (listItem['Video Type'] !== '') && (newItem.videoType = listItem['Video Type']);
                    (listItem['Audio Language'] !== '') && (newItem.audioLanguage = listItem['Audio Language']);
                    (listItem['Title'] !== '') && (newItem.title = listItem['Title']);
                    return newItem;
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error){
            this.logger.log('error', `${error}`,'parsePrimeVideoViewingHistory');
            return undefined;
        }
    }

    /**
     * @param data - file 'Search-Data/Search-Data.Customer-Engagement.csv' in input as Buffer
     */
    static async parseSearchDataCustomerEngagement(data: Buffer): Promise<SearchDataCustomerEngagementAM | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: SearchDataCustomerEngagementAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: SearchAM = {}, match;
                    (listItem[`${this.INIT_CHAR}First Search Time (GMT)`] !== '') && (match = listItem[`${this.INIT_CHAR}First Search Time (GMT)`].match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/));
                    (listItem[`${this.INIT_CHAR}First Search Time (GMT)`] !== '') && (newItem.firstSearchTime = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    (listItem['Country ID'] !== '') && (newItem.countryID = listItem['Country ID']);
                    (listItem['All Department (APS) or Category'] !== '') && (newItem.APSorCategory = listItem['All Department (APS) or Category']);
                    (listItem['Site Variant'] !== '') && (newItem.siteVariant = listItem['Site Variant']);
                    (listItem['Application / Browser Name'] !== '') && (newItem.appOrBrowser = listItem['Application / Browser Name']);
                    (listItem['Device Model'] !== '') && (newItem.deviceModel = listItem['Device Model']);
                    (listItem['Search Type (Keyword,Visual,Browse)'] !== '') && (newItem.searchType = listItem['Search Type (Keyword,Visual,Browse)']);
                    (listItem['Session ID'] !== '') && (newItem.sessionID = listItem['Session ID']);
                    (listItem['Query ID'] !== '') && (newItem.queryID = listItem['Query ID']);
                    (listItem['Prime Customer (Y/N)'] !== '') && (newItem.primeCustomer = listItem['Prime Customer (Y/N)'] === '1');
                    (listItem['Is From External Link (Y/N)'] !== '') && (newItem.isFromExternalLink = listItem['Is From External Link (Y/N)'] === '1');
                    (listItem['Search From External Site (Y/N)'] !== '') && (newItem.searchFromExternalSite = listItem['Search From External Site (Y/N)'] === '1');
                    (listItem['First Search Query String'] !== '') && (newItem.firstSearchQuery = listItem['First Search Query String']);
                    (listItem['Application Name'] !== '') && (newItem.applicationName = listItem['Application Name']);
                    (listItem['App Version'] !== '') && (newItem.appVersion = listItem['App Version']);
                    (listItem['Operating System Name'] !== '') && (newItem.operatingSystemName = listItem['Operating System Name']);
                    (listItem['Operating System Version'] !== '') && (newItem.operatingSystemVersion = listItem['Operating System Version']);
                    (listItem['Device Type ID'] !== '') && (newItem.deviceTypeID = listItem['Device Type ID']);
                    (listItem['Device Category'] !== '') && (newItem.deviceCategory = listItem['Device Category']);
                    (listItem['Customer IP'] !== '') && (newItem.customerIP = listItem['Customer IP']);
                    (listItem['Search Method'] !== '') && (newItem.searchMethod = listItem['Search Method']);
                    (listItem['Keywords'] !== '') && (newItem.keywords = listItem['Keywords']);
                    (listItem['Amazon Business Customer (Y/N)'] !== '') && (newItem.isBusinessCustomer = listItem['Amazon Business Customer (Y/N)'] === '1');
                    (listItem['Language'] !== '') && (newItem.language = listItem['Language']);
                    (listItem['Server'] !== '') && (newItem.server = listItem['Server']);
                    (listItem['Amazon Fresh Customer (Y/N)'] !== '') && (newItem.isFreshCustomer = listItem['Amazon Fresh Customer (Y/N)'] === '1');
                    (listItem['Music Subscriber (Y/N)'] !== '') && (newItem.isMusicSubscriber = listItem['Music Subscriber (Y/N)'] === '1');
                    (listItem['First Browse Node'] !== '') && (newItem.firstBrowseNode = listItem['First Browse Node']);
                    (listItem['Last search Time (GMT)'] !== '') && (match = listItem['Last search Time (GMT)'].match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+).0/));
                    (listItem['Last search Time (GMT)'] !== '') && (newItem.lastSearchTime = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    (listItem['Last Department'] !== '') && (newItem.lastDepartment = listItem['Last Department']);
                    (listItem['Last Browse Node'] !== '') && (newItem.lastBrowseNode = listItem['Last Browse Node']);
                    (listItem['Last Known Customer ID'] !== '') && (newItem.lastKnownCustomerID = listItem['Last Known Customer ID']);
                    (listItem['First Added Item'] !== '') && (newItem.firstAddedItem = listItem['First Added Item']);
                    (listItem['First Purchased Item'] !== '') && (newItem.firstPurchasedItem = listItem['First Purchased Item']);
                    (listItem['First Consumed Item (Subscription)'] !== '') && (newItem.firstConsumedItem = listItem['First Consumed Item (Subscription)']);
                    (listItem['Number of Clicked Items'] !== '') && (newItem.numberClickedItem = listItem['Number of Clicked Items']);
                    (listItem['Number of Items Added to Cart'] !== '') && (newItem.numberItemsAddedCart = listItem['Number of Items Added to Cart']);
                    (listItem['Number of Items Ordered'] !== '') && (newItem.numberItemsOrdered = listItem['Number of Items Ordered']);
                    (listItem['Number of Paid Items Ordered'] !== '') && (newItem.numberPaidItemsOrdered = listItem['Number of Paid Items Ordered']);
                    (listItem['Number of Free Items Ordered'] !== '') && (newItem.numberFreeItemsOrdered = listItem['Number of Free Items Ordered']);
                    (listItem['Units Ordered'] !== '') && (newItem.unitsOrdered = listItem['Units Ordered']);
                    (listItem['Paid Units Ordered'] !== '') && (newItem.paidUnitsOrdered = listItem['Paid Units Ordered']);
                    (listItem['Free Units Ordered'] !== '') && (newItem.freeUnitsOrdered = listItem['Free Units Ordered']);
                    (listItem['Maximum Purchase Price'] !== '') && (newItem.maximumPurchasePrice = listItem['Maximum Purchase Price']);
                    (listItem['Clicked Any Item (Y/N)'] !== '') && (newItem.clickedAnyItem = listItem['Clicked Any Item (Y/N)'] === '1');
                    (listItem['Added Any Item (Y/N)'] !== '') && (newItem.addedAnyItem = listItem['Added Any Item (Y/N)'] === '1');
                    (listItem['Purchased Any Item (Y/N)'] !== '') && (newItem.purchasedAnyItem = listItem['Purchased Any Item (Y/N)'] === '1');
                    (listItem['Department Count'] !== '') && (newItem.departmentCount = listItem['Department Count']);
                    (listItem['Shopping Refinement'] !== '') && (newItem.shoppingRefinement = listItem['Shopping Refinement']);
                    (listItem['Number of Shopping Refinements'] !== '') && (newItem.numberShoppingRefinements = listItem['Number of Shopping Refinements']);
                    (listItem['Highest Number of Shopping Refinements'] !== '') && (newItem.highestNumberShoppingRefinements = listItem['Highest Number of Shopping Refinements']);
                    (listItem['Items Consumed (Subscription)'] !== '') && (newItem.itemConsumed = listItem['Items Consumed (Subscription)']);
                    (listItem['Shopping Refinement Pickers'] !== '') && (newItem.shoppingRefinementPickers = listItem['Shopping Refinement Pickers']);
                    (listItem['Paid Purchase (Y/N)'] !== '') && (newItem.paidPurchase = listItem['Paid Purchase (Y/N)'] === '1');
                    (listItem['Item Borrowed (Y/N)'] !== '') && (newItem.isItemBorrowed = listItem['Item Borrowed (Y/N)'] === '1');
                    (listItem['Items Borrowed'] !== '') && (newItem.itemsBorrowed = listItem['Items Borrowed']);
                    (listItem['Next Query Group via Click'] !== '') && (newItem.nextQueryGroupViaClick = listItem['Next Query Group via Click']);
                    (listItem['Query Abandoned (Y/N)'] !== '') && (newItem.queryAbandoned = listItem['Query Abandoned (Y/N)'] === '1');
                    (listItem['Query Reformulated (Y/N)'] !== '') && (newItem.queryReformulated = listItem['Query Reformulated (Y/N)'] === '1');
                    (listItem['Amazon Fresh (Y/N)'] !== '') && (newItem.amazonFresh = listItem['Amazon Fresh (Y/N)'] === '1');
                    (listItem['Store Visited'] !== '') && (newItem.storeVisited = listItem['Store Visited']);
                    (listItem['Department'] !== '') && (newItem.department = listItem['Department']);
                    (listItem['Browse Node'] !== '') && (newItem.browserNode = listItem['Browse Node']);
                    (listItem['First Search Domain'] !== '') && (newItem.firstSearchDomain = listItem['First Search Domain']);
                    (listItem['Is First Search From External Ad'] !== '') && (newItem.isFirstSearchFromExternalAd = listItem['Is First Search From External Ad'].toLowerCase() == 'yes');
                    (listItem['User Agent Info Family'] !== '') && (newItem.userAgentInfoFamily = listItem['User Agent Info Family']);
                    (listItem.LKCI !== '') && (newItem.LKCI = listItem['LKCI']);
                    return newItem;
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error){
            this.logger.log('error', `${error}`,'parseSearchDataCustomerEngagement');
            return undefined;
        }
    }

    /**
     * @param data - file 'Amazon.Lists.Wishlist.2.1/Amazon.Lists.Wishlist.json' in input as Buffer
     */
    static async parseAmazonWishlists(data: Buffer): Promise<AmazonWishlistsAM | undefined> {
        try {
            let document = JSON.parse(data.toString());
            if(document) {
                let regex = /(.*) \[(.*)]/;
                let model: AmazonWishlistsAM = {lists: []};
                let wishList: WishListAM = {itemList: []};
                document.forEach((value: any) => {
                    let keys = Object.keys(value);
                    let match = keys[0].match(regex);
                    if(match) {
                        if(match[2] == 'List') {
                            value[keys[0]].forEach((parameter: any) => {
                                let parameterKeys = Object.keys(parameter);
                                (parameterKeys[0] === 'listName') && (wishList.listName = parameter.listName);
                                (parameterKeys[0] === 'privacy') && (wishList.privacy = parameter.privacy);
                                (parameterKeys[0] === 'view') && (wishList.view = parameter.view);
                                (parameterKeys[0] === 'recentActivityDate') && (wishList.recentActivityDate = new Date(parameter.recentActivityDate));
                            });
                        } else if(match[1] && match[2] == 'Item 1') {
                            let item: ItemAM = {};
                            value[keys[0]].forEach((parameter: any) => {
                                let parameterKeys = Object.keys(parameter);
                                (parameterKeys[0] === 'asin') && (item.asin = parameter.asin);
                                (parameterKeys[0] === 'quantity') && (item.quantity = parameter.quantity);
                                (parameterKeys[0] === 'privacy') && (item.privacy = parameter.privacy);
                                (parameterKeys[0] === 'deleted') && (item.deleted = parameter.deleted.toLowerCase() === 'true');
                                (parameterKeys[0] === 'fullyPurchasedWithoutSpoilingSurprise') && (item.fullyPurchasedWithoutSpoilingSurprise = parameter.fullyPurchasedWithoutSpoilingSurprise.toLowerCase() === 'true');
                                (parameterKeys[0] === 'fullyPurchased') && (item.fullyPurchased = parameter.fullyPurchased.toLowerCase() === 'true');
                                (parameterKeys[0] === 'amount' && parameter.amount.value) && (item.value = parameter.amount.value);
                                (parameterKeys[0] === 'amount' && parameter.amount.currencyUnit) && (item.currencyUnit = parameter.amount.currencyUnit);
                                wishList.itemList.push(item);
                            });
                        } else if(match[2] == 'User') {
                            value[keys[0]].forEach((parameter: any) => {
                                let parameterKeys = Object.keys(parameter);
                                (parameterKeys[0] === 'emailAddress') && (wishList.emailAddress = parameter.emailAddress);
                                (parameterKeys[0] === 'roleName') && (wishList.roleName = parameter.roleName);
                                (parameterKeys[0] === 'nodeFlags') && (wishList.nodeFlags = parameter.nodeFlags);
                            });
                            model.lists.push(wishList);
                            wishList = {itemList: []};
                        }
                    }
                });
                return model.lists.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error){
            this.logger.log('error', `${error}`,'parseAmazonWishlists');
            return undefined;
        }
    }


    /**
     * @param data - file 'Audible.Library/Audible.Library.csv' in input as Buffer
     */
    static async parseAudibleLibrary(data: Buffer): Promise<AudibleLibraryAM | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: AudibleLibraryAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: AudioBookAM = {};
                    if(listItem[`${this.INIT_CHAR}"DateAdded"`] !== '') {
                        let match = listItem[`${this.INIT_CHAR}"DateAdded"`].match(/(\d+)-(\w+)-(\d+)/);
                        let monthIndex = Months[match[2]];
                        (monthIndex) && (newItem.dateAdded = new Date(Date.UTC(parseInt(match[3]), parseInt(monthIndex) - 1, parseInt(match[1]), 0, 0, 0)));
                    }
                    (listItem.Title !== '') && (newItem.title = listItem.Title);
                    (listItem.Asin !== '') && (newItem.asin = listItem.Asin);
                    (listItem.IsDownloaded !== '') && (newItem.isDownloaded = listItem.IsDownloaded.toLowerCase() === 'y');
                    (listItem.IsDeleted !== '') && (newItem.isDeleted = listItem.IsDeleted.toLowerCase() === 'y');
                    (listItem.DeleteBy !== '') && (newItem.deleteBy = listItem.DeleteBy);
                    if(listItem.DateDeleted !== '') {
                        let match = listItem.DateDeleted.match(/(\d+)-(\w+)-(\d+)/);
                        let monthIndex = Months[match[2]];
                        (monthIndex) && (newItem.dateDeleted = new Date(Date.UTC(parseInt(match[3]), parseInt(monthIndex) - 1, parseInt(match[1]), 0, 0, 0)));
                    }
                    (listItem.IsPublic !== '') && (newItem.isPublic = listItem.IsPublic.toLowerCase() === 'y');
                    (listItem.IsStreamed !== '') && (newItem.isStreamed = listItem.IsStreamed.toLowerCase() === 'y');
                    (listItem.IsPreorder !== '') && (newItem.isPreorder = listItem.IsPreorder.toLowerCase() === 'y');
                    (listItem.Downloads !== '') && (newItem.downloads = listItem.Downloads);
                    if (listItem.DateFirstDownloaded !== '') {
                        let match = listItem.DateFirstDownloaded.match(/(\d+)-(\w+)-(\d+)/);
                        let monthIndex = Months[match[2]];
                        (monthIndex) && (newItem.dateFirstDownloaded = new Date(Date.UTC(parseInt(match[3]), parseInt(monthIndex) - 1, parseInt(match[1]), 0, 0, 0)));
                    }
                    (listItem.OrderNumber !== '') && (newItem.orderNumber = listItem.OrderNumber);
                    (listItem.OriginType !== '') && (newItem.originType = listItem.OriginType);
                    return newItem;
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error){
            this.logger.log('error', `${error}`,'parseAudibleLibrary');
            return undefined;
        }
    }

    /**
     * @param data - file 'Advertising.{X}/Advertising.AdvertiserAudiences.csv' in input as Buffer
     */
    static async parseAdvertiserAudiences(data: Buffer): Promise<AdvertiserAudiencesAM | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: AdvertiserAudiencesAM = {list: []}
                result.forEach((listItem: any) => {
                    let parameter = `${this.INIT_CHAR}Advertisers who brought audiences in which you are included`;
                    (listItem[parameter] !== '') && (model.list.push({value: listItem[parameter]}));
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error){
            this.logger.log('error', `${error}`,'parseAdvertiserAudiences');
            return undefined;
        }
    }

    /**
     * @param data - file 'Advertising.{X}/Advertising.AdvertiserClicks.csv' in input as Buffer
     */
    static async parseAdvertiserClicked(data: Buffer): Promise<AdvertiserClickedAM | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: AdvertiserClickedAM = {list: []}
                result.forEach((listItem: any) => {
                    let parameter = `${this.INIT_CHAR}Advertisers whose ads you clicked`;
                    (listItem[parameter] !== '') && (model.list.push({value: listItem[parameter]}));
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error){
            this.logger.log('error', `${error}`,'parseAdvertiserClicked');
            return undefined;
        }
    }

    /**
     * @param data - file 'Advertising.{X}/Advertising.3PAudiences.csv' in input as Buffer
     */
    static async parseThirdPartyAudiences(data: Buffer): Promise<ThirdPartyAudiencesAM | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: ThirdPartyAudiencesAM = {list: []}
                result.forEach((listItem: any) => {
                    let parameter = `${this.INIT_CHAR}Audiences in which you are included via 3rd Parties`;
                    (listItem[parameter] !== '') && (model.list.push({value: listItem[parameter]}));
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error){
            this.logger.log('error', `${error}`,'parseThirdPartyAudiences');
            return undefined;
        }
    }

    /**
     * @param data - file 'Advertising.{X}/Advertising.AmazonAudiences.csv' in input as Buffer
     */
    static async parseAmazonAudiences(data: Buffer): Promise<AmazonAudiencesAM | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: AmazonAudiencesAM = {list: []}
                result.forEach((listItem: any) => {
                    let parameter = `${this.INIT_CHAR}Amazon Audiences in which you are included`;
                    (listItem[parameter] !== '') && (model.list.push({value: listItem[parameter]}));
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error){
            this.logger.log('error', `${error}`,'parseAmazonAudiences');
            return undefined;
        }
    }

    /**
     * @param data - file 'AmazonGames/AmazonGames.TwitchPrime.SubscriptionCreditHistory.csv' in input as Buffer
     */
    static async parseTwitchPrimeSubscription(data: Buffer): Promise<TwitchPrimeSubscriptionsAM | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: TwitchPrimeSubscriptionsAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: TwitchPrimeSubscriptionAM = {}, match;
                    (listItem[`${this.INIT_CHAR}Timestamp`] !== '') && (match = listItem[`${this.INIT_CHAR}Timestamp`].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+)/));
                    (match) && (newItem.date = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), 0)));
                    (listItem.BalanceTrackerOperation !== '') && (newItem.balanceTrackerOperation = listItem.BalanceTrackerOperation);
                    (listItem.SubscriptionCreditOperation !== '') && (newItem.subscriptionCreditOperation = listItem.SubscriptionCreditOperation);
                    (listItem.SubscriptionCreditsSpent !== '') && (newItem.subscriptionCreditsSpent = listItem.SubscriptionCreditsSpent);
                    (listItem.ProcessedSubscriptionCreditsSpent !== '') && (newItem.processedSubscriptionCreditsSpent = listItem.ProcessedSubscriptionCreditsSpent);
                    (listItem.SubscriptionCreditBalanceChange !== '') && (newItem.subscriptionCreditBalanceChange = listItem.SubscriptionCreditBalanceChange);
                    (listItem.RemainingSubscriptionCreditBalance !== '') && (newItem.remainingSubscriptionCreditBalance = listItem.RemainingSubscriptionCreditBalance);
                    (listItem.StreamerName !== '') && (newItem.streamerName = listItem.StreamerName);
                    (listItem.StreamerLinkedChannels !== '') && (newItem.streamerLinkedChannels = listItem.StreamerLinkedChannels);
                    (listItem.SpenderTwitchUserID !== '') && (newItem.spenderTwitchUserID = listItem.SpenderTwitchUserID);
                    (listItem.CustomerServiceNote !== '') && (newItem.customerServiceNote = listItem.CustomerServiceNote);
                    return newItem;
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error){
            this.logger.log('error', `${error}`,'parseTwitchPrimeSubscription');
            return undefined;
        }
    }

    /**
     * @param data - file 'Retail.OrderHistory.2/Retail.OrderHistory.2.csv' in input as Buffer
     */
    static async parseRetailOrderHistory(data: Buffer): Promise<RetailOrderHistoryAM | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: RetailOrderHistoryAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: RetailOrderAM = {}, match;
                    (listItem[`${this.INIT_CHAR}"Website"`] !== '') && (newItem.website = listItem[`${this.INIT_CHAR}"Website"`]);
                    (listItem['Order ID'] !== '') && (newItem.orderID = listItem['Order ID']);
                    (listItem['Order Date']  !== '') && (match = listItem['Order Date'].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+)/));
                    (listItem['Order Date']  !== '') && (newItem.orderDate = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    (listItem['Purchase Order Number'] !== '') && (newItem.purchaseOrderNumber = listItem['Purchase Order Number']);
                    (listItem['Currency'] !== '') && (newItem.currency = listItem['Currency']);
                    (listItem['Unit Price'] !== '') && (newItem.unitPrice = parseFloat(listItem['Unit Price']));
                    (listItem['Unit Price Tax'] !== '') && (newItem.unitPriceTax = parseFloat(listItem['Unit Price Tax']));
                    (listItem['Shipping Charge'] !== '') && (newItem.shippingCharge = parseFloat(listItem['Shipping Charge']));
                    (listItem['Total Discounts'] !== '') && (newItem.totalDiscounts = parseFloat(listItem['Total Discounts']));
                    (listItem['Total Owed'] !== '') && (newItem.totalOwed = parseFloat(listItem['Total Owed']));
                    (listItem['Shipment Item Subtotal'] !== '') && (newItem.shipmentItemSubtotal = parseFloat(listItem['Shipment Item Subtotal']));
                    (listItem['Shipment Item Subtotal Tax'] !== '') && (newItem.shipmentItemSubtotalTax = parseFloat(listItem['Shipment Item Subtotal Tax']));
                    (listItem['ASIN'] !== '') && (newItem.ASIN = listItem['ASIN']);
                    (listItem['Product Condition'] !== '') && (newItem.productCondition = listItem['Product Condition']);
                    (listItem['Quantity'] !== '') && (newItem.quantity = parseFloat(listItem['Quantity']));
                    (listItem['Payment Instrument Type'] !== '') && (newItem.paymentInstrumentType = listItem['Payment Instrument Type']);
                    (listItem['Order Status'] !== '') && (newItem.orderStatus = listItem['Order Status']);
                    (listItem['Shipment Status'] !== '') && (newItem.shipmentStatus = listItem['Shipment Status']);
                    (listItem['Ship Date']  !== '') && (match = listItem['Ship Date'].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+)/));
                    (listItem['Ship Date']  !== '') && (newItem.orderDate = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    (listItem['Shipping Option'] !== '') && (newItem.shippingOption = listItem['Shipping Option']);
                    (listItem['Shipping Address'] !== '') && (newItem.shippingAddress = listItem['Shipping Address']);
                    (listItem['Billing Address'] !== '') && (newItem.billingAddress = listItem['Billing Address']);
                    (listItem['Carrier Name & Tracking Number'] !== '') && (newItem.carrierNameAndTrackingNumber = listItem['Carrier Name & Tracking Number']);
                    (listItem['Product Name'] !== '') && (newItem.productName = listItem['Product Name']);
                    (listItem['Gift Message'] !== '') && (newItem.giftMessage = listItem['Gift Message']);
                    (listItem['Gift Sender Name'] !== '') && (newItem.giftSenderName = listItem['Gift Sender Name']);
                    (listItem['Gift Recipient Contact Details'] !== '') && (newItem.giftRecipientContactDetails = listItem['Gift Recipient Contact Details']);
                    return newItem;
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error){
            this.logger.log('error', `${error}`,'parseRetailOrderHistory');
            return undefined;
        }
    }

    /**
     * @param data - file 'Audible.Listening/Audible.Listening.csv' in input as Buffer
     */
    static async parseAudibleListening(data: Buffer): Promise<AudibleListeningListAM | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: AudibleListeningListAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: AudibleListeningAM = {};
                    (listItem[`${this.INIT_CHAR}"DeviceType"`] !== '') && (newItem.deviceType = listItem[`${this.INIT_CHAR}"DeviceType"`]);
                    if(listItem['StartDate'] !== '') {
                        let match = listItem['StartDate'].match(/(\d+)-(\w+)-(\d+)/);
                        let monthIndex = Months[match[2]];
                        (monthIndex) && (newItem.startDate = new Date(Date.UTC(parseInt(match[3]), parseInt(monthIndex) - 1, parseInt(match[1]), 0, 0, 0)));
                    }
                    if(listItem['EndDate'] !== '') {
                        let match = listItem['EndDate'].match(/(\d+)-(\w+)-(\d+)/);
                        let monthIndex = Months[match[2]];
                        (monthIndex) && (newItem.endDate = new Date(Date.UTC(parseInt(match[3]), parseInt(monthIndex) - 1, parseInt(match[1]), 0, 0, 0)));
                    }
                    (listItem['EventDuration'] !== '') && (newItem.eventDuration = parseFloat(listItem['EventDuration']));
                    (listItem['StartPosition'] !== '') && (newItem.startPosition = parseFloat(listItem['StartPosition']));
                    (listItem['EndPosition'] !== '') && (newItem.endPosition = parseFloat(listItem['EndPosition']));
                    (listItem['Title'] !== '') && (newItem.title = listItem['Title']);
                    (listItem['Asin'] !== '') && (newItem.asin = listItem['Asin']);
                    (listItem['BookLength'] !== '') && (newItem.bookLength = parseFloat(listItem['BookLength']));
                    (listItem['DeliveryType'] !== '') && (newItem.deliveryType = listItem['DeliveryType']);
                    (listItem['NarrationSpeed'] !== '') && (newItem.narrationSpeed = listItem['NarrationSpeed']);
                    (listItem['Bookmark'] !== '') && (newItem.bookmark = parseFloat(listItem['Bookmark']));
                    (listItem['AudioType'] !== '') && (newItem.audioType = listItem['AudioType']);
                    (listItem['AsinOwned'] !== '') && (newItem.asinOwned = listItem['AsinOwned'].toLowerCase() == 'true');
                    (listItem['ListeningMode'] !== '') && (newItem.listeningMode = listItem['ListeningMode']);
                    (listItem['Store'] !== '') && (newItem.store = listItem['Store']);
                    (listItem['AppVersion'] !== '') && (newItem.appVersion = listItem['AppVersion']);
                    (listItem['LocalTimezone'] !== '') && (newItem.localTimezone = listItem['LocalTimezone']);
                    return newItem;
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseAudibleListening');
            return undefined;
        }
    }

    /**
     * @param data - file 'Audible.MembershipBillings/Audible.MembershipBillings.csv' in input as Buffer
    */
    static async parseAudibleMembershipBillings(data: Buffer): Promise<AudibleMembershipBillingsAM | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: AudibleMembershipBillingsAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: AudibleMembershipBillingAM = {};
                    if(listItem[`${this.INIT_CHAR}"TaxCreateDate"`] !== '') {
                        let match = listItem[`${this.INIT_CHAR}"TaxCreateDate"`].match(/(\d+)-(\w+)-(\d+)/);
                        let monthIndex = Months[match[2]];
                        (monthIndex) && (newItem.taxCreateDate = new Date(Date.UTC(parseInt(match[3]), parseInt(monthIndex) - 1, parseInt(match[1]), 0, 0, 0)));
                    }
                    if(listItem['BillingPeriodEndDate'] !== '') {
                        let match = listItem['BillingPeriodEndDate'].match(/(\d+)-(\w+)-(\d+)/);
                        let monthIndex = Months[match[2]];
                        (monthIndex) && (newItem.billingPeriodEndDate = new Date(Date.UTC(parseInt(match[3]), parseInt(monthIndex) - 1, parseInt(match[1]), 0, 0, 0)));
                    }
                    if(listItem['BillingPeriodStartDate'] !== '') {
                        let match = listItem['BillingPeriodStartDate'].match(/(\d+)-(\w+)-(\d+)/);
                        let monthIndex = Months[match[2]];
                        (monthIndex) && (newItem.billingPeriodStartDate = new Date(Date.UTC(parseInt(match[3]), parseInt(monthIndex) - 1, parseInt(match[1]), 0, 0, 0)));
                    }
                    if(listItem['StatusLastupdatedDate'] !== '') {
                        let match = listItem['StatusLastupdatedDate'].match(/(\d+)-(\w+)-(\d+)/);
                        let monthIndex = Months[match[2]];
                        (monthIndex) && (newItem.statusLastUpdatedDate = new Date(Date.UTC(parseInt(match[3]), parseInt(monthIndex) - 1, parseInt(match[1]), 0, 0, 0)));
                    }
                    (listItem['BaseAmount'] !== '') && (newItem.baseAmount = parseFloat(listItem['BaseAmount']));
                    (listItem['Tax'] !== '') && (newItem.tax = parseFloat(listItem['Tax']));
                    (listItem['TotalAmount'] !== '') && (newItem.totalAmount = parseFloat(listItem['TotalAmount']));
                    (listItem['Currency'] !== '') && (newItem.currency = listItem['Currency']);
                    (listItem['Type'] !== '') && (newItem.type = listItem['Type']);
                    (listItem['Plan'] !== '') && (newItem.plan = listItem['Plan']);
                    (listItem['PlanBillingFreq'] !== '') && (newItem.planBillingFreq = parseFloat(listItem['PlanBillingFreq']));
                    (listItem['PlanBillingFee'] !== '') && (newItem.planBillingFee = parseFloat(listItem['PlanBillingFee']));
                    (listItem['OfferName'] !== '') && (newItem.offerName = listItem['OfferName']);
                    (listItem['OfferType'] !== '') && (newItem.offerType = listItem['OfferType']);
                    (listItem['TransactionId'] !== '') && (newItem.transactionId = listItem['TransactionId']);
                    (listItem['SubscriptionIdentifier'] !== '') && (newItem.subscriptionIdentifier = listItem['SubscriptionIdentifier']);
                    (listItem['PlanSelectionIdentifier'] !== '') && (newItem.planSelectionIdentifier = listItem['PlanSelectionIdentifier']);
                    (listItem['MerchantName'] !== '') && (newItem.merchantName = listItem['MerchantName']);
                    (listItem['TaxReason'] !== '') && (newItem.taxReason = listItem['TaxReason']);
                    (listItem['Status'] !== '') && (newItem.status = listItem['Status']);
                    return newItem;
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseAudibleMembershipBillings');
            return undefined;
        }
    }

    /**
     * @param data - file 'Digital.PrimeVideo.ViewCounts.2/Digital.PrimeVideo.ViewCounts.2.csv' in input as Buffer
     */
    static async parseDigitalPrimeVideoViewCounts(data: Buffer): Promise<DigitalPrimeVideoViewCountsAM | undefined> {
        try {
            let result: any = Parser.parseCSVfromBuffer(data)?.pop();
            if (result) {
                let model: DigitalPrimeVideoViewCountsAM = {};
                (result[`${this.INIT_CHAR}# TV shows watched`] !== '') && (model.showTVWatched = parseInt(result[`${this.INIT_CHAR}# TV shows watched`]));
                (result['# kids titles watched'] !== '') && (model.kidsTitlesWatched = parseInt(result['# kids titles watched']));
                (result['# movies watched'] !== '') && (model.moviesWatched = parseInt(result['# movies watched']));
                (result['# non-kids titles watched'] !== '') && (model.nonKidsTitlesWatched = parseInt(result['# non-kids titles watched']));
                (result['# prime TV titles watched'] !== '') && (model.primeTVTitlesWatched = parseInt(result['# prime TV titles watched']));
                (result['# prime movie titles watched'] !== '') && (model.primeMovieTitlesWatched = parseInt(result['# prime movie titles watched']));
                (result['# prime titles watched'] !== '') && (model.primeTitlesWatched = parseInt(result['# prime titles watched']));
                (result['# rent/buy TV titles watched'] !== '') && (model.rentBuyTVTitlesWatched = parseInt(result['# rent/buy TV titles watched']));
                (result['# rent/buy movies watched'] !== '') && (model.rentBuyMoviesWatched = parseInt(result['# rent/buy movies watched']));
                (result['# rent/buy titles watched'] !== '') && (model.rentBuyTitlesWatched = parseInt(result['# rent/buy titles watched']));
                (result['# titles added to watchlist'] !== '') && (model.titlesAddedToWatchlist = parseInt(result['# titles added to watchlist']));
                (result['# titles purchased/rented'] !== '') && (model.titlesPurchasedRented = parseInt(result['# titles purchased/rented']));
                (result['# titles watched'] !== '') && (model.titlesWatched = parseInt(result['# titles watched']));
                (result['home country'] !== '') && (model.homeCountry = result['home country']);
                return !Validator.objectIsEmpty(model) ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseDigitalPrimeVideoViewCounts');
            return undefined;
        }
    }

    /**
     * @param data - file 'Digital.Subscriptions/Subscriptions.csv' in input as Buffer
     */
    static async parseDigitalSubscriptions(data: Buffer): Promise<DigitalSubscriptionsAM | undefined> {
        try {
            let result: any = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: DigitalSubscriptionsAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: DigitalSubscriptionAM = {};
                    (listItem[`${this.INIT_CHAR}SubscriptionId`] !== '' && listItem['${this.INIT_CHAR}SubscriptionId'] !== 'N/A') && (newItem.subscriptionId = listItem[`${this.INIT_CHAR}SubscriptionId`]);
                    (listItem['BaseSubscriptionId'] !== '' && listItem['BaseSubscriptionId'] !== 'N/A') && (newItem.baseSubscriptionId = listItem['BaseSubscriptionId']);
                    (listItem['ShippingAddress'] !== ''  && listItem['ShippingAddress'] !== 'N/A') && (newItem.shippingAddress = listItem['ShippingAddress']);
                    (listItem['Marketplace'] !== '' && listItem['Marketplace'] !== 'N/A') && (newItem.marketplace = listItem['Marketplace']);
                    (listItem['SubscriptionPlanId'] !== '' && listItem['SubscriptionPlanId'] !== 'N/A') && (newItem.subscriptionPlanId = listItem['SubscriptionPlanId']);
                    (listItem['SubscriptionStatus'] !== '' && listItem['SubscriptionStatus'] !== 'N/A') && (newItem.subscriptionStatus = listItem['SubscriptionStatus']);
                    if(listItem['SubscriptionStatusDate'] !== '' && listItem['SubscriptionStatusDate'] !== 'N/A') {
                        let match = listItem['SubscriptionStatusDate'].match(/(\d+)-(\d+)-(\d+)/);
                        (match) && (newItem.subscriptionStatusDate = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), 0, 0, 0)));
                    }
                    (listItem['ActivePaymentPlanId'] !== '' && listItem['ActivePaymentPlanId'] !== 'N/A') && (newItem.activePaymentPlanId = listItem['ActivePaymentPlanId']);
                    (listItem['Autorenew'] !== '' && listItem['Autorenew'] !== 'N/A') && (newItem.autoRenew = listItem['Autorenew'].toLowerCase() === 'yes');
                    if(listItem['SubscriptionStartDate'] !== '' && listItem['SubscriptionStartDate'] !== 'N/A') {
                        let match = listItem['SubscriptionStartDate'].match(/(\d+)-(\d+)-(\d+)/);
                        (match) && (newItem.subscriptionStartDate = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), 0, 0, 0)));
                    }
                    (listItem['WalletCyclingPreferenceEnabled'] !== '' && listItem['WalletCyclingPreferenceEnabled'] !== 'N/A') && (newItem.walletCyclingPreferenceEnabled = listItem['WalletCyclingPreferenceEnabled'].toLowerCase() === 'yes');
                    (listItem['ServiceProvider'] !== '' && listItem['ServiceProvider'] !== 'N/A') && (newItem.serviceProvider = listItem['ServiceProvider']);
                    (listItem['RecordVersionNumber'] !== '' && listItem['RecordVersionNumber'] !== 'N/A') && (newItem.recordVersionNumber = listItem['RecordVersionNumber']);
                    (listItem['ContractTimeInterval'] !== '' && listItem['ContractTimeInterval'] !== 'N/A') && (newItem.contractTimeInterval = listItem['ContractTimeInterval']);
                    (listItem['HaveSubscriptionProblem'] !== '' && listItem['HaveSubscriptionProblem'] !== 'N/A') && (newItem.haveSubscriptionProblem = listItem['HaveSubscriptionProblem'].toLowerCase() === 'yes');
                    (listItem['MaxNumOfBeneficiaries'] !== '' && listItem['MaxNumOfBeneficiaries'] !== 'N/A') && (newItem.maxNumOfBeneficiaries = parseFloat(listItem['MaxNumOfBeneficiaries']));
                    if(listItem['ScheduledResumeDateForPausedSubscription'] !== '' && listItem['ScheduledResumeDateForPausedSubscription'] !== 'N/A') {
                        let match = listItem['ScheduledResumeDateForPausedSubscription'].match(/(\d+)-(\d+)-(\d+)/);
                        (match) && (newItem.scheduledResumeDateForPausedSubscription = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), 0, 0, 0)));
                    }
                    (listItem['CurrentPlanGifted'] !== '' && listItem['CurrentPlanGifted'] !== 'N/A') && (newItem.currentPlanGifted = listItem['CurrentPlanGifted'].toLowerCase() === 'yes');
                    (listItem['BillingScheduleId'] !== '' && listItem['BillingScheduleId'] !== 'N/A') && (newItem.billingScheduleId = listItem['BillingScheduleId']);
                    if(listItem['NextBillDate'] !== '' && listItem['NextBillDate'] !== 'N/A') {
                        let match = listItem['NextBillDate'].match(/(\d+)-(\d+)-(\d+)/);
                        (match) && (newItem.nextBillDate = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), 0, 0, 0)));
                    }
                    (listItem['NextBillAmount'] !== '' && listItem['NextBillAmount'] !== 'N/A') && (newItem.nextBillAmount = parseFloat(listItem['NextBillAmount']));
                    (listItem['BaseCurrencyCode'] !== '' && listItem['BaseCurrencyCode'] !== 'N/A') && (newItem.baseCurrencyCode = listItem['BaseCurrencyCode']);
                    (listItem['CurrentBillingPeriod'] !== '' && listItem['CurrentBillingPeriod'] !== 'N/A') && (newItem.currentBillingPeriod = parseFloat(listItem['CurrentBillingPeriod']));
                    if(listItem['BillingPeriodStartDate'] !== '' && listItem['BillingPeriodStartDate'] !== 'N/A') {
                        let match = listItem['BillingPeriodStartDate'].match(/(\d+)-(\d+)-(\d+)/);
                        (match) && (newItem.billingPeriodStartDate = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), 0, 0, 0)));
                    }
                    (listItem['CurrentContractPeriod'] !== '' && listItem['CurrentContractPeriod'] !== 'N/A') && (newItem.currentContractPeriod = parseFloat(listItem['CurrentContractPeriod']));
                    if(listItem['ContractPeriodStartDate'] !== '' && listItem['ContractPeriodStartDate'] !== 'N/A') {
                        let match = listItem['ContractPeriodStartDate'].match(/(\d+)-(\d+)-(\d+)/);
                        (match) && (newItem.contractPeriodStartDate = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), 0, 0, 0)));
                    }
                    if(listItem['ContractEndDate'] !== '' && listItem['ContractEndDate'] !== 'N/A') {
                        let match = listItem['ContractEndDate'].match(/(\d+)-(\d+)-(\d+)/);
                        (match) && (newItem.contractEndDate = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), 0, 0, 0)));
                    }
                    return newItem;
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseDigitalSubscriptions');
            return undefined;
        }
    }

    /**
     * @param data - file 'LightWeightInteractions/LightWeightInteractions.csv' in input as Buffer
     */
    static async parseLightWeightInteractions(data: Buffer): Promise<LightWeightInteractionsAM | undefined> {
        try {
            let result: any = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: LightWeightInteractionsAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: LightWeightInteractionAM = {};
                    if(listItem[`${this.INIT_CHAR}CreationTime`] !== '') {
                        let match = listItem[`${this.INIT_CHAR}CreationTime`].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+) UTC/);
                        (match) && (newItem.creationTime = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    }
                    (listItem['InteractableType'] !== '') && (newItem.interactableType = listItem['InteractableType']);
                    (listItem['InteractableURL'] !== '') && (newItem.interactableURL = listItem['InteractableURL']);
                    if(listItem['InteractionTime'] !== '') {
                        let match = listItem['InteractionTime'].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+) UTC/);
                        (match) && (newItem.interactionTime = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    }
                    (listItem['InteractionType'] !== '') && (newItem.interactionType = listItem['InteractionType']);
                    (listItem['InteractionValue'] !== '') && (newItem.interactionValue = listItem['InteractionValue']);
                    (listItem['Marketplace'] !== '') && (newItem.marketplace = listItem['Marketplace']);
                    if(listItem['ModificationTime'] !== '') {
                        let match = listItem['ModificationTime'].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+) UTC/);
                        (match) && (newItem.modificationTime = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    }
                    (listItem['Suppressed'] !== '') && (newItem.suppressed = listItem['Suppressed'].toLowerCase() === 'true');
                    (listItem['Version'] !== '') && (newItem.version = listItem['Version']);
                    return newItem;
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseLightWeightInteractions');
            return undefined;
        }
    }

    /**
     * @param data - file 'Retail.Seller-Feedback.2/Retail.Seller-Feedback.csv' in input as Buffer
     */
    static async parseRetailSellerFeedback(data: Buffer): Promise<RetailSellerFeedbacksAM | undefined> {
        try {
            let result: any = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: RetailSellerFeedbacksAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: RetailSellerFeedbackAM = {};
                    (listItem[`${this.INIT_CHAR}OrderId`] !== '') && (newItem.orderId = listItem[`${this.INIT_CHAR}OrderId`]);
                    (listItem['Marketplace'] !== '') && (newItem.marketplace = listItem['Marketplace']);
                    if(listItem['FeedbackDate'] !== '') {
                        let match = listItem['FeedbackDate'].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+)/);
                        (match) && (newItem.feedbackDate = new Date(Date.UTC(parseInt(match[3]), parseInt(match[2]) - 1, parseInt(match[1]), parseInt(match[4]), parseInt(match[5]), 0)));
                    }
                    (listItem['FeedbackText'] !== '') && (newItem.feedbackText = listItem['FeedbackText']);
                    (listItem['FeedbackRating'] !== '') && (newItem.feedbackRating = parseInt(listItem['FeedbackRating']));
                    (listItem['Deal Again'] !== '') && (newItem.dealAgain = listItem['Deal Again']);
                    (listItem['Did Item Arrived OnTime'] !== '') && (newItem.didItemArrivedOnTime = listItem['Did Item Arrived OnTime'].toLowerCase() === 'yes');
                    (listItem['Item as described by the seller'] !== '') && (newItem.itemAsDescribedBySeller = listItem['Item as described by the seller'].toLowerCase() === 'yes');
                    (listItem['Prompt and courteous service'] !== '') && (newItem.promptAndCourteousService = listItem['Prompt and courteous service'].toLowerCase() === 'yes');
                    (listItem['What Went Wrong'] !== '') && (newItem.whatWentWrong = listItem['What Went Wrong']);
                    (listItem['Is feedback removed'] !== '') && (newItem.isFeedbackRemoved = listItem['Is feedback removed'].toLowerCase() === 'yes');
                    (listItem['Feedback removed by'] !== '') && (newItem.feedbackRemovedBy = listItem['Feedback removed by']);
                    (listItem['Reason for removal'] !== '') && (newItem.reasonForRemoval = listItem['Reason for removal']);
                    return newItem;
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseRetailSellerFeedback');
            return undefined;
        }
    }

    /**
     * @param data - file 'Retail.RegionAuthority.2/Retail.RegionAuthority.2.csv' in input as Buffer
     */
    static async parseRetailRegionAuthorities(data: Buffer): Promise<RetailRegionAuthoritiesAM | undefined> {
        try {
            let result: any = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: RetailRegionAuthoritiesAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: RetailRegionAuthorityAM = {};
                    (listItem[`${this.INIT_CHAR}Postal Code`] !== '') && (newItem.postalCode = listItem[`${this.INIT_CHAR}Postal Code`]);
                    (listItem['District'] !== '') && (newItem.district = listItem['District']);
                    (listItem['City'] !== '') && (newItem.city = listItem['City']);
                    (listItem['State or Province'] !== '') && (newItem.stateOrProvince = listItem['State or Province']);
                    (listItem['State Code'] !== '') && (newItem.stateCode = listItem['State Code']);
                    (listItem['Country Code'] !== '') && (newItem.countryCode = listItem['Country Code']);
                    (listItem['Timestamp'] !== '') && (newItem.date = new Date(listItem['Timestamp']));
                    return newItem;
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseRetailRegionAuthorities');
            return undefined;
        }
    }


}

