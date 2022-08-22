import {ServiceFacebook} from "../../../src";

describe('Facebook Service test', () => {
    test('parsePersonalInformation', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/facebook/profile_information/profile_information.json`;
        const result = await ServiceFacebook.parsePersonalInformation(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected1 = '2021-12-13T10:02:29.000Z';
        const expected2 = 'Dottore';
        expect(JSON.stringify(result!.relationship!.dateAdded)).toBe(JSON.stringify(expected1));
        expect(JSON.stringify(result!.educationExperiences![0].degree)).toBe(JSON.stringify(expected2));
    });
    test('parseAdsInteractedWith', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/facebook/ads_information/advertisers_you've_interacted_with.json`;
        const result = await ServiceFacebook.parseAdsInteractedWith(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'Find out what Toptal has to offer top developers.';
        expect(JSON.stringify(result!.list[1].title)).toBe(JSON.stringify(expected));
    });
    test('parseAdsUsingYourInfo', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/facebook/ads_information/advertisers_using_your_activity_or_information.json`;
        const result = await ServiceFacebook.parseAdsUsingYourInfo(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'Tripadvisor';
        expect(JSON.stringify(result!.list[4].advertiserName)).toBe(JSON.stringify(expected));
    });
    test('parseSearchHistory', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/facebook/search/your_search_history.json`;
        const result = await ServiceFacebook.parseSearchHistory(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'godus';
        expect(JSON.stringify(result!.list[2].text)).toBe(JSON.stringify(expected));
    });
    test('parseComments', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/facebook/comments_and_reactions/comments.json`;
        const result = await ServiceFacebook.parseComments(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = '2017-11-28T08:22:07.000Z';
        expect(JSON.stringify(result!.list[3].date)).toBe(JSON.stringify(expected));
    });
    test('parseReactions', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/facebook/comments_and_reactions/posts_and_comments.json`;
        const result = await ServiceFacebook.parseReactions(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'Davide';
        expect(JSON.stringify(result!.list[1].actor)).toBe(JSON.stringify(expected));
    });
    test('parsePagesLiked', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/facebook/pages/pages_you've_liked.json`;
        const result = await ServiceFacebook.parsePagesLiked(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'GIPI (Gian Alfonso Pacinotti)';
        expect(JSON.stringify(result!.list[5].name)).toBe(JSON.stringify(expected));
    });
    test('parsePagesFollowed', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/facebook/pages/pages_you_follow.json`;
        const result = await ServiceFacebook.parsePagesFollowed(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'Green Day';
        expect(JSON.stringify(result!.list[2].name)).toBe(JSON.stringify(expected));
    });
    test('parseAppsConnected', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/facebook/apps_and_websites_off_of_facebook/apps_and_websites.json`;
        const result = await ServiceFacebook.parseAppsConnected(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = '2021-11-15T19:50:02.000Z';
        expect(JSON.stringify(result!.list[1].addedTimestamp)).toBe(JSON.stringify(expected));
    });
    test('parseFriendRequestsSent', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/facebook/friends_and_followers/friend_requests_sent.json`;
        const result = await ServiceFacebook.parseFriendRequestsSent(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'Christian';
        expect(JSON.stringify(result!.list[2].name)).toBe(JSON.stringify(expected));
    });
    test('parseRejectedFriendshipRequests', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/facebook/friends_and_followers/rejected_friend_requests.json`;
        const result = await ServiceFacebook.parseRejectedFriendshipRequests(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'Giovanna';
        expect(JSON.stringify(result!.list[2].name)).toBe(JSON.stringify(expected));
    });
    test('parseRemovedFriends', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/facebook/friends_and_followers/removed_friends.json`;
        const result = await ServiceFacebook.parseRemovedFriends(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = '2019-05-21T22:29:31.000Z';
        expect(JSON.stringify(result!.list[1].date)).toBe(JSON.stringify(expected));
    });
    test('parseWhoYouFollow', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/facebook/friends_and_followers/who_you_follow.json`;
        const result = await ServiceFacebook.parseWhoYouFollow(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'Straic';
        expect(JSON.stringify(result!.list[3].name)).toBe(JSON.stringify(expected));
    });
    test('parseLanguages', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/facebook/preferences/language_and_locale.json`;
        const result = await ServiceFacebook.parseLanguages(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = ["it", "en"];
        expect(JSON.stringify(result!.languagesKnown)).toBe(JSON.stringify(expected));
    });
    test('parsePagesRecommended', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/facebook/pages/pages_you've_recommended.json`;
        const result = await ServiceFacebook.parsePagesRecommended(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'Gio';
        expect(JSON.stringify(result!.list[0].name)).toBe(JSON.stringify(expected));
    });
    test('parseRecentlyViewed', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/facebook/your_interactions_on_facebook/recently_viewed.json`;
        const result = await ServiceFacebook.parseRecentlyViewed(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected1 = 'Inserzione di Invisalign Italia';
        const expected2 = 'Asus ROG G752V';
        const expected3 = '2019-07-04T09:10:27.000Z';
        const expected4 = 'Post di Università degli Studi di Torino';
        const expected5 = '60';
        const expected6 = 'Video di The Dad Break: Man Squirms And Screams While Getting Facial And Nose Hair Waxed';
        const expected7 = '2020-06-20T15:08:09.000Z';
        expect(JSON.stringify(result!.insertionsVisualized![1].name)).toBe(JSON.stringify(expected1));
        expect(JSON.stringify(result!.marketplaceArticlesVisualized![1].name)).toBe(JSON.stringify(expected2));
        expect(JSON.stringify(result!.peopleVisualizedWhenSuggested![1].date)).toBe(JSON.stringify(expected3));
        expect(JSON.stringify(result!.postsShownInNewsLast90Days![0].name)).toBe(JSON.stringify(expected4));
        expect(JSON.stringify(result!.timeSpentOnPageVideos![0].watchTimeInSeconds)).toBe(JSON.stringify(expected5));
        expect(JSON.stringify(result!.timeSpentOnSingleVideo![1].name)).toBe(JSON.stringify(expected6));
        expect(JSON.stringify(result!.videoWatched![0].date)).toBe(JSON.stringify(expected7));
    });
    test('parseYourPosts', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/facebook/posts/your_posts_1.json`;
        const result = await ServiceFacebook.parseYourPosts(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = '2019-05-27T16:32:25.000Z';
        expect(JSON.stringify(result!.list[1].date)).toBe(JSON.stringify(expected));
    });
    test('parseFriends', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/facebook/friends_and_followers/friends.json`;
        const result = await ServiceFacebook.parseFriends(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = '2022-02-26T18:00:00.000Z';
        expect(JSON.stringify(result!.list[1].date)).toBe(JSON.stringify(expected));
    });
    test('parsePagesUnfollowed', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/facebook/pages/pages_you've_unfollowed.json`;
        const result = await ServiceFacebook.parsePagesUnfollowed(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'LIBRI:vendo scambio cerco';
        expect(JSON.stringify(result!.list[1].name)).toBe(JSON.stringify(expected));
    });
    test('parseAdsInterests', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/facebook/other_logged_information/ads_interests.json`;
        const result = await ServiceFacebook.parseAdsInterests(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = '20th Century Fox';
        expect(JSON.stringify(result!.list[1])).toBe(JSON.stringify(expected));
    });
    test('parseInformationSubmittedAds', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/facebook/ads_information/information_you've_submitted_to_advertisers.json`;
        const result = await ServiceFacebook.parseInformationSubmittedAds(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'Bergamo';
        expect(JSON.stringify(result!.list[2].value)).toBe(JSON.stringify(expected));
    });
    test('parseStoriesReactions', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/facebook/stories/story_reactions.json`;
        const result = await ServiceFacebook.parseStoriesReactions(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = '2021-04-29T12:08:52.000Z';
        expect(JSON.stringify(result!.list[1].date)).toBe(JSON.stringify(expected));
    });
    test('parseRecentlyVisited', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/facebook/your_interactions_on_facebook/recently_visited.json`;
        const result = await ServiceFacebook.parseRecentlyVisited(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'Non lasciarmi';
        expect(JSON.stringify(result!.list[2].list[1].name)).toBe(JSON.stringify(expected));
    });
    test('parseYourTopics', async () => {
        const pathToFile = `../../../src/mock/datasource/raw files/facebook/your_topics/your_topics.json`;
        const result = await ServiceFacebook.parseYourTopics(Buffer.from(JSON.stringify(require(pathToFile))));
        const expected = 'Crafts';
        expect(JSON.stringify(result!.list[1])).toBe(JSON.stringify(expected));
    });
});

