import {FileCodeGoogle} from "../descriptor";

export class ConfigGoogle {
    public static readonly keyTranslation: Record<string, string> = {
        'IT-DateAndHour':'Data e ora',
        'IT-IDtransaction':'ID transazione',
        'IT-description':'Descrizione',
        'IT-product':'Prodotto',
        'IT-payment':'Metodo di pagamento',
        'IT-state':'Stato',
        'IT-amount':'Importo',
    }

    public static readonly monthTranslation: Record<string, string> = {
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
    }

    public static readonly pathTranslation: Record<string, string> = {
        //italian
        'Gmail/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_GMAIL}`,
        'Developers/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_DEVELOPERS}`,
        'Drive/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_DRIVE}`,
        'Guida/LeMieAttività.html':``, //missing info and enum
        'Takeout/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_TAKEOUT}`,
        'Google Play Giochi/LeMieAttività.html':``,
        'Google Lens/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_LENS}`,
        'Google Play Store/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_PLAY_STORE}`,
        'Ricerca video/LeMieAttività.html':``,
        'Assistente/LeMieAttività.html':``,
        'Chrome/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_CHROME}`,
        'Google News/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_NEWS}`,
        'Shopping/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_SHOPPING}`,
        'Ricerca immagini/LeMieAttività.html':``,
        'Maps/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_MAPS}`,
        'Google Traduttore/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_TRANSLATE}`,
        'YouTube/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_YOUTUBE}`,
        'Programmi pubblicitari/LeMieAttività.html':``,
        'Discover/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_DISCOVER}`,
        'Google Play Film/LeMieAttività.html':``,
        'Ricerca/LeMieAttività.html':``,
        'Profilo/Profilo.json':`${FileCodeGoogle.PROFILE}`,
        'Account Google/(\\.+)SubscriberInfo.html':`${FileCodeGoogle.ACCOUNT_INFO}`, //`${FileCodeGoogle.ACCOUNT_INFO}`,
        'Maps (I tuoi luoghi)/Recensioni.json':`${FileCodeGoogle.MAPS_YOUR_PLACES_REVIEWS}`,
    }
}
