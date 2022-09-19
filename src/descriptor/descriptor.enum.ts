import {
    AmazonDataAggregator,
    FacebookDataAggregator,
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
    GoogleDataAggregator,
    InstagramDataAggregator,
    LinkedInDataAggregator,
    NetflixDataAggregator,
    TiktokDataAggregator,
    RedditDataAggregator, TwitterDataAggregator, BinanceDataAggregator
} from "../source";

export enum DataSourceCode {
    //from GDPR
    AMAZON = 'AMAZON',
    FACEBOOK = 'FACEBOOK',
    GOOGLE = 'GOOGLE',
    INSTAGRAM = 'INSTAGRAM',
    LINKEDIN = 'LINKEDIN',
    NETFLIX = 'NETFLIX',
    SHOPIFY = 'SHOPIFY',
    REDDIT = 'REDDIT',
    TIKTOK = 'TIKTOK',
    TWITTER = 'TWITTER',
    //from API
    BINANCE = 'BINANCE',
}
export enum GDPRCode {

}

export enum RetrievingProcedureType {
    DESKTOP = 'DESKTOP',
    MOBILE = 'MOBILE'
}

export enum FileExtension {
    ZIP = 'zip',
    JSON = 'json',
    CSV = 'csv',
    TXT = 'txt',
    HTML = 'html',
    PDF = 'pdf',
    EML = 'eml',
    ICS = 'ics',
    TCX = 'tcx',
    MBOX = 'mbox',
    XML = 'xml',
    JPG = 'jpg',
    PNG = 'png',
    GIF = 'gif',
    VCF = 'vcf',
    MP4 = 'mp4',
    JS = 'js',
    WEBP = 'webp',
    BIN = 'bin',
}

export enum LanguageCode {
    ENGLISH = 'EN',
    ITALIAN = 'IT',
    SPANISH = 'ES',
    HINDI = 'HI',
    FRENCH = 'FR',
    GERMAN = 'DE',
    CHINESE_SIMPLIFIED = 'ZH-CN',
}

export type FileCode =
    FileCodeAmazon |
    FileCodeFacebook |
    FileCodeGoogle |
    FileCodeInstagram |
    FileCodeLinkedIn |
    FileCodeNetflix |
    FileCodeReddit |
    FileCodeShopify |
    FileCodeTikTok |
    FileCodeTwitter;

export type DataAggregator =
    AmazonDataAggregator |
    FacebookDataAggregator |
    GoogleDataAggregator |
    InstagramDataAggregator |
    LinkedInDataAggregator |
    NetflixDataAggregator |
    RedditDataAggregator |
    TiktokDataAggregator |
    TwitterDataAggregator |
    BinanceDataAggregator;











