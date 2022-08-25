import {FileCodeGoogle} from "../source";


export class ConfigGoogle {
    public static readonly keyTranslation: Record<string, string> = {
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
        //ITALIAN
        'Account Google':'Google Account'
    }
}
