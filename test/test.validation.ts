import {DataSourceCode, ProcessorInstagram, ValidationErrorEnums, ValidatorFiles, ValidatorInstagram} from "../src";
import ErrnoException = NodeJS.ErrnoException;

async function testValidation(){
    //validatingTest();
    mergingTest();
    //await sequentialValidationsProcessingTest();
}

function mergingTest() {
    try {
        const fs =  require('fs');
        const path =  require('path');
        fs.readFile(path.join(__dirname,"../src/mock/datasource zip files/google.zip"),async function(err:ErrnoException, data1: Buffer) {
            const validation1 = await ValidatorFiles.validateZip(data1,
                {
                    filterDataSource: {
                        dataSourceCode: DataSourceCode.GOOGLE,
                    }
                });
            fs.readFile(path.join(__dirname,"../src/mock/datasource zip files/instagram.zip"),async function(err:ErrnoException, data2: Buffer) {
                const validation2 = await ValidatorFiles.validateZip(data2,
                    {
                        filterDataSource: {
                            dataSourceCode: DataSourceCode.INSTAGRAM,
                        }
                    });
                fs.readFile(path.join(__dirname,"../src/mock/datasource zip files/amazon.zip"),async function(err:ErrnoException, data3: Buffer) {
                    const validation3 = await ValidatorFiles.validateZip(data3,
                        {
                            filterDataSource: {
                                dataSourceCode: DataSourceCode.AMAZON,
                            }
                        });
                    const mergedFile = await ValidatorFiles.mergeZipFiles([validation1!.zipFile, validation2!.zipFile, validation3!.zipFile]);
                    console.log(await ValidatorFiles.getPathsIntoZip(mergedFile!));
                });
            });
        });
    } catch (e: any) {
        if(e.message === `${ValidationErrorEnums.NO_USEFUL_FILES_ERROR}: The filtered ZIP has not any file`) {
            console.error('The filtered ZIP has not any file');
        } else if (`${ValidationErrorEnums.LANGUAGE_ERROR}: The ZIP file has not a recognizable Language to be corrected parsed`) {
            console.error('The ZIP file has not a recognizable Language to be corrected parsed');
        } else if (e.code == 'MODULE_NOT_FOUND') {
            console.error('[Error not founding module] ' + e);
        } else {
            console.error(e);
        }
    }
}

function validatingTest() {
    try {
        const fs =  require('fs');
        const path =  require('path');
        fs.readFile(path.join(__dirname,"../src/mock/datasource zip files/ig_fr.zip"),async function(err:ErrnoException, data: Buffer) {
            //await (await ValidatorFiles.getPathsIntoZip(data))!.forEach((pathName) => console.log(pathName));
            ValidatorFiles.MAX_BYTE_FILE_SIZE = 10e10;
            ValidatorFiles.MIN_BYTE_FILE_SIZE = 1;
            const x = await ValidatorFiles.validateZip(data, {
                filterDataSource: {
                    dataSourceCode: DataSourceCode.AMAZON,
                }
            });
            console.log(x);
            //console.log(await ValidatorFiles.getPathsIntoZip(x!.zipFile));
        });
    } catch (e: any) {
        if(e.message === `${ValidationErrorEnums.NO_USEFUL_FILES_ERROR}: The filtered ZIP has not any file`) {
            console.error('The filtered ZIP has not any file');
        } else if (`${ValidationErrorEnums.LANGUAGE_ERROR}: The ZIP file has not a recognizable Language to be corrected parsed`) {
            console.error('The ZIP file has not a recognizable Language to be corrected parsed');
        } else if (e.code == 'MODULE_NOT_FOUND') {
            console.error('[Error not founding module] ' + e);
        } else {
            console.error(e);
        }
    }
}
async function sequentialValidationsProcessingTest() {
    const x = [
        "../src/mock/datasource zip files/ig_ita.zip",
        "../src/mock/datasource zip files/ig_fr.zip",
        "../src/mock/datasource zip files/ig_zh.zip",
        "../src/mock/datasource zip files/ig_de.zip",
        "../src/mock/datasource zip files/ig_en.zip"
    ];
    for (const path of x) {
        await _sequentialValidationsProcessingTest(path);
    }
}

async function _sequentialValidationsProcessingTest(pathName: string) {
    try {
        const fs = require('fs');
        const path = require('path');
        fs.readFile(path.join(__dirname, pathName), async function (err: ErrnoException, data: Buffer) {
            let validationZip = await ValidatorFiles.validateZip(data,
                {
                    filterDataSource: {
                        dataSourceCode: DataSourceCode.INSTAGRAM,
                    },
                    throwExceptions: false,
                }
            );
            const validation = await ValidatorInstagram.getInstance().filterFilesIntoZip(validationZip!.zipFile, {throwExceptions: false});
            console.log(await ProcessorInstagram.aggregatorFactory(validation!, { timeIntervalDays: 180}));
        });
    } catch (e: any) {
        if (e.message === `${ValidationErrorEnums.NO_USEFUL_FILES_ERROR}: The filtered ZIP has not any file`) {
            console.error('The filtered ZIP has not any file');
        } else if (`${ValidationErrorEnums.LANGUAGE_ERROR}: The ZIP file has not a recognizable Language to be corrected parsed`) {
            console.error('The ZIP file has not a recognizable Language to be corrected parsed');
        } else if (e.code == 'MODULE_NOT_FOUND') {
            console.error('[Error not founding module] ' + e);
        } else {
            console.error(e);
        }
    }
}
testValidation();
