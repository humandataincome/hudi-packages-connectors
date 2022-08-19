import {ServiceInstagram, LanguageCode} from "../../../src";


async function testInstagram(){
    await testService();
}

async function testService() {
    try {
        ServiceInstagram.languagePrefix = LanguageCode.ITALIAN;
        /*
        console.log(await ServiceInstagram.parsePersonalInformation(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/account_information/personal_information.json`)))));
        console.log(await ServiceInstagram.parseAdsClicked(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/ads_and_content/ads_clicked.json`)))));
        console.log(await ServiceInstagram.parseAccountYouAreNotInterested(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/ads_and_content/accounts_you're_not_interested_in.json`)))));
        console.log(await ServiceInstagram.parseAdsUsingYourInformation(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/ads_and_businesses/advertisers_using_your_activity_or_information.json`)))));
        console.log(await ServiceInstagram.parseAdsViewed(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/ads_and_content/ads_viewed.json`)))));
        console.log(await ServiceInstagram.parsePostViewed(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/ads_and_content/posts_viewed.json`)))));
        console.log(await ServiceInstagram.parseSuggestedAccountViewed(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/ads_and_content/suggested_accounts_viewed.json`)))));
        console.log(await ServiceInstagram.parseVideoWatched(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/ads_and_content/videos_watched.json`)))));
        console.log(await ServiceInstagram.parseAutofillInformation(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/autofill_information/autofill_information.json`)))));
        console.log(await ServiceInstagram.parseSyncedContracts(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/contacts/synced_contacts.json`)))));
        console.log(await ServiceInstagram.parsePersonalPost(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/content/posts_1.json`)))));
        console.log(await ServiceInstagram.parsePersonalStories(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/content/stories.json`)))));
        console.log(await ServiceInstagram.parseFollowers(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/followers_and_following/followers.json`)))));
        console.log(await ServiceInstagram.parseFollowingHashtags(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/followers_and_following/following_hashtags.json`)))));
        console.log(await ServiceInstagram.parseAdsInterests(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/information_about_you/ads_interests.json`)))));
        console.log(await ServiceInstagram.parseLocation(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/information_about_you/account_based_in.json`)))));
        console.log(await ServiceInstagram.parseEligibility(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/monetization/eligibility.json`)))));
        console.log(await ServiceInstagram.parseSearches(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/recent_searches/account_searches.json`)))));
        console.log(await ServiceInstagram.parseEmojiSliders(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/story_sticker_interactions/emoji_sliders.json`)))));
        console.log(await ServiceInstagram.parsePolls(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/story_sticker_interactions/polls.json`)))));
        console.log(await ServiceInstagram.parseQuizzes(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/story_sticker_interactions/quizzes.json`)))));
        console.log(await ServiceInstagram.parseReelSentiments(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/your_topics/your_reels_sentiments.json`)))));
        console.log(await ServiceInstagram.parseReelTopics(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/your_topics/your_reels_topics.json`)))));
        console.log(await ServiceInstagram.parseYourTopics(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/your_topics/your_topics.json`)))));

        */

        /*
        console.log(await ServiceInstagram.parseMusicHeardInStories(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/ads_and_content/music_heard_in_stories.json`)))));
        console.log(await ServiceInstagram.parseMusicRecentlyUsedInStories(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/ads_and_content/music_recently_used_in_stories.json`)))));
        console.log(await ServiceInstagram.parseCommentsPosted(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/comments/post_comments.json`)))));
        console.log(await ServiceInstagram.parseArchivedPost(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/content/archived_posts.json`)))));
        console.log(await ServiceInstagram.parseLikedPosts(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/likes/liked_posts.json`)))));
        console.log(await ServiceInstagram.parseLikedComments(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/likes/liked_comments.json`)))));
        */
    } catch (e: any) {
        if (e.code == 'MODULE_NOT_FOUND') {
            console.log('[Error not founding module] ' + e);
        } else {
            console.log(e);
        }
    }
}

testInstagram();
