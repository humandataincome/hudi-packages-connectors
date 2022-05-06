import ErrnoException = NodeJS.ErrnoException;
import {
    AdvertiserAM,
    AmazonService,
    DataSourceCode,
    DescriptorService,
    FacebookService,
    FileCodeAmazon,
    FileCodeGoogle,
    FileExtension,
    GoogleService,
    InstagramService,
    LanguageCode,
    LinkedInService,
    NetflixService,
    ProcessorAmazon,
    ProcessorFacebook,
    ProcessorGoogle,
    ProcessorInstagram,
    RetrievingProcedureType, ValidationErrorEnums,
    ValidatorAmazon,
    ValidatorFacebook,
    ValidatorFiles,
    ValidatorInstagram,
    ValidatorGoogle
} from "../src";
async function test(){
    sequentialValidationsProcessingTest();

    //validatorAndProcessingInstagramTest();
    //validatorAndProcessingFacebookTest();
    //validatorAndProcessingAmazonTest();
    //validatorAndProcessingGoogleTest();

    //await descriptorServiceTest();
    //await instagramServiceTest();
    //await facebookServiceTest();
    //await amazonServiceTest();
    //await netflixServiceTest();
    //await googleServiceTest();
    //await linkedInServiceTest();
}

function sequentialValidationsProcessingTest() {
    try {
        const fs =  require('fs');
        const path =  require('path');
        fs.readFile(path.join(__dirname,"../src/mock/zip_files/instagram.zip"),async function(err:ErrnoException, data: Buffer) {
            if (err) throw err
            const validation1 = await ValidatorFiles.validateZIP(data,
                {
                    permittedFileExtensions: [FileExtension.ZIP, FileExtension.JSON, FileExtension.CSV, FileExtension.HTML],
                    filterDataSource: {
                        dataSourceCode: DataSourceCode.INSTAGRAM,
                    },
                    throwExceptions: true,
                });
            console.log(await ProcessorInstagram.aggregatorFactory(validation1!, 180));
        });
        fs.readFile(path.join(__dirname,"../src/mock/zip_files/google.zip"),async function(err:ErrnoException, data: Buffer) {
            const validation1 = await ValidatorFiles.validateZIP(data);
            const validation2 = await ValidatorGoogle.getInstance().filterFilesIntoZip(validation1!, {throwExceptions: true});
            console.log(await ProcessorGoogle.aggregatorFactory(validation2!, 180));
        });
    } catch (e: any) {
        if(e.message === `${ValidationErrorEnums.NO_USEFUL_FILES_ERROR}: The filtered ZIP has not any file`) {
            console.error('The filtered ZIP has not any file');
        } else if (`${ValidationErrorEnums.LANGUAGE_ERROR}: The ZIP file has not a recognizable Language to be corrected parsed`) {
            console.error('The ZIP file has not a recognizable Language to be corrected parsed');
        } else if (e.code == 'MODULE_NOT_FOUND') {
            console.error('[Error not founding module] ' + e);
        } else {
            console.error(e);
        }
    }
}

function validatorAndProcessingInstagramTest() {
    try {
        const fs =  require('fs');
        const path =  require('path');
        fs.readFile(path.join(__dirname,"../src/mock/zip_files/instagram.zip"),async function(err:ErrnoException, data: Buffer) {
            if (err) throw err
            const validation = await ValidatorFiles.validateZIP(data,
                {
                    permittedFileExtensions: [FileExtension.ZIP, FileExtension.JSON, FileExtension.CSV, FileExtension.HTML],
                    filterDataSource: {
                        dataSourceCode: DataSourceCode.INSTAGRAM,
                    }
                });
            console.log(await ProcessorInstagram.aggregatorFactory(validation as Uint8Array, 180));
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
        const fs =  require('fs');
        const path =  require('path');
        fs.readFile(path.join(__dirname,"../src/mock/zip_files/facebook.zip"),async function(err:ErrnoException, data: Buffer) {
            if (err) throw err;
            const validation1 = await ValidatorFiles.validateZIP(data);
            const validation2 = await ValidatorFacebook.getInstance().filterFilesIntoZip(validation1!);
            console.log(await ProcessorFacebook.aggregatorFactory(validation2!, 180));
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
        fs.readFile(path.join(__dirname,"../src/mock/zip_files/amazon.zip"),async function(err:ErrnoException, data: Buffer) {
            if (err) throw err;
            const validation1 = await ValidatorFiles.validateZIP(data);
            const validation2 = await ValidatorAmazon.getInstance().filterFilesIntoZip(validation1!);
            console.log(await ProcessorAmazon.aggregatorFactory(validation2!, 180))
        });
    } catch (e: any) {
        if (e.code == 'MODULE_NOT_FOUND') {
            console.log('[Error not founding module] ' + e);
        } else {
            console.log(e);
        }
    }
}

function validatorAndProcessingGoogleTest() {
    try {
        const fs =  require('fs');
        const path =  require('path');
        fs.readFile(path.join(__dirname,"../src/mock/zip_files/google_it.zip"),async function(err:ErrnoException, data: Buffer) {
            if (err) throw err;
            const validation = await ValidatorFiles.validateZIP(data,
                {
                    permittedFileExtensions: [FileExtension.ZIP, FileExtension.JSON, FileExtension.CSV, FileExtension.HTML],
                    filterDataSource: {
                        dataSourceCode: DataSourceCode.GOOGLE,
                        fileCodesIncluded: [
                            FileCodeGoogle.ACCOUNT_INFO,
                            FileCodeGoogle.SEMANTIC_LOCATION_HISTORY,
                            FileCodeGoogle.PLAY_STORE_REVIEWS,
                            FileCodeGoogle.MAPS_YOUR_PLACES_REVIEWS,
                        ]
                    }
                });
            //validation = await ValidatorGoogle.getInstance().filterFilesIntoZip(validation);
            console.log(await ProcessorGoogle.aggregatorFactory(validation!, 180))
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
        console.log(DescriptorService.getAllCodes());
        console.log(DescriptorService.getDescription(DataSourceCode.INSTAGRAM));
        console.log(DescriptorService.getName(DataSourceCode.INSTAGRAM));
        console.log(DescriptorService.getFormats(DataSourceCode.INSTAGRAM));
        console.log(DescriptorService.getAllProcedureTypes(DataSourceCode.AMAZON, LanguageCode.ENGLISH));
        console.log(DescriptorService.getProcedure(DataSourceCode.AMAZON, LanguageCode.ITALIAN, RetrievingProcedureType.DESKTOP));
        console.log(DescriptorService.getAllLanguages(DataSourceCode.INSTAGRAM));
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
        console.log(await InstagramService.parsePersonalInformation(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/instagram_json/account_information/personal_information.json`)))));
        console.log(await InstagramService.parseLocation(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/instagram_json/information_about_you/account_based_in.json`)))));
        console.log(await InstagramService.parseAdsClicked(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/instagram_json/ads_and_content/ads_clicked.json`)))));
        console.log(await InstagramService.parseAdsViewed(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/instagram_json/ads_and_content/ads_viewed.json`)))));
        console.log(await InstagramService.parseAdsInterests(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/instagram_json/information_about_you/ads_interests.json`)))));
        console.log(await InstagramService.parseMusicHeardInStories(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/instagram_json/ads_and_content/music_heard_in_stories.json`)))));
        console.log(await InstagramService.parseMusicRecentlyUsedInStories(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/instagram_json/ads_and_content/music_recently_used_in_stories.json`)))));
        console.log(await InstagramService.parsePostViewed(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/instagram_json/ads_and_content/posts_viewed.json`)))));
        console.log(await InstagramService.parseVideoWatched(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/instagram_json/ads_and_content/videos_watched.json`)))));
        console.log(await InstagramService.parseSuggestedAccountViewed(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/instagram_json/ads_and_content/suggested_accounts_viewed.json`)))));
        console.log(await InstagramService.parseAccountYouAreNotInterested(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/instagram_json/ads_and_content/accounts_you're_not_interested_in.json`)))));
        console.log(await InstagramService.parseCommentsPosted(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/instagram_json/comments/post_comments.json`)))));
        console.log(await InstagramService.parseSyncedContracts(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/instagram_json/contacts/synced_contacts.json`)))));
        console.log(await InstagramService.parseArchivedPost(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/instagram_json/content/archived_posts.json`)))));
        console.log(await InstagramService.parsePersonalPost(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/instagram_json/content/posts_1.json`)))));
        console.log(await InstagramService.parseFollowers(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/instagram_json/followers_and_following/followers.json`)))));
        console.log(await InstagramService.parseFollowingHashtags(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/instagram_json/followers_and_following/following_hashtags.json`)))));
        console.log(await InstagramService.parseLikedPosts(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/instagram_json/likes/liked_posts.json`)))));
        console.log(await InstagramService.parseLikedComments(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/instagram_json/likes/liked_comments.json`)))));
        console.log(await InstagramService.parseSearches(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/instagram_json/recent_search/account_searches.json`)))));
        console.log(await InstagramService.parseReelSentiments(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/instagram_json/your_topics/your_reels_sentiments.json`)))));
        console.log(await InstagramService.parseReelTopics(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/instagram_json/your_topics/your_reels_topics.json`)))));
        console.log(await InstagramService.parseTopics(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/instagram_json/your_topics/your_topics.json`)))));
        console.log(await InstagramService.parseEmojiSliders(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/instagram_json/story_sticker_interactions/emoji_sliders.json`)))));
        console.log(await InstagramService.parseEligibility(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/instagram_json/monetization/eligibility.json`)))));
        console.log(await InstagramService.parsePolls(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/instagram_json/story_sticker_interactions/polls.json`)))));
        console.log(await InstagramService.parseQuizzes(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/instagram_json/story_sticker_interactions/quizzes.json`)))));
        console.log(await InstagramService.parsePersonalStories(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/instagram_json/content/stories.json`)))));
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
        console.log(await FacebookService.parsePersonalInformation(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/facebook_json/profile_information/profile_information.json`)))));
        console.log(await FacebookService.parseAdsInteractedWith(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/facebook_json/ads_information/advertisers_you've_interacted_with.json`)))));
        console.log(await FacebookService.parseAdsUsingYourInfo(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/facebook_json/ads_information/advertisers_using_your_activity_or_information.json`)))));
        console.log(await FacebookService.parseSearchHistory(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/facebook_json/search/your_search_history.json`)))));
        console.log(await FacebookService.parseComments(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/facebook_json/comments_and_reactions/comments.json`)))));
        console.log(await FacebookService.parseReactions(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/facebook_json/comments_and_reactions/posts_and_comments.json`)))));
        console.log(await FacebookService.parsePagesLiked(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/facebook_json/pages/pages_you've_liked.json`)))));
        console.log(await FacebookService.parsePagesFollowed(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/facebook_json/pages/pages_you_follow.json`)))));
        console.log(await FacebookService.parseAppsConnected(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/facebook_json/apps_and_websites_off_of_facebook/apps_and_websites.json`)))));
        console.log(await FacebookService.parseFriendRequestsSent(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/facebook_json/friends_and_followers/friend_requests_sent.json`)))));
        console.log(await FacebookService.parseRejectedFriendshipRequests(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/facebook_json/friends_and_followers/rejected_friend_requests.json`)))));
        console.log(await FacebookService.parseRemovedFriends(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/facebook_json/friends_and_followers/removed_friends.json`)))));
        console.log(await FacebookService.parseWhoYouFollow(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/facebook_json/friends_and_followers/who_you_follow.json`)))));
        console.log(await FacebookService.parseLanguages(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/facebook_json/preferences/language_and_locale.json`)))));
        console.log(await FacebookService.parsePagesRecommended(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/facebook_json/pages/pages_you've_recommended.json`)))));
        console.log(await FacebookService.parseRecentlyViewed(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/facebook_json/your_interactions_on_facebook/recently_viewed.json`)))));
        console.log(await FacebookService.parseYourPosts(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/facebook_json/posts/your_posts_1.json`)))));
        console.log(await FacebookService.parseFriends(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/facebook_json/friends_and_followers/friends.json`)))));
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
        const fs = require('fs');
        console.log(await AmazonService.parsePrimeVideoWatchlist(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/amazon/Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.Watchlist.csv`))));
        console.log(await AmazonService.parsePrimeVideoWatchlistHistory(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/amazon/Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.WatchlistHistory.csv`))));
        console.log(await AmazonService.parsePrimeVideoViewingHistory(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/amazon/Digital.PrimeVideo.Viewinghistory/Digital.PrimeVideo.Viewinghistory.csv`))));
        console.log(await AmazonService.parseSearchDataCustomerEngagement(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/amazon/Search-Data/Search-Data.Customer-Engagement.csv`))));
        console.log(await AmazonService.parseAudibleLibrary(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/amazon/Audible.Library/Audible.Library.csv`))));
        console.log(await AmazonService.parseTwitchPrimeSubscription(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/amazon/AmazonGames/AmazonGames.TwitchPrime.SubscriptionCreditHistory.csv`))));
        console.log(await AmazonService.parseAmazonWishlists(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/amazon/Amazon.Lists.Wishlist.2.1/Amazon.Lists.Wishlist.json`))));
        console.log(await AmazonService.parseRetailOrderHistory(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/amazon/Retail.OrderHistory.2/Retail.OrderHistory.2.csv`))));

        let source = path.join(__dirname, `../src/mock/datasources_IT/amazon/`);
        const directories = fs.readdirSync(source);
        let directoriesADV = directories.filter((directory: string) => /Advertising/.test(directory));

        let resultAudience: AdvertiserAM[] = [];
        let resultClicked: AdvertiserAM[] = [];
        let array;
        for (let i = 1; i < directoriesADV.length + 1; i++) {
            source = path.join(__dirname, `../src/mock/datasources_IT/amazon/Advertising.${i}/Advertising.AdvertiserAudiences.csv`);
            array = await AmazonService.parseAdvertiserAudiences(await Parser.CSVToBuffer(source));
            array && (resultAudience = resultAudience.concat(array.list));

            source = path.join(__dirname, `../src/mock/datasources_IT/amazon/Advertising.${i}/Advertising.AdvertiserClicks.csv`);
            array = await AmazonService.parseAdvertiserClicked(await Parser.CSVToBuffer(source));
            array && (resultClicked = resultClicked.concat(array.list));
        }
        console.log(resultAudience.sort());
        console.log(resultClicked.sort());


        console.log(await AmazonService.parseAudibleListening(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/amazon/Audible.Listening/Audible.Listening.csv`))));
        console.log(await AmazonService.parseAudibleMembershipBillings(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/amazon/Audible.MembershipBillings/Audible.MembershipBillings.csv`))));
        console.log(await AmazonService.parseDigitalPrimeVideoViewCounts(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/amazon/Digital.PrimeVideo.ViewCounts.2/Digital.PrimeVideo.ViewCounts.2.csv`))));
        console.log(await AmazonService.parseDigitalSubscriptions(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/amazon/Digital.Subscriptions/Subscriptions.csv`))));
        console.log(await AmazonService.parseLightWeightInteractions(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/amazon/Retail.LightWeightInteractions/datasets/LightWeightInteractions/LightWeightInteractions.csv`))));

        console.log(await AmazonService.parseRetailSellerFeedback(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/amazon/Retail.Seller-Feedback.2/Retail.Seller-Feedback.csv`))));
        console.log(await AmazonService.parseRetailRegionAuthorities(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/amazon/Retail.RegionAuthority.2/Retail.RegionAuthority.2.csv`))));
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
        const path = require('path');
        const {Parser} = require('./utils/parser');
        console.log(await LinkedInService.parseAdsClicked(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/linkedin/Ads Clicked.csv`))));
        console.log(await LinkedInService.parseConnections(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/linkedin/Connections.csv`))));
        console.log(await LinkedInService.parseCompaniesFollowed(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/linkedin/Company Follows.csv`))));
        console.log(await LinkedInService.parseContacts(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/linkedin/Contacts.csv`))));
        console.log(await LinkedInService.parseEducationHistory(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/linkedin/Education.csv`))));
        console.log(await LinkedInService.parseEmails(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/linkedin/Email Addresses.csv`))));
        console.log(await LinkedInService.parseEndorsementsReceived(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/linkedin/Endorsement_Received_Info.csv`))));
        console.log(await LinkedInService.parseInferencesAboutYou(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/linkedin/Inferences_about_you.csv`))));
        console.log(await LinkedInService.parseInvitations(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/linkedin/Invitations.csv`))));
        console.log(await LinkedInService.parseJobApplicantSavedInfo(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/linkedin/Job Applicant Saved Answers.csv`))));
        console.log(await LinkedInService.parseJobApplicantSavedScreeningQuestionInfo(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/linkedin/Job Applicant Saved Screening Question Responses.csv`))));
        console.log(await LinkedInService.parseLearnings(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/linkedin/Learning.csv`))));
        console.log(await LinkedInService.parseLogins(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/linkedin/Logins.csv`))));
        console.log(await LinkedInService.parseMembersFollowed(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/linkedin/Member_Follows.csv`))));
        console.log(await LinkedInService.parseMessages(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/linkedin/messages.csv`))));
        console.log(await LinkedInService.parsePhoneNumbers(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/linkedin/PhoneNumbers.csv`))));
        console.log(await LinkedInService.parseWorkingPositions(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/linkedin/Positions.csv`))));
        console.log(await LinkedInService.parseProfile(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/linkedin/Profile.csv`))));
        console.log(await LinkedInService.parseReactions(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/linkedin/Reactions.csv`))));
        console.log(await LinkedInService.parseProfile(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/linkedin/Profile.csv`))));
        console.log(await LinkedInService.parseRegistration(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/linkedin/Registration.csv`))));
        console.log(await LinkedInService.parseRichMediaList(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/linkedin/Rich Media.csv`))));
        console.log(await LinkedInService.parseSavedJobAlerts(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/linkedin/SavedJobAlerts.csv`))));
        console.log(await LinkedInService.parseSearchQueries(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/linkedin/SearchQueries.csv`))));
        console.log(await LinkedInService.parseSecurityChallenges(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/linkedin/Security Challenges.csv`))));
        console.log(await LinkedInService.parseSkills(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/linkedin/Skills.csv`))));
        console.log(await LinkedInService.parseVotes(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/linkedin/Votes.csv`))));
        console.log(await LinkedInService.parseAdsTargeting(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/linkedin/Ad_Targeting.csv`))));
        console.log(await LinkedInService.parseJobApplications(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/linkedin/jobs/Job Applications.csv`))));
        console.log(await LinkedInService.parseSavedJobs(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/linkedin/jobs/Saved Jobs.csv`))));
        console.log(await LinkedInService.parseJobSeekerPreferences(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/linkedin/jobs/Job Seeker Preferences.csv`))));
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
        const path = require('path');
        const {Parser} = require('./utils/parser');
        console.log(await NetflixService.parsePersonalInformation(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/netflix/ACCOUNT/AccountDetails.csv`))));
        console.log(await NetflixService.parsePreferences(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/netflix/CONTENT_INTERACTION/IndicatedPreferences.csv`))));
        console.log(await NetflixService.parseMyList(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/netflix/CONTENT_INTERACTION/MyList.csv`))));
        console.log(await NetflixService.parseSearchHistory(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/netflix/CONTENT_INTERACTION/SearchHistory.csv`))));
        console.log(await NetflixService.parseViewingActivity(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/netflix/CONTENT_INTERACTION/ViewingActivity.csv`))));
        console.log(await NetflixService.parsePlaybackEvents(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/netflix/CONTENT_INTERACTION/PlaybackRelatedEvents.csv`))));
        console.log(await NetflixService.parseProfiles(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/netflix/PROFILES/Profiles.csv`))));
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
        const {Parser} = require('./utils/parser');
        const path = require('path');
        const fs = require('fs');
        /*
        console.log(await GoogleService.parseProfile(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/google/Takeout/Profile/Profilo.json`)))));
        console.log(await GoogleService.parseBrowseHistory(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/google/Takeout/Chrome/BrowserHistory.json`)))));
        console.log(await GoogleService.parseSearchEngines(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/google/Takeout/Chrome/SearchEngines.json`)))));
        console.log(await GoogleService.parseImageData(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/google/Takeout/GooglePhoto/PhotosFrom2019/photo.mp4.json`)))));
        console.log(await GoogleService.parseTransactions(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/datasources_IT/google/Takeout/GooglePay/GoogleTransactions/transactions_123456.csv`))));
        console.log(await GoogleService.parseDocLibrary(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/google/Takeout/GooglePlayStore/Library.json`)))));
        console.log(await GoogleService.parsePurchaseHistory(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/google/Takeout/GooglePlayStore/PurchaseHistory.json`)))));
        console.log(await GoogleService.parseOrderHistory(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/google/Takeout/GooglePlayStore/OrderHistory.json`)))));
        console.log(await GoogleService.parseSemanticLocations(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/google/Takeout/LocationHistory/SemanticLocationHistory/2017/2017_APRIL.json`)))));
        console.log(await GoogleService.parsePlayStoreReviews(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/google/Takeout/GooglePlayStore/Reviews.json`)))));
        console.log(await GoogleService.parseMapsReviews(Buffer.from(JSON.stringify(require(`../src/mock/datasources_IT/google/Takeout/Maps (I tuoi luoghi)/Recensioni.json`)))));
        */
        console.log(await GoogleService.parseGoogleAccount(Buffer.from(fs.readFileSync(path.resolve(__dirname, `../src/mock/datasources_IT/google/Takeout/Google Account/davide.SubscriberInfo.html`)))));

    } catch (e: any) {
        if (e.code == 'MODULE_NOT_FOUND') {
            console.log('[Error not founding module] ' + e);
        } else {
            console.log(e);
        }
    }
}

test();
