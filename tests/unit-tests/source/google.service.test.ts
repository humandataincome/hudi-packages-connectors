import {ServiceGoogle} from "../../../src";

describe('Google Service test', () => {
    const path = require('path');
    const fs = require('fs');
    const {Parser} = require("../../utils/parser");

    test('parseProfile', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/google/Takeout/Profile/Profilo.json`;
        const result = await ServiceGoogle.parseProfile(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = ["davide.mock@gmail.com","mockemail@hotmail.it"];
        expect(JSON.stringify(result!.emails)).toBe(JSON.stringify(expected));
    });
    test('parseBrowseHistory', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/google/Takeout/Chrome/BrowserHistory.json`;
        const result = await ServiceGoogle.parseBrowseHistory(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'yRM8OX1io/bB6+osYThoaQ==';
        expect(JSON.stringify(result!.list[5].clientId)).toBe(JSON.stringify(expected));
    });
    test('parseSearchEngines', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/google/Takeout/Chrome/SearchEngines.json`;
        const result = await ServiceGoogle.parseSearchEngines(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'eb55e260-8dd5-4d30-a062-e77e984e751c';
        expect(JSON.stringify(result!.list[2].syncGuid)).toBe(JSON.stringify(expected));
    });
    test('parseImageData', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/google/Takeout/GooglePhoto/PhotosFrom2019/photo.mp4.json`;
        const result = await ServiceGoogle.parseImageData(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = '2019-05-28T17:12:29.000Z';
        expect(JSON.stringify(result!.creationTime)).toBe(JSON.stringify(expected));
    });
    test('parseTransactions', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/google/Takeout/GooglePay/GoogleTransactions/transactions_123456.csv`;
        const result = await ServiceGoogle.parseTransactions(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'My Boy! - GBA Emulator';
        expect(JSON.stringify(result!.list[2].description)).toBe(JSON.stringify(expected));
    });
    test('parseDocLibrary', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/google/Takeout/GooglePlayStore/Library.json`;
        const result = await ServiceGoogle.parseDocLibrary(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'Indian Summer';
        expect(JSON.stringify(result!.list[1].title)).toBe(JSON.stringify(expected));
    });
    test('parsePurchaseHistory', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/google/Takeout/GooglePlayStore/PurchaseHistory.json`;
        const result = await ServiceGoogle.parsePurchaseHistory(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'PayPal: email@gmail.com';
        expect(JSON.stringify(result!.list[2].paymentMethod)).toBe(JSON.stringify(expected));
    });
    test('parseOrderHistory', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/google/Takeout/GooglePlayStore/OrderHistory.json`;
        const result = await ServiceGoogle.parseOrderHistory(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = '2014-02-11T20:39:47.917Z';
        expect(JSON.stringify(result!.list[1].creationTime)).toBe(JSON.stringify(expected));
    });
    test('parseSemanticLocations', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/google/Takeout/LocationHistory/SemanticLocationHistory/2017/2017_APRIL.json`;
        const result = await ServiceGoogle.parseSemanticLocations(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected1 = '2017-04-04T12:05:09.061Z';
        const expected2 = 'Università di Torino - Dipartimento di Informatica';
        expect(JSON.stringify(result!.listActivities[0].startDate)).toBe(JSON.stringify(expected1));
        expect(JSON.stringify(result!.listVisitedPlaces[0].location!.name)).toBe(JSON.stringify(expected2));
    });
    test('parsePlayStoreReviews', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/google/Takeout/GooglePlayStore/Reviews.json`;
        const result = await ServiceGoogle.parsePlayStoreReviews(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'Rise of Kingdoms: Lost Crusade';
        expect(JSON.stringify(result!.list[1].title)).toBe(JSON.stringify(expected));
    });
    test('parseMapsReviews', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/google/Takeout/Maps (I tuoi luoghi)/Recensioni.json`;
        const result = await ServiceGoogle.parseMapsReviews(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'Via S. Giovanni Bosco, 1, 10070 San Francesco al Campo TO, Italia';
        expect(JSON.stringify(result!.list[1].address)).toBe(JSON.stringify(expected));
    });
    test('parseGoogleAccount', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/google/Takeout/Google Account/davide.SubscriberInfo.html`;
        const result = await ServiceGoogle.parseGoogleAccount(Buffer.from(fs.readFileSync(path.resolve(__dirname, pathToFile))));
        const expected = '11122233344';
        expect(JSON.stringify(result!.id)).toBe(JSON.stringify(expected));
    });
    test('parseYoutubeLikes', async () => {
        const pathToFile1 = `../../../src/mock/datasource/raw files/google/Takeout/YouTube and YouTube Music/playlists/Liked videos.csv`;
        const pathToFile2 = `../../../src/mock/datasource/raw files/google/Takeout/YouTube and YouTube Music/playlists/Uploads from Davide.csv`;
        const result1 = await ServiceGoogle.parseYoutubePlaylists(await Parser.CSVToBuffer(path.join(__dirname, pathToFile1)));
        const result2 = await ServiceGoogle.parseYoutubePlaylists(await Parser.CSVToBuffer(path.join(__dirname, pathToFile2)));
        const expected1 = 'I_izvAbhExY';
        const expected2 = 'UUCDGkiRGP_hZFf2XBVCWwWg';
        expect(JSON.stringify(result1!.playlists[0].list[2].videoID)).toBe(JSON.stringify(expected1));
        expect(JSON.stringify(result2!.playlists[0].playlistID)).toBe(JSON.stringify(expected2));
    });
    test('parseDailyActivityMetrics', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/google/Takeout/Fit/Daily activity metrics/Daily activity metrics.csv`;
        const result = await ServiceGoogle.parseDailyActivityMetrics(Buffer.from(fs.readFileSync(path.resolve(__dirname, pathToFile))));
        const expected = 87.06077480316162;
        expect(JSON.stringify(result!.list[32].distance)).toBe(JSON.stringify(expected));
    });

});

