import {FileCodeGoogle} from "../source";


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

    public static readonly pathTranslation: Record<string, string | FileCodeGoogle> = {
        /*
        //ENGLISH
        'Maps (your places)/Reviews.json':`${FileCodeGoogle.MAPS_YOUR_PLACES_REVIEWS}`,

        //ITALIAN
        'Account Google':'Google Account',
        'Servizio di configurazione dispositivi Android':'Android Device Configuration Service',
        'Cloud Print/Estrazione dei metadati dei processi':`${FileCodeGoogle.CLOUD_PRINT_JOBS}`,
        'Cloud Print/Estrazione dei metadati delle stampanti':`${FileCodeGoogle.CLOUD_PRINT_PRINTERS}`,
        'Cronologia delle posizioni/Records.json':`${FileCodeGoogle.LOCATION_HISTORY_RECORDS}`,
        'Cronologia delle posizioni/Settings.json':`${FileCodeGoogle.LOCATION_HISTORY_SETTINGS}`,
        'Attività':'Activities',
        'Tutti i dati':'All Data',
        'Tutte le sessioni':'All sessions',
        'Google Play Libri':'Google Play Books',
        'Giochi':'Games',
        'Metriche giornaliere relative all_attività fisica':'Daily activity metrics',
        'Invii e richieste di denaro/Invii e richieste di denaro.csv':`${FileCodeGoogle.PAY_REMITTANCES_REQUESTS}`,
        'Transizioni Google':'Google transactions',
        //'Attività.html':'Activity.html', //not working with PLAY_GAMES_ACTIVITY
        'Google Play Film/Lista di titoli.json':`${FileCodeGoogle.PLAY_MOVIES_WATCHLIST}`,
        'Google Play Film/Preferenze di notifica.json':`${FileCodeGoogle.PLAY_MOVIES_NOTIFICATION}`,
        'Google Play Film/Servizi collegati.json':`${FileCodeGoogle.PLAY_MOVIES_SERVICES}`,
        'Google Play Film/Servizi di streaming.json':`${FileCodeGoogle.PLAY_MOVIES_STREAMING_SERVICES}`,
        'Google Play Film/Valutazioni.json':`${FileCodeGoogle.PLAY_MOVIES_RATINGS}`,
        'attività recenti/discussioni visualizzate di recente.csv':`${FileCodeGoogle.GROUPS_RECENT_VIEWED_DISCUSSIONS}`,
        'attività recenti/gruppi visualizzati di recente.csv':`${FileCodeGoogle.GROUPS_RECENT_VIEWED_DISCUSSIONS}`,
        'App Home':'Home App',
        'Impostazioni utente/Indirizzi bloccati.json':`${FileCodeGoogle.MAIL_BLOCKED_ADDRESSES}`,
        'Mail/Tutti i messaggi compresi Spam e Cestino':`${FileCodeGoogle.MAIL_ALL}`,
        'Attività, piatti e prodotti aggiunti/Attività, piatti e prodotti aggiunti.json':`${FileCodeGoogle.MAPS_ADDED}`,
        'Domande e risposte/Domande e risposte.json':`${FileCodeGoogle.MAPS_QUESTIONS_ANSWERS}`,
        'I miei luoghi etichettati/Luoghi etichettati.json':`${FileCodeGoogle.MAPS_LABELLED_PLACES}`,
        'Impostazioni del tragitto giornaliero/Impostazioni del tragitto giornaliero.json':`${FileCodeGoogle.MAPS_COMMUTE_SETTINGS}`,
        'Impostazioni veicolo elettrico/Impostazioni veicolo elettrico.json':`${FileCodeGoogle.MAPS_VEHICLE_SETTINGS}`,
        'I tuoi feedback per la personalizzazione/I tuoi feedback per la personalizzazione.json':`${FileCodeGoogle.MAPS_PERSONAL_FEEDBACK}`,
        'Richieste di servizi/Richieste di servizi.json':`${FileCodeGoogle.MAPS_REQUESTS_SERVICES}`,
        'Maps (I tuoi luoghi)/Recensioni.json':`${FileCodeGoogle.MAPS_YOUR_PLACES_REVIEWS}`, //'Maps \\\\(your places\\\\)/Reviews.json',
        'Gmail/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_GMAIL}`,
        'Developers/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_DEVELOPERS}`,
        'Drive/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_DRIVE}`,
        'Guida/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_HELP}`,
        'Takeout/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_TAKEOUT}`,
        'Google Play Giochi/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_PLAY_GAMES}`,
        'Google Lens/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_LENS}`,
        'Google Play Store/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_PLAY_STORE}`,
        'Ricerca video/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_VIDEO_SEARCH}`,
        'Assistente/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_ASSISTANT}`,
        'Chrome/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_CHROME}`,
        'Google News/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_NEWS}`,
        'Shopping/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_SHOPPING}`,
        'Ricerca immagini/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_IMAGE_SEARCH}`,
        'Maps/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_MAPS}`,
        'Google Traduttore/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_TRANSLATE}`,
        'YouTube/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_YOUTUBE}`,
        'Programmi pubblicitari/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_ADS}`,
        'Discover/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_DISCOVER}`,
        'Google Play Film/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_PLAY_MOVIES}`,
        'Ricerca/LeMieAttività.html':`${FileCodeGoogle.ACTIVITY_SEARCH}`,
        'Promemoria/Promemoria.html':`${FileCodeGoogle.REMINDERS}`,
        'Save/Elenco predefinito.csv':`${FileCodeGoogle.SAVED_DEFAULT_LIST}`,
        'Save/Immagini preferite.csv':`${FileCodeGoogle.SAVED_FAVOURITE_IMAGES}`,
        'Save/Luoghi preferiti.csv':`${FileCodeGoogle.SAVED_FAVOURITE_PLACES}`,
        'Save/Pagine preferite.csv':`${FileCodeGoogle.SAVED_FAVOURITE_PAGES}`,
        'Takeout/Contributi di Ricerca/Cuori.json':`${FileCodeGoogle.SEARCH_CONTRIBUTIONS_HEARTS}`,
        'Takeout/Contributi di Ricerca/Valutazioni.json':`${FileCodeGoogle.SEARCH_CONTRIBUTIONS_THUMBS}`,
        'Attività/Tasks.json':`${FileCodeGoogle.TASKS}`,

         */
    }
}
