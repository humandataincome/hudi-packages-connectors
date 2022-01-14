import Logger from "../utils/logger";
import {BrowserHistory, BrowserSearch, Profile, SearchEngine, SearchEngines} from "../models/google.model";
import {Decoding} from "../utils/decoding";
import {Validating} from "../utils/validating";

/**
 * Class used to parse most important files into the directory returned by Google in CSV and JSON formats.
 * All the files are given in input as Buffer, parsed to JSON and then mapped into a specific interface model.
 * All functions return the relevant information (if there are any) as a promised model if the parsing is successful, undefined otherwise.
 */
export class GoogleService {
    private logger = new Logger("Google Service");

    /**
     * @param data - file 'Takeout/Profilo/Profilo.json' in input as Buffer
     * @return {Promise<Profile | undefined>}
     */
    async parseProfile(data: Buffer): Promise<Profile | undefined> {
        let model: Profile = {}, match;
        try {
            let document = JSON.parse(data.toString());
            (document.name.givenName) && (model.givenName = Decoding.decodeObject(document.name.givenName));
            (document.name.familyName) && (model.familyName = Decoding.decodeObject(document.name.familyName));
            (document.name.formattedName) && (model.formattedName = Decoding.decodeObject(document.name.formattedName));
            (document.displayName) && (model.displayName = Decoding.decodeObject(document.displayName));
            (document.emails) && (model.emails = document.emails.map((object: any) => Decoding.decodeObject(object.value)));
            (document.birthday) && (match = document.birthday.match(/(\d+)-(\d+)-(\d+)/));
            model.birthdate = new Date(Date.UTC(match[1], match[2]-1, match[3], 0, 0, 0));
            (document.gender.type) && (model.gender = Decoding.decodeObject(document.gender.type));
            return !Validating.objectIsEmpty(model) ? model : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseProfile');
        }
    }

    /**
     * @param data - file 'Takeout/Chrome/BrowserHistory.json' in input as Buffer
     * @return {Promise<BrowserHistory | undefined>}
     */
    async parseBrowseHistory(data: Buffer): Promise<BrowserHistory | undefined> {
        let model: BrowserHistory = {list: []};
        try {
            let document = JSON.parse(data.toString());
            model.list = document["Browser History"].map((value: any) => {
                let newValue: BrowserSearch = {};
                (value.title) && (newValue.title = value.title);
                (value.url) && (newValue.url = value.url);
                (value.page_transition) && (newValue.pageTransition = value.page_transition);
                (value.client_id) && (newValue.clientId = value.client_id);
                (value.time_usec) && (newValue.time = new Date(parseInt(value.time_usec)/1000));
                (value.favicon_url) && (newValue.faviconUrl = value.favicon_url);
                return newValue;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseBrowseHistory');
        }
    }

    /**
     * @param data - file 'Takeout/Chrome/SearchEngines.json' in input as Buffer
     * @return {Promise<SearchEngines | undefined>}
     */
    async parseSearchEngines(data: Buffer): Promise<SearchEngines | undefined> {
        let model: SearchEngines = {list: []};
        try {
            let document = JSON.parse(data.toString());
            model.list = document["Search Engines"].map((value: any) => {
                let newValue: SearchEngine = {};
                (value.suggestions_url) && (newValue.suggestionsUrl = value.suggestions_url);
                (value.favicon_url) && (newValue.faviconUrl = value.favicon_url);
                (value.safe_for_autoreplace != undefined) && (newValue.safeForAutoreplace = value.safe_for_autoreplace);
                (value.is_active) && (newValue.isActive = value.is_active);
                (value.date_created) && (newValue.dateCreated = new Date(parseInt(value.date_created)/10000));
                (value.url) && (newValue.url = value.url);
                (value.new_tab_url) && (newValue.newTabUrl = value.new_tab_url);
                (value.originating_url) && (newValue.originatingUrl = value.originating_url);
                (value.sync_guid) && (newValue.syncGuid = value.sync_guid);
                (value.short_name) && (newValue.shortName = value.short_name);
                (value.keyword) && (newValue.keyword = value.keyword);
                (value.input_encodings) && (newValue.inputEncodings = value.input_encodings);
                (value.prepopulate_id >= 0) && (newValue.prepopulateId = value.prepopulate_id);
                (value.last_modified) && (newValue.lastModified = new Date(parseInt(value.last_modified)/10000));
                return newValue;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseSearchEngines');
        }
    }

}