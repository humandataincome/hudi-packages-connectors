import Logger from "../utils/logger";
import {
    AdvertiserAudiences, AdvertiserClicked,
    AudibleLibrary, AudioBook,
    PrimeVideoViewingHistory,
    PrimeVideoWatchlist,
    PrimeVideoWatchlistHistory, Search, SearchDataCustomerEngagement,
    Title,
    ViewingActivity
} from "../models/amazon.model";
import {Parser} from "../utils/parser";

export class AmazonService {
    private logger = new Logger("Amazon Service");

    async parsePrimeVideoWatchlist(data: Buffer): Promise<PrimeVideoWatchlist | undefined> {
        try {
            let result = <Array<any>>Parser.parseFromBufferToJson(data, true);
            if(result) {
                let model: PrimeVideoWatchlist = {list: []}
                result.map((listItem) => {
                    let newItem: Title = {}, match;
                    (listItem.catalogTitle != '') && (newItem.catalogTitle = listItem.catalogTitle);
                    //parameter '﻿itemAddedDate' looks like ' itemAddedDate' when returned
                    (listItem['﻿itemAddedDate'] != '') && (match = listItem['﻿itemAddedDate'].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+)/));
                    (listItem['﻿itemAddedDate'] != '') && (newItem.itemAddedDate = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), 0)));
                    model.list.push(newItem);
                });
                return model;
            }
        } catch (e: any){
            this.logger.log('error', `${e}`,'parsePrimeVideoWatchlist');
        }
    }

    async parsePrimeVideoWatchlistHistory(data: Buffer): Promise<PrimeVideoWatchlistHistory | undefined> {
        try {
            let result = <Array<any>>Parser.parseFromBufferToJson(data, true);
            if(result) {
                let model: PrimeVideoWatchlistHistory = {list: []}
                result.map((listItem) => {
                    let newItem: Title = {}, match;
                    (listItem['﻿listId'] != '') && (newItem.listId = listItem['﻿listId']);
                    (listItem.itemAddedDate != '') && (match = listItem.itemAddedDate.match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+)/));
                    (listItem.itemAddedDate != '') && (newItem.itemAddedDate = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), 0)));
                    (listItem.itemType != '') && (newItem.itemType = listItem.itemType);
                    (listItem.deleted != '') && (newItem.deleted = listItem.deleted == '1');
                    (listItem.catalogTitle != '') && (newItem.catalogTitle = listItem.catalogTitle);
                    model.list.push(newItem);
                });
                return model;
            }
        } catch (e: any){
            this.logger.log('error', `${e}`,'parsePrimeVideoWatchlistHistory');
        }
    }

    async parsePrimeVideoViewingHistory(data: Buffer): Promise<PrimeVideoViewingHistory | undefined> {
        try {
            let result = <Array<any>>Parser.parseFromBufferToJson(data, true);
            if(result) {
                let model: PrimeVideoViewingHistory = {list: []}
                result.map((listItem) => {
                    let newItem: ViewingActivity = {}, match;
                    (listItem['﻿Playback Hour']  != '') && (match = listItem['﻿Playback Hour'].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+)/));
                    (listItem['﻿Playback Hour']  != '') && (newItem.playbackHour = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    (listItem['Operating System'] != '') && (newItem.operatingSystem = listItem['Operating System']);
                    (listItem['Browser'] != '') && (newItem.browser = listItem['Browser']);
                    (listItem['Delivery Type'] != '') && (newItem.deliveryType = listItem['Delivery Type']);
                    (listItem['City'] != '') && (newItem.city = listItem['City']);
                    (listItem['Country'] != '') && (newItem.country = listItem['Country']);
                    (listItem['ISP'] != '') && (newItem.ISP = listItem['ISP']);
                    (listItem['State'] != '') && (newItem.state = listItem['State']);
                    (listItem['Content Quality Entitled'] != '') && (newItem.contentQuality = listItem['Content Quality Entitled']);
                    (listItem['Entitlement Type'] != '') && (newItem.entitlementType = listItem['Entitlement Type']);
                    (listItem['Video Type'] != '') && (newItem.videoType = listItem['Video Type']);
                    (listItem['Audio Language'] != '') && (newItem.audioLanguage = listItem['Audio Language']);
                    (listItem['Title'] != '') && (newItem.title = listItem['Title']);
                    model.list.push(newItem);
                });
                return model;
            }
        } catch (e: any){
            this.logger.log('error', `${e}`,'parsePrimeVideoViewingHistory');
        }
    }

    async parseSearchDataCustomerEngagement(data: Buffer): Promise<SearchDataCustomerEngagement | undefined> {
        try {
            let result = <Array<any>>Parser.parseFromBufferToJson(data, true);
            console.log(result)
            if(result) {
                let model: SearchDataCustomerEngagement = {list: []}
                result.map((listItem) => {
                    let newItem: Search = {}, match;
                    (listItem['﻿First Search Time (GMT)'] != '') && (match = listItem['﻿First Search Time (GMT)'].match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/));
                    (listItem['﻿First Search Time (GMT)'] != '') && (newItem.firstSearchTime = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    (listItem['Country ID'] != '') && (newItem.countryID = listItem['Country ID']);
                    (listItem['All Department (APS) or Category'] != '') && (newItem.APSorCategory = listItem['All Department (APS) or Category']);
                    (listItem['Site Variant'] != '') && (newItem.siteVariant = listItem['Site Variant']);
                    (listItem['Application / Browser Name'] != '') && (newItem.appOrBrowser = listItem['Application / Browser Name']);
                    (listItem['Device Model'] != '') && (newItem.deviceModel = listItem['Device Model']);
                    (listItem['Search Type (Keyword,Visual,Browse)'] != '') && (newItem.searchType = listItem['Search Type (Keyword,Visual,Browse)']);
                    (listItem['Session ID'] != '') && (newItem.sessionID = listItem['Session ID']);
                    (listItem['Query ID'] != '') && (newItem.queryID = listItem['Query ID']);
                    (listItem['Prime Customer (Y/N)'] != '') && (newItem.primeCustomer = listItem['Prime Customer (Y/N)'] == '1');
                    (listItem['Is From External Link (Y/N)'] != '') && (newItem.isFromExternalLink = listItem['Is From External Link (Y/N)'] == '1');
                    (listItem['Search From External Site (Y/N)'] != '') && (newItem.searchFromExternalSite = listItem['Search From External Site (Y/N)']);
                    (listItem['First Search Query String'] != '') && (newItem.firstSearchQuery = listItem['First Search Query String']);
                    (listItem['Application Name'] != '') && (newItem.applicationName = listItem['Application Name']);
                    (listItem['App Version'] != '') && (newItem.appVersion = listItem['App Version']);
                    (listItem['Operating System Name'] != '') && (newItem.operatingSystemName = listItem['Operating System Name']);
                    (listItem['Operating System Version'] != '') && (newItem.operatingSystemVersion = listItem['Operating System Version']);
                    (listItem['Device Type ID'] != '') && (newItem.deviceTypeID = listItem['Device Type ID']);
                    (listItem['Device Category'] != '') && (newItem.deviceCategory = listItem['Device Category']);
                    (listItem['Customer IP'] != '') && (newItem.customerIP = listItem['Customer IP']);
                    (listItem['Search Method'] != '') && (newItem.searchMethod = listItem['Search Method']);
                    (listItem['Keywords'] != '') && (newItem.keywords = listItem['Keywords']);
                    (listItem['Amazon Business Customer (Y/N)'] != '') && (newItem.isBusinessCustomer = listItem['Amazon Business Customer (Y/N)'] == '1');
                    (listItem['Language'] != '') && (newItem.language = listItem['Language']);
                    (listItem['Server'] != '') && (newItem.server = listItem['Server']);
                    (listItem['Amazon Fresh Customer (Y/N)'] != '') && (newItem.isFreshCustomer = listItem['Amazon Fresh Customer (Y/N)'] == '1');
                    (listItem['Music Subscriber (Y/N)'] != '') && (newItem.isMusicSubscriber = listItem['Music Subscriber (Y/N)'] == '1');
                    (listItem['First Browser Node'] != '') && (newItem.firstBrowserNode = listItem['First Browser Node']);
                    (listItem['Last search Time (GMT)'] != '') && (match = listItem['Last search Time (GMT)'].match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+).0/));
                    (listItem['Last search Time (GMT)'] != '') && (newItem.lastSearchTime = new Date(Date.UTC(parseInt(match[3]), parseInt(match[1]) - 1, parseInt(match[2]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    (listItem['Last Department'] != '') && (newItem.lastDepartment = listItem['Last Department']);
                    (listItem['Last Browse Node'] != '') && (newItem.lastBrowseNode = listItem['Last Browse Node']);
                    (listItem['Last Known Customer ID'] != '') && (newItem.lastKnownCustomerID = listItem['Last Known Customer ID']);
                    (listItem['First Added Item'] != '') && (newItem.firstAddedItem = listItem['First Added Item']);
                    (listItem['First Purchased Item'] != '') && (newItem.firstPurchasedItem = listItem['First Purchased Item']);
                    (listItem['First Consumed Item (Subscription)'] != '') && (newItem.firstConsumedItem = listItem['First Consumed Item (Subscription)']);
                    (listItem['Number of Clicked Items'] != '') && (newItem.numberClickedItem = listItem['Number of Clicked Items']);
                    (listItem['Number of Items Added to Cart'] != '') && (newItem.numberItemsAddedCart = listItem['Number of Items Added to Cart']);
                    (listItem['Number of Items Ordered'] != '') && (newItem.numberItemsOrdered = listItem['Number of Items Ordered']);
                    (listItem['Number of Paid Items Ordered'] != '') && (newItem.numberPaidItemsOrdered = listItem['Number of Paid Items Ordered']);
                    (listItem['Number of Free Items Ordered'] != '') && (newItem.numberFreeItemsOrdered = listItem['Number of Free Items Ordered']);
                    (listItem['Units Ordered'] != '') && (newItem.unitsOrdered = listItem['Units Ordered']);
                    (listItem['Paid Units Ordered'] != '') && (newItem.paidUnitsOrdered = listItem['Paid Units Ordered']);
                    (listItem['Free Units Ordered'] != '') && (newItem.freeUnitsOrdered = listItem['Free Units Ordered']);
                    (listItem['Maximum Purchase Price'] != '') && (newItem.maximumPurchasePrice = listItem['Maximum Purchase Price']);
                    (listItem['Clicked Any Item (Y/N)'] != '') && (newItem.clickedAnyItem = listItem['Clicked Any Item (Y/N)'] == '1');
                    (listItem['Added Any Item (Y/N)'] != '') && (newItem.addedAnyItem = listItem['Added Any Item (Y/N)'] == '1');
                    (listItem['Purchased Any Item (Y/N)'] != '') && (newItem.purchasedAnyItem = listItem['Purchased Any Item (Y/N)'] == '1');
                    (listItem['Department Count'] != '') && (newItem.departmentCount = listItem['Department Count']);
                    (listItem['Shopping Refinement'] != '') && (newItem.shoppingRefinement = listItem['Shopping Refinement']);
                    (listItem['Number of Shopping Refinements'] != '') && (newItem.numberShoppingRefinements = listItem['Number of Shopping Refinements']);
                    (listItem['Highest Number of Shopping Refinements'] != '') && (newItem.highestNumberShoppingRefinements = listItem['Highest Number of Shopping Refinements']);
                    (listItem['Items Consumed (Subscription)'] != '') && (newItem.itemConsumed = listItem['Items Consumed (Subscription)']);
                    (listItem['Shopping Refinement Pickers'] != '') && (newItem.shoppingRefinementPickers = listItem['Shopping Refinement Pickers']);
                    (listItem['Paid Purchase (Y/N)'] != '') && (newItem.paidPurchase = listItem['Paid Purchase (Y/N)'] == '1');
                    (listItem['Item Borrowed (Y/N)'] != '') && (newItem.isItemBorrowed = listItem['Item Borrowed (Y/N)'] == '1');
                    (listItem['Items Borrowed'] != '') && (newItem.itemsBorrowed = listItem['Items Borrowed']);
                    (listItem['Next Query Group via Click'] != '') && (newItem.nextQueryGroupViaClick = listItem['Next Query Group via Click']);
                    (listItem['Query Abandoned (Y/N)'] != '') && (newItem.queryAbandoned = listItem['Query Abandoned (Y/N)'] == '1');
                    (listItem['Query Reformulated (Y/N)'] != '') && (newItem.queryReformulated = listItem['Query Reformulated (Y/N)'] == '1');
                    (listItem['Amazon Fresh (Y/N)'] != '') && (newItem.amazonFresh = listItem['Amazon Fresh (Y/N)'] == '1');
                    (listItem['Store Visited'] != '') && (newItem.storeVisited = listItem['Store Visited']);
                    (listItem['Department'] != '') && (newItem.department = listItem['Department']);
                    (listItem['Browse Node'] != '') && (newItem.browserNode = listItem['Browse Node']);
                    (listItem['First Search Domain'] != '') && (newItem.firstSearchDomain = listItem['First Search Domain']);
                    (listItem['Is First Search From External Ad'] != '') && (newItem.isFirstSearchFromExternalAd = listItem['Is First Search From External Ad'] == 'true');
                    (listItem['User Agent Info Family'] != '') && (newItem.userAgentInfoFamily = listItem['User Agent Info Family']);
                    (listItem['LKCI'] != '') && (newItem.LKCI = listItem['LKCI]']);
                    model.list.push(newItem);
                });
                return model;
            }
        } catch (e: any){
            this.logger.log('error', `${e}`,'parseSearchDataCustomerEngagement');
        }
    }
    /*
    async fetchAudibleLibrary(): Promise<AudibleLibrary | undefined> {
        try {
            const source = path.join(__dirname, `${CONFIG.get('PATH')}amazon/Audible.Library.csv`);
            let libraryModel: AudibleLibrary = {};
            libraryModel.listAudioBooks = <Array<AudioBook>>await Parser.parseCSV(source, this.parserOptions);
            return libraryModel.listAudioBooks ? libraryModel : undefined;
        } catch (e: any){
            throw e;
        }
    }

    //advertising files are generated with a limit of 100 entries for each files, when the limit is reached another file is created
    async fetchAdvertiserAudiences(): Promise<AdvertiserAudiences | undefined> {
        let clickedModel: AdvertiserClicked = {list: []};
        let options = {delimiter: ',', columns: false, from_line: 3};
        try {
            const fs = require('fs');
            let source = path.join(__dirname, `${CONFIG.get('PATH')}amazon/`);
            const directories = fs.readdirSync(source);
            let directoriesADV = directories.filter((directory: string) => /Advertising/.test(directory));

            for (let i = 1; i < directoriesADV.length + 1; i++) {
                source = path.join(__dirname, `${CONFIG.get('PATH')}amazon/Advertising.${i}/Advertising.AdvertiserAudiences.csv`);
                clickedModel.list = clickedModel.list.concat(<Array<string>>await Parser.parseCSV(source, options, (x: any) => (x[0])));
            }
            clickedModel.list.sort();
            return clickedModel.list != [] ? clickedModel : undefined;
        } catch (e: any){
            throw e;
        }
    }

    async fetchAdvertiserClicked(): Promise<AdvertiserClicked | undefined> {
        let clickedModel: AdvertiserClicked = {list: []};
        let options = {delimiter: ',', columns: false, from_line: 3};
        try {
            const fs = require('fs');
            let source = path.join(__dirname, `${CONFIG.get('PATH')}amazon/`);
            const directories = fs.readdirSync(source);
            let directoriesADV = directories.filter((directory: string) => /Advertising/.test(directory));

            for (let i = 1; i < directoriesADV.length + 1; i++) {
                source = path.join(__dirname, `${CONFIG.get('PATH')}amazon/Advertising.${i}/Advertising.AdvertiserClicks.csv`);
                clickedModel.list = clickedModel.list.concat(<Array<string>>await Parser.parseCSV(source, options, (x: any) => (x[0])));
            }
            clickedModel.list.sort();
            return clickedModel.list != [] ? clickedModel : undefined;
        } catch (e: any){
            throw e;
        }
    }

 */
}