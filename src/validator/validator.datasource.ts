import {FileCode, LanguageCode} from "../descriptor";
import {ValidationErrorEnums} from "./validator.error";
import {
    InputFileFormat,
} from "./index";
import Logger from "../utils/logger";

export type  ValidatorDatasourceOption = {
    fileCodes?: FileCode[] | string[];
    throwExceptions?: boolean;
    externalZip?: any;
}

export class ValidatorDatasource {
    private static _instance: ValidatorDatasource;
    protected readonly logger = new Logger("Datasource Validator");
    protected DEFAULT_FILE_CODES: FileCode[] = [];

    public static getInstance(): ValidatorDatasource {
        return this._instance || (this._instance = new this());
    }

    public async filterFilesIntoZip(zipFile: InputFileFormat, options?: ValidatorDatasourceOption): Promise<Buffer | undefined> {
        try {
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
                        filteredFiles.file(compatiblePath, data, {comment: file.comment});
                        (!hasAnyFile) && (hasAnyFile = true);
                    }
                }
            }
            if (hasAnyFile) {
                return await filteredFiles.generateAsync({type: "nodebuffer"});
            } else {
                throw new Error(`${ValidationErrorEnums.NO_USEFUL_FILES_ERROR}: The filtered ZIP has not any file`);
            }
        } catch (error: any) {
            (error && error.message) && (this.logger.log('error', error.message, 'filterFilesIntoZip'));
            if (options && options.throwExceptions !== undefined && options.throwExceptions) {
                throw error;
            }
        }
        return undefined;
    }

    public async getValidPath(pathName: string, options?: ValidatorDatasourceOption): Promise<string | undefined> {
        const compatiblePath = this.extractCompatiblePath(pathName);
        return (options ? this.isPathMatching(compatiblePath, options) : this.isPathMatching(compatiblePath)) ? compatiblePath : undefined;
    }

    protected isPathMatching(pathName: string, options?: ValidatorDatasourceOption): boolean {
        let found = false;
        options && options.fileCodes
            ? options.fileCodes.forEach((code: FileCode | string) => (!found && RegExp('^' + code + '$').test(pathName)) && (found = true))
            : this.DEFAULT_FILE_CODES.forEach((code: FileCode | string) => (!found && RegExp('^' + code + '$').test(pathName)) && (found = true));
        return found;
    }

    protected extractCompatiblePath(path: string): string {
        const x: string[] = path.split('/');
        if (x.length > 1) {
            return (x[x.length - 2] + '/' + x[x.length - 1]);
        }
        return path;
    }

    public async getLanguage(options: ValidatorDatasourceOption): Promise<LanguageCode | undefined> {
        return undefined;
    }
}
