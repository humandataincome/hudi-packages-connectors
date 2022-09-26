import {ValidatorDatasource} from "../../utils/validator/validator.datasource";
import Logger from "../../utils/logger";
import {FileCodeTwitter} from "./enum.twitter";

export class ValidatorTwitter extends ValidatorDatasource {
    protected readonly logger = new Logger("Twitter Validator");

    protected DEFAULT_FILE_CODES: FileCodeTwitter[] = [
        FileCodeTwitter.ACCOUNT,
        FileCodeTwitter.AD_ENGAGEMENTS,
        FileCodeTwitter.AD_IMPRESSIONS,
    ];

    protected extractCompatiblePath(path: string): string {
        const x: string[] = path.split('/');
        if (x[x.length - 2] === 'data') {
            return x[x.length - 2] + '/' + x[x.length - 1];
        }
        //TODO: media files path validation
        return path;
    }
}
