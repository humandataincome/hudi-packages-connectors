import {
    DataSourceCode,
    FileExtension, ProcessorAmazon,
    ProcessorFacebook, ProcessorGoogle,
    ProcessorInstagram, ShopifyService, ValidatorAmazon,
    ValidatorFiles,
    ValidatorInstagram
} from "../src";
import ErrnoException = NodeJS.ErrnoException;

function testProcessing(){
    validatorAndProcessingInstagramTest();
    //validatorAndProcessingFacebookTest();
    //validatorAndProcessingAmazonTest();
    //validatorAndProcessingGoogleTest();
    //validatorAndProcessingShopifyTest();
}

function validatorAndProcessingInstagramTest() {
    try {
        const fs =  require('fs');
        const path =  require('path');
        fs.readFile(path.join(__dirname,"../src/mock/datasource zip files/ig_zh.zip"),async function(err:ErrnoException, data: Buffer) {
            if (err) throw err
            let validation = await ValidatorFiles.validateZIP(data,
                {
                    permittedFileExtensions: [FileExtension.ZIP, FileExtension.JSON, FileExtension.CSV, FileExtension.HTML],
                    filterDataSource: {
                        dataSourceCode: DataSourceCode.INSTAGRAM,
                    },
                    throwExceptions: true,
                });
            validation = await ValidatorInstagram.getInstance().filterFilesIntoZip(validation!);
            console.log(await ProcessorInstagram.aggregatorFactory(validation!, {
                timeIntervalDays: 180,
                throwExceptions: false,
            }));
        });
    } catch (e: any) {
        if (e.code == 'MODULE_NOT_FOUND') {
            console.log('[Error not founding module] ' + e);
        } else {
            console.log(e);
        }
    }
}


function validatorAndProcessingFacebookTest() {
    try {
        const fs =  require('fs');
        const path =  require('path');
        fs.readFile(path.join(__dirname,"../src/mock/datasource zip files/facebook.zip"),async function(err:ErrnoException, data: Buffer) {
            if (err) throw err;
            const validation1 = await ValidatorFiles.validateZIP(data,
                {
                    //permittedFileExtensions: [FileExtension.ZIP, FileExtension.JSON, FileExtension.CSV, FileExtension.HTML],
                    filterDataSource: {
                        dataSourceCode: DataSourceCode.FACEBOOK,
                    },
                    throwExceptions: true,
                });
            console.log(await ProcessorFacebook.aggregatorFactory(validation1!, {
                timeIntervalDays: 180,
                throwExceptions: false,
            }));
        });
    } catch (e: any) {
        if (e.code == 'MODULE_NOT_FOUND') {
            console.log('[Error not founding module] ' + e);
        } else {
            console.log(e);
        }
    }
}

function validatorAndProcessingAmazonTest() {
    try {
        const fs =  require('fs');
        const path =  require('path');
        fs.readFile(path.join(__dirname,"../src/mock/datasource zip files/amazon.zip"),async function(err:ErrnoException, data: Buffer) {
            if (err) throw err;
            const validation1 = await ValidatorFiles.validateZIP(data);
            const validation2 = await ValidatorAmazon.getInstance().filterFilesIntoZip(validation1!);
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
        fs.readFile(path.join(__dirname,"../src/mock/datasource zip files/google.zip"),async function(err:ErrnoException, data: Buffer) {
            if (err) throw err;
            const validation = await ValidatorFiles.validateZIP(data,
                {
                    permittedFileExtensions: [FileExtension.ZIP, FileExtension.JSON, FileExtension.CSV, FileExtension.HTML],
                    filterDataSource: {
                        dataSourceCode: DataSourceCode.GOOGLE,
                    }
                });
            //validation = await ValidatorGoogle.getInstance().filterFilesIntoZip(validation);
            console.log(await ProcessorGoogle.aggregatorFactory(validation!, {
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

function validatorAndProcessingShopifyTest() {
    try {
        const fs =  require('fs');
        const path =  require('path');
        fs.readFile(path.join(__dirname,"../src/mock/datasource files/shopify/customers_export_1.csv"),async function(err:ErrnoException, data: Buffer) {
            if (err) throw err;
            if(ValidatorFiles.validateCSV(data)) {
                console.log(await ShopifyService.parseCustomersExport(data));
            }
        });
        fs.readFile(path.join(__dirname,"../src/mock/datasource files/shopify/discounts_export_1.csv"),async function(err:ErrnoException, data: Buffer) {
            if (err) throw err;
            if(ValidatorFiles.validateCSV(data)) {
                console.log(await ShopifyService.parseDiscountsExport(data));
            }
        });
        fs.readFile(path.join(__dirname,"../src/mock/datasource files/shopify/orders_export_1.csv"),async function(err:ErrnoException, data: Buffer) {
            if (err) throw err;
            if(ValidatorFiles.validateCSV(data)) {
                console.log(await ShopifyService.parseOrdersExport(data));
            }
        });
        fs.readFile(path.join(__dirname,"../src/mock/datasource files/shopify/products_export_1.csv"),async function(err:ErrnoException, data: Buffer) {
            if (err) throw err;
            if(ValidatorFiles.validateCSV(data)) {
                console.log(await ShopifyService.parseProductsExport(data));
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
