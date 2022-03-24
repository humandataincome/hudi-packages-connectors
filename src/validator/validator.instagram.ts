import {FileCode, LanguageCode} from "../descriptor";
import {ValidationErrorEnums} from "./validator.error";
import {InputFileFormat} from "./validator";

import * as JSZip from "jszip";

export class ValidatorInstagram {

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
        throw new Error(`${ValidationErrorEnums.LANGUAGE_ERROR}: File language not supported or not recognized`);
    }

    /**
     * @param zipFile - file zip containing file that must be parsed
     * @param fileList - optional list of paths of file (as FileCode) that we want to keep into the file zip
     * @return buffer containing all useful files that have been found
     */
    static async selectUsefulFilesFromZip(
        zipFile: InputFileFormat,
        fileList: FileCode[] = [
            FileCode.INSTAGRAM_ADS_CLICKED,
            FileCode.INSTAGRAM_ADS_VIEWED,
            FileCode.INSTAGRAM_POSTS_VIEWED,
            FileCode.INSTAGRAM_VIDEO_VIEWED,
            FileCode.INSTAGRAM_POST_COMMENT,
            FileCode.INSTAGRAM_POSTS_CREATED,
            FileCode.INSTAGRAM_STORIES_CREATED,
            FileCode.INSTAGRAM_FOLLOWERS,
            FileCode.INSTAGRAM_FOLLOWING_ACCOUNTS,
            FileCode.INSTAGRAM_LIKE_COMMENTS,
            FileCode.INSTAGRAM_LIKE_POSTS,
            FileCode.INSTAGRAM_ELEGIBILITY,
            FileCode.INSTAGRAM_EMOJI_SLIDERS,
            FileCode.INSTAGRAM_POLLS,
            FileCode.INSTAGRAM_QUIZZES
        ]): Promise<Buffer | undefined> {
        let languageCode: LanguageCode | undefined;
        let hasAnyFile = false;
        let usefulFiles = new JSZip();
        const zip = await JSZip.loadAsync(zipFile);
        for (let pathName of Object.keys(zip.files)) {
            const file = zip.files[pathName];
            if (!file.dir) {
                let data = await file.async('nodebuffer');
                if (this.extractCompatiblePath(pathName) === FileCode.INSTAGRAM_PERSONAL_INFO) {
                    languageCode = this.getLanguage(data);
                }
                data = await file.async('nodebuffer');
                if (fileList.includes(<FileCode>this.extractCompatiblePath(pathName))) {
                    usefulFiles.file(this.extractCompatiblePath(pathName), data, {comment: languageCode});
                    (!hasAnyFile) && (hasAnyFile = true);
                }
            }
        }
        if (hasAnyFile) {
            return await usefulFiles.generateAsync({type: "nodebuffer"});
        } else {
            throw new Error(`${ValidationErrorEnums.NO_USEFUL_FILES_ERROR}: File ZIP has not any useful file`);
        }
    }

    private static extractCompatiblePath(path: string): string {
        const x: string[] = path.split('/');
        return (x[x.length - 2] + '/' + x[x.length - 1]);
    }
}
