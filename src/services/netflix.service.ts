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
    private parserOptions = {delimiter: ',', columns: false, escape: '"'};

    parseFromStringToJson<Type>(data: Buffer, checkBrackets: boolean): Array<Type> | undefined {
        try {
            let matrix = this.clearDataBuffer(data, checkBrackets);
            if (matrix && matrix.length > 2) {
                matrix.pop();
                let keys = matrix.shift();
                let values: any[] = [];
                matrix.map(array => {
                    let result: any = {};
                    array.map((value, i) => {
                        keys && (result[keys[i]] = value);
                    });
                    values.push(result);
                });
                return values;
            }
        } catch (e: any) {
            this.logger.log('error', `${e.code}`,'parseFromStringToJson');
        }
    }

    clearDataBuffer(data: Buffer, checkBrackets: boolean): string[][] | undefined{
        try {
            if(checkBrackets){
                return data.toString().split(/\r?\n/).map((s: string) => s.replace(/"/g, '')).map((row: string) => row.split(/,/));
            } else {
                return data.toString().split(/\r?\n/).map((row: string) => row.split(/,/));
            }
        } catch (e: any) {
            this.logger.log('error', `${e.code}`,'clearDataBuffer');
        }
    }


    async parsePersonalInformation(data: Buffer): Promise<PersonalInformation | undefined> {
        try {
            let result: Array<PersonalInformation> | undefined = <Array<PersonalInformation>>this.parseFromStringToJson(data, true);
            return result ? result[0] : undefined;
        } catch (e: any){
            this.logger.log('error', `${e.code}`,'parsePersonalInformation');
        }
    }

    async parsePreferences(data: Buffer): Promise<PreferencesAccount | undefined> {
        try {
            let result: PreferencesAccount = {};
            result.list = <Array<Preference>>this.parseFromStringToJson(data, false);
            return result != {} ? result : undefined;
        } catch (e: any){
            this.logger.log('error', `${e.code}`,'parsePreferences');
        }
    }

    async parseMyList(data: Buffer): Promise<MyListAccount | undefined> {
        try {
            const source = path.join(__dirname, `${CONFIG.get('PATH')}netflix/CONTENT_INTERACTION/MyList.csv`);
            let myListModel: MyListAccount = {};
            myListModel.list = <Array<Title>>await Parser.parseCSV(source, this.parserOptions);
            return myListModel.list ? myListModel : undefined;
        } catch (e: any){
            this.logger.log('error', `${e.code}`,'parseMyList');
        }
    }

    async parseSearchHistory(): Promise<SearchHistory | undefined> {
        try {
            const source = path.join(__dirname, `${CONFIG.get('PATH')}netflix/CONTENT_INTERACTION/SearchHistory.csv`);
            let historyModel: SearchHistory = {};
            historyModel.listSearches = <Array<Search>>await Parser.parseCSV(source, this.parserOptions);
            return historyModel.listSearches ? historyModel : undefined;
        } catch (e: any){
            this.logger.log('error', `${e.code}`,'parseSearchHistory');
        }
    }

    async parseViewingActivity(): Promise<ViewingActivity | undefined> {
        try {
            const source = path.join(__dirname, `${CONFIG.get('PATH')}netflix/CONTENT_INTERACTION/ViewingActivity.csv`);
            let activityModel: ViewingActivity = {};
            activityModel.listActivities = <Array<Activity>>await Parser.parseCSV(source, this.parserOptions);
            return activityModel.listActivities ? activityModel : undefined;
        } catch (e: any){
            this.logger.log('error', `${e.code}`,'parseViewingActivity');
        }
    }

    async parsePlaybackEvents(): Promise<PlaybackEvents | undefined> {
        try {
            const source = path.join(__dirname, `${CONFIG.get('PATH')}netflix/CONTENT_INTERACTION/PlaybackRelatedEvents.csv`);
            let eventsModel: PlaybackEvents = {};
            eventsModel.listEvents = <Array<Event>>await Parser.parseCSV(source, this.parserOptions);
            return eventsModel.listEvents ? eventsModel : undefined;
        } catch (e: any){
            this.logger.log('error', `${e.code}`,'parsePlaybackEvents');
        }
    }

    async parseProfiles(): Promise<Profiles | undefined> {
        try {
            const source = path.join(__dirname, `${CONFIG.get('PATH')}netflix/PROFILES/Profiles.csv`);
            let profilesModel: Profiles = {};
            profilesModel.list = <Array<Profile>>await Parser.parseCSV(source, this.parserOptions);
            return profilesModel.list? profilesModel : undefined;
        } catch (e: any){
            this.logger.log('error', `${e.code}`,'parseProfiles');
        }
    }
}