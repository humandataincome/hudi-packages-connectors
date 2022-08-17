import {
    ActivityTypeGO,
    DataSourceCode,
    FileExtension, ProcessorAmazon,
    ProcessorFacebook, ProcessorGoogle,
    ProcessorInstagram, ServiceShopify, ValidatorAmazon,
    ValidatorFiles,
    ValidatorInstagram,
    InstagramDataAggregator
} from "../src";
import ErrnoException = NodeJS.ErrnoException;

function testProcessing(){
    //validatorAndProcessingInstagramTest();
    validatorAndProcessingFacebookTest();
    //validatorAndProcessingAmazonTest();
    //validatorAndProcessingGoogleTest();
    //validatorAndProcessingShopifyTest();
}

function validatorAndProcessingInstagramTest() {
    try {
        const fs =  require('fs');
        const path =  require('path');
        fs.readFile(path.join(__dirname,"../src/mock/datasource/zip files/instagram.zip"),async function(err:ErrnoException, data: Uint8Array) {
            if (err) throw err
            const validation = await ValidatorFiles.validateZip(data,
                {
                    filterDataSource: {
                        dataSourceCode: DataSourceCode.INSTAGRAM,
                    },
                });
            const processed = await ProcessorInstagram.aggregatorFactory(validation!.zipFile, {
                timeIntervalDays: 365,
                maxEntitiesPerArray: 1000,
            });
            let str = JSON.stringify(processed, null, 2);
            fs.writeFile(path.join(__dirname,"../src/mock/datasource/processing/aggregator_instagram.json"), str, (err: any) => { if (err) throw err; });
            console.log('File size: ',new TextEncoder().encode(str).length);
        });
    } catch (e) {
        console.log(e);
    }
}


function validatorAndProcessingFacebookTest() {
    try {
        const fs =  require('fs');
        const path =  require('path');
        fs.readFile(path.join(__dirname,"../src/mock/datasource/zip files/facebook.zip"),async function(err:ErrnoException, data: Buffer) {
            if (err) throw err;
            const validation1 = await ValidatorFiles.validateZip(data,
                {
                    //permittedFileExtensions: [FileExtension.ZIP, FileExtension.JSON, FileExtension.CSV, FileExtension.HTML],
                    filterDataSource: {
                        dataSourceCode: DataSourceCode.FACEBOOK,
                    },
                    throwExceptions: true,
                });
            const processed = await ProcessorFacebook.aggregatorFactory(validation1!.zipFile, {
                timeIntervalDays: 180,
                throwExceptions: false,
            });
            let str = JSON.stringify(processed, null, 2);
            fs.writeFile(path.join(__dirname,"../src/mock/datasource/processing/aggregator_facebook.json"), str, (err: any) => { if (err) throw err; });
            console.log('File size: ', new TextEncoder().encode(str).length);
        });
    } catch (e) {
        console.log(e);
    }
}

function validatorAndProcessingAmazonTest() {
    try {
        const fs =  require('fs');
        const path =  require('path');
        fs.readFile(path.join(__dirname,"../src/mock/datasource/zip files/amazon.zip"),async function(err:ErrnoException, data: Buffer) {
            if (err) throw err;
            const validation1 = await ValidatorFiles.validateZip(data);
            const validation2 = await ValidatorAmazon.getInstance().filterFilesIntoZip(validation1!.zipFile);
            console.log(await ProcessorAmazon.aggregatorFactory(validation2!, {
                timeIntervalDays: 180,
                throwExceptions: false,
            }))
        });
    } catch (e: any) {
        if (e.code == 'MODULE_NOT_FOUND') {
            console.log('[Error not founding module] ' + e);
        } else {
            console.log(e);
        }
    }
}

function validatorAndProcessingGoogleTest() {
    try {
        const fs =  require('fs');
        const path =  require('path');
        fs.readFile(path.join(__dirname,"../src/mock/datasource/zip files/google_en.zip"),async function(err:ErrnoException, data: Buffer) {
            if (err) throw err;
            const validation = await ValidatorFiles.validateZip(data,
                {
                    permittedFileExtensions: [FileExtension.ZIP, FileExtension.JSON, FileExtension.CSV, FileExtension.HTML],
                    filterDataSource: {
                        dataSourceCode: DataSourceCode.GOOGLE,
                    }
                });
            //validation = await ValidatorGoogle.getInstance().filterFilesIntoZip(validation);
            const x = await ProcessorGoogle.aggregatorFactory(validation!.zipFile, {
                timeIntervalDays: 365,
                throwExceptions: false,
            });
            console.log(x);
        });
    } catch (e: any) {
        if (e.code == 'MODULE_NOT_FOUND') {
            console.log('[Error not founding module] ' + e);
        } else {
            console.log(e);
        }
    }
}

function validatorAndProcessingShopifyTest() {
    try {
        const fs =  require('fs');
        const path =  require('path');
        fs.readFile(path.join(__dirname,"../src/mock/datasource/raw files/shopify/customers_export_1.csv"),async function(err:ErrnoException, data: Buffer) {
            if (err) throw err;
            if(ValidatorFiles.validateCSV(data)) {
                console.log(await ServiceShopify.parseCustomersExport(data));
            }
        });
        fs.readFile(path.join(__dirname,"../src/mock/datasource/raw files/shopify/discounts_export_1.csv"),async function(err:ErrnoException, data: Buffer) {
            if (err) throw err;
            if(ValidatorFiles.validateCSV(data)) {
                console.log(await ServiceShopify.parseDiscountsExport(data));
            }
        });
        fs.readFile(path.join(__dirname,"../src/mock/datasource/raw files/shopify/orders_export_1.csv"),async function(err:ErrnoException, data: Buffer) {
            if (err) throw err;
            if(ValidatorFiles.validateCSV(data)) {
                console.log(await ServiceShopify.parseOrdersExport(data));
            }
        });
        fs.readFile(path.join(__dirname,"../src/mock/datasource/raw files/shopify/products_export_1.csv"),async function(err:ErrnoException, data: Buffer) {
            if (err) throw err;
            if(ValidatorFiles.validateCSV(data)) {
                console.log(await ServiceShopify.parseProductsExport(data));
            }
        });
    } catch (e: any) {
        if (e.code == 'MODULE_NOT_FOUND') {
            console.log('[Error not founding module] ' + e);
        } else {
            console.log(e);
        }
    }
}

testProcessing();
