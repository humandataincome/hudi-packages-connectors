import {ServiceAmazon} from "../../../src";

describe('Amazon Service test', () => {
    const path = require('path');
    const {Parser} = require("../../utils/parser");

    test('parsePrimeVideoWatchlist', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/amazon/Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.Watchlist.csv`;
        const result = await ServiceAmazon.parsePrimeVideoWatchlist(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'L\'Attacco dei Giganti - Parte 3: L\'urlo del risveglio';
        expect(JSON.stringify(result!.list[0].catalogTitle)).toBe(JSON.stringify(expected));
    });
    test('parsePrimeVideoWatchlistHistory', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/amazon/Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.WatchlistHistory.csv`;
        const result = await ServiceAmazon.parsePrimeVideoWatchlistHistory(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'WATCHLIST';
        expect(JSON.stringify(result!.list[3].listId)).toBe(JSON.stringify(expected));
    });
    test('parsePrimeVideoViewingHistory', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/amazon/Digital.PrimeVideo.Viewinghistory/Digital.PrimeVideo.Viewinghistory.csv`;
        const result = await ServiceAmazon.parsePrimeVideoViewingHistory(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = '2016-12-14T19:00:00.000Z';
        expect(JSON.stringify(result!.list[1].playbackHour)).toBe(JSON.stringify(expected));
    });
    test('parseSearchDataCustomerEngagement', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/amazon/Search-Data/Search-Data.Customer-Engagement.csv`;
        const result = await ServiceAmazon.parseSearchDataCustomerEngagement(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = '2019-10-09T12:30:14.000Z';
        expect(JSON.stringify(result!.list[2].firstSearchTime)).toBe(JSON.stringify(expected));
    });
    test('parseAudibleLibrary', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/amazon/Audible.Library/Audible.Library.csv`;
        const result = await ServiceAmazon.parseAudibleLibrary(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'Harry Potter e la pietra filosofale (Harry Potter 1)';
        expect(JSON.stringify(result!.list[4].title)).toBe(JSON.stringify(expected));
    });
    test('parseTwitchPrimeSubscription', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/amazon/AmazonGames/AmazonGames.TwitchPrime.SubscriptionCreditHistory.csv`;
        const result = await ServiceAmazon.parseTwitchPrimeSubscription(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = '2021-11-12T18:36:00.000Z';
        expect(JSON.stringify(result!.list[1].date)).toBe(JSON.stringify(expected));
    });
    test('parseAmazonWishlists', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/amazon/Amazon.Lists.Wishlist.2.1/Amazon.Lists.Wishlist.json`;
        const result = await ServiceAmazon.parseAmazonWishlists(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'B072DXXXN1';
        expect(JSON.stringify(result!.lists[0].itemList[2].asin)).toBe(JSON.stringify(expected));
    });
    test('parseRetailOrderHistory', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/amazon/Retail.OrderHistory.2/Retail.OrderHistory.2.csv`;
        const result = await ServiceAmazon.parseRetailOrderHistory(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'B07CZ6LWW4';
        expect(JSON.stringify(result!.list[2].ASIN)).toBe(JSON.stringify(expected));
    });
    test('parseAudibleListening', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/amazon/Audible.Listening/Audible.Listening.csv`;
        const result = await ServiceAmazon.parseAudibleListening(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'B078JM28LZ';
        expect(JSON.stringify(result!.list[3].asin)).toBe(JSON.stringify(expected));
    });
    test('parseAudibleMembershipBillings', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/amazon/Audible.MembershipBillings/Audible.MembershipBillings.csv`;
        const result = await ServiceAmazon.parseAudibleMembershipBillings(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = '7NHH3B92Z45G6BD860B0';
        expect(JSON.stringify(result!.list[0].planSelectionIdentifier)).toBe(JSON.stringify(expected));
    });
    test('parseDigitalPrimeVideoViewCounts', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/amazon/Digital.PrimeVideo.ViewCounts.2/Digital.PrimeVideo.ViewCounts.2.csv`;
        const result = await ServiceAmazon.parseDigitalPrimeVideoViewCounts(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'IT';
        expect(JSON.stringify(result!.homeCountry)).toBe(JSON.stringify(expected));
    });
    test('parseDigitalSubscriptions', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/amazon/Digital.Subscriptions/Subscriptions.csv`;
        const result = await ServiceAmazon.parseDigitalSubscriptions(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'P1U8V9CO80LC8IDE36H7MHS9LND3CILEOTI9EDAC0E8CTK7HJVN0';
        expect(JSON.stringify(result!.list[1].subscriptionId)).toBe(JSON.stringify(expected));
    });
    test('parseLightWeightInteractions', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/amazon/Retail.LightWeightInteractions/datasets/LightWeightInteractions/LightWeightInteractions.csv`;
        const result = await ServiceAmazon.parseLightWeightInteractions(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = '2016-08-25T00:00:00.000Z';
        expect(JSON.stringify(result!.list[3].creationTime)).toBe(JSON.stringify(expected));
    });
    test('parseRetailCartItems', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/amazon/Retail.CartItems.2/Retail.CartItems.2.csv`;
        const result = await ServiceAmazon.parseRetailCartItems(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'active';
        expect(JSON.stringify(result!.list[0].cartList)).toBe(JSON.stringify(expected));
    });
    test('parseRetailSellerFeedback', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/amazon/Retail.Seller-Feedback.2/Retail.Seller-Feedback.csv`;
        const result = await ServiceAmazon.parseRetailSellerFeedback(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = '403-0936491-7215566';
        expect(JSON.stringify(result!.list[0].orderId)).toBe(JSON.stringify(expected));
    });
    test('parseRetailRegionAuthorities', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/amazon/Retail.RegionAuthority.2/Retail.RegionAuthority.2.csv`;
        const result = await ServiceAmazon.parseRetailRegionAuthorities(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'San Mauro';
        expect(JSON.stringify(result!.list[1].city)).toBe(JSON.stringify(expected));
    });
    test('parseDigitalItems', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/amazon/Digital-Ordering.2/Digital Items.csv`;
        const result = await ServiceAmazon.parseDigitalItems(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'B079F245XY';
        expect(JSON.stringify(result!.list[1].ASIN)).toBe(JSON.stringify(expected));
    });
    test('parseDigitalOrders', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/amazon/Digital-Ordering.2/Digital Orders.csv`;
        const result = await ServiceAmazon.parseDigitalOrders(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'D01-6021440';
        expect(JSON.stringify(result!.list[1].orderId)).toBe(JSON.stringify(expected));
    });
    test('parseDigitalOrdersMonetary', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/amazon/Digital-Ordering.2/Digital Orders Monetary.csv`;
        const result = await ServiceAmazon.parseDigitalOrdersMonetary(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'MRJJQM7M13KKFN5LBS2JNTI';
        expect(JSON.stringify(result!.list[0].digitalOrderItemId)).toBe(JSON.stringify(expected));
    });
    test('parseAdvertiserAudiences', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/amazon/Advertising.1/Advertising.AdvertiserAudiences.csv`;
        const result = await ServiceAmazon.parseAdvertiserAudiences(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'Mazda';
        expect(JSON.stringify(result!.list[40].value)).toBe(JSON.stringify(expected));
    });
    test('parseAdvertiserClicked', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/amazon/Advertising.2/Advertising.AdvertiserClicks.csv`;
        const result = await ServiceAmazon.parseAdvertiserClicked(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'iCARLIFE';
        expect(JSON.stringify(result!.list[4].value)).toBe(JSON.stringify(expected));
    });
    test('parseTwitchPrimeLinkedAccounts', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/amazon/AmazonGames/AmazonGames.TwitchPrime.LinkedTwitchAccounts.csv`;
        const result = await ServiceAmazon.parseTwitchPrimeLinkedAccounts(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = '88889999';
        expect(JSON.stringify(result!.list[0].userId)).toBe(JSON.stringify(expected));
    });
    test('parseTwitchPrimeAccountHistory', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/amazon/AmazonGames/AmazonGames.TwitchPrime.AccountHistory.csv`;
        const result = await ServiceAmazon.parseTwitchPrimeAccountHistory(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = '2019-11-26T16:43:00.000Z';
        expect(JSON.stringify(result!.list[0].date)).toBe(JSON.stringify(expected));
    });
});
