
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
import fs from "fs";
import {GoogleService} from "../src/services/google.service";



async function test(){
    //await netflixServiceTest();
    //await amazonServiceTest();
    await facebookServiceTest();
    //await instagramServiceTest();
    //await googleServiceTest();
}

async function amazonServiceTest() {
    try {
        const amazonService = new AmazonService();
        //console.log(await amazonService.parsePrimeVideoWatchlist(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/amazon/Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.Watchlist.csv`))));
        //console.log(await amazonService.parsePrimeVideoWatchlistHistory(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/amazon/Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.WatchlistHistory.csv`))));
        //console.log(await amazonService.parsePrimeVideoViewingHistory(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/amazon/Digital.PrimeVideo.Viewinghistory/Digital.PrimeVideo.Viewinghistory.csv`))));
        //console.log(await amazonService.parseSearchDataCustomerEngagement(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/amazon/Search-Data/Search-Data.Customer-Engagement.csv`))));
        //console.log(await amazonService.parseAudibleLibrary(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/amazon/Audible.Library.csv`))));
        /**
         * advertising files are generated with a limit of 100 entries for each files,
         * when the limit is reached another directory with files is created.
         * Mock files have 3 of these directories.
         */
        const fs = require('fs');
        let source = path.join(__dirname, `../src/mock/amazon/`);
        const directories = fs.readdirSync(source);
        let directoriesADV = directories.filter((directory: string) => /Advertising/.test(directory));

        let resultAudience: string[] = [];
        let resultClicked: string[] = [];
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

async function netflixServiceTest() {
    const netflixService = new NetflixService();
    try {
        //console.log(await netflixService.parsePersonalInformation(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/netflix/ACCOUNT/AccountDetails.csv`))));
        //console.log(await netflixService.parsePreferences(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/netflix/CONTENT_INTERACTION/IndicatedPreferences.csv`))));
        //console.log(await netflixService.parseMyList(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/netflix/CONTENT_INTERACTION/MyList.csv`))));
        //console.log(await netflixService.parseSearchHistory(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/netflix/CONTENT_INTERACTION/SearchHistory.csv`))));
        //console.log(await netflixService.parseViewingActivity(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/netflix/CONTENT_INTERACTION/ViewingActivity.csv`))));
        //console.log(await netflixService.parsePlaybackEvents(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/netflix/CONTENT_INTERACTION/PlaybackRelatedEvents.csv`))));
        console.log(await netflixService.parseProfiles(await Parser.CSVToBuffer(path.join(__dirname, `../src/mock/netflix/PROFILES/Profiles.csv`))));
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
    let configIG = new ConfigInstagram(LanguageMode.ITALIAN);
    const instagramService = new InstagramService(configIG);
    try {
        //console.log(await instagramService.parsePersonalInformation(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}instagram_json/account_information/personal_information.json`)))));
        //console.log(await instagramService.parseLocation(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}instagram_json/account_information/personal_information.json`)))));
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
        //console.log(await instagramService.parseLikedPosts(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}instagram_json/likes/liked_comments.json`)))));
        //console.log(await instagramService.parseLikedComments(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}instagram_json/likes/liked_posts.json`)))));
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
    const googleService = new GoogleService();
    try {
        //console.log(await googleService.parseProfile(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}google/Takeout/Profilo/Profilo.json`)))));
        console.log(await googleService.parseBrowseHistory(Buffer.from(JSON.stringify(require(`${CONFIG.get('PATH_PREFIX')}google/Takeout/Chrome/BrowserHistory.json`)))));

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