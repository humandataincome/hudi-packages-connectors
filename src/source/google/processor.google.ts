import {
    AccountGO, ActivitySegmentGO, ActivityTypeGO, GoogleDataAggregator,
    MapsReviewGO,
    MapsReviewsGO,
    PlayStoreReviewGO,
    PlayStoreReviewsGO,
    SemanticLocationsGO,
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

    private static async _aggregateFactory(files: Unzipped, options?: ProcessorOptions) {
        const model: GoogleDataAggregator = {};
        return model;
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
    }

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
