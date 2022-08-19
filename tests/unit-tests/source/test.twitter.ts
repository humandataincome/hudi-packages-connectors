import {ServiceTwitter} from "../../../src";

async function testTwitter(){
    await testService();
}

async function testService() {
    try {
        const fs = require('fs');
        const path = require("path");
        fs.readFile(path.join(__dirname, `../../src/mock/datasource/raw files/twitter/data/account.js`), async function (err: any, buffer: Buffer) {
            console.log(await ServiceTwitter.parseAccount(buffer));
        });
    } catch (e: any) {
        if (e.code == 'MODULE_NOT_FOUND') {
            console.log('[Error not founding module] ' + e);
        } else {
            console.log(e);
        }
    }
}

testTwitter();
