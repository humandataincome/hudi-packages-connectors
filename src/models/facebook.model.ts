
export interface PersonalInformation {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    emails?: Array<string>;
    birthdate?: DateLongFormat;
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
    registrationTimestamp?: Date;
    profileUri?: string;
}

export interface AdsInformation {
    listAdsInteractedWith?: Array<AdvInteraction>;
    listAdsUsingYourInfo?: Array<AdvUsingYourInfo>;
}

export interface SearchHistory {
    searches?: Array<string>;
}

export interface CommentsPosted {
    listCommentsPosted?: Array<CommentPosted>;
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
    added_timestamp?: Date;
    user_app_scoped_id?: number;
    category?: Status;
    removed_timestamp?: Date;
}

export enum Status {
    active, inactive, removed
}

export interface Page {
    name?: string;
    timestamp?: Date;
}

export interface AdvInteraction{
    title?: string;
    action?: string;
    timestamp?: Date;
}

export interface CommentPosted {
    text?: string;
    author?: string;
    timestamp?: Date;
    title?: string;
}

export interface AdvUsingYourInfo{
    advertiser_name?: string;
    has_data_file_custom_audience?: boolean;
    has_remarketing_custom_audience?: boolean;
    has_in_person_store_visit?: boolean;
}

export interface Relationship {
    status: string,
    anniversary: DateLongFormat,
    timestamp: Date
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
    start_timestamp?: Date;
    end_timestamp?: Date;
    graduated?: boolean;
    description?: string;
    concentrations?: Array<string>;
    degree?: string;
    school_type?: string;
    timestamp?: Date;
}

export interface WorkExperience {
    employer?: string;
    title?: string;
    location?: string;
    description?: string;
    start_timestamp?: Date;
    end_timestamp?: Date;
    timestamp?: Date;
}

export interface PlaceLived {
    place?: string;
    start_timestamp?: Date;
    timestamp?: Date;
}

export interface Pages {
    category?: string;
    pages?: Array<string>;
}

export interface DateLongFormat {
    year: number;
    month: number;
    day: number;
}

export interface View {
    name?: string;
    description?: string;
    timestamp?: Date;
}

export interface Conversation {
    title: string;
    listMessages: Array<Message>;
    participants: Array<string>;
    is_still_participant: boolean;
}

export interface Message {
    sender_name: string;
    timestamp_ms: Date;
    content: string;
    link?: string;
    type: string;
    is_unsent: boolean;
}
