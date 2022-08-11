import {ValidatorDatasource} from "../../utils/validator/validator.datasource";
import Logger from "../../utils/logger";
import {FileCodeNetflix} from "./enum.netflix";

export class ValidatorNetflix extends ValidatorDatasource  {
    protected readonly logger = new Logger("Netflix Validator");

    protected DEFAULT_FILE_CODES: FileCodeNetflix[] = [
        FileCodeNetflix.ACCOUNT_DETAILS,
        FileCodeNetflix.ACCOUNT_SUB_HISTORY,
        FileCodeNetflix.CONTENT_INTERACTION_PREFERENCES,
        FileCodeNetflix.CONTENT_INTERACTION_MY_LIST,
        FileCodeNetflix.CONTENT_INTERACTION_SEARCH_HISTORY,
        FileCodeNetflix.CONTENT_INTERACTION_VIEWING_ACTIVITY,
        FileCodeNetflix.PAYMENT_AND_BILLING_BILLING_HISTORY,
        FileCodeNetflix.PROFILES,
    ];
}
