import {InputFileFormat, Validator} from "../validator";
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
import {ProcessorErrorEnums} from "./processor.error";
import {MonthsFull} from "../utils/utils.enum";

export class ProcessorGoogle {
    /**
     * @param zipFile - file zip as Buffer
     * @param timeIntervalDays - optional days of interval wanted for TI parameters, default value is 365
     * @return aggregation of data from Google data source
     */
    static async aggregatorFactory(zipFile: InputFileFormat, timeIntervalDays: number = 365): Promise<GoogleDataAggregator | undefined> {
        const JSZip = require("jszip");
        const model: GoogleDataAggregator = {};
        let result, regex;
        const zip = await JSZip.loadAsync(zipFile);
        for (let pathName of Object.keys(zip.files)) {
            const file = zip.files[pathName];
            if (!file.dir) {
                let frequencyDistanceActivity: Array<[ActivityTypeGO, number, number]> = [
                    //ActivityType, Frequency, Sum of Distances
                    [ActivityTypeGO.IN_PASSENGER_VEHICLE,0,0],
                    [ActivityTypeGO.MOTORCYCLING,0,0],
                    [ActivityTypeGO.STILL,0,0],
                    [ActivityTypeGO.IN_BUS,0,0],
                    [ActivityTypeGO.WALKING,0,0],
                    [ActivityTypeGO.CYCLING,0,0],
                    [ActivityTypeGO.IN_TRAIN,0,0],
                    [ActivityTypeGO.IN_SUBWAY,0,0],
                    [ActivityTypeGO.RUNNING,0,0],
                    [ActivityTypeGO.FLYING,0,0],
                    [ActivityTypeGO.IN_FERRY,0,0],
                    [ActivityTypeGO.SAILING,0,0],
                    [ActivityTypeGO.SKIING,0,0],
                    [ActivityTypeGO.IN_TRAM,0,0],
                    [ActivityTypeGO.IN_VEHICLE,0,0],
                    [ActivityTypeGO.UNKNOWN_ACTIVITY_TYPE,0,0],
                ]
                await file.async('nodebuffer').then(async (data: Buffer) => {
                    if((regex = new RegExp(FileCodeGoogle.ACCOUNT_INFO)) && (regex.test(pathName))) {
                        result = <AccountGO>await GoogleService.parseGoogleAccount(data);
                        if (result) {
                            (result.contactEmail) && (model.email = result.contactEmail);
                            (result.recoveryEmail) && (model.recoveryEmail = result.recoveryEmail);
                            (result.recoverySMS) && (model.recoverySMS = result.recoverySMS);
                            (result.creationDate) && (model.creationAccount = result.creationDate);
                        }
                    } else if((regex = new RegExp(FileCodeGoogle.PLAY_STORE_REVIEWS)) && (regex.test(pathName))) {
                        result = <PlayStoreReviewsGO>await GoogleService.parsePlayStoreReviews(data);
                        if (result) {
                            let sumRating = 0;
                            let counterRating = 0;
                            result.list.forEach((item: PlayStoreReviewGO) => {
                                if (item.creationTime && ProcessorUtils.daysDifference(item.creationTime) < timeIntervalDays) {
                                    counterRating++;
                                    (item.starRating) && (sumRating += item.starRating);
                                }
                            });
                            model.counterMapsReviewsTI = counterRating;
                            model.averageMapsReviewsTI = sumRating/counterRating;
                        }
                    } else if((regex = new RegExp(FileCodeGoogle.MAPS_YOUR_PLACES_REVIEWS)) && (regex.test(pathName))) {
                        result = <MapsReviewsGO>await GoogleService.parseMapsReviews(data);
                        if (result) {
                            let sumRating = 0;
                            let counterRating = 0;
                            result.list.forEach((item: MapsReviewGO) => {
                                if (item.published && ProcessorUtils.daysDifference(item.published) < timeIntervalDays) {
                                    counterRating++;
                                    (item.starRating) && (sumRating += item.starRating);
                                }
                            });
                            model.counterMapsReviewsTI = counterRating;
                            model.averageMapsReviewsTI = sumRating/counterRating;
                        }
                    } else if((regex = new RegExp(FileCodeGoogle.SEMANTIC_LOCATION_HISTORY)) && (regex.test(pathName))) {
                        result = <SemanticLocationsGO>await GoogleService.parseSemanticLocations(data);
                        if (result) {
                            if (this.monthIsInRange(pathName, timeIntervalDays)) {
                                result = <SemanticLocationsGO>await GoogleService.parseSemanticLocations(data);
                                result.listActivities.forEach((item: ActivitySegmentGO) => {
                                    if(item.startDate && ProcessorUtils.daysDifference(item.startDate) < timeIntervalDays) {
                                        if (item.distance && item.activityType) {
                                            frequencyDistanceActivity[item.activityType][1]++;
                                            frequencyDistanceActivity[item.activityType][2]+= item.distance;
                                        }
                                    }
                                });
                                let highestDistance = 0;
                                let highestIndex = 0;
                                let topThreeDistances: Array<[ActivityTypeGO, number]> = [];
                                for (let i = 0; i < 3; i++) { //get only top 3 distances for the model
                                    let skipIndex: number[] = [];
                                    for(let j = 0; j < frequencyDistanceActivity.length && !skipIndex.find(value => j === value); j++) {
                                        if (frequencyDistanceActivity[j][2] > highestDistance) {
                                            highestIndex = frequencyDistanceActivity[j][0];
                                            highestDistance = frequencyDistanceActivity[j][2];
                                        }
                                    }
                                    topThreeDistances.push([frequencyDistanceActivity[highestIndex][0], frequencyDistanceActivity[highestIndex][2]/frequencyDistanceActivity[highestIndex][1]]);
                                    skipIndex.push(frequencyDistanceActivity[highestIndex][0]);
                                }
                                model.mostFrequentActivityTypes = topThreeDistances.map((item) => item[0]);
                                model.averageDistancesForActivityType = topThreeDistances.map((item) => item[1]);
                            }
                        }
                    } else {
                        throw new Error(`${ProcessorErrorEnums.PROCESSOR_GOOGLE_INVALID_FILE_CODE}: File ${pathName} in input is not a valid Google file`);
                    }
                });
            }
        }
        return !Validator.objectIsEmpty(model) ? model : undefined;
    }

    static monthIsInRange(pathName: string, timeIntervalDays: number): boolean {
        const match = pathName.match(/\d{4}\/(\d{4})_(\w+).json/);
        if (match && match[1] && match[2]) {
            const month: number = parseInt(MonthsFull[match[2] as any]);
            if (month) {
                //if 2017_APRIL then returns 1st APRIL 2017
                let date: Date = new Date(parseInt(match[1]), month - 1, 1);
                if (ProcessorUtils.daysDifference(date) < timeIntervalDays) {
                    return true;
                }
            }
        }
        return false;
    }
}
