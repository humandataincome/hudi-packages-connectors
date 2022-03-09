import Logger from "../utils/logger";
import {
    AccountStatus,
    AccountStatusHistory,
    AdsClicked, AdsTargeting,
    AdvClicked, ADVTargeting,
    CompaniesFollowed,
    CompanyFollowed,
    Connection,
    Connections,
    Contact,
    Contacts,
    Education,
    EducationHistory,
    Email,
    Emails,
    Endorsement,
    EndorsementsReceived,
    Inference,
    InferencesAboutYou,
    Invitation,
    Invitations,
    JobApplicantSavedInfo,
    JobApplicantSavedScreeningQuestionInfo, JobApplication, JobApplications, JobSeekerPreferences,
    Learning,
    Learnings,
    Login,
    Logins,
    MemberFollows,
    MembersFollowed,
    Message,
    Messages,
    PhoneNumber,
    PhoneNumbers,
    Profile,
    QuestionAnswer,
    Reaction,
    Reactions,
    Registration,
    RichMedia,
    RichMediaList, SavedJob,
    SavedJobAlert,
    SavedJobAlerts, SavedJobs,
    SearchQueries,
    SearchQuery,
    SecurityChallenge,
    SecurityChallenges,
    Skills,
    Vote,
    Votes,
    WorkingPosition,
    WorkingPositions
} from "../model/linkedin.model";
import {Parser} from "../utils/parser";
import {Months} from "../utils/utils.enum";
import {Validator} from "../validator";

/**
 * Class used to parse most important files into the directory returned by LinkedIn in CSV format.
 * All the files are given in input as Buffer, parsed back to JSON and then mapped into a specific interface model.
 * All functions return the relevant information (if there are any) as a promised model if the parsing is successful, undefined otherwise.
 */
export class LinkedInService {
    private logger = new Logger("Linkedin Service");

    /**
     * @param data - file 'Account Status History.csv' in input as Buffer
     * @return {Promise<AccountStatusHistory | undefined>}
     */
    async parseAccountStatusHistory(data: Buffer): Promise<AccountStatusHistory | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data, {delimitersToGuess: [',', '\t'], escapeChar: '"', header: true, skipEmptyLines: false });
            if (result) {
                let model: AccountStatusHistory = {list: []};
                result.map((listItem: any) => {
                    let newItem: AccountStatus = {};
                    if (listItem['Time'] != '') {
                        let match = listItem['Time'].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+)/);
                        (match) && (newItem.date = new Date(Date.UTC(match[1], match[2] - 1, match[3], match[4], match[5], match[6])));
                    }
                    (listItem['Event'] != '') && (newItem.event = listItem['Event']);
                    !Validator.objectIsEmpty(newItem) && (model.list.push(newItem));
                });
                return model.list.length > 0 ? model : undefined;
            } else {
                return undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseAccountStatusHistory');
            return undefined;
        }
    }


    /**
     * @param data - file 'Ads Clicked.csv' in input as Buffer
     * @return {Promise<AdsClicked | undefined>}
     */
    async parseAdsClicked(data: Buffer): Promise<AdsClicked | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: AdsClicked = {list: []};
                result.map((listItem: any) => {
                    let newItem: AdvClicked = {};
                    if (listItem['Ad clicked Date'] != '') {
                        let match = listItem['Ad clicked Date'].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+)/);
                        (match) && (newItem.date = new Date(Date.UTC(match[1], match[2] - 1, match[3], match[4], match[5], match[6])));
                    }
                    (listItem['Ad Title/Id'] != '') && (newItem.title = listItem['Ad Title/Id']);
                    !Validator.objectIsEmpty(newItem) && (model.list.push(newItem));
                });
                return model.list.length > 0 ? model : undefined;
            } else {
                return undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseAdsClicked');
            return undefined;
        }
    }


    /**
     * @param data - file 'Company Follows.csv' in input as Buffer
     * @return {Promise<CompaniesFollowed | undefined>}
     */
    async parseCompaniesFollowed(data: Buffer): Promise<CompaniesFollowed | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: CompaniesFollowed = {list: []};
                result.map((listItem: any) => {
                    let newItem: CompanyFollowed = {};
                    (listItem['Organization'] != '') && (newItem.organization = listItem['Organization']);
                    if (listItem['Followed On'] != '') {
                        let match = listItem['Followed On'].match(/(\w+) (\w+) (\d+) (\d+):(\d+):(\d+) UTC (\d+)/);
                        (match) && (newItem.dateFollow = new Date(Date.UTC(match[7], parseInt((Months[match[2].toUpperCase()])) - 1, match[3], match[4], match[5], match[6])));
                    }
                    !Validator.objectIsEmpty(newItem) && (model.list.push(newItem));
                });
                return model.list.length > 0 ? model : undefined;
            } else {
                return undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseCompaniesFollowed');
            return undefined;
        }
    }

    /**
     * @param data - file 'Connections.csv' in input as Buffer
     * @return {Promise<Connections | undefined>}
     */
    async parseConnections(data: Buffer): Promise<Connections | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data, {escapeChar: '"', header: false, skipEmptyLines: true} );
            if (result) {
                let model: Connections = {list: []};
                result = result.splice(3);
                result.map((entry: any) => {
                    let newItem: Connection = {};
                    (entry[0] != '') && (newItem.firstName = entry[0]);
                    (entry[1] != '') && (newItem.lastName = entry[1]);
                    (entry[2] != '') && (newItem.emailAddress = entry[2]);
                    (entry[3] != '') && (newItem.company = entry[3]);
                    (entry[4] != '') && (newItem.position = entry[4]);
                    if (entry[5] != '') {
                        let match = entry[5].match(/(\d+) (\w+) (\d+)/);
                        (match) && (newItem.dateConnection = new Date(Date.UTC(match[3], parseInt((Months[match[2].toUpperCase()])) - 1, match[1], 0, 0, 0)));
                    }
                    !Validator.objectIsEmpty(newItem) && (model.list.push(newItem));
                });
                return model.list.length > 0 ? model : undefined;
            } else {
                return undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseConnections');
            return undefined;
        }
    }

    /**
     * @param data - file 'Contacts.csv' in input as Buffer
     * @return {Promise<Contacts | undefined>}
     */
    async parseContacts(data: Buffer): Promise<Contacts | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: Contacts = {list: []};
                result.map((listItem: any) => {
                    let newItem: Contact = {};
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
                    !Validator.objectIsEmpty(newItem) && (model.list.push(newItem));
                });
                return model.list.length > 0 ? model : undefined;
            } else {
                return undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseContacts');
            return undefined;
        }
    }

    /**
     * @param data - file 'Education.csv' in input as Buffer
     * @return {Promise<EducationHistory | undefined>}
     */
    async parseEducationHistory(data: Buffer): Promise<EducationHistory | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: EducationHistory = {list: []};
                result.map((listItem: any) => {
                    let newItem: Education = {};
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
                    !Validator.objectIsEmpty(newItem) && (model.list.push(newItem));
                });
                return model.list.length > 0 ? model : undefined;
            } else {
                return undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseEducationHistory');
            return undefined;
        }
    }

    /**
     * @param data - file 'Email Addresses.csv' in input as Buffer
     * @return {Promise<Emails | undefined>}
     */
    async parseEmails(data: Buffer): Promise<Emails | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: Emails = {list: []};
                result.map((listItem: any) => {
                    let newItem: Email = {};
                    (listItem['Email Address'] != '') && (newItem.emailAddress = listItem['Email Address']);
                    (listItem['Confirmed'] != '') && (newItem.confirmed = listItem['Confirmed'].toLowerCase() == 'yes');
                    (listItem['Primary'] != '') && (newItem.primary = listItem['Primary'].toLowerCase() == 'yes');
                    if (listItem['Updated On'] != '') {
                        let match = listItem['Updated On'].match(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+) (\w+)/);
                        (match) && (newItem.dateUpdate = new Date(Date.UTC(2000+parseInt(match[3]), match[1] - 1, match[2], (match[6] == 'AM') ? match[4] : parseInt(match[4])+12, match[5], 0)));
                    }
                    !Validator.objectIsEmpty(newItem) && (model.list.push(newItem));
                });
                return model.list.length > 0 ? model : undefined;
            } else {
                return undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseEmails');
            return undefined;
        }
    }

    /**
     * @param data - file 'Endorsement_Received_Info.csv' in input as Buffer
     * @return {Promise<EndorsementsReceived | undefined>}
     */
    async parseEndorsementsReceived(data: Buffer): Promise<EndorsementsReceived | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: EndorsementsReceived = {list: []};
                result.map((listItem: any) => {
                    let newItem: Endorsement = {};
                    if (listItem['Endorsement Date'] != '') {
                        let match = listItem['Endorsement Date'].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+)/);
                        (match) && (newItem.endorsementDate = new Date(Date.UTC(match[1], match[2] - 1, match[3], match[4], match[5], match[6])));
                    }
                    (listItem['Skill Name'] != '') && (newItem.skillName = listItem['Skill Name']);
                    (listItem['Endorser First Name'] != '') && (newItem.endorserFirstName = listItem['Endorser First Name']);
                    (listItem['Endorser Last Name'] != '') && (newItem.endorserLastName = listItem['Endorser Last Name']);
                    (listItem['Endorsement Status'] != '') && (newItem.endorsementStatus = listItem['Endorsement Status']);
                    !Validator.objectIsEmpty(newItem) && (model.list.push(newItem));
                });
                return model.list.length > 0 ? model : undefined;
            } else {
                return undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseEndorsementsReceived');
            return undefined;
        }
    }


    /**
     * @param data - file 'Inferences_about_you.csv' in input as Buffer
     * @return {Promise<InferencesAboutYou | undefined>}
     */
    async parseInferencesAboutYou(data: Buffer): Promise<InferencesAboutYou | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: InferencesAboutYou = {list: []};
                result.map((listItem: any) => {
                    let newItem: Inference = {};
                    (listItem['Category'] != '') && (newItem.category = listItem['Category']);
                    (listItem['Type of inference'] != '') && (newItem.typeInference = listItem['Type of inference']);
                    (listItem['Description'] != '') && (newItem.description = listItem['Description']);
                    (listItem['Inference'] != '') && (newItem.inference =
                        (parseInt(listItem['Inference']) == 1 || listItem['Inference'].toLowerCase() == 'yes' || listItem['Inference'].toLowerCase() == 'true'));
                    !Validator.objectIsEmpty(newItem) && (model.list.push(newItem));
                });
                return model.list.length > 0 ? model : undefined;
            } else {
                return undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseInferencesAboutYou');
            return undefined;
        }
    }

    /**
     * @param data - file 'Invitations.csv' in input as Buffer
     * @return {Promise<Invitations | undefined>}
     */
    async parseInvitations(data: Buffer): Promise<Invitations | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: Invitations = {list: []};
                result.map((listItem: any) => {
                    let newItem: Invitation = {};
                    (listItem['From'] != '') && (newItem.from = listItem['From']);
                    (listItem['To'] != '') && (newItem.to = listItem['To']);
                    if (listItem['Sent At'] != '') {
                        let match = listItem['Sent At'].match(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+) (\w+)/);
                        (match) && (newItem.dataSent = new Date(Date.UTC(2000+parseInt(match[3]), match[1] - 1, match[2], (match[6] == 'AM') ? match[4] : parseInt(match[4])+12, match[5], 0)));
                    }
                    (listItem['Message'] != '') && (newItem.message = listItem['Message']);
                    (listItem['Direction'] != '') && (newItem.direction = listItem['Direction']);
                    !Validator.objectIsEmpty(newItem) && (model.list.push(newItem));
                });
                return model.list.length > 0 ? model : undefined;
            } else {
                return undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseInvitations');
            return undefined;
        }
    }

    /**
     * @param data - file 'Job Applicant Saved Answers.csv' in input as Buffer
     * @return {Promise<JobApplicantSavedInfo | undefined>}
     */
    async parseJobApplicantSavedInfo(data: Buffer): Promise<JobApplicantSavedInfo | undefined> {
        try {
            let result = <Array<QuestionAnswer>>Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: JobApplicantSavedInfo = {list: []};
                result.map((item: any) => {
                    if(item['Question'] != '' && item['Answer'] != '') {
                        model.list.push({question: item['Question'], answer: item['Answer']});
                    }
                });
                return model.list.length > 0 ? model : undefined;
            } else {
                return undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseJobApplicantSavedInfo');
            return undefined;
        }
    }

    /**
     * @param data - file 'Job Applicant Saved Screening Question Responses.csv' in input as Buffer
     * @return {Promise<JobApplicantSavedScreeningQuestionInfo | undefined>}
     */
    async parseJobApplicantSavedScreeningQuestionInfo(data: Buffer): Promise<JobApplicantSavedScreeningQuestionInfo | undefined> {
        try {
            let result = <Array<QuestionAnswer>>Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: JobApplicantSavedScreeningQuestionInfo = {list: []};
                result.map((item: any) => {
                    if(item['Question'] != '' && item['Answer'] != '') {
                        model.list.push({question: item['Question'], answer: item['Answer']});
                    }
                });
                return model.list.length > 0 ? model : undefined;
            } else {
                return undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseJobApplicantSavedScreeningQuestionInfo');
            return undefined;
        }
    }

    /**
     * @param data - file 'Learning.csv' in input as Buffer
     * @return {Promise<Learnings | undefined>}
     */
    async parseLearnings(data: Buffer): Promise<Learnings | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: Learnings = {list: []};
                result.map((item: any) => {
                    let newItem: Learning = {};
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
                    !Validator.objectIsEmpty(item) && model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            } else {
                return undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseLearnings');
            return undefined;
        }
    }

    /**
     * @param data - file 'Logins.csv' in input as Buffer
     * @return {Promise<Logins | undefined>}
     */
    async parseLogins(data: Buffer): Promise<Logins | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: Logins = {list: []};
                result.map((item: any) => {
                    let newItem: Login = {};
                    if (item['Login Date'] != '') {
                        let match = item['Login Date'].match(/(\w+) (\w+) (\d+) (\d+):(\d+):(\d+) UTC (\d+)/);
                        newItem.loginDate = new Date(Date.UTC(match[7], parseInt(Months[match[2].toUpperCase()]) - 1, match[3], match[4], match[5], match[6]));
                    }
                    (item['IP Address'] != '') && (newItem.IPaddress = item['IP Address']);
                    (item['User Agent'] != '') && (newItem.userAgent = item['User Agent']);
                    (item['Login Type'] != '') && (newItem.loginType = item['Login Type']);
                    !Validator.objectIsEmpty(item) && model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            } else {
                return undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseLogins');
            return undefined;
        }
    }

    /**
     * @param data - file 'Member_Follows.csv' in input as Buffer
     * @return {Promise<MembersFollowed | undefined>}
     */
    async parseMembersFollowed(data: Buffer): Promise<MembersFollowed | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: MembersFollowed = {list: []};
                result.map((item: any) => {
                    let newItem: MemberFollows = {};
                    if (item['Date'] != '') {
                        let match = item['Date'].match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/);
                        newItem.date = new Date(Date.UTC(match[1], match[2] - 1, match[3], match[4], match[5], match[6]));
                    }
                    (item['FullName'] != '') && (newItem.fullName = item['FullName']);
                    (item['Status'] != '') && (newItem.status = item['Status']);
                    !Validator.objectIsEmpty(item) && model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            } else {
                return undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseMembersFollowed');
            return undefined;
        }
    }

    /**
     * @param data - file 'Member_Follows.csv' in input as Buffer
     * @return {Promise<Messages | undefined>}
     */
    async parseMessages(data: Buffer): Promise<Messages | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: Messages = {list: []};
                result.map((item: any) => {
                    let newItem: Message = {};
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
                    !Validator.objectIsEmpty(item) && model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            } else {
                return undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseMessages');
            return undefined;
        }
    }

    /**
     * @param data - file 'PhoneNumber.csv' in input as Buffer
     * @return {Promise<PhoneNumbers | undefined>}
     */
    async parsePhoneNumbers(data: Buffer): Promise<PhoneNumbers | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: PhoneNumbers = {list: []};
                result.map((item: any) => {
                    let newItem: PhoneNumber = {};
                    (item['Extension'] != '') && (newItem.extension = item['Extension']);
                    (item['Number'] != '') && (newItem.number = item['Number']);
                    (item['Type'] != '') && (newItem.type = item['Type']);
                    !Validator.objectIsEmpty(item) && model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            } else {
                return undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parsePhoneNumbers');
            return undefined;
        }
    }

    /**
     * @param data - file 'Positions.csv' in input as Buffer
     * @return {Promise<WorkingPositions | undefined>}
     */
    async parseWorkingPositions(data: Buffer): Promise<WorkingPositions | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: WorkingPositions = {list: []};
                result.map((item: any) => {
                    let newItem: WorkingPosition = {};
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
                    !Validator.objectIsEmpty(item) && model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            } else {
                return undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseWorkingPositions');
            return undefined;
        }
    }

    /**
     * @param data - file 'Profile.csv' in input as Buffer
     * @return {Promise<Profile | undefined>}
     */
    async parseProfile(data: Buffer): Promise<Profile | undefined> {
        try {
            let result = <Array<any>>Parser.parseCSVfromBuffer(data);
            if (result) {
                if (result[0]) {
                    let model: Profile = {};
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
                    return !Validator.objectIsEmpty(model) ? model : undefined;
                }
                return undefined;
            } else {
                return undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseProfile');
            return undefined;
        }
    }

    /**
     * @param data - file 'Reactions.csv' in input as Buffer
     * @return {Promise<Reactions | undefined>}
     */
    async parseReactions(data: Buffer): Promise<Reactions | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: Reactions = {list: []};
                result.map((item: any) => {
                    let newItem: Reaction = {};
                    if (item['Date'] != '') {
                        let match = item['Date'].match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/);
                        newItem.date = new Date(Date.UTC(match[1], match[2] - 1, match[3], match[4], match[5], match[6]));
                    }
                    (item['Type'] != '') && (newItem.type = item['Type']);
                    (item['Link'] != '') && (newItem.link = item['Link']);
                    !Validator.objectIsEmpty(newItem) && model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            } else {
                return undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseReactions');
            return undefined;
        }
    }

    /**
     * @param data - file 'Registration.csv' in input as Buffer
     * @return {Promise<Registration | undefined>}
     */
    async parseRegistration(data: Buffer): Promise<Registration | undefined> {
        try {
            let result = <Array<any>>Parser.parseCSVfromBuffer(data);
            if (result) {
                if (result[0]) {
                    let model: Registration = {};
                    if (result[0]['Registered At'] != '') {
                        let match = result[0]['Registered At'].match(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+) (\w+)/);
                        model.registeredDate = new Date(Date.UTC(2000+parseInt(match[3]), match[1] - 1, match[2], (match[6] == 'AM') ? match[4] : parseInt(match[4])+12, match[5], 0));
                    }
                    (result[0]['Registration Ip']) && (model.registeredIP = result[0]['Registration Ip']);
                    (result[0]['Subscription Types']) && (model.subscriptionTypes = result[0]['Subscription Types']);
                    return !Validator.objectIsEmpty(model) ? model : undefined;
                }
                return undefined;
            } else {
                return undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseRegistration');
            return undefined;
        }
    }

    /**
     * @param data - file 'Rich Media.csv' in input as Buffer
     * @return {Promise<RichMediaList | undefined>}
     */
    async parseRichMediaList(data: Buffer): Promise<RichMediaList | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: RichMediaList = {list: []};
                result.map((item: any) => {
                    let newItem: RichMedia = {};
                    (item['Type'] != '') && (newItem.type = item['Type']);
                    (item['Link'] != '') && (newItem.link = item['Link']);
                    !Validator.objectIsEmpty(newItem) && model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            } else {
                return undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseRichMediaList');
            return undefined;
        }
    }

    /**
     * @param data - file 'SavedJobAlerts.csv' in input as Buffer
     * @return {Promise<SavedJobAlerts | undefined>}
     */
    async parseSavedJobAlerts(data: Buffer): Promise<SavedJobAlerts | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: SavedJobAlerts = {list: []};
                result.map((item: any) => {
                    let newItem: SavedJobAlert = {};
                    if (item['Saved Search Date'] != '') {
                        let match = item['Saved Search Date'].match(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+) (\w+)/);
                        newItem.searchDate = new Date(Date.UTC(2000+parseInt(match[3]), match[1] - 1, match[2], (match[6] == 'AM') ? match[4] : parseInt(match[4])+12, match[5], 0));
                    }
                    (item['Jobs Search Url'] != '') && (newItem.searchURL = item['Jobs Search Url']);
                    !Validator.objectIsEmpty(newItem) && model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            } else {
                return undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseSavedJobAlerts');
            return undefined;
        }
    }

    /**
     * @param data - file 'SearchQueries.csv' in input as Buffer
     * @return {Promise<SearchQueries | undefined>}
     */
    async parseSearchQueries(data: Buffer): Promise<SearchQueries | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: SearchQueries = {list: []};
                result.map((item: any) => {
                    let newItem: SearchQuery = {};
                    if (item['Time'] != '') {
                        let match = item['Time'].match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+) UTC/);
                        newItem.date = new Date(Date.UTC(match[1], match[2]-1, match[3], match[4], match[5], match[6]));
                    }
                    (item['Search Query'] != '') && (newItem.query = item['Search Query']);
                    !Validator.objectIsEmpty(newItem) && model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            } else {
                return undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseSearchQueries');
            return undefined;
        }
    }

    /**
     * @param data - file 'Security Challenges.csv' in input as Buffer
     * @return {Promise<SecurityChallenges | undefined>}
     */
    async parseSecurityChallenges(data: Buffer): Promise<SecurityChallenges | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: SecurityChallenges = {list: []};
                result.map((item: any) => {
                    let newItem: SecurityChallenge = {};
                    if (item['Challenge Date'] != '') {
                        let match = item['Challenge Date'].match(/(\w+) (\w+) (\d+) (\d+):(\d+):(\d+) UTC (\d+)/);
                        newItem.challengeDate = new Date(Date.UTC(match[7], parseInt(Months[match[2].toUpperCase()]) - 1, match[3], match[4], match[5], match[6]));
                    }
                    (item['IP Address'] != '') && (newItem.IPaddress = item['IP Address']);
                    (item['User Agent'] != '') && (newItem.userAgent = item['User Agent']);
                    (item['Country'] != '') && (newItem.country = item['Country']);
                    (item['Challenge Type'] != '') && (newItem.challengeType = item['Challenge Type']);
                    !Validator.objectIsEmpty(newItem) && model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            } else {
                return undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseSecurityChallenges');
            return undefined;
        }
    }

    /**
     * @param data - file 'Skills.csv' in input as Buffer
     * @return {Promise<Skills | undefined>}
     */
    async parseSkills(data: Buffer): Promise<Skills | undefined> {
        try {
            let result = <Array<Array<string>>>Parser.parseCSVfromBuffer(data, {escapeChar: '"', header: false, skipEmptyLines: true});
            if (result) {
                result = result.splice(1);
                let model: Skills = {list: []};
                result.map((item: string[]) => {
                    model.list.push(item[0]);
                });
                return model.list.length > 0 ? model : undefined;
            } else {
                return undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseSkills');
            return undefined;
        }
    }

    /**
     * @param data - file 'Votes.csv' in input as Buffer
     * @return {Promise<Votes | undefined>}
     */
    async parseVotes(data: Buffer): Promise<Votes | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: Votes = {list: []};
                result.map((item: any) => {
                    let newItem: Vote = {};
                    if (item['Date'] != '') {
                        let match = item['Date'].match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/);
                        newItem.date = new Date(Date.UTC(match[1], match[2] - 1, match[3], match[4], match[5], match[6]));
                    }
                    (item['Link'] != '') && (newItem.link = item['Link']);
                    (item['OptionText'] != '') && (newItem.optionText = item['OptionText']);
                    !Validator.objectIsEmpty(newItem) && model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            } else {
                return undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseVotes');
            return undefined;
        }
    }

    /**
     * @param data - file 'Ad_Targeting.csv' in input as Buffer
     * @return {Promise<AdsTargeting | undefined>}
     */
    async parseAdsTargeting(data: Buffer): Promise<AdsTargeting | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data, {escapeChar: '"', header: false, skipEmptyLines: true});
            if (result) {
                result = result.splice(1);
                let model: AdsTargeting = {list: []};
                result.map((item: any) => {
                    let newItem: ADVTargeting = {};
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
                        !Validator.objectIsEmpty(newItem) && (model.list.push(newItem));
                    }
                });
                console.log(model.list[0].profileLocations)
                return model.list.length > 0 ? model : undefined;
            } else {
                return undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseAdsTargeting');
            return undefined;
        }
    }

    /**
     * @param data - file '/jobs/Job Applications.csv' in input as Buffer
     * @return {Promise<JobApplications | undefined>}
     */
    async parseJobApplications(data: Buffer): Promise<JobApplications | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: JobApplications = {list: []};
                result.map((item: any) => {
                    let newItem: JobApplication = {};
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
                    !Validator.objectIsEmpty(newItem) && model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            } else {
                return undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseJobApplications');
            return undefined;
        }
    }

    /**
     * @param data - file '/jobs/Saved Jobs.csv' in input as Buffer
     * @return {Promise<SavedJobs | undefined>}
     */
    async parseSavedJobs(data: Buffer): Promise<SavedJobs | undefined> {
        try {
            let result = Parser.parseCSVfromBuffer(data);
            if (result) {
                let model: SavedJobs = {list: []};
                result.map((item: any) => {
                    let newItem: SavedJob = {};
                    if (item['Saved Date'] != '') {
                        let match = item['Saved Date'].match(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+) (\w+)/);
                        newItem.savedDate = new Date(Date.UTC(2000+parseInt(match[3]), match[1] - 1, match[2], (match[6] == 'AM') ? match[4] : parseInt(match[4])+12, match[5], 0));
                    }
                    (item['Job Url'] != '') && (newItem.jobUrl = item['Job Url']);
                    (item['Job Title'] != '') && (newItem.jobTitle = item['Job Title']);
                    (item['Company Name'] != '') && (newItem.companyName = item['Company Name']);
                    !Validator.objectIsEmpty(newItem) && model.list.push(newItem);
                });
                return model.list.length > 0 ? model : undefined;
            } else {
                return undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseSavedJobs');
            return undefined;
        }
    }

    /**
     * Some parameter type may be not correct.
     * @param data - file '/jobs/Job Seeker Preferences.csv' in input as Buffer
     * @return {Promise<JobSeekerPreferences | undefined>}
     */
    async parseJobSeekerPreferences(data: Buffer): Promise<JobSeekerPreferences | undefined> {
        try {
            let result = <Array<Array<any>>>Parser.parseCSVfromBuffer(data, {escapeChar: '"', header: false, skipEmptyLines: true});
            if (result) {
                let model: JobSeekerPreferences = {};
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
                    return !Validator.objectIsEmpty(model) ? model : undefined;
                }
            } else {
                return undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseJobSeekerPreferences');
            return undefined;
        }
    }
}