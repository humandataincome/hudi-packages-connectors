import {ServiceAmazon} from "../../src";

async function testFacebook(){
    await testService();
}

async function testService() {
    try {
        const {Parser} = require("../utils/parser");
        const path = require('path');
        const fs = require('fs');
        console.log(await ServiceAmazon.parsePrimeVideoWatchlist(await Parser.CSVToBuffer(path.join(__dirname, `../../src/mock/datasource files/amazon/Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.Watchlist.csv`))));
        /*

        console.log(await ServiceAmazon.parsePrimeVideoWatchlistHistory(await Parser.CSVToBuffer(path.join(__dirname, `../../src/mock/raw files/amazon/Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.WatchlistHistory.csv`))));
        console.log(await ServiceAmazon.parsePrimeVideoViewingHistory(await Parser.CSVToBuffer(path.join(__dirname, `../../src/mock/raw files/amazon/Digital.PrimeVideo.Viewinghistory/Digital.PrimeVideo.Viewinghistory.csv`))));
        console.log(await ServiceAmazon.parseSearchDataCustomerEngagement(await Parser.CSVToBuffer(path.join(__dirname, `../../src/mock/raw files/amazon/Search-Data/Search-Data.Customer-Engagement.csv`))));
        console.log(await ServiceAmazon.parseAudibleLibrary(await Parser.CSVToBuffer(path.join(__dirname, `../../src/mock/raw files/amazon/Audible.Library/Audible.Library.csv`))));
        console.log(await ServiceAmazon.parseTwitchPrimeSubscription(await Parser.CSVToBuffer(path.join(__dirname, `../../src/mock/raw files/amazon/AmazonGames/AmazonGames.TwitchPrime.SubscriptionCreditHistory.csv`))));
        console.log(await ServiceAmazon.parseAmazonWishlists(await Parser.CSVToBuffer(path.join(__dirname, `../../src/mock/raw files/amazon/Amazon.Lists.Wishlist.2.1/Amazon.Lists.Wishlist.json`))));
        console.log(await ServiceAmazon.parseRetailOrderHistory(await Parser.CSVToBuffer(path.join(__dirname, `../../src/mock/raw files/amazon/Retail.OrderHistory.2/Retail.OrderHistory.2.csv`))));

        let source = path.join(__dirname, `../../src/mock/raw files/amazon/`);
        const directories = fs.readdirSync(source);
        let directoriesADV = directories.filter((directory: string) => /Advertising/.test(directory));

        let resultAudience: AdvertiserAM[] = [];
        let resultClicked: AdvertiserAM[] = [];
        let array;
        for (let i = 1; i < directoriesADV.length + 1; i++) {
            source = path.join(__dirname, `../../src/mock/raw files/amazon/Advertising.${i}/Advertising.AdvertiserAudiences.csv`);
            array = await ServiceAmazon.parseAdvertiserAudiences(await Parser.CSVToBuffer(source));
            array && (resultAudience = resultAudience.concat(array.list));

            source = path.join(__dirname, `../../src/mock/raw files/amazon/Advertising.${i}/Advertising.AdvertiserClicks.csv`);
            array = await ServiceAmazon.parseAdvertiserClicked(await Parser.CSVToBuffer(source));
            array && (resultClicked = resultClicked.concat(array.list));
        }
        console.log(resultAudience.sort());
        console.log(resultClicked.sort());


        console.log(await ServiceAmazon.parseAudibleListening(await Parser.CSVToBuffer(path.join(__dirname, `../../src/mock/raw files/amazon/Audible.Listening/Audible.Listening.csv`))));
        console.log(await ServiceAmazon.parseAudibleMembershipBillings(await Parser.CSVToBuffer(path.join(__dirname, `../../src/mock/raw files/amazon/Audible.MembershipBillings/Audible.MembershipBillings.csv`))));
        console.log(await ServiceAmazon.parseDigitalPrimeVideoViewCounts(await Parser.CSVToBuffer(path.join(__dirname, `../../src/mock/raw files/amazon/Digital.PrimeVideo.ViewCounts.2/Digital.PrimeVideo.ViewCounts.2.csv`))));
        console.log(await ServiceAmazon.parseDigitalSubscriptions(await Parser.CSVToBuffer(path.join(__dirname, `../../src/mock/raw files/amazon/Digital.Subscriptions/Subscriptions.csv`))));
        console.log(await ServiceAmazon.parseLightWeightInteractions(await Parser.CSVToBuffer(path.join(__dirname, `../../src/mock/raw files/amazon/Retail.LightWeightInteractions/datasets/LightWeightInteractions/LightWeightInteractions.csv`))));
        console.log(await ServiceAmazon.parseRetailCartItems(await Parser.CSVToBuffer(path.join(__dirname, `../../src/mock/raw files/amazon/Retail.CartItems.2/Retail.CartItems.2.csv`))));
        console.log(await ServiceAmazon.parseRetailSellerFeedback(await Parser.CSVToBuffer(path.join(__dirname, `../../src/mock/raw files/amazon/Retail.Seller-Feedback.2/Retail.Seller-Feedback.csv`))));
        console.log(await ServiceAmazon.parseRetailRegionAuthorities(await Parser.CSVToBuffer(path.join(__dirname, `../../src/mock/raw files/amazon/Retail.RegionAuthority.2/Retail.RegionAuthority.2.csv`))));
        console.log(await ServiceAmazon.parseDigitalItems(await Parser.CSVToBuffer(path.join(__dirname, `../../src/mock/raw files/amazon/Digital-Ordering.2/Digital Items.csv`))));
        console.log(await ServiceAmazon.parseDigitalOrders(await Parser.CSVToBuffer(path.join(__dirname, `../../src/mock/raw files/amazon/Digital-Ordering.2/Digital Orders.csv`))));
        console.log(await ServiceAmazon.parseDigitalOrdersMonetary(await Parser.CSVToBuffer(path.join(__dirname, `../../src/mock/raw files/amazon/Digital-Ordering.2/Digital Orders Monetary.csv`))));
         */
    } catch (e: any) {
        if (e.code == 'MODULE_NOT_FOUND') {
            console.log('[Error not founding module] ' + e);
        } else {
            console.log(e);
        }
    }
}

testFacebook();
