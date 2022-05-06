import {FileCode, FileCodeFacebook} from "../descriptor";
import {ValidatorDatasource} from "./validator.datasource";
import Logger from "../utils/logger";

export type ValidatorFacebookOption = {
    fileCodes?: FileCode[];
    throwExceptions?: boolean;
}

export class ValidatorFacebook extends ValidatorDatasource {
    protected readonly logger = new Logger("Facebook Validator");

    protected DEFAULT_FILE_CODES: FileCodeFacebook[] = [
        FileCodeFacebook.ADS_INTERACTED_WITH,
        FileCodeFacebook.COMMENTS,
        FileCodeFacebook.REACTIONS,
        FileCodeFacebook.PAGES_FOLLOWED,
        FileCodeFacebook.PAGES_LIKED,
        FileCodeFacebook.PAGES_RECOMMENDED,
        FileCodeFacebook.LANGUAGE,
        FileCodeFacebook.PROFILE_INFO,
        FileCodeFacebook.RECENTLY_VIEWED,
        FileCodeFacebook.YOUR_POSTS,
        FileCodeFacebook.FRIENDS,
    ];
}
