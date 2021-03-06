import {FileCodeFacebook} from "../descriptor";
import {ValidatorDatasource} from "./validator.datasource";
import Logger from "../utils/logger";

export class ValidatorFacebook extends ValidatorDatasource {
    protected readonly logger = new Logger("Facebook Validator");

    protected DEFAULT_FILE_CODES: FileCodeFacebook[] = [
        FileCodeFacebook.ACCOUNT_CENTER,
        FileCodeFacebook.ACTIVITY_GROUP_INTERACTIONS,
        FileCodeFacebook.ACTIVITY_PEOPLE_FRIENDS,
        FileCodeFacebook.ADS_INTERACTED_WITH,
        FileCodeFacebook.ADS_INTERESTS,
        FileCodeFacebook.ADS_USING_YOUR_ACTIVITY,
        FileCodeFacebook.APP_WEBSITES,
        FileCodeFacebook.COMMENTS,
        FileCodeFacebook.EVENT_INVITATION,
        FileCodeFacebook.EVENT_RESPONSES,
        FileCodeFacebook.FEED,
        FileCodeFacebook.FRIENDS,
        FileCodeFacebook.FRIENDS_WHO_YOU_FOLLOW,
        FileCodeFacebook.GROUPS_MEMBERSHIP_ACTIVITY,
        FileCodeFacebook.INFO_SUBMITTED_ADS,
        FileCodeFacebook.INSTANT_GAMES,
        FileCodeFacebook.LANGUAGE,
        FileCodeFacebook.LOCATION_LAST,
        FileCodeFacebook.LOCATION_PRIMARY,
        FileCodeFacebook.LOCATION_PRIMARY_PUBLIC,
        FileCodeFacebook.LOCATION_TIMEZONE,
        FileCodeFacebook.OFF_ACTIVITIES,
        FileCodeFacebook.PAGES_FOLLOWED,
        FileCodeFacebook.PAGES_LIKED,
        FileCodeFacebook.PAGES_RECOMMENDED,
        FileCodeFacebook.PAYMENT_HISTORY,
        FileCodeFacebook.PREFERENCES_LANGUAGE_LOCALE,
        FileCodeFacebook.PROFILE_INFO,
        FileCodeFacebook.REACTIONS,
        FileCodeFacebook.RECENTLY_VIEWED,
        FileCodeFacebook.RECENTLY_VISITED,
        FileCodeFacebook.SEARCH_HISTORY,
        FileCodeFacebook.STORIES_REACTION,
        FileCodeFacebook.YOUR_TOPICS,
        FileCodeFacebook.YOUR_POSTS,
    ];

    protected extractCompatiblePath(path: string): string {
        const x: string[] = path.split('/');
        //messages/message_requests OR message/inbox cases
        if (x.length > 3) {
            if (x[x.length - 4] === 'messages') {
                return x[x.length - 4] + '/' + x[x.length - 3] + '/' + x[x.length - 2] + '/' + x[x.length - 1];
            }
        }
        if(x.length > 1) {
            return x[x.length - 2] + '/' + x[x.length - 1];
        }
        return path;
    }
}
