import {AmazonService} from "../../src";
async function testFacebook(){
    await testService();
}

async function testService() {
    try {
        const {Parser} = require("../utils/parser");
        const path = require('path');
        const fs = require('fs');
        console.log(await AmazonService.parsePrimeVideoWatchlist(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/amazon/Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.Watchlist.csv`))));
        /*

        console.log(await AmazonService.parsePrimeVideoWatchlistHistory(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/amazon/Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.WatchlistHistory.csv`))));
        console.log(await AmazonService.parsePrimeVideoViewingHistory(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/amazon/Digital.PrimeVideo.Viewinghistory/Digital.PrimeVideo.Viewinghistory.csv`))));
        console.log(await AmazonService.parseSearchDataCustomerEngagement(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/amazon/Search-Data/Search-Data.Customer-Engagement.csv`))));
        console.log(await AmazonService.parseAudibleLibrary(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/amazon/Audible.Library/Audible.Library.csv`))));
        console.log(await AmazonService.parseTwitchPrimeSubscription(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/amazon/AmazonGames/AmazonGames.TwitchPrime.SubscriptionCreditHistory.csv`))));
        console.log(await AmazonService.parseAmazonWishlists(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/amazon/Amazon.Lists.Wishlist.2.1/Amazon.Lists.Wishlist.json`))));
        console.log(await AmazonService.parseRetailOrderHistory(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/amazon/Retail.OrderHistory.2/Retail.OrderHistory.2.csv`))));

        let source = path.join(__dirname, `../src/mock/datasource files/amazon/`);
        const directories = fs.readdirSync(source);
        let directoriesADV = directories.filter((directory: string) => /Advertising/.test(directory));

        let resultAudience: AdvertiserAM[] = [];
        let resultClicked: AdvertiserAM[] = [];
        let array;
        for (let i = 1; i < directoriesADV.length + 1; i++) {
            source = path.join(__dirname, `../src/mock/datasource files/amazon/Advertising.${i}/Advertising.AdvertiserAudiences.csv`);
            array = await AmazonService.parseAdvertiserAudiences(await Parser.CSVToBuffer(source));
            array && (resultAudience = resultAudience.concat(array.list));

            source = path.join(__dirname, `../src/mock/datasource files/amazon/Advertising.${i}/Advertising.AdvertiserClicks.csv`);
            array = await AmazonService.parseAdvertiserClicked(await Parser.CSVToBuffer(source));
            array && (resultClicked = resultClicked.concat(array.list));
        }
        console.log(resultAudience.sort());
        console.log(resultClicked.sort());


        console.log(await AmazonService.parseAudibleListening(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/amazon/Audible.Listening/Audible.Listening.csv`))));
        console.log(await AmazonService.parseAudibleMembershipBillings(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/amazon/Audible.MembershipBillings/Audible.MembershipBillings.csv`))));
        console.log(await AmazonService.parseDigitalPrimeVideoViewCounts(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/amazon/Digital.PrimeVideo.ViewCounts.2/Digital.PrimeVideo.ViewCounts.2.csv`))));
        console.log(await AmazonService.parseDigitalSubscriptions(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/amazon/Digital.Subscriptions/Subscriptions.csv`))));
        console.log(await AmazonService.parseLightWeightInteractions(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/amazon/Retail.LightWeightInteractions/datasets/LightWeightInteractions/LightWeightInteractions.csv`))));
        console.log(await AmazonService.parseRetailCartItems(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/amazon/Retail.CartItems.2/Retail.CartItems.2.csv`))));
        console.log(await AmazonService.parseRetailSellerFeedback(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/amazon/Retail.Seller-Feedback.2/Retail.Seller-Feedback.csv`))));
        console.log(await AmazonService.parseRetailRegionAuthorities(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/amazon/Retail.RegionAuthority.2/Retail.RegionAuthority.2.csv`))));
        console.log(await AmazonService.parseDigitalItems(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/amazon/Digital-Ordering.2/Digital Items.csv`))));
        console.log(await AmazonService.parseDigitalOrders(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/amazon/Digital-Ordering.2/Digital Orders.csv`))));
        console.log(await AmazonService.parseDigitalOrdersMonetary(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/amazon/Digital-Ordering.2/Digital Orders Monetary.csv`))));
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
