import {
    ActivityNF, EventNF,
    MyListAccountNF,
    PersonalInformationNF,
    PlaybackEventsNF,
    PreferenceNF,
    PreferencesAccountNF, ProfileNF, ProfilesNF,
    SearchHistoryNF,
    SearchNF,
    TitleNF,
    ViewingActivityNF
} from "./model.netflix";
import Logger from "../../utils/logger";
import {Parser} from "../../utils/parser";
import {FileCodeNetflix} from "../../descriptor";

/**
 * Class used to parse most important files into the directory returned by Netflix in CSV format.
 * All the files are given in input as Buffer, parsed to JSON and then mapped into a specific interface model.
 * All functions return the relevant information (if there are any) as a promised model if the parsing is successful, undefined otherwise.
 */
export class ServiceNetflix {
    private static readonly logger = new Logger("Netflix Service");

    /**
     * Abstraction to parse a Netflix file regardless its respective parsing function
     * @param fileCode - code of the file to parse
     * @param data - file to parse as Buffer
     */
    static async parseFile(fileCode: FileCodeNetflix, data: Buffer) {
        switch (fileCode) {
            case FileCodeNetflix.ACCOUNT_DETAILS:
                return this.parsePersonalInformation(data);
            case FileCodeNetflix.CONTENT_INTERACTION_PREFERENCES:
                return this.parsePreferences(data);
            case FileCodeNetflix.CONTENT_INTERACTION_MY_LIST:
                return this.parseMyList(data);
            case FileCodeNetflix.CONTENT_INTERACTION_PLAYBACK_EVENTS:
                return this.parsePlaybackEvents(data);
            case FileCodeNetflix.CONTENT_INTERACTION_SEARCH_HISTORY:
                return this.parseSearchHistory(data);
            case FileCodeNetflix.CONTENT_INTERACTION_VIEWING_ACTIVITY:
                return this.parseViewingActivity(data);
            case FileCodeNetflix.PROFILES:
                return this.parseProfiles(data);
            default:
                return undefined;
        }
    }

    /**
     * @param data - file 'ACCOUNT/AccountDetails.csv' in input as Buffer
     */
    static async parsePersonalInformation(data: Buffer): Promise<PersonalInformationNF | undefined> {
        try {
            let result: any = Parser.parseCSVfromBuffer(data);
            if (result && result[0]) {
                let modelInfo: PersonalInformationNF = {};
                (result[0]['First Name'] != '') && (modelInfo.firstName = result[0]['First Name']);
                (result[0]['Last Name'] != '') && (modelInfo.lastName = result[0]['Last Name']);
                (result[0]['Email Address'] != '') && (modelInfo.emailAddress = result[0]['Email Address']);
                (result[0]['Country Of Registration'] != '') && (modelInfo.countryRegistration = result[0]['Country Of Registration']);
                (result[0]['Country Of Signup'] != '') && (modelInfo.countrySignup = result[0]['Country Of Signup']);
                (result[0]['Primary Lang'] != '') && (modelInfo.primaryLang = result[0]['Primary Lang']);
                (result[0]['Cookie Disclosure'] != '') && (modelInfo.cookieDisclosure = result[0]['Cookie Disclosure'].toLowerCase() == 'true');
                (result[0]['Membership Status'] != '') && (modelInfo.membershipStatus = result[0]['Membership Status']);
                (result[0]['Customer Creation Timestamp'] != '') && (modelInfo.creationTime = new Date(result[0]['Customer Creation Timestamp']));
                (result[0]['Has Rejoined'] != '') && (modelInfo.hasRejoined = result[0]['Has Rejoined'].toLowerCase() == 'true');
                (result[0]['Netflix Updates'] != '') && (modelInfo.netflixUpdates = result[0]['Netflix Updates'].toLowerCase() == 'yes');
                (result[0]['Now On Netflix'] != '') && (modelInfo.nowOnNetflix = result[0]['Now On Netflix'].toLowerCase() == 'yes');
                (result[0]['Netflix Offers'] != '') && (modelInfo.netflixOffers = result[0]['Netflix Offers'].toLowerCase() == 'yes');
                (result[0]['Netflix Surveys'] != '') && (modelInfo.netflixSurveys = result[0]['Netflix Surveys'].toLowerCase() == 'yes');
                (result[0]['Netflix Kids And Family'] != '') && (modelInfo.netflixKidsFamily = result[0]['Netflix Kids And Family'].toLowerCase() == 'yes');
                (result[0]['Sms Account Related'] != '') && (modelInfo.smsAccountRelated = result[0]['Sms Account Related'].toLowerCase() == 'yes');
                (result[0]['Sms Content Updates And Special Offers'] != '') && (modelInfo.smsContentUpdates = result[0]['Sms Content Updates And Special Offers'].toLowerCase() == 'yes');
                (result[0]['Test Participation'] != '') && (modelInfo.testParticipation = result[0]['Test Participation'].toLowerCase() == 'yes');
                (result[0]['Whats App'] != '') && (modelInfo.whatsApp = result[0]['Whats App'].toLowerCase() == 'yes');
                (result[0]['Marketing Communications Matched Identifiers'] != '') && (modelInfo.marketingCommunications = result[0]['Marketing Communications Matched Identifiers'].toLowerCase() == 'yes');
                return modelInfo;
            }
            return undefined;
        } catch (error){
            this.logger.log('error', `${error}`,'parsePersonalInformation');
            return undefined;
        }
    }

    /**
     * @param data - file 'CONTENT_INTERACTION/IndicatedPreferences.csv' in input as Buffer
     */
    static async parsePreferences(data: Buffer): Promise<PreferencesAccountNF | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: PreferencesAccountNF = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: PreferenceNF = {}, match;
                    (listItem['Profile Name'] != '') && (newItem.profileName = listItem['Profile Name']);
                    (listItem['Show'] != '') && (newItem.show = listItem['Show']);
                    (listItem['Has Watched'] != '') && (newItem.hasWatched = listItem['Has Watched'].toLowerCase() == 'true');
                    (listItem['Is Interested'] != '') && (newItem.isInterested = listItem['Is Interested'].toLowerCase() == 'true');
                    (listItem['Event Date'] != '') && (match = listItem['Event Date'].split('-'));
                    (listItem['Event Date'] != '') && (newItem.eventDate = new Date(Date.UTC(parseInt(match[0]), parseInt(match[1]) - 1, parseInt(match[2]), 0, 0, 0)));
                    return newItem;
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error){
            this.logger.log('error', `${error}`,'parsePreferences');
            return undefined;
        }
    }

    /**
     * @param data - file 'CONTENT_INTERACTION/MyList.csv' in input as Buffer
     */
    static async parseMyList(data: Buffer): Promise<MyListAccountNF | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: MyListAccountNF = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: TitleNF = {}, match;
                    (listItem['Profile Name'] != '') && (newItem.profileName = listItem['Profile Name']);
                    (listItem['Title Name'] != '') && (newItem.titleName = listItem['Title Name']);
                    (listItem['Country'] != '') && (newItem.country = listItem['Country']);
                    (listItem['Utc Title Add Date'] != '') && (match = listItem['Utc Title Add Date'].split('-'));
                    (listItem['Utc Title Add Date'] != '') && (newItem.titleAddDate = new Date(Date.UTC(parseInt(match[0]), parseInt(match[1]) - 1, parseInt(match[2]), 0, 0, 0)));
                    return newItem;
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error){
            this.logger.log('error', `${error}`,'parseMyList');
            return undefined;
        }
    }

    /**
     * @param data - file 'CONTENT_INTERACTION/SearchHistory.csv' in input as Buffer
     */
    static async parseSearchHistory(data: Buffer): Promise<SearchHistoryNF | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: SearchHistoryNF = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: SearchNF = {}, match;
                    (listItem['Profile Name'] != '') && (newItem.profileName = listItem['Profile Name']);
                    (listItem['Country Iso Code'] != '') && (newItem.countryIsoCode = listItem['Country Iso Code']);
                    (listItem['Device'] != '') && (newItem.device = listItem['Device']);
                    (listItem['Is Kids'] != '') && (newItem.isKids = listItem['Is Kids'] == '1');
                    (listItem['Query Typed'] != '') && (newItem.queryTyped = listItem['Query Typed']);
                    (listItem['Displayed Name'] != '') && (newItem.displayedName = listItem['Displayed Name']);
                    (listItem['Action'] != '') && (newItem.action = listItem['Action']);
                    (listItem['Section'] != '') && (newItem.section = listItem['Section']);
                    (listItem['Utc Timestamp'] != '') && (match = listItem['Utc Timestamp'].match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/));
                    (listItem['Utc Timestamp'] != '') && (newItem.time = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    return newItem;
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error){
            this.logger.log('error', `${error}`,'parseSearchHistory');
            return undefined;
        }
    }

    /**
     * @param data - file 'CONTENT_INTERACTION/ViewingActivity.csv' in input as Buffer
     */
    static async parseViewingActivity(data: Buffer): Promise<ViewingActivityNF | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: ViewingActivityNF = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: ActivityNF = {}, match;
                    (listItem['Profile Name'] != '') && (newItem.profileName = listItem['Profile Name']);
                    (listItem['Start Time'] != '') && (match = listItem['Start Time'].match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/));
                    (listItem['Start Time'] != '') && (newItem.startTime = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    (listItem['Duration'] != '') && (newItem.duration = listItem['Duration']);
                    (listItem['Attributes'] != '') && (newItem.attributes = listItem['Attributes']);
                    (listItem['Title'] != '') && (newItem.title = listItem['Title']);
                    (listItem['Supplemental Video Type'] != '') && (newItem.videoType = listItem['Supplemental Video Type']);
                    (listItem['Device Type'] != '') && (newItem.deviceType = listItem['Device Type']);
                    (listItem['Bookmark'] != '') && (newItem.bookmark = listItem['Bookmark']);
                    (listItem['Latest Bookmark'] != '') && (newItem.latestBookmark = listItem['Latest Bookmark']);
                    (listItem['Country'] != '') && (newItem.country = listItem['Country']);
                    return newItem;
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error){
            this.logger.log('error', `${error}`,'parseViewingActivity');
            return undefined;
        }
    }

    /**
     * @param data - file 'CONTENT_INTERACTION/PlaybackRelatedEvents.csv' in input as Buffer
     */
    static async parsePlaybackEvents(data: Buffer): Promise<PlaybackEventsNF | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: PlaybackEventsNF = {list: []};
                model.list = result.map((listItem: any) => {
                    let newItem: EventNF = {}, match;
                    (listItem['Profile Name'] != '') && (newItem.profileName = listItem['Profile Name']);
                    (listItem['Title Description'] != '') && (newItem.titleDescription = listItem['Title Description'].replace(/""/, '"').replace(/"""/, '""'));
                    (listItem['Device'] != '') && (newItem.device = listItem['Device']);
                    (listItem['Playback Start Utc Ts'] != '') && (match = listItem['Playback Start Utc Ts'].match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/));
                    (listItem['Playback Start Utc Ts'] != '') && (newItem.playbackStartTime = new Date(Date.UTC(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]))));
                    (listItem['Country'] != '') && (newItem.country = listItem['Country']);

                    if (listItem['Playtraces'] != '') {
                        let playTraces = JSON.parse(listItem['Playtraces']);
                        (playTraces.length > 0) && (newItem.playtraces = playTraces);
                    }
                    return newItem;
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error){
            this.logger.log('error', `${error}`,'parsePlaybackEvents');
            return undefined;
        }
    }

    /**
     * @param data - file 'PROFILES/Profiles.csv' in input as Buffer
     */
    static async parseProfiles(data: Buffer): Promise<ProfilesNF | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if(result) {
                let model: ProfilesNF = {list: []}
                model.list = result.map((listItem: any) => {
                    let newItem: ProfileNF = {};
                    (listItem['Profile Name'] != '') && (newItem.profileName = listItem['Profile Name']);
                    (listItem['Email Address'] != '') && (newItem.emailAddress = listItem['Email Address']);
                    (listItem['Profile Creation Time'] != '') && (newItem.profileCreationTime = new Date(listItem['Profile Creation Time']));
                    (listItem['Maturity Level'] != '') && (newItem.maturityLevel = listItem['Maturity Level']);
                    (listItem['Primary Lang'] != '') && (newItem.primaryLanguage = listItem['Primary Lang']);
                    (listItem['Has Auto Playback'] != '') && (newItem.hasAutoPlayback = listItem['Has Auto Playback'].toLowerCase() == 'true');
                    (listItem['Max Stream Quality'] != '') && (newItem.maxStreamQuality = listItem['Max Stream Quality']);
                    (listItem['Profile Lock Enabled'] != '') && (newItem.profileLockEnabled = listItem['Profile Lock Enabled'].toLowerCase() == 'true');
                    return newItem;
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error){
            this.logger.log('error', `${error}`,'parseProfiles');
            return undefined;
        }
    }
}
