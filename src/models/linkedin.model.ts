
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