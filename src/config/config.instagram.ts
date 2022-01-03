import {LanguageMode} from "../utils/utils.enum"

/**
 * Class must be configured before using Instagram Service to parse files.
 * It is used to map generic parameters into the specific ones present into Instagram's JSON files.
 */
export class ConfigInstagram {
    private readonly _languageMode;
    private readonly _config: Record<string, string>;

    constructor(mode: LanguageMode) {
        this._languageMode = mode;
        this._config = {
            'IT-username':'Nome utente',
            'IT-name':'Nome',
            'IT-email':'Indirizzo e-mail',
            'IT-phoneNumber':'Numero di telefono',
            'IT-gender':'Genere',
            'IT-birthdate':'Data di nascita',
            'IT-biography':'Biografia',
            'IT-privateAccount':'Account privato',
            'IT-author':'Autore',
            'IT-artist':'Artista',
            'IT-song':'Canzone',
            'IT-time':'Orario',
            'IT-secondName':'Cognome',
            'IT-contactInfo':'Informazioni di contatto',
            'IT-cityName':'Nome della citt\u00c3\u00a0',
            'IT-interest':'Interesse',
            'IT-search':'Cerca',
        };
    }

    get languageMode() {
        return this._languageMode;
    }

    get(key: string): any {
        return this._config[key];
    }
}