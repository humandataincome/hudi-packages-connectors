import {Language} from "../descriptor/descriptor.enum";

export class ValidatorInstagram {

    async getLanguageInstagram(file :Buffer): Promise<Language | undefined> {
        try {
            const document = file.toString();
            //check if ITALIAN
            const regexIT = /(.*(Indirizzo e-mail | Nome utente | Data di nascita).*)/;
            let match = document.match(regexIT);
            if (match && match[1]) {
                return Language.ITALIAN;
            }
            //check if ENGLISH
            const regexEN = /(.*().*)/;
            match = document.match(regexEN);
            if (match && match[1]) {
                return Language.ENGLISH;
            }

            throw new LanguageError("Language not recognized.");
        } catch (error) {
            throw (error);
        }
    }

}