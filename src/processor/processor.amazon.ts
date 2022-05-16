import {AmazonDataAggregator} from "./processor.aggregator.model";
import {FileCodeAmazon} from "../descriptor";
import {InputFileFormat, ValidatorFiles} from "../validator";
import {AmazonService} from "../service";
import {
    AudibleLibraryAM,
    DigitalSubscriptionAM,
    DigitalSubscriptionsAM,
    LightWeightInteractionsAM,
    RetailOrderAM,
    RetailOrderHistoryAM, RetailRegionAuthoritiesAM,
    RetailSellerFeedbacksAM
} from "../model";
import {ProcessorUtils} from "./processor.utils";
import {ProcessorOptions} from "./index";
import Logger from "../utils/logger";

export class ProcessorAmazon {
    private static readonly logger = new Logger("Processor Amazon");

    /**
     * @param zipFile - file zip as Buffer
     * @param options - optional set of options
     * @return aggregation of data from Amazon data source
     */
    static async aggregatorFactory(zipFile: InputFileFormat, options?: ProcessorOptions): Promise<AmazonDataAggregator | undefined> {
        try {
            if(zipFile) {
                const JSZip = require("jszip");
                const zip = await JSZip.loadAsync(zipFile);
                return await ProcessorAmazon._aggregateFactory(zip, options);
            }
        } catch (error: any) {
            (error && error.message) && (this.logger.log('error', error.message, 'aggregatorFactory'));
            if (options && options.throwExceptions !== undefined && options.throwExceptions) {
                throw error;
            }
        }
        return undefined;
    }

    private static async _aggregateFactory(zip: any, options?: ProcessorOptions): Promise<AmazonDataAggregator | undefined> {
        const timeIntervalDays = (options && options.timeIntervalDays) ? options.timeIntervalDays : 365;
        let model: AmazonDataAggregator = {};
        let result, regex;
        for (let pathName of Object.keys(zip.files)) {
            const file = zip.files[pathName];
            if (!file.dir) {
                await file.async('nodebuffer').then(async (data: Buffer) => {
                    if ((regex = new RegExp(FileCodeAmazon.ADV_AUDIENCES)) && (regex.test(pathName))) {
                        result = await AmazonService.parseAmazonAudiences(data);
                        (result) && (model.advAudiences = result.list.length);
                    } else if ((regex = new RegExp(FileCodeAmazon.ADV_CLICKS)) && (regex.test(pathName))) {
                        result = await AmazonService.parseAdvertiserClicked(data);
                        (result) && (model.advClicks = result.list.length);
                    } else if ((regex = new RegExp(FileCodeAmazon.AUDIENCES)) && (regex.test(pathName))) {
                        result = await AmazonService.parseAmazonAudiences(data);
                        (result) && (model.amazonAudiences = result.list.length);
                    } else if ((regex = new RegExp(FileCodeAmazon.AUDIBLE_LISTENING)) && (regex.test(pathName))) {
                        result = await AmazonService.parseAudibleListening(data);
                        (result) && (model.audibleListening = result.list.length);
                    } else if ((regex = new RegExp(FileCodeAmazon.PRIMEVIDEO_VIEW_COUNT)) && (regex.test(pathName))) {
                        result = await AmazonService.parseDigitalPrimeVideoViewCounts(data);
                        if (result) {
                            (result.moviesWatched) && (model.movies = result.moviesWatched);
                            (result.showTVWatched) && (model.tvSeries = result.showTVWatched);
                            model.rents = 0;
                            (result.rentBuyTVTitlesWatched) && (model.rents += result.rentBuyTVTitlesWatched);
                            (result.rentBuyMoviesWatched) && (model.rents += result.rentBuyMoviesWatched);
                            (result.rentBuyTitlesWatched) && (model.rents += result.rentBuyTitlesWatched);
                        }
                    } else if ((regex = new RegExp(FileCodeAmazon.RETAIL_ORDER_HISTORY)) && (regex.test(pathName))) {
                        result = <RetailOrderHistoryAM>await AmazonService.parseRetailOrderHistory(data);
                        if (result) {
                            model.orders = result.list.length;
                            model.ordersTI = result.list.filter((item: RetailOrderAM) => (item.orderDate) && (ProcessorUtils.daysDifference(item.orderDate) < timeIntervalDays)).length;

                            let mapCurrencies: any = {};
                            result.list.forEach((item: RetailOrderAM) => {
                                if (item.currency) {
                                    mapCurrencies[item.currency] !== undefined ? mapCurrencies[item.currency]++ : mapCurrencies[item.currency] = 1;
                                }
                            });
                            let MUC: string; //Most Used Currency
                            let counterMUC = 0;
                            for (let currency of Object.keys(mapCurrencies)) {
                                if (mapCurrencies[currency] > counterMUC) {
                                    MUC = currency;
                                    counterMUC = mapCurrencies[currency];
                                }
                            }
                            const filteredOrders = result.list.filter((item: RetailOrderAM) => (item.currency && item.totalOwed && item.currency === MUC));
                            const sum = filteredOrders.reduce((sum: number, item: RetailOrderAM) => {
                                (item.totalOwed) && (sum += item.totalOwed);
                                return sum;
                            }, 0);
                            model.avgSpentTI = sum / filteredOrders.length;
                        }
                    } else if ((regex = new RegExp(FileCodeAmazon.ADV_THIRDPARTIES)) && (regex.test(pathName))) {
                        result = await AmazonService.parseThirdPartyAudiences(data);
                        (result) && (model.thirdPartyAudiences = result.list.length);
                    } else if ((regex = new RegExp(FileCodeAmazon.RETAIL_SELLER_FEEDBACK)) && (regex.test(pathName))) {
                        result = <RetailSellerFeedbacksAM>await AmazonService.parseRetailSellerFeedback(data);
                        (result) && (model.feedbacks = result.list.length);
                    } else if ((regex = new RegExp(FileCodeAmazon.RETAIL_LIGHT_WEIGHT_INTERACTIONS)) && (regex.test(pathName))) {
                        result = <LightWeightInteractionsAM>await AmazonService.parseLightWeightInteractions(data);
                        (result) && (model.helpfulReviews = result.list.length);
                    } else if ((regex = new RegExp(FileCodeAmazon.DIGITAL_SUBSCRIPTION)) && (regex.test(pathName))) {
                        result = <DigitalSubscriptionsAM>await AmazonService.parseDigitalSubscriptions(data);
                        if (result) {
                            model.subscriptions = result.list.length;
                            if (result.list.length > 0) {
                                const lastBillPrime = <DigitalSubscriptionAM>result.list.filter((item: DigitalSubscriptionAM) => (item.serviceProvider) && (item.serviceProvider === 'Amazon Prime')).pop();
                                if (lastBillPrime && lastBillPrime.contractEndDate) {
                                    const today = new Date();
                                    (model.primeSubscription = ProcessorUtils.daysDifference(today, lastBillPrime.contractEndDate) > 0);
                                }
                                const lastBillAudible = <DigitalSubscriptionAM>result.list.filter((item: DigitalSubscriptionAM) => (item.serviceProvider) && (item.serviceProvider === 'Audible')).pop();
                                if (lastBillAudible && lastBillAudible.contractEndDate) {
                                    const today = new Date();
                                    (model.audibleSubscription = ProcessorUtils.daysDifference(today, lastBillAudible.contractEndDate) > 0);
                                }
                            }
                        }
                    } else if ((regex = new RegExp(FileCodeAmazon.AUDIBLE_LIBRARY)) && (regex.test(pathName))) {
                        result = <AudibleLibraryAM>await AmazonService.parseAudibleLibrary(data);
                        (result) && (model.thirdPartyAudiences = result.list.length);
                    } else if ((regex = new RegExp(FileCodeAmazon.RETAIL_REGION_AUTHORITY)) && (regex.test(pathName))) {
                        result = <RetailRegionAuthoritiesAM>await AmazonService.parseRetailRegionAuthorities(data);
                        if (result && result.list.length > 1) {
                            const item = result.list.pop();
                            if (item) {
                                model.address = ''.concat(
                                    item.postalCode ? item.postalCode : ',',
                                    item.city ? ',' + item.city : ',',
                                    item.stateOrProvince ? ',' + item.stateOrProvince : ',',
                                    item.countryCode ? ',' + item.countryCode : ',');
                            }
                        }
                    }
                });
            }
        }
        return !ValidatorFiles.objectIsEmpty(model) ? model : undefined;
    }
}
