import {ShopifyService} from "../src";

async function testShopify(){
    await testService();
}

async function testService() {
    try {
        const path = require('path');
        const {Parser} = require('./utils/parser');
        console.log(await ShopifyService.parseCustomersExport(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/shopify/customers_export_1.csv`))));
        console.log(await ShopifyService.parseDiscountsExport(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/shopify/discounts_export_1.csv`))));
        console.log(await ShopifyService.parseOrdersExport(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/shopify/orders_export_1.csv`))));
        console.log(await ShopifyService.parseProductsExport(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/shopify/products_export_1.csv`))));
    } catch (e: any) {
        if (e.code == 'MODULE_NOT_FOUND') {
            console.log('[Error not founding module] ' + e);
        } else {
            console.log(e);
        }
    }
}

testShopify();
