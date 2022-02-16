
export class ConfigGoogle {
    private readonly _config: Record<string, string>;

    constructor() {
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

    get(key: string): any {
        return this._config[key];
    }
}