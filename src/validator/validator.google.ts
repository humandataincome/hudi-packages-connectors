import {ValidatorDatasource} from "./validator.datasource";
import {FileCode, FileCodeGoogle} from "../descriptor";
import {ConfigGoogle} from "../config/config.google";
import {InputFileFormat} from "./index";

export class ValidatorGoogle extends ValidatorDatasource  {

    /**
     * @param zipFile - file zip containing file that must be parsed
     * @param fileList - optional list of paths of file (as FileCode) that we want to keep into the file zip
     * @return buffer containing all useful files that have been found
     */
    static async selectUsefulFilesFromZip(
        zipFile: InputFileFormat,
        fileList: FileCode[] = [
            FileCodeGoogle.ACCOUNT_INFO,
            FileCodeGoogle.SEMANTIC_LOCATION_HISTORY,
            FileCodeGoogle.PLAY_STORE_REVIEWS,
            FileCodeGoogle.MAPS_YOUR_PLACES_REVIEWS,
        ]): Promise<Buffer | undefined> {
        return super.selectUsefulFilesFromZip(zipFile, fileList);
    }

    protected static extractCompatiblePath(path: string): string {
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
