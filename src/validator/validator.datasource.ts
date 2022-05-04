import {FileCode, LanguageCode} from "../descriptor";
import {ValidationErrorEnums} from "./validator.error";
import {InputFileFormat} from "./index";

export class ValidatorDatasource {
    private static _instance: ValidatorDatasource;
    protected DEFAULT_FILE_CODES: FileCode[] = [];
    //LANGUAGE_CODE is used by some validations. Its value is UNDEFINED at the beginning of every validation execution,
    // can be NULL or LanguageCode types only during the validation execution.
    public LANGUAGE_CODE: LanguageCode | undefined | null;

    public static getInstance(): ValidatorDatasource {
        return this._instance || (this._instance = new this());
    }

    public async filterFilesIntoZip(zipFile: InputFileFormat, fileCodes: FileCode[] = this.DEFAULT_FILE_CODES): Promise<Buffer | undefined> {
        this.LANGUAGE_CODE = undefined;
        const JSZip = require("jszip");
        let hasAnyFile = false;
        let filteredFiles = new JSZip();
        const zip = await JSZip.loadAsync(zipFile);
        for (let pathName of Object.keys(zip.files)) {
            const file = zip.files[pathName];
            if (!file.dir) {
                let data = await file.async('nodebuffer');
                const compatiblePath = await this.getValidPath(pathName, fileCodes);
                if (compatiblePath) {
                    this.addFileToZip(filteredFiles, compatiblePath, data, file);
                    (!hasAnyFile) && (hasAnyFile = true);
                }
            }
        }
        if(hasAnyFile) {
            return await filteredFiles.generateAsync({type: "nodebuffer"});
        } else {
            throw new Error(`${ValidationErrorEnums.NO_USEFUL_FILES_ERROR}: File ZIP has not any useful file`);
        }
    }

    public addFileToZip(zip: any, path: string, data: Buffer, file: any) {
        zip.file(path, data, {comment: this.LANGUAGE_CODE || file.comment});
    }

    public async getValidPath(pathName: string, zip?: any, fileCodes: FileCode[] = this.DEFAULT_FILE_CODES): Promise<string | undefined> {
        const compatiblePath = this.extractCompatiblePath(pathName);
        return this.isPathMatching(compatiblePath, fileCodes) ? compatiblePath : undefined;
    }

    protected isPathMatching(pathName: string, fileCodes: FileCode[]): boolean {
        let found = false;
        fileCodes.forEach((code: FileCode) => (!found && RegExp('^'+code+'$').test(pathName)) && (found = true));
        return found;
    }

    protected extractCompatiblePath(path: string): string {
        const x: string[] = path.split('/');
        return (x[x.length - 2] + '/' + x[x.length - 1]);
    }
}
