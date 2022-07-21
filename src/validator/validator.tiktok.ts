import {ValidatorDatasource} from "./validator.datasource";
import Logger from "../utils/logger";
import {FileCodeTikTok} from "../descriptor";

export class ValidatorTikTok extends ValidatorDatasource {
    protected readonly logger = new Logger("TikTok Validator");

    protected DEFAULT_FILE_CODES: FileCodeTikTok[] = [
        FileCodeTikTok.USER_DATA
    ];

    protected extractCompatiblePath(path: string): string {
        const x: string[] = path.split('/');
        if (x && x[x.length - 1]) {
            return x[x.length - 1];
        }
        return path;
    }
}
