import {InstagramService, LanguageCode} from "../../src";


async function testInstagram(){
    await testService();
}

async function testService() {
    try {
        InstagramService.languagePrefix = LanguageCode.ITALIAN;
        /*
        console.log(await InstagramService.parsePersonalInformation(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/instagram_json/account_information/personal_information.json`)))));
        console.log(await InstagramService.parseLocation(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/instagram_json/information_about_you/account_based_in.json`)))));
        console.log(await InstagramService.parseAdsClicked(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/instagram_json/ads_and_content/ads_clicked.json`)))));
        console.log(await InstagramService.parseAdsViewed(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/instagram_json/ads_and_content/ads_viewed.json`)))));
        console.log(await InstagramService.parseAdsInterests(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/instagram_json/information_about_you/ads_interests.json`)))));
        console.log(await InstagramService.parseMusicHeardInStories(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/instagram_json/ads_and_content/music_heard_in_stories.json`)))));
        console.log(await InstagramService.parseMusicRecentlyUsedInStories(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/instagram_json/ads_and_content/music_recently_used_in_stories.json`)))));
        console.log(await InstagramService.parsePostViewed(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/instagram_json/ads_and_content/posts_viewed.json`)))));
        console.log(await InstagramService.parseVideoWatched(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/instagram_json/ads_and_content/videos_watched.json`)))));
        console.log(await InstagramService.parseSuggestedAccountViewed(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/instagram_json/ads_and_content/suggested_accounts_viewed.json`)))));
        console.log(await InstagramService.parseAccountYouAreNotInterested(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/instagram_json/ads_and_content/accounts_you're_not_interested_in.json`)))));
        console.log(await InstagramService.parseCommentsPosted(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/instagram_json/comments/post_comments.json`)))));
        console.log(await InstagramService.parseSyncedContracts(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/instagram_json/contacts/synced_contacts.json`)))));
        console.log(await InstagramService.parseArchivedPost(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/instagram_json/content/archived_posts.json`)))));
        console.log(await InstagramService.parsePersonalPost(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/instagram_json/content/posts_1.json`)))));
        console.log(await InstagramService.parseFollowers(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/instagram_json/followers_and_following/followers.json`)))));
        console.log(await InstagramService.parseFollowingHashtags(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/instagram_json/followers_and_following/following_hashtags.json`)))));
        console.log(await InstagramService.parseLikedPosts(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/instagram_json/likes/liked_posts.json`)))));
        console.log(await InstagramService.parseLikedComments(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/instagram_json/likes/liked_comments.json`)))));
        console.log(await InstagramService.parseSearches(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/instagram_json/recent_searches/account_searches.json`)))));
        console.log(await InstagramService.parseReelSentiments(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/instagram_json/your_topics/your_reels_sentiments.json`)))));
        console.log(await InstagramService.parseReelTopics(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/instagram_json/your_topics/your_reels_topics.json`)))));
        console.log(await InstagramService.parseTopics(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/instagram_json/your_topics/your_topics.json`)))));
        console.log(await InstagramService.parseEmojiSliders(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/instagram_json/story_sticker_interactions/emoji_sliders.json`)))));
        console.log(await InstagramService.parseEligibility(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/instagram_json/monetization/eligibility.json`)))));
        console.log(await InstagramService.parsePolls(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/instagram_json/story_sticker_interactions/polls.json`)))));
        console.log(await InstagramService.parseQuizzes(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/instagram_json/story_sticker_interactions/quizzes.json`)))));
        console.log(await InstagramService.parsePersonalStories(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/instagram_json/content/stories.json`)))));
        console.log(await InstagramService.parseAdsUsingYourInformation(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/instagram_json/ads_business/advertisers_using_your_activity_or_information.json`)))));
        */
        console.log(await InstagramService.parseAutofillInformation(Buffer.from(JSON.stringify(require(`src/mock/datasource files/instagram_json/autofill_information/autofill_information.json`)))));
    } catch (e: any) {
        if (e.code == 'MODULE_NOT_FOUND') {
            console.log('[Error not founding module] ' + e);
        } else {
            console.log(e);
        }
    }
}

testInstagram();
