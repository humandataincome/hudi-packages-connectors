import {CONFIG} from "../config/config.utils";
import path from "path";
import {Parser} from "../utils/parser";
import {
    Activity, Event,
    MyListAccount,
    PersonalInformation, PlaybackEvents,
    Preference,
    PreferencesAccount, Profile, Profiles, Search,
    SearchHistory,
    Title, ViewingActivity
} from "../models/netflix.model";
import Logger from "../utils/logger";

export class NetflixService {
    private logger = new Logger("Netflix Service");
    private parserOptions = {delimiter: ',', columns: true, escape: '"'};

    async fetchPersonalInformation(): Promise<PersonalInformation | undefined> {
        try {
            const source = path.join(__dirname, `${CONFIG.get('PATH')}netflix/ACCOUNT/AccountDetails.csv`);
            return (<Array<PersonalInformation>>await Parser.parseCSV(source, this.parserOptions))[0];
        } catch (e: any){
            throw e;
        }
    }

    async fetchPreferences(): Promise<PreferencesAccount | undefined> {
        try {
            const source = path.join(__dirname, `${CONFIG.get('PATH')}netflix/CONTENT_INTERACTION/IndicatedPreferences.csv`);
            let preferencesModel: PreferencesAccount = {};
            preferencesModel.listPreferences = <Array<Preference>>await Parser.parseCSV(source, this.parserOptions);
            return preferencesModel.listPreferences ? preferencesModel : undefined;
        } catch (e: any){
            throw e;
        }
    }

    async fetchMyList(): Promise<MyListAccount | undefined> {
        try {
            const source = path.join(__dirname, `${CONFIG.get('PATH')}netflix/CONTENT_INTERACTION/MyList.csv`);
            let myListModel: MyListAccount = {};
            myListModel.list = <Array<Title>>await Parser.parseCSV(source, this.parserOptions);
            return myListModel.list ? myListModel : undefined;
        } catch (e: any){
            throw e;
        }
    }

    async fetchSearchHistory(): Promise<SearchHistory | undefined> {
        try {
            const source = path.join(__dirname, `${CONFIG.get('PATH')}netflix/CONTENT_INTERACTION/SearchHistory.csv`);
            let historyModel: SearchHistory = {};
            historyModel.listSearches = <Array<Search>>await Parser.parseCSV(source, this.parserOptions);
            return historyModel.listSearches ? historyModel : undefined;
        } catch (e: any){
            throw e;
        }
    }

    async fetchViewingActivity(): Promise<ViewingActivity | undefined> {
        try {
            const source = path.join(__dirname, `${CONFIG.get('PATH')}netflix/CONTENT_INTERACTION/ViewingActivity.csv`);
            let activityModel: ViewingActivity = {};
            activityModel.listActivities = <Array<Activity>>await Parser.parseCSV(source, this.parserOptions);
            return activityModel.listActivities ? activityModel : undefined;
        } catch (e: any){
            throw e;
        }
    }

    async fetchPlaybackEvents(): Promise<PlaybackEvents | undefined> {
        try {
            const source = path.join(__dirname, `${CONFIG.get('PATH')}netflix/CONTENT_INTERACTION/PlaybackRelatedEvents.csv`);
            let eventsModel: PlaybackEvents = {};
            eventsModel.listEvents = <Array<Event>>await Parser.parseCSV(source, this.parserOptions);
            return eventsModel.listEvents ? eventsModel : undefined;
        } catch (e: any){
            throw e;
        }
    }

    async fetchProfiles(): Promise<Profiles | undefined> {
        try {
            const source = path.join(__dirname, `${CONFIG.get('PATH')}netflix/PROFILES/Profiles.csv`);
            let profilesModel: Profiles = {};
            profilesModel.list = <Array<Profile>>await Parser.parseCSV(source, this.parserOptions);
            return profilesModel.list? profilesModel : undefined;
        } catch (e: any){
            throw e;
        }
    }
}