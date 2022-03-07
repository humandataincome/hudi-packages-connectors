import {FileCode, LanguageCode} from "../descriptor/descriptor.enum";
import * as JSZip from "jszip";
import {ValidationErrorEnums} from "./validator.error";
export class ValidatorInstagram {

    getLanguage(file: Buffer): LanguageCode | undefined {
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
        //check if HINDI
        const regexHI = /(\u00e0\u00a4\u0088\u00e0\u00a4\u00ae\u00e0\u00a5\u0087\u00e0\u00a4\u00b2)|(\u00e0\u00a4\u00aa\u00e0\u00a5\u008d\u00e0\u00a4\u00b0\u00e0\u00a4\u00be\u00e0\u00a4\u0087\u00e0\u00a4\u00b5\u00e0\u00a5\u0087\u00e0\u00a4\u009f \u00e0\u00a4\u0085\u00e0\u00a4\u0095\u00e0\u00a4\u00be\u00e0\u00a4\u0089\u00e0\u00a4\u0082\u00e0\u00a4\u009f)|(\u00e0\u00a4\u00af\u00e0\u00a5\u0082\u00e0\u00a4\u009c\u00e0\u00a4\u00bc\u00e0\u00a4\u00b0\u00e0\u00a4\u00a8\u00e0\u00a5\u0087\u00e0\u00a4\u00ae)/;
        if (document.match(regexHI)) {
            return LanguageCode.HINDI;
        }
        throw new Error(`${ValidationErrorEnums.LANGUAGE_ERROR}`);
    }


    /**
     * @param zipFile - file zip containing file that must be parsed
     * @param fileList - list of paths of file (as FileCode) that we want to keep into the file zip
     * @return Promise<Buffer | undefined> - buffer containing all useful files that have been found
     */
    async selectUsefulFilesFromZip(zipFile: Buffer, fileList: Array<FileCode>): Promise<Buffer | undefined>{
        let languageCode: LanguageCode | undefined;
        let usefulFiles = new JSZip();
        await JSZip.loadAsync(zipFile).then(async (zip: JSZip) => {
            const keys = Object.keys(zip.files);
            await Promise.all(keys.map(async (pathName: string) => {
                const file = zip.files[pathName];
                if (!file.dir) {
                    await file.async('nodebuffer').then((data: Buffer) => {
                        if (pathName == FileCode.INSTAGRAM_PERSONAL_INFO) {
                            languageCode = this.getLanguage(data);
                        }
                    });
                    if (languageCode) {
                        await file.async('nodebuffer').then((data: Buffer) => {
                            if (fileList.includes(<FileCode>pathName)) {
                                usefulFiles.file(pathName, data, {comment: languageCode});
                            }
                        });
                    }
                }
            }));
        });
        if(languageCode) {
            return await usefulFiles.generateAsync({type: "nodebuffer"});
        } else {
            throw new Error(`${ValidationErrorEnums.MISSING_FILE_ERROR}`);
        }
    }
}