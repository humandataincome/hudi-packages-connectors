import Logger from "../utils/logger";
import {
    AdvertiserAudiences,
    AdvertiserClicked,
    AmazonAudiences,
    AmazonWishlists,
    AudibleLibrary,
    AudioBook,
    Item,
    PrimeVideoViewingHistory,
    PrimeVideoWatchlist,
    PrimeVideoWatchlistHistory,
    RetailOrder,
    RetailOrderHistory,
    Search,
    SearchDataCustomerEngagement,
    ThirdPartyAudiences,
    Title,
    TwitchPrimeSubscription,
    TwitchPrimeSubscriptions,
    ViewingActivity,
    WishList
} from "../models/amazon.model";
import {Parser} from "../utils/parser";

/**
 * Class used to parse most important files into the directory returned by Amazon in CSV and JSON format.
 * All the files are given in input as Buffer, parsed to JSON and then mapped into a specific interface model.
 * All functions return the relevant information (if there are any) as a promised model if the parsing is successful, undefined otherwise.
 */
export class AmazonService {
    private logger = new Logger("Amazon Service");
    /**
     * @param data - file 'Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.Watchlist.csv' in input as Buffer
     * @return {Promise<PrimeVideoWatchlist | undefined>}
     */
    async parsePrimeVideoWatchlist(data: Buffer): Promise<PrimeVideoWatchlist | undefined> {
        try {
            let result: Array<any> = <Array<object>>Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: PrimeVideoWatchlist = {list: []}
                result.map((listItem) => {
                    let newItem: Title = {}, match;
                    (listItem.catalogTitle != '') && (newItem.catalogTitle = listItem.catalogTitle);
                    (listItem['﻿"itemAddedDate"'] != '') && (match = listItem['﻿"itemAddedDate"'].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+)/));
                    (listItem['﻿"itemAddedDate"'] != '') && (newItem.itemAddedDate = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), 0)));
                    model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (e: any){
            this.logger.log('error', `${e}`,'parsePrimeVideoWatchlist');
        }
    }

    /**
     * @param data - file 'Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.WatchlistHistory.csv' in input as Buffer
     * @return {Promise<PrimeVideoWatchlistHistory | undefined>}
     */
    async parsePrimeVideoWatchlistHistory(data: Buffer): Promise<PrimeVideoWatchlistHistory | undefined> {
        try {
            let result: Array<any> = <Array<object>>Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: PrimeVideoWatchlistHistory = {list: []}
                result.map((listItem) => {
                    let newItem: Title = {}, match;
                    (listItem['﻿"listId"'] != '') && (newItem.listId = listItem['﻿"listId"']);
                    (listItem.itemAddedDate != '') && (match = listItem.itemAddedDate.match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+)/));
                    (listItem.itemAddedDate != '') && (newItem.itemAddedDate = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), 0)));
                    (listItem.itemType != '') && (newItem.itemType = listItem.itemType);
                    (listItem.deleted != '') && (newItem.deleted = listItem.deleted == '1');
                    (listItem.catalogTitle != '') && (newItem.catalogTitle = listItem.catalogTitle);
                    model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (e: any){
            this.logger.log('error', `${e}`,'parsePrimeVideoWatchlistHistory');
        }
    }

    /**
     * @param data - file 'Digital.PrimeVideo.Viewinghistory/Digital.PrimeVideo.Viewinghistory.csv' in input as Buffer
     * @return {Promise<PrimeVideoViewingHistory | undefined>}
     */
    async parsePrimeVideoViewingHistory(data: Buffer): Promise<PrimeVideoViewingHistory | undefined> {
        try {
            let result: Array<any> = <Array<object>>Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: PrimeVideoViewingHistory = {list: []}
                result.map((listItem) => {
                    let newItem: ViewingActivity = {}, match;
                    (listItem['﻿Playback Hour']  != '') && (match = listItem['﻿Playback Hour'].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+)/));
                    (listItem['﻿Playback Hour']  != '') && (newItem.playbackHour = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    (listItem['Operating System'] != '') && (newItem.operatingSystem = listItem['Operating System']);
                    (listItem['Browser'] != '') && (newItem.browser = listItem['Browser']);
                    (listItem['Delivery Type'] != '') && (newItem.deliveryType = listItem['Delivery Type']);
                    (listItem['City'] != '') && (newItem.city = listItem['City']);
                    (listItem['Country'] != '') && (newItem.country = listItem['Country']);
                    (listItem['ISP'] != '') && (newItem.ISP = listItem['ISP']);
                    (listItem['State'] != '') && (newItem.state = listItem['State']);
                    (listItem['Content Quality Entitled'] != '') && (newItem.contentQuality = listItem['Content Quality Entitled']);
                    (listItem['Entitlement Type'] != '') && (newItem.entitlementType = listItem['Entitlement Type']);
                    (listItem['Video Type'] != '') && (newItem.videoType = listItem['Video Type']);
                    (listItem['Audio Language'] != '') && (newItem.audioLanguage = listItem['Audio Language']);
                    (listItem['Title'] != '') && (newItem.title = listItem['Title']);
                    model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (e: any){
            this.logger.log('error', `${e}`,'parsePrimeVideoViewingHistory');
        }
    }

    /**
     * @param data - file 'Search-Data/Search-Data.Customer-Engagement.csv' in input as Buffer
     * @return {Promise<SearchDataCustomerEngagement | undefined>}
     */
    async parseSearchDataCustomerEngagement(data: Buffer): Promise<SearchDataCustomerEngagement | undefined> {
        try {
            let result: Array<any> = <Array<object>>Parser.parseCSVfromBuffer(data);
            //console.log(result)
            if(result) {
                let model: SearchDataCustomerEngagement = {list: []}
                result.map((listItem) => {
                    let newItem: Search = {}, match;
                    (listItem['﻿First Search Time (GMT)'] != '') && (match = listItem['﻿First Search Time (GMT)'].match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/));
                    (listItem['﻿First Search Time (GMT)'] != '') && (newItem.firstSearchTime = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    (listItem['Country ID'] != '') && (newItem.countryID = listItem['Country ID']);
                    (listItem['All Department (APS) or Category'] != '') && (newItem.APSorCategory = listItem['All Department (APS) or Category']);
                    (listItem['Site Variant'] != '') && (newItem.siteVariant = listItem['Site Variant']);
                    (listItem['Application / Browser Name'] != '') && (newItem.appOrBrowser = listItem['Application / Browser Name']);
                    (listItem['Device Model'] != '') && (newItem.deviceModel = listItem['Device Model']);
                    (listItem['Search Type (Keyword,Visual,Browse)'] != '') && (newItem.searchType = listItem['Search Type (Keyword,Visual,Browse)']);
                    (listItem['Session ID'] != '') && (newItem.sessionID = listItem['Session ID']);
                    (listItem['Query ID'] != '') && (newItem.queryID = listItem['Query ID']);
                    (listItem['Prime Customer (Y/N)'] != '') && (newItem.primeCustomer = listItem['Prime Customer (Y/N)'] == '1');
                    (listItem['Is From External Link (Y/N)'] != '') && (newItem.isFromExternalLink = listItem['Is From External Link (Y/N)'] == '1');
                    (listItem['Search From External Site (Y/N)'] != '') && (newItem.searchFromExternalSite = listItem['Search From External Site (Y/N)']);
                    (listItem['First Search Query String'] != '') && (newItem.firstSearchQuery = listItem['First Search Query String']);
                    (listItem['Application Name'] != '') && (newItem.applicationName = listItem['Application Name']);
                    (listItem['App Version'] != '') && (newItem.appVersion = listItem['App Version']);
                    (listItem['Operating System Name'] != '') && (newItem.operatingSystemName = listItem['Operating System Name']);
                    (listItem['Operating System Version'] != '') && (newItem.operatingSystemVersion = listItem['Operating System Version']);
                    (listItem['Device Type ID'] != '') && (newItem.deviceTypeID = listItem['Device Type ID']);
                    (listItem['Device Category'] != '') && (newItem.deviceCategory = listItem['Device Category']);
                    (listItem['Customer IP'] != '') && (newItem.customerIP = listItem['Customer IP']);
                    (listItem['Search Method'] != '') && (newItem.searchMethod = listItem['Search Method']);
                    (listItem['Keywords'] != '') && (newItem.keywords = listItem['Keywords']);
                    (listItem['Amazon Business Customer (Y/N)'] != '') && (newItem.isBusinessCustomer = listItem['Amazon Business Customer (Y/N)'] == '1');
                    (listItem['Language'] != '') && (newItem.language = listItem['Language']);
                    (listItem['Server'] != '') && (newItem.server = listItem['Server']);
                    (listItem['Amazon Fresh Customer (Y/N)'] != '') && (newItem.isFreshCustomer = listItem['Amazon Fresh Customer (Y/N)'] == '1');
                    (listItem['Music Subscriber (Y/N)'] != '') && (newItem.isMusicSubscriber = listItem['Music Subscriber (Y/N)'] == '1');
                    (listItem['First Browse Node'] != '') && (newItem.firstBrowseNode = listItem['First Browse Node']);
                    (listItem['Last search Time (GMT)'] != '') && (match = listItem['Last search Time (GMT)'].match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+).0/));
                    (listItem['Last search Time (GMT)'] != '') && (newItem.lastSearchTime = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    (listItem['Last Department'] != '') && (newItem.lastDepartment = listItem['Last Department']);
                    (listItem['Last Browse Node'] != '') && (newItem.lastBrowseNode = listItem['Last Browse Node']);
                    (listItem['Last Known Customer ID'] != '') && (newItem.lastKnownCustomerID = listItem['Last Known Customer ID']);
                    (listItem['First Added Item'] != '') && (newItem.firstAddedItem = listItem['First Added Item']);
                    (listItem['First Purchased Item'] != '') && (newItem.firstPurchasedItem = listItem['First Purchased Item']);
                    (listItem['First Consumed Item (Subscription)'] != '') && (newItem.firstConsumedItem = listItem['First Consumed Item (Subscription)']);
                    (listItem['Number of Clicked Items'] != '') && (newItem.numberClickedItem = listItem['Number of Clicked Items']);
                    (listItem['Number of Items Added to Cart'] != '') && (newItem.numberItemsAddedCart = listItem['Number of Items Added to Cart']);
                    (listItem['Number of Items Ordered'] != '') && (newItem.numberItemsOrdered = listItem['Number of Items Ordered']);
                    (listItem['Number of Paid Items Ordered'] != '') && (newItem.numberPaidItemsOrdered = listItem['Number of Paid Items Ordered']);
                    (listItem['Number of Free Items Ordered'] != '') && (newItem.numberFreeItemsOrdered = listItem['Number of Free Items Ordered']);
                    (listItem['Units Ordered'] != '') && (newItem.unitsOrdered = listItem['Units Ordered']);
                    (listItem['Paid Units Ordered'] != '') && (newItem.paidUnitsOrdered = listItem['Paid Units Ordered']);
                    (listItem['Free Units Ordered'] != '') && (newItem.freeUnitsOrdered = listItem['Free Units Ordered']);
                    (listItem['Maximum Purchase Price'] != '') && (newItem.maximumPurchasePrice = listItem['Maximum Purchase Price']);
                    (listItem['Clicked Any Item (Y/N)'] != '') && (newItem.clickedAnyItem = listItem['Clicked Any Item (Y/N)'] == '1');
                    (listItem['Added Any Item (Y/N)'] != '') && (newItem.addedAnyItem = listItem['Added Any Item (Y/N)'] == '1');
                    (listItem['Purchased Any Item (Y/N)'] != '') && (newItem.purchasedAnyItem = listItem['Purchased Any Item (Y/N)'] == '1');
                    (listItem['Department Count'] != '') && (newItem.departmentCount = listItem['Department Count']);
                    (listItem['Shopping Refinement'] != '') && (newItem.shoppingRefinement = listItem['Shopping Refinement']);
                    (listItem['Number of Shopping Refinements'] != '') && (newItem.numberShoppingRefinements = listItem['Number of Shopping Refinements']);
                    (listItem['Highest Number of Shopping Refinements'] != '') && (newItem.highestNumberShoppingRefinements = listItem['Highest Number of Shopping Refinements']);
                    (listItem['Items Consumed (Subscription)'] != '') && (newItem.itemConsumed = listItem['Items Consumed (Subscription)']);
                    (listItem['Shopping Refinement Pickers'] != '') && (newItem.shoppingRefinementPickers = listItem['Shopping Refinement Pickers']);
                    (listItem['Paid Purchase (Y/N)'] != '') && (newItem.paidPurchase = listItem['Paid Purchase (Y/N)'] == '1');
                    (listItem['Item Borrowed (Y/N)'] != '') && (newItem.isItemBorrowed = listItem['Item Borrowed (Y/N)'] == '1');
                    (listItem['Items Borrowed'] != '') && (newItem.itemsBorrowed = listItem['Items Borrowed']);
                    (listItem['Next Query Group via Click'] != '') && (newItem.nextQueryGroupViaClick = listItem['Next Query Group via Click']);
                    (listItem['Query Abandoned (Y/N)'] != '') && (newItem.queryAbandoned = listItem['Query Abandoned (Y/N)'] == '1');
                    (listItem['Query Reformulated (Y/N)'] != '') && (newItem.queryReformulated = listItem['Query Reformulated (Y/N)'] == '1');
                    (listItem['Amazon Fresh (Y/N)'] != '') && (newItem.amazonFresh = listItem['Amazon Fresh (Y/N)'] == '1');
                    (listItem['Store Visited'] != '') && (newItem.storeVisited = listItem['Store Visited']);
                    (listItem['Department'] != '') && (newItem.department = listItem['Department']);
                    (listItem['Browse Node'] != '') && (newItem.browserNode = listItem['Browse Node']);
                    (listItem['First Search Domain'] != '') && (newItem.firstSearchDomain = listItem['First Search Domain']);
                    (listItem['Is First Search From External Ad'] != '') && (newItem.isFirstSearchFromExternalAd = listItem['Is First Search From External Ad'].toLowerCase() == 'yes');
                    (listItem['User Agent Info Family'] != '') && (newItem.userAgentInfoFamily = listItem['User Agent Info Family']);
                    (listItem.LKCI != '') && (newItem.LKCI = listItem['LKCI']);
                    model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (e: any){
            this.logger.log('error', `${e}`,'parseSearchDataCustomerEngagement');
        }
    }

    /**
     * @param data - file 'Amazon.Lists.Wishlist.2.1/Amazon.Lists.Wishlist.json' in input as Buffer
     * @return {Promise<AmazonWishlists | undefined>}
     */
    async parseAmazonWishlists(data: Buffer): Promise<AmazonWishlists | undefined> {
        try {
            let document = JSON.parse(data.toString());
            if(document) {
                let regex = /(.*) \[(.*)]/;
                let model: AmazonWishlists = {lists: []};
                let wishList: WishList = {itemList: []};
                document.forEach((value: any) => {
                    let keys = Object.keys(value);
                    let match = keys[0].match(regex);
                    if(match) {
                        if(match[2] == 'List') {
                            value[keys[0]].map((parameter: any) => {
                                let parameterKeys = Object.keys(parameter);
                                (parameterKeys[0] == 'listName') && (wishList.listName = parameter.listName);
                                (parameterKeys[0] == 'privacy') && (wishList.privacy = parameter.privacy);
                                (parameterKeys[0] == 'view') && (wishList.view = parameter.view);
                                (parameterKeys[0] == 'recentActivityDate') && (wishList.recentActivityDate = new Date(parameter.recentActivityDate));
                            });
                        } else if(match[1] && match[2] == 'Item 1') {
                            let item: Item = {};
                            value[keys[0]].map((parameter: any) => {
                                let parameterKeys = Object.keys(parameter);
                                (parameterKeys[0] == 'asin') && (item.asin = parameter.asin);
                                (parameterKeys[0] == 'quantity') && (item.quantity = parameter.quantity);
                                (parameterKeys[0] == 'privacy') && (item.privacy = parameter.privacy);
                                (parameterKeys[0] == 'deleted') && (item.deleted = parameter.deleted.toLowerCase() == 'true');
                                (parameterKeys[0] == 'fullyPurchasedWithoutSpoilingSurprise') && (item.fullyPurchasedWithoutSpoilingSurprise = parameter.fullyPurchasedWithoutSpoilingSurprise.toLowerCase() == 'true');
                                (parameterKeys[0] == 'fullyPurchased') && (item.fullyPurchased = parameter.fullyPurchased.toLowerCase() == 'true');
                                (parameterKeys[0] == 'amount' && parameter.amount.value) && (item.value = parameter.amount.value);
                                (parameterKeys[0] == 'amount' && parameter.amount.currencyUnit) && (item.currencyUnit = parameter.amount.currencyUnit);
                                wishList.itemList.push(item);
                            });
                        } else if(match[2] == 'User') {
                            value[keys[0]].map((parameter: any) => {
                                let parameterKeys = Object.keys(parameter);
                                (parameterKeys[0] == 'emailAddress') && (wishList.emailAddress = parameter.emailAddress);
                                (parameterKeys[0] == 'roleName') && (wishList.roleName = parameter.roleName);
                                (parameterKeys[0] == 'nodeFlags') && (wishList.nodeFlags = parameter.nodeFlags);
                            });
                            model.lists.push(wishList);
                            console.log(wishList.itemList);
                            wishList = {itemList: []};
                        }
                    }
                });
                return model.lists.length > 0 ? model : undefined;
            }
        } catch (e: any){
            this.logger.log('error', `${e}`,'parseAmazonWishlists');
        }
    }


    /**
     * @param data - file 'Audible.Library/Audible.Library.csv' in input as Buffer
     * @return {Promise<AudibleLibrary | undefined>}
     */
    async parseAudibleLibrary(data: Buffer): Promise<AudibleLibrary | undefined> {
        try {
            let result: Array<any> = <Array<object>>Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: AudibleLibrary = {list: []}
                result.map((listItem) => {
                    let newItem: AudioBook = {}, match, month;
                    (listItem['﻿"DateAdded"'] != '') && (match = listItem['﻿"DateAdded"'].match(/(\d+)-(\w+)-(\d+)/));
                    (listItem['﻿"DateAdded"'] != '') && (month = Parser.parseAudibleDate(match[2]));
                    (month && month != -1) && (newItem.dateAdded = new Date(Date.UTC(parseInt(match[3]), month - 1, parseInt(match[1]), 0, 0, 0)));
                    (listItem.Title != '') && (newItem.title = listItem.Title);
                    (listItem.Asin != '') && (newItem.asin = listItem.Asin);
                    (listItem.IsDownloaded != '') && (newItem.isDownloaded = listItem.IsDownloaded.toLowerCase() == 'y');
                    (listItem.IsDeleted != '') && (newItem.isDeleted = listItem.IsDeleted.toLowerCase() == 'y');
                    (listItem.DeleteBy != '') && (newItem.deleteBy = listItem.DeleteBy);
                    (listItem.DateDeleted != '') && (match = listItem.DateDeleted.match(/(\d+)-(\w+)-(\d+)/));
                    (listItem.DateDeleted != '') && (month = Parser.parseAudibleDate(match[2]));
                    (month && month != -1) && (newItem.dateDeleted = new Date(Date.UTC(parseInt(match[3]), month - 1, parseInt(match[1]), 0, 0, 0)));
                    (listItem.IsPublic != '') && (newItem.isPublic = listItem.IsPublic.toLowerCase() == 'y');
                    (listItem.IsStreamed != '') && (newItem.isStreamed = listItem.IsStreamed.toLowerCase() == 'y');
                    (listItem.IsPreorder != '') && (newItem.isPreorder = listItem.IsPreorder.toLowerCase() == 'y');
                    (listItem.Downloads != '') && (newItem.downloads = listItem.Downloads);
                    (listItem.DateFirstDownloaded != '') && (match = listItem.DateFirstDownloaded.match(/(\d+)-(\w+)-(\d+)/));
                    (listItem.DateFirstDownloaded != '') && (month = Parser.parseAudibleDate(match[2]));
                    (month && month != -1) && (newItem.dateFirstDownloaded = new Date(Date.UTC(parseInt(match[3]), month - 1, parseInt(match[1]), 0, 0, 0)));
                    (listItem.OrderNumber != '') && (newItem.orderNumber = listItem.OrderNumber);
                    (listItem.OriginType != '') && (newItem.originType = listItem.OriginType);
                    model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (e: any){
            this.logger.log('error', `${e}`,'parseAudibleLibrary');
        }
    }

    /**
     * @param data - file 'Advertising.{X}/Advertising.AdvertiserAudiences.csv' in input as Buffer
     * @return {Promise<AdvertiserAudiences | undefined>}
     */
    async parseAdvertiserAudiences(data: Buffer): Promise<AdvertiserAudiences | undefined> {
        try {
            let result: Array<any> = <Array<object>>Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: AdvertiserAudiences = {list: []}
                result.map((listItem) => {
                    let parameter = '﻿Advertisers who brought audiences in which you are included';
                    (listItem[parameter] != '') && (model.list.push({value: listItem[parameter]}));
                });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (e: any){
            this.logger.log('error', `${e}`,'parseAdvertiserAudiences');
        }
    }

    /**
     * @param data - file 'Advertising.{X}/Advertising.AdvertiserClicks.csv' in input as Buffer
     * @return {Promise<AdvertiserClicked | undefined>}
     */
    async parseAdvertiserClicked(data: Buffer): Promise<AdvertiserClicked | undefined> {
        try {
            let result: Array<any> = <Array<object>>Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: AdvertiserClicked = {list: []}
                result.map((listItem) => {
                    let parameter = '﻿Advertisers whose ads you clicked';
                    (listItem[parameter] != '') && (model.list.push({value: listItem[parameter]}));
                });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (e: any){
            this.logger.log('error', `${e}`,'parseAdvertiserClicked');
        }
    }

    /**
     * @param data - file 'Advertising.{X}/Advertising.3PAudiences.csv' in input as Buffer
     * @return {Promise<ThirdPartyAudiences | undefined>}
     */
    async parseThirdPartyAudiences(data: Buffer): Promise<ThirdPartyAudiences | undefined> {
        try {
            let result: Array<any> = <Array<object>>Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: ThirdPartyAudiences = {list: []}
                result.map((listItem) => {
                    let parameter = '﻿Audiences in which you are included via 3rd Parties';
                    (listItem[parameter] != '') && (model.list.push({value: listItem[parameter]}));
                });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (e: any){
            this.logger.log('error', `${e}`,'parseThirdPartyAudiences');
        }
    }

    /**
     * @param data - file 'Advertising.{X}/Advertising.AmazonAudiences.csv' in input as Buffer
     * @return {Promise<AmazonAudiences | undefined>}
     */
    async parseAmazonAudiences(data: Buffer): Promise<AmazonAudiences | undefined> {
        try {
            let result: Array<any> = <Array<object>>Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: AmazonAudiences = {list: []}
                result.map((listItem) => {
                    let parameter = '﻿Amazon Audiences in which you are included';
                    (listItem[parameter] != '') && (model.list.push({value: listItem[parameter]}));
                });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (e: any){
            this.logger.log('error', `${e}`,'parseAmazonAudiences');
        }
    }

    /**
     * @param data - file 'AmazonGames/AmazonGames.TwitchPrime.SubscriptionCreditHistory.csv' in input as Buffer
     * @return {Promise<TwitchPrimeSubscriptions | undefined>}
     */
    async parseTwitchPrimeSubscription(data: Buffer): Promise<TwitchPrimeSubscriptions | undefined> {
        try {
            let result: Array<any> = <Array<object>>Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: TwitchPrimeSubscriptions = {list: []}
                result.map((listItem) => {
                    let newItem: TwitchPrimeSubscription = {}, match;
                    (listItem['﻿Timestamp'] != '') && (match = listItem['﻿Timestamp'].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+)/));
                    (match) && (newItem.date = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), 0)));
                    (listItem.BalanceTrackerOperation != '') && (newItem.balanceTrackerOperation = listItem.BalanceTrackerOperation);
                    (listItem.SubscriptionCreditOperation != '') && (newItem.subscriptionCreditOperation = listItem.SubscriptionCreditOperation);
                    (listItem.SubscriptionCreditsSpent != '') && (newItem.subscriptionCreditsSpent = listItem.SubscriptionCreditsSpent);
                    (listItem.ProcessedSubscriptionCreditsSpent != '') && (newItem.processedSubscriptionCreditsSpent = listItem.ProcessedSubscriptionCreditsSpent);
                    (listItem.SubscriptionCreditBalanceChange != '') && (newItem.subscriptionCreditBalanceChange = listItem.SubscriptionCreditBalanceChange);
                    (listItem.RemainingSubscriptionCreditBalance != '') && (newItem.remainingSubscriptionCreditBalance = listItem.RemainingSubscriptionCreditBalance);
                    (listItem.StreamerName != '') && (newItem.streamerName = listItem.StreamerName);
                    (listItem.StreamerLinkedChannels != '') && (newItem.streamerLinkedChannels = listItem.StreamerLinkedChannels);
                    (listItem.SpenderTwitchUserID != '') && (newItem.spenderTwitchUserID = listItem.SpenderTwitchUserID);
                    (listItem.CustomerServiceNote != '') && (newItem.customerServiceNote = listItem.CustomerServiceNote);
                    model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (e: any){
            this.logger.log('error', `${e}`,'parseTwitchPrimeSubscription');
        }
    }

    /**
     * @param data - file 'Retail.OrderHistory.2/Retail.OrderHistory.2.csv' in input as Buffer
     * @return {Promise<RetailOrderHistory | undefined>}
     */
    async parseRetailOrderHistory(data: Buffer): Promise<RetailOrderHistory | undefined> {
        try {
            let result: Array<any> = <Array<object>>Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: RetailOrderHistory = {list: []}
                result.map((listItem) => {
                    let newItem: RetailOrder = {}, match;
                    (listItem['﻿"Website"'] != '') && (newItem.website = listItem['﻿"Website"']);
                    (listItem['Order ID'] != '') && (newItem.orderID = listItem['Order ID']);
                    (listItem['Order Date']  != '') && (match = listItem['Order Date'].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+)/));
                    (listItem['Order Date']  != '') && (newItem.orderDate = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    (listItem['Purchase Order Number'] != '') && (newItem.purchaseOrderNumber = listItem['Purchase Order Number']);
                    (listItem['Currency'] != '') && (newItem.currency = listItem['Currency']);
                    (listItem['Unit Price'] != '') && (newItem.unitPrice = parseInt(listItem['Unit Price']));
                    (listItem['Unit Price Tax'] != '') && (newItem.unitPriceTax = parseInt(listItem['Unit Price Tax']));
                    (listItem['Shipping Charge'] != '') && (newItem.shippingCharge = parseInt(listItem['Shipping Charge']));
                    (listItem['Total Discounts'] != '') && (newItem.totalDiscounts = parseInt(listItem['Total Discounts']));
                    (listItem['Total Owed'] != '') && (newItem.totalOwed = parseInt(listItem['Total Owed']));
                    (listItem['Shipment Item Subtotal'] != '') && (newItem.shipmentItemSubtotal = parseInt(listItem['Shipment Item Subtotal']));
                    (listItem['Shipment Item Subtotal Tax'] != '') && (newItem.shipmentItemSubtotalTax = parseInt(listItem['Shipment Item Subtotal Tax']));
                    (listItem['ASIN'] != '') && (newItem.ASIN = listItem['ASIN']);
                    (listItem['Product Condition'] != '') && (newItem.productCondition = listItem['Product Condition']);
                    (listItem['Quantity'] != '') && (newItem.quantity = parseInt(listItem['Quantity']));
                    (listItem['Payment Instrument Type'] != '') && (newItem.paymentInstrumentType = listItem['Payment Instrument Type']);
                    (listItem['Order Status'] != '') && (newItem.orderStatus = listItem['Order Status']);
                    (listItem['Shipment Status'] != '') && (newItem.shipmentStatus = listItem['Shipment Status']);
                    (listItem['Ship Date']  != '') && (match = listItem['Ship Date'].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+)/));
                    (listItem['Ship Date']  != '') && (newItem.orderDate = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    (listItem['Shipping Option'] != '') && (newItem.shippingOption = listItem['Shipping Option']);
                    (listItem['Shipping Address'] != '') && (newItem.shippingAddress = listItem['Shipping Address']);
                    (listItem['Billing Address'] != '') && (newItem.billingAddress = listItem['Billing Address']);
                    (listItem['Carrier Name & Tracking Number'] != '') && (newItem.carrierNameAndTrackingNumber = listItem['Carrier Name & Tracking Number']);
                    (listItem['Product Name'] != '') && (newItem.productName = listItem['Product Name']);
                    (listItem['Gift Message'] != '') && (newItem.giftMessage = listItem['Gift Message']);
                    (listItem['Gift Sender Name'] != '') && (newItem.giftSenderName = listItem['Gift Sender Name']);
                    (listItem['Gift Recipient Contact Details'] != '') && (newItem.giftRecipientContactDetails = listItem['Gift Recipient Contact Details']);
                    model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (e: any){
            this.logger.log('error', `${e}`,'parseRetailOrderHistory');
        }
    }
}

