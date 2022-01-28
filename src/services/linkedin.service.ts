import Logger from "../utils/logger";
import {Validating} from "../utils/validating";
import {
    AccountStatus,
    AccountStatusHistory,
    AdsClicked,
    AdvClicked,
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
    EndorsementsReceived, Inference,
    InferencesAboutYou, Invitation, Invitations
} from "../models/linkedin.model";
import {Parser} from "../utils/parser";
import {Months} from "../utils/utils.enum";

export class LinkedinService {
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
                    !Validating.objectIsEmpty(newItem) && (model.list.push(newItem));
                });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseAccountStatusHistory');
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
                    !Validating.objectIsEmpty(newItem) && (model.list.push(newItem));
                });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseAdsClicked');
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
                    !Validating.objectIsEmpty(newItem) && (model.list.push(newItem));
                });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseCompaniesFollowed');
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
                    !Validating.objectIsEmpty(newItem) && (model.list.push(newItem));
                });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseConnections');
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
                    !Validating.objectIsEmpty(newItem) && (model.list.push(newItem));
                });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseContacts');
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
                    !Validating.objectIsEmpty(newItem) && (model.list.push(newItem));
                });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseEducationHistory');
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
                    !Validating.objectIsEmpty(newItem) && (model.list.push(newItem));
                });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseEmails');
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
                    !Validating.objectIsEmpty(newItem) && (model.list.push(newItem));
                });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseEndorsementsReceived');
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
                    !Validating.objectIsEmpty(newItem) && (model.list.push(newItem));
                });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseInferencesAboutYou');
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
                    !Validating.objectIsEmpty(newItem) && (model.list.push(newItem));
                });
                return model.list.length > 0 ? model : undefined;
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`, 'parseInvitations');
        }
    }
}