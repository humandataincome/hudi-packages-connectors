import {
    AdvertisersAggregatorAM,
    AmazonDataAggregator,
    AudibleAggregatorAM,
    EngagementAggregatorAM,
    OrdersAggregatorAM,
    PrimeVideoAggregatorAM,
    RetailAggregatorAM,
    TwitchAggregatorAM
} from "./model.amazon";
import {ProcessorOptions, ProcessorUtils} from "../../utils/processor/processor.utils";
import Logger from "../../utils/logger";
import {Unzipped, unzipSync} from "fflate";
import {ValidatorObject} from "../../utils/validator/validator.object";
import {ServiceAmazon} from "./service.amazon";
import {FileCodeAmazon} from "./enum.amazon";

export class ProcessorAmazon {
    private static readonly logger = new Logger("Processor Amazon");

    /**
     * @param zipFile - file zip as Uint8Array
     * @param options - optional set of options
     * @return aggregation of data from Amazon data source
     */
    static async aggregatorFactory(zipFile: Uint8Array, options?: ProcessorOptions): Promise<AmazonDataAggregator | undefined> {
        try {
            if(zipFile) {
                const files: Unzipped = unzipSync(zipFile);
                return await this._aggregatorFactory(files, options);
            }
        } catch (error: any) {
            (error && error.message) && (this.logger.log('error', error.message, 'aggregatorFactory'));
            if (options && options.throwExceptions !== undefined && options.throwExceptions) {
                throw error;
            }
        }
        return undefined;
    }

    private static async _aggregatorFactory(files: Unzipped, options: ProcessorOptions = {}): Promise<AmazonDataAggregator | undefined> {
        const timeIntervalDays = (options && options.timeIntervalDays) ? options.timeIntervalDays : 365;
        const model: AmazonDataAggregator = {};
        const adsModel: AdvertisersAggregatorAM = {};
        const audibleModel: AudibleAggregatorAM = {};
        const primeVideoModel: PrimeVideoAggregatorAM = {};
        const ordersModel: OrdersAggregatorAM = {};
        const retailModel: RetailAggregatorAM = {};
        const twitchModel: TwitchAggregatorAM = {};
        const engagementModel: EngagementAggregatorAM = {}
        let result, regex;
        for (let pathName in files) {
            const file = files[pathName];
            const data = Buffer.from(file, file.byteOffset, file.length);
            if (!ValidatorObject.isDirectory(pathName)) {
                if ((regex = new RegExp(FileCodeAmazon.ADV_AUDIENCES)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseAdvertiserAudiences(data);
                    if (result) {
                        adsModel.adsAudiences = {list: ProcessorUtils.mergeArrays(adsModel.adsAudiences?.list, result.list, options.maxEntitiesPerArray)};
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.ADV_THIRDPARTIES)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseThirdPartyAudiences(data);
                    if (result) {
                        adsModel.adsThirdParties = {list: ProcessorUtils.mergeArrays(adsModel.adsThirdParties?.list, result.list, options.maxEntitiesPerArray)};
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.ADV_CLICKS)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseAdvertiserClicked(data);
                    if (result) {
                        adsModel.adsClicked = {list: ProcessorUtils.mergeArrays(adsModel.adsClicked?.list, result.list, options.maxEntitiesPerArray)};
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.AUDIENCES)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseAmazonAudiences(data);
                    if (result) {
                        adsModel.amazonAudience = {list: ProcessorUtils.mergeArrays(adsModel.amazonAudience?.list, result.list, options.maxEntitiesPerArray)};
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.AUDIBLE_LIBRARY)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseAudibleLibrary(data);
                    if (result) {
                        audibleModel.library = {list: ProcessorUtils.mergeArrays(audibleModel.library?.list, result.list, options.maxEntitiesPerArray)};
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.AUDIBLE_LISTENING)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseAudibleListening(data);
                    if (result) {
                        audibleModel.listening = {list: ProcessorUtils.mergeArrays(audibleModel.listening?.list, result.list, options.maxEntitiesPerArray)};
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.AUDIBLE_MEMBERSHIP_BILLINGS)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseAudibleMembershipBillings(data);
                    if (result) {
                        audibleModel.membershipBillings = {list: ProcessorUtils.mergeArrays(audibleModel.membershipBillings?.list, result.list, options.maxEntitiesPerArray)};
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.PRIMEVIDEO_WATCHLIST)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parsePrimeVideoWatchlist(data);
                    if (result) {
                        primeVideoModel.watchlist = {list: ProcessorUtils.mergeArrays(primeVideoModel.watchlist?.list, result.list, options.maxEntitiesPerArray)};
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.PRIMEVIDEO_WATCHLIST_HISTORY)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parsePrimeVideoWatchlistHistory(data);
                    if (result) {
                        primeVideoModel.watchlistHistory = {list: ProcessorUtils.mergeArrays(primeVideoModel.watchlistHistory?.list, result.list, options.maxEntitiesPerArray)};
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.PRIMEVIDEO_VIEW_COUNT)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseDigitalPrimeVideoViewCounts(data);
                    if (result) {
                        primeVideoModel.viewCounts = result;
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.PRIMEVIDEO_VIEWINGHISTORY)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parsePrimeVideoViewingHistory(data);
                    if (result) {
                        primeVideoModel.viewingHistory = {list: ProcessorUtils.mergeArrays(primeVideoModel.viewingHistory?.list, result.list, options.maxEntitiesPerArray)};
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.DIGITAL_ORDERING_ITEM)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseDigitalItems(data);
                    if (result) {
                        ordersModel.digitalItems = {list: ProcessorUtils.mergeArrays(ordersModel.digitalItems?.list, result.list, options.maxEntitiesPerArray)};
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.DIGITAL_ORDERING_ORDERS)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseDigitalOrders(data);
                    if (result) {
                        ordersModel.digitalOrders = {list: ProcessorUtils.mergeArrays(ordersModel.digitalOrders?.list, result.list, options.maxEntitiesPerArray)};
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.DIGITAL_ORDERING_MONETARY)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseDigitalOrdersMonetary(data);
                    if (result) {
                        ordersModel.digitalMonetaryOrders = {list: ProcessorUtils.mergeArrays(ordersModel.digitalMonetaryOrders?.list, result.list, options.maxEntitiesPerArray)};
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.DIGITAL_SUBSCRIPTION)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseDigitalSubscriptions(data);
                    if (result) {
                        ordersModel.digitalSubscriptions = {list: ProcessorUtils.mergeArrays(ordersModel.digitalSubscriptions?.list, result.list, options.maxEntitiesPerArray)};
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.RETAIL_LIGHT_WEIGHT_INTERACTIONS)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseLightWeightInteractions(data);
                    if (result) {
                        retailModel.lightWeightInteractions = {list: ProcessorUtils.mergeArrays(retailModel.lightWeightInteractions?.list, result.list, options.maxEntitiesPerArray)};
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.RETAIL_CART_ITEMS)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseRetailCartItems(data);
                    if (result) {
                        retailModel.cartItems = {list: ProcessorUtils.mergeArrays(retailModel.cartItems?.list, result.list, options.maxEntitiesPerArray)};
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.RETAIL_ORDER_HISTORY)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseRetailOrderHistory(data);
                    if (result) {
                        retailModel.orderHistory = {list: ProcessorUtils.mergeArrays(retailModel.orderHistory?.list, result.list, options.maxEntitiesPerArray)};
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.RETAIL_REGION_AUTHORITY)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseRetailRegionAuthorities(data);
                    if (result) {
                        retailModel.regionAuthorities = {list: ProcessorUtils.mergeArrays(retailModel.regionAuthorities?.list, result.list, options.maxEntitiesPerArray)};
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.RETAIL_SELLER_FEEDBACK)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseRetailSellerFeedback(data);
                    if (result) {
                        retailModel.sellerFeedbacks = {list: ProcessorUtils.mergeArrays(retailModel.sellerFeedbacks?.list, result.list, options.maxEntitiesPerArray)};
                    }
                }
            }
        }
        if (!ValidatorObject.objectIsEmpty(adsModel)) {
            model.advertisers = adsModel;
        }
        if (!ValidatorObject.objectIsEmpty(audibleModel)) {
            model.audible = audibleModel;
        }
        if (!ValidatorObject.objectIsEmpty(primeVideoModel)) {
            model.primeVideo = primeVideoModel;
        }
        if (!ValidatorObject.objectIsEmpty(ordersModel)) {
            model.orders = ordersModel;
        }
        if (!ValidatorObject.objectIsEmpty(retailModel)) {
            model.retail = retailModel;
        }
        if (!ValidatorObject.objectIsEmpty(twitchModel)) {
            model.twitch = twitchModel;
        }
        if (!ValidatorObject.objectIsEmpty(engagementModel)) {
            engagementModel.timeInterval = timeIntervalDays;
            model.engagement = engagementModel;
        }
        if (!ValidatorObject.objectIsEmpty(model)) {
            model.creationDate = new Date();
            return model;
        }
        return undefined;
    }
}
