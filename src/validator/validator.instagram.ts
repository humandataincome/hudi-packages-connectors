import {FileCodeInstagram, LanguageCode} from "../descriptor";
import {ValidatorDatasource, ValidatorDatasourceOption} from "./validator.datasource";
import {ValidatorFiles} from "./index";
import Logger from "../utils/logger";
import {Unzipped} from "fflate";
import {ValidationErrorEnum} from "../utils";

export class ValidatorInstagram extends ValidatorDatasource {
    protected readonly logger = new Logger("Instagram Validator");

    protected DEFAULT_FILE_CODES: FileCodeInstagram[] = [
        FileCodeInstagram.ACCOUNT_INFO,
        FileCodeInstagram.ACCOUNT_NOT_INTERESTED,
        FileCodeInstagram.ACCOUNT_SEARCHES,
        FileCodeInstagram.ACCOUNT_VIEWED,
        FileCodeInstagram.ADS_CLICKED,
        FileCodeInstagram.ADS_USING_YOUR_INFO,
        FileCodeInstagram.ADS_VIEWED,
        FileCodeInstagram.AUTOFILL_INFO,
        FileCodeInstagram.ELIGIBILITY,
        FileCodeInstagram.EMOJI_SLIDERS,
        FileCodeInstagram.FOLLOWERS,
        FileCodeInstagram.FOLLOWING_ACCOUNTS,
        FileCodeInstagram.FOLLOWING_HASHTAGS,
        FileCodeInstagram.INFO_ACCOUNT_BASED_IN,
        FileCodeInstagram.INFO_ADS_INTERESTS,
        FileCodeInstagram.LIKE_COMMENTS,
        FileCodeInstagram.LIKE_POSTS,
        FileCodeInstagram.PERSONAL_INFO,
        FileCodeInstagram.PENDING_FOLLOW_REQUESTS,
        FileCodeInstagram.POLLS,
        FileCodeInstagram.POST_COMMENT,
        FileCodeInstagram.POSTS_ARCHIVED,
        FileCodeInstagram.POSTS_CREATED,
        FileCodeInstagram.PROFESSIONAL_INFO,
        FileCodeInstagram.RECENT_FOLLOW_REQUESTS,
        FileCodeInstagram.RECENT_UNFOLLOWED_ACCOUNTS,
        FileCodeInstagram.REMOVED_SUGGESTIONS,
        FileCodeInstagram.STORIES_CREATED,
        FileCodeInstagram.POSTS_VIEWED,
        FileCodeInstagram.VIDEO_VIEWED,
        FileCodeInstagram.QUIZZES,
        FileCodeInstagram.SAVED_POSTS,
        FileCodeInstagram.SHOPPING_VIEWED_ITEMS,
        FileCodeInstagram.YOUR_REEL_SENTIMENTS,
        FileCodeInstagram.YOUR_REEL_TOPICS,
        FileCodeInstagram.YOUR_TOPICS,
    ];

    protected extractCompatiblePath(path: string): string {
        const x: string[] = path.split('/');
        //messages/message_requests OR message/inbox cases
        if (x.length > 3) {
            if (x[x.length - 4] === 'messages') {
                return x[x.length - 4] + '/' + x[x.length - 3] + '/' + x[x.length - 2] + '/' + x[x.length - 1];
            }
        }
        //media case
        if (x.length > 2) {
            if (x[x.length - 3] === 'media') {
                return x[x.length - 3] + '/' + x[x.length - 2] + '/' + x[x.length - 1];
            }
        }
        if(x.length > 1) {
            return x[x.length - 2] + '/' + x[x.length - 1];
        }
        return path;
    }

     public async getLanguage(files: Unzipped, options: ValidatorDatasourceOption = {}): Promise<LanguageCode | undefined> {
         for (let pathName in files) {
             const file = files[pathName];
             if (!ValidatorFiles.isDirectory(pathName)) {
                 const compatiblePath = this.extractCompatiblePath(pathName);
                 if (compatiblePath === FileCodeInstagram.PERSONAL_INFO) {
                     let data = Buffer.from(file, file.byteOffset, file.length);

                     const document = data.toString();
                     if (document.match(/(Nome utente)|(Indirizzo e-mail)|(Data di nascita)/)) {
                         return LanguageCode.ITALIAN;
                     } else if (document.match(/(Email address)|(Phone number confirmed)|(Username)/)) {
                         return LanguageCode.ENGLISH;
                     } else if (document.match(/(Nombre de usuario)|(Cuenta privada)|(Correo electr\\u00c3\\u00b3nico)/)) {
                         return LanguageCode.SPANISH;
                     } else if (document.match(/(\\u00e0\\u00a4\\u0088\\u00e0\\u00a4\\u00ae\\u00e0\\u00a5\\u0087\\u00e0\\u00a4\\u00b2)|(\\u00e0\\u00a4\\u00aa\\u00e0\\u00a5\\u008d\\u00e0\\u00a4\\u00b0\\u00e0\\u00a4\\u00be\\u00e0\\u00a4\\u0087\\u00e0\\u00a4\\u00b5\\u00e0\\u00a5\\u0087\\u00e0\\u00a4\\u009f \\u00e0\\u00a4\\u0085\\u00e0\\u00a4\\u0095\\u00e0\\u00a4\\u00be\\u00e0\\u00a4\\u0089\\u00e0\\u00a4\\u0082\\u00e0\\u00a4\\u009f)|(\\u00e0\\u00a4\\u00af\\u00e0\\u00a5\\u0082\\u00e0\\u00a4\\u009c\\u00e0\\u00a4\\u00bc\\u00e0\\u00a4\\u00b0\\u00e0\\u00a4\\u00a8\\u00e0\\u00a5\\u0087\\u00e0\\u00a4\\u00ae)/)) {
                         return LanguageCode.HINDI;
                     } else if (document.match(/(Adresse e-mail)|(Num\\u00c3\\u00a9ro de t\\u00c3\\u00a9l\\u00c3\\u00a9phone)|(Nom d\\u00e2\\u0080\\u0099utilisateur)/)) {
                         return LanguageCode.FRENCH;
                     } else if (document.match(/(Benutzername)|(E-Mail-Adresse)|(Telefonnummer)/)) {
                         return LanguageCode.GERMAN;
                     } else if (document.match(/(\\u00e5\\u00b8\\u0090\\u00e5\\u008f\\u00b7)|(\\u00e9\\u0082\\u00ae\\u00e7\\u00ae\\u00b1)|(\\u00e7\\u00a7\\u0081\\u00e5\\u00af\\u0086\\u00e5\\u00b8\\u0090\\u00e6\\u0088\\u00b7)/)) {
                         return LanguageCode.CHINESE_SIMPLIFIED;
                     } else {
                         this.logger.log('error', `${ValidationErrorEnum.LANGUAGE_ERROR}: the zip file has not a recognizable language to be corrected parsed`, 'getLanguage');
                         if (options && options.throwExceptions !== undefined && options.throwExceptions) {
                             throw new Error(`${ValidationErrorEnum.LANGUAGE_ERROR}: the zip file has not a recognizable language to be corrected parsed`);
                         }
                     }
                 }
             }
         }
         return undefined;
     }
}
