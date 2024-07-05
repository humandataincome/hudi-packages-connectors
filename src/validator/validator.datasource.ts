import { FileCode, LanguageCode } from '../descriptor';
import LoggerUtils from '../utils/logger.utils';
import { Unzipped, unzipSync, zipSync } from 'fflate';
import { ValidatorObject } from './validator.object';
import { FileCodeAmazon } from '../source';
import { ValidationErrorEnum } from '../enums';

export type ValidatorDatasourceOption = {
    fileCodes?: FileCode[] | string[];
    throwExceptions?: boolean;
    externalZip?: any;
};

export class ValidatorDatasource {
    private static _instance: ValidatorDatasource;
    protected readonly logger = new LoggerUtils('Datasource Validator');
    protected DEFAULT_FILE_CODES: FileCode[] = [];

    public static getInstance(): ValidatorDatasource {
        // eslint-disable-next-line no-underscore-dangle
        return this._instance || (this._instance = new this());
    }

    get defaultFileCodes(): FileCode[] {
        return this.DEFAULT_FILE_CODES;
    }

    public async filterFilesIntoZip(
        zipFile: Uint8Array,
        options?: ValidatorDatasourceOption,
    ): Promise<Uint8Array | undefined> {
        try {
            let hasAnyFile = false;
            let filteredFiles: Unzipped = {};
            const files = unzipSync(zipFile);
            for (const pathName in files) {
                const file = files[pathName];
                if (!ValidatorObject.isDirectory(pathName)) {
                    const compatiblePath =
                        options && options.fileCodes
                            ? await this.getValidPath(pathName, options)
                            : await this.getValidPath(pathName);
                    if (compatiblePath) {
                        filteredFiles = {
                            ...filteredFiles,
                            ...{ [pathName]: file },
                        };
                        !hasAnyFile && (hasAnyFile = true);
                    }
                }
            }
            if (hasAnyFile) {
                return zipSync(filteredFiles);
            } else {
                throw new Error(
                    `${ValidationErrorEnum.NO_USEFUL_FILES_ERROR}: the filtered zip file has not any valid file`,
                );
            }
        } catch (error: any) {
            error &&
                error.message &&
                this.logger.log('error', error.message, 'filterFilesIntoZip');
            if (
                options &&
                options.throwExceptions !== undefined &&
                options.throwExceptions
            ) {
                throw error;
            }
        }
        return undefined;
    }

    public getValidPath(
        pathName: string,
        options?: ValidatorDatasourceOption,
    ): string | undefined {
        const compatiblePath = this.extractCompatiblePath(pathName);
        return this.isPathMatching(compatiblePath, options)
            ? compatiblePath
            : undefined;
    }

    protected isPathMatching(
        pathName: string,
        options?: ValidatorDatasourceOption,
    ): boolean {
        let found = false;
        options && options.fileCodes
            ? options.fileCodes.forEach(
                  (code: FileCode | string) =>
                      !found &&
                      RegExp('^' + code + '$').test(pathName) &&
                      (found = true),
              )
            : this.DEFAULT_FILE_CODES.forEach(
                  (code: FileCode | string) =>
                      !found &&
                      RegExp('^' + code + '$').test(pathName) &&
                      (found = true),
              );
        return found;
    }

    protected extractCompatiblePath(path: string): string {
        const x: string[] = path.split('/');
        if (x.length > 1) {
            return x[x.length - 2] + '/' + x[x.length - 1];
        }
        return path;
    }

    public async getLanguage(
        pathName: string,
        file: any,
        options: ValidatorDatasourceOption = {},
    ): Promise<LanguageCode | undefined> {
        return LanguageCode.ENGLISH;
    }

    public getFileCode(
        pathName: string,
        options: ValidatorDatasourceOption = {},
    ): string | undefined {
        const compatiblePath = this.extractCompatiblePath(pathName);
        return options.fileCodes && options.fileCodes.length > 0
            ? Object.keys(options.fileCodes).find(
                  (code: FileCodeAmazon | string) =>
                      RegExp('^' + code + '$').test(compatiblePath),
              )
            : Object.keys(this.defaultFileCodes).find(
                  (code: FileCodeAmazon | string) =>
                      RegExp('^' + code + '$').test(compatiblePath),
              );
    }
}
