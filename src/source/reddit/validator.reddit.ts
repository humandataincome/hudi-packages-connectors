import {ValidatorDatasource} from "../../utils";
import Logger from "../../utils/logger";
import {FileCodeReddit} from "../../descriptor";

export class ValidatorReddit extends ValidatorDatasource {
    protected readonly logger = new Logger("Reddit Validator");

    protected DEFAULT_FILE_CODES: FileCodeReddit[] = [
        FileCodeReddit.FRIENDS,
        FileCodeReddit.POSTS,
        FileCodeReddit.STATISTICS,
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
