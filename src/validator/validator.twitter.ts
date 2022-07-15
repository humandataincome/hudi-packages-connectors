import {ValidatorDatasource} from "./validator.datasource";
import Logger from "../utils/logger";
import {FileCodeTwitter} from "../descriptor";

export class ValidatorFTwitter extends ValidatorDatasource {
    protected readonly logger = new Logger("Twitter Validator");

    protected DEFAULT_FILE_CODES: FileCodeTwitter[] = [
        FileCodeTwitter.PROFILE,
        FileCodeTwitter.ACCOUNT,
        FileCodeTwitter.ACCOUNT_CREATION,
        FileCodeTwitter.AD_ENGAGEMENTS,
        FileCodeTwitter.AD_IMPRESSIONS,
        FileCodeTwitter.AD_MOBILE_CONVERSIONS_ATTRIBUTED,
        FileCodeTwitter.AD_MOBILE_CONVERSIONS_UNATTRIBUTED,
        FileCodeTwitter.AD_ONLINE_CONVERSIONS_ATTRIBUTED,
        FileCodeTwitter.AD_ONLINE_CONVERSIONS_UNATTRIBUTED,
        FileCodeTwitter.AGE_INFO,
        FileCodeTwitter.FOLLOWER,
        FileCodeTwitter.FOLLOWING,
        FileCodeTwitter.LIKE,
        FileCodeTwitter.LIST_CREATED,
        FileCodeTwitter.LIST_MEMBER,
        FileCodeTwitter.LIST_SUBSCRIBED,
        FileCodeTwitter.PERSONALIZATION,
        FileCodeTwitter.PROFILE,
        FileCodeTwitter.SAVED_SEARCH,
        FileCodeTwitter.TWEET,
        FileCodeTwitter.VERIFIED,
    ];

    protected extractCompatiblePath(path: string): string {
        const x: string[] = path.split('/');
        //messages/message_requests OR message/inbox cases
        if (x[x.length - 2] === 'data') {
            return + x[x.length - 2] + '/' + x[x.length - 1];
        }
        //TODO: media files path validation
        return path;
    }
}
