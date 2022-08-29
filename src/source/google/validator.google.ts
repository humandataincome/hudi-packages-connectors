import {ValidatorDatasource} from "../../utils/validator/validator.datasource";
import Logger from "../../utils/logger";
import {FileCodeGoogle} from "./enum.google";

export class ValidatorGoogle extends ValidatorDatasource  {
    protected readonly logger = new Logger("Google Validator");

    protected DEFAULT_FILE_CODES: FileCodeGoogle[] = [
        FileCodeGoogle.ACCOUNT_INFO,
        FileCodeGoogle.ACTIVITY_ADS,
        FileCodeGoogle.ACTIVITY_APPS,
        FileCodeGoogle.ACTIVITY_ASSISTANT,
        FileCodeGoogle.ACTIVITY_BOOKS,
        FileCodeGoogle.ACTIVITY_DEVELOPERS,
        FileCodeGoogle.ACTIVITY_BOOKS,
        FileCodeGoogle.ACTIVITY_DISCOVER,
        FileCodeGoogle.ACTIVITY_DRIVE,
        FileCodeGoogle.ACTIVITY_GMAIL,
        FileCodeGoogle.ACTIVITY_LENS,
        FileCodeGoogle.ACTIVITY_PLAY_GAMES,
        FileCodeGoogle.ACTIVITY_PLAY_MOVIES,
        FileCodeGoogle.ACTIVITY_PLAY_STORE,
        FileCodeGoogle.ACTIVITY_TRANSLATE,
        FileCodeGoogle.ACTIVITY_HELP,
        FileCodeGoogle.ACTIVITY_IMAGE_SEARCH,
        FileCodeGoogle.ACTIVITY_MAPS,
        FileCodeGoogle.ACTIVITY_NEWS,
        FileCodeGoogle.ACTIVITY_SEARCH,
        FileCodeGoogle.ACTIVITY_TAKEOUT,
        FileCodeGoogle.ACTIVITY_SHOPPING,
        FileCodeGoogle.ACTIVITY_VIDEO_SEARCH,
        FileCodeGoogle.ACTIVITY_YOUTUBE,
        FileCodeGoogle.APP_HOME_HISTORY,
        FileCodeGoogle.BLOGGER_PROFILE_CSV,
        FileCodeGoogle.BLOGGER_PROFILE_JSON,
        FileCodeGoogle.BUSINESS_PROFILE_DATA,
        FileCodeGoogle.BUSINESS_PERSONALIZATION,
        FileCodeGoogle.CHROME_AUTOFILL,
        FileCodeGoogle.CHROME_BROWSER_HISTORY,
        FileCodeGoogle.FIT_SESSION,
        FileCodeGoogle.FIT_DAILY_ACTIVITIES_METRICS,
        FileCodeGoogle.LOCATION_HISTORY_SEMANTIC,
        FileCodeGoogle.MAPS_ADDED,
        FileCodeGoogle.MAPS_LABELLED_PLACES,
        FileCodeGoogle.MAPS_YOUR_PLACES_REVIEWS,
        FileCodeGoogle.PAY_TRANSACTIONS,
        FileCodeGoogle.PLAY_MOVIES_WATCHLIST,
        FileCodeGoogle.PLAY_STORE_LIBRARY,
        FileCodeGoogle.PLAY_STORE_ORDER_HISTORY,
        FileCodeGoogle.PLAY_STORE_PURCHASE_HISTORY,
        FileCodeGoogle.PLAY_STORE_REVIEWS,
        FileCodeGoogle.PROFILE,
        FileCodeGoogle.SAVED_DEFAULT_LIST,
        FileCodeGoogle.SAVED_FAVOURITE_PAGES,
        FileCodeGoogle.SAVED_FAVOURITE_PLACES,
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
        FileCodeGoogle.YOUTUBE_LIKED_VIDEOS,
    ];
    protected extractCompatiblePath(path: string): string {
        let x: string[] = path.split('/');
        const index = x.indexOf('Takeout');
        if (index > -1) {
            return x.splice(index).join('/');
        }
        return path;
    }
}
