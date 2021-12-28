
export interface PersonalInformation {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    emails?: Array<string>;
    birthdate?: Date;
    gender?: string;
    currentCity?: string;
    homeTown?: string;
    relationship?: Relationship;
    educationExperiences?: Array<EducationExperience>;
    workExperience?: Array<WorkExperience>;
    languages?: Array<string>;
    interestedInGenders?: Array<string>;
    politicalView?: View;
    religiousView?: View;
    bloodInfo?: string;
    websites?: Array<string>;
    address?: Location;
    phoneNumbers?: Array<string>;
    placesLived?: Array<PlaceLived>;
    pagesInterests?: Array<Pages>;
    registrationTimestamp?: number;
    profileUri?: string;
}

export interface AdsInteractedWith {
    list?: Array<AdvInteraction>;
}

export interface AdsUsingYourInfo {
    list?: Array<AdvUsingYourInfo>;
}

export interface SearchHistory {
    searches?: Array<string>;
}

export interface CommentsPosted {
    list?: Array<CommentPosted | undefined>;
}

export interface PagesLiked{
    listPages?: Array<Page>;
}

export interface PagesFollow{
    listPages?: Array<Page>;
}
 export interface AppsConnected {
    listApps?: Array<AppConnected>;
 }

export interface Conversations {
    listInbox?: Array<Conversation>;
}


//-----------------------------------
export interface AppConnected {
    name?: string;
    addedTimestamp?: number;
    userAppScopedId?: number;
    category?: Status;
    removedTimestamp?: number;
}

export enum Status {
    active, inactive, removed
}

export interface Page {
    name?: string;
    timestamp?: number;
}

export interface AdvInteraction{
    title?: string;
    action?: string;
    timestamp?: number;
}

export interface CommentPosted {
    text?: string;
    author?: string;
    timestamp?: number;
    title?: string;
}

export interface AdvUsingYourInfo{
    advertiser_name?: string;
    has_data_file_custom_audience?: boolean;
    has_remarketing_custom_audience?: boolean;
    has_in_person_store_visit?: boolean;
}

export interface Relationship {
    status?: string,
    anniversary?: DateAlternative,
    timestamp?: number
}
export interface Location {
    street?: string;
    city?: string;
    zipcode?: number;
    neighborhood?: string;
    country?: string;
    country_code?: string;
    region?: string;
}

export interface EducationExperience {
    name?: string;
    start_timestamp?: number;
    end_timestamp?: number;
    graduated?: boolean;
    description?: string;
    concentrations?: Array<string>;
    degree?: string;
    school_type?: string;
    timestamp?: number;
}

export interface WorkExperience {
    employer?: string;
    title?: string;
    location?: string;
    description?: string;
    start_timestamp?: number;
    end_timestamp?: number;
    timestamp?: number;
}

export interface PlaceLived {
    place?: string;
    start_timestamp?: number;
    timestamp?: number;
}

export interface Pages {
    category?: string;
    pages?: Array<string>;
}

export interface View {
    name?: string;
    description?: string;
    timestamp?: number;
}

export interface Conversation {
    title: string;
    listMessages: Array<Message>;
    participants: Array<string>;
    is_still_participant: boolean;
}

export interface Message {
    sender_name: string;
    timestamp_ms: number;
    content: string;
    link?: string;
    type: string;
    is_unsent: boolean;
}

export interface DateAlternative {
    year?:number,
    month?:number,
    day?:number
}