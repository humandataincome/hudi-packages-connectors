import {FileCode, FileCodeInstagram, LanguageCode} from "../descriptor";
import {ValidatorDatasource} from "./validator.datasource";
import {InputFileFormat, ValidationErrorEnums} from "./index";

export class ValidatorInstagram extends ValidatorDatasource {

    protected DEFAULT_FILE_CODES: FileCode[] = [
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

    public async filterFilesIntoZip(zipFile: InputFileFormat, fileCodes: FileCode[] = this.DEFAULT_FILE_CODES): Promise<Buffer | undefined> {
        this.LANGUAGE_CODE = undefined;
        const JSZip = require("jszip");
        let hasAnyFile = false;
        let filteredFiles = new JSZip();
        const zip = await JSZip.loadAsync(zipFile);
        for (let pathName of Object.keys(zip.files)) {
            const file = zip.files[pathName];
            if (!file.dir) {
                let data = await file.async('nodebuffer');
                const compatiblePath = await this.getValidPath(pathName, zip, fileCodes);
                if (compatiblePath) {
                    this.addFileToZip(filteredFiles, compatiblePath, data, file);
                    (!hasAnyFile) && (hasAnyFile = true);
                }
            }
        }
        if(hasAnyFile) {
            return await filteredFiles.generateAsync({type: "nodebuffer"});
        } else {
            throw new Error(`${ValidationErrorEnums.NO_USEFUL_FILES_ERROR}: File ZIP has not any useful file`);
        }
    }

    public async getValidPath(pathName: string, zip?: any, fileCodes: FileCode[] = this.DEFAULT_FILE_CODES): Promise<string | undefined> {
        if (this.LANGUAGE_CODE === undefined) {
            await this.getLanguage(zip);
        } else if (this.LANGUAGE_CODE !== null) {
            const compatiblePath = this.extractCompatiblePath(pathName);
            return this.isPathMatching(compatiblePath, fileCodes) ? compatiblePath : undefined;
        }
        return undefined;
    }

     async getLanguage(zip: any): Promise<void> {
        for (let pathName of Object.keys(zip.files)) {
            const file = zip.files[pathName];
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
                }
            }
        }
        (this.LANGUAGE_CODE === undefined) && (this.LANGUAGE_CODE = null);
    }
}
