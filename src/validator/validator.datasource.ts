import {FileCode} from "../descriptor";
import {ValidationErrorEnums} from "./validator.error";
import {InputFileFormat} from "./index";

export class ValidatorDatasource {

    protected static async selectUsefulFilesFromZip(
        zipFile: InputFileFormat,
        fileList: FileCode[] = []): Promise<Buffer | undefined> {
        const JSZip = require("jszip");
        let hasAnyFile = false;
        let usefulFiles = new JSZip();
        const zip = await JSZip.loadAsync(zipFile);
        for (let pathName of Object.keys(zip.files)) {
            const file = zip.files[pathName];
            if (!file.dir) {
                let data = await file.async('nodebuffer');
                if (this.isPatchMatching(this.extractCompatiblePath(pathName), fileList)) {
                    usefulFiles.file(this.extractCompatiblePath(pathName), data, {comment: file.comment});
                    (!hasAnyFile) && (hasAnyFile = true);
                }
            }
        }
        if(hasAnyFile) {
            return await usefulFiles.generateAsync({type: "nodebuffer"});
        } else {
            throw new Error(`${ValidationErrorEnums.NO_USEFUL_FILES_ERROR}: File ZIP has not any useful file`);
        }
    }

    protected static isPatchMatching(pathName: string, codes: FileCode[]): boolean {
        let found = false;
        codes.forEach((code: FileCode) => {
            if(pathName.match(code)) {
                found = true;
            }
        })
        return found;
    }

    protected static extractCompatiblePath(path: string): string {
        const x: string[] = path.split('/');
        return (x[x.length - 2] + '/' + x[x.length - 1]);
    }
}
