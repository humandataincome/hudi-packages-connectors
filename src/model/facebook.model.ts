
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
    gendersInterests?: Array<string>;
    politicalView?: View;
    religiousView?: View;
    bloodInfo?: string;
    websites?: Array<string>;
    address?: AddressLocation;
    phoneNumbers?: Array<string>;
    placesLived?: Array<PlaceLived>;
    pagesInterests?: Array<Pages>;
    registrationDate?: Date;
    profileUri?: string;
}

export interface AdsInteractedWith {
    list: Array<AdvInteraction>;
}

export interface AdsUsingYourInfo {
    list: Array<AdvUsingYourInfo>;
}

export interface SearchHistory {
    listSearches: Array<Search>;
}

export interface CommentsPosted {
    list: Array<CommentPosted>;
}

export interface PagesLiked {
    list: Array<Page>;
}

export interface PagesFollow {
    list: Array<Page>;
}
 export interface AppsConnected {
    list: Array<AppConnected>;
 }

export interface Conversations {
    listInbox?: Array<Conversation>;
}


//-----------------------------------
export interface AppConnected {
    name?: string;
    userAppScopedId?: number;
    category?: string;
    addedTimestamp?: Date;
    removedTimestamp?: Date;
}

export interface Page {
    name?: string;
    date?: Date;
}

export interface AdvInteraction{
    title?: string;
    action?: string;
    date?: Date;
}

export interface CommentPosted {
    text?: string;
    author?: string;
    title?: string;
    date?: Date;
}

export interface AdvUsingYourInfo{
    advertiserName?: string;
    hasDataFileCustomAudience?: boolean;
    hasRemarketingCustomAudience?: boolean;
    hasInPersonStoreVisit?: boolean;
}

export interface Relationship {
    status?: string,
    anniversary?: DateAlternative,
    dateAdded?: Date
}
export interface AddressLocation {
    street?: string;
    city?: string;
    zipcode?: number;
    neighborhood?: string;
    country?: string;
    countryCode?: string;
    region?: string;
}

export interface EducationExperience {
    name?: string;
    startDate?: Date;
    endDate?: Date;
    graduated?: boolean;
    description?: string;
    educationTopics?: Array<string>;
    degree?: string;
    schoolType?: string;
}

export interface WorkExperience {
    employer?: string;
    title?: string;
    location?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
}

export interface PlaceLived {
    place?: string;
    startDate?: Date;
}

export interface Pages {
    category?: string;
    pages?: Array<string>;
}

export interface View {
    name?: string;
    description?: string;
}

export interface Conversation {
    title?: string;
    listMessages?: Array<Message>;
    participants?: Array<string>;
    isStillParticipant?: boolean;
}

export interface Message {
    senderName?: string;
    content?: string;
    link?: string;
    type?: string;
    isUnsent?: boolean;
    date?: Date;
}

export interface DateAlternative {
    year?:number,
    month?:number,
    day?:number
}

export interface Search {
    text?: string;
    date?: Date;
}