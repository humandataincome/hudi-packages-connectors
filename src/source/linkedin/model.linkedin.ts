import {Months} from "../../utils";

export interface AdsClickedLI {
    list: Array<AdvClickedLI>;
}

export interface AdvClickedLI {
    date?: Date;
    title?: string;
}

export interface ConnectionsLI {
    list: Array<ConnectionLI>;
}

export interface ConnectionLI {
    firstName?: string;
    lastName?: string;
    emailAddress?: string;
    company?: string;
    position?: string;
    dateConnection?: Date;
}

export interface AccountStatusHistoryLI {
    list: Array<AccountStatusLI>;
}

export interface AccountStatusLI {
    date?: Date;
    event?: string;
}

export interface CompaniesFollowedLI {
    list: Array<CompanyFollowedLI>;
}

export interface CompanyFollowedLI {
    organization?: string;
    dateFollow?: Date;
}

export interface ContactsLI {
    list: Array<ContactLI>;
}

export interface ContactLI {
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

export interface EducationHistoryLI {
    list: Array<EducationLI>;
}

export interface EducationLI {
    schoolName?: string;
    startDate?: Date;
    endDate?: Date;
    notes?: string;
    degreeName?: string;
    activities?: string;
}

export interface EmailsLI {
    list: Array<EmailLI>;
}

export interface EmailLI {
    emailAddress?: string;
    confirmed?: boolean;
    primary?: boolean;
    dateUpdate?: Date;
}

export interface EndorsementsReceivedLI {
    list: Array<EndorsementLI>;
}

export interface EndorsementLI {
    endorsementDate?: Date;
    skillName?: string;
    endorserFirstName?: string;
    endorserLastName?: string;
    endorsementStatus?: string;
}

export interface InferencesAboutYouLI {
    list: Array<InferenceLI>;
}

export interface InferenceLI {
    category?: string;
    typeInference?: string;
    description?: string;
    inference?: boolean;
}

export interface InvitationsLI {
    list: Array<InvitationLI>;
}

export interface InvitationLI {
    from?: string;
    to?: string;
    dataSent?: Date;
    message?: string;
    direction?: string;
}

export interface JobApplicantSavedInfoLI {
    list: Array<QuestionAnswerLI>;
}

export interface JobApplicantSavedScreeningQuestionInfoLI {
    list: Array<QuestionAnswerLI>;
}

export interface QuestionAnswerLI {
    question: string;
    answer: string;
}

export interface LearningsLI {
    list: Array<LearningLI>;
}

export interface LearningLI {
    contentTitle?: string;
    contentDescription?: string;
    contentType?: string;
    contentLastWatchedDate?: Date;
    contentCompletedDate?: Date;
    contentSaved?: boolean;
    notesTakenOnVideos?: string;
}

export interface LoginsLI {
    list: Array<LoginLI>;
}

export interface LoginLI {
    loginDate?: Date;
    IPaddress?: string;
    userAgent?: string;
    loginType?: string;
}

export interface MembersFollowedLI {
    list: Array<MemberFollowsLI>;
}

export interface MemberFollowsLI {
    fullName?: string;
    date?: Date;
    status?: string;
}

export interface MessagesLI {
    list: Array<MessageLI>;
}

export interface MessageLI {
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

export interface PhoneNumbersLI {
    list: Array<PhoneNumberLI>;
}

export interface PhoneNumberLI {
    extension?: string;
    number?: string;
    type?: string;
}

export interface WorkingPositionsLI {
    list: Array<WorkingPositionLI>;
}

export interface WorkingPositionLI {
    companyName?: string;
    title?: string;
    description?: string;
    location?: string;
    startedDate?: Date;
    finishedDate?: Date;
}

export interface ProfileLI {
    firstName?: string;
    lastName?: string;
    maidenName?: string;
    address?: string;
    birthdate?: BirthDateLI;
    headline?: string;
    summary?: string;
    industry?: string;
    zipCode?: string;
    geoLocation?: string;
    twitterHandles?: string;
    websites?: string;
    instantMessengers?: string;
}

export interface BirthDateLI {
    day: number;
    month: Months;
}

export interface ReactionsLI {
    list: Array<ReactionLI>;
}

export interface ReactionLI {
    date?: Date;
    type?: string;
    link?: string;
}

export interface RegistrationLI {
    registeredDate?: Date;
    registeredIP?: string;
    subscriptionTypes?: string;
}

export interface RichMediaListLI {
    list: Array<RichMediaLI>;
}

export interface RichMediaLI {
    type?: string;
    link?: string;
}

export interface SavedJobAlertsLI {
    list: Array<SavedJobAlertLI>;
}

export interface SavedJobAlertLI {
    searchDate?: Date;
    searchURL?: string;
}

export interface SearchQueriesLI {
    list: Array<SearchQueryLI>;
}

export interface SearchQueryLI {
    date?: Date;
    query?: string;
}

export interface SecurityChallengesLI {
    list: Array<SecurityChallengeLI>;
}

export interface SecurityChallengeLI {
    challengeDate?: Date;
    IPaddress?: string;
    userAgent?: string;
    country?: string;
    challengeType?: string;
}

export interface SkillsLI {
    list: Array<string>;
}

export interface VotesLI {
    list: Array<VoteLI>;
}

export interface VoteLI {
    date?: Date;
    link?: string;
    optionText?: string;
}

export interface AdsTargetingLI {
    list: Array<ADVTargetingLI>;
}

export interface ADVTargetingLI {
    memberAge?: string;
    companyNames?: Array<string>;
    degrees?: Array<string>;
    universities?: Array<string>;
    degreeFields?: Array<string>;
    gender?: string;
    degreeYears?: Array<string>;
    expressedInterests?: Array<string>;
    companyCategories?: Array<string>;
    language?: string;
    languageCode?: string;
    jobPreferences?: Array<string>;
    profileLocations?: Array<string>;
    bibliographyTags?: Array<string>;
}

export interface JobApplicationsLI {
    list: Array<JobApplicationLI>;
}

export interface JobApplicationLI {
    applicationDate?: Date;
    contactEmail?: string;
    contactPhoneNumber?: string;
    companyName?: string;
    jobTitle?: string;
    jobUrl?: string;
    resumeName?: string;
    questionAnswers?: string;
}

export interface SavedJobsLI {
    list: Array<SavedJobLI>;
}

export interface SavedJobLI {
    savedDate?: Date;
    jobUrl?: string;
    jobTitle?: string;
    companyName?: string;
}

//Some parameter type may be not correct.
export interface JobSeekerPreferencesLI {
    locations?: Array<string>;
    industries?: Array<string>;
    companyEmployeeCount?: number;
    preferredJobTypes?: Array<string>;
    jobTitles?: string;
    openToRecruiters?: boolean;
    dreamCompanies?: string;
    profileSharedWithJobPoster?: boolean;
    jobTitleForSearchingFastGrowingCompanies?: string;
    introductionStatement?: string;
    phoneNumber?: string;
    jobSeekerActivityLevel?: string;
    preferredStartTimeRange?: string;
    commutePreferenceStartingAddress?: string;
    commutePreferenceStartingTime?: string;
    modeOfTransportation?: string;
    maximumCommuteDuration?: string;
    openCandidateVisibility?: string;
    jobSeekingUrgencyLevel?: string;
}
