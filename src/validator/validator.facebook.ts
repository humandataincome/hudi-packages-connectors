import {FileCode, FileCodeFacebook} from "../descriptor";
import {ValidatorDatasource} from "./validator.datasource";

export class ValidatorFacebook extends ValidatorDatasource {

    protected DEFAULT_FILE_CODES: FileCode[] = [
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
