import {ValidatorDatasource} from "../../utils/validator/validator.datasource";
import Logger from "../../utils/logger";
import {FileCodeReddit} from "./enum.reddit";

export class ValidatorReddit extends ValidatorDatasource {
    protected readonly logger = new Logger("Reddit Validator");

    protected DEFAULT_FILE_CODES: FileCodeReddit[] = [
        FileCodeReddit.FRIENDS,
        FileCodeReddit.COMMENTS,
        FileCodeReddit.MESSAGES,
        FileCodeReddit.POSTS,
        FileCodeReddit.STATISTICS,
        FileCodeReddit.REDDIT_GOLD_INFO,
        FileCodeReddit.SUBSCRIBED_SUBREDDITS,
    ];

    protected extractCompatiblePath(path: string): string {
        const x: string[] = path.split('/');
        if (x.length > 1) {
            return x[x.length - 1];
        }
        return path;
    }
}
