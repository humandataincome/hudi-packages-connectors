import Logger from "../../utils/logger";
import {Parser} from "../../utils/parser";
import {Months} from "../../utils";
import {
    AdvertisersAudienceAM, AdvertisersClickedAM, AmazonAudienceAM,
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
    SearchDataCustomerEngagementAM, ThirdPartiesAudienceAM,
    TitleAM,
    TwitchPrimeSubscriptionAM,
    TwitchPrimeSubscriptionsAM,
    ViewingActivityAM,
    WishlistAM
} from './model.amazon';
import { ValidatorObject } from '../../utils/validator/validator.object';
import {FileCodeAmazon} from "./enum.amazon";

/**
 * Class used to parse most important files into the directory returned by Amazon in CSV and JSON format.
 * All the files are given in input as Buffer, parsed to JSON and then mapped into a specific interface model.
 * All functions return the relevant information (if there are any) as a promised model if the parsing is successful, undefined otherwise.
 */
export class ServiceAmazon {
    private static readonly logger = new Logger("Amazon Service");
    private static readonly INIT_CHAR = '﻿';

    /**
     * Abstraction to parse an Amazon file regardless its respective parsing function
     * @param fileCode - code of the file to parse
     * @param data - file to parse as Buffer
     */
    static async parseFile(fileCode: FileCodeAmazon, data: Buffer) {
        switch (fileCode) {
            case FileCodeAmazon.ADV_THIRDPARTIES:
                return this.parseThirdPartyAudiences(data);
            case FileCodeAmazon.ADV_AUDIENCES:
                return this.parseAdvertiserAudiences(data);
            case FileCodeAmazon.ADV_CLICKS:
                return this.parseAdvertiserClicked(data);
            case FileCodeAmazon.AUDIENCES:
                return this.parseAmazonAudiences(data);
            case FileCodeAmazon.WISHLIST:
                return this.parseAmazonWishlists(data);
            case FileCodeAmazon.AUDIBLE_LIBRARY:
                return this.parseAudibleLibrary(data);
            case FileCodeAmazon.AUDIBLE_LISTENING:
                return this.parseAudibleListening(data);
            case FileCodeAmazon.AUDIBLE_MEMBERSHIP_BILLINGS:
                return this.parseAudibleMembershipBillings(data);
            case FileCodeAmazon.PRIMEVIDEO_WATCHLIST:
                return this.parsePrimeVideoWatchlist(data);
            case FileCodeAmazon.PRIMEVIDEO_WATCHLIST_HISTORY:
                return this.parsePrimeVideoWatchlistHistory(data);
            case FileCodeAmazon.PRIMEVIDEO_VIEW_COUNT:
                return this.parseDigitalPrimeVideoViewCounts(data);
            case FileCodeAmazon.PRIMEVIDEO_VIEWINGHISTORY:
                return this.parsePrimeVideoViewingHistory(data);
            case FileCodeAmazon.DIGITAL_ORDERING_ITEM:
                return this.parseDigitalItems(data);
            case FileCodeAmazon.DIGITAL_ORDERING_ORDERS:
                return this.parseDigitalOrders(data);
            case FileCodeAmazon.DIGITAL_ORDERING_MONETARY:
                return this.parseDigitalOrdersMonetary(data);
            case FileCodeAmazon.DIGITAL_SUBSCRIPTION:
                return this.parseDigitalSubscriptions(data);
            case FileCodeAmazon.RETAIL_LIGHT_WEIGHT_INTERACTIONS:
                return this.parseLightWeightInteractions(data);
            case FileCodeAmazon.RETAIL_CART_ITEMS:
                return this.parseRetailCartItems(data);
            case FileCodeAmazon.RETAIL_ORDER_HISTORY:
                return this.parseRetailOrderHistory(data);
            case FileCodeAmazon.RETAIL_REGION_AUTHORITY:
                return this.parseRetailRegionAuthorities(data);
            case FileCodeAmazon.RETAIL_SELLER_FEEDBACK:
                return this.parseRetailSellerFeedback(data);
            case FileCodeAmazon.CUSTOMER_ENGAGEMENT:
                return this.parseSearchDataCustomerEngagement(data);
            case FileCodeAmazon.GAMES_TWITCHPRIME_SUB_HISTORY:
                return this.parseTwitchPrimeSubscription(data);
            default:
                return undefined;
        }
    }

    /**
     * @param data - FileCodeAmazon.PRIMEVIDEO_WATCHLIST file in input as Buffer
     */
    static async parsePrimeVideoWatchlist(data: Buffer): Promise<PrimeVideoWatchlistAM | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: PrimeVideoWatchlistAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: TitleAM = {}, match;
                    ValidatorObject.isCSVFieldValid(listItem.catalogTitle) && (newItem.catalogTitle = listItem.catalogTitle);
                    if (ValidatorObject.isCSVFieldValid(listItem[`${this.INIT_CHAR}"itemAddedDate"`])) {
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
     * @param data - FileCodeAmazon.PRIMEVIDEO_WATCHLIST_HISTORY file in input as Buffer
     */
    static async parsePrimeVideoWatchlistHistory(data: Buffer): Promise<PrimeVideoWatchlistHistoryAM | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: PrimeVideoWatchlistHistoryAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: TitleAM = {}, match;
                    ValidatorObject.isCSVFieldValid(listItem[`${this.INIT_CHAR}"listId"`]) && (newItem.listId = listItem[`${this.INIT_CHAR}"listId"`]);
                    ValidatorObject.isCSVFieldValid(listItem.itemAddedDate) && (match = listItem.itemAddedDate.match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+)/));
                    ValidatorObject.isCSVFieldValid(listItem.itemAddedDate) && (newItem.itemAddedDate = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), 0)));
                    ValidatorObject.isCSVFieldValid(listItem.itemType) && (newItem.itemType = listItem.itemType);
                    ValidatorObject.isCSVFieldValid(listItem.deleted) && (newItem.deleted = listItem.deleted == '1');
                    ValidatorObject.isCSVFieldValid(listItem.catalogTitle) && (newItem.catalogTitle = listItem.catalogTitle);
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
     * @param data - FileCodeAmazon.PRIMEVIDEO_VIEWINGHISTORY file in input as Buffer
     */
    static async parsePrimeVideoViewingHistory(data: Buffer): Promise<PrimeVideoViewingHistoryAM | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: PrimeVideoViewingHistoryAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: ViewingActivityAM = {}, match;
                    if (ValidatorObject.isCSVFieldValid(listItem[`${this.INIT_CHAR}Playback Hour`])) {
                        (match = listItem[`${this.INIT_CHAR}Playback Hour`].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+)/));
                        (match) && (newItem.playbackHour = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    }
                    ValidatorObject.isCSVFieldValid(listItem['Operating System']) && (newItem.operatingSystem = listItem['Operating System']);
                    ValidatorObject.isCSVFieldValid(listItem['Browser']) && (newItem.browser = listItem['Browser']);
                    ValidatorObject.isCSVFieldValid(listItem['Delivery Type']) && (newItem.deliveryType = listItem['Delivery Type']);
                    ValidatorObject.isCSVFieldValid(listItem['City']) && (newItem.city = listItem['City']);
                    ValidatorObject.isCSVFieldValid(listItem['Country']) && (newItem.country = listItem['Country']);
                    ValidatorObject.isCSVFieldValid(listItem['ISP']) && (newItem.ISP = listItem['ISP']);
                    ValidatorObject.isCSVFieldValid(listItem['State']) && (newItem.state = listItem['State']);
                    ValidatorObject.isCSVFieldValid(listItem['Content Quality Entitled']) && (newItem.contentQuality = listItem['Content Quality Entitled']);
                    ValidatorObject.isCSVFieldValid(listItem['Entitlement Type']) && (newItem.entitlementType = listItem['Entitlement Type']);
                    ValidatorObject.isCSVFieldValid(listItem['Video Type']) && (newItem.videoType = listItem['Video Type']);
                    ValidatorObject.isCSVFieldValid(listItem['Audio Language']) && (newItem.audioLanguage = listItem['Audio Language']);
                    ValidatorObject.isCSVFieldValid(listItem['Title']) && (newItem.title = listItem['Title']);
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
     * @param data - FileCodeAmazon.CUSTOMER_ENGAGEMENT file in input as Buffer
     */
    static async parseSearchDataCustomerEngagement(data: Buffer): Promise<SearchDataCustomerEngagementAM | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: SearchDataCustomerEngagementAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: SearchAM = {}, match;
                    if (ValidatorObject.isCSVFieldValid(listItem[`${this.INIT_CHAR}First Search Time (GMT)`])) {
                        match = listItem[`${this.INIT_CHAR}First Search Time (GMT)`].match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/);
                        (match) && (newItem.firstSearchTime = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    }
                    ValidatorObject.isCSVFieldValid(listItem['Country ID']) && (newItem.countryID = listItem['Country ID']);
                    ValidatorObject.isCSVFieldValid(listItem['All Department (APS) or Category']) && (newItem.APSorCategory = listItem['All Department (APS) or Category']);
                    ValidatorObject.isCSVFieldValid(listItem['Site Variant']) && (newItem.siteVariant = listItem['Site Variant']);
                    ValidatorObject.isCSVFieldValid(listItem['Application / Browser Name']) && (newItem.appOrBrowser = listItem['Application / Browser Name']);
                    ValidatorObject.isCSVFieldValid(listItem['Device Model']) && (newItem.deviceModel = listItem['Device Model']);
                    ValidatorObject.isCSVFieldValid(listItem['Search Type (Keyword,Visual,Browse)']) && (newItem.searchType = listItem['Search Type (Keyword,Visual,Browse)']);
                    ValidatorObject.isCSVFieldValid(listItem['Session ID']) && (newItem.sessionID = listItem['Session ID']);
                    ValidatorObject.isCSVFieldValid(listItem['Query ID']) && (newItem.queryID = listItem['Query ID']);
                    ValidatorObject.isCSVFieldValid(listItem['Prime Customer (Y/N)']) && (newItem.primeCustomer = listItem['Prime Customer (Y/N)'] === '1');
                    ValidatorObject.isCSVFieldValid(listItem['Is From External Link (Y/N)']) && (newItem.isFromExternalLink = listItem['Is From External Link (Y/N)'] === '1');
                    ValidatorObject.isCSVFieldValid(listItem['Search From External Site (Y/N)']) && (newItem.searchFromExternalSite = listItem['Search From External Site (Y/N)'] === '1');
                    ValidatorObject.isCSVFieldValid(listItem['First Search Query String']) && (newItem.firstSearchQuery = listItem['First Search Query String']);
                    ValidatorObject.isCSVFieldValid(listItem['Application Name']) && (newItem.applicationName = listItem['Application Name']);
                    ValidatorObject.isCSVFieldValid(listItem['App Version']) && (newItem.appVersion = listItem['App Version']);
                    ValidatorObject.isCSVFieldValid(listItem['Operating System Name']) && (newItem.operatingSystemName = listItem['Operating System Name']);
                    ValidatorObject.isCSVFieldValid(listItem['Operating System Version']) && (newItem.operatingSystemVersion = listItem['Operating System Version']);
                    ValidatorObject.isCSVFieldValid(listItem['Device Type ID']) && (newItem.deviceTypeID = listItem['Device Type ID']);
                    ValidatorObject.isCSVFieldValid(listItem['Device Category']) && (newItem.deviceCategory = listItem['Device Category']);
                    ValidatorObject.isCSVFieldValid(listItem['Customer IP']) && (newItem.customerIP = listItem['Customer IP']);
                    ValidatorObject.isCSVFieldValid(listItem['Search Method']) && (newItem.searchMethod = listItem['Search Method']);
                    ValidatorObject.isCSVFieldValid(listItem['Keywords']) && (newItem.keywords = listItem['Keywords']);
                    ValidatorObject.isCSVFieldValid(listItem['Amazon Business Customer (Y/N)']) && (newItem.isBusinessCustomer = listItem['Amazon Business Customer (Y/N)'] === '1');
                    ValidatorObject.isCSVFieldValid(listItem['Language']) && (newItem.language = listItem['Language']);
                    ValidatorObject.isCSVFieldValid(listItem['Server']) && (newItem.server = listItem['Server']);
                    ValidatorObject.isCSVFieldValid(listItem['Amazon Fresh Customer (Y/N)']) && (newItem.isFreshCustomer = listItem['Amazon Fresh Customer (Y/N)'] === '1');
                    ValidatorObject.isCSVFieldValid(listItem['Music Subscriber (Y/N)']) && (newItem.isMusicSubscriber = listItem['Music Subscriber (Y/N)'] === '1');
                    ValidatorObject.isCSVFieldValid(listItem['First Browse Node']) && (newItem.firstBrowseNode = listItem['First Browse Node']);
                    ValidatorObject.isCSVFieldValid(listItem['Last search Time (GMT)']) && (match = listItem['Last search Time (GMT)'].match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+).0/));
                    ValidatorObject.isCSVFieldValid(listItem['Last search Time (GMT)']) && (newItem.lastSearchTime = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    ValidatorObject.isCSVFieldValid(listItem['Last Department']) && (newItem.lastDepartment = listItem['Last Department']);
                    ValidatorObject.isCSVFieldValid(listItem['Last Browse Node']) && (newItem.lastBrowseNode = listItem['Last Browse Node']);
                    ValidatorObject.isCSVFieldValid(listItem['Last Known Customer ID']) && (newItem.lastKnownCustomerID = listItem['Last Known Customer ID']);
                    ValidatorObject.isCSVFieldValid(listItem['First Added Item']) && (newItem.firstAddedItem = listItem['First Added Item']);
                    ValidatorObject.isCSVFieldValid(listItem['First Purchased Item']) && (newItem.firstPurchasedItem = listItem['First Purchased Item']);
                    ValidatorObject.isCSVFieldValid(listItem['First Consumed Item (Subscription)']) && (newItem.firstConsumedItem = listItem['First Consumed Item (Subscription)']);
                    ValidatorObject.isCSVFieldValid(listItem['Number of Clicked Items']) && (newItem.numberClickedItem = listItem['Number of Clicked Items']);
                    ValidatorObject.isCSVFieldValid(listItem['Number of Items Added to Cart']) && (newItem.numberItemsAddedCart = listItem['Number of Items Added to Cart']);
                    ValidatorObject.isCSVFieldValid(listItem['Number of Items Ordered']) && (newItem.numberItemsOrdered = listItem['Number of Items Ordered']);
                    ValidatorObject.isCSVFieldValid(listItem['Number of Paid Items Ordered']) && (newItem.numberPaidItemsOrdered = listItem['Number of Paid Items Ordered']);
                    ValidatorObject.isCSVFieldValid(listItem['Number of Free Items Ordered']) && (newItem.numberFreeItemsOrdered = listItem['Number of Free Items Ordered']);
                    ValidatorObject.isCSVFieldValid(listItem['Units Ordered']) && (newItem.unitsOrdered = listItem['Units Ordered']);
                    ValidatorObject.isCSVFieldValid(listItem['Paid Units Ordered']) && (newItem.paidUnitsOrdered = listItem['Paid Units Ordered']);
                    ValidatorObject.isCSVFieldValid(listItem['Free Units Ordered']) && (newItem.freeUnitsOrdered = listItem['Free Units Ordered']);
                    ValidatorObject.isCSVFieldValid(listItem['Maximum Purchase Price']) && (newItem.maximumPurchasePrice = listItem['Maximum Purchase Price']);
                    ValidatorObject.isCSVFieldValid(listItem['Clicked Any Item (Y/N)']) && (newItem.clickedAnyItem = listItem['Clicked Any Item (Y/N)'] === '1');
                    ValidatorObject.isCSVFieldValid(listItem['Added Any Item (Y/N)']) && (newItem.addedAnyItem = listItem['Added Any Item (Y/N)'] === '1');
                    ValidatorObject.isCSVFieldValid(listItem['Purchased Any Item (Y/N)']) && (newItem.purchasedAnyItem = listItem['Purchased Any Item (Y/N)'] === '1');
                    ValidatorObject.isCSVFieldValid(listItem['Department Count']) && (newItem.departmentCount = listItem['Department Count']);
                    ValidatorObject.isCSVFieldValid(listItem['Shopping Refinement']) && (newItem.shoppingRefinement = listItem['Shopping Refinement']);
                    ValidatorObject.isCSVFieldValid(listItem['Number of Shopping Refinements']) && (newItem.numberShoppingRefinements = listItem['Number of Shopping Refinements']);
                    ValidatorObject.isCSVFieldValid(listItem['Highest Number of Shopping Refinements']) && (newItem.highestNumberShoppingRefinements = listItem['Highest Number of Shopping Refinements']);
                    ValidatorObject.isCSVFieldValid(listItem['Items Consumed (Subscription)']) && (newItem.itemConsumed = listItem['Items Consumed (Subscription)']);
                    ValidatorObject.isCSVFieldValid(listItem['Shopping Refinement Pickers']) && (newItem.shoppingRefinementPickers = listItem['Shopping Refinement Pickers']);
                    ValidatorObject.isCSVFieldValid(listItem['Paid Purchase (Y/N)']) && (newItem.paidPurchase = listItem['Paid Purchase (Y/N)'] === '1');
                    ValidatorObject.isCSVFieldValid(listItem['Item Borrowed (Y/N)']) && (newItem.isItemBorrowed = listItem['Item Borrowed (Y/N)'] === '1');
                    ValidatorObject.isCSVFieldValid(listItem['Items Borrowed']) && (newItem.itemsBorrowed = listItem['Items Borrowed']);
                    ValidatorObject.isCSVFieldValid(listItem['Next Query Group via Click']) && (newItem.nextQueryGroupViaClick = listItem['Next Query Group via Click']);
                    ValidatorObject.isCSVFieldValid(listItem['Query Abandoned (Y/N)']) && (newItem.queryAbandoned = listItem['Query Abandoned (Y/N)'] === '1');
                    ValidatorObject.isCSVFieldValid(listItem['Query Reformulated (Y/N)']) && (newItem.queryReformulated = listItem['Query Reformulated (Y/N)'] === '1');
                    ValidatorObject.isCSVFieldValid(listItem['Amazon Fresh (Y/N)']) && (newItem.amazonFresh = listItem['Amazon Fresh (Y/N)'] === '1');
                    ValidatorObject.isCSVFieldValid(listItem['Store Visited']) && (newItem.storeVisited = listItem['Store Visited']);
                    ValidatorObject.isCSVFieldValid(listItem['Department']) && (newItem.department = listItem['Department']);
                    ValidatorObject.isCSVFieldValid(listItem['Browse Node']) && (newItem.browserNode = listItem['Browse Node']);
                    ValidatorObject.isCSVFieldValid(listItem['First Search Domain']) && (newItem.firstSearchDomain = listItem['First Search Domain']);
                    ValidatorObject.isCSVFieldValid(listItem['Is First Search From External Ad']) && (newItem.isFirstSearchFromExternalAd = listItem['Is First Search From External Ad'].toLowerCase() == 'yes');
                    ValidatorObject.isCSVFieldValid(listItem['User Agent Info Family']) && (newItem.userAgentInfoFamily = listItem['User Agent Info Family']);
                    ValidatorObject.isCSVFieldValid(listItem.LKCI) && (newItem.LKCI = listItem['LKCI']);
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
     * @param data - FileCodeAmazon.WISHLIST file in input as Buffer
     */
    static async parseAmazonWishlists(data: Buffer): Promise<AmazonWishlistsAM | undefined> {
        try {
            let document = JSON.parse(data.toString());
            if(document) {
                let regex = /(.*) \[(.*)]/;
                let model: AmazonWishlistsAM = {lists: []};
                let wishList: WishlistAM = {itemList: []};
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
     * @param data - FileCodeAmazon.AUDIBLE_LIBRARY file in input as Buffer
     */
    static async parseAudibleLibrary(data: Buffer): Promise<AudibleLibraryAM | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: AudibleLibraryAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: AudioBookAM = {};
                    if(ValidatorObject.isCSVFieldValid(listItem[`${this.INIT_CHAR}"DateAdded"`])) {
                        let match = listItem[`${this.INIT_CHAR}"DateAdded"`].match(/(\d+)-(\w+)-(\d+)/);
                        let monthIndex = Months[match[2]];
                        (monthIndex) && (newItem.dateAdded = new Date(Date.UTC(parseInt(match[3]), parseInt(monthIndex) - 1, parseInt(match[1]), 0, 0, 0)));
                    }
                    ValidatorObject.isCSVFieldValid(listItem.Title) && (newItem.title = listItem.Title);
                    ValidatorObject.isCSVFieldValid(listItem.Asin) && (newItem.asin = listItem.Asin);
                    ValidatorObject.isCSVFieldValid(listItem.IsDownloaded) && (newItem.isDownloaded = listItem.IsDownloaded.toLowerCase() === 'y');
                    ValidatorObject.isCSVFieldValid(listItem.IsDeleted) && (newItem.isDeleted = listItem.IsDeleted.toLowerCase() === 'y');
                    ValidatorObject.isCSVFieldValid(listItem.DeleteBy) && (newItem.deleteBy = listItem.DeleteBy);
                    if(ValidatorObject.isCSVFieldValid(listItem.DateDeleted)) {
                        let match = listItem.DateDeleted.match(/(\d+)-(\w+)-(\d+)/);
                        let monthIndex = Months[match[2]];
                        (monthIndex) && (newItem.dateDeleted = new Date(Date.UTC(parseInt(match[3]), parseInt(monthIndex) - 1, parseInt(match[1]), 0, 0, 0)));
                    }
                    ValidatorObject.isCSVFieldValid(listItem.IsPublic) && (newItem.isPublic = listItem.IsPublic.toLowerCase() === 'y');
                    ValidatorObject.isCSVFieldValid(listItem.IsStreamed) && (newItem.isStreamed = listItem.IsStreamed.toLowerCase() === 'y');
                    ValidatorObject.isCSVFieldValid(listItem.IsPreorder) && (newItem.isPreorder = listItem.IsPreorder.toLowerCase() === 'y');
                    ValidatorObject.isCSVFieldValid(listItem.Downloads) && (newItem.downloads = listItem.Downloads);
                    if (ValidatorObject.isCSVFieldValid(listItem.DateFirstDownloaded)) {
                        let match = listItem.DateFirstDownloaded.match(/(\d+)-(\w+)-(\d+)/);
                        let monthIndex = Months[match[2]];
                        (monthIndex) && (newItem.dateFirstDownloaded = new Date(Date.UTC(parseInt(match[3]), parseInt(monthIndex) - 1, parseInt(match[1]), 0, 0, 0)));
                    }
                    ValidatorObject.isCSVFieldValid(listItem.OrderNumber) && (newItem.orderNumber = listItem.OrderNumber);
                    ValidatorObject.isCSVFieldValid(listItem.OriginType) && (newItem.originType = listItem.OriginType);
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
     * @param data - FileCodeAmazon.ADV_AUDIENCES file in input as Buffer
     */
    static async parseAdvertiserAudiences(data: Buffer): Promise<AdvertisersAudienceAM | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: AdvertisersAudienceAM = {list: []}
                result.forEach((listItem: any) => {
                    let parameter = `${this.INIT_CHAR}Advertisers who brought audiences in which you are included`;
                    ValidatorObject.isCSVFieldValid(listItem[parameter]) && (model.list.push({value: listItem[parameter]}));
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
     * @param data - FileCodeAmazon.ADV_CLICKS file in input as Buffer
     */
    static async parseAdvertiserClicked(data: Buffer): Promise<AdvertisersClickedAM | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: AdvertisersClickedAM = {list: []}
                result.forEach((listItem: any) => {
                    let parameter = `${this.INIT_CHAR}Advertisers whose ads you clicked`;
                    ValidatorObject.isCSVFieldValid(listItem[parameter]) && (model.list.push({value: listItem[parameter]}));
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
     * @param data - FileCodeAmazon.ADV_THIRDPARTIES file in input as Buffer
     */
    static async parseThirdPartyAudiences(data: Buffer): Promise<ThirdPartiesAudienceAM | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: ThirdPartiesAudienceAM = {list: []}
                result.forEach((listItem: any) => {
                    let parameter = `${this.INIT_CHAR}Audiences in which you are included via 3rd Parties`;
                    ValidatorObject.isCSVFieldValid(listItem[parameter]) && (model.list.push({value: listItem[parameter]}));
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
     * @param data - FileCodeAmazon.AUDIENCES file in input as Buffer
     */
    static async parseAmazonAudiences(data: Buffer): Promise<AmazonAudienceAM | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: AmazonAudienceAM = {list: []}
                result.forEach((listItem: any) => {
                    let parameter = `${this.INIT_CHAR}Amazon Audiences in which you are included`;
                    ValidatorObject.isCSVFieldValid(listItem[parameter]) && (model.list.push({value: listItem[parameter]}));
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
     * @param data - GAMES_TWITCHPRIME_SUB_HISTORY file in input as Buffer
     */
    static async parseTwitchPrimeSubscription(data: Buffer): Promise<TwitchPrimeSubscriptionsAM | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: TwitchPrimeSubscriptionsAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: TwitchPrimeSubscriptionAM = {}, match;
                    ValidatorObject.isCSVFieldValid(listItem[`${this.INIT_CHAR}Timestamp`]) && (match = listItem[`${this.INIT_CHAR}Timestamp`].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+)/));
                    (match) && (newItem.date = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), 0)));
                    ValidatorObject.isCSVFieldValid(listItem.BalanceTrackerOperation) && (newItem.balanceTrackerOperation = listItem.BalanceTrackerOperation);
                    ValidatorObject.isCSVFieldValid(listItem.SubscriptionCreditOperation) && (newItem.subscriptionCreditOperation = listItem.SubscriptionCreditOperation);
                    ValidatorObject.isCSVFieldValid(listItem.SubscriptionCreditsSpent) && (newItem.subscriptionCreditsSpent = listItem.SubscriptionCreditsSpent);
                    ValidatorObject.isCSVFieldValid(listItem.ProcessedSubscriptionCreditsSpent) && (newItem.processedSubscriptionCreditsSpent = listItem.ProcessedSubscriptionCreditsSpent);
                    ValidatorObject.isCSVFieldValid(listItem.SubscriptionCreditBalanceChange) && (newItem.subscriptionCreditBalanceChange = listItem.SubscriptionCreditBalanceChange);
                    ValidatorObject.isCSVFieldValid(listItem.RemainingSubscriptionCreditBalance) && (newItem.remainingSubscriptionCreditBalance = listItem.RemainingSubscriptionCreditBalance);
                    ValidatorObject.isCSVFieldValid(listItem.StreamerName) && (newItem.streamerName = listItem.StreamerName);
                    ValidatorObject.isCSVFieldValid(listItem.StreamerLinkedChannels) && (newItem.streamerLinkedChannels = listItem.StreamerLinkedChannels);
                    ValidatorObject.isCSVFieldValid(listItem.SpenderTwitchUserID) && (newItem.spenderTwitchUserID = listItem.SpenderTwitchUserID);
                    ValidatorObject.isCSVFieldValid(listItem.CustomerServiceNote) && (newItem.customerServiceNote = listItem.CustomerServiceNote);
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
     * @param data - FileCodeAmazon.RETAIL_ORDER_HISTORY file in input as Buffer
     */
    static async parseRetailOrderHistory(data: Buffer): Promise<RetailOrderHistoryAM | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: RetailOrderHistoryAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: RetailOrderAM = {}, match;
                    ValidatorObject.isCSVFieldValid(listItem[`${this.INIT_CHAR}"Website"`]) && (newItem.website = listItem[`${this.INIT_CHAR}"Website"`]);
                    ValidatorObject.isCSVFieldValid(listItem['Order ID']) && (newItem.orderID = listItem['Order ID']);
                    ValidatorObject.isCSVFieldValid(listItem['Order Date'] ) && (match = listItem['Order Date'].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+)/));
                    ValidatorObject.isCSVFieldValid(listItem['Order Date'] ) && (newItem.orderDate = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    ValidatorObject.isCSVFieldValid(listItem['Purchase Order Number']) && (newItem.purchaseOrderNumber = listItem['Purchase Order Number']);
                    ValidatorObject.isCSVFieldValid(listItem['Currency']) && (newItem.currency = listItem['Currency']);
                    ValidatorObject.isCSVFieldValid(listItem['Unit Price']) && (newItem.unitPrice = parseFloat(listItem['Unit Price']));
                    ValidatorObject.isCSVFieldValid(listItem['Unit Price Tax']) && (newItem.unitPriceTax = parseFloat(listItem['Unit Price Tax']));
                    ValidatorObject.isCSVFieldValid(listItem['Shipping Charge']) && (newItem.shippingCharge = parseFloat(listItem['Shipping Charge']));
                    ValidatorObject.isCSVFieldValid(listItem['Total Discounts']) && (newItem.totalDiscounts = parseFloat(listItem['Total Discounts']));
                    ValidatorObject.isCSVFieldValid(listItem['Total Owed']) && (newItem.totalOwed = parseFloat(listItem['Total Owed']));
                    ValidatorObject.isCSVFieldValid(listItem['Shipment Item Subtotal']) && (newItem.shipmentItemSubtotal = parseFloat(listItem['Shipment Item Subtotal']));
                    ValidatorObject.isCSVFieldValid(listItem['Shipment Item Subtotal Tax']) && (newItem.shipmentItemSubtotalTax = parseFloat(listItem['Shipment Item Subtotal Tax']));
                    ValidatorObject.isCSVFieldValid(listItem['ASIN']) && (newItem.ASIN = listItem['ASIN']);
                    ValidatorObject.isCSVFieldValid(listItem['Product Condition']) && (newItem.productCondition = listItem['Product Condition']);
                    ValidatorObject.isCSVFieldValid(listItem['Quantity']) && (newItem.quantity = parseFloat(listItem['Quantity']));
                    ValidatorObject.isCSVFieldValid(listItem['Payment Instrument Type']) && (newItem.paymentInstrumentType = listItem['Payment Instrument Type']);
                    ValidatorObject.isCSVFieldValid(listItem['Order Status']) && (newItem.orderStatus = listItem['Order Status']);
                    ValidatorObject.isCSVFieldValid(listItem['Shipment Status']) && (newItem.shipmentStatus = listItem['Shipment Status']);
                    ValidatorObject.isCSVFieldValid(listItem['Ship Date'] ) && (match = listItem['Ship Date'].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+)/));
                    ValidatorObject.isCSVFieldValid(listItem['Ship Date'] ) && (newItem.orderDate = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    ValidatorObject.isCSVFieldValid(listItem['Shipping Option']) && (newItem.shippingOption = listItem['Shipping Option']);
                    ValidatorObject.isCSVFieldValid(listItem['Shipping Address']) && (newItem.shippingAddress = listItem['Shipping Address']);
                    ValidatorObject.isCSVFieldValid(listItem['Billing Address']) && (newItem.billingAddress = listItem['Billing Address']);
                    ValidatorObject.isCSVFieldValid(listItem['Carrier Name & Tracking Number']) && (newItem.carrierNameAndTrackingNumber = listItem['Carrier Name & Tracking Number']);
                    ValidatorObject.isCSVFieldValid(listItem['Product Name']) && (newItem.productName = listItem['Product Name']);
                    ValidatorObject.isCSVFieldValid(listItem['Gift Message']) && (newItem.giftMessage = listItem['Gift Message']);
                    ValidatorObject.isCSVFieldValid(listItem['Gift Sender Name']) && (newItem.giftSenderName = listItem['Gift Sender Name']);
                    ValidatorObject.isCSVFieldValid(listItem['Gift Recipient Contact Details']) && (newItem.giftRecipientContactDetails = listItem['Gift Recipient Contact Details']);
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
     * @param data - FileCodeAmazon.AUDIBLE_LISTENING file in input as Buffer
     */
    static async parseAudibleListening(data: Buffer): Promise<AudibleListeningListAM | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: AudibleListeningListAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: AudibleListeningAM = {};
                    ValidatorObject.isCSVFieldValid(listItem[`${this.INIT_CHAR}"DeviceType"`]) && (newItem.deviceType = listItem[`${this.INIT_CHAR}"DeviceType"`]);
                    if(ValidatorObject.isCSVFieldValid(listItem['StartDate'])) {
                        let match = listItem['StartDate'].match(/(\d+)-(\w+)-(\d+)/);
                        let monthIndex = Months[match[2]];
                        (monthIndex) && (newItem.startDate = new Date(Date.UTC(parseInt(match[3]), parseInt(monthIndex) - 1, parseInt(match[1]), 0, 0, 0)));
                    }
                    if(ValidatorObject.isCSVFieldValid(listItem['EndDate'])) {
                        let match = listItem['EndDate'].match(/(\d+)-(\w+)-(\d+)/);
                        let monthIndex = Months[match[2]];
                        (monthIndex) && (newItem.endDate = new Date(Date.UTC(parseInt(match[3]), parseInt(monthIndex) - 1, parseInt(match[1]), 0, 0, 0)));
                    }
                    ValidatorObject.isCSVFieldValid(listItem['EventDuration']) && (newItem.eventDuration = parseFloat(listItem['EventDuration']));
                    ValidatorObject.isCSVFieldValid(listItem['StartPosition']) && (newItem.startPosition = parseFloat(listItem['StartPosition']));
                    ValidatorObject.isCSVFieldValid(listItem['EndPosition']) && (newItem.endPosition = parseFloat(listItem['EndPosition']));
                    ValidatorObject.isCSVFieldValid(listItem['Title']) && (newItem.title = listItem['Title']);
                    ValidatorObject.isCSVFieldValid(listItem['Asin']) && (newItem.asin = listItem['Asin']);
                    ValidatorObject.isCSVFieldValid(listItem['BookLength']) && (newItem.bookLength = parseFloat(listItem['BookLength']));
                    ValidatorObject.isCSVFieldValid(listItem['DeliveryType']) && (newItem.deliveryType = listItem['DeliveryType']);
                    ValidatorObject.isCSVFieldValid(listItem['NarrationSpeed']) && (newItem.narrationSpeed = listItem['NarrationSpeed']);
                    ValidatorObject.isCSVFieldValid(listItem['Bookmark']) && (newItem.bookmark = parseFloat(listItem['Bookmark']));
                    ValidatorObject.isCSVFieldValid(listItem['AudioType']) && (newItem.audioType = listItem['AudioType']);
                    ValidatorObject.isCSVFieldValid(listItem['AsinOwned']) && (newItem.asinOwned = listItem['AsinOwned'].toLowerCase() == 'true');
                    ValidatorObject.isCSVFieldValid(listItem['ListeningMode']) && (newItem.listeningMode = listItem['ListeningMode']);
                    ValidatorObject.isCSVFieldValid(listItem['Store']) && (newItem.store = listItem['Store']);
                    ValidatorObject.isCSVFieldValid(listItem['AppVersion']) && (newItem.appVersion = listItem['AppVersion']);
                    ValidatorObject.isCSVFieldValid(listItem['LocalTimezone']) && (newItem.localTimezone = listItem['LocalTimezone']);
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
     * @param data - FileCodeAmazon.AUDIBLE_MEMBERSHIP_BILLINGS file in input as Buffer
    */
    static async parseAudibleMembershipBillings(data: Buffer): Promise<AudibleMembershipBillingsAM | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: AudibleMembershipBillingsAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: AudibleMembershipBillingAM = {};
                    if(ValidatorObject.isCSVFieldValid(listItem[`${this.INIT_CHAR}"TaxCreateDate"`])) {
                        let match = listItem[`${this.INIT_CHAR}"TaxCreateDate"`].match(/(\d+)-(\w+)-(\d+)/);
                        let monthIndex = Months[match[2]];
                        (monthIndex) && (newItem.taxCreateDate = new Date(Date.UTC(parseInt(match[3]), parseInt(monthIndex) - 1, parseInt(match[1]), 0, 0, 0)));
                    }
                    if(ValidatorObject.isCSVFieldValid(listItem['BillingPeriodEndDate'])) {
                        let match = listItem['BillingPeriodEndDate'].match(/(\d+)-(\w+)-(\d+)/);
                        let monthIndex = Months[match[2]];
                        (monthIndex) && (newItem.billingPeriodEndDate = new Date(Date.UTC(parseInt(match[3]), parseInt(monthIndex) - 1, parseInt(match[1]), 0, 0, 0)));
                    }
                    if(ValidatorObject.isCSVFieldValid(listItem['BillingPeriodStartDate'])) {
                        let match = listItem['BillingPeriodStartDate'].match(/(\d+)-(\w+)-(\d+)/);
                        let monthIndex = Months[match[2]];
                        (monthIndex) && (newItem.billingPeriodStartDate = new Date(Date.UTC(parseInt(match[3]), parseInt(monthIndex) - 1, parseInt(match[1]), 0, 0, 0)));
                    }
                    if(ValidatorObject.isCSVFieldValid(listItem['StatusLastupdatedDate'])) {
                        let match = listItem['StatusLastupdatedDate'].match(/(\d+)-(\w+)-(\d+)/);
                        let monthIndex = Months[match[2]];
                        (monthIndex) && (newItem.statusLastUpdatedDate = new Date(Date.UTC(parseInt(match[3]), parseInt(monthIndex) - 1, parseInt(match[1]), 0, 0, 0)));
                    }
                    ValidatorObject.isCSVFieldValid(listItem['BaseAmount']) && (newItem.baseAmount = parseFloat(listItem['BaseAmount']));
                    ValidatorObject.isCSVFieldValid(listItem['Tax']) && (newItem.tax = parseFloat(listItem['Tax']));
                    ValidatorObject.isCSVFieldValid(listItem['TotalAmount']) && (newItem.totalAmount = parseFloat(listItem['TotalAmount']));
                    ValidatorObject.isCSVFieldValid(listItem['Currency']) && (newItem.currency = listItem['Currency']);
                    ValidatorObject.isCSVFieldValid(listItem['Type']) && (newItem.type = listItem['Type']);
                    ValidatorObject.isCSVFieldValid(listItem['Plan']) && (newItem.plan = listItem['Plan']);
                    ValidatorObject.isCSVFieldValid(listItem['PlanBillingFreq']) && (newItem.planBillingFreq = parseFloat(listItem['PlanBillingFreq']));
                    ValidatorObject.isCSVFieldValid(listItem['PlanBillingFee']) && (newItem.planBillingFee = parseFloat(listItem['PlanBillingFee']));
                    ValidatorObject.isCSVFieldValid(listItem['OfferName']) && (newItem.offerName = listItem['OfferName']);
                    ValidatorObject.isCSVFieldValid(listItem['OfferType']) && (newItem.offerType = listItem['OfferType']);
                    ValidatorObject.isCSVFieldValid(listItem['TransactionId']) && (newItem.transactionId = listItem['TransactionId']);
                    ValidatorObject.isCSVFieldValid(listItem['SubscriptionIdentifier']) && (newItem.subscriptionIdentifier = listItem['SubscriptionIdentifier']);
                    ValidatorObject.isCSVFieldValid(listItem['PlanSelectionIdentifier']) && (newItem.planSelectionIdentifier = listItem['PlanSelectionIdentifier']);
                    ValidatorObject.isCSVFieldValid(listItem['MerchantName']) && (newItem.merchantName = listItem['MerchantName']);
                    ValidatorObject.isCSVFieldValid(listItem['TaxReason']) && (newItem.taxReason = listItem['TaxReason']);
                    ValidatorObject.isCSVFieldValid(listItem['Status']) && (newItem.status = listItem['Status']);
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
     * @param data - FileCodeAmazon.PRIMEVIDEO_VIEW_COUNT file in input as Buffer
     */
    static async parseDigitalPrimeVideoViewCounts(data: Buffer): Promise<DigitalPrimeVideoViewCountsAM | undefined> {
        try {
            let result: any = Parser.parseCSVfromBuffer(data)?.pop();
            if (result) {
                let model: DigitalPrimeVideoViewCountsAM = {};
                ValidatorObject.isCSVFieldValid(result[`${this.INIT_CHAR}# TV shows watched`]) && (model.showTVWatched = parseInt(result[`${this.INIT_CHAR}# TV shows watched`]));
                ValidatorObject.isCSVFieldValid(result['# kids titles watched']) && (model.kidsTitlesWatched = parseInt(result['# kids titles watched']));
                ValidatorObject.isCSVFieldValid(result['# movies watched']) && (model.moviesWatched = parseInt(result['# movies watched']));
                ValidatorObject.isCSVFieldValid(result['# non-kids titles watched']) && (model.nonKidsTitlesWatched = parseInt(result['# non-kids titles watched']));
                ValidatorObject.isCSVFieldValid(result['# prime TV titles watched']) && (model.primeTVTitlesWatched = parseInt(result['# prime TV titles watched']));
                ValidatorObject.isCSVFieldValid(result['# prime movie titles watched']) && (model.primeMovieTitlesWatched = parseInt(result['# prime movie titles watched']));
                ValidatorObject.isCSVFieldValid(result['# prime titles watched']) && (model.primeTitlesWatched = parseInt(result['# prime titles watched']));
                ValidatorObject.isCSVFieldValid(result['# rent/buy TV titles watched']) && (model.rentBuyTVTitlesWatched = parseInt(result['# rent/buy TV titles watched']));
                ValidatorObject.isCSVFieldValid(result['# rent/buy movies watched']) && (model.rentBuyMoviesWatched = parseInt(result['# rent/buy movies watched']));
                ValidatorObject.isCSVFieldValid(result['# rent/buy titles watched']) && (model.rentBuyTitlesWatched = parseInt(result['# rent/buy titles watched']));
                ValidatorObject.isCSVFieldValid(result['# titles added to watchlist']) && (model.titlesAddedToWatchlist = parseInt(result['# titles added to watchlist']));
                ValidatorObject.isCSVFieldValid(result['# titles purchased/rented']) && (model.titlesPurchasedRented = parseInt(result['# titles purchased/rented']));
                ValidatorObject.isCSVFieldValid(result['# titles watched']) && (model.titlesWatched = parseInt(result['# titles watched']));
                ValidatorObject.isCSVFieldValid(result['home country']) && (model.homeCountry = result['home country']);
                return !ValidatorObject.objectIsEmpty(model) ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseDigitalPrimeVideoViewCounts');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeAmazon.DIGITAL_SUBSCRIPTION file in input as Buffer
     */
    static async parseDigitalSubscriptions(data: Buffer): Promise<DigitalSubscriptionsAM | undefined> {
        try {
            let result: any = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: DigitalSubscriptionsAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: DigitalSubscriptionAM = {};
                    ValidatorObject.isCSVFieldValid(listItem[`${this.INIT_CHAR}SubscriptionId`]) && (newItem.subscriptionId = listItem[`${this.INIT_CHAR}SubscriptionId`]);
                    ValidatorObject.isCSVFieldValid(listItem['BaseSubscriptionId']) && (newItem.baseSubscriptionId = listItem['BaseSubscriptionId']);
                    ValidatorObject.isCSVFieldValid(listItem['ShippingAddress']) && (newItem.shippingAddress = listItem['ShippingAddress']);
                    ValidatorObject.isCSVFieldValid(listItem['Marketplace']) && (newItem.marketplace = listItem['Marketplace']);
                    ValidatorObject.isCSVFieldValid(listItem['SubscriptionPlanId']) && (newItem.subscriptionPlanId = listItem['SubscriptionPlanId']);
                    ValidatorObject.isCSVFieldValid(listItem['SubscriptionStatus']) && (newItem.subscriptionStatus = listItem['SubscriptionStatus']);
                    if(ValidatorObject.isCSVFieldValid(listItem['SubscriptionStatusDate'])) {
                        let match = listItem['SubscriptionStatusDate'].match(/(\d+)-(\d+)-(\d+)/);
                        (match) && (newItem.subscriptionStatusDate = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), 0, 0, 0)));
                    }
                    ValidatorObject.isCSVFieldValid(listItem['ActivePaymentPlanId']) && (newItem.activePaymentPlanId = listItem['ActivePaymentPlanId']);
                    ValidatorObject.isCSVFieldValid(listItem['Autorenew']) && (newItem.autoRenew = listItem['Autorenew'].toLowerCase() === 'yes');
                    if(ValidatorObject.isCSVFieldValid(listItem['SubscriptionStartDate'])) {
                        let match = listItem['SubscriptionStartDate'].match(/(\d+)-(\d+)-(\d+)/);
                        (match) && (newItem.subscriptionStartDate = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), 0, 0, 0)));
                    }
                    ValidatorObject.isCSVFieldValid(listItem['WalletCyclingPreferenceEnabled']) && (newItem.walletCyclingPreferenceEnabled = listItem['WalletCyclingPreferenceEnabled'].toLowerCase() === 'yes');
                    ValidatorObject.isCSVFieldValid(listItem['ServiceProvider']) && (newItem.serviceProvider = listItem['ServiceProvider']);
                    ValidatorObject.isCSVFieldValid(listItem['RecordVersionNumber']) && (newItem.recordVersionNumber = listItem['RecordVersionNumber']);
                    ValidatorObject.isCSVFieldValid(listItem['ContractTimeInterval']) && (newItem.contractTimeInterval = listItem['ContractTimeInterval']);
                    ValidatorObject.isCSVFieldValid(listItem['HaveSubscriptionProblem']) && (newItem.haveSubscriptionProblem = listItem['HaveSubscriptionProblem'].toLowerCase() === 'yes');
                    ValidatorObject.isCSVFieldValid(listItem['MaxNumOfBeneficiaries']) && (newItem.maxNumOfBeneficiaries = parseFloat(listItem['MaxNumOfBeneficiaries']));
                    if(ValidatorObject.isCSVFieldValid(listItem['ScheduledResumeDateForPausedSubscription'])) {
                        let match = listItem['ScheduledResumeDateForPausedSubscription'].match(/(\d+)-(\d+)-(\d+)/);
                        (match) && (newItem.scheduledResumeDateForPausedSubscription = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), 0, 0, 0)));
                    }
                    ValidatorObject.isCSVFieldValid(listItem['CurrentPlanGifted']) && (newItem.currentPlanGifted = listItem['CurrentPlanGifted'].toLowerCase() === 'yes');
                    ValidatorObject.isCSVFieldValid(listItem['BillingScheduleId']) && (newItem.billingScheduleId = listItem['BillingScheduleId']);
                    if(ValidatorObject.isCSVFieldValid(listItem['NextBillDate'])) {
                        let match = listItem['NextBillDate'].match(/(\d+)-(\d+)-(\d+)/);
                        (match) && (newItem.nextBillDate = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), 0, 0, 0)));
                    }
                    ValidatorObject.isCSVFieldValid(listItem['NextBillAmount']) && (newItem.nextBillAmount = parseFloat(listItem['NextBillAmount']));
                    ValidatorObject.isCSVFieldValid(listItem['BaseCurrencyCode']) && (newItem.baseCurrencyCode = listItem['BaseCurrencyCode']);
                    ValidatorObject.isCSVFieldValid(listItem['CurrentBillingPeriod']) && (newItem.currentBillingPeriod = parseFloat(listItem['CurrentBillingPeriod']));
                    if(ValidatorObject.isCSVFieldValid(listItem['BillingPeriodStartDate'])) {
                        let match = listItem['BillingPeriodStartDate'].match(/(\d+)-(\d+)-(\d+)/);
                        (match) && (newItem.billingPeriodStartDate = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), 0, 0, 0)));
                    }
                    ValidatorObject.isCSVFieldValid(listItem['CurrentContractPeriod']) && (newItem.currentContractPeriod = parseFloat(listItem['CurrentContractPeriod']));
                    if(ValidatorObject.isCSVFieldValid(listItem['ContractPeriodStartDate'])) {
                        let match = listItem['ContractPeriodStartDate'].match(/(\d+)-(\d+)-(\d+)/);
                        (match) && (newItem.contractPeriodStartDate = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), 0, 0, 0)));
                    }
                    if(ValidatorObject.isCSVFieldValid(listItem['ContractEndDate'])) {
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
     * @param data - FileCodeAmazon.RETAIL_LIGHT_WEIGHT_INTERACTIONS file in input as Buffer
     */
    static async parseLightWeightInteractions(data: Buffer): Promise<LightWeightInteractionsAM | undefined> {
        try {
            let result: any = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: LightWeightInteractionsAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: LightWeightInteractionAM = {};
                    if(ValidatorObject.isCSVFieldValid(listItem[`${this.INIT_CHAR}CreationTime`])) {
                        let match = listItem[`${this.INIT_CHAR}CreationTime`].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+) UTC/);
                        (match) && (newItem.creationTime = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    }
                    ValidatorObject.isCSVFieldValid(listItem['InteractableType']) && (newItem.interactableType = listItem['InteractableType']);
                    ValidatorObject.isCSVFieldValid(listItem['InteractableURL']) && (newItem.interactableURL = listItem['InteractableURL']);
                    if(ValidatorObject.isCSVFieldValid(listItem['InteractionTime'])) {
                        let match = listItem['InteractionTime'].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+) UTC/);
                        (match) && (newItem.interactionTime = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    }
                    ValidatorObject.isCSVFieldValid(listItem['InteractionType']) && (newItem.interactionType = listItem['InteractionType']);
                    ValidatorObject.isCSVFieldValid(listItem['InteractionValue']) && (newItem.interactionValue = listItem['InteractionValue']);
                    ValidatorObject.isCSVFieldValid(listItem['Marketplace']) && (newItem.marketplace = listItem['Marketplace']);
                    if(ValidatorObject.isCSVFieldValid(listItem['ModificationTime'])) {
                        let match = listItem['ModificationTime'].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+) UTC/);
                        (match) && (newItem.modificationTime = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    }
                    ValidatorObject.isCSVFieldValid(listItem['Suppressed']) && (newItem.suppressed = listItem['Suppressed'].toLowerCase() === 'true');
                    ValidatorObject.isCSVFieldValid(listItem['Version']) && (newItem.version = listItem['Version']);
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
     * @param data - FileCodeAmazon.RETAIL_SELLER_FEEDBACK file in input as Buffer
     */
    static async parseRetailSellerFeedback(data: Buffer): Promise<RetailSellerFeedbacksAM | undefined> {
        try {
            let result: any = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: RetailSellerFeedbacksAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: RetailSellerFeedbackAM = {};
                    ValidatorObject.isCSVFieldValid(listItem[`${this.INIT_CHAR}OrderId`]) && (newItem.orderId = listItem[`${this.INIT_CHAR}OrderId`]);
                    ValidatorObject.isCSVFieldValid(listItem['Marketplace']) && (newItem.marketplace = listItem['Marketplace']);
                    if(ValidatorObject.isCSVFieldValid(listItem['FeedbackDate'])) {
                        let match = listItem['FeedbackDate'].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+)/);
                        (match) && (newItem.feedbackDate = new Date(Date.UTC(parseInt(match[3]), parseInt(match[2]) - 1, parseInt(match[1]), parseInt(match[4]), parseInt(match[5]), 0)));
                    }
                    ValidatorObject.isCSVFieldValid(listItem['FeedbackText']) && (newItem.feedbackText = listItem['FeedbackText']);
                    ValidatorObject.isCSVFieldValid(listItem['FeedbackRating']) && (newItem.feedbackRating = parseInt(listItem['FeedbackRating']));
                    ValidatorObject.isCSVFieldValid(listItem['Deal Again']) && (newItem.dealAgain = listItem['Deal Again']);
                    ValidatorObject.isCSVFieldValid(listItem['Did Item Arrived OnTime']) && (newItem.didItemArrivedOnTime = listItem['Did Item Arrived OnTime'].toLowerCase() === 'yes');
                    ValidatorObject.isCSVFieldValid(listItem['Item as described by the seller']) && (newItem.itemAsDescribedBySeller = listItem['Item as described by the seller'].toLowerCase() === 'yes');
                    ValidatorObject.isCSVFieldValid(listItem['Prompt and courteous service']) && (newItem.promptAndCourteousService = listItem['Prompt and courteous service'].toLowerCase() === 'yes');
                    ValidatorObject.isCSVFieldValid(listItem['What Went Wrong']) && (newItem.whatWentWrong = listItem['What Went Wrong']);
                    ValidatorObject.isCSVFieldValid(listItem['Is feedback removed']) && (newItem.isFeedbackRemoved = listItem['Is feedback removed'].toLowerCase() === 'yes');
                    ValidatorObject.isCSVFieldValid(listItem['Feedback removed by']) && (newItem.feedbackRemovedBy = listItem['Feedback removed by']);
                    ValidatorObject.isCSVFieldValid(listItem['Reason for removal']) && (newItem.reasonForRemoval = listItem['Reason for removal']);
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
     * @param data - FileCodeAmazon.RETAIL_REGION_AUTHORITY file in input as Buffer
     */
    static async parseRetailRegionAuthorities(data: Buffer): Promise<RetailRegionAuthoritiesAM | undefined> {
        try {
            let result: any = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: RetailRegionAuthoritiesAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: RetailRegionAuthorityAM = {};
                    ValidatorObject.isCSVFieldValid(listItem[`${this.INIT_CHAR}Postal Code`]) && (newItem.postalCode = listItem[`${this.INIT_CHAR}Postal Code`]);
                    ValidatorObject.isCSVFieldValid(listItem['District']) && (newItem.district = listItem['District']);
                    ValidatorObject.isCSVFieldValid(listItem['City']) && (newItem.city = listItem['City']);
                    ValidatorObject.isCSVFieldValid(listItem['State or Province']) && (newItem.stateOrProvince = listItem['State or Province']);
                    ValidatorObject.isCSVFieldValid(listItem['State Code']) && (newItem.stateCode = listItem['State Code']);
                    ValidatorObject.isCSVFieldValid(listItem['Country Code']) && (newItem.countryCode = listItem['Country Code']);
                    ValidatorObject.isCSVFieldValid(listItem['Timestamp']) && (newItem.date = new Date(listItem['Timestamp']));
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
     * @param data - FileCodeAmazon.RETAIL_CART_ITEMS file in input as Buffer
     */
    static async parseRetailCartItems(data: Buffer): Promise<RetailCartItemsAM | undefined> {
        try {
            let result: any = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: RetailCartItemsAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: RetailCartItemAM = {};
                    if(ValidatorObject.isCSVFieldValid(listItem[`${this.INIT_CHAR}"DateAddedToCart"`])) {
                        let match = listItem[`${this.INIT_CHAR}"DateAddedToCart"`].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+) UTC/);
                        (match) && (newItem.dateAddedToCart = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    }
                    ValidatorObject.isCSVFieldValid(listItem['Source']) && (newItem.source = listItem['Source']);
                    ValidatorObject.isCSVFieldValid(listItem['CartDomain']) && (newItem.cartDomain = listItem['CartDomain']);
                    ValidatorObject.isCSVFieldValid(listItem['CartList']) && (newItem.cartList = listItem['CartList']);
                    ValidatorObject.isCSVFieldValid(listItem['Quantity']) && (newItem.quantity = parseFloat(listItem['Quantity']));
                    ValidatorObject.isCSVFieldValid(listItem['OneClickBuyable']) && (newItem.oneClickBuyable = listItem['OneClickBuyable'].toLowerCase() === 'yes');
                    ValidatorObject.isCSVFieldValid(listItem['ToBeGiftWrapped']) && (newItem.toBeGiftWrapped = listItem['ToBeGiftWrapped'].toLowerCase() === 'yes');
                    ValidatorObject.isCSVFieldValid(listItem['PrimeSubscription']) && (newItem.primeSubscription = listItem['PrimeSubscription'].toLowerCase() === 'yes');
                    ValidatorObject.isCSVFieldValid(listItem['Pantry']) && (newItem.pantry = listItem['Pantry'].toLowerCase() === 'yes');
                    ValidatorObject.isCSVFieldValid(listItem['AddOn']) && (newItem.addOn = listItem['AddOn'].toLowerCase() === 'yes');
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
     * @param data - FileCodeAmazon.DIGITAL_ORDERING_ITEM file in input as Buffer
     */
    static async parseDigitalItems(data: Buffer): Promise<DigitalItemsAM | undefined> {
        try {
            let result: any = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: DigitalItemsAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: DigitalItemAM = {};
                    ValidatorObject.isCSVFieldValid(listItem[`${this.INIT_CHAR}ASIN`]) && (newItem.ASIN = listItem[`${this.INIT_CHAR}ASIN`]);
                    ValidatorObject.isCSVFieldValid(listItem['Title']) && (newItem.title = listItem['Title']);
                    ValidatorObject.isCSVFieldValid(listItem['OrderId']) && (newItem.orderId = listItem['OrderId']);
                    ValidatorObject.isCSVFieldValid(listItem['DigitalOrderItemId']) && (newItem.digitalOrderItemId = listItem['DigitalOrderItemId']);
                    ValidatorObject.isCSVFieldValid(listItem['DeclaredCountryCode']) && (newItem.declaredCountryCode = listItem['DeclaredCountryCode']);
                    ValidatorObject.isCSVFieldValid(listItem['BaseCurrencyCode']) && (newItem.baseCurrencyCode = listItem['BaseCurrencyCode']);
                    if(ValidatorObject.isCSVFieldValid(listItem['FulfilledDate'])) {
                        let match = listItem['FulfilledDate'].match(/(\d+)-(\d+)-(\d+)/);
                        (match) && (newItem.fulfilledDate = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]))));
                    }
                    ValidatorObject.isCSVFieldValid(listItem['IsFulfilled']) && (newItem.isFulfilled = listItem['IsFulfilled'].toLowerCase() === 'yes');
                    ValidatorObject.isCSVFieldValid(listItem['Marketplace']) && (newItem.marketplace = listItem['Marketplace']);
                    if(ValidatorObject.isCSVFieldValid(listItem['OrderDate'])) {
                        let match = listItem['OrderDate'].match(/(\d+)-(\d+)-(\d+)/);
                        (match) && (newItem.orderDate = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]))));
                    }
                    ValidatorObject.isCSVFieldValid(listItem['OriginalQuantity']) && (newItem.originalQuantity = parseFloat(listItem['OriginalQuantity']));
                    ValidatorObject.isCSVFieldValid(listItem['OurPrice']) && (newItem.ourPrice = parseFloat(listItem['OurPrice']));
                    ValidatorObject.isCSVFieldValid(listItem['OurPriceCurrencyCode']) && (newItem.ourPriceCurrencyCode = listItem['OurPriceCurrencyCode']);
                    ValidatorObject.isCSVFieldValid(listItem['OurPriceTax']) && (newItem.ourPriceTax = parseFloat(listItem['OurPriceTax']));
                    ValidatorObject.isCSVFieldValid(listItem['OurPriceTaxCurrencyCode']) && (newItem.ourPriceTaxCurrencyCode = listItem['OurPriceTaxCurrencyCode']);
                    ValidatorObject.isCSVFieldValid(listItem['SellerOfRecord']) && (newItem.sellerOfRecord = listItem['SellerOfRecord']);
                    ValidatorObject.isCSVFieldValid(listItem['Publisher']) && (newItem.publisher = listItem['Publisher']);
                    ValidatorObject.isCSVFieldValid(listItem['ThirdPartyDisplayPrice']) && (newItem.thirdPartyDisplayPrice = listItem['ThirdPartyDisplayPrice']);
                    ValidatorObject.isCSVFieldValid(listItem['ThirdPartyDisplayCurrencyCode']) && (newItem.thirdPartyDisplayCurrencyCode = listItem['ThirdPartyDisplayCurrencyCode']);
                    ValidatorObject.isCSVFieldValid(listItem['ListPriceAmount']) && (newItem.listPriceAmount = parseFloat(listItem['ListPriceAmount']));
                    ValidatorObject.isCSVFieldValid(listItem['ListPriceCurrencyCode']) && (newItem.listPriceCurrencyCode = listItem['ListPriceCurrencyCode']);
                    ValidatorObject.isCSVFieldValid(listItem['ListPriceTaxAmount']) && (newItem.listPriceTaxAmount = parseFloat(listItem['ListPriceTaxAmount']));
                    ValidatorObject.isCSVFieldValid(listItem['ListPriceTaxCurrencyCode']) && (newItem.listPriceTaxCurrencyCode = listItem['ListPriceTaxCurrencyCode']);
                    ValidatorObject.isCSVFieldValid(listItem['GiftItem']) && (newItem.giftItem = listItem['GiftItem'].toLowerCase() === 'yes');
                    ValidatorObject.isCSVFieldValid(listItem['OrderingCustomerNickname']) && (newItem.orderingCustomerNickname = listItem['OrderingCustomerNickname']);
                    ValidatorObject.isCSVFieldValid(listItem['GiftCustomerNickname']) && (newItem.giftCustomerNickname = listItem['GiftCustomerNickname']);
                    ValidatorObject.isCSVFieldValid(listItem['GiftMessage']) && (newItem.giftMessage = listItem['GiftMessage']);
                    ValidatorObject.isCSVFieldValid(listItem['GiftEmail']) && (newItem.giftEmail = listItem['GiftEmail']);
                    ValidatorObject.isCSVFieldValid(listItem['RecipientEmail']) && (newItem.recipientEmail = listItem['RecipientEmail']);
                    ValidatorObject.isCSVFieldValid(listItem['GiftRedemption']) && (newItem.giftRedemption = listItem['GiftRedemption']);
                    ValidatorObject.isCSVFieldValid(listItem['ItemMergedFromAnotherOrder']) && (newItem.itemMergedFromAnotherOrder = listItem['ItemMergedFromAnotherOrder']);
                    ValidatorObject.isCSVFieldValid(listItem['QuantityOrdered']) && (newItem.quantityOrdered = parseFloat(listItem['QuantityOrdered']));
                    ValidatorObject.isCSVFieldValid(listItem['ItemFulfilled']) && (newItem.itemFulfilled = listItem['ItemFulfilled']);
                    ValidatorObject.isCSVFieldValid(listItem['ShipFrom']) && (newItem.shipFrom = listItem['ShipFrom']);
                    ValidatorObject.isCSVFieldValid(listItem['ShipTo']) && (newItem.shipTo = listItem['ShipTo']);
                    ValidatorObject.isCSVFieldValid(listItem['IsOrderEligibleForPrimeBenefit']) && (newItem.isOrderEligibleForPrimeBenefit = listItem['IsOrderEligibleForPrimeBenefit'].toLowerCase() === 'yes');
                    ValidatorObject.isCSVFieldValid(listItem['OfferingSKU']) && (newItem.offeringSKU = listItem['OfferingSKU']);
                    ValidatorObject.isCSVFieldValid(listItem['FulfillmentMobileNumber']) && (newItem.fulfillmentMobileNumber = listItem['FulfillmentMobileNumber']);
                    ValidatorObject.isCSVFieldValid(listItem['RechargeAmount']) && (newItem.rechargeAmount = parseFloat(listItem['RechargeAmount']));
                    ValidatorObject.isCSVFieldValid(listItem['RechargeAmountCurrencyCode']) && (newItem.rechargeAmountCurrencyCode = listItem['RechargeAmountCurrencyCode']);
                    ValidatorObject.isCSVFieldValid(listItem['SubscriptionOrderInfoList']) && (newItem.subscriptionOrderInfoList = listItem['SubscriptionOrderInfoList']);
                    ValidatorObject.isCSVFieldValid(listItem['PreviouslyPaidDigitalOrderItemId']) && (newItem.previouslyPaidDigitalOrderItemId = listItem['PreviouslyPaidDigitalOrderItemId']);
                    ValidatorObject.isCSVFieldValid(listItem['PreviouslyPaidOrderId']) && (newItem.previouslyPaidOrderId = listItem['PreviouslyPaidOrderId']);
                    ValidatorObject.isCSVFieldValid(listItem['InstallmentOurPrice']) && (newItem.installmentOurPrice = listItem['InstallmentOurPrice']);
                    ValidatorObject.isCSVFieldValid(listItem['InstallmentOurPricePlusTax']) && (newItem.installmentOurPricePlusTax = listItem['InstallmentOurPricePlusTax']);
                    ValidatorObject.isCSVFieldValid(listItem['DigitalOrderItemAttributes']) && (newItem.digitalOrderItemAttributes = listItem['DigitalOrderItemAttributes']);
                    ValidatorObject.isCSVFieldValid(listItem['InstallmentOurPriceCurrencyCode']) && (newItem.installmentOurPriceCurrencyCode = listItem['InstallmentOurPriceCurrencyCode']);
                    ValidatorObject.isCSVFieldValid(listItem['InstallmentOurPricePlusTaxCurrencyCode']) && (newItem.installmentOurPricePlusTaxCurrencyCode = listItem['InstallmentOurPricePlusTaxCurrencyCode']);
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
     * @param data - FileCodeAmazon.DIGITAL_ORDERING_ORDERS file in input as Buffer
     */
    static async parseDigitalOrders(data: Buffer): Promise<DigitalOrdersAM | undefined> {
        try {
            let result: any = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: DigitalOrdersAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: DigitalOrderAM = {};
                    ValidatorObject.isCSVFieldValid(listItem[`${this.INIT_CHAR}OrderId`]) && (newItem.orderId = listItem[`${this.INIT_CHAR}OrderId`]);
                    ValidatorObject.isCSVFieldValid(listItem['BillingAddress']) && (newItem.billingAddress = listItem['BillingAddress']);
                    ValidatorObject.isCSVFieldValid(listItem['ShippingAddress']) && (newItem.shippingAddress = listItem['ShippingAddress']);
                    ValidatorObject.isCSVFieldValid(listItem['CustomerDeclaredAddress']) && (newItem.customerDeclaredAddress = listItem['CustomerDeclaredAddress']);
                    ValidatorObject.isCSVFieldValid(listItem['OrderStatus']) && (newItem.orderStatus = listItem['OrderStatus']);
                    ValidatorObject.isCSVFieldValid(listItem['Marketplace']) && (newItem.marketplace = listItem['Marketplace']);
                    ValidatorObject.isCSVFieldValid(listItem['IsOrderFreeReplacement']) && (newItem.isOrderFreeReplacement = listItem['IsOrderFreeReplacement'].toLowerCase() === 'yes');
                    ValidatorObject.isCSVFieldValid(listItem['IsOrderAPreorder']) && (newItem.isOrderAPreorder = listItem['IsOrderAPreorder'].toLowerCase() === 'yes');
                    ValidatorObject.isCSVFieldValid(listItem['DoesOrderDependOnAnotherOrder']) && (newItem.doesOrderDependOnAnotherOrder = listItem['DoesOrderDependOnAnotherOrder'].toLowerCase() === 'yes');
                    ValidatorObject.isCSVFieldValid(listItem['OrderingLocationCountry']) && (newItem.orderingLocationCountry = listItem['OrderingLocationCountry']);
                    if (ValidatorObject.isCSVFieldValid(listItem['OrderDate'])) {
                        let match = listItem['OrderDate'].match(/(\d+)-(\d+)-(\d+)/);
                        (match) && (newItem.orderDate = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]))));
                    }
                    ValidatorObject.isCSVFieldValid(listItem['RelatedPhysicalOrderId']) && (newItem.relatedPhysicalOrderId = listItem['RelatedPhysicalOrderId']);
                    ValidatorObject.isCSVFieldValid(listItem['ShoppingMarketplaceId']) && (newItem.shoppingMarketplaceId = listItem['ShoppingMarketplaceId']);
                    ValidatorObject.isCSVFieldValid(listItem['PaidByOtherCustomer']) && (newItem.paidByOtherCustomer = listItem['PaidByOtherCustomer']);
                    ValidatorObject.isCSVFieldValid(listItem['MultifactorAuthenticationStatus (depreciated)']) && (newItem.multifactorAuthenticationStatus = listItem['MultifactorAuthenticationStatus (depreciated)']);
                    ValidatorObject.isCSVFieldValid(listItem['SubscriptionOrderType']) && (newItem.subscriptionOrderType = listItem['SubscriptionOrderType']);
                    ValidatorObject.isCSVFieldValid(listItem['AlternativeOrderProvidingPayment']) && (newItem.alternativeOrderProvidingPayment = listItem['AlternativeOrderProvidingPayment']);
                    ValidatorObject.isCSVFieldValid(listItem['PaymentInformation']) && (newItem.paymentInformation = listItem['PaymentInformation']);
                    ValidatorObject.isCSVFieldValid(listItem['DeliveryPacketId']) && (newItem.deliveryPacketId = listItem['DeliveryPacketId']);
                    ValidatorObject.isCSVFieldValid(listItem['DeliveryStatus']) && (newItem.deliveryStatus = listItem['DeliveryStatus']);
                    if(ValidatorObject.isCSVFieldValid(listItem['DeliveryDate'])) {
                        let match = listItem['DeliveryDate'].match(/(\d+)-(\d+)-(\d+)/);
                        (match) && (newItem.deliveryDate = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]))));
                    }
                    if(ValidatorObject.isCSVFieldValid(listItem['GiftClaimDate'])) {
                        let match = listItem['GiftClaimDate'].match(/(\d+)-(\d+)-(\d+)/);
                        (match) && (newItem.giftClaimDate = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]))));
                    }
                    ValidatorObject.isCSVFieldValid(listItem['SessionId']) && (newItem.sessionId = listItem['SessionId']);
                    ValidatorObject.isCSVFieldValid(listItem['UniqueBrowserId']) && (newItem.uniqueBrowserId = listItem['UniqueBrowserId']);
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
     * @param data - FileCodeAmazon.DIGITAL_ORDERING_MONETARY file in input as Buffer
     */
    static async parseDigitalOrdersMonetary(data: Buffer): Promise<DigitalOrdersMonetaryAM | undefined> {
        try {
            let result: any = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: DigitalOrdersMonetaryAM = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: DigitalOrderMonetaryAM = {};
                    ValidatorObject.isCSVFieldValid(listItem[`${this.INIT_CHAR}DigitalOrderItemId`]) && (newItem.digitalOrderItemId = listItem[`${this.INIT_CHAR}DigitalOrderItemId`]);
                    ValidatorObject.isCSVFieldValid(listItem['DeliveryPacketId']) && (newItem.deliveryPacketId = listItem['DeliveryPacketId']);
                    ValidatorObject.isCSVFieldValid(listItem['AffectedItemQuantity']) && (newItem.affectedItemQuantity = parseFloat(listItem['AffectedItemQuantity']));
                    ValidatorObject.isCSVFieldValid(listItem['TransactionAmount']) && (newItem.transactionAmount = parseFloat(listItem['TransactionAmount']));
                    ValidatorObject.isCSVFieldValid(listItem['BaseCurrencyCode']) && (newItem.baseCurrencyCode = listItem['BaseCurrencyCode']);
                    ValidatorObject.isCSVFieldValid(listItem['ClaimCode']) && (newItem.claimCode = listItem['ClaimCode']);
                    ValidatorObject.isCSVFieldValid(listItem['FXTransactionAmount']) && (newItem.FXTransactionAmount = listItem['FXTransactionAmount']);
                    ValidatorObject.isCSVFieldValid(listItem['FXCurrencyCode']) && (newItem.FXCurrencyCode = listItem['FXCurrencyCode']);
                    ValidatorObject.isCSVFieldValid(listItem['MonetaryComponentTypeCode']) && (newItem.monetaryComponentTypeCode = listItem['MonetaryComponentTypeCode']);
                    ValidatorObject.isCSVFieldValid(listItem['OfferTypeCode']) && (newItem.offerTypeCode = listItem['OfferTypeCode']);
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

