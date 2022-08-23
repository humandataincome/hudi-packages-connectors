import {ServiceShopify} from "../../../src";

describe('Shopify Service test', () => {
    const path = require('path');
    const {Parser} = require("../../utils/parser");

    test('parseCustomersExport', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/shopify/customers_export_1.csv`;
        const result = await ServiceShopify.parseCustomersExport(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'email@cliente.com';
        expect(JSON.stringify(result!.list[0].email)).toBe(JSON.stringify(expected));
    });
    test('parseDiscountsExport', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/shopify/discounts_export_1.csv`;
        const result = await ServiceShopify.parseDiscountsExport(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'test-sconto';
        expect(JSON.stringify(result!.list[0].name)).toBe(JSON.stringify(expected));
    });
    test('parseOrdersExport', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/shopify/orders_export_1.csv`;
        const result = await ServiceShopify.parseOrdersExport(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = '4062854643852';
        expect(JSON.stringify(result!.list[0].id)).toBe(JSON.stringify(expected));
    });
    test('parseProductsExport', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/shopify/products_export_1.csv`;
        const result = await ServiceShopify.parseProductsExport(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'test product 2';
        expect(JSON.stringify(result!.list[0].title)).toBe(JSON.stringify(expected));
    });
});

