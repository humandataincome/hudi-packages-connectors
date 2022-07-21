import {ServiceLinkedin} from "../../src";

async function testLinkedin(){
    await testService();
}

async function testService() {
    try {
        const path = require('path');
        const {Parser} = require('../utils/parser');
        console.log(await ServiceLinkedin.parseAdsClicked(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Ads Clicked.csv`))));
        console.log(await ServiceLinkedin.parseConnections(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Connections.csv`))));
        console.log(await ServiceLinkedin.parseCompaniesFollowed(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Company Follows.csv`))));
        console.log(await ServiceLinkedin.parseContacts(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Contacts.csv`))));
        console.log(await ServiceLinkedin.parseEducationHistory(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Education.csv`))));
        console.log(await ServiceLinkedin.parseEmails(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Email Addresses.csv`))));
        console.log(await ServiceLinkedin.parseEndorsementsReceived(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Endorsement_Received_Info.csv`))));
        console.log(await ServiceLinkedin.parseInferencesAboutYou(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Inferences_about_you.csv`))));
        console.log(await ServiceLinkedin.parseInvitations(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Invitations.csv`))));
        console.log(await ServiceLinkedin.parseJobApplicantSavedInfo(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Job Applicant Saved Answers.csv`))));
        console.log(await ServiceLinkedin.parseJobApplicantSavedScreeningQuestionInfo(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Job Applicant Saved Screening Question Responses.csv`))));
        console.log(await ServiceLinkedin.parseLearnings(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Learning.csv`))));
        console.log(await ServiceLinkedin.parseLogins(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Logins.csv`))));
        console.log(await ServiceLinkedin.parseMembersFollowed(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Member_Follows.csv`))));
        console.log(await ServiceLinkedin.parseMessages(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/messages.csv`))));
        console.log(await ServiceLinkedin.parsePhoneNumbers(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/PhoneNumbers.csv`))));
        console.log(await ServiceLinkedin.parseWorkingPositions(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Positions.csv`))));
        console.log(await ServiceLinkedin.parseProfile(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Profile.csv`))));
        console.log(await ServiceLinkedin.parseReactions(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Reactions.csv`))));
        console.log(await ServiceLinkedin.parseProfile(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Profile.csv`))));
        console.log(await ServiceLinkedin.parseRegistration(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Registration.csv`))));
        console.log(await ServiceLinkedin.parseRichMediaList(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Rich Media.csv`))));
        console.log(await ServiceLinkedin.parseSavedJobAlerts(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/SavedJobAlerts.csv`))));
        console.log(await ServiceLinkedin.parseSearchQueries(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/SearchQueries.csv`))));
        console.log(await ServiceLinkedin.parseSecurityChallenges(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Security Challenges.csv`))));
        console.log(await ServiceLinkedin.parseSkills(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Skills.csv`))));
        console.log(await ServiceLinkedin.parseVotes(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Votes.csv`))));
        console.log(await ServiceLinkedin.parseAdsTargeting(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Ad_Targeting.csv`))));
        console.log(await ServiceLinkedin.parseJobApplications(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/jobs/Job Applications.csv`))));
        console.log(await ServiceLinkedin.parseSavedJobs(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/jobs/Saved Jobs.csv`))));
        console.log(await ServiceLinkedin.parseJobSeekerPreferences(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/jobs/Job Seeker Preferences.csv`))));
    } catch (e: any) {
        if (e.code == 'MODULE_NOT_FOUND') {
            console.log('[Error not founding module] ' + e);
        } else {
            console.log(e);
        }
    }
}

testLinkedin();
