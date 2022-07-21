import {FacebookService} from "../../src";

async function testFacebook(){
    await testService();
}

async function testService() {
    try {
        /*
        console.log(await FacebookService.parsePersonalInformation(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/facebook_json/profile_information/profile_information.json`)))));
        console.log(await FacebookService.parseAdsInteractedWith(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/facebook_json/ads_information/advertisers_you've_interacted_with.json`)))));
        console.log(await FacebookService.parseAdsUsingYourInfo(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/facebook_json/ads_information/advertisers_using_your_activity_or_information.json`)))));
        console.log(await FacebookService.parseSearchHistory(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/facebook_json/search/your_search_history.json`)))));
        console.log(await FacebookService.parseComments(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/facebook_json/comments_and_reactions/comments.json`)))));
        console.log(await FacebookService.parseReactions(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/facebook_json/comments_and_reactions/posts_and_comments.json`)))));
        console.log(await FacebookService.parsePagesLiked(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/facebook_json/pages/pages_you've_liked.json`)))));
        console.log(await FacebookService.parsePagesFollowed(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/facebook_json/pages/pages_you_follow.json`)))));
        console.log(await FacebookService.parseAppsConnected(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/facebook_json/apps_and_websites_off_of_facebook/apps_and_websites.json`)))));
        console.log(await FacebookService.parseFriendRequestsSent(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/facebook_json/friends_and_followers/friend_requests_sent.json`)))));
        console.log(await FacebookService.parseRejectedFriendshipRequests(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/facebook_json/friends_and_followers/rejected_friend_requests.json`)))));
        console.log(await FacebookService.parseRemovedFriends(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/facebook_json/friends_and_followers/removed_friends.json`)))));
        console.log(await FacebookService.parseWhoYouFollow(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/facebook_json/friends_and_followers/who_you_follow.json`)))));
        console.log(await FacebookService.parseLanguages(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/facebook_json/preferences/language_and_locale.json`)))));
        console.log(await FacebookService.parsePagesRecommended(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/facebook_json/pages/pages_you've_recommended.json`)))));
        console.log(await FacebookService.parseRecentlyViewed(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/facebook_json/your_interactions_on_facebook/recently_viewed.json`)))));
        console.log(await FacebookService.parseYourPosts(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/facebook_json/posts/your_posts_1.json`)))));
        console.log(await FacebookService.parseFriends(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/facebook_json/friends_and_followers/friends.json`)))));
        console.log(await FacebookService.parsePagesUnfollowed(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/facebook_json/pages/pages_you've_unfollowed.json`)))));
        console.log(await FacebookService.parseAdsInterests(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/facebook_json/other_logged_information/ads_interests.json`)))));
        console.log(await FacebookService.parseYourTopics(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/facebook_json/your_topics/your_topics.json`)))));
        console.log(await FacebookService.parseYourTopics(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/facebook_json/your_topics/your_topics.json`)))));
        console.log(await FacebookService.parseInformationSubmittedAds(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/facebook_json/ads_information/information_you've_submitted_to_advertisers.json`))));
        console.log(await FacebookService.parseStoriesReactions(Buffer.from(JSON.stringify(require(`../src/mock/datasource files/facebook_json/stories/story_reactions.json`)))));
        */
        console.log(await FacebookService.parseRecentlyVisited(Buffer.from(JSON.stringify(require(`src/mock/datasource files/facebook_json/your_interactions_on_facebook/recently_visited.json`)))));
    } catch (e: any) {
        if (e.code == 'MODULE_NOT_FOUND') {
            console.log('[Error not founding module] ' + e);
        } else {
            console.log(e);
        }
    }
}

testFacebook();
