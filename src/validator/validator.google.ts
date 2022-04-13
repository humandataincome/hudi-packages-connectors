import {ValidatorDatasource} from "./validator.datasource";
import {InputFileFormat} from "./validator";
import {FileCode} from "../descriptor";
import {ValidationErrorEnums} from "./validator.error";
import {ConfigGoogle} from "../config/config.google";

export class ValidatorGoogle extends ValidatorDatasource  {

    /**
     * @param zipFile - file zip containing file that must be parsed
     * @param fileList - optional list of paths of file (as FileCode) that we want to keep into the file zip
     * @return buffer containing all useful files that have been found
     */
    static async selectUsefulFilesFromZip(
        zipFile: InputFileFormat,
        fileList: FileCode[] = [
            FileCode.GOOGLE_BROWSER_HISTORY,
            FileCode.GOOGLE_ACTIVITY_DISCOVER,
        ]): Promise<Buffer | undefined> {
        const JSZip = require("jszip");
        let hasAnyFile = false;
        let usefulFiles = new JSZip();
        const zip = await JSZip.loadAsync(zipFile);
        for (let pathName of Object.keys(zip.files)) {
            const file = zip.files[pathName];
            if (!file.dir) {
                console.log(pathName);
                const data = await file.async('nodebuffer');
                if (this.isPatchMatching(this.extractCompatiblePath(pathName), fileList)) {
                    usefulFiles.file(this.extractCompatiblePath(pathName), data);
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
        const suffixTranslation = ConfigGoogle.keysValues[`${x[x.length - 1]}`];
        if (suffixTranslation) {
            return (x[x.length - 2] + '/' + suffixTranslation);
        }
        return x[x.length - 1];
    }
}
