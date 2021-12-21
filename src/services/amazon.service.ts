import path from "path";
import {CONFIG} from "../config/config.utils";
import {Parser} from "../utils/parser";
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

export class AmazonService {
    private logger = new Logger("Amazon Service");
    private parserOptions = {delimiter: ',', columns: true, escape: '"', bom: true, ignore_last_delimiters: true};

    async fetchPrimeVideoWatchlist(): Promise<PrimeVideoWatchlist | undefined> {
        try {
            const source = path.join(__dirname, `${CONFIG.get('PATH')}amazon/Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.Watchlist.csv`);
            let watchlistModel: PrimeVideoWatchlist = {};
            watchlistModel.listTitles = <Array<Title>>await Parser.parseCSV(source, this.parserOptions);
            return watchlistModel.listTitles ? watchlistModel : undefined;
        } catch (e: any){
            throw e;
        }
    }

    async fetchPrimeVideoWatchlistHistory(): Promise<PrimeVideoWatchlistHistory | undefined> {
        try {
            const source = path.join(__dirname, `${CONFIG.get('PATH')}amazon/Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.WatchlistHistory.csv`);
            let watchlistHistoryModel: PrimeVideoWatchlistHistory = {};
            watchlistHistoryModel.listTitles = <Array<Title>>await Parser.parseCSV(source, this.parserOptions);
            return watchlistHistoryModel.listTitles ? watchlistHistoryModel : undefined;
        } catch (e: any){
            throw e;
        }
    }

    async fetchPrimeVideoViewingHistory(): Promise<PrimeVideoViewingHistory | undefined> {
        try {
            let options = {delimiter: ',', columns: true, escape: '"', relax_quotes: true, ignore_last_delimiters: true};
            const source = path.join(__dirname, `${CONFIG.get('PATH')}amazon/Digital.PrimeVideo.Viewinghistory/Digital.PrimeVideo.Viewinghistory.csv`);
            let viewingHistoryModel: PrimeVideoViewingHistory = {};
            viewingHistoryModel.listActivities = <Array<ViewingActivity>>await Parser.parseCSV(source, options);
            return viewingHistoryModel.listActivities ? viewingHistoryModel : undefined;
        } catch (e: any){
            throw e;
        }
    }

    async fetchSearchDataCustomerEngagement(): Promise<SearchDataCustomerEngagement | undefined> {
        try {
            const source = path.join(__dirname, `${CONFIG.get('PATH')}amazon/Search-Data/Search-Data.Customer-Engagement.csv`);
            let searchDataModel: SearchDataCustomerEngagement = {};
            searchDataModel.listSearches = <Array<Search>>await Parser.parseCSV(source, this.parserOptions);
            return searchDataModel.listSearches ? searchDataModel : undefined;
        } catch (e: any){
            throw e;
        }
    }

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
}