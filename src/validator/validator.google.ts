import {ValidatorDatasource} from "./validator.datasource";
import {FileCodeGoogle} from "../descriptor";
import {ConfigGoogle} from "../config/config.google";

export class ValidatorGoogle extends ValidatorDatasource  {

    protected DEFAULT_FILE_CODES: FileCodeGoogle[] = [
        FileCodeGoogle.ACCOUNT_INFO,
        FileCodeGoogle.SEMANTIC_LOCATION_HISTORY,
        FileCodeGoogle.PLAY_STORE_REVIEWS,
        FileCodeGoogle.MAPS_YOUR_PLACES_REVIEWS,
    ];

    public extractCompatiblePath(path: string): string {
        const x: string[] = path.split('/');
        let pathTranslation = ConfigGoogle.pathTranslation[`${x[x.length - 3]}`];
        if (pathTranslation) {
            if (pathTranslation === 'Games') {
                let pathTranslation2 = ConfigGoogle.pathTranslation[`${x[x.length - 1]}`];
                if (pathTranslation2) {
                    return pathTranslation + '/' + x[x.length - 2] + '/' + pathTranslation2;
                } else {

                }
            }
            if(pathTranslation === 'Google Play Books') {
                return pathTranslation + '/' + x[x.length - 2] + '/' + x[x.length - 1];
            }
        }

        pathTranslation = ConfigGoogle.pathTranslation[`${x[x.length - 2]}`];
        if (pathTranslation) {
            return pathTranslation + '/' + x[x.length - 1];
        }

        pathTranslation = ConfigGoogle.pathTranslation[`${x[x.length - 2]}/${x[x.length - 1]}`];
        if (pathTranslation) {
            return pathTranslation;
        }

        return x[x.length - 2] + '/' + x[x.length - 1];
    }
}
