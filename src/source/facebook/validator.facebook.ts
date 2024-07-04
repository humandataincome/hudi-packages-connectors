import {ValidatorDatasource} from "../../utils/validator/validator.datasource";
import LoggerUtils from "../../utils/logger.utils";
import {FileCodeFacebook} from "./enum.facebook";

export class ValidatorFacebook extends ValidatorDatasource {
    protected readonly logger = new LoggerUtils("Facebook Validator");

    protected DEFAULT_FILE_CODES: FileCodeFacebook[] = [
        FileCodeFacebook.ADS_INTERACTED_WITH,
        FileCodeFacebook.ADS_INTERESTS,
        FileCodeFacebook.ADS_USING_YOUR_ACTIVITY,
        FileCodeFacebook.COMMENTS,
        FileCodeFacebook.INFO_SUBMITTED_ADS,
        FileCodeFacebook.FRIENDS,
        FileCodeFacebook.FRIENDS_WHO_YOU_FOLLOW,
        FileCodeFacebook.LANGUAGE,
        FileCodeFacebook.PAGES_LIKED,
        FileCodeFacebook.PAGES_FOLLOWED,
        FileCodeFacebook.PAGES_RECOMMENDED,
        FileCodeFacebook.PAGES_UNFOLLOWED,
        FileCodeFacebook.PROFILE_INFO,
        FileCodeFacebook.REACTIONS,
        FileCodeFacebook.RECENTLY_VIEWED,
        FileCodeFacebook.RECENTLY_VISITED,
        FileCodeFacebook.SEARCH_HISTORY,
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
