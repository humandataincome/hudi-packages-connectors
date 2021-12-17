import path from "path";
import {CONFIG} from "../config/config.utils";
import {Parser} from "../utils/parser";
import Logger from "../utils/logger";
import {
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
        } catch {
            this.logger.log('error', 'fetchPrimeVideoWatchlist - Digital.PrimeVideo.Watchlist.csv');
        }
    }

    async fetchPrimeVideoWatchlistHistory(): Promise<PrimeVideoWatchlistHistory | undefined> {
        try {
            const source = path.join(__dirname, `${CONFIG.get('PATH')}amazon/Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.WatchlistHistory.csv`);
            let watchlistHistoryModel: PrimeVideoWatchlistHistory = {};
            watchlistHistoryModel.listTitles = <Array<Title>>await Parser.parseCSV(source, this.parserOptions);
            return watchlistHistoryModel.listTitles ? watchlistHistoryModel : undefined;
        } catch {
            this.logger.log('error', 'fetchPrimeVideoWatchlistHistory - Digital.PrimeVideo.WatchlistHistory.csv');
        }
    }

    async fetchPrimeVideoViewingHistory(): Promise<PrimeVideoViewingHistory | undefined> {
        try {
            let options = {delimiter: ',', columns: true, escape: '"', relax_quotes: true, ignore_last_delimiters: true, };
            const source = path.join(__dirname, `${CONFIG.get('PATH')}amazon/Digital.PrimeVideo.Viewinghistory/Digital.PrimeVideo.Viewinghistory.csv`);
            let viewingHistoryModel: PrimeVideoViewingHistory = {};
            viewingHistoryModel.listActivities = <Array<ViewingActivity>>await Parser.parseCSV(source, options);
            return viewingHistoryModel.listActivities ? viewingHistoryModel : undefined;
        } catch {
            this.logger.log('error', 'fetchPrimeVideoViewingHistory - Digital.PrimeVideo.Viewinghistory.csv');
        }
    }

    async fetchSearchDataCustomerEngagement(): Promise<SearchDataCustomerEngagement | undefined> {
        try {
            const source = path.join(__dirname, `${CONFIG.get('PATH')}amazon/Search-Data/Search-Data.Customer-Engagement.csv`);
            let searchDataModel: SearchDataCustomerEngagement = {};
            searchDataModel.listSearches = <Array<Search>>await Parser.parseCSV(source, this.parserOptions);
            return searchDataModel.listSearches ? searchDataModel : undefined;
        } catch {
            this.logger.log('error', 'fetchSearchDataCustomerEngagement - Search-Data.Customer-Engagement.csv');
        }
    }

    async fetchAudibleLibrary(): Promise<AudibleLibrary | undefined> {
        try {
            const source = path.join(__dirname, `${CONFIG.get('PATH')}amazon/Audible.Library.csv`);
            let libraryModel: AudibleLibrary = {};
            libraryModel.listAudioBooks = <Array<AudioBook>>await Parser.parseCSV(source, this.parserOptions);
            return libraryModel.listAudioBooks ? libraryModel : undefined;
        } catch {
            this.logger.log('error', 'fetchAudibleLibrary - Audible.Library.csv');
        }
    }
}