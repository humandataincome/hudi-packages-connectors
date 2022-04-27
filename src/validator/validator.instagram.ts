import {FileCode, FileCodeInstagram, LanguageCode} from "../descriptor";
import {ValidationErrorEnums} from "./validator.error";


import {ValidatorDatasource} from "./validator.datasource";
import {InputFileFormat} from "./index";

export class ValidatorInstagram extends ValidatorDatasource {
    /**
     * @param zipFile - file zip containing file that must be parsed
     * @param fileList - optional list of paths of file (as FileCode) that we want to keep into the file zip
     * @return buffer containing all useful files that have been found
     */
    static async selectUsefulFilesFromZip(
        zipFile: InputFileFormat,
        fileList: FileCode[] = [
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
        ]): Promise<Buffer | undefined> {
        const JSZip = require("jszip");
        let languageCode: LanguageCode | undefined;
        let hasAnyFile = false;
        let usefulFiles = new JSZip();
        const zip = await JSZip.loadAsync(zipFile);
        for (let pathName of Object.keys(zip.files)) {
            const file = zip.files[pathName];
            const compatiblePath = this.extractCompatiblePath(pathName);
            if (compatiblePath === FileCodeInstagram.PERSONAL_INFO) {
                let data = await file.async('nodebuffer');
                languageCode = this.getLanguage(data);
            }
        }
        if(languageCode) {
            for (let pathName of Object.keys(zip.files)) {
                const file = zip.files[pathName];
                if (!file.dir) {
                    const compatiblePath = this.extractCompatiblePath(pathName);
                    if (this.isPatchMatching(compatiblePath, fileList)) {
                        const data = await file.async('nodebuffer');
                        usefulFiles.file(compatiblePath, data, {comment: languageCode});
                        (!hasAnyFile) && (hasAnyFile = true);
                    }
                }
            }
        }
        if (hasAnyFile) {
            return await usefulFiles.generateAsync({type: "nodebuffer"});
        } else {
            throw new Error(`${ValidationErrorEnums.NO_USEFUL_FILES_ERROR}: File ZIP has not any useful file`);
        }
    }

    /**
     * @param file - file zip as Buffer (should be the file account_information/personal_information.json) to work properly
     * @return return the Code of the Language of the file
     */
    static getLanguage(file: InputFileFormat): LanguageCode | undefined {
        const document = file.toString();
        //check if ITALIAN
        const regexIT = /(Nome utente)|(Indirizzo e-mail)|(Data di nascita)/;
        if (document.match(regexIT)) {
            return LanguageCode.ITALIAN;
        }
        //check if ENGLISH
        const regexEN = /(Email address)|(Phone number confirmed)|(Username)/;
        if (document.match(regexEN)) {
            return LanguageCode.ENGLISH;
        }
        //check if SPANISH
        const regexES = /(Nombre de usuario)|(Cuenta privada)|(Correo electr\u00c3\u00b3nico)/;
        if (document.match(regexES)) {
            return LanguageCode.SPANISH;
        }
        //check if HINDI
        const regexHI = /(\u00e0\u00a4\u0088\u00e0\u00a4\u00ae\u00e0\u00a5\u0087\u00e0\u00a4\u00b2)|(\u00e0\u00a4\u00aa\u00e0\u00a5\u008d\u00e0\u00a4\u00b0\u00e0\u00a4\u00be\u00e0\u00a4\u0087\u00e0\u00a4\u00b5\u00e0\u00a5\u0087\u00e0\u00a4\u009f \u00e0\u00a4\u0085\u00e0\u00a4\u0095\u00e0\u00a4\u00be\u00e0\u00a4\u0089\u00e0\u00a4\u0082\u00e0\u00a4\u009f)|(\u00e0\u00a4\u00af\u00e0\u00a5\u0082\u00e0\u00a4\u009c\u00e0\u00a4\u00bc\u00e0\u00a4\u00b0\u00e0\u00a4\u00a8\u00e0\u00a5\u0087\u00e0\u00a4\u00ae)/;
        if (document.match(regexHI)) {
            return LanguageCode.HINDI;
        }
        //check if FRENCH
        const regexFR = /(Adresse e-mail)|(Num\u00c3\u00a9ro de t\u00c3\u00a9l\u00c3\u00a9phone)|(Nom d\u00e2\u0080\u0099utilisateur)/;
        if (document.match(regexFR)) {
            return LanguageCode.FRENCH;
        }
        //check if GERMAN
        const regexDE = /(Benutzername)|(E-Mail-Adresse)|(Telefonnummer)/;
        if (document.match(regexDE)) {
            return LanguageCode.GERMAN;
        }
        //check if CHINESE_SIMPLIFIED
        const regexZH_CN = /(\u00e5\u00b8\u0090\u00e5\u008f\u00b7)|(\u00e9\u0082\u00ae\u00e7\u00ae\u00b1)|(\u00e7\u00a7\u0081\u00e5\u00af\u0086\u00e5\u00b8\u0090\u00e6\u0088\u00b7)/;
        if (document.match(regexZH_CN)) {
            return LanguageCode.CHINESE_SIMPLIFIED;
        }
        throw new Error(`${ValidationErrorEnums.LANGUAGE_ERROR}: File language not supported or not recognized`);
    }

}
