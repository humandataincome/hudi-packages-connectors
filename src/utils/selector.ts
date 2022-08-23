import {DataSourceCode} from "../descriptor";
import {
    FileCodeAmazon,
    FileCodeFacebook,
    FileCodeGoogle,
    FileCodeInstagram,
    FileCodeLinkedIn,
    FileCodeNetflix,
    FileCodeReddit,
    FileCodeShopify,
    FileCodeTikTok,
    FileCodeTwitter, ProcessorAmazon, ProcessorFacebook, ProcessorGoogle, ProcessorInstagram,
    ServiceAmazon,
    ServiceFacebook,
    ServiceGoogle,
    ServiceInstagram,
    ServiceLinkedin,
    ServiceNetflix,
    ServiceReddit, ServiceShopify, ServiceTiktok, ServiceTwitter,
    ValidatorAmazon,
    ValidatorFacebook,
    ValidatorGoogle,
    ValidatorInstagram,
    ValidatorLinkedIn,
    ValidatorNetflix,
    ValidatorReddit,
    ValidatorShopify,
    ValidatorTikTok,
    ValidatorTwitter
} from "../source";
import {ValidatorDatasource} from "./validator/validator.datasource";
import {Unzipped} from "fflate";
import {ProcessorOptions} from "./processor/processor.utils";

export class Selector {

    static getFileCodeEnum(code: DataSourceCode) {
        switch (code) {
            case DataSourceCode.INSTAGRAM:
                return FileCodeInstagram;
            case DataSourceCode.FACEBOOK:
                return FileCodeFacebook;
            case DataSourceCode.AMAZON:
                return FileCodeAmazon;
            case DataSourceCode.GOOGLE:
                return FileCodeGoogle;
            case DataSourceCode.LINKEDIN:
                return FileCodeLinkedIn;
            case DataSourceCode.NETFLIX:
                return FileCodeNetflix;
            case DataSourceCode.SHOPIFY:
                return FileCodeShopify;
            case DataSourceCode.TWITTER:
                return FileCodeTwitter;
            case DataSourceCode.REDDIT:
                return FileCodeReddit;
            case DataSourceCode.TIKTOK:
                return FileCodeTikTok;
            default:
                return undefined;
        }
    }

    /**
     * @param code - a DataSourceCode
     * @return the corresponded instance of the DataSourceCode's Validation Class. E.g. DataSourceCode.INSTAGRAM -> ValidatorInstagram.getInstance(). Return undefined if none Validation class matches.
     */
    static getValidator(code: DataSourceCode): ValidatorDatasource | undefined {
        switch (code) {
            case DataSourceCode.INSTAGRAM:
                return ValidatorInstagram.getInstance();
            case DataSourceCode.FACEBOOK:
                return ValidatorFacebook.getInstance();
            case DataSourceCode.AMAZON:
                return ValidatorAmazon.getInstance();
            case DataSourceCode.GOOGLE:
                return ValidatorGoogle.getInstance();
            case DataSourceCode.NETFLIX:
                return ValidatorNetflix.getInstance();
            case DataSourceCode.LINKEDIN:
                return ValidatorLinkedIn.getInstance();
            case DataSourceCode.SHOPIFY:
                return ValidatorShopify.getInstance();
            case DataSourceCode.TWITTER:
                return ValidatorTwitter.getInstance();
            case DataSourceCode.TIKTOK:
                return ValidatorTikTok.getInstance();
            case DataSourceCode.REDDIT:
                return ValidatorReddit.getInstance();
            default:
                return undefined;
        }
    }


    static getAllEnumKeys(code: DataSourceCode): string[] | undefined {
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
            case DataSourceCode.SHOPIFY:
                return Object.values(FileCodeShopify);
            case DataSourceCode.TIKTOK:
                return Object.values(FileCodeTikTok);
            case DataSourceCode.TWITTER:
                return Object.values(FileCodeTwitter);
            case DataSourceCode.REDDIT:
                return Object.values(FileCodeReddit);
            default:
                return undefined;
        }
    }

    static async getParsingResult(code: DataSourceCode, filename: string, fileCode: string, files: Unzipped) {
        const file = files[filename];
        const data = Buffer.from(file, file.byteOffset, file.length);
        switch (code) {
            case DataSourceCode.AMAZON:
                return await ServiceAmazon.parseFile(<FileCodeAmazon>fileCode, data);
            case DataSourceCode.FACEBOOK:
                return await ServiceFacebook.parseFile(<FileCodeFacebook>fileCode, data);
            case DataSourceCode.GOOGLE:
                return await ServiceGoogle.parseFile(<FileCodeGoogle>fileCode, data);
            case DataSourceCode.INSTAGRAM:
                const language = await ValidatorInstagram.getInstance().getLanguage(files);
                (language) && (ServiceInstagram.languagePrefix = language);
                return await ServiceInstagram.parseFile(<FileCodeInstagram>fileCode, data);
            case DataSourceCode.LINKEDIN:
                return await ServiceLinkedin.parseFile(<FileCodeLinkedIn>fileCode, data);
            case DataSourceCode.NETFLIX:
                return await ServiceNetflix.parseFile(<FileCodeNetflix>fileCode, data);
            case DataSourceCode.REDDIT:
                return await ServiceReddit.parseFile(<FileCodeReddit>fileCode, data);
            case DataSourceCode.SHOPIFY:
                return await ServiceShopify.parseFile(<FileCodeShopify>fileCode, data);
            case DataSourceCode.TIKTOK:
                return await ServiceTiktok.parseFile(<FileCodeTikTok>fileCode, data);
            case DataSourceCode.TWITTER:
                return await ServiceTwitter.parseFile(<FileCodeTwitter>fileCode, data);
            default:
                return undefined;
        }
    }

    /**
     * @param code - code of the datasource
     * @param zipFile - zip file of the datasource
     * @param options - options for the processor
     * @return the aggregator model built from the zip file in input
     */
    static async getAggregator(code: DataSourceCode, zipFile: Uint8Array, options?: ProcessorOptions) {
        switch (code) {
            case DataSourceCode.INSTAGRAM:
                return await ProcessorInstagram.aggregatorFactory(zipFile, options);
            case DataSourceCode.FACEBOOK:
                return await ProcessorFacebook.aggregatorFactory(zipFile, options);
            case DataSourceCode.AMAZON:
                return await ProcessorAmazon.aggregatorFactory(zipFile, options);
            case DataSourceCode.GOOGLE:
                return await ProcessorGoogle.aggregatorFactory(zipFile, options);
            case DataSourceCode.NETFLIX:
                return undefined;
            case DataSourceCode.LINKEDIN:
                return undefined;
            case DataSourceCode.SHOPIFY:
                return undefined;
            case DataSourceCode.TWITTER:
                return undefined;
            case DataSourceCode.TIKTOK:
                return undefined;
            case DataSourceCode.REDDIT:
                return undefined;
            default:
                return undefined;
        }
    }
}
