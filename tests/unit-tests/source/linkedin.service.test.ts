import {ServiceLinkedin} from "../../../src";

describe('LinkedIn Service test', () => {
    const path = require('path');
    const {Parser} = require("../../utils/parser");

    test('parseAdsClicked', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/linkedin/Ads Clicked.csv`;
        const result = await ServiceLinkedin.parseAdsClicked(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = '114589406';
        expect(JSON.stringify(result!.list[4].title)).toBe(JSON.stringify(expected));
    });
    test('parseConnections', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/linkedin/Connections.csv`;
        const result = await ServiceLinkedin.parseConnections(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'Polimatica';
        expect(JSON.stringify(result!.list[1].company)).toBe(JSON.stringify(expected));
    });
    test('parseCompaniesFollowed', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/linkedin/Company Follows.csv`;
        const result = await ServiceLinkedin.parseCompaniesFollowed(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = '2021-09-28T09:08:27.000Z';
        expect(JSON.stringify(result!.list[0].dateFollow)).toBe(JSON.stringify(expected));
    });
    test('parseContacts', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/linkedin/Contacts.csv`;
        const result = await ServiceLinkedin.parseContacts(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'Samu';
        expect(JSON.stringify(result!.list[1].lastName)).toBe(JSON.stringify(expected));
    });
    test('parseEducationHistory', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/linkedin/Education.csv`;
        const result = await ServiceLinkedin.parseEducationHistory(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = '2019-09-01T00:00:00.000Z';
        expect(JSON.stringify(result!.list[1].startDate)).toBe(JSON.stringify(expected));
    });
    test('parseEmails', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/linkedin/Email Addresses.csv`;
        const result = await ServiceLinkedin.parseEmails(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'davide.mock@gmail.com';
        expect(JSON.stringify(result!.list[0].emailAddress)).toBe(JSON.stringify(expected));
    });
    test('parseEndorsementsReceived', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/linkedin/Endorsement_Received_Info.csv`;
        const result = await ServiceLinkedin.parseEndorsementsReceived(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = '2021-09-14T12:18:04.000Z';
        expect(JSON.stringify(result!.list[1].endorsementDate)).toBe(JSON.stringify(expected));
    });
    test('parseInferencesAboutYou', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/linkedin/Inferences_about_you.csv`;
        const result = await ServiceLinkedin.parseInferencesAboutYou(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'Interested in Sales Navigator product in Asia-Pacific';
        expect(JSON.stringify(result!.list[2].typeInference)).toBe(JSON.stringify(expected));
    });
    test('parseInvitations', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/linkedin/Invitations.csv`;
        const result = await ServiceLinkedin.parseInvitations(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'Iryna';
        expect(JSON.stringify(result!.list[1].from)).toBe(JSON.stringify(expected));
    });
    test('parseJobApplicantSavedInfo', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/linkedin/Job Applicant Saved Answers.csv`;
        const result = await ServiceLinkedin.parseJobApplicantSavedInfo(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'Mock';
        expect(JSON.stringify(result!.list[0].answer)).toBe(JSON.stringify(expected));
    });
    test('parseJobApplicantSavedScreeningQuestionInfo', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/linkedin/Job Applicant Saved Screening Question Responses.csv`;
        const result = await ServiceLinkedin.parseJobApplicantSavedScreeningQuestionInfo(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'Will you now, or in the future, require sponsorship for employment visa status (e.g. H-1B visa status)?';
        expect(JSON.stringify(result!.list[2].question)).toBe(JSON.stringify(expected));
    });
    test('parseLearnings', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/linkedin/Learning.csv`;
        const result = await ServiceLinkedin.parseLearnings(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'Spring: Spring MVC';
        expect(JSON.stringify(result!.list[0].contentTitle)).toBe(JSON.stringify(expected));
    });
    test('parseLogins', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/linkedin/Logins.csv`;
        const result = await ServiceLinkedin.parseLogins(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = '2021-09-24T12:35:41.000Z';
        expect(JSON.stringify(result!.list[0].loginDate)).toBe(JSON.stringify(expected));
    });
    test('parseMembersFollowed', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/linkedin/Member_Follows.csv`;
        const result = await ServiceLinkedin.parseMembersFollowed(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'Bill Gates';
        expect(JSON.stringify(result!.list[0].fullName)).toBe(JSON.stringify(expected));
    });
    test('parseMessages', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/linkedin/messages.csv`;
        const result = await ServiceLinkedin.parseMessages(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'Rust, Solana & Blockchain';
        expect(JSON.stringify(result!.list[0].conversationTitle)).toBe(JSON.stringify(expected));
    });
    test('parsePhoneNumbers', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/linkedin/PhoneNumbers.csv`;
        const result = await ServiceLinkedin.parsePhoneNumbers(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = ' +39 331 777 4567';
        expect(JSON.stringify(result!.list[0].number)).toBe(JSON.stringify(expected));
    });
    test('parseWorkingPositions', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/linkedin/Positions.csv`;
        const result = await ServiceLinkedin.parseWorkingPositions(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'Back-end developer';
        expect(JSON.stringify(result!.list[0].title)).toBe(JSON.stringify(expected));
    });
    test('parseProfile', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/linkedin/Profile.csv`;
        const result = await ServiceLinkedin.parseProfile(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'OCT';
        expect(JSON.stringify(result!.birthdate!.month)).toBe(JSON.stringify(expected));
    });
    test('parseReactions', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/linkedin/Reactions.csv`;
        const result = await ServiceLinkedin.parseReactions(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = '2021-10-27T19:36:45.000Z';
        expect(JSON.stringify(result!.list[0].date)).toBe(JSON.stringify(expected));
    });
    test('parseRegistration', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/linkedin/Registration.csv`;
        const result = await ServiceLinkedin.parseRegistration(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = '2019-12-22T10:06:00.000Z';
        expect(JSON.stringify(result!.registeredDate)).toBe(JSON.stringify(expected));
    });
    test('parseRichMediaList', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/linkedin/Rich Media.csv`;
        const result = await ServiceLinkedin.parseRichMediaList(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'https://www.linkedin.com/psettings/member-data/videos';
        expect(JSON.stringify(result!.list[0].link)).toBe(JSON.stringify(expected));
    });
    test('parseSavedJobAlerts', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/linkedin/SavedJobAlerts.csv`;
        const result = await ServiceLinkedin.parseSavedJobAlerts(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = '2021-11-16T11:05:00.000Z';
        expect(JSON.stringify(result!.list[0].searchDate)).toBe(JSON.stringify(expected));
    });
    test('parseSearchQueries', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/linkedin/SearchQueries.csv`;
        const result = await ServiceLinkedin.parseSearchQueries(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'Sviluppo di software';
        expect(JSON.stringify(result!.list[0].query)).toBe(JSON.stringify(expected));
    });
    test('parseSecurityChallenges', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/linkedin/Security Challenges.csv`;
        const result = await ServiceLinkedin.parseSecurityChallenges(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'France';
        expect(JSON.stringify(result!.list[0].country)).toBe(JSON.stringify(expected));
    });
    test('parseSkills', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/linkedin/Skills.csv`;
        const result = await ServiceLinkedin.parseSkills(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'Problem solving';
        expect(JSON.stringify(result!.list[0])).toBe(JSON.stringify(expected));
    });
    test('parseVotes', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/linkedin/Votes.csv`;
        const result = await ServiceLinkedin.parseVotes(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = '1';
        expect(JSON.stringify(result!.list[0].optionText)).toBe(JSON.stringify(expected));
    });
    test('parseAdsTargeting', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/linkedin/Ad_Targeting.csv`;
        const result = await ServiceLinkedin.parseAdsTargeting(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'Glitter Finance';
        expect(JSON.stringify(result!.list[0].companyNames![4])).toBe(JSON.stringify(expected));
    });
    test('parseJobApplications', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/linkedin/jobs/Job Applications.csv`;
        const result = await ServiceLinkedin.parseJobApplications(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'davide.mock@gmail.com';
        expect(JSON.stringify(result!.list[0].contactEmail)).toBe(JSON.stringify(expected));
    });
    test('parseSavedJobs', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/linkedin/jobs/Saved Jobs.csv`;
        const result = await ServiceLinkedin.parseSavedJobs(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = '100% Remote Smart Contracts Developer - Solidity';
        expect(JSON.stringify(result!.list[0].jobTitle)).toBe(JSON.stringify(expected));
    });
    test('parseJobSeekerPreferences', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/linkedin/jobs/Job Seeker Preferences.csv`;
        const result = await ServiceLinkedin.parseJobSeekerPreferences(await Parser.CSVToBuffer(path.join(__dirname, pathToFile)));
        const expected = 'Laureato';
        expect(JSON.stringify(result!.jobTitles)).toBe(JSON.stringify(expected));
    });
});
