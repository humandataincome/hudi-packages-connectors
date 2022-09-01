import {
    AmazonDataAggregator
} from "./model.amazon";
import {ProcessorDatasource, ProcessorOptions, ProcessorUtils, ValidatorObject} from "../../utils";
import Logger from "../../utils/logger";
import {Unzipped, unzipSync} from "fflate";
import {ServiceAmazon} from "./service.amazon";
import {FileCodeAmazon} from "./enum.amazon";
import {staticImplements} from "../../utils/decorator";

@staticImplements<ProcessorDatasource>()
export class ProcessorAmazon {
    private static readonly logger = new Logger("Processor Amazon");

    static initAggregator(): AmazonDataAggregator {
        return {
            advertisers: {},
            audible: {},
            primeVideo: {},
            orders: {},
            retail: {},
            twitch: {}
        };
    }

    /**
     * Create and return the aggregator from
     * @param zipFile - file zip as Uint8Array
     * @param options - optional set of options
     * @return aggregation of data from Amazon datasource
     */
    static async zipAggregatorBuilder(zipFile: Uint8Array, options?: ProcessorOptions): Promise<AmazonDataAggregator | undefined> {
        try {
            if(zipFile) {
                const files: Unzipped = unzipSync(zipFile);
                const model: AmazonDataAggregator = this.initAggregator();
                for (let pathName in files) {
                    const file = files[pathName];
                    const data = Buffer.from(file, file.byteOffset, file.length);
                    if (!ValidatorObject.isDirectory(pathName)) {
                        await this.aggregatorBuilder(data, pathName, model, options);
                    }
                }
                if (!ValidatorObject.objectIsEmpty(model)) {
                    model.creationDate = new Date();
                    return model;
                }
            }
        } catch (error: any) {
            (error && error.message) && (this.logger.log('error', error.message, 'zipAggregatorBuilder'));
            if (options && options.throwExceptions !== undefined && options.throwExceptions) {
                throw error;
            }
        }
        return undefined;
    }

    static async aggregatorBuilder(data: Buffer, pathName: string, model: AmazonDataAggregator, options: ProcessorOptions = {}) {
        let result, regex;
        if ((regex = new RegExp(FileCodeAmazon.ADV_AUDIENCES)) && (regex.test(pathName))) {
            result = await ServiceAmazon.parseAdvertiserAudiences(data);
            if (result) {
                model.advertisers.adsAudiences = {list: ProcessorUtils.mergeArrays(model.advertisers.adsAudiences?.list, result.list, options.maxEntitiesPerArray)};
            }
        } else if ((regex = new RegExp(FileCodeAmazon.ADV_THIRDPARTIES)) && (regex.test(pathName))) {
            result = await ServiceAmazon.parseThirdPartyAudiences(data);
            if (result) {
                model.advertisers.adsThirdParties = {list: ProcessorUtils.mergeArrays(model.advertisers.adsThirdParties?.list, result.list, options.maxEntitiesPerArray)};
            }
        } else if ((regex = new RegExp(FileCodeAmazon.ADV_CLICKS)) && (regex.test(pathName))) {
            result = await ServiceAmazon.parseAdvertiserClicked(data);
            if (result) {
                model.advertisers.adsClicked = {list: ProcessorUtils.mergeArrays(model.advertisers.adsClicked?.list, result.list, options.maxEntitiesPerArray)};
            }
        } else if ((regex = new RegExp(FileCodeAmazon.AUDIENCES)) && (regex.test(pathName))) {
            result = await ServiceAmazon.parseAmazonAudiences(data);
            if (result) {
                model.advertisers.amazonAudience = {list: ProcessorUtils.mergeArrays(model.advertisers.amazonAudience?.list, result.list, options.maxEntitiesPerArray)};
            }
        } else if ((regex = new RegExp(FileCodeAmazon.AUDIBLE_LIBRARY)) && (regex.test(pathName))) {
            result = await ServiceAmazon.parseAudibleLibrary(data);
            if (result) {
                model.audible.library = {list: ProcessorUtils.mergeArrays(model.audible.library?.list, result.list, options.maxEntitiesPerArray)};
            }
        } else if ((regex = new RegExp(FileCodeAmazon.AUDIBLE_LISTENING)) && (regex.test(pathName))) {
            result = await ServiceAmazon.parseAudibleListening(data);
            if (result) {
                model.audible.listening = {list: ProcessorUtils.mergeArrays(model.audible.listening?.list, result.list, options.maxEntitiesPerArray)};
            }
        } else if ((regex = new RegExp(FileCodeAmazon.AUDIBLE_MEMBERSHIP_BILLINGS)) && (regex.test(pathName))) {
            result = await ServiceAmazon.parseAudibleMembershipBillings(data);
            if (result) {
                model.audible.membershipBillings = {list: ProcessorUtils.mergeArrays(model.audible.membershipBillings?.list, result.list, options.maxEntitiesPerArray)};
            }
        } else if ((regex = new RegExp(FileCodeAmazon.PRIMEVIDEO_WATCHLIST)) && (regex.test(pathName))) {
            result = await ServiceAmazon.parsePrimeVideoWatchlist(data);
            if (result) {
                model.primeVideo.watchlist = {list: ProcessorUtils.mergeArrays(model.primeVideo.watchlist?.list, result.list, options.maxEntitiesPerArray)};
            }
        } else if ((regex = new RegExp(FileCodeAmazon.PRIMEVIDEO_WATCHLIST_HISTORY)) && (regex.test(pathName))) {
            result = await ServiceAmazon.parsePrimeVideoWatchlistHistory(data);
            if (result) {
                model.primeVideo.watchlistHistory = {list: ProcessorUtils.mergeArrays(model.primeVideo.watchlistHistory?.list, result.list, options.maxEntitiesPerArray)};
            }
        } else if ((regex = new RegExp(FileCodeAmazon.PRIMEVIDEO_VIEW_COUNT)) && (regex.test(pathName))) {
            result = await ServiceAmazon.parseDigitalPrimeVideoViewCounts(data);
            if (result) {
                model.primeVideo.viewCounts = result;
            }
        } else if ((regex = new RegExp(FileCodeAmazon.PRIMEVIDEO_VIEWINGHISTORY)) && (regex.test(pathName))) {
            result = await ServiceAmazon.parsePrimeVideoViewingHistory(data);
            if (result) {
                model.primeVideo.viewingHistory = {list: ProcessorUtils.mergeArrays(model.primeVideo.viewingHistory?.list, result.list, options.maxEntitiesPerArray)};
            }
        } else if ((regex = new RegExp(FileCodeAmazon.DIGITAL_ORDERING_ITEM)) && (regex.test(pathName))) {
            result = await ServiceAmazon.parseDigitalItems(data);
            if (result) {
                model.orders.digitalItems = {list: ProcessorUtils.mergeArrays(model.orders.digitalItems?.list, result.list, options.maxEntitiesPerArray)};
            }
        } else if ((regex = new RegExp(FileCodeAmazon.DIGITAL_ORDERING_ORDERS)) && (regex.test(pathName))) {
            result = await ServiceAmazon.parseDigitalOrders(data);
            if (result) {
                model.orders.digitalOrders = {list: ProcessorUtils.mergeArrays(model.orders.digitalOrders?.list, result.list, options.maxEntitiesPerArray)};
            }
        } else if ((regex = new RegExp(FileCodeAmazon.DIGITAL_ORDERING_MONETARY)) && (regex.test(pathName))) {
            result = await ServiceAmazon.parseDigitalOrdersMonetary(data);
            if (result) {
                model.orders.digitalMonetaryOrders = {list: ProcessorUtils.mergeArrays(model.orders.digitalMonetaryOrders?.list, result.list, options.maxEntitiesPerArray)};
            }
        } else if ((regex = new RegExp(FileCodeAmazon.DIGITAL_SUBSCRIPTION)) && (regex.test(pathName))) {
            result = await ServiceAmazon.parseDigitalSubscriptions(data);
            if (result) {
                model.orders.digitalSubscriptions = {list: ProcessorUtils.mergeArrays(model.orders.digitalSubscriptions?.list, result.list, options.maxEntitiesPerArray)};
            }
        } else if ((regex = new RegExp(FileCodeAmazon.RETAIL_LIGHT_WEIGHT_INTERACTIONS)) && (regex.test(pathName))) {
            result = await ServiceAmazon.parseLightWeightInteractions(data);
            if (result) {
                model.retail.lightWeightInteractions = {list: ProcessorUtils.mergeArrays(model.retail.lightWeightInteractions?.list, result.list, options.maxEntitiesPerArray)};
            }
        } else if ((regex = new RegExp(FileCodeAmazon.RETAIL_CART_ITEMS)) && (regex.test(pathName))) {
            result = await ServiceAmazon.parseRetailCartItems(data);
            if (result) {
                model.retail.cartItems = {list: ProcessorUtils.mergeArrays(model.retail.cartItems?.list, result.list, options.maxEntitiesPerArray)};
            }
        } else if ((regex = new RegExp(FileCodeAmazon.RETAIL_ORDER_HISTORY)) && (regex.test(pathName))) {
            result = await ServiceAmazon.parseRetailOrderHistory(data);
            if (result) {
                model.retail.orderHistory = {list: ProcessorUtils.mergeArrays(model.retail.orderHistory?.list, result.list, options.maxEntitiesPerArray)};
            }
        } else if ((regex = new RegExp(FileCodeAmazon.RETAIL_REGION_AUTHORITY)) && (regex.test(pathName))) {
            result = await ServiceAmazon.parseRetailRegionAuthorities(data);
            if (result) {
                model.retail.regionAuthorities = {list: ProcessorUtils.mergeArrays(model.retail.regionAuthorities?.list, result.list, options.maxEntitiesPerArray)};
            }
        } else if ((regex = new RegExp(FileCodeAmazon.RETAIL_SELLER_FEEDBACK)) && (regex.test(pathName))) {
            result = await ServiceAmazon.parseRetailSellerFeedback(data);
            if (result) {
                model.retail.sellerFeedbacks = {list: ProcessorUtils.mergeArrays(model.retail.sellerFeedbacks?.list, result.list, options.maxEntitiesPerArray)};
            }
        } else if ((regex = new RegExp(FileCodeAmazon.RETAIL_SEARCH_CUSTOMER_ENGAGEMENT)) && (regex.test(pathName))) {
            result = await ServiceAmazon.parseSearchDataCustomerEngagement(data);
            if (result) {
                model.searchDataEngagement = {list: ProcessorUtils.mergeArrays(model.searchDataEngagement?.list, result.list, options.maxEntitiesPerArray)};
            }
        } else if ((regex = new RegExp(FileCodeAmazon.GAMES_TWITCHPRIME_SUB_HISTORY)) && (regex.test(pathName))) {
            result = await ServiceAmazon.parseTwitchPrimeSubscription(data);
            if (result) {
                model.twitch.subscriptions = {list: ProcessorUtils.mergeArrays(model.twitch.subscriptions?.list, result.list, options.maxEntitiesPerArray)};
            }
        } else if ((regex = new RegExp(FileCodeAmazon.GAMES_TWITCHPRIME_LINKED_ACCOUNTS)) && (regex.test(pathName))) {
            result = await ServiceAmazon.parseTwitchPrimeLinkedAccounts(data);
            if (result) {
                model.twitch.linkedAccounts = {list: ProcessorUtils.mergeArrays(model.twitch.linkedAccounts?.list, result.list, options.maxEntitiesPerArray)};
            }
        } else if ((regex = new RegExp(FileCodeAmazon.GAMES_TWITCHPRIME_ACCOUNT_HISTORY)) && (regex.test(pathName))) {
            result = await ServiceAmazon.parseTwitchPrimeAccountHistory(data);
            if (result) {
                model.twitch.accountHistory = {list: ProcessorUtils.mergeArrays(model.twitch.accountHistory?.list, result.list, options.maxEntitiesPerArray)};
            }
        }
    }
}
