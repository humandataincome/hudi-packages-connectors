import {ServiceShopify} from "../../../src";

async function testShopify(){
    await testService();
}

async function testService() {
    try {
        const path = require('path');
        const {Parser} = require('../../utils/parser');
        console.log(await ServiceShopify.parseCustomersExport(await Parser.CSVToBuffer(path.join(__dirname, `../../src/mock/datasource/raw files/shopify/customers_export_1.csv`))));
        console.log(await ServiceShopify.parseDiscountsExport(await Parser.CSVToBuffer(path.join(__dirname, `../../src/mock/datasource/raw files/shopify/discounts_export_1.csv`))));
        console.log(await ServiceShopify.parseOrdersExport(await Parser.CSVToBuffer(path.join(__dirname, `../../src/mock/datasource/raw files/shopify/orders_export_1.csv`))));
        console.log(await ServiceShopify.parseProductsExport(await Parser.CSVToBuffer(path.join(__dirname, `../../src/mock/datasource/raw files/shopify/products_export_1.csv`))));
    } catch (e: any) {
        if (e.code == 'MODULE_NOT_FOUND') {
            console.log('[Error not founding module] ' + e);
        } else {
            console.log(e);
        }
    }
}

testShopify();
