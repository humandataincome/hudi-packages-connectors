import {FileCodeNetflix} from "../descriptor";
import {ValidatorDatasource} from "./validator.datasource";
import Logger from "../utils/logger";

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
    ];
}
