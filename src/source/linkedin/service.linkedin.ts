import Logger from "../../utils/logger";
import {
    AccountStatusHistoryLI,
    AccountStatusLI,
    AdsClickedLI, AdsTargetingLI,
    AdvClickedLI, ADVTargetingLI,
    CompaniesFollowedLI,
    CompanyFollowedLI,
    ConnectionLI,
    ConnectionsLI,
    ContactLI,
    ContactsLI,
    EducationHistoryLI,
    EducationLI,
    EmailLI,
    EmailsLI,
    EndorsementLI,
    EndorsementsReceivedLI,
    InferenceLI,
    InferencesAboutYouLI,
    InvitationLI,
    InvitationsLI,
    JobApplicantSavedInfoLI,
    JobApplicantSavedScreeningQuestionInfoLI, JobApplicationLI, JobApplicationsLI, JobSeekerPreferencesLI,
    LearningLI,
    LearningsLI,
    LoginLI,
    LoginsLI,
    MemberFollowsLI,
    MembersFollowedLI,
    MessageLI,
    MessagesLI,
    PhoneNumberLI,
    PhoneNumbersLI,
    ProfileLI,
    QuestionAnswerLI,
    ReactionLI,
    ReactionsLI,
    RegistrationLI,
    RichMediaLI,
    RichMediaListLI,
    SavedJobAlertLI,
    SavedJobAlertsLI, SavedJobLI, SavedJobsLI,
    SearchQueriesLI,
    SearchQueryLI,
    SecurityChallengeLI,
    SecurityChallengesLI, SkillsLI, VoteLI, VotesLI,
    WorkingPositionLI,
    WorkingPositionsLI
} from "./model.linkedin";
import {Parser} from "../../utils/parser";
import {Months} from "../../utils";
import {ValidatorObject} from "../../utils/validator/validator.object";
import {FileCodeLinkedIn} from "./enum.linkedin";

/**
 * Class used to parse most important files into the directory returned by LinkedIn in CSV format.
 * All the files are given in input as Buffer, parsed back to JSON and then mapped into a specific interface model.
 * All functions return the relevant information (if there are any) as a promised model if the parsing is successful, undefined otherwise.
 */
export class ServiceLinkedin {
    private static readonly logger = new Logger("Linkedin Service");

    /**
     * Abstraction to parse a LinkedIn file regardless its respective parsing function
     * @param fileCode - code of the file to parse
     * @param data - file to parse as Buffer
     */
    static async parseFile(fileCode: FileCodeLinkedIn, data: Buffer) {
        switch (fileCode) {
            case FileCodeLinkedIn.JOBS_APPLICATIONS:
                return this.parseJobApplications(data);
            case FileCodeLinkedIn.JOBS_SEEKER_PREFERENCES:
                return this.parseJobSeekerPreferences(data);
            case FileCodeLinkedIn.JOBS_SAVED_JOBS:
                return this.parseSavedJobs(data);
            case FileCodeLinkedIn.ACCOUNT_STATUS_HISTORY:
                return this.parseAccountStatusHistory(data);
            case FileCodeLinkedIn.ADS_CLICKED:
                return this.parseAdsClicked(data);
            case FileCodeLinkedIn.COMPANY_FOLLOWS:
                return this.parseCompaniesFollowed(data);
            case FileCodeLinkedIn.CONNECTIONS:
                return this.parseConnections(data);
            case FileCodeLinkedIn.CONTACTS:
                return this.parseContacts(data);
            case FileCodeLinkedIn.EDUCATION:
                return this.parseEducationHistory(data);
            case FileCodeLinkedIn.EMAIL_ADDRESSES:
                return this.parseEmails(data);
            case FileCodeLinkedIn.ENDORSEMENT_RECEIVED_INFO_2:
                return this.parseEndorsementsReceived(data);
            case FileCodeLinkedIn.INFERENCES_ABOUT_YOU:
                return this.parseInferencesAboutYou(data);
            case FileCodeLinkedIn.INVITATIONS:
                return this.parseInvitations(data);
            case FileCodeLinkedIn.JOB_APPLICANT_SAVED_ANSWERS:
                return this.parseJobApplicantSavedInfo(data);
            case FileCodeLinkedIn.JOB_APPLICANT_SAVED_QUESTION_RESPONSES:
                return this.parseJobApplicantSavedScreeningQuestionInfo(data);
            case FileCodeLinkedIn.LEARNING:
                return this.parseLearnings(data);
            case FileCodeLinkedIn.LOGINS:
                return this.parseLogins(data);
            case FileCodeLinkedIn.MEMBER_FOLLOWS:
                return this.parseMembersFollowed(data);
            case FileCodeLinkedIn.PHONE_NUMBERS:
                return this.parsePhoneNumbers(data);
            case FileCodeLinkedIn.POSITIONS:
                return this.parseWorkingPositions(data);
            case FileCodeLinkedIn.PROFILE:
                return this.parseProfile(data);
            case FileCodeLinkedIn.REACTIONS:
                return this.parseReactions(data);
            case FileCodeLinkedIn.REGISTRATION:
                return this.parseRegistration(data);
            case FileCodeLinkedIn.RICH_MEDIA:
                return this.parseRichMediaList(data);
            case FileCodeLinkedIn.SAVED_JOBS_ALERTS:
                return this.parseSavedJobAlerts(data);
            case FileCodeLinkedIn.SEARCH_QUERIES:
                return this.parseSearchQueries(data);
            case FileCodeLinkedIn.SECURITY_CHALLENGES:
                return this.parseSecurityChallenges(data);
            case FileCodeLinkedIn.SKILLS:
                return this.parseSkills(data);
            case FileCodeLinkedIn.VOTES:
                return this.parseVotes(data);
            default:
                return undefined;
        }
    }

    /**
     * @param data - file 'Account Status History.csv' in input as Buffer
     */
    static async parseAccountStatusHistory(data: Buffer): Promise<AccountStatusHistoryLI | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data, {delimitersToGuess: [',', '\t'], escapeChar: '"', header: true, skipEmptyLines: false });
            if (result) {
                let model: AccountStatusHistoryLI = {list: []};
                result.forEach((listItem: any) => {
                    let newItem: AccountStatusLI = {};
                    if (listItem['Time'] != '') {
                        let match = listItem['Time'].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+)/);
                        (match) && (newItem.date = new Date(Date.UTC(match[1], match[2] - 1, match[3], match[4], match[5], match[6])));
                    }
                    (listItem['Event'] != '') && (newItem.event = listItem['Event']);
                    !ValidatorObject.objectIsEmpty(newItem) && (model.list.push(newItem));
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseAccountStatusHistory');
            return undefined;
        }
    }


    /**
     * @param data - file 'Ads Clicked.csv' in input as Buffer
     */
    static async parseAdsClicked(data: Buffer): Promise<AdsClickedLI | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: AdsClickedLI = {list: []};
                result.forEach((listItem: any) => {
                    let newItem: AdvClickedLI = {};
                    if (listItem['Ad clicked Date'] != '') {
                        let match = listItem['Ad clicked Date'].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+)/);
                        (match) && (newItem.date = new Date(Date.UTC(match[1], match[2] - 1, match[3], match[4], match[5], match[6])));
                    }
                    (listItem['Ad Title/Id'] != '') && (newItem.title = listItem['Ad Title/Id']);
                    !ValidatorObject.objectIsEmpty(newItem) && (model.list.push(newItem));
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseAdsClicked');
            return undefined;
        }
    }


    /**
     * @param data - file 'Company Follows.csv' in input as Buffer
     */
    static async parseCompaniesFollowed(data: Buffer): Promise<CompaniesFollowedLI | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: CompaniesFollowedLI = {list: []};
                result.forEach((listItem: any) => {
                    let newItem: CompanyFollowedLI = {};
                    (listItem['Organization'] != '') && (newItem.organization = listItem['Organization']);
                    if (listItem['Followed On'] != '') {
                        let match = listItem['Followed On'].match(/(\w+) (\w+) (\d+) (\d+):(\d+):(\d+) UTC (\d+)/);
                        (match) && (newItem.dateFollow = new Date(Date.UTC(match[7], parseInt((Months[match[2].toUpperCase()])) - 1, match[3], match[4], match[5], match[6])));
                    }
                    !ValidatorObject.objectIsEmpty(newItem) && (model.list.push(newItem));
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseCompaniesFollowed');
            return undefined;
        }
    }

    /**
     * @param data - file 'Connections.csv' in input as Buffer
     */
    static async parseConnections(data: Buffer): Promise<ConnectionsLI | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data, {escapeChar: '"', header: false, skipEmptyLines: true} );
            if (result) {
                let model: ConnectionsLI = {list: []};
                result = result.splice(3);
                result.map((entry: any) => {
                    let newItem: ConnectionLI = {};
                    (entry[0] != '') && (newItem.firstName = entry[0]);
                    (entry[1] != '') && (newItem.lastName = entry[1]);
                    (entry[2] != '') && (newItem.emailAddress = entry[2]);
                    (entry[3] != '') && (newItem.company = entry[3]);
                    (entry[4] != '') && (newItem.position = entry[4]);
                    if (entry[5] != '') {
                        let match = entry[5].match(/(\d+) (\w+) (\d+)/);
                        (match) && (newItem.dateConnection = new Date(Date.UTC(match[3], parseInt((Months[match[2].toUpperCase()])) - 1, match[1], 0, 0, 0)));
                    }
                    !ValidatorObject.objectIsEmpty(newItem) && (model.list.push(newItem));
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseConnections');
            return undefined;
        }
    }

    /**
     * @param data - file 'Contacts.csv' in input as Buffer
     */
    static async parseContacts(data: Buffer): Promise<ContactsLI | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: ContactsLI = {list: []};
                result.forEach((listItem: any) => {
                    let newItem: ContactLI = {};
                    (listItem['Source'] != '') && (newItem.source = listItem['Source']);
                    (listItem['FirstName'] != '') && (newItem.firstName = listItem['FirstName']);
                    (listItem['LastName'] != '') && (newItem.lastName = listItem['LastName']);
                    (listItem['Companies'] != '') && (newItem.companies = listItem['Companies']);
                    (listItem['Title'] != '') && (newItem.title = listItem['Title']);
                    (listItem['Emails'] != '') && (newItem.emails = listItem['Emails']);
                    (listItem['PhoneNumbers'] != '') && (newItem.phoneNumbers = listItem['PhoneNumbers']);

                    if (listItem['CreatedAt'] != '') {
                        let match = listItem['CreatedAt'].match(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+) (\w+)/);
                        (match) && (newItem.dateCreation = new Date(Date.UTC(2000+parseInt(match[3]), match[1] - 1, match[2], (match[6] == 'AM') ? match[4] : parseInt(match[4])+12, match[5], 0)));
                    }

                    (listItem['Addresses'] != '') && (newItem.addresses = listItem['Addresses']);
                    (listItem['Sites'] != '') && (newItem.sites = listItem['Sites']);
                    (listItem['InstantMessageHandles'] != '') && (newItem.instantMessageHandles = listItem['InstantMessageHandles']);
                    (listItem['FullName'] != '') && (newItem.fullName = listItem['FullName']);
                    (listItem['Birthday'] != '') && (newItem.birthday = listItem['Birthday']);
                    (listItem['Location'] != '') && (newItem.location = listItem['Location']);
                    (listItem['BookmarkedAt'] != '') && (newItem.bookmarkedAt = listItem['BookmarkedAt']);
                    (listItem['Profiles'] != '') && (newItem.profiles = listItem['Profiles']);
                    !ValidatorObject.objectIsEmpty(newItem) && (model.list.push(newItem));
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseContacts');
            return undefined;
        }
    }

    /**
     * @param data - file 'Education.csv' in input as Buffer
     */
    static async parseEducationHistory(data: Buffer): Promise<EducationHistoryLI | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: EducationHistoryLI = {list: []};
                result.forEach((listItem: any) => {
                    let newItem: EducationLI = {};
                    (listItem['School Name'] != '') && (newItem.schoolName = listItem['School Name']);
                    if (listItem['Start Date'] != '') {
                        let match = listItem['Start Date'].match(/(\w+) (\d+)/);
                        (match) && (newItem.startDate = new Date(Date.UTC(match[2], parseInt((Months[match[1].toUpperCase()])) - 1, 1, 0, 0, 0, 0)));
                    }
                    if (listItem['End Date'] != '') {
                        let match = listItem['End Date'].match(/(\w+) (\d+)/);
                        (match) && (newItem.endDate = new Date(Date.UTC(match[2], parseInt((Months[match[1].toUpperCase()])) - 1, 1, 0, 0, 0, 0)));
                    }
                    (listItem['Notes'] != '') && (newItem.notes = listItem['Notes']);
                    (listItem['Degree Name'] != '') && (newItem.degreeName = listItem['Degree Name']);
                    (listItem['Activities'] != '') && (newItem.activities = listItem['Activities']);
                    !ValidatorObject.objectIsEmpty(newItem) && (model.list.push(newItem));
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseEducationHistory');
            return undefined;
        }
    }

    /**
     * @param data - file 'Email Addresses.csv' in input as Buffer
     */
    static async parseEmails(data: Buffer): Promise<EmailsLI | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: EmailsLI = {list: []};
                result.forEach((listItem: any) => {
                    let newItem: EmailLI = {};
                    (listItem['Email Address'] != '') && (newItem.emailAddress = listItem['Email Address']);
                    (listItem['Confirmed'] != '') && (newItem.confirmed = listItem['Confirmed'].toLowerCase() == 'yes');
                    (listItem['Primary'] != '') && (newItem.primary = listItem['Primary'].toLowerCase() == 'yes');
                    if (listItem['Updated On'] != '') {
                        let match = listItem['Updated On'].match(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+) (\w+)/);
                        (match) && (newItem.dateUpdate = new Date(Date.UTC(2000+parseInt(match[3]), match[1] - 1, match[2], (match[6] == 'AM') ? match[4] : parseInt(match[4])+12, match[5], 0)));
                    }
                    !ValidatorObject.objectIsEmpty(newItem) && (model.list.push(newItem));
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseEmails');
            return undefined;
        }
    }

    /**
     * @param data - file 'Endorsement_Received_Info.csv' in input as Buffer
     */
    static async parseEndorsementsReceived(data: Buffer): Promise<EndorsementsReceivedLI | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: EndorsementsReceivedLI = {list: []};
                result.forEach((listItem: any) => {
                    let newItem: EndorsementLI = {};
                    if (listItem['Endorsement Date'] != '') {
                        let match = listItem['Endorsement Date'].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+)/);
                        (match) && (newItem.endorsementDate = new Date(Date.UTC(match[1], match[2] - 1, match[3], match[4], match[5], match[6])));
                    }
                    (listItem['Skill Name'] != '') && (newItem.skillName = listItem['Skill Name']);
                    (listItem['Endorser First Name'] != '') && (newItem.endorserFirstName = listItem['Endorser First Name']);
                    (listItem['Endorser Last Name'] != '') && (newItem.endorserLastName = listItem['Endorser Last Name']);
                    (listItem['Endorsement Status'] != '') && (newItem.endorsementStatus = listItem['Endorsement Status']);
                    !ValidatorObject.objectIsEmpty(newItem) && (model.list.push(newItem));
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseEndorsementsReceived');
            return undefined;
        }
    }


    /**
     * @param data - file 'Inferences_about_you.csv' in input as Buffer
     */
    static async parseInferencesAboutYou(data: Buffer): Promise<InferencesAboutYouLI | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: InferencesAboutYouLI = {list: []};
                result.forEach((listItem: any) => {
                    let newItem: InferenceLI = {};
                    (listItem['Category'] != '') && (newItem.category = listItem['Category']);
                    (listItem['Type of inference'] != '') && (newItem.typeInference = listItem['Type of inference']);
                    (listItem['Description'] != '') && (newItem.description = listItem['Description']);
                    (listItem['Inference'] != '') && (newItem.inference =
                        (parseInt(listItem['Inference']) == 1 || listItem['Inference'].toLowerCase() == 'yes' || listItem['Inference'].toLowerCase() == 'true'));
                    !ValidatorObject.objectIsEmpty(newItem) && (model.list.push(newItem));
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseInferencesAboutYou');
            return undefined;
        }
    }

    /**
     * @param data - file 'Invitations.csv' in input as Buffer
     */
    static async parseInvitations(data: Buffer): Promise<InvitationsLI | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: InvitationsLI = {list: []};
                result.forEach((listItem: any) => {
                    let newItem: InvitationLI = {};
                    (listItem['From'] != '') && (newItem.from = listItem['From']);
                    (listItem['To'] != '') && (newItem.to = listItem['To']);
                    if (listItem['Sent At'] != '') {
                        let match = listItem['Sent At'].match(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+) (\w+)/);
                        (match) && (newItem.dataSent = new Date(Date.UTC(2000+parseInt(match[3]), match[1] - 1, match[2], (match[6] == 'AM') ? match[4] : parseInt(match[4])+12, match[5], 0)));
                    }
                    (listItem['Message'] != '') && (newItem.message = listItem['Message']);
                    (listItem['Direction'] != '') && (newItem.direction = listItem['Direction']);
                    !ValidatorObject.objectIsEmpty(newItem) && (model.list.push(newItem));
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseInvitations');
            return undefined;
        }
    }

    /**
     * @param data - file 'Job Applicant Saved Answers.csv' in input as Buffer
     */
    static async parseJobApplicantSavedInfo(data: Buffer): Promise<JobApplicantSavedInfoLI | undefined> {
        try {
            let result = <Array<QuestionAnswerLI>>Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: JobApplicantSavedInfoLI = {list: []};
                result.map((item: any) => {
                    if(item['Question'] != '' && item['Answer'] != '') {
                        model.list.push({question: item['Question'], answer: item['Answer']});
                    }
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseJobApplicantSavedInfo');
            return undefined;
        }
    }

    /**
     * @param data - file 'Job Applicant Saved Screening Question Responses.csv' in input as Buffer
     */
    static async parseJobApplicantSavedScreeningQuestionInfo(data: Buffer): Promise<JobApplicantSavedScreeningQuestionInfoLI | undefined> {
        try {
            let result = <Array<QuestionAnswerLI>>Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: JobApplicantSavedScreeningQuestionInfoLI = {list: []};
                result.forEach((item: any) => {
                    if(item['Question'] != '' && item['Answer'] != '') {
                        model.list.push({question: item['Question'], answer: item['Answer']});
                    }
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseJobApplicantSavedScreeningQuestionInfo');
            return undefined;
        }
    }

    /**
     * @param data - file 'Learning.csv' in input as Buffer
     */
    static async parseLearnings(data: Buffer): Promise<LearningsLI | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: LearningsLI = {list: []};
                result.forEach((item: any) => {
                    let newItem: LearningLI = {};
                    (item['Content Title'] != '') && (newItem.contentTitle = item['Content Title']);
                    (item['Content Description'] != '') && (newItem.contentDescription = item['Content Description']);
                    (item['Content Type'] != '') && (newItem.contentType = item['Content Type']);
                    if (item['Content Last Watched Date (if viewed)'] != '' &&  item['Content Last Watched Date (if viewed)'] != 'N/A') {
                        let match = item['Content Last Watched Date (if viewed)'].match(/(\d+)-(\d+)-(\d+) (\d+):(\d+) UTC/);
                        newItem.contentLastWatchedDate = new Date(Date.UTC(match[1], match[2] - 1, match[3], match[4], match[5],0));
                    }
                    if (item['Content Completed At (if completed)'] != '' &&  item['Content Completed At (if completed)'] != 'N/A') {
                        let match = item['Content Completed At (if completed)'].match(/(\d+)-(\d+)-(\d+) (\d+):(\d+) UTC/);
                        newItem.contentCompletedDate = new Date(Date.UTC(match[1], match[2] - 1, match[3], match[4], match[5],0));
                    }
                    (item['Content Saved'] != undefined) && (newItem.contentSaved = item['Content Saved']);
                    (item['Notes taken on videos (if taken)'] != '' && item['Notes taken on videos (if taken)'] != 'N/A') && (newItem.notesTakenOnVideos = item['Notes taken on videos (if taken)']);
                    !ValidatorObject.objectIsEmpty(item) && model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseLearnings');
            return undefined;
        }
    }

    /**
     * @param data - file 'Logins.csv' in input as Buffer
     */
    static async parseLogins(data: Buffer): Promise<LoginsLI | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: LoginsLI = {list: []};
                result.forEach((item: any) => {
                    let newItem: LoginLI = {};
                    if (item['Login Date'] != '') {
                        let match = item['Login Date'].match(/(\w+) (\w+) (\d+) (\d+):(\d+):(\d+) UTC (\d+)/);
                        newItem.loginDate = new Date(Date.UTC(match[7], parseInt(Months[match[2].toUpperCase()]) - 1, match[3], match[4], match[5], match[6]));
                    }
                    (item['IP Address'] != '') && (newItem.IPaddress = item['IP Address']);
                    (item['User Agent'] != '') && (newItem.userAgent = item['User Agent']);
                    (item['Login Type'] != '') && (newItem.loginType = item['Login Type']);
                    !ValidatorObject.objectIsEmpty(item) && model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseLogins');
            return undefined;
        }
    }

    /**
     * @param data - file 'Member_Follows.csv' in input as Buffer
     */
    static async parseMembersFollowed(data: Buffer): Promise<MembersFollowedLI | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: MembersFollowedLI = {list: []};
                result.forEach((item: any) => {
                    let newItem: MemberFollowsLI = {};
                    if (item['Date'] != '') {
                        let match = item['Date'].match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/);
                        newItem.date = new Date(Date.UTC(match[1], match[2] - 1, match[3], match[4], match[5], match[6]));
                    }
                    (item['FullName'] != '') && (newItem.fullName = item['FullName']);
                    (item['Status'] != '') && (newItem.status = item['Status']);
                    !ValidatorObject.objectIsEmpty(item) && model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseMembersFollowed');
            return undefined;
        }
    }

    /**
     * @param data - file 'Member_Follows.csv' in input as Buffer
     */
    static async parseMessages(data: Buffer): Promise<MessagesLI | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: MessagesLI = {list: []};
                result.forEach((item: any) => {
                    let newItem: MessageLI = {};
                    (item['CONVERSATION ID'] != '') && (newItem.conversationID = item['CONVERSATION ID']);
                    (item['CONVERSATION TITLE'] != '') && (newItem.conversationTitle = item['CONVERSATION TITLE']);
                    (item['FROM'] != '') && (newItem.from = item['FROM']);
                    (item['SENDER PROFILE URL'] != '') && (newItem.senderProfileURL = item['SENDER PROFILE URL']);
                    (item['TO'] != '') && (newItem.to = item['TO']);
                    if (item['DATE'] != '') {
                        let match = item['DATE'].match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+) UTC/);
                        newItem.date = new Date(Date.UTC(match[1], match[2] - 1, match[3], match[4], match[5], match[6]));
                    }
                    (item['SUBJECT'] != '') && (newItem.subject = item['SUBJECT']);
                    (item['CONTENT'] != '') && (newItem.content = item['CONTENT']);
                    (item['FOLDER'] != '') && (newItem.folder = item['FOLDER']);
                    !ValidatorObject.objectIsEmpty(item) && model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseMessages');
            return undefined;
        }
    }

    /**
     * @param data - file 'PhoneNumber.csv' in input as Buffer
     */
    static async parsePhoneNumbers(data: Buffer): Promise<PhoneNumbersLI | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: PhoneNumbersLI = {list: []};
                result.forEach((item: any) => {
                    let newItem: PhoneNumberLI = {};
                    (item['Extension'] != '') && (newItem.extension = item['Extension']);
                    (item['Number'] != '') && (newItem.number = item['Number']);
                    (item['Type'] != '') && (newItem.type = item['Type']);
                    !ValidatorObject.objectIsEmpty(item) && model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parsePhoneNumbers');
            return undefined;
        }
    }

    /**
     * @param data - file 'Positions.csv' in input as Buffer
     */
    static async parseWorkingPositions(data: Buffer): Promise<WorkingPositionsLI | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: WorkingPositionsLI = {list: []};
                result.forEach((item: any) => {
                    let newItem: WorkingPositionLI = {};
                    (item['Company Name'] != '') && (newItem.companyName = item['Company Name']);
                    (item['Title'] != '') && (newItem.title = item['Title']);
                    (item['Description'] != '') && (newItem.description = item['Description']);
                    (item['Location'] != '') && (newItem.location = item['Location']);
                    if (item['Started On'] != '') {
                        let match = item['Started On'].match(/(\w+) (\d+)/);
                        newItem.startedDate = new Date(Date.UTC(match[2], parseInt(Months[match[1].toUpperCase()]) - 1, 1));
                    }
                    if (item['Finished On'] != '') {
                        let match = item['Finished On'].match(/(\w+) (\d+)/);
                        newItem.finishedDate = new Date(Date.UTC(match[2], parseInt(Months[match[1].toUpperCase()]) - 1, 1));
                    }
                    !ValidatorObject.objectIsEmpty(item) && model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseWorkingPositions');
            return undefined;
        }
    }

    /**
     * @param data - file 'Profile.csv' in input as Buffer
     */
    static async parseProfile(data: Buffer): Promise<ProfileLI | undefined> {
        try {
            let result = <Array<any>>Parser.parseCSVfromBuffer(data);
            if (result) {
                if (result[0]) {
                    let model: ProfileLI = {};
                    (result[0]['First Name']) && (model.firstName = result[0]['First Name']);
                    (result[0]['Last Name']) && (model.lastName = result[0]['Last Name']);
                    (result[0]['Maiden Name']) && (model.maidenName = result[0]['Maiden Name']);
                    (result[0]['Address']) && (model.address = result[0]['Address']);
                    if (result[0]['Birth Date'] != '') {
                        let match = result[0]['Birth Date'].match(/(\w+) (\d+)/);
                        model.birthdate = {day: match[2], month: match[1].toUpperCase()};
                    }
                    (result[0]['Headline']) && (model.headline = result[0]['Headline']);
                    (result[0]['Summary']) && (model.summary = result[0]['Summary']);
                    (result[0]['Industry']) && (model.industry = result[0]['Industry']);
                    (result[0]['Zip Code']) && (model.zipCode = result[0]['Zip Code']);
                    (result[0]['Geo Location']) && (model.geoLocation = result[0]['Geo Location']);
                    (result[0]['Twitter Handles']) && (model.twitterHandles = result[0]['Twitter Handles']);
                    (result[0]['Websites']) && (model.websites = result[0]['Websites']);
                    (result[0]['Instant Messengers']) && (model.instantMessengers = result[0]['Instant Messengers']);
                    return !ValidatorObject.objectIsEmpty(model) ? model : undefined;
                }
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseProfile');
            return undefined;
        }
    }

    /**
     * @param data - file 'Reactions.csv' in input as Buffer
     */
    static async parseReactions(data: Buffer): Promise<ReactionsLI | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: ReactionsLI = {list: []};
                result.forEach((item: any) => {
                    let newItem: ReactionLI = {};
                    if (item['Date'] != '') {
                        let match = item['Date'].match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/);
                        newItem.date = new Date(Date.UTC(match[1], match[2] - 1, match[3], match[4], match[5], match[6]));
                    }
                    (item['Type'] != '') && (newItem.type = item['Type']);
                    (item['Link'] != '') && (newItem.link = item['Link']);
                    !ValidatorObject.objectIsEmpty(newItem) && model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseReactions');
            return undefined;
        }
    }

    /**
     * @param data - file 'Registration.csv' in input as Buffer
     */
    static async parseRegistration(data: Buffer): Promise<RegistrationLI | undefined> {
        try {
            let result = <Array<any>>Parser.parseCSVfromBuffer(data);
            if (result) {
                if (result[0]) {
                    let model: RegistrationLI = {};
                    if (result[0]['Registered At'] != '') {
                        let match = result[0]['Registered At'].match(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+) (\w+)/);
                        model.registeredDate = new Date(Date.UTC(2000+parseInt(match[3]), match[1] - 1, match[2], (match[6] == 'AM') ? match[4] : parseInt(match[4])+12, match[5], 0));
                    }
                    (result[0]['Registration Ip']) && (model.registeredIP = result[0]['Registration Ip']);
                    (result[0]['Subscription Types']) && (model.subscriptionTypes = result[0]['Subscription Types']);
                    return !ValidatorObject.objectIsEmpty(model) ? model : undefined;
                }
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseRegistration');
            return undefined;
        }
    }

    /**
     * @param data - file 'Rich Media.csv' in input as Buffer
     */
    static async parseRichMediaList(data: Buffer): Promise<RichMediaListLI | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: RichMediaListLI = {list: []};
                result.forEach((item: any) => {
                    let newItem: RichMediaLI = {};
                    (item['Type'] != '') && (newItem.type = item['Type']);
                    (item['Link'] != '') && (newItem.link = item['Link']);
                    !ValidatorObject.objectIsEmpty(newItem) && model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseRichMediaList');
            return undefined;
        }
    }

    /**
     * @param data - file 'SavedJobAlerts.csv' in input as Buffer
     */
    static async parseSavedJobAlerts(data: Buffer): Promise<SavedJobAlertsLI | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: SavedJobAlertsLI = {list: []};
                result.forEach((item: any) => {
                    let newItem: SavedJobAlertLI = {};
                    if (item['Saved Search Date'] != '') {
                        let match = item['Saved Search Date'].match(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+) (\w+)/);
                        newItem.searchDate = new Date(Date.UTC(2000+parseInt(match[3]), match[1] - 1, match[2], (match[6] == 'AM') ? match[4] : parseInt(match[4])+12, match[5], 0));
                    }
                    (item['Jobs Search Url'] != '') && (newItem.searchURL = item['Jobs Search Url']);
                    !ValidatorObject.objectIsEmpty(newItem) && model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseSavedJobAlerts');
            return undefined;
        }
    }

    /**
     * @param data - file 'SearchQueries.csv' in input as Buffer
     */
    static async parseSearchQueries(data: Buffer): Promise<SearchQueriesLI | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: SearchQueriesLI = {list: []};
                result.forEach((item: any) => {
                    let newItem: SearchQueryLI = {};
                    if (item['Time'] != '') {
                        let match = item['Time'].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+) UTC/);
                        newItem.date = new Date(Date.UTC(match[1], match[2]-1, match[3], match[4], match[5], match[6]));
                    }
                    (item['Search Query'] != '') && (newItem.query = item['Search Query']);
                    !ValidatorObject.objectIsEmpty(newItem) && model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseSearchQueries');
            return undefined;
        }
    }

    /**
     * @param data - file 'Security Challenges.csv' in input as Buffer
     */
    static async parseSecurityChallenges(data: Buffer): Promise<SecurityChallengesLI | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: SecurityChallengesLI = {list: []};
                result.forEach((item: any) => {
                    let newItem: SecurityChallengeLI = {};
                    if (item['Challenge Date'] != '') {
                        let match = item['Challenge Date'].match(/(\w+) (\w+) (\d+) (\d+):(\d+):(\d+) UTC (\d+)/);
                        newItem.challengeDate = new Date(Date.UTC(match[7], parseInt(Months[match[2].toUpperCase()]) - 1, match[3], match[4], match[5], match[6]));
                    }
                    (item['IP Address'] != '') && (newItem.IPaddress = item['IP Address']);
                    (item['User Agent'] != '') && (newItem.userAgent = item['User Agent']);
                    (item['Country'] != '') && (newItem.country = item['Country']);
                    (item['Challenge Type'] != '') && (newItem.challengeType = item['Challenge Type']);
                    !ValidatorObject.objectIsEmpty(newItem) && model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseSecurityChallenges');
            return undefined;
        }
    }

    /**
     * @param data - file 'Skills.csv' in input as Buffer
     */
    static async parseSkills(data: Buffer): Promise<SkillsLI | undefined> {
        try {
            let result = <Array<Array<string>>>Parser.parseCSVfromBuffer(data, {escapeChar: '"', header: false, skipEmptyLines: true});
            if (result) {
                result = result.splice(1);
                let model: SkillsLI = {list: []};
                model.list = result.map((item: string[]) => item[0]);
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseSkills');
            return undefined;
        }
    }

    /**
     * @param data - file 'Votes.csv' in input as Buffer
     */
    static async parseVotes(data: Buffer): Promise<VotesLI | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: VotesLI = {list: []};
                result.forEach((item: any) => {
                    let newItem: VoteLI = {};
                    if (item['Date'] != '') {
                        let match = item['Date'].match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/);
                        newItem.date = new Date(Date.UTC(match[1], match[2] - 1, match[3], match[4], match[5], match[6]));
                    }
                    (item['Link'] != '') && (newItem.link = item['Link']);
                    (item['OptionText'] != '') && (newItem.optionText = item['OptionText']);
                    !ValidatorObject.objectIsEmpty(newItem) && model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseVotes');
            return undefined;
        }
    }

    /**
     * @param data - file 'Ad_Targeting.csv' in input as Buffer
     */
    static async parseAdsTargeting(data: Buffer): Promise<AdsTargetingLI | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data, {escapeChar: '"', header: false, skipEmptyLines: true});
            if (result) {
                result = result.splice(1);
                let model: AdsTargetingLI = {list: []};
                result.forEach((item: any) => {
                    let newItem: ADVTargetingLI = {};
                    if(item) {
                        (item[0]) && (newItem.memberAge = item[0]);
                        (item[3]) && (newItem.companyNames = item[3].split('; '));
                        (item[7]) && (newItem.degrees = item[7].split('; '));
                        (item[9]) && (newItem.universities = item[9].split('; '));
                        (item[11]) && (newItem.degreeFields = item[11].split('; '));
                        (item[15]) && (newItem.gender = item[15]);
                        (item[16]) && (newItem.degreeYears = item[16].split('; '));
                        (item[17]) && (newItem.expressedInterests = item[17].split(';'));
                        (item[19]) && (newItem.companyCategories = item[19].split(';'));

                        (item[20]) && (newItem.language = item[20]);
                        (item[21]) && (newItem.languageCode = item[21]);
                        (item[22]) && (newItem.jobPreferences = item[22].split('; '));
                        (item[23]) && (newItem.profileLocations = item[23].split('; '));
                        (item[26]) && (newItem.bibliographyTags = item[26].split('; '));
                        !ValidatorObject.objectIsEmpty(newItem) && (model.list.push(newItem));
                    }
                });
                console.log(model.list[0].profileLocations)
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseAdsTargeting');
            return undefined;
        }
    }

    /**
     * @param data - file '/jobs/Job Applications.csv' in input as Buffer
     */
    static async parseJobApplications(data: Buffer): Promise<JobApplicationsLI | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: JobApplicationsLI = {list: []};
                result.forEach((item: any) => {
                    let newItem: JobApplicationLI = {};
                    if (item['Application Date'] != '') {
                        let match = item['Application Date'].match(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+) (\w+)/);
                        newItem.applicationDate = new Date(Date.UTC(2000+parseInt(match[3]), match[1] - 1, match[2], (match[6] == 'AM') ? match[4] : parseInt(match[4])+12, match[5], 0));
                    }
                    (item['Contact Email'] != '') && (newItem.contactEmail = item['Contact Email']);
                    (item['Contact Phone Number'] != '') && (newItem.contactPhoneNumber = item['Contact Phone Number']);
                    (item['Company Name'] != '') && (newItem.companyName = item['Company Name']);
                    (item['Job Title'] != '') && (newItem.jobTitle = item['Job Title']);
                    (item['Job Url'] != '') && (newItem.jobUrl = item['Job Url']);
                    (item['Resume Name'] != '') && (newItem.resumeName = item['Resume Name']);
                    (item['Question And Answers'] != '') && (newItem.questionAnswers = item['Question And Answers']);
                    !ValidatorObject.objectIsEmpty(newItem) && model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseJobApplications');
            return undefined;
        }
    }

    /**
     * @param data - file '/jobs/Saved Jobs.csv' in input as Buffer
     */
    static async parseSavedJobs(data: Buffer): Promise<SavedJobsLI | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: SavedJobsLI = {list: []};
                result.forEach((item: any) => {
                    let newItem: SavedJobLI = {};
                    if (item['Saved Date'] != '') {
                        let match = item['Saved Date'].match(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+) (\w+)/);
                        newItem.savedDate = new Date(Date.UTC(2000+parseInt(match[3]), match[1] - 1, match[2], (match[6] == 'AM') ? match[4] : parseInt(match[4])+12, match[5], 0));
                    }
                    (item['Job Url'] != '') && (newItem.jobUrl = item['Job Url']);
                    (item['Job Title'] != '') && (newItem.jobTitle = item['Job Title']);
                    (item['Company Name'] != '') && (newItem.companyName = item['Company Name']);
                    !ValidatorObject.objectIsEmpty(newItem) && model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseSavedJobs');
            return undefined;
        }
    }

    /**
     * Some parameter type may be not correct.
     * @param data - file '/jobs/Job Seeker Preferences.csv' in input as Buffer
     */
    static async parseJobSeekerPreferences(data: Buffer): Promise<JobSeekerPreferencesLI | undefined> {
        try {
            let result = <Array<Array<any>>>Parser.parseCSVfromBuffer(data, {escapeChar: '"', header: false, skipEmptyLines: true});
            if (result) {
                let model: JobSeekerPreferencesLI = {};
                result = result.splice(1);
                if(result[0]) {
                    (result[0][0] != '') && (model.locations = result[0][0].split(' | '));
                    (result[0][1] != '') && (model.industries = result[0][1].split('| '));
                    (result[0][2] != '') && (model.companyEmployeeCount = result[0][2]);
                    (result[0][3] != '') && (model.preferredJobTypes = result[0][3].split('| '));
                    (result[0][4] != '') && (model.jobTitles = result[0][4]);
                    (result[0][5] != '') && (model.openToRecruiters = result[0][5].toLowerCase() == 'yes');
                    (result[0][6] != '') && (model.dreamCompanies = result[0][6]);
                    (result[0][7] != '') && (model.profileSharedWithJobPoster = result[0][7].toLowerCase() == 'yes');
                    (result[0][8] != '') && (model.jobTitleForSearchingFastGrowingCompanies = result[0][8]);
                    (result[0][9] != '') && (model.introductionStatement = result[0][9]);
                    (result[0][10] != '') && (model.phoneNumber = result[0][10]);
                    (result[0][11] != '') && (model.jobSeekerActivityLevel = result[0][11]);
                    (result[0][12] != '') && (model.preferredStartTimeRange = result[0][12]);
                    (result[0][13] != '') && (model.commutePreferenceStartingAddress = result[0][13]);
                    (result[0][14] != '') && (model.commutePreferenceStartingTime = result[0][14]);
                    (result[0][15] != '') && (model.modeOfTransportation = result[0][15]);
                    (result[0][16] != '') && (model.maximumCommuteDuration = result[0][16]);
                    (result[0][17] != '') && (model.openCandidateVisibility = result[0][17]);
                    (result[0][18] != '') && (model.jobSeekingUrgencyLevel = result[0][18]);
                    return !ValidatorObject.objectIsEmpty(model) ? model : undefined;
                }
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseJobSeekerPreferences');
            return undefined;
        }
    }
}
