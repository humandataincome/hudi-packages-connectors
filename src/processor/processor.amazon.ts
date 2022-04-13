import {AmazonDataAggregator} from "./processor.aggregator.model";
import {FileCodeAmazon} from "../descriptor";
import {ProcessorErrorEnums} from "./processor.error";
import {InputFileFormat, Validator} from "../validator";
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

export class ProcessorAmazon {
    /**
     * @param zipFile - file zip as Buffer
     * @param timeIntervalDays - optional days of interval wanted for TI parameters, default value is 365
     * @return aggregation of data from Amazon data source
     */
    static async aggregatorFactory(zipFile: InputFileFormat, timeIntervalDays: number = 365): Promise<AmazonDataAggregator | undefined> {
        const JSZip = require("jszip");
        let model: AmazonDataAggregator = {};
        let result, regex;
        const zip = await JSZip.loadAsync(zipFile);
        for (let pathName of Object.keys(zip.files)) {
            const file = zip.files[pathName];
            if (!file.dir) {
                await file.async('nodebuffer').then(async (data: Buffer) => {
                    if((regex = new RegExp(FileCodeAmazon.ADV_AUDIENCES)) && (regex.test(pathName))) {
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
                                if(mapCurrencies[currency] > counterMUC) {
                                    MUC = currency;
                                    counterMUC = mapCurrencies[currency];
                                }
                            }
                            const filteredOrders = result.list.filter((item: RetailOrderAM) => (item.currency && item.totalOwed && item.currency === MUC));
                            const sum = filteredOrders.reduce((sum: number, item: RetailOrderAM) => {
                                (item.totalOwed) && (sum += item.totalOwed);
                                return sum;
                            }, 0);
                            model.avgSpentTI = sum/filteredOrders.length;
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
                            if(result.list.length > 0) {
                                const lastBillPrime = <DigitalSubscriptionAM>result.list.filter((item :DigitalSubscriptionAM) => (item.serviceProvider) && (item.serviceProvider === 'Amazon Prime')).pop();
                                if (lastBillPrime && lastBillPrime.contractEndDate) {
                                    const today = new Date();
                                    (model.primeSubscription = ProcessorUtils.daysDifference(today, lastBillPrime.contractEndDate) > 0);
                                }
                                const lastBillAudible = <DigitalSubscriptionAM>result.list.filter((item :DigitalSubscriptionAM) => (item.serviceProvider) && (item.serviceProvider === 'Audible')).pop();
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
                            if(item) {
                                model.address = ''.concat(
                                    item.postalCode ? item.postalCode : ',',
                                    item.city ? ','+item.city : ',',
                                    item.stateOrProvince ? ','+item.stateOrProvince : ',',
                                    item.countryCode ? ','+item.countryCode : ',');
                            }
                        }
                    } else {
                        throw new Error(`${ProcessorErrorEnums.PROCESSOR_AMAZON_INVALID_FILE_CODE}: File ${pathName} in input is not a valid Amazon file`);
                    }

                });
            }
        }
        return !Validator.objectIsEmpty(model) ? model : undefined;
    }
}
