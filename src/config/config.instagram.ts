
export class ConfigInstagram {
    private readonly _config: Record<string, string>;

    constructor() {
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
            'IT-dateAndTime':'Data e ora',
            'IT-secondName':'Cognome',
            'IT-contactInfo':'Informazioni di contatto',
            'IT-cityName':'Nome della citt\u00c3\u00a0',
            'IT-interest':'Interesse',
            'IT-search':'Cerca',
            'IT-productName':'Nome del prodotto',
            'IT-decision':'Decisione',
            'IT-reason':'Motivo'
        };
    }

    get(key: string): any {
        return this._config[key];
    }
}