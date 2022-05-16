import {FileCode, FileCodeNetflix} from "../descriptor";
import {ValidatorDatasource} from "./validator.datasource";
import Logger from "../utils/logger";

export type ValidatorNetflixOption = {
    fileCodes?: FileCode[];
    throwExceptions?: boolean;
}

export class ValidatorNetflix extends ValidatorDatasource  {
    protected readonly logger = new Logger("Netflix Validator");

    protected DEFAULT_FILE_CODES: FileCodeNetflix[] = [
        FileCodeNetflix.ACCOUNT_DETAILS,
        FileCodeNetflix.ACCOUNT_SUB_HISTORY,
        FileCodeNetflix.CONTENT_INTERACTION_PREFERENCES,
        FileCodeNetflix.CONTENT_INTERACTION_TITLES,
        FileCodeNetflix.CONTENT_INTERACTION_MY_LIST,
        FileCodeNetflix.CONTENT_INTERACTION_PLAYBACK_EVENTS,
        FileCodeNetflix.CONTENT_INTERACTION_RATINGS,
        FileCodeNetflix.CONTENT_INTERACTION_SEARCH_HISTORY,
        FileCodeNetflix.CONTENT_INTERACTION_VIEWING_ACTIVITY,
        FileCodeNetflix.DEVICES,
        FileCodeNetflix.PAYMENT_AND_BILLING_BILLING_HISTORY,
        FileCodeNetflix.PROFILES,
        FileCodeNetflix.PROFILES_AVATAR_PARENTAL_CONTROL,
        FileCodeNetflix.SOCIAL_MEDIA_CONNECTIONS,
        FileCodeNetflix.SURVEYS_PRODUCT_CANCELLATION,
        /*
        FileCodeNetflix.ACCOUNT_TERMS_OF_USE,
        FileCodeNetflix.CLICKSTREAM,
        FileCodeNetflix.CUSTOMER_SERVICE_CHAT_TRANSCRIPT,
        FileCodeNetflix.CUSTOMER_SERVICE_CSCONTACT,
        FileCodeNetflix.IP_ADDRESSES_ACCOUNT,
        FileCodeNetflix.IP_ADDRESSES_LOGIN,
        FileCodeNetflix.IP_ADDRESSES_STREAMING,
        FileCodeNetflix.MESSAGES_SENT_BY_NETFLIX,
        FileCodeNetflix.PROFILES_AVATAR_HISTORY,
         */
    ];
}
