import {
    ActivityGO,
    BrowserSearchGO,
    GoogleDataAggregator,
    PageTransitionSearchGO,
    PlaceVisitedGO,
    ProbableLocationGO,
} from './model.google';
import { ServiceGoogle } from './service.google';
import LoggerUtils from '../../utils/logger.utils';
import { Unzipped, unzipSync } from 'fflate';
import { FileCodeGoogle } from './enum.google';
import { staticImplements } from '../../utils/decorator.utils';
import {
    ProcessorGDPRDatasource,
    ProcessorOptions,
    ProcessorUtils,
} from '../../processor';
import { ValidatorObject } from '../../validator';

@staticImplements<ProcessorGDPRDatasource>()
export class ProcessorGoogle {
    private static readonly logger = new LoggerUtils('Processor Google');

    static initAggregator(): GoogleDataAggregator {
        return {
            chrome: {},
            playStore: {},
            youtube: {},
            fit: {},
            activities: {},
        };
    }

    /**
     * @param zipFile - file zip as Uint8Array
     * @param options - optional set of options
     * @return aggregation of data from Google data source
     */
    static async zipAggregatorBuilder(
        zipFile: Uint8Array,
        options?: ProcessorOptions,
    ): Promise<GoogleDataAggregator | undefined> {
        try {
            const files: Unzipped = unzipSync(zipFile);
            const model: GoogleDataAggregator = this.initAggregator();
            for (const pathName in files) {
                const file = files[pathName];
                const data = Buffer.from(file, file.byteOffset, file.length);
                if (!ValidatorObject.isDirectory(pathName)) {
                    await this.aggregatorBuilder(
                        data,
                        pathName,
                        model,
                        options,
                    );
                }
            }
            if (!ValidatorObject.objectIsEmpty(model)) {
                model.creationDate = new Date();
                return model;
            }
        } catch (error: any) {
            error &&
                error.message &&
                this.logger.log('error', error.message, 'zipAggregatorBuilder');
            if (
                options &&
                options.throwExceptions !== undefined &&
                options.throwExceptions
            ) {
                throw error;
            }
        }
        return undefined;
    }

    static async aggregatorBuilder(
        data: Buffer,
        pathName: string,
        model: GoogleDataAggregator,
        options: ProcessorOptions = {},
    ) {
        let result;
        let regex;
        if (
            (regex = new RegExp(FileCodeGoogle.PROFILE)) &&
            regex.test(pathName)
        ) {
            result = await ServiceGoogle.parseProfile(data);
            if (result) {
                model.profile = result;
            }
        } else if (
            (regex = new RegExp(FileCodeGoogle.LOCATION_HISTORY_SEMANTIC)) &&
            regex.test(pathName)
        ) {
            result = await ServiceGoogle.parseSemanticLocations(data);
            if (result) {
                const map = (place: PlaceVisitedGO) => {
                    if (place.otherProbableLocations) {
                        return {
                            ...place,
                            otherProbableLocations:
                                place.otherProbableLocations.filter(
                                    (otherPlace: ProbableLocationGO) =>
                                        otherPlace.locationConfidence !==
                                            undefined &&
                                        otherPlace.locationConfidence > 5,
                                ),
                        };
                    } else {
                        return place;
                    }
                };
                model.locationsHistory = {
                    listActivities: ProcessorUtils.mergeArrays(
                        model.locationsHistory?.listActivities,
                        result.listActivities,
                        options.maxEntitiesPerArray,
                    ),
                    listVisitedPlaces: ProcessorUtils.mergeArrays(
                        model.locationsHistory?.listVisitedPlaces,
                        result.listVisitedPlaces,
                        options.maxEntitiesPerArray,
                        true,
                    ).map(map),
                };
            }
        } else if (
            (regex = new RegExp(FileCodeGoogle.PAY_TRANSACTIONS)) &&
            regex.test(pathName)
        ) {
            result = await ServiceGoogle.parseTransactions(data);
            if (result) {
                model.transactions = {
                    list: ProcessorUtils.mergeArrays(
                        model.transactions?.list,
                        result.list,
                        options.maxEntitiesPerArray,
                    ),
                };
            }
        } else if (
            (regex = new RegExp(FileCodeGoogle.MAPS_YOUR_PLACES_REVIEWS)) &&
            regex.test(pathName)
        ) {
            result = await ServiceGoogle.parseMapsReviews(data);
            if (result) {
                model.mapReviews = {
                    list: ProcessorUtils.mergeArrays(
                        model.mapReviews?.list,
                        result.list,
                        options.maxEntitiesPerArray,
                    ),
                };
            }
        } else if (
            (regex = new RegExp(FileCodeGoogle.PLAY_STORE_LIBRARY)) &&
            regex.test(pathName)
        ) {
            result = await ServiceGoogle.parseDocLibrary(data);
            if (result) {
                model.playStore.docLibrary = {
                    list: ProcessorUtils.mergeArrays(
                        model.playStore.docLibrary?.list,
                        result.list,
                        options.maxEntitiesPerArray,
                    ),
                };
            }
        } else if (
            (regex = new RegExp(FileCodeGoogle.PLAY_STORE_PURCHASE_HISTORY)) &&
            regex.test(pathName)
        ) {
            result = await ServiceGoogle.parsePurchaseHistory(data);
            if (result) {
                model.playStore.purchaseHistory = {
                    list: ProcessorUtils.mergeArrays(
                        model.playStore.purchaseHistory?.list,
                        result.list,
                        options.maxEntitiesPerArray,
                    ),
                };
            }
        } else if (
            (regex = new RegExp(FileCodeGoogle.PLAY_STORE_ORDER_HISTORY)) &&
            regex.test(pathName)
        ) {
            result = await ServiceGoogle.parseOrderHistory(data);
            if (result) {
                model.playStore.orderHistory = {
                    list: ProcessorUtils.mergeArrays(
                        model.playStore.orderHistory?.list,
                        result.list,
                        options.maxEntitiesPerArray,
                    ),
                };
            }
        } else if (
            (regex = new RegExp(FileCodeGoogle.PLAY_STORE_REVIEWS)) &&
            regex.test(pathName)
        ) {
            result = await ServiceGoogle.parsePlayStoreReviews(data);
            if (result) {
                model.playStore.reviews = {
                    list: ProcessorUtils.mergeArrays(
                        model.playStore.reviews?.list,
                        result.list,
                        options.maxEntitiesPerArray,
                    ),
                };
            }
        } else if (
            (regex = new RegExp(FileCodeGoogle.CHROME_BROWSER_HISTORY)) &&
            regex.test(pathName)
        ) {
            result = await ServiceGoogle.parseBrowseHistory(data);
            const map = (search: BrowserSearchGO) => {
                return { title: search.title, time: search.time };
            };
            const filter = (search: BrowserSearchGO) => {
                return search.pageTransition !== PageTransitionSearchGO.RELOAD;
            };
            if (result) {
                //average 387 bytes for each search
                //average 145 bytes for each mapped search (with 100k searches is 14.5 MB)
                model.chrome.browserHistory = {
                    list: ProcessorUtils.mergeArrays(
                        model.chrome.browserHistory?.list,
                        result.list,
                        100000,
                        true,
                        filter,
                    ).map(map),
                };
            }
        } else if (
            (regex = new RegExp(FileCodeGoogle.YOUTUBE_PLAYLIST_UPLOADS)) &&
            regex.test(pathName)
        ) {
            result = await ServiceGoogle.parseYoutubePlaylists(data);
            if (result) {
                model.youtube.videoUploaded = {
                    playlists: ProcessorUtils.mergeArrays(
                        model.youtube.videoUploaded?.playlists,
                        result.playlists,
                        options.maxEntitiesPerArray,
                    ),
                };
            }
        } else if (
            (regex = new RegExp(FileCodeGoogle.YOUTUBE_LIKED_VIDEOS)) &&
            regex.test(pathName)
        ) {
            result = await ServiceGoogle.parseYoutubePlaylists(data);
            if (result) {
                model.youtube.videoLiked = {
                    playlists: ProcessorUtils.mergeArrays(
                        model.youtube.videoLiked?.playlists,
                        result.playlists,
                        options.maxEntitiesPerArray,
                    ),
                };
            }
        } else if (
            (regex = new RegExp(FileCodeGoogle.FIT_DAILY_ACTIVITIES_METRICS)) &&
            regex.test(pathName)
        ) {
            result = await ServiceGoogle.parseDailyActivityMetrics(data);
            if (result) {
                model.fit.dailyActivityMetrics = {
                    list: ProcessorUtils.mergeArrays(
                        model.fit.dailyActivityMetrics?.list,
                        result.list,
                        options.maxEntitiesPerArray,
                        false,
                    ),
                };
            }
        } else if (
            (regex = new RegExp(FileCodeGoogle.ACTIVITY_NEWS)) &&
            regex.test(pathName)
        ) {
            const map = (item: ActivityGO) => {
                return { title: item.title, date: item.date };
            };
            result = await ServiceGoogle.parseActivity(data);
            if (result) {
                model.activities.news = {
                    list: ProcessorUtils.mergeArrays(
                        model.activities.news?.list,
                        result.list,
                        options.maxEntitiesPerArray,
                    ).map(map),
                };
            }
        } else if (
            (regex = new RegExp(FileCodeGoogle.ACTIVITY_BOOKS)) &&
            regex.test(pathName)
        ) {
            const map = (item: ActivityGO) => {
                return { title: item.title, date: item.date };
            };
            result = await ServiceGoogle.parseActivity(data);
            if (result) {
                model.activities.books = {
                    list: ProcessorUtils.mergeArrays(
                        model.activities.books?.list,
                        result.list,
                        options.maxEntitiesPerArray,
                    ).map(map),
                };
            }
        } else if (
            (regex = new RegExp(FileCodeGoogle.ACTIVITY_IMAGE_SEARCH)) &&
            regex.test(pathName)
        ) {
            const map = (item: ActivityGO) => {
                return { title: item.title, date: item.date };
            };
            result = await ServiceGoogle.parseActivity(data);
            if (result) {
                model.activities.imageSearch = {
                    list: ProcessorUtils.mergeArrays(
                        model.activities.imageSearch?.list,
                        result.list,
                        options.maxEntitiesPerArray,
                    ).map(map),
                };
            }
        } else if (
            (regex = new RegExp(FileCodeGoogle.ACTIVITY_SHOPPING)) &&
            regex.test(pathName)
        ) {
            const map = (item: ActivityGO) => {
                return { title: item.title, date: item.date };
            };
            result = await ServiceGoogle.parseActivity(data);
            if (result) {
                model.activities.shopping = {
                    list: ProcessorUtils.mergeArrays(
                        model.activities.shopping?.list,
                        result.list,
                        options.maxEntitiesPerArray,
                    ).map(map),
                };
            }
        } else if (
            (regex = new RegExp(FileCodeGoogle.ACTIVITY_DISCOVER)) &&
            regex.test(pathName)
        ) {
            const map = (item: ActivityGO) => {
                return { date: item.date, subtitles: item.subtitles };
            };
            result = await ServiceGoogle.parseActivity(data);
            if (result) {
                model.activities.discovery = {
                    list: ProcessorUtils.mergeArrays(
                        model.activities.discovery?.list,
                        result.list,
                        options.maxEntitiesPerArray,
                    ).map(map),
                };
            }
        }
    }
}
