import {
    DataSourceCode,
    FileExtension
} from "../../descriptor";
import {ValidatorFiles} from "../validator/validator.files";
import Logger from "../logger";
import {Unzipped, unzipSync} from "fflate";
import {
    FileCodeAmazon,
    FileCodeFacebook,
    FileCodeGoogle,
    FileCodeInstagram,
    FileCodeLinkedIn,
    FileCodeNetflix,
    FileCodeReddit, FileCodeShopify, FileCodeTikTok, FileCodeTwitter,
    ServiceAmazon,
    ServiceFacebook,
    ServiceGoogle,
    ServiceInstagram,
    ServiceLinkedin,
    ServiceNetflix,
    ServiceReddit,
    ServiceShopify,
    ServiceTiktok,
    ServiceTwitter
} from "../../source";
import {ValidatorObject} from "../validator/validator.object";

export interface MonitoringFilesOptions {
    permittedFilesExtensions?: FileExtension[];
    throwExceptions?: boolean;
}

export class MonitoringService {
    private static readonly logger = new Logger("Monitoring Service");

    /**
     * The function return those files that don't have the expected structure
     * @param zipFile - file zip containing a datasource
     * @param code - code of the datasource
     */
    public static async findChangesIntoFiles(zipFile: Uint8Array, code: DataSourceCode): Promise<string[] | undefined> {
        try {
            if (zipFile) {
                const files: Unzipped = unzipSync(zipFile);
                const validation = ValidatorFiles.validatorSelector(code);
                const filesNotParsed: string[] = [];
                for (let filename in files) {
                    if (!ValidatorObject.isDirectory(filename) && validation) {
                        const fileCode = validation.getFileCode(filename);
                        if (fileCode) {
                            const file = files[filename];
                            const data = Buffer.from(file, file.byteOffset, file.length);
                            let parsingResult;
                            switch (code) {
                                case DataSourceCode.AMAZON:
                                    parsingResult = await ServiceAmazon.parseFile(<FileCodeAmazon>fileCode, data);
                                    break;
                                case DataSourceCode.FACEBOOK:
                                    parsingResult = await ServiceFacebook.parseFile(<FileCodeFacebook>fileCode, data);
                                    break;
                                case DataSourceCode.GOOGLE:
                                    parsingResult = await ServiceGoogle.parseFile(<FileCodeGoogle>fileCode, data);
                                    break;
                                case DataSourceCode.INSTAGRAM:
                                    const language = await validation.getLanguage(files);
                                    (language) && (ServiceInstagram.languagePrefix = language);
                                    parsingResult = await ServiceInstagram.parseFile(<FileCodeInstagram>fileCode, data);
                                    break;
                                case DataSourceCode.LINKEDIN:
                                    parsingResult = await ServiceLinkedin.parseFile(<FileCodeLinkedIn>fileCode, data);
                                    break;
                                case DataSourceCode.NETFLIX:
                                    parsingResult = await ServiceNetflix.parseFile(<FileCodeNetflix>fileCode, data);
                                    break;
                                case DataSourceCode.REDDIT:
                                    parsingResult = await ServiceReddit.parseFile(<FileCodeReddit>fileCode, data);
                                    break;
                                case DataSourceCode.SHOPIFY_CUSTOMERS:
                                case DataSourceCode.SHOPIFY_ORDERS:
                                case DataSourceCode.SHOPIFY_PRODUCTS:
                                case DataSourceCode.SHOPIFY_DISCOUNTS:
                                    parsingResult = await ServiceShopify.parseFile(<FileCodeShopify>fileCode, data);
                                    break;
                                case DataSourceCode.TIKTOK:
                                    parsingResult = await ServiceTiktok.parseFile(<FileCodeTikTok>fileCode, data);
                                    break;
                                case DataSourceCode.TWITTER:
                                    parsingResult = await ServiceTwitter.parseFile(<FileCodeTwitter>fileCode, data);
                                    break;
                                default:
                                    break;
                            }
                            if (!parsingResult) {
                                this.logger.log('info', `File \'${filename}\' can't be parsed`, 'findChangesIntoFiles');
                                filesNotParsed.push(filename);
                            } else {
                                //TODO: must detect little changes into the file structure
                            }
                        }
                    }
                }
                return filesNotParsed;
            }
        } catch (error: any) {
            (error && error.message) && (this.logger.log('error', error.message, 'findChangesIntoFiles'));
            throw error;
        }
        return undefined;
    }


    /**
     * The function return those files that don't have a corresponding enumeration code
     * @param zipFile - file zip containing a datasource
     * @param code - code of the datasource
     * @param options
     */
    public static async findNotMappedFiles(zipFile: Uint8Array, code: DataSourceCode, options: MonitoringFilesOptions = {}): Promise<string[] | undefined> {
        try {
            if (zipFile) {
                const fileList = await ValidatorFiles.getPathsIntoZip(zipFile);
                if (fileList) {
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
                }
            }
        } catch (error: any) {
            (error && error.message) && (this.logger.log('error', error.message, 'findNotMappedFiles'));
            if (options.throwExceptions !== undefined && options.throwExceptions) {
                throw error;
            }
        }
        return undefined;
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
            case DataSourceCode.SHOPIFY_CUSTOMERS:
            case DataSourceCode.SHOPIFY_ORDERS:
            case DataSourceCode.SHOPIFY_PRODUCTS:
            case DataSourceCode.SHOPIFY_DISCOUNTS:
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

