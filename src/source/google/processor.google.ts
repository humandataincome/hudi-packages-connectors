import {
    BrowserSearchGO,
    ChromeAggregatorGO,
    GoogleDataAggregator,
    PageTransitionSearchGO,
    PlaceVisitedGO,
    PlayStoreAggregatorGO,
    ProbableLocationGO, YouTubeAggregatorGO,
} from "./model.google";
import {ServiceGoogle} from "./service.google";
import {ProcessorOptions, ProcessorUtils} from "../../utils/processor/processor.utils";
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
        //const timeIntervalDays = (options && options.timeIntervalDays) ? options.timeIntervalDays : 365;
        const model: GoogleDataAggregator = {};
        const modelChrome: ChromeAggregatorGO = {};
        const modelPlayStore: PlayStoreAggregatorGO = {};
        const modelYoutube: YouTubeAggregatorGO = {};

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
                        const map = (place: PlaceVisitedGO) => {
                             if (place.otherProbableLocations) {
                                 return {...place, otherProbableLocations: place.otherProbableLocations.filter((otherPlace: ProbableLocationGO) => (otherPlace.locationConfidence !== undefined) && otherPlace.locationConfidence > 5)}
                             } else {
                                 return place;
                             }
                        }
                        model.locationsHistory = {
                            listActivities: ProcessorUtils.mergeArrays(model.locationsHistory?.listActivities, result.listActivities, options.maxEntitiesPerArray),
                            listVisitedPlaces: ProcessorUtils.mergeArrays(model.locationsHistory?.listVisitedPlaces, result.listVisitedPlaces, options.maxEntitiesPerArray, true).map(map)};
                    }
                } else if ((regex = new RegExp(FileCodeGoogle.PAY_TRANSACTIONS)) && (regex.test(pathName))) {
                    result = await ServiceGoogle.parseTransactions(data);
                    if (result) {
                        model.transactions = {list: ProcessorUtils.mergeArrays(model.transactions?.list, result.list, options.maxEntitiesPerArray)};
                    }
                } else if ((regex = new RegExp(FileCodeGoogle.MAPS_YOUR_PLACES_REVIEWS)) && (regex.test(pathName))) {
                    result = await ServiceGoogle.parseMapsReviews(data);
                    if (result) {
                        model.mapReviews = {list: ProcessorUtils.mergeArrays(model.mapReviews?.list, result.list, options.maxEntitiesPerArray)};
                    }
                } else if ((regex = new RegExp(FileCodeGoogle.PLAY_STORE_LIBRARY)) && (regex.test(pathName))) {
                    result = await ServiceGoogle.parseDocLibrary(data);
                    if (result) {
                        modelPlayStore.docLibrary = {list: ProcessorUtils.mergeArrays(modelPlayStore.docLibrary?.list, result.list, options.maxEntitiesPerArray)};
                    }
                } else if ((regex = new RegExp(FileCodeGoogle.PLAY_STORE_PURCHASE_HISTORY)) && (regex.test(pathName))) {
                    result = await ServiceGoogle.parsePurchaseHistory(data);
                    if (result) {
                        modelPlayStore.purchaseHistory = {list: ProcessorUtils.mergeArrays(modelPlayStore.purchaseHistory?.list, result.list, options.maxEntitiesPerArray)};
                    }
                } else if ((regex = new RegExp(FileCodeGoogle.PLAY_STORE_ORDER_HISTORY)) && (regex.test(pathName))) {
                    result = await ServiceGoogle.parseOrderHistory(data);
                    if (result) {
                        modelPlayStore.orderHistory = {list: ProcessorUtils.mergeArrays(modelPlayStore.orderHistory?.list, result.list, options.maxEntitiesPerArray)};
                    }
                } else if ((regex = new RegExp(FileCodeGoogle.PLAY_STORE_REVIEWS)) && (regex.test(pathName))) {
                    result = await ServiceGoogle.parsePlayStoreReviews(data);
                    if (result) {
                        modelPlayStore.reviews = {list: ProcessorUtils.mergeArrays(modelPlayStore.reviews?.list, result.list, options.maxEntitiesPerArray)};
                    }
                } else if ((regex = new RegExp(FileCodeGoogle.CHROME_BROWSER_HISTORY)) && (regex.test(pathName))) {
                    result = await ServiceGoogle.parseBrowseHistory(data);
                    const map = (search: BrowserSearchGO) => {
                        return {title: search.title, time: search.time}
                    }
                    const filter = (search: BrowserSearchGO) => {
                        return search.pageTransition !== PageTransitionSearchGO.RELOAD
                    }
                    if (result) {
                        //average 387 bytes for each search
                        //average 145 bytes for each mapped search (with 100k searches is 14.5 MB)
                        modelChrome.browserHistory = {list: ProcessorUtils.mergeArrays(modelChrome.browserHistory?.list, result.list, 100000, true, filter).map(map)};
                    }
                } else if ((regex = new RegExp(FileCodeGoogle.CHROME_SEARCH_ENGINES)) && (regex.test(pathName))) {
                    result = await ServiceGoogle.parseSearchEngines(data);
                    if (result) {
                        modelChrome.searchEngines = {list: ProcessorUtils.mergeArrays(modelChrome.searchEngines?.list, result.list, options.maxEntitiesPerArray)};
                    }
                } else if ((regex = new RegExp(FileCodeGoogle.YOUTUBE_PLAYLIST_UPLOADS)) && (regex.test(pathName))) {
                    result = await ServiceGoogle.parseYoutubePlaylists(data);
                    if (result) {
                        modelYoutube.youtubeUploads = {playlists: ProcessorUtils.mergeArrays(modelYoutube.youtubeUploads?.playlists, result.playlists, options.maxEntitiesPerArray)};
                    }
                } else if ((regex = new RegExp(FileCodeGoogle.YOUTUBE_LIKED_VIDEOS)) && (regex.test(pathName))) {
                    result = await ServiceGoogle.parseYoutubePlaylists(data);
                    if (result) {
                        modelYoutube.youtubeLikes = {playlists: ProcessorUtils.mergeArrays(modelYoutube.youtubeUploads?.playlists, result.playlists, options.maxEntitiesPerArray)};
                    }
                }
            }
        }
        if (!ValidatorObject.objectIsEmpty(modelYoutube)) {
            model.youtube = modelYoutube;
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
}
