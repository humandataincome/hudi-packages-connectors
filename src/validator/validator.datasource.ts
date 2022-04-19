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
                const compatiblePath = this.extractCompatiblePath(pathName);
                if (this.isPatchMatching(compatiblePath, fileList)) {
                    usefulFiles.file(compatiblePath, data, {comment: file.comment});
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
        console.log(pathName);
        codes.forEach((code: FileCode) => {
            if (!found) {
                console.log(new RegExp(code));
                if (pathName.match(RegExp(code))) {
                    found = true;
                    console.log("AAAA")
                }
            }
        })
        return found;
    }

    protected static extractCompatiblePath(path: string): string {
        const x: string[] = path.split('/');
        return (x[x.length - 2] + '/' + x[x.length - 1]);
    }
}
