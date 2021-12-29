
export interface PersonalInformation {
    'First Name'?: string;
    'Last Name'?: string;
    'Email Address'?: string;
    'Phone Number'?: string;
    'Country Of Registration'?: string;
    'Country Of Signup'?: string;
    'Primary Lang'?: string;
    'Cookie Disclosure'?: boolean;
    'Membership Status'?: string; //there should be an enum (CURRENT_MEMBER,)
    'Customer Creation Timestamp'?: Date;
    'Has Rejoined'?: boolean;
    //all below parameters are YES or NO values
    'Netflix Updates'?: string;
    'Now On Netflix'?: string;
    'Netflix Offers'?: string;
    'Netflix Surveys'?: string;
    'Netflix Kids And Family'?: string;
    'Sms Account Related'?: string;
    'Sms Content Updates And Special Offers'?: string;
    'Test Participation'?: string;
    'Whats App'?: string;
    'Marketing Communications Matched Identifiers'?: string;
}

export interface PreferencesAccount {
    list?: Array<Preference>;
}

export interface MyListAccount {
    list?: Array<Title>;
}

export interface SearchHistory {
    listSearches?: Array<Search>;
}

export interface ViewingActivity {
    listActivities?: Array<Activity>;
}

export interface PlaybackEvents {
    listEvents?: Array<Event>;
}

export interface Profiles {
    list?: Array<Profile>;
}
//----------------------------------
export interface Preference {
    'Profile Name'?: string;
    'Show'?: string;
    'Has Watched'?: boolean;
    'Is Interested'?: boolean;
    'Event Date'?: Date;
}

export interface Title {
    'Profile Name'?: string;
    'Title Name'?: string;
    'Country'?: string;
    'Utc Title Add Date'?: Date;
}

export interface Search {
    'Profile Name'?: string;
    'Country Iso Code'?: string;
    'Device'?: string;
    'Is Kids'?: string;
    'Query Typed'?: string;
    'Displayed Name'?: string;
    'Action'?: string;
    'Section'?: string;
    'Utc Timestamp'?: string;
}

export interface Activity{
    'Profile Name'?: string;
    'Start Time'?: string;
    'Duration'?: string;
    'Attributes'?: string;
    'Title'?: string;
    'Supplemental Video Type'?: string;
    'Device Type'?: string;
    'Bookmark'?: string;
    'Latest Bookmark'?: string;
    'Country'?: string;
}

export interface Event {
    'Profile Name'?: string;
    'Title Description'?: string;
    'Device'?: string;
    'Playback Start Utc Ts'?: string;
    'Country'?: string;
    'Playtraces'?: string;
}

export interface Profile {
    'Profile Name'?: string;
    'Email Address'?: string;
    'Profile Creation Time'?: string;
    'Maturity Level'?: string;
    'Primary Lang'?: string;
    'Has Auto Playback'?: string;
    'Max Stream Quality'?: string;
    'Profile Lock Enabled'?: string;
}