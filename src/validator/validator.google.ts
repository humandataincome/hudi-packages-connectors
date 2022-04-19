import {ValidatorDatasource} from "./validator.datasource";
import {FileCode, FileCodeGoogle} from "../descriptor";
import {ValidationErrorEnums} from "./validator.error";
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
            //FileCodeGoogle.SEMANTIC_LOCATION_HISTORY, //OK
            //FileCodeGoogle.PLAY_STORE_REVIEWS,
            //FileCodeGoogle.MAPS_YOUR_PLACES_REVIEWS,
        ]): Promise<Buffer | undefined> {
        const JSZip = require("jszip");
        let hasAnyFile = false;
        let usefulFiles = new JSZip();
        const zip = await JSZip.loadAsync(zipFile);
        for (let pathName of Object.keys(zip.files)) {
            const file = zip.files[pathName];
            if (!file.dir) {
                const data = await file.async('nodebuffer');
                const compatiblePath = this.extractCompatiblePath(pathName);
                if (this.isPatchMatching(compatiblePath, fileList)) {
                    usefulFiles.file(compatiblePath, data);
                    (!hasAnyFile) && (hasAnyFile = true);
                }
            }
        }
        if (hasAnyFile) {
            return await usefulFiles.generateAsync({type: "nodebuffer"});
        } else {
            throw new Error(`${ValidationErrorEnums.NO_USEFUL_FILES_ERROR}: File ZIP has not any useful file`);
        }
    }

    protected static extractCompatiblePath(path: string): string {
        const x: string[] = path.split('/');
        //must be controlled with more inputs
        const pathTranslation = ConfigGoogle.pathTranslation[`${x[x.length - 2]}/${x[x.length - 1]}`];
        if (pathTranslation) {
            return pathTranslation;
        }
        return x[x.length - 2] + '/' + x[x.length - 1];
    }
}
