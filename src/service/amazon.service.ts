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
    DigitalItemAM,
    DigitalItemsAM,
    DigitalOrderAM,
    DigitalOrderMonetaryAM,
    DigitalOrdersAM,
    DigitalOrdersMonetaryAM,
    DigitalPrimeVideoViewCountsAM,
    DigitalSubscriptionAM,
    DigitalSubscriptionsAM,
    ItemAM,
    LightWeightInteractionAM,
    LightWeightInteractionsAM,
    PrimeVideoViewingHistoryAM,
    PrimeVideoWatchlistAM,
    PrimeVideoWatchlistHistoryAM,
    RetailCartItemAM,
    RetailCartItemsAM,
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
import {ValidatorFiles} from "../validator";

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
                    ValidatorFiles.isCSVFieldValid(listItem.catalogTitle) && (newItem.catalogTitle = listItem.catalogTitle);
                    if (ValidatorFiles.isCSVFieldValid(listItem[`${this.INIT_CHAR}"itemAddedDate"`])) {
                        match = listItem[`${this.INIT_CHAR}"itemAddedDate"`].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+)/);
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
                    ValidatorFiles.isCSVFieldValid(listItem[`${this.INIT_CHAR}"listId"`]) && (newItem.listId = listItem[`${this.INIT_CHAR}"listId"`]);
                    ValidatorFiles.isCSVFieldValid(listItem.itemAddedDate) && (match = listItem.itemAddedDate.match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+)/));
                    ValidatorFiles.isCSVFieldValid(listItem.itemAddedDate) && (newItem.itemAddedDate = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), 0)));
                    ValidatorFiles.isCSVFieldValid(listItem.itemType) && (newItem.itemType = listItem.itemType);
                    ValidatorFiles.isCSVFieldValid(listItem.deleted) && (newItem.deleted = listItem.deleted == '1');
                    ValidatorFiles.isCSVFieldValid(listItem.catalogTitle) && (newItem.catalogTitle = listItem.catalogTitle);
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
     * @param data - file 'Digital.PrimeVideo.Viewinghistory/Digital.PrimeVideo.Viewinghistory.csv' in input as Buffer
     */
    static async parsePrimeVideoViewingHistory(data: Buffer): Promise<PrimeVideoViewingHistoryAM | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: PrimeVideoViewingHistoryAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: ViewingActivityAM = {}, match;
                    if (ValidatorFiles.isCSVFieldValid(listItem[`${this.INIT_CHAR}Playback Hour`])) {
                        (match = listItem[`${this.INIT_CHAR}Playback Hour`].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+)/));
                        (match) && (newItem.playbackHour = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    }
                    ValidatorFiles.isCSVFieldValid(listItem['Operating System']) && (newItem.operatingSystem = listItem['Operating System']);
                    ValidatorFiles.isCSVFieldValid(listItem['Browser']) && (newItem.browser = listItem['Browser']);
                    ValidatorFiles.isCSVFieldValid(listItem['Delivery Type']) && (newItem.deliveryType = listItem['Delivery Type']);
                    ValidatorFiles.isCSVFieldValid(listItem['City']) && (newItem.city = listItem['City']);
                    ValidatorFiles.isCSVFieldValid(listItem['Country']) && (newItem.country = listItem['Country']);
                    ValidatorFiles.isCSVFieldValid(listItem['ISP']) && (newItem.ISP = listItem['ISP']);
                    ValidatorFiles.isCSVFieldValid(listItem['State']) && (newItem.state = listItem['State']);
                    ValidatorFiles.isCSVFieldValid(listItem['Content Quality Entitled']) && (newItem.contentQuality = listItem['Content Quality Entitled']);
                    ValidatorFiles.isCSVFieldValid(listItem['Entitlement Type']) && (newItem.entitlementType = listItem['Entitlement Type']);
                    ValidatorFiles.isCSVFieldValid(listItem['Video Type']) && (newItem.videoType = listItem['Video Type']);
                    ValidatorFiles.isCSVFieldValid(listItem['Audio Language']) && (newItem.audioLanguage = listItem['Audio Language']);
                    ValidatorFiles.isCSVFieldValid(listItem['Title']) && (newItem.title = listItem['Title']);
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
                    if (ValidatorFiles.isCSVFieldValid(listItem[`${this.INIT_CHAR}First Search Time (GMT)`])) {
                        match = listItem[`${this.INIT_CHAR}First Search Time (GMT)`].match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/);
                        (match) && (newItem.firstSearchTime = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    }
                    ValidatorFiles.isCSVFieldValid(listItem['Country ID']) && (newItem.countryID = listItem['Country ID']);
                    ValidatorFiles.isCSVFieldValid(listItem['All Department (APS) or Category']) && (newItem.APSorCategory = listItem['All Department (APS) or Category']);
                    ValidatorFiles.isCSVFieldValid(listItem['Site Variant']) && (newItem.siteVariant = listItem['Site Variant']);
                    ValidatorFiles.isCSVFieldValid(listItem['Application / Browser Name']) && (newItem.appOrBrowser = listItem['Application / Browser Name']);
                    ValidatorFiles.isCSVFieldValid(listItem['Device Model']) && (newItem.deviceModel = listItem['Device Model']);
                    ValidatorFiles.isCSVFieldValid(listItem['Search Type (Keyword,Visual,Browse)']) && (newItem.searchType = listItem['Search Type (Keyword,Visual,Browse)']);
                    ValidatorFiles.isCSVFieldValid(listItem['Session ID']) && (newItem.sessionID = listItem['Session ID']);
                    ValidatorFiles.isCSVFieldValid(listItem['Query ID']) && (newItem.queryID = listItem['Query ID']);
                    ValidatorFiles.isCSVFieldValid(listItem['Prime Customer (Y/N)']) && (newItem.primeCustomer = listItem['Prime Customer (Y/N)'] === '1');
                    ValidatorFiles.isCSVFieldValid(listItem['Is From External Link (Y/N)']) && (newItem.isFromExternalLink = listItem['Is From External Link (Y/N)'] === '1');
                    ValidatorFiles.isCSVFieldValid(listItem['Search From External Site (Y/N)']) && (newItem.searchFromExternalSite = listItem['Search From External Site (Y/N)'] === '1');
                    ValidatorFiles.isCSVFieldValid(listItem['First Search Query String']) && (newItem.firstSearchQuery = listItem['First Search Query String']);
                    ValidatorFiles.isCSVFieldValid(listItem['Application Name']) && (newItem.applicationName = listItem['Application Name']);
                    ValidatorFiles.isCSVFieldValid(listItem['App Version']) && (newItem.appVersion = listItem['App Version']);
                    ValidatorFiles.isCSVFieldValid(listItem['Operating System Name']) && (newItem.operatingSystemName = listItem['Operating System Name']);
                    ValidatorFiles.isCSVFieldValid(listItem['Operating System Version']) && (newItem.operatingSystemVersion = listItem['Operating System Version']);
                    ValidatorFiles.isCSVFieldValid(listItem['Device Type ID']) && (newItem.deviceTypeID = listItem['Device Type ID']);
                    ValidatorFiles.isCSVFieldValid(listItem['Device Category']) && (newItem.deviceCategory = listItem['Device Category']);
                    ValidatorFiles.isCSVFieldValid(listItem['Customer IP']) && (newItem.customerIP = listItem['Customer IP']);
                    ValidatorFiles.isCSVFieldValid(listItem['Search Method']) && (newItem.searchMethod = listItem['Search Method']);
                    ValidatorFiles.isCSVFieldValid(listItem['Keywords']) && (newItem.keywords = listItem['Keywords']);
                    ValidatorFiles.isCSVFieldValid(listItem['Amazon Business Customer (Y/N)']) && (newItem.isBusinessCustomer = listItem['Amazon Business Customer (Y/N)'] === '1');
                    ValidatorFiles.isCSVFieldValid(listItem['Language']) && (newItem.language = listItem['Language']);
                    ValidatorFiles.isCSVFieldValid(listItem['Server']) && (newItem.server = listItem['Server']);
                    ValidatorFiles.isCSVFieldValid(listItem['Amazon Fresh Customer (Y/N)']) && (newItem.isFreshCustomer = listItem['Amazon Fresh Customer (Y/N)'] === '1');
                    ValidatorFiles.isCSVFieldValid(listItem['Music Subscriber (Y/N)']) && (newItem.isMusicSubscriber = listItem['Music Subscriber (Y/N)'] === '1');
                    ValidatorFiles.isCSVFieldValid(listItem['First Browse Node']) && (newItem.firstBrowseNode = listItem['First Browse Node']);
                    ValidatorFiles.isCSVFieldValid(listItem['Last search Time (GMT)']) && (match = listItem['Last search Time (GMT)'].match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+).0/));
                    ValidatorFiles.isCSVFieldValid(listItem['Last search Time (GMT)']) && (newItem.lastSearchTime = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    ValidatorFiles.isCSVFieldValid(listItem['Last Department']) && (newItem.lastDepartment = listItem['Last Department']);
                    ValidatorFiles.isCSVFieldValid(listItem['Last Browse Node']) && (newItem.lastBrowseNode = listItem['Last Browse Node']);
                    ValidatorFiles.isCSVFieldValid(listItem['Last Known Customer ID']) && (newItem.lastKnownCustomerID = listItem['Last Known Customer ID']);
                    ValidatorFiles.isCSVFieldValid(listItem['First Added Item']) && (newItem.firstAddedItem = listItem['First Added Item']);
                    ValidatorFiles.isCSVFieldValid(listItem['First Purchased Item']) && (newItem.firstPurchasedItem = listItem['First Purchased Item']);
                    ValidatorFiles.isCSVFieldValid(listItem['First Consumed Item (Subscription)']) && (newItem.firstConsumedItem = listItem['First Consumed Item (Subscription)']);
                    ValidatorFiles.isCSVFieldValid(listItem['Number of Clicked Items']) && (newItem.numberClickedItem = listItem['Number of Clicked Items']);
                    ValidatorFiles.isCSVFieldValid(listItem['Number of Items Added to Cart']) && (newItem.numberItemsAddedCart = listItem['Number of Items Added to Cart']);
                    ValidatorFiles.isCSVFieldValid(listItem['Number of Items Ordered']) && (newItem.numberItemsOrdered = listItem['Number of Items Ordered']);
                    ValidatorFiles.isCSVFieldValid(listItem['Number of Paid Items Ordered']) && (newItem.numberPaidItemsOrdered = listItem['Number of Paid Items Ordered']);
                    ValidatorFiles.isCSVFieldValid(listItem['Number of Free Items Ordered']) && (newItem.numberFreeItemsOrdered = listItem['Number of Free Items Ordered']);
                    ValidatorFiles.isCSVFieldValid(listItem['Units Ordered']) && (newItem.unitsOrdered = listItem['Units Ordered']);
                    ValidatorFiles.isCSVFieldValid(listItem['Paid Units Ordered']) && (newItem.paidUnitsOrdered = listItem['Paid Units Ordered']);
                    ValidatorFiles.isCSVFieldValid(listItem['Free Units Ordered']) && (newItem.freeUnitsOrdered = listItem['Free Units Ordered']);
                    ValidatorFiles.isCSVFieldValid(listItem['Maximum Purchase Price']) && (newItem.maximumPurchasePrice = listItem['Maximum Purchase Price']);
                    ValidatorFiles.isCSVFieldValid(listItem['Clicked Any Item (Y/N)']) && (newItem.clickedAnyItem = listItem['Clicked Any Item (Y/N)'] === '1');
                    ValidatorFiles.isCSVFieldValid(listItem['Added Any Item (Y/N)']) && (newItem.addedAnyItem = listItem['Added Any Item (Y/N)'] === '1');
                    ValidatorFiles.isCSVFieldValid(listItem['Purchased Any Item (Y/N)']) && (newItem.purchasedAnyItem = listItem['Purchased Any Item (Y/N)'] === '1');
                    ValidatorFiles.isCSVFieldValid(listItem['Department Count']) && (newItem.departmentCount = listItem['Department Count']);
                    ValidatorFiles.isCSVFieldValid(listItem['Shopping Refinement']) && (newItem.shoppingRefinement = listItem['Shopping Refinement']);
                    ValidatorFiles.isCSVFieldValid(listItem['Number of Shopping Refinements']) && (newItem.numberShoppingRefinements = listItem['Number of Shopping Refinements']);
                    ValidatorFiles.isCSVFieldValid(listItem['Highest Number of Shopping Refinements']) && (newItem.highestNumberShoppingRefinements = listItem['Highest Number of Shopping Refinements']);
                    ValidatorFiles.isCSVFieldValid(listItem['Items Consumed (Subscription)']) && (newItem.itemConsumed = listItem['Items Consumed (Subscription)']);
                    ValidatorFiles.isCSVFieldValid(listItem['Shopping Refinement Pickers']) && (newItem.shoppingRefinementPickers = listItem['Shopping Refinement Pickers']);
                    ValidatorFiles.isCSVFieldValid(listItem['Paid Purchase (Y/N)']) && (newItem.paidPurchase = listItem['Paid Purchase (Y/N)'] === '1');
                    ValidatorFiles.isCSVFieldValid(listItem['Item Borrowed (Y/N)']) && (newItem.isItemBorrowed = listItem['Item Borrowed (Y/N)'] === '1');
                    ValidatorFiles.isCSVFieldValid(listItem['Items Borrowed']) && (newItem.itemsBorrowed = listItem['Items Borrowed']);
                    ValidatorFiles.isCSVFieldValid(listItem['Next Query Group via Click']) && (newItem.nextQueryGroupViaClick = listItem['Next Query Group via Click']);
                    ValidatorFiles.isCSVFieldValid(listItem['Query Abandoned (Y/N)']) && (newItem.queryAbandoned = listItem['Query Abandoned (Y/N)'] === '1');
                    ValidatorFiles.isCSVFieldValid(listItem['Query Reformulated (Y/N)']) && (newItem.queryReformulated = listItem['Query Reformulated (Y/N)'] === '1');
                    ValidatorFiles.isCSVFieldValid(listItem['Amazon Fresh (Y/N)']) && (newItem.amazonFresh = listItem['Amazon Fresh (Y/N)'] === '1');
                    ValidatorFiles.isCSVFieldValid(listItem['Store Visited']) && (newItem.storeVisited = listItem['Store Visited']);
                    ValidatorFiles.isCSVFieldValid(listItem['Department']) && (newItem.department = listItem['Department']);
                    ValidatorFiles.isCSVFieldValid(listItem['Browse Node']) && (newItem.browserNode = listItem['Browse Node']);
                    ValidatorFiles.isCSVFieldValid(listItem['First Search Domain']) && (newItem.firstSearchDomain = listItem['First Search Domain']);
                    ValidatorFiles.isCSVFieldValid(listItem['Is First Search From External Ad']) && (newItem.isFirstSearchFromExternalAd = listItem['Is First Search From External Ad'].toLowerCase() == 'yes');
                    ValidatorFiles.isCSVFieldValid(listItem['User Agent Info Family']) && (newItem.userAgentInfoFamily = listItem['User Agent Info Family']);
                    ValidatorFiles.isCSVFieldValid(listItem.LKCI) && (newItem.LKCI = listItem['LKCI']);
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
                    if(ValidatorFiles.isCSVFieldValid(listItem[`${this.INIT_CHAR}"DateAdded"`])) {
                        let match = listItem[`${this.INIT_CHAR}"DateAdded"`].match(/(\d+)-(\w+)-(\d+)/);
                        let monthIndex = Months[match[2]];
                        (monthIndex) && (newItem.dateAdded = new Date(Date.UTC(parseInt(match[3]), parseInt(monthIndex) - 1, parseInt(match[1]), 0, 0, 0)));
                    }
                    ValidatorFiles.isCSVFieldValid(listItem.Title) && (newItem.title = listItem.Title);
                    ValidatorFiles.isCSVFieldValid(listItem.Asin) && (newItem.asin = listItem.Asin);
                    ValidatorFiles.isCSVFieldValid(listItem.IsDownloaded) && (newItem.isDownloaded = listItem.IsDownloaded.toLowerCase() === 'y');
                    ValidatorFiles.isCSVFieldValid(listItem.IsDeleted) && (newItem.isDeleted = listItem.IsDeleted.toLowerCase() === 'y');
                    ValidatorFiles.isCSVFieldValid(listItem.DeleteBy) && (newItem.deleteBy = listItem.DeleteBy);
                    if(ValidatorFiles.isCSVFieldValid(listItem.DateDeleted)) {
                        let match = listItem.DateDeleted.match(/(\d+)-(\w+)-(\d+)/);
                        let monthIndex = Months[match[2]];
                        (monthIndex) && (newItem.dateDeleted = new Date(Date.UTC(parseInt(match[3]), parseInt(monthIndex) - 1, parseInt(match[1]), 0, 0, 0)));
                    }
                    ValidatorFiles.isCSVFieldValid(listItem.IsPublic) && (newItem.isPublic = listItem.IsPublic.toLowerCase() === 'y');
                    ValidatorFiles.isCSVFieldValid(listItem.IsStreamed) && (newItem.isStreamed = listItem.IsStreamed.toLowerCase() === 'y');
                    ValidatorFiles.isCSVFieldValid(listItem.IsPreorder) && (newItem.isPreorder = listItem.IsPreorder.toLowerCase() === 'y');
                    ValidatorFiles.isCSVFieldValid(listItem.Downloads) && (newItem.downloads = listItem.Downloads);
                    if (ValidatorFiles.isCSVFieldValid(listItem.DateFirstDownloaded)) {
                        let match = listItem.DateFirstDownloaded.match(/(\d+)-(\w+)-(\d+)/);
                        let monthIndex = Months[match[2]];
                        (monthIndex) && (newItem.dateFirstDownloaded = new Date(Date.UTC(parseInt(match[3]), parseInt(monthIndex) - 1, parseInt(match[1]), 0, 0, 0)));
                    }
                    ValidatorFiles.isCSVFieldValid(listItem.OrderNumber) && (newItem.orderNumber = listItem.OrderNumber);
                    ValidatorFiles.isCSVFieldValid(listItem.OriginType) && (newItem.originType = listItem.OriginType);
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
                    ValidatorFiles.isCSVFieldValid(listItem[parameter]) && (model.list.push({value: listItem[parameter]}));
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
                    ValidatorFiles.isCSVFieldValid(listItem[parameter]) && (model.list.push({value: listItem[parameter]}));
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
                    ValidatorFiles.isCSVFieldValid(listItem[parameter]) && (model.list.push({value: listItem[parameter]}));
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
                    ValidatorFiles.isCSVFieldValid(listItem[parameter]) && (model.list.push({value: listItem[parameter]}));
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
                    ValidatorFiles.isCSVFieldValid(listItem[`${this.INIT_CHAR}Timestamp`]) && (match = listItem[`${this.INIT_CHAR}Timestamp`].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+)/));
                    (match) && (newItem.date = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), 0)));
                    ValidatorFiles.isCSVFieldValid(listItem.BalanceTrackerOperation) && (newItem.balanceTrackerOperation = listItem.BalanceTrackerOperation);
                    ValidatorFiles.isCSVFieldValid(listItem.SubscriptionCreditOperation) && (newItem.subscriptionCreditOperation = listItem.SubscriptionCreditOperation);
                    ValidatorFiles.isCSVFieldValid(listItem.SubscriptionCreditsSpent) && (newItem.subscriptionCreditsSpent = listItem.SubscriptionCreditsSpent);
                    ValidatorFiles.isCSVFieldValid(listItem.ProcessedSubscriptionCreditsSpent) && (newItem.processedSubscriptionCreditsSpent = listItem.ProcessedSubscriptionCreditsSpent);
                    ValidatorFiles.isCSVFieldValid(listItem.SubscriptionCreditBalanceChange) && (newItem.subscriptionCreditBalanceChange = listItem.SubscriptionCreditBalanceChange);
                    ValidatorFiles.isCSVFieldValid(listItem.RemainingSubscriptionCreditBalance) && (newItem.remainingSubscriptionCreditBalance = listItem.RemainingSubscriptionCreditBalance);
                    ValidatorFiles.isCSVFieldValid(listItem.StreamerName) && (newItem.streamerName = listItem.StreamerName);
                    ValidatorFiles.isCSVFieldValid(listItem.StreamerLinkedChannels) && (newItem.streamerLinkedChannels = listItem.StreamerLinkedChannels);
                    ValidatorFiles.isCSVFieldValid(listItem.SpenderTwitchUserID) && (newItem.spenderTwitchUserID = listItem.SpenderTwitchUserID);
                    ValidatorFiles.isCSVFieldValid(listItem.CustomerServiceNote) && (newItem.customerServiceNote = listItem.CustomerServiceNote);
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
                    ValidatorFiles.isCSVFieldValid(listItem[`${this.INIT_CHAR}"Website"`]) && (newItem.website = listItem[`${this.INIT_CHAR}"Website"`]);
                    ValidatorFiles.isCSVFieldValid(listItem['Order ID']) && (newItem.orderID = listItem['Order ID']);
                    ValidatorFiles.isCSVFieldValid(listItem['Order Date'] ) && (match = listItem['Order Date'].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+)/));
                    ValidatorFiles.isCSVFieldValid(listItem['Order Date'] ) && (newItem.orderDate = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    ValidatorFiles.isCSVFieldValid(listItem['Purchase Order Number']) && (newItem.purchaseOrderNumber = listItem['Purchase Order Number']);
                    ValidatorFiles.isCSVFieldValid(listItem['Currency']) && (newItem.currency = listItem['Currency']);
                    ValidatorFiles.isCSVFieldValid(listItem['Unit Price']) && (newItem.unitPrice = parseFloat(listItem['Unit Price']));
                    ValidatorFiles.isCSVFieldValid(listItem['Unit Price Tax']) && (newItem.unitPriceTax = parseFloat(listItem['Unit Price Tax']));
                    ValidatorFiles.isCSVFieldValid(listItem['Shipping Charge']) && (newItem.shippingCharge = parseFloat(listItem['Shipping Charge']));
                    ValidatorFiles.isCSVFieldValid(listItem['Total Discounts']) && (newItem.totalDiscounts = parseFloat(listItem['Total Discounts']));
                    ValidatorFiles.isCSVFieldValid(listItem['Total Owed']) && (newItem.totalOwed = parseFloat(listItem['Total Owed']));
                    ValidatorFiles.isCSVFieldValid(listItem['Shipment Item Subtotal']) && (newItem.shipmentItemSubtotal = parseFloat(listItem['Shipment Item Subtotal']));
                    ValidatorFiles.isCSVFieldValid(listItem['Shipment Item Subtotal Tax']) && (newItem.shipmentItemSubtotalTax = parseFloat(listItem['Shipment Item Subtotal Tax']));
                    ValidatorFiles.isCSVFieldValid(listItem['ASIN']) && (newItem.ASIN = listItem['ASIN']);
                    ValidatorFiles.isCSVFieldValid(listItem['Product Condition']) && (newItem.productCondition = listItem['Product Condition']);
                    ValidatorFiles.isCSVFieldValid(listItem['Quantity']) && (newItem.quantity = parseFloat(listItem['Quantity']));
                    ValidatorFiles.isCSVFieldValid(listItem['Payment Instrument Type']) && (newItem.paymentInstrumentType = listItem['Payment Instrument Type']);
                    ValidatorFiles.isCSVFieldValid(listItem['Order Status']) && (newItem.orderStatus = listItem['Order Status']);
                    ValidatorFiles.isCSVFieldValid(listItem['Shipment Status']) && (newItem.shipmentStatus = listItem['Shipment Status']);
                    ValidatorFiles.isCSVFieldValid(listItem['Ship Date'] ) && (match = listItem['Ship Date'].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+)/));
                    ValidatorFiles.isCSVFieldValid(listItem['Ship Date'] ) && (newItem.orderDate = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    ValidatorFiles.isCSVFieldValid(listItem['Shipping Option']) && (newItem.shippingOption = listItem['Shipping Option']);
                    ValidatorFiles.isCSVFieldValid(listItem['Shipping Address']) && (newItem.shippingAddress = listItem['Shipping Address']);
                    ValidatorFiles.isCSVFieldValid(listItem['Billing Address']) && (newItem.billingAddress = listItem['Billing Address']);
                    ValidatorFiles.isCSVFieldValid(listItem['Carrier Name & Tracking Number']) && (newItem.carrierNameAndTrackingNumber = listItem['Carrier Name & Tracking Number']);
                    ValidatorFiles.isCSVFieldValid(listItem['Product Name']) && (newItem.productName = listItem['Product Name']);
                    ValidatorFiles.isCSVFieldValid(listItem['Gift Message']) && (newItem.giftMessage = listItem['Gift Message']);
                    ValidatorFiles.isCSVFieldValid(listItem['Gift Sender Name']) && (newItem.giftSenderName = listItem['Gift Sender Name']);
                    ValidatorFiles.isCSVFieldValid(listItem['Gift Recipient Contact Details']) && (newItem.giftRecipientContactDetails = listItem['Gift Recipient Contact Details']);
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
                    ValidatorFiles.isCSVFieldValid(listItem[`${this.INIT_CHAR}"DeviceType"`]) && (newItem.deviceType = listItem[`${this.INIT_CHAR}"DeviceType"`]);
                    if(ValidatorFiles.isCSVFieldValid(listItem['StartDate'])) {
                        let match = listItem['StartDate'].match(/(\d+)-(\w+)-(\d+)/);
                        let monthIndex = Months[match[2]];
                        (monthIndex) && (newItem.startDate = new Date(Date.UTC(parseInt(match[3]), parseInt(monthIndex) - 1, parseInt(match[1]), 0, 0, 0)));
                    }
                    if(ValidatorFiles.isCSVFieldValid(listItem['EndDate'])) {
                        let match = listItem['EndDate'].match(/(\d+)-(\w+)-(\d+)/);
                        let monthIndex = Months[match[2]];
                        (monthIndex) && (newItem.endDate = new Date(Date.UTC(parseInt(match[3]), parseInt(monthIndex) - 1, parseInt(match[1]), 0, 0, 0)));
                    }
                    ValidatorFiles.isCSVFieldValid(listItem['EventDuration']) && (newItem.eventDuration = parseFloat(listItem['EventDuration']));
                    ValidatorFiles.isCSVFieldValid(listItem['StartPosition']) && (newItem.startPosition = parseFloat(listItem['StartPosition']));
                    ValidatorFiles.isCSVFieldValid(listItem['EndPosition']) && (newItem.endPosition = parseFloat(listItem['EndPosition']));
                    ValidatorFiles.isCSVFieldValid(listItem['Title']) && (newItem.title = listItem['Title']);
                    ValidatorFiles.isCSVFieldValid(listItem['Asin']) && (newItem.asin = listItem['Asin']);
                    ValidatorFiles.isCSVFieldValid(listItem['BookLength']) && (newItem.bookLength = parseFloat(listItem['BookLength']));
                    ValidatorFiles.isCSVFieldValid(listItem['DeliveryType']) && (newItem.deliveryType = listItem['DeliveryType']);
                    ValidatorFiles.isCSVFieldValid(listItem['NarrationSpeed']) && (newItem.narrationSpeed = listItem['NarrationSpeed']);
                    ValidatorFiles.isCSVFieldValid(listItem['Bookmark']) && (newItem.bookmark = parseFloat(listItem['Bookmark']));
                    ValidatorFiles.isCSVFieldValid(listItem['AudioType']) && (newItem.audioType = listItem['AudioType']);
                    ValidatorFiles.isCSVFieldValid(listItem['AsinOwned']) && (newItem.asinOwned = listItem['AsinOwned'].toLowerCase() == 'true');
                    ValidatorFiles.isCSVFieldValid(listItem['ListeningMode']) && (newItem.listeningMode = listItem['ListeningMode']);
                    ValidatorFiles.isCSVFieldValid(listItem['Store']) && (newItem.store = listItem['Store']);
                    ValidatorFiles.isCSVFieldValid(listItem['AppVersion']) && (newItem.appVersion = listItem['AppVersion']);
                    ValidatorFiles.isCSVFieldValid(listItem['LocalTimezone']) && (newItem.localTimezone = listItem['LocalTimezone']);
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
                    if(ValidatorFiles.isCSVFieldValid(listItem[`${this.INIT_CHAR}"TaxCreateDate"`])) {
                        let match = listItem[`${this.INIT_CHAR}"TaxCreateDate"`].match(/(\d+)-(\w+)-(\d+)/);
                        let monthIndex = Months[match[2]];
                        (monthIndex) && (newItem.taxCreateDate = new Date(Date.UTC(parseInt(match[3]), parseInt(monthIndex) - 1, parseInt(match[1]), 0, 0, 0)));
                    }
                    if(ValidatorFiles.isCSVFieldValid(listItem['BillingPeriodEndDate'])) {
                        let match = listItem['BillingPeriodEndDate'].match(/(\d+)-(\w+)-(\d+)/);
                        let monthIndex = Months[match[2]];
                        (monthIndex) && (newItem.billingPeriodEndDate = new Date(Date.UTC(parseInt(match[3]), parseInt(monthIndex) - 1, parseInt(match[1]), 0, 0, 0)));
                    }
                    if(ValidatorFiles.isCSVFieldValid(listItem['BillingPeriodStartDate'])) {
                        let match = listItem['BillingPeriodStartDate'].match(/(\d+)-(\w+)-(\d+)/);
                        let monthIndex = Months[match[2]];
                        (monthIndex) && (newItem.billingPeriodStartDate = new Date(Date.UTC(parseInt(match[3]), parseInt(monthIndex) - 1, parseInt(match[1]), 0, 0, 0)));
                    }
                    if(ValidatorFiles.isCSVFieldValid(listItem['StatusLastupdatedDate'])) {
                        let match = listItem['StatusLastupdatedDate'].match(/(\d+)-(\w+)-(\d+)/);
                        let monthIndex = Months[match[2]];
                        (monthIndex) && (newItem.statusLastUpdatedDate = new Date(Date.UTC(parseInt(match[3]), parseInt(monthIndex) - 1, parseInt(match[1]), 0, 0, 0)));
                    }
                    ValidatorFiles.isCSVFieldValid(listItem['BaseAmount']) && (newItem.baseAmount = parseFloat(listItem['BaseAmount']));
                    ValidatorFiles.isCSVFieldValid(listItem['Tax']) && (newItem.tax = parseFloat(listItem['Tax']));
                    ValidatorFiles.isCSVFieldValid(listItem['TotalAmount']) && (newItem.totalAmount = parseFloat(listItem['TotalAmount']));
                    ValidatorFiles.isCSVFieldValid(listItem['Currency']) && (newItem.currency = listItem['Currency']);
                    ValidatorFiles.isCSVFieldValid(listItem['Type']) && (newItem.type = listItem['Type']);
                    ValidatorFiles.isCSVFieldValid(listItem['Plan']) && (newItem.plan = listItem['Plan']);
                    ValidatorFiles.isCSVFieldValid(listItem['PlanBillingFreq']) && (newItem.planBillingFreq = parseFloat(listItem['PlanBillingFreq']));
                    ValidatorFiles.isCSVFieldValid(listItem['PlanBillingFee']) && (newItem.planBillingFee = parseFloat(listItem['PlanBillingFee']));
                    ValidatorFiles.isCSVFieldValid(listItem['OfferName']) && (newItem.offerName = listItem['OfferName']);
                    ValidatorFiles.isCSVFieldValid(listItem['OfferType']) && (newItem.offerType = listItem['OfferType']);
                    ValidatorFiles.isCSVFieldValid(listItem['TransactionId']) && (newItem.transactionId = listItem['TransactionId']);
                    ValidatorFiles.isCSVFieldValid(listItem['SubscriptionIdentifier']) && (newItem.subscriptionIdentifier = listItem['SubscriptionIdentifier']);
                    ValidatorFiles.isCSVFieldValid(listItem['PlanSelectionIdentifier']) && (newItem.planSelectionIdentifier = listItem['PlanSelectionIdentifier']);
                    ValidatorFiles.isCSVFieldValid(listItem['MerchantName']) && (newItem.merchantName = listItem['MerchantName']);
                    ValidatorFiles.isCSVFieldValid(listItem['TaxReason']) && (newItem.taxReason = listItem['TaxReason']);
                    ValidatorFiles.isCSVFieldValid(listItem['Status']) && (newItem.status = listItem['Status']);
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
                ValidatorFiles.isCSVFieldValid(result[`${this.INIT_CHAR}# TV shows watched`]) && (model.showTVWatched = parseInt(result[`${this.INIT_CHAR}# TV shows watched`]));
                ValidatorFiles.isCSVFieldValid(result['# kids titles watched']) && (model.kidsTitlesWatched = parseInt(result['# kids titles watched']));
                ValidatorFiles.isCSVFieldValid(result['# movies watched']) && (model.moviesWatched = parseInt(result['# movies watched']));
                ValidatorFiles.isCSVFieldValid(result['# non-kids titles watched']) && (model.nonKidsTitlesWatched = parseInt(result['# non-kids titles watched']));
                ValidatorFiles.isCSVFieldValid(result['# prime TV titles watched']) && (model.primeTVTitlesWatched = parseInt(result['# prime TV titles watched']));
                ValidatorFiles.isCSVFieldValid(result['# prime movie titles watched']) && (model.primeMovieTitlesWatched = parseInt(result['# prime movie titles watched']));
                ValidatorFiles.isCSVFieldValid(result['# prime titles watched']) && (model.primeTitlesWatched = parseInt(result['# prime titles watched']));
                ValidatorFiles.isCSVFieldValid(result['# rent/buy TV titles watched']) && (model.rentBuyTVTitlesWatched = parseInt(result['# rent/buy TV titles watched']));
                ValidatorFiles.isCSVFieldValid(result['# rent/buy movies watched']) && (model.rentBuyMoviesWatched = parseInt(result['# rent/buy movies watched']));
                ValidatorFiles.isCSVFieldValid(result['# rent/buy titles watched']) && (model.rentBuyTitlesWatched = parseInt(result['# rent/buy titles watched']));
                ValidatorFiles.isCSVFieldValid(result['# titles added to watchlist']) && (model.titlesAddedToWatchlist = parseInt(result['# titles added to watchlist']));
                ValidatorFiles.isCSVFieldValid(result['# titles purchased/rented']) && (model.titlesPurchasedRented = parseInt(result['# titles purchased/rented']));
                ValidatorFiles.isCSVFieldValid(result['# titles watched']) && (model.titlesWatched = parseInt(result['# titles watched']));
                ValidatorFiles.isCSVFieldValid(result['home country']) && (model.homeCountry = result['home country']);
                return !ValidatorFiles.objectIsEmpty(model) ? model : undefined;
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
                    ValidatorFiles.isCSVFieldValid(listItem[`${this.INIT_CHAR}SubscriptionId`]) && (newItem.subscriptionId = listItem[`${this.INIT_CHAR}SubscriptionId`]);
                    ValidatorFiles.isCSVFieldValid(listItem['BaseSubscriptionId']) && (newItem.baseSubscriptionId = listItem['BaseSubscriptionId']);
                    ValidatorFiles.isCSVFieldValid(listItem['ShippingAddress']) && (newItem.shippingAddress = listItem['ShippingAddress']);
                    ValidatorFiles.isCSVFieldValid(listItem['Marketplace']) && (newItem.marketplace = listItem['Marketplace']);
                    ValidatorFiles.isCSVFieldValid(listItem['SubscriptionPlanId']) && (newItem.subscriptionPlanId = listItem['SubscriptionPlanId']);
                    ValidatorFiles.isCSVFieldValid(listItem['SubscriptionStatus']) && (newItem.subscriptionStatus = listItem['SubscriptionStatus']);
                    if(ValidatorFiles.isCSVFieldValid(listItem['SubscriptionStatusDate'])) {
                        let match = listItem['SubscriptionStatusDate'].match(/(\d+)-(\d+)-(\d+)/);
                        (match) && (newItem.subscriptionStatusDate = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), 0, 0, 0)));
                    }
                    ValidatorFiles.isCSVFieldValid(listItem['ActivePaymentPlanId']) && (newItem.activePaymentPlanId = listItem['ActivePaymentPlanId']);
                    ValidatorFiles.isCSVFieldValid(listItem['Autorenew']) && (newItem.autoRenew = listItem['Autorenew'].toLowerCase() === 'yes');
                    if(ValidatorFiles.isCSVFieldValid(listItem['SubscriptionStartDate'])) {
                        let match = listItem['SubscriptionStartDate'].match(/(\d+)-(\d+)-(\d+)/);
                        (match) && (newItem.subscriptionStartDate = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), 0, 0, 0)));
                    }
                    ValidatorFiles.isCSVFieldValid(listItem['WalletCyclingPreferenceEnabled']) && (newItem.walletCyclingPreferenceEnabled = listItem['WalletCyclingPreferenceEnabled'].toLowerCase() === 'yes');
                    ValidatorFiles.isCSVFieldValid(listItem['ServiceProvider']) && (newItem.serviceProvider = listItem['ServiceProvider']);
                    ValidatorFiles.isCSVFieldValid(listItem['RecordVersionNumber']) && (newItem.recordVersionNumber = listItem['RecordVersionNumber']);
                    ValidatorFiles.isCSVFieldValid(listItem['ContractTimeInterval']) && (newItem.contractTimeInterval = listItem['ContractTimeInterval']);
                    ValidatorFiles.isCSVFieldValid(listItem['HaveSubscriptionProblem']) && (newItem.haveSubscriptionProblem = listItem['HaveSubscriptionProblem'].toLowerCase() === 'yes');
                    ValidatorFiles.isCSVFieldValid(listItem['MaxNumOfBeneficiaries']) && (newItem.maxNumOfBeneficiaries = parseFloat(listItem['MaxNumOfBeneficiaries']));
                    if(ValidatorFiles.isCSVFieldValid(listItem['ScheduledResumeDateForPausedSubscription'])) {
                        let match = listItem['ScheduledResumeDateForPausedSubscription'].match(/(\d+)-(\d+)-(\d+)/);
                        (match) && (newItem.scheduledResumeDateForPausedSubscription = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), 0, 0, 0)));
                    }
                    ValidatorFiles.isCSVFieldValid(listItem['CurrentPlanGifted']) && (newItem.currentPlanGifted = listItem['CurrentPlanGifted'].toLowerCase() === 'yes');
                    ValidatorFiles.isCSVFieldValid(listItem['BillingScheduleId']) && (newItem.billingScheduleId = listItem['BillingScheduleId']);
                    if(ValidatorFiles.isCSVFieldValid(listItem['NextBillDate'])) {
                        let match = listItem['NextBillDate'].match(/(\d+)-(\d+)-(\d+)/);
                        (match) && (newItem.nextBillDate = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), 0, 0, 0)));
                    }
                    ValidatorFiles.isCSVFieldValid(listItem['NextBillAmount']) && (newItem.nextBillAmount = parseFloat(listItem['NextBillAmount']));
                    ValidatorFiles.isCSVFieldValid(listItem['BaseCurrencyCode']) && (newItem.baseCurrencyCode = listItem['BaseCurrencyCode']);
                    ValidatorFiles.isCSVFieldValid(listItem['CurrentBillingPeriod']) && (newItem.currentBillingPeriod = parseFloat(listItem['CurrentBillingPeriod']));
                    if(ValidatorFiles.isCSVFieldValid(listItem['BillingPeriodStartDate'])) {
                        let match = listItem['BillingPeriodStartDate'].match(/(\d+)-(\d+)-(\d+)/);
                        (match) && (newItem.billingPeriodStartDate = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), 0, 0, 0)));
                    }
                    ValidatorFiles.isCSVFieldValid(listItem['CurrentContractPeriod']) && (newItem.currentContractPeriod = parseFloat(listItem['CurrentContractPeriod']));
                    if(ValidatorFiles.isCSVFieldValid(listItem['ContractPeriodStartDate'])) {
                        let match = listItem['ContractPeriodStartDate'].match(/(\d+)-(\d+)-(\d+)/);
                        (match) && (newItem.contractPeriodStartDate = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), 0, 0, 0)));
                    }
                    if(ValidatorFiles.isCSVFieldValid(listItem['ContractEndDate'])) {
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
                    if(ValidatorFiles.isCSVFieldValid(listItem[`${this.INIT_CHAR}CreationTime`])) {
                        let match = listItem[`${this.INIT_CHAR}CreationTime`].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+) UTC/);
                        (match) && (newItem.creationTime = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    }
                    ValidatorFiles.isCSVFieldValid(listItem['InteractableType']) && (newItem.interactableType = listItem['InteractableType']);
                    ValidatorFiles.isCSVFieldValid(listItem['InteractableURL']) && (newItem.interactableURL = listItem['InteractableURL']);
                    if(ValidatorFiles.isCSVFieldValid(listItem['InteractionTime'])) {
                        let match = listItem['InteractionTime'].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+) UTC/);
                        (match) && (newItem.interactionTime = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    }
                    ValidatorFiles.isCSVFieldValid(listItem['InteractionType']) && (newItem.interactionType = listItem['InteractionType']);
                    ValidatorFiles.isCSVFieldValid(listItem['InteractionValue']) && (newItem.interactionValue = listItem['InteractionValue']);
                    ValidatorFiles.isCSVFieldValid(listItem['Marketplace']) && (newItem.marketplace = listItem['Marketplace']);
                    if(ValidatorFiles.isCSVFieldValid(listItem['ModificationTime'])) {
                        let match = listItem['ModificationTime'].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+) UTC/);
                        (match) && (newItem.modificationTime = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    }
                    ValidatorFiles.isCSVFieldValid(listItem['Suppressed']) && (newItem.suppressed = listItem['Suppressed'].toLowerCase() === 'true');
                    ValidatorFiles.isCSVFieldValid(listItem['Version']) && (newItem.version = listItem['Version']);
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
                    ValidatorFiles.isCSVFieldValid(listItem[`${this.INIT_CHAR}OrderId`]) && (newItem.orderId = listItem[`${this.INIT_CHAR}OrderId`]);
                    ValidatorFiles.isCSVFieldValid(listItem['Marketplace']) && (newItem.marketplace = listItem['Marketplace']);
                    if(ValidatorFiles.isCSVFieldValid(listItem['FeedbackDate'])) {
                        let match = listItem['FeedbackDate'].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+)/);
                        (match) && (newItem.feedbackDate = new Date(Date.UTC(parseInt(match[3]), parseInt(match[2]) - 1, parseInt(match[1]), parseInt(match[4]), parseInt(match[5]), 0)));
                    }
                    ValidatorFiles.isCSVFieldValid(listItem['FeedbackText']) && (newItem.feedbackText = listItem['FeedbackText']);
                    ValidatorFiles.isCSVFieldValid(listItem['FeedbackRating']) && (newItem.feedbackRating = parseInt(listItem['FeedbackRating']));
                    ValidatorFiles.isCSVFieldValid(listItem['Deal Again']) && (newItem.dealAgain = listItem['Deal Again']);
                    ValidatorFiles.isCSVFieldValid(listItem['Did Item Arrived OnTime']) && (newItem.didItemArrivedOnTime = listItem['Did Item Arrived OnTime'].toLowerCase() === 'yes');
                    ValidatorFiles.isCSVFieldValid(listItem['Item as described by the seller']) && (newItem.itemAsDescribedBySeller = listItem['Item as described by the seller'].toLowerCase() === 'yes');
                    ValidatorFiles.isCSVFieldValid(listItem['Prompt and courteous service']) && (newItem.promptAndCourteousService = listItem['Prompt and courteous service'].toLowerCase() === 'yes');
                    ValidatorFiles.isCSVFieldValid(listItem['What Went Wrong']) && (newItem.whatWentWrong = listItem['What Went Wrong']);
                    ValidatorFiles.isCSVFieldValid(listItem['Is feedback removed']) && (newItem.isFeedbackRemoved = listItem['Is feedback removed'].toLowerCase() === 'yes');
                    ValidatorFiles.isCSVFieldValid(listItem['Feedback removed by']) && (newItem.feedbackRemovedBy = listItem['Feedback removed by']);
                    ValidatorFiles.isCSVFieldValid(listItem['Reason for removal']) && (newItem.reasonForRemoval = listItem['Reason for removal']);
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
                    ValidatorFiles.isCSVFieldValid(listItem[`${this.INIT_CHAR}Postal Code`]) && (newItem.postalCode = listItem[`${this.INIT_CHAR}Postal Code`]);
                    ValidatorFiles.isCSVFieldValid(listItem['District']) && (newItem.district = listItem['District']);
                    ValidatorFiles.isCSVFieldValid(listItem['City']) && (newItem.city = listItem['City']);
                    ValidatorFiles.isCSVFieldValid(listItem['State or Province']) && (newItem.stateOrProvince = listItem['State or Province']);
                    ValidatorFiles.isCSVFieldValid(listItem['State Code']) && (newItem.stateCode = listItem['State Code']);
                    ValidatorFiles.isCSVFieldValid(listItem['Country Code']) && (newItem.countryCode = listItem['Country Code']);
                    ValidatorFiles.isCSVFieldValid(listItem['Timestamp']) && (newItem.date = new Date(listItem['Timestamp']));
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

    /**
     * @param data - file 'Retail.CartItems.2/Retail.CartItems.2.csv' in input as Buffer
     */
    static async parseRetailCartItems(data: Buffer): Promise<RetailCartItemsAM | undefined> {
        try {
            let result: any = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: RetailCartItemsAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: RetailCartItemAM = {};
                    if(ValidatorFiles.isCSVFieldValid(listItem[`${this.INIT_CHAR}"DateAddedToCart"`])) {
                        let match = listItem[`${this.INIT_CHAR}"DateAddedToCart"`].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+) UTC/);
                        (match) && (newItem.dateAddedToCart = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    }
                    ValidatorFiles.isCSVFieldValid(listItem['Source']) && (newItem.source = listItem['Source']);
                    ValidatorFiles.isCSVFieldValid(listItem['CartDomain']) && (newItem.cartDomain = listItem['CartDomain']);
                    ValidatorFiles.isCSVFieldValid(listItem['CartList']) && (newItem.cartList = listItem['CartList']);
                    ValidatorFiles.isCSVFieldValid(listItem['Quantity']) && (newItem.quantity = parseFloat(listItem['Quantity']));
                    ValidatorFiles.isCSVFieldValid(listItem['OneClickBuyable']) && (newItem.oneClickBuyable = listItem['OneClickBuyable'].toLowerCase() === 'yes');
                    ValidatorFiles.isCSVFieldValid(listItem['ToBeGiftWrapped']) && (newItem.toBeGiftWrapped = listItem['ToBeGiftWrapped'].toLowerCase() === 'yes');
                    ValidatorFiles.isCSVFieldValid(listItem['PrimeSubscription']) && (newItem.primeSubscription = listItem['PrimeSubscription'].toLowerCase() === 'yes');
                    ValidatorFiles.isCSVFieldValid(listItem['Pantry']) && (newItem.pantry = listItem['Pantry'].toLowerCase() === 'yes');
                    ValidatorFiles.isCSVFieldValid(listItem['AddOn']) && (newItem.addOn = listItem['AddOn'].toLowerCase() === 'yes');
                    return newItem;
                });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseRetailCartItems');
        }
        return undefined;
    }

    /**
     * @param data - file 'Digital-Ordering.2/Digital Items.csv' in input as Buffer
     */
    static async parseDigitalItems(data: Buffer): Promise<DigitalItemsAM | undefined> {
        try {
            let result: any = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: DigitalItemsAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: DigitalItemAM = {};
                    ValidatorFiles.isCSVFieldValid(listItem[`${this.INIT_CHAR}ASIN`]) && (newItem.ASIN = listItem[`${this.INIT_CHAR}ASIN`]);
                    ValidatorFiles.isCSVFieldValid(listItem['Title']) && (newItem.title = listItem['Title']);
                    ValidatorFiles.isCSVFieldValid(listItem['OrderId']) && (newItem.orderId = listItem['OrderId']);
                    ValidatorFiles.isCSVFieldValid(listItem['DigitalOrderItemId']) && (newItem.digitalOrderItemId = listItem['DigitalOrderItemId']);
                    ValidatorFiles.isCSVFieldValid(listItem['DeclaredCountryCode']) && (newItem.declaredCountryCode = listItem['DeclaredCountryCode']);
                    ValidatorFiles.isCSVFieldValid(listItem['BaseCurrencyCode']) && (newItem.baseCurrencyCode = listItem['BaseCurrencyCode']);
                    if(ValidatorFiles.isCSVFieldValid(listItem['FulfilledDate'])) {
                        let match = listItem['FulfilledDate'].match(/(\d+)-(\d+)-(\d+)/);
                        (match) && (newItem.fulfilledDate = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]))));
                    }
                    ValidatorFiles.isCSVFieldValid(listItem['IsFulfilled']) && (newItem.isFulfilled = listItem['IsFulfilled'].toLowerCase() === 'yes');
                    ValidatorFiles.isCSVFieldValid(listItem['Marketplace']) && (newItem.marketplace = listItem['Marketplace']);
                    if(ValidatorFiles.isCSVFieldValid(listItem['OrderDate'])) {
                        let match = listItem['OrderDate'].match(/(\d+)-(\d+)-(\d+)/);
                        (match) && (newItem.orderDate = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]))));
                    }
                    ValidatorFiles.isCSVFieldValid(listItem['OriginalQuantity']) && (newItem.originalQuantity = parseFloat(listItem['OriginalQuantity']));
                    ValidatorFiles.isCSVFieldValid(listItem['OurPrice']) && (newItem.ourPrice = parseFloat(listItem['OurPrice']));
                    ValidatorFiles.isCSVFieldValid(listItem['OurPriceCurrencyCode']) && (newItem.ourPriceCurrencyCode = listItem['OurPriceCurrencyCode']);
                    ValidatorFiles.isCSVFieldValid(listItem['OurPriceTax']) && (newItem.ourPriceTax = parseFloat(listItem['OurPriceTax']));
                    ValidatorFiles.isCSVFieldValid(listItem['OurPriceTaxCurrencyCode']) && (newItem.ourPriceTaxCurrencyCode = listItem['OurPriceTaxCurrencyCode']);
                    ValidatorFiles.isCSVFieldValid(listItem['SellerOfRecord']) && (newItem.sellerOfRecord = listItem['SellerOfRecord']);
                    ValidatorFiles.isCSVFieldValid(listItem['Publisher']) && (newItem.publisher = listItem['Publisher']);
                    ValidatorFiles.isCSVFieldValid(listItem['ThirdPartyDisplayPrice']) && (newItem.thirdPartyDisplayPrice = listItem['ThirdPartyDisplayPrice']);
                    ValidatorFiles.isCSVFieldValid(listItem['ThirdPartyDisplayCurrencyCode']) && (newItem.thirdPartyDisplayCurrencyCode = listItem['ThirdPartyDisplayCurrencyCode']);
                    ValidatorFiles.isCSVFieldValid(listItem['ListPriceAmount']) && (newItem.listPriceAmount = parseFloat(listItem['ListPriceAmount']));
                    ValidatorFiles.isCSVFieldValid(listItem['ListPriceCurrencyCode']) && (newItem.listPriceCurrencyCode = listItem['ListPriceCurrencyCode']);
                    ValidatorFiles.isCSVFieldValid(listItem['ListPriceTaxAmount']) && (newItem.listPriceTaxAmount = parseFloat(listItem['ListPriceTaxAmount']));
                    ValidatorFiles.isCSVFieldValid(listItem['ListPriceTaxCurrencyCode']) && (newItem.listPriceTaxCurrencyCode = listItem['ListPriceTaxCurrencyCode']);
                    ValidatorFiles.isCSVFieldValid(listItem['GiftItem']) && (newItem.giftItem = listItem['GiftItem'].toLowerCase() === 'yes');
                    ValidatorFiles.isCSVFieldValid(listItem['OrderingCustomerNickname']) && (newItem.orderingCustomerNickname = listItem['OrderingCustomerNickname']);
                    ValidatorFiles.isCSVFieldValid(listItem['GiftCustomerNickname']) && (newItem.giftCustomerNickname = listItem['GiftCustomerNickname']);
                    ValidatorFiles.isCSVFieldValid(listItem['GiftMessage']) && (newItem.giftMessage = listItem['GiftMessage']);
                    ValidatorFiles.isCSVFieldValid(listItem['GiftEmail']) && (newItem.giftEmail = listItem['GiftEmail']);
                    ValidatorFiles.isCSVFieldValid(listItem['RecipientEmail']) && (newItem.recipientEmail = listItem['RecipientEmail']);
                    ValidatorFiles.isCSVFieldValid(listItem['GiftRedemption']) && (newItem.giftRedemption = listItem['GiftRedemption']);
                    ValidatorFiles.isCSVFieldValid(listItem['ItemMergedFromAnotherOrder']) && (newItem.itemMergedFromAnotherOrder = listItem['ItemMergedFromAnotherOrder']);
                    ValidatorFiles.isCSVFieldValid(listItem['QuantityOrdered']) && (newItem.quantityOrdered = parseFloat(listItem['QuantityOrdered']));
                    ValidatorFiles.isCSVFieldValid(listItem['ItemFulfilled']) && (newItem.itemFulfilled = listItem['ItemFulfilled']);
                    ValidatorFiles.isCSVFieldValid(listItem['ShipFrom']) && (newItem.shipFrom = listItem['ShipFrom']);
                    ValidatorFiles.isCSVFieldValid(listItem['ShipTo']) && (newItem.shipTo = listItem['ShipTo']);
                    ValidatorFiles.isCSVFieldValid(listItem['IsOrderEligibleForPrimeBenefit']) && (newItem.isOrderEligibleForPrimeBenefit = listItem['IsOrderEligibleForPrimeBenefit'].toLowerCase() === 'yes');
                    ValidatorFiles.isCSVFieldValid(listItem['OfferingSKU']) && (newItem.offeringSKU = listItem['OfferingSKU']);
                    ValidatorFiles.isCSVFieldValid(listItem['FulfillmentMobileNumber']) && (newItem.fulfillmentMobileNumber = listItem['FulfillmentMobileNumber']);
                    ValidatorFiles.isCSVFieldValid(listItem['RechargeAmount']) && (newItem.rechargeAmount = parseFloat(listItem['RechargeAmount']));
                    ValidatorFiles.isCSVFieldValid(listItem['RechargeAmountCurrencyCode']) && (newItem.rechargeAmountCurrencyCode = listItem['RechargeAmountCurrencyCode']);
                    ValidatorFiles.isCSVFieldValid(listItem['SubscriptionOrderInfoList']) && (newItem.subscriptionOrderInfoList = listItem['SubscriptionOrderInfoList']);
                    ValidatorFiles.isCSVFieldValid(listItem['PreviouslyPaidDigitalOrderItemId']) && (newItem.previouslyPaidDigitalOrderItemId = listItem['PreviouslyPaidDigitalOrderItemId']);
                    ValidatorFiles.isCSVFieldValid(listItem['PreviouslyPaidOrderId']) && (newItem.previouslyPaidOrderId = listItem['PreviouslyPaidOrderId']);
                    ValidatorFiles.isCSVFieldValid(listItem['InstallmentOurPrice']) && (newItem.installmentOurPrice = listItem['InstallmentOurPrice']);
                    ValidatorFiles.isCSVFieldValid(listItem['InstallmentOurPricePlusTax']) && (newItem.installmentOurPricePlusTax = listItem['InstallmentOurPricePlusTax']);
                    ValidatorFiles.isCSVFieldValid(listItem['DigitalOrderItemAttributes']) && (newItem.digitalOrderItemAttributes = listItem['DigitalOrderItemAttributes']);
                    ValidatorFiles.isCSVFieldValid(listItem['InstallmentOurPriceCurrencyCode']) && (newItem.installmentOurPriceCurrencyCode = listItem['InstallmentOurPriceCurrencyCode']);
                    ValidatorFiles.isCSVFieldValid(listItem['InstallmentOurPricePlusTaxCurrencyCode']) && (newItem.installmentOurPricePlusTaxCurrencyCode = listItem['InstallmentOurPricePlusTaxCurrencyCode']);
                    return newItem;
                });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseDigitalItems');
        }
        return undefined;
    }

    /**
     * @param data - file 'Digital-Ordering.2/Digital Orders.csv' in input as Buffer
     */
    static async parseDigitalOrders(data: Buffer): Promise<DigitalOrdersAM | undefined> {
        try {
            let result: any = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: DigitalOrdersAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: DigitalOrderAM = {};
                    ValidatorFiles.isCSVFieldValid(listItem[`${this.INIT_CHAR}OrderId`]) && (newItem.orderId = listItem[`${this.INIT_CHAR}OrderId`]);
                    ValidatorFiles.isCSVFieldValid(listItem['BillingAddress']) && (newItem.billingAddress = listItem['BillingAddress']);
                    ValidatorFiles.isCSVFieldValid(listItem['ShippingAddress']) && (newItem.shippingAddress = listItem['ShippingAddress']);
                    ValidatorFiles.isCSVFieldValid(listItem['CustomerDeclaredAddress']) && (newItem.customerDeclaredAddress = listItem['CustomerDeclaredAddress']);
                    ValidatorFiles.isCSVFieldValid(listItem['OrderStatus']) && (newItem.orderStatus = listItem['OrderStatus']);
                    ValidatorFiles.isCSVFieldValid(listItem['Marketplace']) && (newItem.marketplace = listItem['Marketplace']);
                    ValidatorFiles.isCSVFieldValid(listItem['IsOrderFreeReplacement']) && (newItem.isOrderFreeReplacement = listItem['IsOrderFreeReplacement'].toLowerCase() === 'yes');
                    ValidatorFiles.isCSVFieldValid(listItem['IsOrderAPreorder']) && (newItem.isOrderAPreorder = listItem['IsOrderAPreorder'].toLowerCase() === 'yes');
                    ValidatorFiles.isCSVFieldValid(listItem['DoesOrderDependOnAnotherOrder']) && (newItem.doesOrderDependOnAnotherOrder = listItem['DoesOrderDependOnAnotherOrder'].toLowerCase() === 'yes');
                    ValidatorFiles.isCSVFieldValid(listItem['OrderingLocationCountry']) && (newItem.orderingLocationCountry = listItem['OrderingLocationCountry']);
                    if (ValidatorFiles.isCSVFieldValid(listItem['OrderDate'])) {
                        let match = listItem['OrderDate'].match(/(\d+)-(\d+)-(\d+)/);
                        (match) && (newItem.orderDate = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]))));
                    }
                    ValidatorFiles.isCSVFieldValid(listItem['RelatedPhysicalOrderId']) && (newItem.relatedPhysicalOrderId = listItem['RelatedPhysicalOrderId']);
                    ValidatorFiles.isCSVFieldValid(listItem['ShoppingMarketplaceId']) && (newItem.shoppingMarketplaceId = listItem['ShoppingMarketplaceId']);
                    ValidatorFiles.isCSVFieldValid(listItem['PaidByOtherCustomer']) && (newItem.paidByOtherCustomer = listItem['PaidByOtherCustomer']);
                    ValidatorFiles.isCSVFieldValid(listItem['MultifactorAuthenticationStatus (depreciated)']) && (newItem.multifactorAuthenticationStatus = listItem['MultifactorAuthenticationStatus (depreciated)']);
                    ValidatorFiles.isCSVFieldValid(listItem['SubscriptionOrderType']) && (newItem.subscriptionOrderType = listItem['SubscriptionOrderType']);
                    ValidatorFiles.isCSVFieldValid(listItem['AlternativeOrderProvidingPayment']) && (newItem.alternativeOrderProvidingPayment = listItem['AlternativeOrderProvidingPayment']);
                    ValidatorFiles.isCSVFieldValid(listItem['PaymentInformation']) && (newItem.paymentInformation = listItem['PaymentInformation']);
                    ValidatorFiles.isCSVFieldValid(listItem['DeliveryPacketId']) && (newItem.deliveryPacketId = listItem['DeliveryPacketId']);
                    ValidatorFiles.isCSVFieldValid(listItem['DeliveryStatus']) && (newItem.deliveryStatus = listItem['DeliveryStatus']);
                    if(ValidatorFiles.isCSVFieldValid(listItem['DeliveryDate'])) {
                        let match = listItem['DeliveryDate'].match(/(\d+)-(\d+)-(\d+)/);
                        (match) && (newItem.deliveryDate = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]))));
                    }
                    if(ValidatorFiles.isCSVFieldValid(listItem['GiftClaimDate'])) {
                        let match = listItem['GiftClaimDate'].match(/(\d+)-(\d+)-(\d+)/);
                        (match) && (newItem.giftClaimDate = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]))));
                    }
                    ValidatorFiles.isCSVFieldValid(listItem['SessionId']) && (newItem.sessionId = listItem['SessionId']);
                    ValidatorFiles.isCSVFieldValid(listItem['UniqueBrowserId']) && (newItem.uniqueBrowserId = listItem['UniqueBrowserId']);
                    return newItem;
                });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseDigitalOrders');
        }
        return undefined;
    }

    /**
     * @param data - file 'Digital-Ordering.2/Digital Orders Monetary.csv' in input as Buffer
     */
    static async parseDigitalOrdersMonetary(data: Buffer): Promise<DigitalOrdersMonetaryAM | undefined> {
        try {
            let result: any = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: DigitalOrdersMonetaryAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: DigitalOrderMonetaryAM = {};
                    ValidatorFiles.isCSVFieldValid(listItem[`${this.INIT_CHAR}DigitalOrderItemId`]) && (newItem.digitalOrderItemId = listItem[`${this.INIT_CHAR}DigitalOrderItemId`]);
                    ValidatorFiles.isCSVFieldValid(listItem['DeliveryPacketId']) && (newItem.deliveryPacketId = listItem['DeliveryPacketId']);
                    ValidatorFiles.isCSVFieldValid(listItem['AffectedItemQuantity']) && (newItem.affectedItemQuantity = parseFloat(listItem['AffectedItemQuantity']));
                    ValidatorFiles.isCSVFieldValid(listItem['TransactionAmount']) && (newItem.transactionAmount = parseFloat(listItem['TransactionAmount']));
                    ValidatorFiles.isCSVFieldValid(listItem['BaseCurrencyCode']) && (newItem.baseCurrencyCode = listItem['BaseCurrencyCode']);
                    ValidatorFiles.isCSVFieldValid(listItem['ClaimCode']) && (newItem.claimCode = listItem['ClaimCode']);
                    ValidatorFiles.isCSVFieldValid(listItem['FXTransactionAmount']) && (newItem.FXTransactionAmount = listItem['FXTransactionAmount']);
                    ValidatorFiles.isCSVFieldValid(listItem['FXCurrencyCode']) && (newItem.FXCurrencyCode = listItem['FXCurrencyCode']);
                    ValidatorFiles.isCSVFieldValid(listItem['MonetaryComponentTypeCode']) && (newItem.monetaryComponentTypeCode = listItem['MonetaryComponentTypeCode']);
                    ValidatorFiles.isCSVFieldValid(listItem['OfferTypeCode']) && (newItem.offerTypeCode = listItem['OfferTypeCode']);
                    return newItem;
                });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseDigitalOrdersMonetary');
        }
        return undefined;
    }
}

