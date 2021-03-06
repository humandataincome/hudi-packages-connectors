import {
    DataSourceCode,
    FileCodeAmazon, ProcessorAmazon, ProcessorFacebook, ProcessorGoogle,
    ProcessorInstagram,
    ValidationErrorEnum, ValidatorFiles,
    ValidatorInstagram
} from "../src";
import ErrnoException = NodeJS.ErrnoException;
import {
    ReadableStream
} from 'node:stream/web';

async function testValidation(){
    //await validateStream();
    //await validateZippingFiles();
    validatingTest();
    //validatingBigFileTest();
    //mergingTest();
    //await sequentialValidationsProcessingTest();
}

async function validateZippingFiles() {
    const fs = require('fs');
    const path = require('path');
    fs.readFile(path.join(__dirname,"../src/mock/datasource files/amazon/Advertising.2/Advertising.AdvertiserAudiences.csv"),async function(err:ErrnoException, data1: Buffer) {
        fs.readFile(path.join(__dirname,"../src/mock/datasource files/amazon/Digital-Ordering.2/Digital Items.csv"),async function(err:ErrnoException, data2: Buffer) {
            console.log(await ValidatorFiles.getPathsIntoZip(ValidatorFiles.zipFiles({
                'amazon/Advertising.2/Advertising.AdvertiserAudiences.csv': data1,
                'amazon/Digital-Ordering.2/Digital Items.csv': data2
            })));
        });
    });
}

async function validateStream() {
    const fs = require('fs');
    const path = require('path');
    const readStream = fs.createReadStream(
        path.join(__dirname,"../src/mock/datasource zip files/ds2.zip"));
    const readableStream = new ReadableStream({
        async start(controller) {
            readStream.on("data", (chunk: Buffer|string) => {
                controller.enqueue(chunk);
            });
            readStream.on("end", () => controller.close());
            readStream.on("error", () => controller.error());
        }
    });
    let x = await ValidatorFiles.validateZipStream(readableStream, {
        filterDataSource: {
            dataSourceCode: DataSourceCode.AMAZON
        },
    throwExceptions: true});
    console.log(x);
}

function mergingTest() {
    try {
        const fs =  require('fs');
        const path =  require('path');
        fs.readFile(path.join(__dirname,"../src/mock/datasource zip files/ds2.zip"),async function(err:ErrnoException, data1: Buffer) {
            const validation1 = await ValidatorFiles.validateZip(data1,{maxBytesZipFile: 3e9, filterDataSource: {
                    dataSourceCode: DataSourceCode.FACEBOOK,
                }});
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
                    const mergedFile = await ValidatorFiles.mergeZipFiles([validation1!.zipFile, validation2!.zipFile, validation3!.zipFile], {throwExceptions: true, maxBytesZipFile: 3e9});
                    console.log(await ValidatorFiles.getPathsIntoZip(mergedFile!));
                });
            });
        });
    } catch (e: any) {
        if(e.message === `${ValidationErrorEnum.NO_USEFUL_FILES_ERROR}: The filtered ZIP has not any file`) {
            console.error('The filtered ZIP has not any file');
        } else if (`${ValidationErrorEnum.LANGUAGE_ERROR}: The ZIP file has not a recognizable Language to be corrected parsed`) {
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
    const readableStream = fs.createReadStream(path.join(__dirname,"../src/mock/datasource zip files/facebook.zip"));
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
        fs.readFile(path.join(__dirname,"../src/mock/datasource zip files/ds2.zip"),async function(err:ErrnoException, data: Buffer) {
            //await (await ValidatorFiles.getPathsIntoZip(data))!.forEach((pathName) => console.log(pathName));
            if (err) {
                console.log(err)
            }
            const code = DataSourceCode.AMAZON;
            const zip = await ValidatorFiles.validateZip(data,
                {
                    filterDataSource: {
                        dataSourceCode: code
                    }
                }
                );
            console.log(zip);
        });
    } catch (e: any) {
        if(e.message === `${ValidationErrorEnum.NO_USEFUL_FILES_ERROR}: The filtered ZIP has not any file`) {
            console.error('The filtered ZIP has not any file');
        } else if (`${ValidationErrorEnum.LANGUAGE_ERROR}: The ZIP file has not a recognizable Language to be corrected parsed`) {
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
        if (e.message === `${ValidationErrorEnum.NO_USEFUL_FILES_ERROR}: The filtered ZIP has not any file`) {
            console.error('The filtered ZIP has not any file');
        } else if (`${ValidationErrorEnum.LANGUAGE_ERROR}: The ZIP file has not a recognizable Language to be corrected parsed`) {
            console.error('The ZIP file has not a recognizable Language to be corrected parsed');
        } else if (e.code == 'MODULE_NOT_FOUND') {
            console.error('[Error not founding module] ' + e);
        } else {
            console.error(e);
        }
    }
}
testValidation();
