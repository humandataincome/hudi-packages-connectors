import {DataSourceCode, ProcessorInstagram, ValidationErrorEnums, ValidatorFiles, ValidatorInstagram} from "../src";
import ErrnoException = NodeJS.ErrnoException;

async function testValidation(){
    validatingTest()
    await sequentialValidationsProcessingTest();
}


function validatingTest() {
    try {
        const fs =  require('fs');
        const path =  require('path');
        fs.readFile(path.join(__dirname,"../src/mock/datasource zip files/google_en.zip"),async function(err:ErrnoException, data: Buffer) {
            //await (await ValidatorFiles.getPathsIntoZip(data))!.forEach((pathName) => console.log(pathName));
            ValidatorFiles.MAX_BYTE_FILE_SIZE = 10e8;
            ValidatorFiles.MIN_BYTE_FILE_SIZE = -1;
            const validation1 = await ValidatorFiles.validateZIP(data,
                {
                    filterDataSource: {
                        dataSourceCode: DataSourceCode.GOOGLE,
                    }
                });
            console.log();
            await (await ValidatorFiles.getPathsIntoZip(validation1!))!.forEach((pathName) => console.log(pathName));
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
            let validation1 = await ValidatorFiles.validateZIP(data,
                {
                    filterDataSource: {
                        dataSourceCode: DataSourceCode.INSTAGRAM,
                    },
                    throwExceptions: false,
                }
            );
            validation1 = await ValidatorInstagram.getInstance().filterFilesIntoZip(validation1!, {throwExceptions: false});
            console.log(await ProcessorInstagram.aggregatorFactory(validation1!, { timeIntervalDays: 180}));
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
