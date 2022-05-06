import {FileCode, LanguageCode} from "../descriptor";
import {ValidationErrorEnums} from "./validator.error";
import {InputFileFormat, ValidatorAmazonOption, ValidatorFacebookOption, ValidatorInstagramOption} from "./index";
import {ValidatorGoogleOption} from "./validator.google";
import Logger from "../utils/logger";

export type  ValidatorDatasourceOption = ValidatorInstagramOption | ValidatorFacebookOption | ValidatorAmazonOption | ValidatorGoogleOption;

export class ValidatorDatasource {
    private static _instance: ValidatorDatasource;
    protected readonly logger = new Logger("Datasource Validator");
    protected DEFAULT_FILE_CODES: FileCode[] = [];
    //LANGUAGE_CODE is used by some validations. Its value is UNDEFINED at the beginning of every validation execution,
    // can be NULL or LanguageCode types only during the validation execution.
    public LANGUAGE_CODE: LanguageCode | undefined | null;

    public static getInstance(): ValidatorDatasource {
        return this._instance || (this._instance = new this());
    }

    public async filterFilesIntoZip(zipFile: InputFileFormat, options?: ValidatorDatasourceOption): Promise<Buffer | undefined> {
        this.LANGUAGE_CODE = undefined;
        const JSZip = require("jszip");
        let hasAnyFile = false;
        let filteredFiles = new JSZip();
        const zip = await JSZip.loadAsync(zipFile);
        for (let pathName of Object.keys(zip.files)) {
            const file = zip.files[pathName];
            if (!file.dir) {
                let data = await file.async('nodebuffer');
                const compatiblePath = options && options.fileCodes ? await this.getValidPath(pathName, options) : await this.getValidPath(pathName);
                if (compatiblePath) {
                    this.addFileToZip(filteredFiles, compatiblePath, data, file);
                    (!hasAnyFile) && (hasAnyFile = true);
                }
            }
        }
        if(hasAnyFile) {
            return await filteredFiles.generateAsync({type: "nodebuffer"});
        } else {
            this.logger.log('error', `${ValidationErrorEnums.NO_USEFUL_FILES_ERROR}: The filtered ZIP has not any file`,'filterFilesIntoZip');
            if (options && options.throwExceptions !== undefined && !options.throwExceptions) {
                throw new Error(`${ValidationErrorEnums.NO_USEFUL_FILES_ERROR}: The filtered ZIP has not any file`);
            }
            return undefined;
        }
    }

    public addFileToZip(zip: any, path: string, data: Buffer, file: any) {
        zip.file(path, data, {comment: this.LANGUAGE_CODE || file.comment});
    }

    public async getValidPath(pathName: string, options?: ValidatorDatasourceOption): Promise<string | undefined> {
        const compatiblePath = this.extractCompatiblePath(pathName);
        return (options ? this.isPathMatching(compatiblePath, options) : this.isPathMatching(compatiblePath)) ? compatiblePath : undefined;
    }

    protected isPathMatching(pathName: string, options?: ValidatorDatasourceOption): boolean {
        let found = false;
        options && options.fileCodes
            ? options.fileCodes.forEach((code: FileCode) => (!found && RegExp('^' + code + '$').test(pathName)) && (found = true))
            : this.DEFAULT_FILE_CODES.forEach((code: FileCode) => (!found && RegExp('^' + code + '$').test(pathName)) && (found = true));
        return found;
    }

    protected extractCompatiblePath(path: string): string {
        const x: string[] = path.split('/');
        return (x[x.length - 2] + '/' + x[x.length - 1]);
    }
}
