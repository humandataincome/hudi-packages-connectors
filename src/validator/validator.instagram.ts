import {FileCode, Language} from "../descriptor/descriptor.enum";
import {LanguageError} from "./validator.error";
import {ValidatedFile} from "./validator.model";
import * as JSZip from "jszip";
export class ValidatorInstagram {

    private static getLanguage(file :Buffer): Language | undefined {
        const document = file.toString();
        //check if ITALIAN
        const regexIT = /(Nome utente)|(Indirizzo e-mail)|(Data di nascita)/;
        if (document.match(regexIT)) {
            return Language.ITALIAN;
        }
        /*
        //check if ENGLISH
        const regexEN = /(.*().*)/;
        match = document.match(regexEN);
        if (match) {
            return Language.ENGLISH;
        }
         */
        throw new LanguageError("Language not recognized in getLanguageInstagram function");
    }


    // validate file name if it owns to the useful files
    async selectUsefulFilesFromZip(zipFile: Buffer): Promise<Buffer | undefined>{
        let languageCode: Language | undefined;
        let usefulFiles = new JSZip();
        await JSZip.loadAsync(zipFile).then(async (zip: JSZip) => {
            const keys = Object.keys(zip.files);
            await Promise.all(keys.map(async (pathName: string) => {
                const file = zip.files[pathName];
                if (!file.dir) {
                    await file.async('nodebuffer').then((data: Buffer) => {
                        if(pathName == FileCode.INSTAGRAM_PERSONAL_INFO) {
                            languageCode = ValidatorInstagram.getLanguage(data);
                        } else if(pathName == FileCode.INSTAGRAM_ADS_CLICKED ||
                            pathName == FileCode.INSTAGRAM_ADS_VIEWED ||
                            pathName == FileCode.INSTAGRAM_POSTS_VIEWED ||
                            pathName == FileCode.INSTAGRAM_VIDEO_VIEWED ||
                            pathName == FileCode.INSTAGRAM_POST_COMMENT ||
                            pathName == FileCode.INSTAGRAM_POSTS_CREATED ||
                            pathName == FileCode.INSTAGRAM_STORIES_CREATED ||
                            pathName == FileCode.INSTAGRAM_FOLLOWERS ||
                            pathName == FileCode.INSTAGRAM_FOLLOWING_ACCOUNTS ||
                            pathName == FileCode.INSTAGRAM_LIKE_COMMENTS ||
                            pathName == FileCode.INSTAGRAM_LIKE_POSTS ||
                            pathName == FileCode.INSTAGRAM_ELEGIBILITY ||
                            pathName == FileCode.INSTAGRAM_EMOJI_SLIDERS ||
                            pathName == FileCode.INSTAGRAM_POLLS ||
                            pathName == FileCode.INSTAGRAM_QUIZZES
                        ) {
                            usefulFiles.file(pathName, data);
                        }
                    });
                }
            }));
        });
        if(languageCode) {
            return await usefulFiles.generateAsync({type: "nodebuffer", comment: languageCode});
        } else {
            new Error("Missing personal_information.json file. Impossible to retrieve LanguageCode")
        }
    }

}