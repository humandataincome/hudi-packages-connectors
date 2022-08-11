import {
    FileCodeAmazon,
    FileCodeFacebook,
    FileCodeGoogle,
    FileCodeInstagram,
    FileCodeLinkedIn,
    FileCodeNetflix, FileCodeReddit, FileCodeShopify, FileCodeTikTok, FileCodeTwitter
} from "../source";

export enum DataSourceCode {
    INSTAGRAM = 'INSTAGRAM',
    FACEBOOK = 'FACEBOOK',
    GOOGLE = 'GOOGLE',
    NETFLIX = 'NETFLIX',
    AMAZON = 'AMAZON',
    LINKEDIN = 'LINKEDIN',
    SHOPIFY_CUSTOMERS = 'SHOPIFY_CUSTOMERS',
    SHOPIFY_ORDERS = 'SHOPIFY_ORDERS',
    SHOPIFY_PRODUCTS = 'SHOPIFY_PRODUCTS',
    SHOPIFY_DISCOUNTS = 'SHOPIFY_DISCOUNTS',
    TWITTER = 'TWITTER',
    TIKTOK = 'TIKTOK',
    REDDIT = 'REDDIT',
}

export enum RetrievingProcedureType {
    DEFAULT = 'DEFAULT',
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
    ARABIC = 'AR',
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













