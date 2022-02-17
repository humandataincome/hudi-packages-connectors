
export class ConfigInstagram {
    private readonly _config: Record<string, string>;

    constructor() {
        this._config = {
            'IT-1-username':'Nome utente',
            'IT-2-name':'Nome',
            'IT-3-email':'Indirizzo e-mail',
            'IT-4-privateAccount':'Account privato',
            'IT-5-birthdate':'Data di nascita',
            'IT-6-phoneNumber':'Numero di telefono',
            'IT-7-biography':'Biografia',
            'IT-8-gender':'Genere',
            'IT-9-cityName':'Nome della citt\u00c3\u00a0',
            'IT-10-author':'Autore',
            'IT-11-time':'Orario',
            'IT-12-interest':'Interesse',
            'IT-13-song':'Canzone',
            'IT-14-artist':'Artista',
            'IT-15-time':'Orario',
            'IT-16-song':'Canzone',
            'IT-17-artist':'Artista',
            'IT-18-time':'Orario',
            'IT-19-author':'Autore',
            'IT-20-time':'Orario',
            'IT-21-author':'Autore',
            'IT-22-time':'Orario',
            'IT-23-username':'Nome utente',
            'IT-24-time':'Orario',
            'IT-25-username':'Nome utente',
            'IT-26-dateAndTime':'Data e ora',
            'IT-27-name':'Nome',
            'IT-28-secondName':'Cognome',
            'IT-29-contactInfo':'Informazioni di contatto',
            'IT-30-search':'Cerca',
            'IT-31-time':'Orario',
            'IT-32-name':'Nome',
            'IT-33-name':'Nome',
            'IT-34-name':'Nome',
            'IT-35-productName':'Nome del prodotto',
            'IT-36-decision':'Decisione',
            'IT-37-reason':'Motivo'
        };
    }

    get(key: string): any {
        return this._config[key];
    }
}