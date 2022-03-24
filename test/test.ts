import ErrnoException = NodeJS.ErrnoException;
import {
    ProcessorFacebook,
    ValidatorFacebook,
    FacebookService,
    InstagramService,
    LanguageCode,
    ProcessorInstagram,
    Validator,
    ValidatorInstagram,
    DescriptorService,
    DataSourceCode,
    RetrievingProcedureType,
    AmazonService,
    AdvertiserAM
} from "../src";

async function test(){
    validatorAndProcessingInstagramTest();
    //validatorAndProcessingFacebookTest();
    //validatorAndProcessingAmazonTest();
    //await descriptorServiceTest();
    //await InstagramServiceTest();
    //await FacebookServiceTest();
    //await AmazonServiceTest();

    //await netflixServiceTest();
    //await googleServiceTest();
    //await linkedInServiceTest();
}

function validatorAndProcessingInstagramTest() {
    try {
        const fs =  require('fs');
        const path =  require('path');
        fs.readFile(path.join(__dirname,"../src/mock/validation/instagram.zip"),async function(err:ErrnoException, data: Buffer) {
            if (err) throw err;
            const validZip = await Validator.validateZIP(data);
            const validationFE = await ValidatorInstagram.selectUsefulFilesFromZip(validZip);
            //console.log(await Validator.getFilesPathsIntoZip(validZip));
            if(validationFE) {
                const validationBE = await Validator.validateZIP(validationFE);
                if(validationBE) {
                    //console.log(await Validator.getFilesPathsIntoZip(validationBE));
                    console.log(await ProcessorInstagram.aggregatorFactory(validationBE, 180));
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


function validatorAndProcessingFacebookTest() {
    try {
        const validator = new Validator();
        const fs =  require('fs');
        const path =  require('path');
        fs.readFile(path.join(__dirname,"../src/mock/validation/facebook.zip"),async function(err:ErrnoException, data: Buffer) {
            if (err) throw err;
            //console.log(await Validator.getFilesPathsIntoZip(data));
            const validationFE = await ValidatorFacebook.selectUsefulFilesFromZip(await Validator.validateZIP(data));
            if(validationFE) {
                const validationBE = await Validator.validateZIP(validationFE);
                if(validationBE) {
                    //console.log(await Validator.getFilesPathsIntoZip(validationBE));
                    console.log(await ProcessorFacebook.aggregatorFactory(validationBE, 180));
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

function validatorAndProcessingAmazonTest() {
    try {
        const fs =  require('fs');
        const path =  require('path');
        fs.readFile(path.join(__dirname,"../src/mock/validation/amazon.zip"),async function(err:ErrnoException, data: Buffer) {
            if (err) throw err;
            const validationFE = await Validator.validateZIP(data);
            console.log(await Validator.getFilesPathsIntoZip(validationFE));

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
        console.log(DescriptorService.getAllDataSourcesCodes());
        console.log(DescriptorService.getDataSourceDescription(DataSourceCode.INSTAGRAM));
        console.log(DescriptorService.getDataSourceName(DataSourceCode.INSTAGRAM));
        console.log(DescriptorService.getDataSourceFormats(DataSourceCode.INSTAGRAM));
        console.log(DescriptorService.getDataSourceProcedure(DataSourceCode.FACEBOOK, LanguageCode.ITALIAN, RetrievingProcedureType.DESKTOP));
        console.log(DescriptorService.getAllDataSourceLanguages(DataSourceCode.INSTAGRAM));
        console.log(DescriptorService.getAllDataSourceProcedureTypes(DataSourceCode.INSTAGRAM, LanguageCode.ENGLISH));
    } catch (e: any) {
        if (e.code == 'MODULE_NOT_FOUND') {
            console.log('[Error not founding module] ' + e);
        } else {
            console.log(e);
        }
    }
}

async function instagramServiceTest() {
    try {
        console.log(await InstagramService.parsePersonalInformation(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/account_information/personal_information.json`)))));
        console.log(await InstagramService.parseLocation(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/information_about_you/account_based_in.json`)))));
        console.log(await InstagramService.parseAdsClicked(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/ads_and_content/ads_clicked.json`)))));
        console.log(await InstagramService.parseAdsViewed(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/ads_and_content/ads_viewed.json`)))));
        console.log(await InstagramService.parseAdsInterests(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/information_about_you/ads_interests.json`)))));
        console.log(await InstagramService.parseMusicHeardInStories(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/ads_and_content/music_heard_in_stories.json`)))));
        console.log(await InstagramService.parseMusicRecentlyUsedInStories(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/ads_and_content/music_recently_used_in_stories.json`)))));
        console.log(await InstagramService.parsePostViewed(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/ads_and_content/posts_viewed.json`)))));
        console.log(await InstagramService.parseVideoWatched(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/ads_and_content/videos_watched.json`)))));
        console.log(await InstagramService.parseSuggestedAccountViewed(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/ads_and_content/suggested_accounts_viewed.json`)))));
        console.log(await InstagramService.parseAccountYouAreNotInterested(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/ads_and_content/accounts_you're_not_interested_in.json`)))));
        console.log(await InstagramService.parseCommentsPosted(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/comments/post_comments.json`)))));
        console.log(await InstagramService.parseSyncedContracts(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/contacts/synced_contacts.json`)))));
        console.log(await InstagramService.parseArchivedPost(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/content/archived_posts.json`)))));
        console.log(await InstagramService.parsePersonalPost(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/content/posts_1.json`)))));
        console.log(await InstagramService.parseFollowers(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/followers_and_following/followers.json`)))));
        console.log(await InstagramService.parseFollowingHashtags(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/followers_and_following/following_hashtags.json`)))));
        console.log(await InstagramService.parseLikedPosts(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/likes/liked_posts.json`)))));
        console.log(await InstagramService.parseLikedComments(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/likes/liked_comments.json`)))));
        console.log(await InstagramService.parseSearches(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/recent_search/account_searches.json`)))));
        console.log(await InstagramService.parseReelSentiments(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/your_topics/your_reels_sentiments.json`)))));
        console.log(await InstagramService.parseReelTopics(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/your_topics/your_reels_topics.json`)))));
        console.log(await InstagramService.parseTopics(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/your_topics/your_topics.json`)))));
        console.log(await InstagramService.parseEmojiSliders(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/story_sticker_interactions/emoji_sliders.json`)))));
        console.log(await InstagramService.parseEligibility(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/monetization/eligibility.json`)))));
        console.log(await InstagramService.parsePolls(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/story_sticker_interactions/polls.json`)))));
        console.log(await InstagramService.parseQuizzes(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/story_sticker_interactions/quizzes.json`)))));
        console.log(await InstagramService.parsePersonalStories(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/instagram_json/content/stories.json`)))));
    } catch (e: any) {
        if(e.code == 'MODULE_NOT_FOUND'){
            console.log('[Error not founding module] '+ e);
        } else {
            console.log(e);
        }
    }
}


async function facebookServiceTest() {
    try {
        console.log(await FacebookService.parsePersonalInformation(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/facebook_json/profile_information/profile_information.json`)))));
        console.log(await FacebookService.parseAdsInteractedWith(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/facebook_json/ads_information/advertisers_you've_interacted_with.json`)))));
        console.log(await FacebookService.parseAdsUsingYourInfo(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/facebook_json/ads_information/advertisers_using_your_activity_or_information.json`)))));
        console.log(await FacebookService.parseSearchHistory(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/facebook_json/search/your_search_history.json`)))));
        console.log(await FacebookService.parseComments(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/facebook_json/comments_and_reactions/comments.json`)))));
        console.log(await FacebookService.parseReactions(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/facebook_json/comments_and_reactions/posts_and_comments.json`)))));
        console.log(await FacebookService.parsePagesLiked(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/facebook_json/pages/pages_you've_liked.json`)))));
        console.log(await FacebookService.parsePagesFollowed(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/facebook_json/pages/pages_you_follow.json`)))));
        console.log(await FacebookService.parseAppsConnected(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/facebook_json/apps_and_websites_off_of_facebook/apps_and_websites.json`)))));
        console.log(await FacebookService.parseFriendRequestsSent(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/facebook_json/friends_and_followers/friend_requests_sent.json`)))));
        console.log(await FacebookService.parseRejectedFriendshipRequests(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/facebook_json/friends_and_followers/rejected_friend_requests.json`)))));
        console.log(await FacebookService.parseRemovedFriends(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/facebook_json/friends_and_followers/removed_friends.json`)))));
        console.log(await FacebookService.parseWhoYouFollow(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/facebook_json/friends_and_followers/who_you_follow.json`)))));
        console.log(await FacebookService.parseLanguages(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/facebook_json/preferences/language_and_locale.json`)))));
        console.log(await FacebookService.parsePagesRecommended(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/facebook_json/pages/pages_you've_recommended.json`)))));
        console.log(await FacebookService.parseRecentlyViewed(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/facebook_json/your_interactions_on_facebook/recently_viewed.json`)))));
        console.log(await FacebookService.parseYourPosts(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/facebook_json/posts/your_posts_1.json`)))));
        console.log(await FacebookService.parseFriends(Buffer.from(JSON.stringify(require(`../src/mock/IT_version/facebook_json/friends_and_followers/friends.json`)))));
    } catch (e: any) {
        if(e.code == 'MODULE_NOT_FOUND'){
            console.log('[Error not founding module] '+ e);
        } else {
            console.log(e);
        }
    }
}


async function amazonServiceTest() {
    try {
        const {Parser} = require("./utils/parser");
        const path = require('path');
        console.log(await AmazonService.parsePrimeVideoWatchlist(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/amazon/Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.Watchlist.csv`))));
        console.log(await AmazonService.parsePrimeVideoWatchlistHistory(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/amazon/Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.WatchlistHistory.csv`))));
        console.log(await AmazonService.parsePrimeVideoViewingHistory(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/amazon/Digital.PrimeVideo.Viewinghistory/Digital.PrimeVideo.Viewinghistory.csv`))));
        console.log(await AmazonService.parseSearchDataCustomerEngagement(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/amazon/Search-Data/Search-Data.Customer-Engagement.csv`))));
        console.log(await AmazonService.parseAudibleLibrary(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/amazon/Audible.Library/Audible.Library.csv`))));
        console.log(await AmazonService.parseTwitchPrimeSubscription(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/amazon/AmazonGames/AmazonGames.TwitchPrime.SubscriptionCreditHistory.csv`))));
        console.log(await AmazonService.parseAmazonWishlists(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/amazon/Amazon.Lists.Wishlist.2.1/Amazon.Lists.Wishlist.json`))));
        console.log(await AmazonService.parseRetailOrderHistory(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/IT_version/amazon/Retail.OrderHistory.2/Retail.OrderHistory.2.csv`))));

        const fs = require('fs');
        let source = path.join(__dirname, `../src/mock/IT_version/amazon/`);
        const directories = fs.readdirSync(source);
        let directoriesADV = directories.filter((directory: string) => /Advertising/.test(directory));

        let resultAudience: AdvertiserAM[] = [];
        let resultClicked: AdvertiserAM[] = [];
        let array;
        for (let i = 1; i < directoriesADV.length + 1; i++) {
            source = path.join(__dirname, `../src/mock/IT_version/amazon/Advertising.${i}/Advertising.AdvertiserAudiences.csv`);
            array = await AmazonService.parseAdvertiserAudiences(await Parser.CSVToBuffer(source));
            array && (resultAudience = resultAudience.concat(array.list));

            source = path.join(__dirname, `../src/mock/IT_version/amazon/Advertising.${i}/Advertising.AdvertiserClicks.csv`);
            array = await AmazonService.parseAdvertiserClicked(await Parser.CSVToBuffer(source));
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

/*
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

 */
test();
