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
import {ProcessorOptions} from "../../utils/processor/processor.utils";
import Logger from "../../utils/logger";
import {Unzipped, unzipSync} from "fflate";
import {ValidatorObject} from "../../utils/validator/validator.object";
import {ServiceAmazon} from "./service.amazon";
import {FileCodeAmazon} from "./enum.amazon";

interface ResultType<T> {
    list: T[];
}

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
                        //adsModel.adsAudiences = this.mergeList(adsModel.adsAudiences, result, options.maxEntitiesPerArray);
                        adsModel.adsAudiences = result;
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.ADV_THIRDPARTIES)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseThirdPartyAudiences(data);
                    if (result) {
                        //adsModel.adsThirdParties = this.mergeList(adsModel.adsThirdParties, result, options.maxEntitiesPerArray);
                        adsModel.adsThirdParties = result;
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.ADV_CLICKS)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseAdvertiserClicked(data);
                    if (result) {
                        adsModel.adsClicked = this.mergeList(adsModel.adsClicked, result, options.maxEntitiesPerArray);
                        adsModel.adsClicked = result;
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.AUDIENCES)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseAmazonAudiences(data);
                    if (result) {
                        adsModel.amazonAudience = this.mergeList(adsModel.amazonAudience, result, options.maxEntitiesPerArray);
                        adsModel.amazonAudience = result;
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.AUDIBLE_LIBRARY)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseAudibleLibrary(data);
                    if (result) {
                        audibleModel.library = this.mergeList(audibleModel.library, result, options.maxEntitiesPerArray);
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.AUDIBLE_LISTENING)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseAudibleListening(data);
                    if (result) {
                        audibleModel.listening = this.mergeList(audibleModel.listening, result, options.maxEntitiesPerArray);
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.AUDIBLE_MEMBERSHIP_BILLINGS)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseAudibleMembershipBillings(data);
                    if (result) {
                        audibleModel.membershipBillings = this.mergeList(audibleModel.membershipBillings, result, options.maxEntitiesPerArray);
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.PRIMEVIDEO_WATCHLIST)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parsePrimeVideoWatchlist(data);
                    if (result) {
                        primeVideoModel.watchlist = this.mergeList(primeVideoModel.watchlist, result, options.maxEntitiesPerArray);
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.PRIMEVIDEO_WATCHLIST_HISTORY)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parsePrimeVideoWatchlistHistory(data);
                    if (result) {
                        primeVideoModel.watchlistHistory = this.mergeList(primeVideoModel.watchlistHistory, result, options.maxEntitiesPerArray);
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.PRIMEVIDEO_VIEW_COUNT)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseDigitalPrimeVideoViewCounts(data);
                    if (result) {
                        primeVideoModel.viewCounts = result;
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.PRIMEVIDEO_VIEWINGHISTORY)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parsePrimeVideoViewingHistory(data);
                    if (result) {
                        primeVideoModel.viewingHistory = this.mergeList(primeVideoModel.viewingHistory, result, options.maxEntitiesPerArray);
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.DIGITAL_ORDERING_ITEM)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseDigitalItems(data);
                    if (result) {
                        ordersModel.digitalItems = this.mergeList(ordersModel.digitalItems, result, options.maxEntitiesPerArray);
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.DIGITAL_ORDERING_ORDERS)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseDigitalOrders(data);
                    if (result) {
                        ordersModel.digitalOrders = this.mergeList(ordersModel.digitalOrders, result, options.maxEntitiesPerArray);
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.DIGITAL_ORDERING_MONETARY)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseDigitalOrdersMonetary(data);
                    if (result) {
                        ordersModel.digitalMonetaryOrders = this.mergeList(ordersModel.digitalMonetaryOrders, result, options.maxEntitiesPerArray);
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.DIGITAL_SUBSCRIPTION)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseDigitalSubscriptions(data);
                    if (result) {
                        ordersModel.digitalSubscriptions = this.mergeList(ordersModel.digitalSubscriptions, result, options.maxEntitiesPerArray);
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.RETAIL_LIGHT_WEIGHT_INTERACTIONS)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseLightWeightInteractions(data);
                    if (result) {
                        retailModel.lightWeightInteractions = this.mergeList(retailModel.lightWeightInteractions, result, options.maxEntitiesPerArray);
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.RETAIL_CART_ITEMS)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseRetailCartItems(data);
                    if (result) {
                        retailModel.cartItems = this.mergeList(retailModel.cartItems, result, options.maxEntitiesPerArray);
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.RETAIL_ORDER_HISTORY)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseRetailOrderHistory(data);
                    if (result) {
                        retailModel.orderHistory = this.mergeList(retailModel.orderHistory, result, options.maxEntitiesPerArray);
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.RETAIL_REGION_AUTHORITY)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseRetailRegionAuthorities(data);
                    if (result) {
                        retailModel.regionAuthorities = this.mergeList(retailModel.regionAuthorities, result, options.maxEntitiesPerArray);
                    }
                } else if ((regex = new RegExp(FileCodeAmazon.RETAIL_SELLER_FEEDBACK)) && (regex.test(pathName))) {
                    result = await ServiceAmazon.parseRetailSellerFeedback(data);
                    if (result) {
                        retailModel.sellerFeedbacks = this.mergeList(retailModel.sellerFeedbacks, result, options.maxEntitiesPerArray);
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



    private static mergeList<T>(model1: ResultType<T> | undefined, model2: ResultType<T>, maxEntitiesPerArray: number = Infinity): ResultType<T> {
        const newModel: ResultType<T> = {list: []};
        if (model1) {
            newModel.list = model1.list.concat(model2.list).slice(0, maxEntitiesPerArray);
        } else {
            newModel.list = model2.list.slice(model2.list.length-maxEntitiesPerArray, model2.list.length);
        }
        return newModel;
    }
}
