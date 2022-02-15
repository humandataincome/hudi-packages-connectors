import {Language} from "../utils/utils.enum"

/**
 * Class must be configured before using Google Service to parse files.
 * It is used to map generic parameters into the specific ones present into Google's JSON/CSV files.
 */
export class ConfigGoogle {
    private readonly _languageMode;
    private readonly _config: Record<string, string>;

    constructor(mode: Language) {
        this._languageMode = mode;
        this._config = {
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
        };
    }

    get languageMode() {
        return this._languageMode;
    }

    get(key: string): any {
        return this._config[key];
    }
}