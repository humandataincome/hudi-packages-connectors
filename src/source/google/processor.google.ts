import {
    ChromeAggregatorGO,
    GoogleDataAggregator,
    PlayStoreAggregatorGO,
} from "./model.google";
import {ServiceGoogle} from "./service.google";
import {ProcessorOptions, ProcessorUtils} from "../../utils/processor/processor.utils";
import {MonthsFull} from "../../utils";
import Logger from "../../utils/logger";
import {Unzipped, unzipSync} from "fflate";
import {ValidatorObject} from "../../utils/validator/validator.object";
import {FileCodeGoogle} from "./enum.google";

export class ProcessorGoogle {
    private static readonly logger = new Logger("Processor Google");

    /**
     * @param zipFile - file zip as Uint8Array
     * @param options - optional set of options
     * @return aggregation of data from Google data source
     */
    static async aggregatorFactory(zipFile: Uint8Array, options?: ProcessorOptions): Promise<GoogleDataAggregator | undefined> {
        try {
            if (zipFile) {
                const files: Unzipped = unzipSync(zipFile);
                return await this._aggregateFactory(files, options);
            }
        } catch (error: any) {
            (error && error.message) && (this.logger.log('error', error.message, 'aggregatorFactory'));
            if (options && options.throwExceptions !== undefined && options.throwExceptions) {
                throw error;

            }
        }
        return undefined;
    }

    private static async _aggregateFactory(files: Unzipped, options: ProcessorOptions = {}) {
        const timeIntervalDays = (options && options.timeIntervalDays) ? options.timeIntervalDays : 365;
        const model: GoogleDataAggregator = {};
        const modelChrome: ChromeAggregatorGO = {};
        const modelPlayStore: PlayStoreAggregatorGO = {};

        let result, regex;
        for (let pathName in files) {
            const file = files[pathName];
            const data = Buffer.from(file, file.byteOffset, file.length);
            if (!ValidatorObject.isDirectory(pathName)) {
                if ((regex = new RegExp(FileCodeGoogle.PROFILE)) && (regex.test(pathName))) {
                    result = await ServiceGoogle.parseProfile(data);
                    if (result) {
                        model.profile = result;
                    }
                } else if ((regex = new RegExp(FileCodeGoogle.LOCATION_HISTORY_SEMANTIC)) && (regex.test(pathName))) {
                    result = await ServiceGoogle.parseSemanticLocations(data);
                    if (result) {
                        if (model.locationsHistory) {
                            if (model.locationsHistory.listVisitedPlaces.length > 0){
                                (result.listVisitedPlaces) && (model.locationsHistory.listVisitedPlaces = model.locationsHistory.listVisitedPlaces.concat(result.listVisitedPlaces));
                            } else {
                                (result.listVisitedPlaces) && (model.locationsHistory.listVisitedPlaces = result.listVisitedPlaces);
                            }
                            if (model.locationsHistory.listActivities.length > 0){
                                (result.listActivities) && (model.locationsHistory.listActivities = model.locationsHistory.listActivities.concat(result.listActivities));
                            } else {
                                (result.listActivities) && (model.locationsHistory.listActivities = result.listActivities);
                            }
                        } else {
                            model.locationsHistory = result;
                        }
                    }
                } else if ((regex = new RegExp(FileCodeGoogle.PAY_TRANSACTIONS)) && (regex.test(pathName))) {
                    result = await ServiceGoogle.parseTransactions(data);
                    if (result) {
                        if (model.transactions && model.transactions.list.length > 0 && result.list.length > 0) {
                            model.transactions.list = model.transactions.list.concat(result.list);
                        } else {
                            model.transactions = result;
                        }
                    }
                } else if ((regex = new RegExp(FileCodeGoogle.MAPS_YOUR_PLACES_REVIEWS)) && (regex.test(pathName))) {
                    result = await ServiceGoogle.parseMapsReviews(data);
                    if (result) {
                        model.mapReviews = result;
                    }
                } else if ((regex = new RegExp(FileCodeGoogle.PLAY_STORE_LIBRARY)) && (regex.test(pathName))) {
                    result = await ServiceGoogle.parseDocLibrary(data);
                    if (result) {
                        modelPlayStore.docLibrary = result;
                    }
                } else if ((regex = new RegExp(FileCodeGoogle.PLAY_STORE_PURCHASE_HISTORY)) && (regex.test(pathName))) {
                    result = await ServiceGoogle.parsePurchaseHistory(data);
                    if (result) {
                        modelPlayStore.purchaseHistory = result;
                    }
                } else if ((regex = new RegExp(FileCodeGoogle.PLAY_STORE_ORDER_HISTORY)) && (regex.test(pathName))) {
                    result = await ServiceGoogle.parseOrderHistory(data);
                    if (result) {
                        modelPlayStore.orderHistory = result;
                    }
                } else if ((regex = new RegExp(FileCodeGoogle.PLAY_STORE_REVIEWS)) && (regex.test(pathName))) {
                    result = await ServiceGoogle.parsePlayStoreReviews(data);
                    if (result) {
                        modelPlayStore.reviews = result;
                    }
                } else if ((regex = new RegExp(FileCodeGoogle.CHROME_BROWSER_HISTORY)) && (regex.test(pathName))) {
                    result = await ServiceGoogle.parseBrowseHistory(data);
                    if (result) {
                        modelChrome.browserHistory = result;
                    }
                } else if ((regex = new RegExp(FileCodeGoogle.CHROME_SEARCH_ENGINES)) && (regex.test(pathName))) {
                    result = await ServiceGoogle.parseSearchEngines(data);
                    if (result) {
                        modelChrome.searchEngines = result;
                    }
                }
            }
        }
        if (!ValidatorObject.objectIsEmpty(modelChrome)) {
            model.chrome = modelChrome;
        }
        if (!ValidatorObject.objectIsEmpty(modelPlayStore)) {
            model.playStore = modelPlayStore;
        }
        if (!ValidatorObject.objectIsEmpty(model)) {
            model.creationDate = new Date();
            return model;
        }
        return undefined;
    }
    /*
    const timeIntervalDays = (options && options.timeIntervalDays) ? options.timeIntervalDays : 365;
    const model: GoogleDataAggregator = {};
    let result, regex;
    let hasSemanticLocations = false;
    let frequencyDistanceActivities: Record<ActivityTypeGO, [number, number]> = {
        'IN_PASSENGER_VEHICLE': [0, 0],
        'MOTORCYCLING': [0, 0],
        'STILL': [0, 0],
        'IN_BUS': [0, 0],
        'WALKING': [0, 0],
        'CYCLING': [0, 0],
        'IN_TRAIN': [0, 0],
        'IN_SUBWAY': [0, 0],
        'RUNNING': [0, 0],
        'FLYING': [0, 0],
        'IN_FERRY': [0, 0],
        'SAILING': [0, 0],
        'SKIING': [0, 0],
        'IN_TRAM': [0, 0],
        'IN_VEHICLE': [0, 0],
        'UNKNOWN_ACTIVITY_TYPE': [0, 0],
    };
    for (let pathName in files) {
        const file = files[pathName];
        const data = Buffer.from(file, file.byteOffset, file.length);
        if (!ValidatorObject.isDirectory(pathName)) {
            if ((regex = new RegExp(FileCodeGoogle.ACCOUNT_INFO)) && (regex.test(pathName))) {
                result = <AccountGO>await ServiceGoogle.parseGoogleAccount(data);
                if (result) {
                    (result.contactEmail) && (model.email = result.contactEmail);
                    (result.recoveryEmail) && (model.recoveryEmail = result.recoveryEmail);
                    (result.recoverySMS) && (model.recoverySMS = result.recoverySMS);
                    (result.creationDate) && (model.creationAccount = result.creationDate);
                }
            } else if ((regex = new RegExp(FileCodeGoogle.PLAY_STORE_REVIEWS)) && (regex.test(pathName))) {
                result = <PlayStoreReviewsGO>await ServiceGoogle.parsePlayStoreReviews(data);
                if (result) {
                    let sumRating = 0;
                    let counterRating = 0;
                    result.list.forEach((item: PlayStoreReviewGO) => {
                        if (item.creationTime && item.starRating && ProcessorUtils.daysDifference(item.creationTime) < timeIntervalDays) {
                            counterRating++;
                            sumRating += item.starRating;
                        }
                    });
                    if (counterRating > 0) {
                        model.counterPlayStoreReviewsTI = counterRating;
                        model.averagePlayStoreReviewsTI = sumRating / counterRating;
                    }
                }
            } else if ((regex = new RegExp(FileCodeGoogle.MAPS_YOUR_PLACES_REVIEWS)) && (regex.test(pathName))) {
                result = <MapsReviewsGO>await ServiceGoogle.parseMapsReviews(data);
                if (result) {
                    let sumRating = 0;
                    let counterRating = 0;
                    result.list.forEach((item: MapsReviewGO) => {
                        if (item.published && (item.starRating) && ProcessorUtils.daysDifference(item.published) < timeIntervalDays) {
                            counterRating++;
                            sumRating += item.starRating;
                        }
                    });
                    if (counterRating > 0) {
                        model.counterMapsReviewsTI = counterRating;
                        model.averageMapsReviewsTI = sumRating / counterRating;
                    }
                }
            } else if ((regex = new RegExp(FileCodeGoogle.LOCATION_HISTORY_SEMANTIC)) && (regex.test(pathName))) {
                result = <SemanticLocationsGO>await ServiceGoogle.parseSemanticLocations(data);
                if (result) {
                    if (this.monthIsInRange(pathName, timeIntervalDays)) {
                        result = <SemanticLocationsGO>await ServiceGoogle.parseSemanticLocations(data);
                        (result.listActivities && result.listActivities.length > 0) && (result.listActivities.forEach((item: ActivitySegmentGO) => {
                            if (item.distance && item.activityType && ActivityTypeGO[item.activityType]) {
                                (!hasSemanticLocations) && (hasSemanticLocations = true);
                                frequencyDistanceActivities[ActivityTypeGO[item.activityType]][0]++;
                                frequencyDistanceActivities[ActivityTypeGO[item.activityType]][1] += item.distance;
                            }
                        }));
                    }
                }
            }
        }
    }
    (hasSemanticLocations) && (model.frequencyDistanceActivities = frequencyDistanceActivities);
    return !ValidatorObject.objectIsEmpty(model) ? model : undefined;

     */

    static monthIsInRange(pathName: string, timeIntervalDays: number): boolean {
        const match = pathName.match(/\d{4}\/(\d{4})_(\w+).json/);
        if (match && match[1] && match[2]) {
            const month: number = parseInt(MonthsFull[match[2] as any]);
            if (month) {
                //if 2017_APRIL then returns 1st APRIL 2017
                let date: Date = new Date(Date.UTC(parseInt(match[1]), month-1, 1));
                if (ProcessorUtils.daysDifference(date) < timeIntervalDays) {
                    return true;
                }
            }
        }
        return false;
    }
}
