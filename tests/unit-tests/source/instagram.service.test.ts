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
    test('parsePersonalStories', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/instagram/content/stories.json`;
        const result = await ServiceInstagram.parsePersonalStories(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'media/stories/202011/F44AF911B8F245546D4536FEC8CAD888_transcode_output_dashinit_17863280159218849.mp4';
        expect(JSON.stringify(result!.list[4].uri)).toBe(JSON.stringify(expected));
    });
    test('parseFollowers', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/instagram/followers_and_following/followers.json`;
        const result = await ServiceInstagram.parseFollowers(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = '2021-12-01T06:06:20.000Z';
        expect(JSON.stringify(result!.list[1].date)).toBe(JSON.stringify(expected));
    });
    test('parseFollowingHashtags', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/instagram/followers_and_following/following_hashtags.json`;
        const result = await ServiceInstagram.parseFollowingHashtags(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = '2018-06-19T07:13:33.000Z';
        expect(JSON.stringify(result!.list[1].date)).toBe(JSON.stringify(expected));
    });
    test('parseAdsInterests', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/instagram/information_about_you/ads_interests.json`;
        const result = await ServiceInstagram.parseAdsInterests(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'Beauty salons';
        expect(JSON.stringify(result!.list[3].title)).toBe(JSON.stringify(expected));
    });
    test('parseLocation', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/instagram/information_about_you/account_based_in.json`;
        const result = await ServiceInstagram.parseLocation(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'Roma';
        expect(JSON.stringify(result!.basedIn)).toBe(JSON.stringify(expected));
    });
    test('parseEligibility', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/instagram/monetization/eligibility.json`;
        const result = await ServiceInstagram.parseEligibility(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'Eligible';
        expect(JSON.stringify(result!.decision)).toBe(JSON.stringify(expected));
    });
    test('parseSearches', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/instagram/recent_searches/account_searches.json`;
        const result = await ServiceInstagram.parseSearches(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = '2021-12-05T21:17:38.000Z';
        expect(JSON.stringify(result!.list[2].date)).toBe(JSON.stringify(expected));
    });
    test('parseEmojiSliders', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/instagram/story_sticker_interactions/emoji_sliders.json`;
        const result = await ServiceInstagram.parseEmojiSliders(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'normasteaching';
        expect(JSON.stringify(result!.list[1].title)).toBe(JSON.stringify(expected));
    });
    test('parsePolls', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/instagram/story_sticker_interactions/polls.json`;
        const result = await ServiceInstagram.parsePolls(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'netflixit';
        expect(JSON.stringify(result!.list[2].title)).toBe(JSON.stringify(expected));
    });
    test('parseQuizzes', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/instagram/story_sticker_interactions/quizzes.json`;
        const result = await ServiceInstagram.parseQuizzes(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = '2021-05-23T20:22:48.000Z';
        expect(JSON.stringify(result!.list[7].date)).toBe(JSON.stringify(expected));
    });
    test('parseReelSentiments', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/instagram/your_topics/your_reels_sentiments.json`;
        const result = await ServiceInstagram.parseReelSentiments(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'Fascinating';
        expect(JSON.stringify(result!.list[3].value)).toBe(JSON.stringify(expected));
    });
    test('parseReelTopics', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/instagram/your_topics/your_reels_topics.json`;
        const result = await ServiceInstagram.parseReelTopics(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'Outdoor Nature';
        expect(JSON.stringify(result!.list[3].value)).toBe(JSON.stringify(expected));
    });
    test('parseYourTopics', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/instagram/your_topics/your_topics.json`;
        const result = await ServiceInstagram.parseYourTopics(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'Video Game Cosplay';
        expect(JSON.stringify(result!.list[2].value)).toBe(JSON.stringify(expected));
    });
    test('parseMusicHeardInStories', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/instagram/ads_and_content/music_heard_in_stories.json`;
        const result = await ServiceInstagram.parseMusicHeardInStories(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'Lana Del Rey';
        expect(JSON.stringify(result!.list[2].artist)).toBe(JSON.stringify(expected));
    });
    test('parseMusicRecentlyUsedInStories', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/instagram/ads_and_content/music_recently_used_in_stories.json`;
        const result = await ServiceInstagram.parseMusicRecentlyUsedInStories(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'Giorgio Gaber';
        expect(JSON.stringify(result!.list[1].artist)).toBe(JSON.stringify(expected));
    });
    test('parseCommentsPosted', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/instagram/comments/post_comments.json`;
        const result = await ServiceInstagram.parseCommentsPosted(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'dYDKADKAD';
        expect(JSON.stringify(result!.list[1].toUser)).toBe(JSON.stringify(expected));
    });
    test('parseArchivedPost', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/instagram/content/archived_posts.json`;
        const result = await ServiceInstagram.parseArchivedPost(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = '2021-06-13T17:37:49.000Z';
        expect(JSON.stringify(result!.list[0].date)).toBe(JSON.stringify(expected));
    });
    test('parseLikedPosts', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/instagram/likes/liked_posts.json`;
        const result = await ServiceInstagram.parseLikedPosts(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'macklemore33';
        expect(JSON.stringify(result!.list[1].title)).toBe(JSON.stringify(expected));
    });
    test('parseLikedComments', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/instagram/likes/liked_comments.json`;
        const result = await ServiceInstagram.parseLikedComments(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = '2021-11-02T18:22:12.000Z';
        expect(JSON.stringify(result!.list[0].date)).toBe(JSON.stringify(expected));
    });
});
