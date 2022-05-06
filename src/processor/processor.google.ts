import {InputFileFormat, ValidatorFiles} from "../validator";
import { GoogleDataAggregator } from "./processor.aggregator.model";
import {FileCodeGoogle} from "../descriptor";
import {
    AccountGO, ActivitySegmentGO, ActivityTypeGO,
    MapsReviewGO,
    MapsReviewsGO,
    PlayStoreReviewGO,
    PlayStoreReviewsGO,
    SemanticLocationsGO,
} from "../model";
import {GoogleService} from "../service";
import {ProcessorUtils} from "./processor.utils";
import {MonthsFull} from "../utils/utils.enum";

export class ProcessorGoogle {
    /**
     * @param zipFile - file zip as Buffer
     * @param timeIntervalDays - optional days of interval wanted for TI parameters, default value is 365
     * @return aggregation of data from Google data source
     */
    static async aggregatorFactory(zipFile: InputFileFormat, timeIntervalDays: number = 365): Promise<GoogleDataAggregator | undefined> {
        if(zipFile) {
            const JSZip = require("jszip");
            const model: GoogleDataAggregator = {};
            let result, regex;
            let hasSemanticLocations = false;
            const zip = await JSZip.loadAsync(zipFile);
            let frequencyDistanceActivity: Array<[ActivityTypeGO, number, number]> = [
                //ActivityType, Frequency, Sum of Distances
                [ActivityTypeGO.IN_PASSENGER_VEHICLE, 0, 0],
                [ActivityTypeGO.MOTORCYCLING, 0, 0],
                [ActivityTypeGO.STILL, 0, 0],
                [ActivityTypeGO.IN_BUS, 0, 0],
                [ActivityTypeGO.WALKING, 0, 0],
                [ActivityTypeGO.CYCLING, 0, 0],
                [ActivityTypeGO.IN_TRAIN, 0, 0],
                [ActivityTypeGO.IN_SUBWAY, 0, 0],
                [ActivityTypeGO.RUNNING, 0, 0],
                [ActivityTypeGO.FLYING, 0, 0],
                [ActivityTypeGO.IN_FERRY, 0, 0],
                [ActivityTypeGO.SAILING, 0, 0],
                [ActivityTypeGO.SKIING, 0, 0],
                [ActivityTypeGO.IN_TRAM, 0, 0],
                [ActivityTypeGO.IN_VEHICLE, 0, 0],
                [ActivityTypeGO.UNKNOWN_ACTIVITY_TYPE, 0, 0],
            ];
            for (let pathName of Object.keys(zip.files)) {
                const file = zip.files[pathName];
                if (!file.dir) {
                    await file.async('nodebuffer').then(async (data: Buffer) => {
                        if ((regex = new RegExp(FileCodeGoogle.ACCOUNT_INFO)) && (regex.test(pathName))) {
                            result = <AccountGO>await GoogleService.parseGoogleAccount(data);
                            if (result) {
                                (result.contactEmail) && (model.email = result.contactEmail);
                                (result.recoveryEmail) && (model.recoveryEmail = result.recoveryEmail);
                                (result.recoverySMS) && (model.recoverySMS = result.recoverySMS);
                                (result.creationDate) && (model.creationAccount = result.creationDate);
                            }
                        } else if ((regex = new RegExp(FileCodeGoogle.PLAY_STORE_REVIEWS)) && (regex.test(pathName))) {
                            result = <PlayStoreReviewsGO>await GoogleService.parsePlayStoreReviews(data);
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
                            result = <MapsReviewsGO>await GoogleService.parseMapsReviews(data);
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
                        } else if ((regex = new RegExp(FileCodeGoogle.SEMANTIC_LOCATION_HISTORY)) && (regex.test(pathName))) {
                            result = <SemanticLocationsGO>await GoogleService.parseSemanticLocations(data);
                            if (result) {
                                if (this.monthIsInRange(pathName, timeIntervalDays)) {
                                    result = <SemanticLocationsGO>await GoogleService.parseSemanticLocations(data);
                                    (result.listActivities.length > 0) && result.listActivities.forEach((item: ActivitySegmentGO) => {
                                        if (item.distance && item.activityType) {
                                            (!hasSemanticLocations) && (hasSemanticLocations = true);
                                            frequencyDistanceActivity[parseInt(ActivityTypeGO[item.activityType])][1]++;
                                            frequencyDistanceActivity[parseInt(ActivityTypeGO[item.activityType])][2] += item.distance;
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
            }
            if (hasSemanticLocations) {
                frequencyDistanceActivity
                    .sort((a, b) => {
                        if (a[2] > b[2]) {
                            return -1;
                        }
                        if (a[2] < b[2]) {
                            return 1;
                        }
                        return 0;
                    })
                    .slice(0, 3)
                    .forEach((value) => {
                        if (!model.mostFrequentActivityTypes) {
                            model.mostFrequentActivityTypes = [];
                        }
                        if (!model.averageDistancesForActivityType) {
                            model.averageDistancesForActivityType = [];
                        }
                        if (value[2] > 0) {
                            model.mostFrequentActivityTypes.push(value[0]);
                            model.averageDistancesForActivityType.push(value[2] / value[1]);
                        }
                    });
            }
            return !ValidatorFiles.objectIsEmpty(model) ? model : undefined;
        }
        return undefined;
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
