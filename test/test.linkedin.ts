import {LinkedInService} from "../src";

async function testLinkedin(){
    await testService();
}

async function testService() {
    try {
        const path = require('path');
        const {Parser} = require('./utils/parser');
        console.log(await LinkedInService.parseAdsClicked(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Ads Clicked.csv`))));
        console.log(await LinkedInService.parseConnections(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Connections.csv`))));
        console.log(await LinkedInService.parseCompaniesFollowed(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Company Follows.csv`))));
        console.log(await LinkedInService.parseContacts(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Contacts.csv`))));
        console.log(await LinkedInService.parseEducationHistory(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Education.csv`))));
        console.log(await LinkedInService.parseEmails(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Email Addresses.csv`))));
        console.log(await LinkedInService.parseEndorsementsReceived(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Endorsement_Received_Info.csv`))));
        console.log(await LinkedInService.parseInferencesAboutYou(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Inferences_about_you.csv`))));
        console.log(await LinkedInService.parseInvitations(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Invitations.csv`))));
        console.log(await LinkedInService.parseJobApplicantSavedInfo(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Job Applicant Saved Answers.csv`))));
        console.log(await LinkedInService.parseJobApplicantSavedScreeningQuestionInfo(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Job Applicant Saved Screening Question Responses.csv`))));
        console.log(await LinkedInService.parseLearnings(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Learning.csv`))));
        console.log(await LinkedInService.parseLogins(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Logins.csv`))));
        console.log(await LinkedInService.parseMembersFollowed(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Member_Follows.csv`))));
        console.log(await LinkedInService.parseMessages(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/messages.csv`))));
        console.log(await LinkedInService.parsePhoneNumbers(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/PhoneNumbers.csv`))));
        console.log(await LinkedInService.parseWorkingPositions(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Positions.csv`))));
        console.log(await LinkedInService.parseProfile(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Profile.csv`))));
        console.log(await LinkedInService.parseReactions(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Reactions.csv`))));
        console.log(await LinkedInService.parseProfile(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Profile.csv`))));
        console.log(await LinkedInService.parseRegistration(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Registration.csv`))));
        console.log(await LinkedInService.parseRichMediaList(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Rich Media.csv`))));
        console.log(await LinkedInService.parseSavedJobAlerts(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/SavedJobAlerts.csv`))));
        console.log(await LinkedInService.parseSearchQueries(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/SearchQueries.csv`))));
        console.log(await LinkedInService.parseSecurityChallenges(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Security Challenges.csv`))));
        console.log(await LinkedInService.parseSkills(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Skills.csv`))));
        console.log(await LinkedInService.parseVotes(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Votes.csv`))));
        console.log(await LinkedInService.parseAdsTargeting(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/Ad_Targeting.csv`))));
        console.log(await LinkedInService.parseJobApplications(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/jobs/Job Applications.csv`))));
        console.log(await LinkedInService.parseSavedJobs(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/jobs/Saved Jobs.csv`))));
        console.log(await LinkedInService.parseJobSeekerPreferences(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasource files/linkedin/jobs/Job Seeker Preferences.csv`))));
    } catch (e: any) {
        if (e.code == 'MODULE_NOT_FOUND') {
            console.log('[Error not founding module] ' + e);
        } else {
            console.log(e);
        }
    }
}

testLinkedin();
