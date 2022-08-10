import {ServiceGoogle} from "../../src";

async function testGoogle(){
    await testService();
}

async function testService() {
    try {
        const {Parser} = require('../utils/parser');
        const path = require('path');
        const fs = require('fs');
        console.log(await ServiceGoogle.parseProfile(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/google/Takeout/Profile/Profilo.json`)))));
        console.log(await ServiceGoogle.parseBrowseHistory(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/google/Takeout/Chrome/BrowserHistory.json`)))));
        console.log(await ServiceGoogle.parseSearchEngines(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/google/Takeout/Chrome/SearchEngines.json`)))));
        console.log(await ServiceGoogle.parseImageData(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/google/Takeout/GooglePhoto/PhotosFrom2019/photo.mp4.json`)))));
        console.log(await ServiceGoogle.parseTransactions(await Parser.CSVToBuffer(path.join(__dirname, `../../src/mock/datasource files/google/Takeout/GooglePay/GoogleTransactions/transactions_123456.csv`))));
        console.log(await ServiceGoogle.parseDocLibrary(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/google/Takeout/GooglePlayStore/Library.json`)))));
        console.log(await ServiceGoogle.parsePurchaseHistory(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/google/Takeout/GooglePlayStore/PurchaseHistory.json`)))));
        console.log(await ServiceGoogle.parseOrderHistory(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/google/Takeout/GooglePlayStore/OrderHistory.json`)))));
        console.log(await ServiceGoogle.parseSemanticLocations(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/google/Takeout/LocationHistory/SemanticLocationHistory/2017/2017_APRIL.json`)))));
        console.log(await ServiceGoogle.parsePlayStoreReviews(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/google/Takeout/GooglePlayStore/Reviews.json`)))));
        console.log(await ServiceGoogle.parseMapsReviews(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/google/Takeout/Maps (I tuoi luoghi)/Recensioni.json`)))));
        console.log(await ServiceGoogle.parseGoogleAccount(Buffer.from(fs.readFileSync(path.resolve(__dirname, `../../src/mock/datasource files/google/Takeout/Google Account/davide.SubscriberInfo.html`)))));
    } catch (e: any) {
        if (e.code == 'MODULE_NOT_FOUND') {
            console.log('[Error not founding module] ' + e);
        } else {
            console.log(e);
        }
    }
}

testGoogle();
