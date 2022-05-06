import {FileCode, FileCodeInstagram, LanguageCode} from "../descriptor";
import {ValidatorDatasource} from "./validator.datasource";
import {InputFileFormat, ValidationErrorEnums} from "./index";
import Logger from "../utils/logger";

export type ValidatorInstagramOption = {
    fileCodes?: FileCode[];
    throwExceptions?: boolean;
    externalZip?: any;
}

export class ValidatorInstagram extends ValidatorDatasource {
    protected readonly logger = new Logger("Instagram Validator");

    protected DEFAULT_FILE_CODES: FileCodeInstagram[] = [
        FileCodeInstagram.ADS_CLICKED,
        FileCodeInstagram.ADS_VIEWED,
        FileCodeInstagram.POSTS_VIEWED,
        FileCodeInstagram.VIDEO_VIEWED,
        FileCodeInstagram.POST_COMMENT,
        FileCodeInstagram.POSTS_CREATED,
        FileCodeInstagram.STORIES_CREATED,
        FileCodeInstagram.FOLLOWERS,
        FileCodeInstagram.FOLLOWING_ACCOUNTS,
        FileCodeInstagram.LIKE_COMMENTS,
        FileCodeInstagram.LIKE_POSTS,
        FileCodeInstagram.ELIGIBILITY,
        FileCodeInstagram.EMOJI_SLIDERS,
        FileCodeInstagram.POLLS,
        FileCodeInstagram.QUIZZES,
    ];

    public async filterFilesIntoZip(zipFile: InputFileFormat,  options: ValidatorInstagramOption = {}): Promise<Buffer | undefined> {
        this.LANGUAGE_CODE = undefined;
        const JSZip = require("jszip");
        let hasAnyFile = false;
        let filteredFiles = new JSZip();
        const zip = await JSZip.loadAsync(zipFile);
        for (let pathName of Object.keys(zip.files)) {
            const file = zip.files[pathName];
            if (!file.dir) {
                let data = await file.async('nodebuffer');
                let compatiblePath;
                if (options) {
                    options.externalZip = zip;
                    compatiblePath = await this.getValidPath(pathName, options);
                } else {
                    compatiblePath = await this.getValidPath(pathName, {externalZip: zip});
                }
                if (compatiblePath) {
                    this.addFileToZip(filteredFiles, compatiblePath, data, file);
                    (!hasAnyFile) && (hasAnyFile = true);
                }
            }
        }
        if(hasAnyFile) {
            return await filteredFiles.generateAsync({type: "nodebuffer"});
        } else {
            this.logger.log('error', `${ValidationErrorEnums.NO_USEFUL_FILES_ERROR}: The filtered ZIP has not any file`,'filterFilesIntoZip');
            if (options && options.throwExceptions !== undefined && !options.throwExceptions) {
                throw new Error(`${ValidationErrorEnums.NO_USEFUL_FILES_ERROR}: The filtered ZIP has not any file`);
            }
        }
    }

    public async getValidPath(pathName: string, options: ValidatorInstagramOption): Promise<string | undefined> {
        if (options && options.externalZip) {
            if (this.LANGUAGE_CODE === undefined) {
                await this.getLanguage(options);
            }
            if (this.LANGUAGE_CODE !== null) {
                const compatiblePath = this.extractCompatiblePath(pathName);
                if (this.isPathMatching(compatiblePath, options)) {
                    return compatiblePath;
                }
            }
        }
        return undefined;
    }

     public async getLanguage(options: any): Promise<void> {
        if(options.externalZip) {
            for (let pathName of Object.keys(options.externalZip.files)) {
                const file = options.externalZip.files[pathName];
                const compatiblePath = this.extractCompatiblePath(pathName);
                if (compatiblePath === FileCodeInstagram.PERSONAL_INFO) {
                    let data = await file.async('nodebuffer');

                    const document = data.toString();
                    if (document.match(/(Nome utente)|(Indirizzo e-mail)|(Data di nascita)/)) {
                        this.LANGUAGE_CODE = LanguageCode.ITALIAN;
                    } else if (document.match(/(Email address)|(Phone number confirmed)|(Username)/)) {
                        this.LANGUAGE_CODE = LanguageCode.ENGLISH;
                    } else if (document.match(/(Nombre de usuario)|(Cuenta privada)|(Correo electr\u00c3\u00b3nico)/)) {
                        this.LANGUAGE_CODE = LanguageCode.SPANISH;
                    } else if (document.match(/(\u00e0\u00a4\u0088\u00e0\u00a4\u00ae\u00e0\u00a5\u0087\u00e0\u00a4\u00b2)|(\u00e0\u00a4\u00aa\u00e0\u00a5\u008d\u00e0\u00a4\u00b0\u00e0\u00a4\u00be\u00e0\u00a4\u0087\u00e0\u00a4\u00b5\u00e0\u00a5\u0087\u00e0\u00a4\u009f \u00e0\u00a4\u0085\u00e0\u00a4\u0095\u00e0\u00a4\u00be\u00e0\u00a4\u0089\u00e0\u00a4\u0082\u00e0\u00a4\u009f)|(\u00e0\u00a4\u00af\u00e0\u00a5\u0082\u00e0\u00a4\u009c\u00e0\u00a4\u00bc\u00e0\u00a4\u00b0\u00e0\u00a4\u00a8\u00e0\u00a5\u0087\u00e0\u00a4\u00ae)/)) {
                        this.LANGUAGE_CODE = LanguageCode.HINDI;
                    } else if (document.match(/(Adresse e-mail)|(Num\u00c3\u00a9ro de t\u00c3\u00a9l\u00c3\u00a9phone)|(Nom d\u00e2\u0080\u0099utilisateur)/)) {
                        this.LANGUAGE_CODE = LanguageCode.FRENCH;
                    } else if (document.match(/(Benutzername)|(E-Mail-Adresse)|(Telefonnummer)/)) {
                        this.LANGUAGE_CODE = LanguageCode.GERMAN;
                    } else if (document.match(/(\u00e5\u00b8\u0090\u00e5\u008f\u00b7)|(\u00e9\u0082\u00ae\u00e7\u00ae\u00b1)|(\u00e7\u00a7\u0081\u00e5\u00af\u0086\u00e5\u00b8\u0090\u00e6\u0088\u00b7)/)) {
                        this.LANGUAGE_CODE = LanguageCode.CHINESE_SIMPLIFIED;
                    } else {
                        this.LANGUAGE_CODE = null;
                        this.logger.log('error', `${ValidationErrorEnums.LANGUAGE_ERROR}: The ZIP file has not a recognizable Language to be corrected parsed`, 'getLanguage');
                        if (options && options.throwExceptions !== undefined && !options.throwExceptions) {
                            throw new Error(`${ValidationErrorEnums.LANGUAGE_ERROR}: The ZIP file has not a recognizable Language to be corrected parsed`);
                        }
                    }
                }
            }
            (this.LANGUAGE_CODE === undefined) && (this.LANGUAGE_CODE = null);
        }
    }
}
