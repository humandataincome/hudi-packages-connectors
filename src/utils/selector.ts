import {APIDataSourceCode, DataAggregator, GDPRDataSourceCode, LanguageCode} from "../descriptor";
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
    ProcessorAmazon, ProcessorBinance,
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
import {ProcessorAPIDatasource, ProcessorGDPRDatasource, ProcessorOptions} from "./processor";

export class Selector {

    static getFileCodeEnum(code: GDPRDataSourceCode) {
        switch (code) {
            case GDPRDataSourceCode.AMAZON:
                return FileCodeAmazon;
            case GDPRDataSourceCode.FACEBOOK:
                return FileCodeFacebook;
            case GDPRDataSourceCode.GOOGLE:
                return FileCodeGoogle;
            case GDPRDataSourceCode.INSTAGRAM:
                return FileCodeInstagram;
            case GDPRDataSourceCode.LINKEDIN:
                return FileCodeLinkedIn;
            case GDPRDataSourceCode.NETFLIX:
                return FileCodeNetflix;
            case GDPRDataSourceCode.REDDIT:
                return FileCodeReddit;
            case GDPRDataSourceCode.SHOPIFY:
                return FileCodeShopify;
            case GDPRDataSourceCode.TIKTOK:
                return FileCodeTikTok;
            case GDPRDataSourceCode.TWITTER:
                return FileCodeTwitter;
            default:
                return undefined;
        }
    }

    /**
     * @param code - a GDPRDataSourceCode
     * @return the corresponded instance of the GDPRDataSourceCode's Validation Class. E.g. GDPRDataSourceCode.INSTAGRAM -> ValidatorInstagram.getInstance(). Return undefined if none Validation class matches.
     */
    static getValidator(code: GDPRDataSourceCode): ValidatorDatasource | undefined {
        switch (code) {
            case GDPRDataSourceCode.AMAZON:
                return ValidatorAmazon.getInstance();
            case GDPRDataSourceCode.FACEBOOK:
                return ValidatorFacebook.getInstance();
            case GDPRDataSourceCode.GOOGLE:
                return ValidatorGoogle.getInstance();
            case GDPRDataSourceCode.INSTAGRAM:
                return ValidatorInstagram.getInstance();
            case GDPRDataSourceCode.LINKEDIN:
                return ValidatorLinkedIn.getInstance();
            case GDPRDataSourceCode.NETFLIX:
                return ValidatorNetflix.getInstance();
            case GDPRDataSourceCode.REDDIT:
                return ValidatorReddit.getInstance();
            case GDPRDataSourceCode.SHOPIFY:
                return ValidatorShopify.getInstance();
            case GDPRDataSourceCode.TIKTOK:
                return ValidatorTikTok.getInstance();
            case GDPRDataSourceCode.TWITTER:
                return ValidatorTwitter.getInstance();
            default:
                return undefined;
        }
    }


    static getAllEnumKeys(code: GDPRDataSourceCode): string[] | undefined {
        switch (code) {
            case GDPRDataSourceCode.AMAZON:
                return Object.values(FileCodeAmazon);
            case GDPRDataSourceCode.FACEBOOK:
                return Object.values(FileCodeFacebook);
            case GDPRDataSourceCode.GOOGLE:
                return Object.values(FileCodeGoogle);
            case GDPRDataSourceCode.INSTAGRAM:
                return Object.values(FileCodeInstagram);
            case GDPRDataSourceCode.LINKEDIN:
                return Object.values(FileCodeLinkedIn);
            case GDPRDataSourceCode.NETFLIX:
                return Object.values(FileCodeNetflix);
            case GDPRDataSourceCode.REDDIT:
                return Object.values(FileCodeReddit);
            case GDPRDataSourceCode.SHOPIFY:
                return Object.values(FileCodeShopify);
            case GDPRDataSourceCode.TIKTOK:
                return Object.values(FileCodeTikTok);
            case GDPRDataSourceCode.TWITTER:
                return Object.values(FileCodeTwitter);
            default:
                return undefined;
        }
    }

    static async getParsingResult(code: GDPRDataSourceCode, filename: string, fileCode: string, files: Unzipped, languageCode: LanguageCode = LanguageCode.ENGLISH) {
        const file = files[filename];
        const data = Buffer.from(file, file.byteOffset, file.length);
        switch (code) {
            case GDPRDataSourceCode.AMAZON:
                return await ServiceAmazon.parseFile(<FileCodeAmazon>fileCode, data);
            case GDPRDataSourceCode.FACEBOOK:
                return await ServiceFacebook.parseFile(<FileCodeFacebook>fileCode, data);
            case GDPRDataSourceCode.GOOGLE:
                return await ServiceGoogle.parseFile(<FileCodeGoogle>fileCode, data);
            case GDPRDataSourceCode.INSTAGRAM:
                ServiceInstagram.languagePrefix = languageCode;
                return await ServiceInstagram.parseFile(<FileCodeInstagram>fileCode, data);
            case GDPRDataSourceCode.LINKEDIN:
                return await ServiceLinkedin.parseFile(<FileCodeLinkedIn>fileCode, data);
            case GDPRDataSourceCode.NETFLIX:
                return await ServiceNetflix.parseFile(<FileCodeNetflix>fileCode, data);
            case GDPRDataSourceCode.REDDIT:
                return await ServiceReddit.parseFile(<FileCodeReddit>fileCode, data);
            case GDPRDataSourceCode.SHOPIFY:
                return await ServiceShopify.parseFile(<FileCodeShopify>fileCode, data);
            case GDPRDataSourceCode.TIKTOK:
                return await ServiceTiktok.parseFile(<FileCodeTikTok>fileCode, data);
            case GDPRDataSourceCode.TWITTER:
                return await ServiceTwitter.parseFile(<FileCodeTwitter>fileCode, data);
            default:
                return undefined;
        }
    }

    /**
     * Given a GDPRDataSourceCode return the corresponding Processor instance if exists, undefined otherwise.
     */
    static getGDPRProcessor(code: GDPRDataSourceCode): ProcessorGDPRDatasource | undefined {
        switch (code) {
            case GDPRDataSourceCode.AMAZON:
                return ProcessorAmazon;
            case GDPRDataSourceCode.FACEBOOK:
                return ProcessorFacebook;
            case GDPRDataSourceCode.GOOGLE:
                return ProcessorGoogle;
            case GDPRDataSourceCode.INSTAGRAM:
                return ProcessorInstagram;
            case GDPRDataSourceCode.LINKEDIN:
                return ProcessorLinkedin;
            case GDPRDataSourceCode.NETFLIX:
                return ProcessorNetflix;
            case GDPRDataSourceCode.REDDIT:
                return ProcessorReddit;
            case GDPRDataSourceCode.SHOPIFY:
                return undefined;
            case GDPRDataSourceCode.TWITTER:
                return undefined;
            case GDPRDataSourceCode.TIKTOK:
                return ProcessorTiktok;
            default:
                return undefined;
        }
    }

    /**
     * Given a getAPIProcessor return the corresponding Processor instance if exists, undefined otherwise.
     */
    static getAPIProcessor(code: APIDataSourceCode): ProcessorAPIDatasource | undefined {
        switch (code) {
            case APIDataSourceCode.BINANCE:
                return ProcessorBinance;
            default:
                return undefined;
        }
    }

    static getInitAggregator(code: GDPRDataSourceCode): DataAggregator | undefined {
        const Processor = this.getGDPRProcessor(code);
        if (Processor) {
            return Processor.initAggregator();
        }
        return undefined;
    }

    static async getZipAggregatorBuilder(code: GDPRDataSourceCode, data: Uint8Array, options?: ProcessorOptions): Promise<DataAggregator | undefined> {
        const Processor = this.getGDPRProcessor(code);
        if (Processor) {
            return await Processor.zipAggregatorBuilder(data, options);
        }
        return undefined;
    }

    static async getAggregatorBuilder(code: GDPRDataSourceCode, data: Buffer, pathName: string, model: DataAggregator, options?: ProcessorOptions) {
        const Processor = this.getGDPRProcessor(code);
        if (Processor) {
            await Processor.aggregatorBuilder(data, pathName, model, options);
        }
    }

    /**
     * Given a GDPRDataSourceCode return True if that datasource needs a language code for the parsing through its Service
     */
    static serviceNeedsLanguageCode(code: GDPRDataSourceCode): boolean {
        switch (code) {
            case GDPRDataSourceCode.INSTAGRAM:
                return true;
            default:
                return false;
        }
    }
}
