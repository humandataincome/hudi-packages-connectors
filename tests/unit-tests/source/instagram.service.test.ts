import {ServiceInstagram, LanguageCode} from "../../../src";

describe('Instagram Service test', () => {
    ServiceInstagram.languagePrefix = LanguageCode.ITALIAN;
    test('parsePersonalInformation', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/instagram/account_information/personal_information.json`;
        const result = await ServiceInstagram.parsePersonalInformation(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected1 = '1993-07-21T00:00:00.000Z';
        const expected2 = 'fake.email@gmail.com';
        expect(JSON.stringify(result!.birthdate)).toBe(JSON.stringify(expected1));
        expect(JSON.stringify(result!.email)).toBe(JSON.stringify(expected2));
    });
    test('parsePersonalInformation', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/instagram/ads_and_content/ads_clicked.json`;
        const result = await ServiceInstagram.parseAdsClicked(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'Piratinviaggio.it';
        expect(JSON.stringify(result!.list[1].title)).toBe(JSON.stringify(expected));
    });
    test('parseAccountYouAreNotInterested', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/instagram/ads_and_content/accounts_you're_not_interested_in.json`;
        const result = await ServiceInstagram.parseAccountYouAreNotInterested(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'hc38_jersey';
        expect(JSON.stringify(result!.list[1].name)).toBe(JSON.stringify(expected));
    });
    test('parseAdsUsingYourInformation', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/instagram/ads_and_businesses/advertisers_using_your_activity_or_information.json`;
        const result = await ServiceInstagram.parseAdsUsingYourInformation(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'Meetsocial HK Digital Marketing Co.，ltd-1';
        expect(JSON.stringify(result!.list[3].advertiserName)).toBe(JSON.stringify(expected));
    });
    test('parseAdsViewed', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/instagram/ads_and_content/ads_viewed.json`;
        const result = await ServiceInstagram.parseAdsViewed(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = '2021-11-29T20:30:45.000Z';
        expect(JSON.stringify(result!.list[2].date)).toBe(JSON.stringify(expected));
    });
    test('parsePostViewed', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/instagram/ads_and_content/posts_viewed.json`;
        const result = await ServiceInstagram.parsePostViewed(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = '_dianacodes';
        expect(JSON.stringify(result!.list[2].title)).toBe(JSON.stringify(expected));
    });
    test('parseSuggestedAccountViewed', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/instagram/ads_and_content/suggested_accounts_viewed.json`;
        const result = await ServiceInstagram.parseSuggestedAccountViewed(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'celikanil';
        expect(JSON.stringify(result!.list[3].name)).toBe(JSON.stringify(expected));
    });
    test('parseVideoWatched', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/instagram/ads_and_content/videos_watched.json`;
        const result = await ServiceInstagram.parseVideoWatched(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'cats.__.clip';
        expect(JSON.stringify(result!.list[1].title)).toBe(JSON.stringify(expected));
    });
    test('parseAutofillInformation', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/instagram/autofill_information/autofill_information.json`;
        const result = await ServiceInstagram.parseAutofillInformation(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'godzilla@live.it';
        expect(JSON.stringify(result!.email)).toBe(JSON.stringify(expected));
    });
    test('parseSyncedContracts', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/instagram/contacts/synced_contacts.json`;
        const result = await ServiceInstagram.parseSyncedContracts(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = '3451112223';
        expect(JSON.stringify(result!.list[2].contactInfo)).toBe(JSON.stringify(expected));
    });
    test('parsePersonalPost', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/instagram/content/posts_1.json`;
        const result = await ServiceInstagram.parsePersonalPost(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'media/posts/202111/25888442_n_17858940455623317.jpg';
        expect(JSON.stringify(result!.list[1].uri)).toBe(JSON.stringify(expected));
    });
});



async function testService() {
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
    console.log(await ServiceInstagram.parseMusicHeardInStories(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/ads_and_content/music_heard_in_stories.json`)))));
    console.log(await ServiceInstagram.parseMusicRecentlyUsedInStories(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/ads_and_content/music_recently_used_in_stories.json`)))));
    console.log(await ServiceInstagram.parseCommentsPosted(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/comments/post_comments.json`)))));
    console.log(await ServiceInstagram.parseArchivedPost(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/content/archived_posts.json`)))));
    console.log(await ServiceInstagram.parseLikedPosts(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/likes/liked_posts.json`)))));
    console.log(await ServiceInstagram.parseLikedComments(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/instagram/likes/liked_comments.json`)))));

}
