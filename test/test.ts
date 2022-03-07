import {Conversation as ConversationIG, Conversations as ConversationsIG} from "../src/model/instagram.model";
import {Conversation as ConversationFB, Conversations as ConversationsFB} from "../src/model/facebook.model";
import {Parser} from "./utils/parser";
import {ADV} from "../src/model/amazon.model";
import {LinkedInService} from "../src/service/linkedin.service";
import {InstagramService} from "../src/service/instagram.service";
import {GoogleService} from "../src/service/google.service";
import {FacebookService} from "../src/service/facebook.service";
import {NetflixService} from "../src/service/netflix.service";
import {AmazonService} from "../src/service/amazon.service";
import {DataSourceCode, FileCode, LanguageCode, RetrievingProcedureType} from "../src/descriptor/descriptor.enum";
import {DescriptorService} from "../src/descriptor/descriptor.service";
import {ValidatorInstagram} from "../src/validator/validator.instagram";
import ErrnoException = NodeJS.ErrnoException;
import {Validator} from "../src/validator/validator";
import {ProcessorInstagram} from "../src/processor/processor.instagram";

async function test(){
    //await netflixServiceTest();
    //await amazonServiceTest();
    //await facebookServiceTest();
    //await instagramServiceTest();
    //await googleServiceTest();
    //await linkedInServiceTest();

    await descriptorServiceTest();
    //await processorInstagramTest();
    //await validatorTest();
    //await validatorTestInstagram();
}




async function validatorTest() {
    try {
        const validator = new Validator();
        const fs =  require('fs');
        const path =  require('path');
        console.log(validator.getFileExtension("dd.json"));
        fs.readFile(path.join(__dirname,"../src/mock/validation/instagram.zip"),async function(err:ErrnoException, data: Buffer) {
            if (err) throw err;
            console.log(await validator.getFilesPathsIntoZip(data));
        });
    } catch (e: any) {
        if (e.code == 'MODULE_NOT_FOUND') {
            console.log('[Error not founding module] ' + e);
        } else {
            console.log(e);
        }
    }
}


async function validatorTestInstagram() {
    try {
        const validatorIG = new ValidatorInstagram();
        const validator = new Validator();
        const processorInstagram = new ProcessorInstagram();
        const fs =  require('fs');
        const path =  require('path');
        fs.readFile(path.join(__dirname,"../src/mock/validation/instagram.zip"),async function(err:ErrnoException, data: Buffer) {
            if (err) throw err;
            const validationFE = await validatorIG.selectUsefulFilesFromZip(await validator.validateZIP(data), [FileCode.INSTAGRAM_ADS_CLICKED, FileCode.INSTAGRAM_ADS_VIEWED, FileCode.INSTAGRAM_POSTS_VIEWED, FileCode.INSTAGRAM_VIDEO_VIEWED, FileCode.INSTAGRAM_POST_COMMENT, FileCode.INSTAGRAM_POSTS_CREATED, FileCode.INSTAGRAM_STORIES_CREATED, FileCode.INSTAGRAM_FOLLOWERS, FileCode.INSTAGRAM_FOLLOWING_ACCOUNTS, FileCode.INSTAGRAM_LIKE_COMMENTS, FileCode.INSTAGRAM_LIKE_POSTS, FileCode.INSTAGRAM_ELEGIBILITY, FileCode.INSTAGRAM_EMOJI_SLIDERS, FileCode.INSTAGRAM_POLLS, FileCode.INSTAGRAM_QUIZZES]);
            if(validationFE) {
                const validationBE = await validator.validateZIP(validationFE);
                if(validationBE) {
                    console.log(await processorInstagram.aggregatorFactory(validationBE, 180));
                }
            }
        });
    } catch (e: any) {
        if (e.code == 'MODULE_NOT_FOUND') {
            console.log('[Error not founding module] ' + e);
        } else {
            console.log(e);
        }
    }
}




async function descriptorServiceTest() {
    try {
        const descriptorService = new DescriptorService();
        const document = require('../src/descriptor/descriptor.json');
        console.log(await descriptorService.getDataSourcesCodes(document));
        console.log(await descriptorService.getAllDataSourcesDescriptions(document));
        console.log(await descriptorService.getSourceFormats(document, DataSourceCode.INSTAGRAM));
        console.log(await descriptorService.getSourceName(document, DataSourceCode.INSTAGRAM));
        console.log(await descriptorService.getDataSourceDescription(document, DataSourceCode.INSTAGRAM));
        console.log(await descriptorService.getAllDataSourceProcedures(document, DataSourceCode.INSTAGRAM, LanguageCode.ENGLISH));
        console.log(await descriptorService.getDataSourceProcedure(document, DataSourceCode.INSTAGRAM, LanguageCode.ENGLISH, RetrievingProcedureType.DESKTOP));
    } catch (e: any) {
        if (e.code == 'MODULE_NOT_FOUND') {
            console.log('[Error not founding module] ' + e);
        } else {
            console.log(e);
        }
    }
}

async function amazonServiceTest() {
    try {
        const amazonService = new AmazonService();
        const path = require('path');
        console.log(await amazonService.parsePrimeVideoWatchlist(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/amazon/Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.Watchlist.csv`))));
        console.log(await amazonService.parsePrimeVideoWatchlistHistory(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/amazon/Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.WatchlistHistory.csv`))));
        console.log(await amazonService.parsePrimeVideoViewingHistory(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/amazon/Digital.PrimeVideo.Viewinghistory/Digital.PrimeVideo.Viewinghistory.csv`))));
        console.log(await amazonService.parseSearchDataCustomerEngagement(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/amazon/Search-Data/Search-Data.Customer-Engagement.csv`))));
        console.log(await amazonService.parseAudibleLibrary(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/amazon/Audible.Library/Audible.Library.csv`))));
        console.log(await amazonService.parseTwitchPrimeSubscription(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/amazon/AmazonGames/AmazonGames.TwitchPrime.SubscriptionCreditHistory.csv`))));
        console.log(await amazonService.parseAmazonWishlists(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/amazon/Amazon.Lists.Wishlist.2.1/Amazon.Lists.Wishlist.json`))));
        console.log(await amazonService.parseRetailOrderHistory(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/amazon/Retail.OrderHistory.2/Retail.OrderHistory.2.csv`))));

        const fs = require('fs');
        let source = path.join(__dirname, `../src/mock/IT_version/amazon/`);
        const directories = fs.readdirSync(source);
        let directoriesADV = directories.filter((directory: string) => /Advertising/.test(directory));

        let resultAudience: ADV[] = [];
        let resultClicked: ADV[] = [];
        let array;
        for (let i = 1; i < directoriesADV.length + 1; i++) {
            source = path.join(__dirname, `../src/mock/IT_version/amazon/Advertising.${i}/Advertising.AdvertiserAudiences.csv`);
            array = await amazonService.parseAdvertiserAudiences(await Parser.CSVToBuffer(source));
            array && (resultAudience = resultAudience.concat(array.list));

            source = path.join(__dirname, `../src/mock/IT_version/amazon/Advertising.${i}/Advertising.AdvertiserClicks.csv`);
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

async function linkedInServiceTest() {
    try {
        const linkedInService = new LinkedInService();
        const path = require('path');
        //console.log(await linkedInService.parseAdsClicked(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/linkedin/Ads Clicked.csv`))));
        //console.log(await linkedInService.parseConnections(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/linkedin/Connections.csv`))));
        //console.log(await linkedInService.parseCompaniesFollowed(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/linkedin/Company Follows.csv`))));
        //console.log(await linkedInService.parseContacts(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/linkedin/Contacts.csv`))));
        //console.log(await linkedInService.parseEducationHistory(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/linkedin/Education.csv`))));
        //console.log(await linkedInService.parseEmails(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/linkedin/Email Addresses.csv`))));
        //console.log(await linkedInService.parseEndorsementsReceived(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/linkedin/Endorsement_Received_Info.csv`))));
        //console.log(await linkedInService.parseInferencesAboutYou(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/linkedin/Inferences_about_you.csv`))));
        //console.log(await linkedInService.parseInvitations(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/linkedin/Invitations.csv`))));
        //console.log(await linkedInService.parseJobApplicantSavedInfo(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/linkedin/Job Applicant Saved Answers.csv`))));
        //console.log(await linkedInService.parseJobApplicantSavedScreeningQuestionInfo(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/linkedin/Job Applicant Saved Screening Question Responses.csv`))));
        //console.log(await linkedInService.parseLearnings(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/linkedin/Learning.csv`))));
        //console.log(await linkedInService.parseLogins(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/linkedin/Logins.csv`))));
        //console.log(await linkedInService.parseMembersFollowed(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/linkedin/Member_Follows.csv`))));
        //console.log(await linkedInService.parseMessages(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/linkedin/messages.csv`))));
        //console.log(await linkedInService.parsePhoneNumbers(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/linkedin/PhoneNumbers.csv`))));
        //console.log(await linkedInService.parseWorkingPositions(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/linkedin/Positions.csv`))));
        //console.log(await linkedInService.parseProfile(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/linkedin/Profile.csv`))));
        //console.log(await linkedInService.parseReactions(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/linkedin/Reactions.csv`))));
        //console.log(await linkedInService.parseProfile(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/linkedin/Profile.csv`))));
        //console.log(await linkedInService.parseRegistration(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/linkedin/Registration.csv`))));
        //console.log(await linkedInService.parseRichMediaList(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/linkedin/Rich Media.csv`))));
        //console.log(await linkedInService.parseSavedJobAlerts(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/linkedin/SavedJobAlerts.csv`))));
        //console.log(await linkedInService.parseSearchQueries(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/linkedin/SearchQueries.csv`))));
        //console.log(await linkedInService.parseSecurityChallenges(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/linkedin/Security Challenges.csv`))));
        //console.log(await linkedInService.parseSkills(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/linkedin/Skills.csv`))));
        //console.log(await linkedInService.parseVotes(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/linkedin/Votes.csv`))));
        //console.log(await linkedInService.parseAdsTargeting(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/linkedin/Ad_Targeting.csv`))));
        //console.log(await linkedInService.parseJobApplications(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/linkedin/jobs/Job Applications.csv`))));
        //console.log(await linkedInService.parseSavedJobs(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/linkedin/jobs/Saved Jobs.csv`))));
        console.log(await linkedInService.parseJobSeekerPreferences(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/linkedin/jobs/Job Seeker Preferences.csv`))));
    } catch (e: any) {
        if(e.code == 'MODULE_NOT_FOUND'){
            console.log('[Error not founding module] '+ e);
        } else {
            console.log(e);
        }
    }
}

async function netflixServiceTest() {
    try {
        const netflixService = new NetflixService();
        const path = require('path');
        //console.log(await netflixService.parsePersonalInformation(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/netflix/ACCOUNT/AccountDetails.csv`))));
        //console.log(await netflixService.parsePreferences(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/netflix/CONTENT_INTERACTION/IndicatedPreferences.csv`))));
        //console.log(await netflixService.parseMyList(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/netflix/CONTENT_INTERACTION/MyList.csv`))));
        //console.log(await netflixService.parseSearchHistory(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/netflix/CONTENT_INTERACTION/SearchHistory.csv`))));
        //console.log(await netflixService.parseViewingActivity(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/netflix/CONTENT_INTERACTION/ViewingActivity.csv`))));
        console.log(await netflixService.parsePlaybackEvents(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/netflix/CONTENT_INTERACTION/PlaybackRelatedEvents.csv`))));
        //console.log(await netflixService.parseProfiles(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/netflix/PROFILES/Profiles.csv`))));
    } catch (e: any) {
        if (e.code == 'MODULE_NOT_FOUND') {
            console.log('[Error not founding module] ' + e);
        } else {
            console.log(e);
        }
    }
}

async function facebookServiceTest() {
    try {
        const facebookService = new FacebookService();
        console.log(await facebookService.parsePersonalInformation(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/facebook_json/profile_information/profile_information.json`)))));
        console.log(await facebookService.parseAdsInteractedWith(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/facebook_json/ads_information/advertisers_you've_interacted_with.json`)))));
        console.log(await facebookService.parseAdsUsingYourInfo(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/facebook_json/ads_information/advertisers_using_your_activity_or_information.json`)))));
        console.log(await facebookService.parseSearchHistory(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/facebook_json/search/your_search_history.json`)))));
        console.log(await facebookService.parseComments(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/facebook_json/comments_and_reactions/comments.json`)))));
        console.log(await facebookService.parsePageLiked(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/facebook_json/pages/pages_you've_liked.json`)))));
        console.log(await facebookService.parsePageFollowed(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/facebook_json/pages/pages_you_follow.json`)))));
        console.log(await facebookService.parseAppsConnected(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/facebook_json/apps_and_websites_off_of_facebook/apps_and_websites.json`)))));
        console.log(await testMessagesIGFB(facebookService, 'facebook_json/messages/inbox/'))
    } catch (e: any) {
        if(e.code == 'MODULE_NOT_FOUND'){
            console.log('[Error not founding module] '+ e);
        } else {
            console.log(e);
        }
    }
}

async function instagramServiceTest() {
    try {
        const instagramService = new InstagramService(LanguageCode.ITALIAN);
        //console.log(await instagramService.parsePersonalInformation(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/account_information/personal_information.json`)))));
        //console.log(await instagramService.parseLocation(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/information_about_you/account_based_in.json`)))));
        //console.log(await instagramService.parseAdsClicked(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/ads_and_content/ads_clicked.json`)))));
        //console.log(await instagramService.parseAdsViewed(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/ads_and_content/ads_viewed.json`)))));
        //console.log(await instagramService.parseAdsInterests(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/information_about_you/ads_interests.json`)))));
        //console.log(await instagramService.parseMusicHeardInStories(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/ads_and_content/music_heard_in_stories.json`)))));
        //console.log(await instagramService.parseMusicRecentlyUsedInStories(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/ads_and_content/music_recently_used_in_stories.json`)))));
        //console.log(await instagramService.parsePostViewed(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/ads_and_content/posts_viewed.json`)))));
        //console.log(await instagramService.parseVideoWatched(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/ads_and_content/videos_watched.json`)))));
        //console.log(await instagramService.parseSuggestedAccountViewed(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/ads_and_content/suggested_accounts_viewed.json`)))));
        //console.log(await instagramService.parseAccountYouAreNotInterested(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/ads_and_content/accounts_you're_not_interested_in.json`)))));
        //console.log(await instagramService.parseCommentsPosted(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/comments/post_comments.json`)))));
        //console.log(await instagramService.parseSyncedContracts(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/contacts/synced_contacts.json`)))));
        //console.log(await instagramService.parseArchivedPost(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/content/archived_posts.json`)))));
        //console.log(await instagramService.parsePersonalPost(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/content/posts_1.json`)))));
        //console.log(await instagramService.parseFollowers(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/followers_and_following/followers.json`)))));
        //console.log(await instagramService.parseFollowingHashtags(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/followers_and_following/following_hashtags.json`)))));
        //console.log(await instagramService.parseLikedPosts(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/likes/liked_posts.json`)))));
        //console.log(await instagramService.parseLikedComments(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/likes/liked_comments.json`)))));
        //console.log(await instagramService.parseSearches(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/recent_search/account_searches.json`)))));
        //console.log(await instagramService.parseReelSentiments(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/your_topics/your_reels_sentiments.json`)))));
        //console.log(await instagramService.parseReelTopics(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/your_topics/your_reels_topics.json`)))));
        //console.log(await instagramService.parseTopics(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/your_topics/your_topics.json`)))));
        //console.log(await instagramService.parseEmojiSliders(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/story_sticker_interactions/emoji_sliders.json`)))));
        //console.log(await instagramService.parseEligibility(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/monetization/eligibility.json`)))));
        //console.log(await instagramService.parsePolls(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/story_sticker_interactions/polls.json`)))));
        //console.log(await instagramService.parseQuizzes(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/story_sticker_interactions/quizzes.json`)))));
        console.log(await instagramService.parsePersonalStories(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/content/stories.json`)))));
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
    try {
        let googleService = new GoogleService(LanguageCode.ITALIAN);
        //console.log(await googleService.parseProfile(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/google/Takeout/Profile/Profile.json`)))));
        //console.log(await googleService.parseBrowseHistory(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/google/Takeout/Chrome/BrowserHistory.json`)))));
        //console.log(await googleService.parseSearchEngines(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/google/Takeout/Chrome/SearchEngines.json`)))));
        //console.log(await googleService.parseSemanticLocations(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/google/Takeout/LocationHistory/SemanticLocationHistory/2017/2017_APRIL.json`)))));
        //console.log(await googleService.parseImageData(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/google/Takeout/GooglePhoto/PhotosFrom2019/photo.mp4.json`)))));
        //console.log(await googleService.parseTransactions(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/google/Takeout/GooglePay/GoogleTransactions/transactions_123456.csv`))));
        //console.log(await googleService.parseDocLibrary(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/google/Takeout/GooglePlayStore/Library.json`)))));
        //console.log(await googleService.parsePurchaseHistory(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/google/Takeout/GooglePlayStore/PurchaseHistory.json`)))));
        //console.log(await googleService.parseOrderHistory(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/google/Takeout/GooglePlayStore/OrderHistory.json`)))));
        const fs = require('fs');
        const path = require('path');
        //console.log(await googleService.parseActivitiesShopping(Buffer.from(fs.readFileSync(path.resolve(__dirname, `../src/mock/IT_version/google/Takeout/YourActivities/Shopping/MyActivities.html`)))));
        //console.log(await googleService.parseDailyDiscoverActivities(Buffer.from(fs.readFileSync(path.resolve(__dirname, `../src/mock/IT_version/google/Takeout/YourActivities/Discover/MyActivities.html`)))));
        //console.log(await googleService.parseSearchActivities(Buffer.from(fs.readFileSync(path.resolve(__dirname, `../src/mock/IT_version/google/Takeout/YourActivities/Search/MyActivities.html`)))));
        //console.log(await googleService.parseYoutubeActivities(Buffer.from(fs.readFileSync(path.resolve(__dirname, `../src/mock/IT_version/google/Takeout/YourActivities/YouTube/MyActivities.html`)))));
        console.log(await googleService.parseNewsActivities(Buffer.from(fs.readFileSync(path.resolve(__dirname, `../src/mock/IT_version/google/Takeout/YourActivities/News/MyActivities.html`)))));
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
        let source = path.join(__dirname, `../src/mock/IT_version/${pathInbox}`);
        const directories = fs.readdirSync(source);

        if(directories.length > 0) {
            if(service instanceof InstagramService) {
                let conversationsModel: ConversationsIG = {};
                let array = new Array<ConversationIG>(directories.length);
                for (let i = 0; i < directories.length; i++) {
                    array[i] = <ConversationIG>await service.parseMessages(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/${pathInbox}${directories[i]}/message_1.json`))));
                }
                conversationsModel.listInbox = array;
                return conversationsModel;
            } else {
                let conversationsModel: ConversationsFB = {};
                let array = new Array<ConversationFB>(directories.length);
                for (let i = 0; i < directories.length; i++) {
                    array[i] = <ConversationFB>await service.parseMessages(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/${pathInbox}${directories[i]}/message_1.json`))));
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