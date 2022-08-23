import {ServiceTwitter} from "../../../src";

describe('Shopify Service test', () => {
    const fs = require('fs');
    const path = require("path");

    test('parseCustomersExport', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/twitter/data/account.js`;
        const result = await ServiceTwitter.parseAccount(fs.readFileSync(path.join(__dirname, pathToFile)));
        const expected = 'Giovanni';
        expect(JSON.stringify(result!.accountDisplayName)).toBe(JSON.stringify(expected));
    });
});
