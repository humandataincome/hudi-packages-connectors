import {GoogleService} from "../../src";
async function testGoogle(){
    await testService();
}

async function testService() {
    try {
        const {Parser} = require('../utils/parser');
        const path = require('path');
        const fs = require('fs');
        console.log(await GoogleService.parseProfile(Buffer.from(JSON.stringify(require(`src/mock/datasource files/google/Takeout/Profile/Profilo.json`)))));
        console.log(await GoogleService.parseBrowseHistory(Buffer.from(JSON.stringify(require(`src/mock/datasource files/google/Takeout/Chrome/BrowserHistory.json`)))));
        console.log(await GoogleService.parseSearchEngines(Buffer.from(JSON.stringify(require(`src/mock/datasource files/google/Takeout/Chrome/SearchEngines.json`)))));
        console.log(await GoogleService.parseImageData(Buffer.from(JSON.stringify(require(`src/mock/datasource files/google/Takeout/GooglePhoto/PhotosFrom2019/photo.mp4.json`)))));
        console.log(await GoogleService.parseTransactions(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/google/Takeout/GooglePay/GoogleTransactions/transactions_123456.csv`))));
        console.log(await GoogleService.parseDocLibrary(Buffer.from(JSON.stringify(require(`src/mock/datasource files/google/Takeout/GooglePlayStore/Library.json`)))));
        console.log(await GoogleService.parsePurchaseHistory(Buffer.from(JSON.stringify(require(`src/mock/datasource files/google/Takeout/GooglePlayStore/PurchaseHistory.json`)))));
        console.log(await GoogleService.parseOrderHistory(Buffer.from(JSON.stringify(require(`src/mock/datasource files/google/Takeout/GooglePlayStore/OrderHistory.json`)))));
        console.log(await GoogleService.parseSemanticLocations(Buffer.from(JSON.stringify(require(`src/mock/datasource files/google/Takeout/LocationHistory/SemanticLocationHistory/2017/2017_APRIL.json`)))));
        console.log(await GoogleService.parsePlayStoreReviews(Buffer.from(JSON.stringify(require(`src/mock/datasource files/google/Takeout/GooglePlayStore/Reviews.json`)))));
        console.log(await GoogleService.parseMapsReviews(Buffer.from(JSON.stringify(require(`src/mock/datasource files/google/Takeout/Maps (I tuoi luoghi)/Recensioni.json`)))));
        console.log(await GoogleService.parseGoogleAccount(Buffer.from(fs.readFileSync(path.resolve(__dirname, `../src/mock/datasource files/google/Takeout/Google Account/davide.SubscriberInfo.html`)))));
    } catch (e: any) {
        if (e.code == 'MODULE_NOT_FOUND') {
            console.log('[Error not founding module] ' + e);
        } else {
            console.log(e);
        }
    }
}

testGoogle();
