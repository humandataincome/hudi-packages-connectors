import { ValidatorDatasource } from '../../validator/validator.datasource';
import LoggerUtils from '../../utils/logger.utils';
import { FileCodeGoogle } from './enum.google';

export class ValidatorGoogle extends ValidatorDatasource {
    protected readonly logger = new LoggerUtils('Google Validator');

    protected DEFAULT_FILE_CODES: FileCodeGoogle[] = [
        FileCodeGoogle.ACTIVITY_BOOKS,
        FileCodeGoogle.ACTIVITY_DISCOVER,
        FileCodeGoogle.ACTIVITY_IMAGE_SEARCH,
        FileCodeGoogle.ACTIVITY_NEWS,
        FileCodeGoogle.ACTIVITY_PLAY_GAMES,
        FileCodeGoogle.ACTIVITY_PLAY_MOVIES,
        FileCodeGoogle.ACTIVITY_SHOPPING,
        FileCodeGoogle.v2_CHROME_BROWSER_HISTORY,
        FileCodeGoogle.FIT_DAILY_ACTIVITIES_METRICS,
        FileCodeGoogle.LOCATION_HISTORY_SEMANTIC,
        FileCodeGoogle.MAPS_YOUR_PLACES_REVIEWS,
        FileCodeGoogle.PAY_TRANSACTIONS,
        FileCodeGoogle.PLAY_STORE_LIBRARY,
        FileCodeGoogle.PLAY_STORE_ORDER_HISTORY,
        FileCodeGoogle.PLAY_STORE_PURCHASE_HISTORY,
        FileCodeGoogle.PLAY_STORE_REVIEWS,
        FileCodeGoogle.PROFILE,
        FileCodeGoogle.YOUTUBE_LIKED_VIDEOS,
        FileCodeGoogle.YOUTUBE_PLAYLIST_UPLOADS,
    ];
    protected extractCompatiblePath(path: string): string {
        const x: string[] = path.split('/');
        const index = x.indexOf('Takeout');
        if (index > -1) {
            return x.splice(index).join('/');
        }
        return path;
    }
}
