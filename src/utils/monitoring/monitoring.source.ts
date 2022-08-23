import {
    DataSourceCode,
    FileExtension
} from "../../descriptor";
import {ValidatorFiles} from "../validator/validator.files";
import Logger from "../logger";
import {Unzipped, unzipSync} from "fflate";
import {ValidatorObject} from "../validator/validator.object";
import {Selector} from "../selector";

export interface MonitoringFilesOptions {
    permittedFilesExtensions?: FileExtension[];
    throwExceptions?: boolean;
}

export class MonitoringService {
    private static readonly logger = new Logger("Monitoring Service");

    /**
     * The function return those files that don't have the expected structure
     * @param zipFile - file zip containing a datasource
     * @param code - code of the datasource
     */
    public static async findChangesIntoFiles(zipFile: Uint8Array, code: DataSourceCode): Promise<string[] | undefined> {
        try {
            if (zipFile) {
                const files: Unzipped = unzipSync(zipFile);
                const validator = Selector.getValidator(code);
                const filesNotParsed: string[] = [];
                for (let filename in files) {
                    if (!ValidatorObject.isDirectory(filename) && validator) {
                        const fileCode = validator.getFileCode(filename);
                        if (fileCode) {
                            let parsingResult = await Selector.getParsingResult(code, filename, fileCode, files);
                            if (!parsingResult) {
                                this.logger.log('info', `File \'${filename}\' can't be parsed`, 'findChangesIntoFiles');
                                filesNotParsed.push(filename);
                            } else {
                                //TODO: must detect little changes into the file structure
                            }
                        }
                    }
                }
                return filesNotParsed;
            }
        } catch (error: any) {
            (error && error.message) && (this.logger.log('error', error.message, 'findChangesIntoFiles'));
            throw error;
        }
        return undefined;
    }


    /**
     * The function return those files that don't have a corresponding enumeration code
     * @param zipFile - file zip containing a datasource
     * @param code - code of the datasource
     * @param options
     */
    public static async findNotMappedFiles(zipFile: Uint8Array, code: DataSourceCode, options: MonitoringFilesOptions = {}): Promise<string[] | undefined> {
        try {
            if (zipFile) {
                const fileList = await ValidatorFiles.getPathsIntoZip(zipFile);
                if (fileList) {
                    return fileList.filter((fileName: string) => {
                        if (options.permittedFilesExtensions) {
                            const fileExtension = ValidatorFiles.getFileExtension(fileName);
                            if (fileExtension) {
                                if (options.permittedFilesExtensions && !options.permittedFilesExtensions.includes(fileExtension)) {
                                    return false;
                                }
                            } else {
                                this.logger.log('info', `File extension not recognized for: \'${fileName}\'`, 'findNotMappedFiles');
                                return false;
                            }
                        }
                        return !this.isFilenameIntoEnum(fileName, code);
                    });
                }
            }
        } catch (error: any) {
            (error && error.message) && (this.logger.log('error', error.message, 'findNotMappedFiles'));
            if (options.throwExceptions !== undefined && options.throwExceptions) {
                throw error;
            }
        }
        return undefined;
    }

    private static isFilenameIntoEnum(fileName: string, code: DataSourceCode): boolean {
        const validator = Selector.getValidator(code);
        if (validator) {
            const isValid = validator.getValidPath(fileName, {fileCodes: Selector.getAllEnumKeys(code)});
            return !!isValid;
        }
        return false;
    }

}

