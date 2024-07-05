import { GDPRDataSourceCode, FileExtension } from '../descriptor';
import { ValidatorFiles } from '../validator/validator.files';
import LoggerUtils from './logger.utils';
import { Unzipped, unzipSync } from 'fflate';
import { ValidatorObject } from '../validator/validator.object';
import { SelectorUtils } from './selector.utils';

export interface MonitoringFilesOptions {
    permittedFilesExtensions?: FileExtension[];
    throwExceptions?: boolean;
}

const logger = new LoggerUtils('Monitoring Service');

/**
 * The function return those files that don't have the expected structure
 * @param zipFile - file zip containing a datasource
 * @param code - code of the datasource
 */
export async function findChangesIntoFiles(
    zipFile: Uint8Array,
    code: GDPRDataSourceCode,
): Promise<string[] | undefined> {
    try {
        if (zipFile) {
            const files: Unzipped = unzipSync(zipFile);
            const validator = SelectorUtils.getValidator(code);
            const filesNotParsed: string[] = [];
            for (const filename in files) {
                if (!ValidatorObject.isDirectory(filename) && validator) {
                    const fileCode = validator.getFileCode(filename);
                    if (fileCode) {
                        const parsingResult =
                            await SelectorUtils.getParsingResult(
                                code,
                                filename,
                                fileCode,
                                files,
                            );
                        if (!parsingResult) {
                            logger.log(
                                'info',
                                `File \'${filename}\' can't be parsed`,
                                'findChangesIntoFiles',
                            );
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
        error &&
            error.message &&
            logger.log('error', error.message, 'findChangesIntoFiles');
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
export async function findNotMappedFiles(
    zipFile: Uint8Array,
    code: GDPRDataSourceCode,
    options: MonitoringFilesOptions = {},
): Promise<string[] | undefined> {
    try {
        if (zipFile) {
            const fileList = await ValidatorFiles.getPathsIntoZip(zipFile);
            if (fileList) {
                return fileList.filter((fileName: string) => {
                    if (options.permittedFilesExtensions) {
                        const fileExtension =
                            ValidatorFiles.getFileExtension(fileName);
                        if (fileExtension) {
                            if (
                                options.permittedFilesExtensions &&
                                !options.permittedFilesExtensions.includes(
                                    fileExtension,
                                )
                            ) {
                                return false;
                            }
                        } else {
                            logger.log(
                                'info',
                                `File extension not recognized for: \'${fileName}\'`,
                                'findNotMappedFiles',
                            );
                            return false;
                        }
                    }
                    return !isFilenameIntoEnum(fileName, code);
                });
            }
        }
    } catch (error: any) {
        error &&
            error.message &&
            logger.log('error', error.message, 'findNotMappedFiles');
        if (options.throwExceptions !== undefined && options.throwExceptions) {
            throw error;
        }
    }
    return undefined;
}

export function isFilenameIntoEnum(
    fileName: string,
    code: GDPRDataSourceCode,
): boolean {
    const validator = SelectorUtils.getValidator(code);
    if (validator) {
        const isValid = validator.getValidPath(fileName, {
            fileCodes: SelectorUtils.getAllEnumKeys(code),
        });
        return !!isValid;
    }
    return false;
}
