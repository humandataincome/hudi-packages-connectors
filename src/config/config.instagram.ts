
export class ConfigInstagram {
    private readonly _config: Record<string, string>;

    constructor() {
        this._config = {
            //ENGLISH
            'EN-1-username':'Username',
            'EN-2-name':'Name',
            'EN-3-email':'Email address',
            'EN-4-privateAccount':'Private account',
            'EN-5-birthdate':'Date of birth',
            'EN-6-phoneNumber':'Phone Number',
            'EN-7-biography':'Bio',
            'EN-8-gender':'Gender',
            'EN-9-cityName':'Town/city name',
            'EN-10-author':'Author',
            'EN-11-time':'Time',
            'EN-12-interest':'Interest',
            'EN-13-song':'Song',
            'EN-14-artist':'Artist',
            'EN-15-time':'Time',
            'EN-16-song':'Song',
            'EN-17-artist':'Artist',
            'EN-18-time':'Time',
            'EN-19-author':'Author',
            'EN-20-time':'Time',
            'EN-21-author':'Author',
            'EN-22-time':'Time',
            'EN-23-username':'Username',
            'EN-24-time':'Time',
            'EN-25-username':'Username',
            'EN-26-dateAndTime':'Time',
            'EN-27-name':'First Name',
            'EN-28-secondName':'Last Name',
            'EN-29-contactInfo':'Contact Information',
            'EN-30-search':'Search',
            'EN-31-time':'Time',
            'EN-32-name':'Name',
            'EN-33-name':'Name',
            'EN-34-name':'Name',
            'EN-35-productName':'Product name',
            'EN-36-decision':'Decision',
            'EN-37-reason':'Reason',
            //ITALIAN
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
            'IT-37-reason':'Motivo',
            //HINDI
            'HI-1-username':'\u00e0\u00a4\u00af\u00e0\u00a5\u0082\u00e0\u00a4\u009c\u00e0\u00a4\u00bc\u00e0\u00a4\u00b0\u00e0\u00a4\u00a8\u00e0\u00a5\u0087\u00e0\u00a4\u00ae',
            'HI-2-name':'\u00e0\u00a4\u00a8\u00e0\u00a4\u00be\u00e0\u00a4\u00ae',
            'HI-3-email':'\u00e0\u00a4\u0088\u00e0\u00a4\u00ae\u00e0\u00a5\u0087\u00e0\u00a4\u00b2',
            'HI-4-privateAccount':'\u00e0\u00a4\u00aa\u00e0\u00a5\u008d\u00e0\u00a4\u00b0\u00e0\u00a4\u00be\u00e0\u00a4\u0087\u00e0\u00a4\u00b5\u00e0\u00a5\u0087\u00e0\u00a4\u009f \u00e0\u00a4\u0085\u00e0\u00a4\u0095\u00e0\u00a4\u00be\u00e0\u00a4\u0089\u00e0\u00a4\u0082\u00e0\u00a4\u009f',
            'HI-5-birthdate':'\u00e0\u00a4\u009c\u00e0\u00a4\u00a8\u00e0\u00a5\u008d\u00e0\u00a4\u00ae\u00e0\u00a4\u00a4\u00e0\u00a4\u00bf\u00e0\u00a4\u00a5\u00e0\u00a4\u00bf',
            'HI-6-phoneNumber':'',
            'HI-7-biography':'',
            'HI-8-gender':'\u00e0\u00a4\u00b2\u00e0\u00a4\u00bf\u00e0\u00a4\u0082\u00e0\u00a4\u0097',
            'HI-9-cityName':'\u00e0\u00a4\u00b6\u00e0\u00a4\u00b9\u00e0\u00a4\u00b0 \u00e0\u00a4\u0095\u00e0\u00a4\u00be \u00e0\u00a4\u00a8\u00e0\u00a4\u00be\u00e0\u00a4\u00ae',
            'HI-10-author':'\u00e0\u00a4\u00b2\u00e0\u00a5\u0087\u00e0\u00a4\u0096\u00e0\u00a4\u0095',
            'HI-11-time':'\u00e0\u00a4\u00b8\u00e0\u00a4\u00ae\u00e0\u00a4\u00af',
            'HI-12-interest':'\u00e0\u00a4\u00a6\u00e0\u00a4\u00bf\u00e0\u00a4\u00b2\u00e0\u00a4\u009a\u00e0\u00a4\u00b8\u00e0\u00a5\u008d\u00e0\u00a4\u00aa\u00e0\u00a5\u0080',
            'HI-13-song':'\u00e0\u00a4\u0097\u00e0\u00a4\u00be\u00e0\u00a4\u00a8\u00e0\u00a4\u00be',
            'HI-14-artist':'\u00e0\u00a4\u0095\u00e0\u00a4\u00b2\u00e0\u00a4\u00be\u00e0\u00a4\u0095\u00e0\u00a4\u00be\u00e0\u00a4\u00b0',
            'HI-15-time':'\u00e0\u00a4\u00b8\u00e0\u00a4\u00ae\u00e0\u00a4\u00af',
            'HI-16-song':'\u00e0\u00a4\u0097\u00e0\u00a4\u00be\u00e0\u00a4\u00a8\u00e0\u00a4\u00be',
            'HI-17-artist':'\u00e0\u00a4\u0095\u00e0\u00a4\u00b2\u00e0\u00a4\u00be\u00e0\u00a4\u0095\u00e0\u00a4\u00be\u00e0\u00a4\u00b0',
            'HI-18-time':'\u00e0\u00a4\u00b8\u00e0\u00a4\u00ae\u00e0\u00a4\u00af',
            'HI-19-author':'\u00e0\u00a4\u00b2\u00e0\u00a5\u0087\u00e0\u00a4\u0096\u00e0\u00a4\u0095',
            'HI-20-time':'\u00e0\u00a4\u00b8\u00e0\u00a4\u00ae\u00e0\u00a4\u00af',
            'HI-21-author':'\u00e0\u00a4\u00b2\u00e0\u00a5\u0087\u00e0\u00a4\u0096\u00e0\u00a4\u0095',
            'HI-22-time':'\u00e0\u00a4\u00b8\u00e0\u00a4\u00ae\u00e0\u00a4\u00af',
            'HI-23-username':'\u00e0\u00a4\u00af\u00e0\u00a5\u0082\u00e0\u00a4\u009c\u00e0\u00a4\u00bc\u00e0\u00a4\u00b0\u00e0\u00a4\u00a8\u00e0\u00a5\u0087\u00e0\u00a4\u00ae',
            'HI-24-time':'\u00e0\u00a4\u00b8\u00e0\u00a4\u00ae\u00e0\u00a4\u00af',
            'HI-25-username':'\u00e0\u00a4\u00af\u00e0\u00a5\u0082\u00e0\u00a4\u009c\u00e0\u00a4\u00bc\u00e0\u00a4\u00b0\u00e0\u00a4\u00a8\u00e0\u00a5\u0087\u00e0\u00a4\u00ae',
            'HI-26-dateAndTime':'',
            'HI-27-name':'',
            'HI-28-secondName':'',
            'HI-29-contactInfo':'',
            'HI-30-search':'\u00e0\u00a4\u00b8\u00e0\u00a4\u00b0\u00e0\u00a5\u008d\u00e0\u00a4\u009a \u00e0\u00a4\u0095\u00e0\u00a4\u00b0\u00e0\u00a5\u0087\u00e0\u00a4\u0082',
            'HI-31-time':'\u00e0\u00a4\u00b8\u00e0\u00a4\u00ae\u00e0\u00a4\u00af',
            'HI-32-name':'\u00e0\u00a4\u00a8\u00e0\u00a4\u00be\u00e0\u00a4\u00ae',
            'HI-33-name':'\u00e0\u00a4\u00a8\u00e0\u00a4\u00be\u00e0\u00a4\u00ae',
            'HI-34-name':'\u00e0\u00a4\u00a8\u00e0\u00a4\u00be\u00e0\u00a4\u00ae',
            'HI-35-productName':'\u00e0\u00a4\u00aa\u00e0\u00a5\u008d\u00e0\u00a4\u00b0\u00e0\u00a5\u008b\u00e0\u00a4\u00a1\u00e0\u00a4\u0095\u00e0\u00a5\u008d\u00e0\u00a4\u009f \u00e0\u00a4\u0095\u00e0\u00a4\u00be \u00e0\u00a4\u00a8\u00e0\u00a4\u00be\u00e0\u00a4\u00ae',
            'HI-36-decision':'\u00e0\u00a4\u00ab\u00e0\u00a4\u00bc\u00e0\u00a5\u0088\u00e0\u00a4\u00b8\u00e0\u00a4\u00b2\u00e0\u00a4\u00be',
            'HI-37-reason':'\u00e0\u00a4\u0095\u00e0\u00a4\u00be\u00e0\u00a4\u00b0\u00e0\u00a4\u00a3',
        };
    }

    get(key: string): any {
        return this._config[key];
    }
}
