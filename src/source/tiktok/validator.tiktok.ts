import { ValidatorDatasource } from '../../validator/validator.datasource';
import LoggerUtils from '../../utils/logger.utils';
import { FileCodeTikTok } from './enum.tiktok';

export class ValidatorTikTok extends ValidatorDatasource {
    protected readonly logger = new LoggerUtils('TikTok Validator');

    protected DEFAULT_FILE_CODES: FileCodeTikTok[] = [FileCodeTikTok.USER_DATA];

    protected extractCompatiblePath(path: string): string {
        const x: string[] = path.split('/');
        if (x && x[x.length - 1]) {
            return x[x.length - 1];
        }
        return path;
    }
}
