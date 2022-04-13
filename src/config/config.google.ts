import {FileCodeGoogle} from "../descriptor";

export class ConfigGoogle {
    public static readonly keysValues: Record<string, string> = {
        //Google Transactions
        'IT-DateAndHour':'Data e ora',
        'IT-IDtransaction':'ID transazione',
        'IT-description':'Descrizione',
        'IT-product':'Prodotto',
        'IT-payment':'Metodo di pagamento',
        'IT-state':'Stato',
        'IT-amount':'Importo',
        //Months translations
        'IT-gen':'JAN',
        'IT-feb':'FEB',
        'IT-mar':'MAR',
        'IT-apr':'APR',
        'IT-mag':'MAY',
        'IT-giu':'JUN',
        'IT-lug':'JUL',
        'IT-ago':'AUG',
        'IT-set':'SEP',
        'IT-ott':'OCT',
        'IT-nov':'NOV',
        'IT-dic':'DEC',
        //PATH language translations
        //english
        //italian
        'Gmail/LeMieAttività.html':`${FileCodeGoogle.GOOGLE_ACTIVITY_GMAIL}`,
        'Developers/LeMieAttività.html':`${FileCodeGoogle.GOOGLE_ACTIVITY_DEVELOPERS}`,
        'Drive/LeMieAttività.html':`${FileCodeGoogle.GOOGLE_ACTIVITY_DRIVE}`,
        'Guida/LeMieAttività.html':``, //missing info and enum
        'Takeout/LeMieAttività.html':`${FileCodeGoogle.GOOGLE_ACTIVITY_TAKEOUT}`,
        'Google Play Giochi/LeMieAttività.html':``,
        'Google Lens/LeMieAttività.html':`${FileCodeGoogle.GOOGLE_ACTIVITY_LENS}`,
        'Google Play Store/LeMieAttività.html':`${FileCodeGoogle.GOOGLE_ACTIVITY_PLAY_STORE}`,
        'Ricerca video/LeMieAttività.html':``,
        'Assistente/LeMieAttività.html':``,
        'Chrome/LeMieAttività.html':`${FileCodeGoogle.GOOGLE_ACTIVITY_CHROME}`,
        'Google News/LeMieAttività.html':`${FileCodeGoogle.GOOGLE_ACTIVITY_GOOGLE_NEWS}`,
        'Shopping/LeMieAttività.html':`${FileCodeGoogle.GOOGLE_ACTIVITY_SHOPPING}`,
        'Ricerca immagini/LeMieAttività.html':``,
        'Maps/LeMieAttività.html':`${FileCodeGoogle.GOOGLE_ACTIVITY_MAPS}`,
        'Google Traduttore/LeMieAttività.html':`${FileCodeGoogle.GOOGLE_ACTIVITY_TRANSLATE}`,
        'YouTube/LeMieAttività.html':`${FileCodeGoogle.GOOGLE_ACTIVITY_YOUTUBE}`,
        'Programmi pubblicitari/LeMieAttività.html':``,
        'Discover/LeMieAttività.html':`${FileCodeGoogle.GOOGLE_ACTIVITY_DISCOVER}`,
        'Google Play Film/LeMieAttività.html':``,
        'Ricerca/LeMieAttività.html':``,
        'Profilo/Profilo.json':'Profile/Profile.json',

    };
}
