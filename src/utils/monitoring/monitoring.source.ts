import {
    DataSourceCode,
    FileCodeAmazon,
    FileCodeFacebook,
    FileCodeGoogle,
    FileCodeInstagram,
    FileCodeLinkedIn,
    FileCodeNetflix, FileCodeReddit,
    FileCodeShopify,
    FileCodeTikTok,
    FileCodeTwitter,
    FileExtension
} from "../../descriptor";
import {ValidatorFiles} from "../validator/validator.files";
import Logger from "../logger";

export interface MonitoringFilesOptions {
    permittedFilesExtensions?: FileExtension[];
    throwExceptions?: boolean;
}

export class MonitorSource {
    private static readonly logger = new Logger("Monitor Source");

    /**
     * The function return files that don't have a corresponding enumeration code
     * @param fileList - list of file' names into datasource zip
     * @param code - code of the datasource
     * @param options
     */
    public static findNotMappedFiles(fileList: string[], code: DataSourceCode, options: MonitoringFilesOptions = {}): string[] | undefined {
        try {
            return fileList.filter((fileName: string) => {
                if (options.permittedFilesExtensions) {
                    const fileExtension = ValidatorFiles.getFileExtension(fileName);
                    if (fileExtension) {
                        if (options.permittedFilesExtensions && !options.permittedFilesExtensions.includes(fileExtension)) {
                            return false;
                        }
                    } else {
                        this.logger.log('info', `File extension not recognized for: \'${fileName}\'`, 'findNotMappedFiles');
                        return false;
                    }
                }
                return !this.isFilenameIntoEnum(fileName, code);
            });
        } catch (error: any) {
            (error && error.message) && (this.logger.log('error', error.message, 'findNotMappedFiles'));
            if (options.throwExceptions !== undefined && options.throwExceptions) {
                throw error;
            }
        }
    }

    private static isFilenameIntoEnum(fileName: string, code: DataSourceCode): boolean {
        const datasource = ValidatorFiles.validatorSelector(code);
        if (datasource) {
            return !!datasource.getValidPath(fileName, {fileCodes: this.getAllKeysFromEnum(code)});
        }
        return false;
    }

    private static getAllKeysFromEnum(code: DataSourceCode): string[] {
        switch (code) {
            case DataSourceCode.AMAZON:
                return Object.values(FileCodeAmazon);
            case DataSourceCode.FACEBOOK:
                return Object.values(FileCodeFacebook);
            case DataSourceCode.GOOGLE:
                return Object.values(FileCodeGoogle);
            case DataSourceCode.INSTAGRAM:
                return Object.values(FileCodeInstagram);
            case DataSourceCode.LINKEDIN:
                return Object.values(FileCodeLinkedIn);
            case DataSourceCode.NETFLIX:
                return Object.values(FileCodeNetflix);
            case DataSourceCode.SHOPIFY_ORDERS || DataSourceCode.SHOPIFY_DISCOUNTS || DataSourceCode.SHOPIFY_PRODUCTS || DataSourceCode.SHOPIFY_CUSTOMERS:
                return Object.values(FileCodeShopify);
            case DataSourceCode.TIKTOK:
                return Object.values(FileCodeTikTok);
            case DataSourceCode.TWITTER:
                return Object.values(FileCodeTwitter);
            case DataSourceCode.REDDIT:
                return Object.values(FileCodeReddit);
            default:
                return [];
        }
    }
}
