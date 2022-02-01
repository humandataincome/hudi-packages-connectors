import {Months} from "../utils/utils.enum";

export interface AdsClicked {
    list: Array<AdvClicked>;
}

export interface AdvClicked {
    date?: Date;
    title?: string;
}

export interface Connections {
    list: Array<Connection>;
}

export interface Connection {
    firstName?: string;
    lastName?: string;
    emailAddress?: string;
    company?: string;
    position?: string;
    dateConnection?: Date;
}

export interface AccountStatusHistory {
    list: Array<AccountStatus>;
}

export interface AccountStatus {
    date?: Date;
    event?: string;
}

export interface CompaniesFollowed {
    list: Array<CompanyFollowed>;
}

export interface CompanyFollowed {
    organization?: string;
    dateFollow?: Date;
}

export interface Contacts {
    list: Array<Contact>;
}

export interface Contact {
    source?: string;
    firstName?: string;
    lastName?: string;
    companies?: string;
    title?: string;
    emails?: string;
    phoneNumbers?: string;
    dateCreation?: Date;
    addresses?: string;
    sites?: string;
    instantMessageHandles?: string;
    fullName?: string;
    birthday?: string;
    location?: string;
    bookmarkedAt?: string;
    profiles?: string;
}

export interface EducationHistory {
    list: Array<Education>;
}

export interface Education {
    schoolName?: string;
    startDate?: Date;
    endDate?: Date;
    notes?: string;
    degreeName?: string;
    activities?: string;
}

export interface Emails {
    list: Array<Email>;
}

export interface Email {
    emailAddress?: string;
    confirmed?: boolean;
    primary?: boolean;
    dateUpdate?: Date;
}

export interface EndorsementsReceived {
    list: Array<Endorsement>;
}

export interface Endorsement {
    endorsementDate?: Date;
    skillName?: string;
    endorserFirstName?: string;
    endorserLastName?: string;
    endorsementStatus?: string;
}

export interface InferencesAboutYou {
    list: Array<Inference>;
}

export interface Inference {
    category?: string;
    typeInference?: string;
    description?: string;
    inference?: boolean;
}

export interface Invitations {
    list: Array<Invitation>;
}

export interface Invitation {
    from?: string;
    to?: string;
    dataSent?: Date;
    message?: string;
    direction?: string;
}

export interface JobApplicantSavedInfo {
    list: Array<QuestionAnswer>;
}

export interface JobApplicantSavedScreeningQuestionInfo {
    list: Array<QuestionAnswer>;
}

export interface QuestionAnswer {
    question: string;
    answer: string;
}

export interface Learnings {
    list: Array<Learning>;
}

export interface Learning {
    contentTitle?: string;
    contentDescription?: string;
    contentType?: string;
    contentLastWatchedDate?: Date;
    contentCompletedDate?: Date;
    contentSaved?: boolean;
    notesTakenOnVideos?: string;
}

export interface Logins {
    list: Array<Login>;
}

export interface Login {
    loginDate?: Date;
    IPaddress?: string;
    userAgent?: string;
    loginType?: string;
}

export interface MembersFollowed {
    list: Array<MemberFollows>;
}

export interface MemberFollows {
    fullName?: string;
    date?: Date;
    status?: string;
}

export interface Messages {
    list: Array<Message>;
}

export interface Message {
    conversationID?: string;
    conversationTitle?: string;
    from?: string;
    senderProfileURL?: string;
    to?: string;
    date?: Date;
    subject?: string;
    content?: string;
    folder?: string;
}

export interface PhoneNumbers {
    list: Array<PhoneNumber>;
}

export interface PhoneNumber {
    extension?: string;
    number?: string;
    type?: string;
}

export interface WorkingPositions {
    list: Array<WorkingPosition>;
}

export interface WorkingPosition {
    companyName?: string;
    title?: string;
    description?: string;
    location?: string;
    startedDate?: Date;
    finishedDate?: Date;
}

export interface Profile {
    firstName?: string;
    lastName?: string;
    maidenName?: string;
    address?: string;
    birthdate?: BirthDate;
    headline?: string;
    summary?: string;
    industry?: string;
    zipCode?: string;
    geoLocation?: string;
    twitterHandles?: string;
    websites?: string;
    instantMessengers?: string;
}

export interface BirthDate {
    day: number;
    month: Months;
}

export interface Reactions {
    list: Array<Reaction>;
}

export interface Reaction {
    date?: Date;
    type?: string;
    link?: string;
}

export interface Registration {
    registeredDate?: Date;
    registeredIP?: string;
    subscriptionTypes?: string;
}

export interface RichMediaList {
    list: Array<RichMedia>;
}

export interface RichMedia {
    type?: string;
    link?: string;
}

export interface SavedJobAlerts {
    list: Array<SavedJobAlert>;
}

export interface SavedJobAlert {
    searchDate?: Date;
    searchURL?: string;
}

export interface SearchQueries {
    list: Array<SearchQuery>;
}

export interface SearchQuery {
    date?: Date;
    query?: string;
}

export interface SecurityChallenges {
    list: Array<SecurityChallenge>;
}

export interface SecurityChallenge {
    challengeDate?: Date;
    IPaddress?: string;
    userAgent?: string;
    country?: string;
    challengeType?: string;
}

export interface Skills {
    list: Array<string>;
}

export interface Votes {
    list: Array<Vote>;
}

export interface Vote {
    date?: Date;
    link?: string;
    optionText?: string;
}