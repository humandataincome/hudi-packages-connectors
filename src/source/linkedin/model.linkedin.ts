import {Months} from "../../utils";

/**
 * Aggregation of information from LinkedIn's models
 */
export interface LinkedInDataAggregator {
    profile: ProfileAggregatorLI;
    jobs: JobsAggregatorLI;
    ads: AdsAggregatorLI;
    //from FileCodeLinkedIn.EDUCATION model
    education?: EducationHistoryLI;
    //from FileCodeLinkedIn.SKILLS model
    skills?: SkillsLI;
    creationDate?: Date;
}

export interface ProfileAggregatorLI {
    //from FileCodeLinkedIn.EMAIL_ADDRESSES model
    emails?: EmailsLI;
    //from FileCodeLinkedIn.PROFILE model
    profile?: ProfileLI;
}

export interface JobsAggregatorLI {
    //from FileCodeLinkedIn.JOBS_APPLICATIONS model
    applications?: JobApplicationsLI;
    //from FileCodeLinkedIn.JOBS_SEEKER_PREFERENCES model
    seekerApplications?: JobSeekerPreferencesLI;
    //from FileCodeLinkedIn.POSITIONS model
    workingPositionHistory?: WorkingPositionsLI;
}

export interface AdsAggregatorLI {
    //from FileCodeLinkedIn.ADS_CLICKED model
    clicked?: AdsClickedLI;
    //from FileCodeLinkedIn.ADS_TARGETING model
    targeting?: AdsClickedLI;
}


//FileCodeLinkedIn.ADS_CLICKED model
export interface AdsClickedLI {
    list: Array<AdvClickedLI>;
}

export interface AdvClickedLI {
    date?: Date;
    title?: string;
}

//FileCodeLinkedIn.CONNECTIONS model
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

//FileCodeLinkedIn.ACCOUNT_STATUS_HISTORY model
export interface AccountStatusHistoryLI {
    list: Array<AccountStatusLI>;
}

export interface AccountStatusLI {
    date?: Date;
    event?: string;
}

//FileCodeLinkedIn.COMPANY_FOLLOWS model
export interface CompaniesFollowedLI {
    list: Array<CompanyFollowedLI>;
}

export interface CompanyFollowedLI {
    organization?: string;
    dateFollow?: Date;
}

//FileCodeLinkedIn.CONTACTS model
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

//FileCodeLinkedIn.EDUCATION model
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

//FileCodeLinkedIn.EMAIL_ADDRESSES model
export interface EmailsLI {
    list: Array<EmailLI>;
}

export interface EmailLI {
    emailAddress?: string;
    confirmed?: boolean;
    primary?: boolean;
    dateUpdate?: Date;
}

//FileCodeLinkedIn.ENDORSEMENT_RECEIVED_INFO_2 model
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

//FileCodeLinkedIn.INFERENCES_ABOUT_YOU model
export interface InferencesAboutYouLI {
    list: Array<InferenceLI>;
}

export interface InferenceLI {
    category?: string;
    typeInference?: string;
    description?: string;
    inference?: boolean;
}

//FileCodeLinkedIn.INVITATIONS model
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

//FileCodeLinkedIn.JOB_APPLICANT_SAVED_ANSWERS model
export interface JobApplicantSavedInfoLI {
    list: Array<QuestionAnswerLI>;
}

//FileCodeLinkedIn.JOB_APPLICANT_SAVED_QUESTION_RESPONSES model
export interface JobApplicantSavedScreeningQuestionInfoLI {
    list: Array<QuestionAnswerLI>;
}

export interface QuestionAnswerLI {
    question: string;
    answer: string;
}

//FileCodeLinkedIn.LEARNING model
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

//FileCodeLinkedIn.LOGINS model
export interface LoginsLI {
    list: Array<LoginLI>;
}

export interface LoginLI {
    loginDate?: Date;
    IPaddress?: string;
    userAgent?: string;
    loginType?: string;
}

//FileCodeLinkedIn.MEMBER_FOLLOWS model
export interface MembersFollowedLI {
    list: Array<MemberFollowsLI>;
}

export interface MemberFollowsLI {
    fullName?: string;
    date?: Date;
    status?: string;
}

//FileCodeLinkedIn.MESSAGE model
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

//FileCodeLinkedIn.PHONE_NUMBERS model
export interface PhoneNumbersLI {
    list: Array<PhoneNumberLI>;
}

export interface PhoneNumberLI {
    extension?: string;
    number?: string;
    type?: string;
}

//FileCodeLinkedIn.POSITIONS model
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


//FileCodeLinkedIn.PROFILE model
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

//FileCodeLinkedIn.REACTIONS model
export interface ReactionsLI {
    list: Array<ReactionLI>;
}

export interface ReactionLI {
    date?: Date;
    type?: string;
    link?: string;
}

//FileCodeLinkedIn.REGISTRATION model
export interface RegistrationLI {
    registeredDate?: Date;
    registeredIP?: string;
    subscriptionTypes?: string;
}

//FileCodeLinkedIn.RICH_MEDIA model
export interface RichMediaListLI {
    list: Array<RichMediaLI>;
}

export interface RichMediaLI {
    type?: string;
    link?: string;
}

//FileCodeLinkedIn.SAVED_JOBS_ALERTS model
export interface SavedJobAlertsLI {
    list: Array<SavedJobAlertLI>;
}

export interface SavedJobAlertLI {
    searchDate?: Date;
    searchURL?: string;
}

//FileCodeLinkedIn.SEARCH_QUERIES model
export interface SearchQueriesLI {
    list: Array<SearchQueryLI>;
}

export interface SearchQueryLI {
    date?: Date;
    query?: string;
}

//FileCodeLinkedIn.SECURITY_CHALLENGES model
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

//FileCodeLinkedIn.SKILLS model
export interface SkillsLI {
    list: Array<string>;
}

//FileCodeLinkedIn.VOTES model
export interface VotesLI {
    list: Array<VoteLI>;
}

export interface VoteLI {
    date?: Date;
    link?: string;
    optionText?: string;
}

//FileCodeLinkedIn.ADS_TARGETING model
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

//FileCodeLinkedIn.JOBS_APPLICATIONS model
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

//FileCodeLinkedIn.JOBS_SAVED_JOBS model
export interface SavedJobsLI {
    list: Array<SavedJobLI>;
}

export interface SavedJobLI {
    savedDate?: Date;
    jobUrl?: string;
    jobTitle?: string;
    companyName?: string;
}

//FileCodeLinkedIn.JOBS_SEEKER_PREFERENCES model
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
