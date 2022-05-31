import {
    DataSourceCode,
    FileCodeAmazon,
    ProcessorInstagram,
    ValidationErrorEnums,
    ValidatorFiles,
    ValidatorInstagram
} from "../src";
import ErrnoException = NodeJS.ErrnoException;
import {StreamZipping} from "../src/streamZipping";

async function testValidation(){
    validateStream();
    //validatingTest();
    //validatingBigFileTest();
    //mergingTest();
    //await sequentialValidationsProcessingTest();
}

async function validateStream() {
    const fs = require('fs');
    const path = require('path');
    const x = await StreamZipping.validateZipStream(path.join(__dirname,"../src/mock/datasource zip files/ds2.zip"));


    //console.log(await ValidatorFiles.getPathsIntoZip(x))
    /*
    const fs = require('fs');
    const path = require('path');
    const writableStream = fs.createWriteStream(path.join(__dirname, "../src/mock/datasource zip files/ds3.zip"));

    const readableStream = fs.createReadStream(path.join(__dirname,"../src/mock/datasource zip files/facebook.zip"));
    let bufferChunks: Buffer[] = [];
    readableStream.on('error', function (error: Error) {
        console.log(`error: ${error.message}`);
    });
    readableStream.on('data', (chunk: Buffer) => {
        bufferChunks.push(chunk);
    });
    readableStream.on('end', async () => {
        const zip: JSZip = await JSZip.loadAsync(Buffer.concat(bufferChunks));
        await StreamZipping.validateZipStream(zip, writableStream);
    });

     */
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
function validatingBigFileTest() {
    const fs = require('fs');
    const path =  require('path');
    const readableStream = fs.createReadStream(path.join(__dirname,"../src/mock/datasource zip files/ds1.zip"));
    let bufferChunks: Buffer[] = [];

    readableStream.on('error', function (error: Error) {
        console.log(`error: ${error.message}`);
    });
    readableStream.on('data', (chunk: Buffer) => {
        bufferChunks.push(chunk);
    });
    readableStream.on('end', async () => {
        const zipFile = Buffer.concat(bufferChunks);
        ValidatorFiles.MAX_BYTE_FILE_SIZE = 10e10;
        ValidatorFiles.MIN_BYTE_FILE_SIZE = 1;
        const zip = await ValidatorFiles.validateZip(zipFile,
            {
            });
        console.log(await ValidatorFiles.getPathsIntoZip(zip!.zipFile));
    });

}

function validatingTest() {
    try {
        const fs =  require('fs');
        const path =  require('path');
        fs.readFile(path.join(__dirname,"../src/mock/datasource zip files/facebook.zip"),async function(err:ErrnoException, data: Buffer) {
            await (await ValidatorFiles.getPathsIntoZip(data))!.forEach((pathName) => console.log(pathName));
            if (err) {
                console.log(err)
            }
            ValidatorFiles.MAX_BYTE_FILE_SIZE = 10e10;
            ValidatorFiles.MIN_BYTE_FILE_SIZE = 1;
            const code = DataSourceCode.FACEBOOK;
            const zip = await ValidatorFiles.validateZip(data,
                {
                    filterDataSource: {
                        dataSourceCode: code
                    }
                });
            console.log(await ValidatorFiles.getPathsIntoZip(zip!.zipFile));
            const filteredZip = await ValidatorFiles.validatorSelector(code)!.filterFilesIntoZip(zip!.zipFile, {fileCodes: ['Advertising.3/Advertising.AdvertiserAudiences.csv', FileCodeAmazon.ADV_CLICKS]})
            console.log(await ValidatorFiles.getPathsIntoZip(filteredZip!));
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
