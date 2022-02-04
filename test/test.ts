
import {InstagramService} from '../src/services/instagram.service';
import {LanguageMode} from "../src/utils/utils.enum"
import {FacebookService} from "../src/services/facebook.service";
import {NetflixService} from "../src/services/netflix.service";
import {AmazonService} from "../src/services/amazon.service";
import {ConfigInstagram} from "../src/config/config.instagram";
import {CONFIG} from "../src/config/config.utils";
import {Conversation as ConversationIG, Conversations as ConversationsIG} from "../src/models/instagram.model";
import {Conversation as ConversationFB, Conversations as ConversationsFB} from "../src/models/facebook.model";
import path from "path";
import {Parser} from "./utils/parser";
import {GoogleService} from "../src/services/google.service";
import {ADV} from "../src/models/amazon.model";
import {ConfigGoogle} from "../src/config/config.google";
import {LinkedinService} from "../src/services/linkedin.service";



async function test(){
    //await netflixServiceTest();
    //await amazonServiceTest();
    //await facebookServiceTest();
    //await instagramServiceTest();
    //await googleServiceTest();
    await linkedinServiceTest();
}

async function amazonServiceTest() {
    try {
        const amazonService = new AmazonService();
        console.log(await amazonService.parsePrimeVideoWatchlist(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/amazon/Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.Watchlist.csv`))));
        console.log(await amazonService.parsePrimeVideoWatchlistHistory(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/amazon/Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.WatchlistHistory.csv`))));
        console.log(await amazonService.parsePrimeVideoViewingHistory(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/amazon/Digital.PrimeVideo.Viewinghistory/Digital.PrimeVideo.Viewinghistory.csv`))));
        console.log(await amazonService.parseSearchDataCustomerEngagement(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/amazon/Search-Data/Search-Data.Customer-Engagement.csv`))));
        console.log(await amazonService.parseAudibleLibrary(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/amazon/Audible.Library/Audible.Library.csv`))));
        console.log(await amazonService.parseTwitchPrimeSubscription(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/amazon/AmazonGames/AmazonGames.TwitchPrime.SubscriptionCreditHistory.csv`))));
        console.log(await amazonService.parseAmazonWishlists(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/amazon/Amazon.Lists.Wishlist.2.1/Amazon.Lists.Wishlist.json`))));
        console.log(await amazonService.parseRetailOrderHistory(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/amazon/Retail.OrderHistory.2/Retail.OrderHistory.2.csv`))));

        /**
         * advertising files are generated with a limit of 100 entries for each files,
         * when the limit is reached another directory with files is created.
         * Mock files have 3 of these directories.
         */
        const fs = require('fs');
        let source = path.join(__dirname, `../src/mock/amazon/`);
        const directories = fs.readdirSync(source);
        let directoriesADV = directories.filter((directory: string) => /Advertising/.test(directory));

        let resultAudience: ADV[] = [];
        let resultClicked: ADV[] = [];
        let array;
        for (let i = 1; i < directoriesADV.length + 1; i++) {
            source = path.join(__dirname, `../src/mock/amazon/Advertising.${i}/Advertising.AdvertiserAudiences.csv`);
            array = await amazonService.parseAdvertiserAudiences(await Parser.CSVToBuffer(source));
            array && (resultAudience = resultAudience.concat(array.list));

            source = path.join(__dirname, `../src/mock/amazon/Advertising.${i}/Advertising.AdvertiserClicks.csv`);
            array = await amazonService.parseAdvertiserClicked(await Parser.CSVToBuffer(source));
            array && (resultClicked = resultClicked.concat(array.list));
        }
        console.log(resultAudience.sort());
        console.log(resultClicked.sort());
    } catch (e: any) {
        if(e.code == 'MODULE_NOT_FOUND'){
            console.log('[Error not founding module] '+ e);
        } else {
            console.log(e);
        }
    }
}

async function linkedinServiceTest() {
    try {
        const linkedinService = new LinkedinService();
        //console.log(await linkedinService.parseAdsClicked(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/linkedin/Ads Clicked.csv`))));
        //console.log(await linkedinService.parseConnections(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/linkedin/Connections.csv`))));
        //console.log(await linkedinService.parseCompaniesFollowed(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/linkedin/Company Follows.csv`))));
        //console.log(await linkedinService.parseContacts(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/linkedin/Contacts.csv`))));
        //console.log(await linkedinService.parseEducationHistory(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/linkedin/Education.csv`))));
        //console.log(await linkedinService.parseEmails(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/linkedin/Email Addresses.csv`))));
        //console.log(await linkedinService.parseEndorsementsReceived(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/linkedin/Endorsement_Received_Info.csv`))));
        //console.log(await linkedinService.parseInferencesAboutYou(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/linkedin/Inferences_about_you.csv`))));
        //console.log(await linkedinService.parseInvitations(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/linkedin/Invitations.csv`))));
        //console.log(await linkedinService.parseJobApplicantSavedInfo(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/linkedin/Job Applicant Saved Answers.csv`))));
        //console.log(await linkedinService.parseJobApplicantSavedScreeningQuestionInfo(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/linkedin/Job Applicant Saved Screening Question Responses.csv`))));
        //console.log(await linkedinService.parseLearnings(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/linkedin/Learning.csv`))));
        //console.log(await linkedinService.parseLogins(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/linkedin/Logins.csv`))));
        //console.log(await linkedinService.parseMembersFollowed(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/linkedin/Member_Follows.csv`))));
        //console.log(await linkedinService.parseMessages(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/linkedin/messages.csv`))));
        //console.log(await linkedinService.parsePhoneNumbers(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/linkedin/PhoneNumbers.csv`))));
        //console.log(await linkedinService.parseWorkingPositions(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/linkedin/Positions.csv`))));
        //console.log(await linkedinService.parseProfile(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/linkedin/Profile.csv`))));
        //console.log(await linkedinService.parseReactions(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/linkedin/Reactions.csv`))));
        //console.log(await linkedinService.parseProfile(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/linkedin/Profile.csv`))));
        //console.log(await linkedinService.parseRegistration(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/linkedin/Registration.csv`))));
        //console.log(await linkedinService.parseRichMediaList(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/linkedin/Rich Media.csv`))));
        //console.log(await linkedinService.parseSavedJobAlerts(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/linkedin/SavedJobAlerts.csv`))));
        //console.log(await linkedinService.parseSearchQueries(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/linkedin/SearchQueries.csv`))));
        //console.log(await linkedinService.parseSecurityChallenges(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/linkedin/Security Challenges.csv`))));
        //console.log(await linkedinService.parseSkills(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/linkedin/Skills.csv`))));
        //console.log(await linkedinService.parseVotes(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/linkedin/Votes.csv`))));
        //console.log(await linkedinService.parseAdsTargeting(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/linkedin/Ad_Targeting.csv`))));
        //console.log(await linkedinService.parseJobApplications(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/linkedin/jobs/Job Applications.csv`))));
        //console.log(await linkedinService.parseSavedJobs(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/linkedin/jobs/Saved Jobs.csv`))));
        console.log(await linkedinService.parseJobSeekerPreferences(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/linkedin/jobs/Job Seeker Preferences.csv`))));
    } catch (e: any) {
        if(e.code == 'MODULE_NOT_FOUND'){
            console.log('[Error not founding module] '+ e);
        } else {
            console.log(e);
        }
    }
}

async function netflixServiceTest() {
    const netflixService = new NetflixService();
    try {
        //console.log(await netflixService.parsePersonalInformation(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/netflix/ACCOUNT/AccountDetails.csv`))));
        //console.log(await netflixService.parsePreferences(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/netflix/CONTENT_INTERACTION/IndicatedPreferences.csv`))));
        //console.log(await netflixService.parseMyList(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/netflix/CONTENT_INTERACTION/MyList.csv`))));
        //console.log(await netflixService.parseSearchHistory(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/netflix/CONTENT_INTERACTION/SearchHistory.csv`))));
        //console.log(await netflixService.parseViewingActivity(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/netflix/CONTENT_INTERACTION/ViewingActivity.csv`))));
        console.log(await netflixService.parsePlaybackEvents(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/netflix/CONTENT_INTERACTION/PlaybackRelatedEvents.csv`))));
        //console.log(await netflixService.parseProfiles(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/netflix/PROFILES/Profiles.csv`))));
    } catch (e: any) {
        if (e.code == 'MODULE_NOT_FOUND') {
            console.log('[Error not founding module] ' + e);
        } else {
            console.log(e);
        }
    }
}

async function facebookServiceTest() {
    const facebookService = new FacebookService();
    try {
        //console.log(await facebookService.parsePersonalInformation(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}facebook_json/profile_information/profile_information.json`)))));
        //console.log(await facebookService.parseAdsInteractedWith(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}facebook_json/ads_information/advertisers_you've_interacted_with.json`)))));
        //console.log(await facebookService.parseAdsUsingYourInfo(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}facebook_json/ads_information/advertisers_using_your_activity_or_information.json`)))));
        //console.log(await facebookService.parseSearchHistory(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}facebook_json/search/your_search_history.json`)))));
        //console.log(await facebookService.parseComments(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}facebook_json/comments_and_reactions/comments.json`)))));
        //console.log(await facebookService.parsePageLiked(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}facebook_json/pages/pages_you've_liked.json`)))));
        //console.log(await facebookService.parsePageFollowed(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}facebook_json/pages/pages_you_follow.json`)))));
        //console.log(await facebookService.parseAppsConnected(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}facebook_json/apps_and_websites_off_of_facebook/apps_and_websites.json`)))));
        //console.log(await testMessagesIGFB(facebookService, 'facebook_json/messages/inbox/'))
    } catch (e: any) {
        if(e.code == 'MODULE_NOT_FOUND'){
            console.log('[Error not founding module] '+ e);
        } else {
            console.log(e);
        }
    }
}

async function instagramServiceTest() {
    let configIG = new ConfigInstagram(LanguageMode.ITALIAN);
    const instagramService = new InstagramService(configIG);
    try {
        //console.log(await instagramService.parsePersonalInformation(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}instagram_json/account_information/personal_information.json`)))));
        //console.log(await instagramService.parseLocation(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}instagram_json/information_about_you/account_based_in.json`)))));
        //console.log(await instagramService.parseAdsClicked(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}instagram_json/ads_and_content/ads_clicked.json`)))));
        //console.log(await instagramService.parseAdsViewed(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}instagram_json/ads_and_content/ads_viewed.json`)))));
        //console.log(await instagramService.parseAdsInterests(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}instagram_json/information_about_you/ads_interests.json`)))));
        //console.log(await instagramService.parseMusicHeardInStories(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}instagram_json/ads_and_content/music_heard_in_stories.json`)))));
        //console.log(await instagramService.parseMusicRecentlyUsedInStories(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}instagram_json/ads_and_content/music_recently_used_in_stories.json`)))));
        //console.log(await instagramService.parsePostViewed(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}instagram_json/ads_and_content/posts_viewed.json`)))));
        //console.log(await instagramService.parseVideoWatched(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}instagram_json/ads_and_content/videos_watched.json`)))));
        //console.log(await instagramService.parseSuggestedAccountViewed(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}instagram_json/ads_and_content/suggested_accounts_viewed.json`)))));
        //console.log(await instagramService.parseAccountYouAreNotInterested(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}instagram_json/ads_and_content/accounts_you're_not_interested_in.json`)))));
        //console.log(await instagramService.parseCommentsPosted(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}instagram_json/comments/post_comments.json`)))));
        //console.log(await instagramService.parseSyncedContracts(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}instagram_json/contacts/synced_contacts.json`)))));
        //console.log(await instagramService.parseArchivedPost(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}instagram_json/content/archived_posts.json`)))));
        //console.log(await instagramService.parsePersonalPost(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}instagram_json/content/posts_1.json`)))));
        //console.log(await instagramService.parseFollowers(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}instagram_json/followers_and_following/followers.json`)))));
        //console.log(await instagramService.parseFollowingHashtags(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}instagram_json/followers_and_following/following_hashtags.json`)))));
        //console.log(await instagramService.parseLikedPosts(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}instagram_json/likes/liked_posts.json`)))));
        //console.log(await instagramService.parseLikedComments(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}instagram_json/likes/liked_comments.json`)))));
        //console.log(await instagramService.parseSearches(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}instagram_json/recent_search/account_searches.json`)))));
        //console.log(await instagramService.parseReelSentiments(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}instagram_json/your_topics/your_reels_sentiments.json`)))));
        //console.log(await instagramService.parseReelTopics(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}instagram_json/your_topics/your_reels_topics.json`)))));
        //console.log(await instagramService.parseTopics(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}instagram_json/your_topics/your_topics.json`)))));
        //console.log(await testMessagesIGFB(instagramService, 'instagram_json/messages/inbox/'))
    } catch (e: any) {
        if(e.code == 'MODULE_NOT_FOUND'){
            console.log('[Error not founding module] '+ e);
        } else {
            console.log(e);
        }
    }
}

async function googleServiceTest() {
    let configGoogle = new ConfigGoogle(LanguageMode.ITALIAN);
    let googleService = new GoogleService(configGoogle);
    try {
        //console.log(await googleService.parseProfile(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}google/Takeout/Profile/Profile.json`)))));
        //console.log(await googleService.parseBrowseHistory(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}google/Takeout/Chrome/BrowserHistory.json`)))));
        //console.log(await googleService.parseSearchEngines(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}google/Takeout/Chrome/SearchEngines.json`)))));
        //console.log(await googleService.parseSemanticLocations(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}google/Takeout/LocationHistory/SemanticLocationHistory/2017/2017_APRIL.json`)))));
        //console.log(await googleService.parseImageData(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}google/Takeout/GooglePhoto/PhotosFrom2019/photo.mp4.json`)))));
        //console.log(await googleService.parseTransactions(await Parser.CSVToBuffer(path.join(__dirname, `${CONFIG.get('PATH_PREFIX')}google/Takeout/GooglePay/GoogleTransactions/transactions_123456.csv`))));
        //console.log(await googleService.parseDocLibrary(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}google/Takeout/GooglePlayStore/Library.json`)))));
        //console.log(await googleService.parsePurchaseHistory(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}google/Takeout/GooglePlayStore/PurchaseHistory.json`)))));
        //console.log(await googleService.parseOrderHistory(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}google/Takeout/GooglePlayStore/OrderHistory.json`)))));
        const fs = require('fs');
        const path = require('path');
        //console.log(await googleService.parseActivitiesShopping(Buffer.from(fs.readFileSync(path.resolve(__dirname, `${CONFIG.get('PATH_PREFIX')}google/Takeout/YourActivities/Shopping/MyActivities.html`)))));
        //console.log(await googleService.parseDailyDiscoverActivities(Buffer.from(fs.readFileSync(path.resolve(__dirname, `${CONFIG.get('PATH_PREFIX')}google/Takeout/YourActivities/Discover/MyActivities.html`)))));
        //console.log(await googleService.parseSearchActivities(Buffer.from(fs.readFileSync(path.resolve(__dirname, `${CONFIG.get('PATH_PREFIX')}google/Takeout/YourActivities/Search/MyActivities.html`)))));
        //console.log(await googleService.parseYoutubeActivities(Buffer.from(fs.readFileSync(path.resolve(__dirname, `${CONFIG.get('PATH_PREFIX')}google/Takeout/YourActivities/YouTube/MyActivities.html`)))));
        console.log(await googleService.parseNewsActivities(Buffer.from(fs.readFileSync(path.resolve(__dirname, `${CONFIG.get('PATH_PREFIX')}google/Takeout/YourActivities/News/MyActivities.html`)))));
    } catch (e: any) {
        if (e.code == 'MODULE_NOT_FOUND') {
            console.log('[Error not founding module] ' + e);
        } else {
            console.log(e);
        }
    }
}

async function testMessagesIGFB(service: InstagramService | FacebookService, pathInbox: string){
    try {
        const path = require('path');
        const fs = require('fs');
        let source = path.join(__dirname, `${CONFIG.get('PATH_PREFIX')}${pathInbox}`);
        const directories = fs.readdirSync(source);

        if(directories.length > 0) {
            if(service instanceof InstagramService) {
                let conversationsModel: ConversationsIG = {};
                let array = new Array<ConversationIG>(directories.length);
                for (let i = 0; i < directories.length; i++) {
                    array[i] = <ConversationIG>await service.parseMessages(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}${pathInbox}${directories[i]}/message_1.json`))));
                }
                conversationsModel.listInbox = array;
                return conversationsModel;
            } else {
                let conversationsModel: ConversationsFB = {};
                let array = new Array<ConversationFB>(directories.length);
                for (let i = 0; i < directories.length; i++) {
                    array[i] = <ConversationFB>await service.parseMessages(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}${pathInbox}${directories[i]}/message_1.json`))));
                }
                conversationsModel.listInbox = array;
                return conversationsModel;
            }
        }
    } catch (e: any) {
        console.log('[testMessagesIGFB] '+e);
    }
}


test();