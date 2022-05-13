import {ValidatorDatasource} from "./validator.datasource";
import {FileCode, FileCodeGoogle} from "../descriptor";
import Logger from "../utils/logger";

export type ValidatorGoogleOption = {
    fileCodes?: FileCode[];
    throwExceptions?: boolean;
}

export class ValidatorGoogle extends ValidatorDatasource  {
    protected readonly logger = new Logger("Google Validator");

    protected DEFAULT_FILE_CODES: FileCodeGoogle[] = [
        FileCodeGoogle.ACCOUNT_INFO,
        FileCodeGoogle.ACTIVITY_ADS,
        FileCodeGoogle.ACTIVITY_APPS,
        FileCodeGoogle.ACTIVITY_ASSISTANT,
        FileCodeGoogle.ACTIVITY_CHROME,
        FileCodeGoogle.ACTIVITY_DEVELOPERS,
        FileCodeGoogle.ACTIVITY_DISCOVER,
        FileCodeGoogle.ACTIVITY_DRIVE,
        FileCodeGoogle.ACTIVITY_GMAIL,
        FileCodeGoogle.ACTIVITY_LENS,
        FileCodeGoogle.ACTIVITY_NEWS,
        FileCodeGoogle.ACTIVITY_PLAY_GAMES,
        FileCodeGoogle.ACTIVITY_PLAY_MOVIES,
        FileCodeGoogle.ACTIVITY_PLAY_STORE,
        FileCodeGoogle.ACTIVITY_TRANSLATE,
        FileCodeGoogle.ACTIVITY_HELP,
        FileCodeGoogle.ACTIVITY_IMAGE_SEARCH,
        FileCodeGoogle.ACTIVITY_MAPS,
        FileCodeGoogle.ACTIVITY_SEARCH,
        FileCodeGoogle.ACTIVITY_SHOPPING,
        FileCodeGoogle.ACTIVITY_TAKEOUT,
        FileCodeGoogle.ACTIVITY_VIDEO_SEARCH,
        FileCodeGoogle.ACTIVITY_YOUTUBE,
        FileCodeGoogle.APP_HOME,
        FileCodeGoogle.APP_HOME_PARTNER_CONNECTIONS,
        FileCodeGoogle.APP_HOME_HISTORY,
        FileCodeGoogle.APP_HOME_SOUND_SENSING,
        FileCodeGoogle.BLOGGER_PROFILE_CSV,
        FileCodeGoogle.BLOGGER_PROFILE_JSON,
        FileCodeGoogle.BUSINESS_PROFILE_DATA,
        FileCodeGoogle.BUSINESS_PERSONALIZATION,
        FileCodeGoogle.CHROME_AUTOFILL,
        FileCodeGoogle.CHROME_BOOKMARKS,
        FileCodeGoogle.CHROME_BROWSER_HISTORY,
        FileCodeGoogle.CHROME_DICTIONARY,
        FileCodeGoogle.CHROME_EXTENSION,
        FileCodeGoogle.CHROME_SEARCH_ENGINES,
        FileCodeGoogle.CHROME_SYNC_SETTINGS,
        FileCodeGoogle.FIT_ACTIVITY,
        FileCodeGoogle.FIT_DATA,
        FileCodeGoogle.FIT_SESSION,
        FileCodeGoogle.FIT_DAILY_ACTIVITIES,
        FileCodeGoogle.HANGOUTS,
        FileCodeGoogle.LOCATION_HISTORY_RECORDS,
        FileCodeGoogle.LOCATION_HISTORY_SEMANTIC,
        FileCodeGoogle.LOCATION_HISTORY_SETTINGS,
        FileCodeGoogle.MAPS_ADDED,
        FileCodeGoogle.MAPS_COMMUTE_SETTINGS,
        FileCodeGoogle.MAPS_VEHICLE_SETTINGS,
        FileCodeGoogle.MAPS_LABELLED_PLACES,
        FileCodeGoogle.MAPS_QUESTIONS_ANSWERS,
        FileCodeGoogle.MAPS_REQUESTS_SERVICES,
        FileCodeGoogle.MAPS_PERSONAL_FEEDBACK,
        FileCodeGoogle.MAPS_YOUR_PLACES_REVIEWS,
        FileCodeGoogle.NEWS_ARTICLES,
        FileCodeGoogle.NEWS_FOLLOWED_LOCATIONS,
        FileCodeGoogle.NEWS_FOLLOWED_SOURCES,
        FileCodeGoogle.NEWS_FOLLOWED_TOPICS,
        FileCodeGoogle.NEWS_MAGAZINES,
        FileCodeGoogle.PAY_REMITTANCES_REQUESTS,
        FileCodeGoogle.PAY_TRANSACTIONS,
        FileCodeGoogle.PLAY_MOVIES_SERVICES,
        FileCodeGoogle.PLAY_MOVIES_NOTIFICATION,
        FileCodeGoogle.PLAY_MOVIES_RATINGS,
        FileCodeGoogle.PLAY_MOVIES_STREAMING_SERVICES,
        FileCodeGoogle.PLAY_MOVIES_WATCHLIST,
        FileCodeGoogle.PLAY_STORE_DEVICES,
        FileCodeGoogle.PLAY_STORE_INSTALLS,
        FileCodeGoogle.PLAY_STORE_SETTINGS,
        FileCodeGoogle.PLAY_STORE_LIBRARY,
        FileCodeGoogle.PLAY_STORE_ORDER_HISTORY,
        FileCodeGoogle.PLAY_STORE_PURCHASE_HISTORY,
        FileCodeGoogle.PLAY_STORE_REVIEWS,
        FileCodeGoogle.PROFILE,
        FileCodeGoogle.SAVED_DEFAULT_LIST,
        FileCodeGoogle.SAVED_FAVOURITE_IMAGES,
        FileCodeGoogle.SAVED_FAVOURITE_PAGES,
        FileCodeGoogle.SAVED_FAVOURITE_PLACES,
        FileCodeGoogle.SEARCH_CONTRIBUTIONS_ACCOUNT,
        FileCodeGoogle.SEARCH_CONTRIBUTIONS_HEARTS,
        FileCodeGoogle.SEARCH_CONTRIBUTIONS_THUMBS,
        FileCodeGoogle.SHOPPING_ADDRESSES,
        FileCodeGoogle.SHOPPING_COLLECTION_POINTS,
        FileCodeGoogle.SHOPPING_LOYALTY,
        FileCodeGoogle.SHOPPING_MERCHANT_REVIEWS,
        FileCodeGoogle.SHOPPING_CONTACT_EMAILS,
        FileCodeGoogle.SHOPPING_ORDERS,
        FileCodeGoogle.SHOPPING_PERSON_COLLECTING,
        FileCodeGoogle.SHOPPING_PRODUCT_REVIEWS,
        FileCodeGoogle.STADIA_GAMING_DATA_HISTORY,
        FileCodeGoogle.STADIA_GAMING_DATA_LIBRARY,
        FileCodeGoogle.STADIA_GAMING_SAVE,
        FileCodeGoogle.STADIA_GAMING_USER_ACHIEVEMENT,
        FileCodeGoogle.STADIA_GAMING_USER_STATS,
        FileCodeGoogle.STADIA_SOCIAL_MULTI,
        FileCodeGoogle.STADIA_SOCIAL_GRAPH,
        FileCodeGoogle.STADIA_USER_PARENTAL,
        FileCodeGoogle.STADIA_USER_PROFILE,
        FileCodeGoogle.YOUTUBE_LIKED_VIDEOS,
        FileCodeGoogle.YOUTUBE_PLAYLIST_UPLOADS,
        /*
        FileCodeGoogle.ANDROID_DEVICE_CONFIG,
        FileCodeGoogle.BOOK,
        FileCodeGoogle.CALENDAR,
        FileCodeGoogle.CLOUD_PRINT_JOBS,
        FileCodeGoogle.CLOUD_PRINT_PRINTERS,
        FileCodeGoogle.DRIVE_FILE,
        FileCodeGoogle.GROUPS_RECENT_VIEWED_DISCUSSIONS,
        FileCodeGoogle.GROUPS_RECENT_VIEWED_GROUPS,
        FileCodeGoogle.KEEP_FILE_JSON,
        FileCodeGoogle.KEEP_FILE_HTML,
        FileCodeGoogle.MAIL_BLOCKED_ADDRESSES,
        FileCodeGoogle.MAIL_ALL,
        FileCodeGoogle.MY_CONTACTS,
        FileCodeGoogle.PHOTO_JSON,
        FileCodeGoogle.PHOTO_JPG,
        FileCodeGoogle.PHOTO_PRINT_SUB,
        FileCodeGoogle.PHOTO_SHARED_ALBUM,
        FileCodeGoogle.PHOTO_GENERATED_MEMORY_TITLES,
        FileCodeGoogle.PLAY_GAMES_ACTIVITY,
        FileCodeGoogle.PLAY_GAMES_ACHIEVEMENTS,
        FileCodeGoogle.PLAY_GAMES_EXPERIENCE,
        FileCodeGoogle.PLAY_GAMES_SCORES,
        FileCodeGoogle.PLAY_GLOBAL_PLAYER,
        FileCodeGoogle.REMINDERS,
         */
    ];
    protected extractCompatiblePath(path: string): string {
        let x: string[] = path.split('/');
        const index = x.indexOf('Takeout');
        if (index > -1) {
            return x.splice(index).join('/');
        }
        return path;
    }

    /*
    protected extractCompatiblePath(path: string): string {
        let x: string[] = path.split('/');
        const index = x.indexOf('Takeout');
        if (index > -1) {
            x = x.slice(index, x.length);

            let path = ConfigGoogle.pathTranslation[x.join('/')];
            if (path) {
                return path;
            }
            let pathTranslation1 = (x.length > 1) ? ConfigGoogle.pathTranslation[`${x[x.length - 1]}`] : undefined;
            let pathTranslation2 = (x.length > 2) ? ConfigGoogle.pathTranslation[`${x[x.length - 2]}`] : undefined;
            let pathTranslation3 = (x.length > 3) ? ConfigGoogle.pathTranslation[`${x[x.length - 3]}`] : undefined;
            //console.log(x)
            //console.log(pathTranslation1, pathTranslation2, pathTranslation3);
            if (pathTranslation3) {
                if (pathTranslation3 === 'Games') {
                    if (pathTranslation1) {
                        return x.slice(0, x.length - 3).join('/') + pathTranslation3 + '/' + x[x.length - 2] + '/' + pathTranslation1;
                    }
                }
                if (pathTranslation3 === 'Google Play Books') {
                    return x.slice(0, x.length - 3).join('/') + pathTranslation3 + '/' + x[x.length - 2] + '/' + x[x.length - 1];
                }
            }
            if (pathTranslation2 && pathTranslation1) {
                return x.slice(0, x.length - 2).join('/') + pathTranslation2 + '/' + pathTranslation1;
            }
            if (pathTranslation2) {
                return x.slice(0, x.length - 2).join('/') + pathTranslation2 + '/' + x[x.length - 1];
            }
            if (pathTranslation1) {
                return x.slice(0, x.length - 1).join('/') + pathTranslation1;
            }
            return x.join('/');
        }
        return path;
    }
     */
}
