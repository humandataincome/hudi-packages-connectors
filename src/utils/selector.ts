import {DataAggregator, DataSourceCode, LanguageCode} from "../descriptor";
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
    FileCodeTwitter,
    ProcessorAmazon,
    ProcessorFacebook,
    ProcessorGoogle,
    ProcessorInstagram,
    ProcessorLinkedin,
    ProcessorNetflix,
    ProcessorReddit,
    ProcessorTiktok,
    ServiceAmazon,
    ServiceFacebook,
    ServiceGoogle,
    ServiceInstagram,
    ServiceLinkedin,
    ServiceNetflix,
    ServiceReddit,
    ServiceShopify,
    ServiceTiktok,
    ServiceTwitter,
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
import {ValidatorDatasource} from "./validator";
import {Unzipped} from "fflate";
import {ProcessorDatasource, ProcessorOptions} from "./processor";

export class Selector {

    static getFileCodeEnum(code: DataSourceCode) {
        switch (code) {
            case DataSourceCode.AMAZON:
                return FileCodeAmazon;
            case DataSourceCode.FACEBOOK:
                return FileCodeFacebook;
            case DataSourceCode.GOOGLE:
                return FileCodeGoogle;
            case DataSourceCode.INSTAGRAM:
                return FileCodeInstagram;
            case DataSourceCode.LINKEDIN:
                return FileCodeLinkedIn;
            case DataSourceCode.NETFLIX:
                return FileCodeNetflix;
            case DataSourceCode.REDDIT:
                return FileCodeReddit;
            case DataSourceCode.SHOPIFY:
                return FileCodeShopify;
            case DataSourceCode.TIKTOK:
                return FileCodeTikTok;
            case DataSourceCode.TWITTER:
                return FileCodeTwitter;
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
            case DataSourceCode.AMAZON:
                return ValidatorAmazon.getInstance();
            case DataSourceCode.FACEBOOK:
                return ValidatorFacebook.getInstance();
            case DataSourceCode.GOOGLE:
                return ValidatorGoogle.getInstance();
            case DataSourceCode.INSTAGRAM:
                return ValidatorInstagram.getInstance();
            case DataSourceCode.LINKEDIN:
                return ValidatorLinkedIn.getInstance();
            case DataSourceCode.NETFLIX:
                return ValidatorNetflix.getInstance();
            case DataSourceCode.REDDIT:
                return ValidatorReddit.getInstance();
            case DataSourceCode.SHOPIFY:
                return ValidatorShopify.getInstance();
            case DataSourceCode.TIKTOK:
                return ValidatorTikTok.getInstance();
            case DataSourceCode.TWITTER:
                return ValidatorTwitter.getInstance();
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
            case DataSourceCode.REDDIT:
                return Object.values(FileCodeReddit);
            case DataSourceCode.SHOPIFY:
                return Object.values(FileCodeShopify);
            case DataSourceCode.TIKTOK:
                return Object.values(FileCodeTikTok);
            case DataSourceCode.TWITTER:
                return Object.values(FileCodeTwitter);
            default:
                return undefined;
        }
    }

    static async getParsingResult(code: DataSourceCode, filename: string, fileCode: string, files: Unzipped, languageCode: LanguageCode = LanguageCode.ENGLISH) {
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
                ServiceInstagram.languagePrefix = languageCode;
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
     * Given a DataSourceCode return the corresponding Processor instance if exists, undefined otherwise.
     */
    static getProcessor(code: DataSourceCode): ProcessorDatasource | undefined {
        switch (code) {
            case DataSourceCode.AMAZON:
                return ProcessorAmazon;
            case DataSourceCode.FACEBOOK:
                return ProcessorFacebook;
            case DataSourceCode.GOOGLE:
                return ProcessorGoogle;
            case DataSourceCode.INSTAGRAM:
                return ProcessorInstagram;
            case DataSourceCode.LINKEDIN:
                return ProcessorLinkedin;
            case DataSourceCode.NETFLIX:
                return ProcessorNetflix;
            case DataSourceCode.REDDIT:
                return ProcessorReddit;
            case DataSourceCode.SHOPIFY:
                return undefined;
            case DataSourceCode.TWITTER:
                return undefined;
            case DataSourceCode.TIKTOK:
                return ProcessorTiktok;
            default:
                return undefined;
        }
    }

    static getInitAggregator(code: DataSourceCode): DataAggregator | undefined {
        const Processor = this.getProcessor(code);
        if (Processor) {
            return Processor.initAggregator();
        }
        return undefined;
    }

    static async getZipAggregatorBuilder(code: DataSourceCode, data: Uint8Array, options?: ProcessorOptions): Promise<DataAggregator | undefined> {
        const Processor = this.getProcessor(code);
        if (Processor) {
            return await Processor.zipAggregatorBuilder(data, options);
        }
        return undefined;
    }

    static async getAggregatorBuilder(code: DataSourceCode, data: Buffer, pathName: string, model: DataAggregator, options?: ProcessorOptions) {
        const Processor = this.getProcessor(code);
        if (Processor) {
            await Processor.aggregatorBuilder(data, pathName, model, options);
        }
    }

    /**
     * Given a DataSourceCode return True if that datasource needs a language code for the parsing through its Service
     */
    static serviceNeedsLanguageCode(code: DataSourceCode): boolean {
        switch (code) {
            case DataSourceCode.INSTAGRAM:
                return true;
            default:
                return false;
        }
    }
}
