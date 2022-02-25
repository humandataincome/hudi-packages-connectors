import {Language} from "../descriptor/descriptor.enum";
import {LanguageError} from "./validator.error";
import {ValidatedFile} from "./validator.model";
export class ValidatorInstagram {

    async getLanguage(file :Buffer): Promise<Language | undefined> {
        try {
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
        } catch (error) {
            throw (error);
        }
    }


    // validate file name if it owns to the useful files
    async selectFilesIntoZip(validatedFiles: Array<ValidatedFile>){

    }

}