import {ServiceFacebook} from "../../src";

async function testFacebook(){
    await testService();
}

async function testService() {
    try {
        /*
        console.log(await ServiceFacebook.parsePersonalInformation(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/facebook_json/profile_information/profile_information.json`)))));
        console.log(await ServiceFacebook.parseAdsInteractedWith(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/facebook_json/ads_information/advertisers_you've_interacted_with.json`)))));
        console.log(await ServiceFacebook.parseAdsUsingYourInfo(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/facebook_json/ads_information/advertisers_using_your_activity_or_information.json`)))));
        console.log(await ServiceFacebook.parseSearchHistory(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/facebook_json/search/your_search_history.json`)))));
        console.log(await ServiceFacebook.parseComments(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/facebook_json/comments_and_reactions/comments.json`)))));
        console.log(await ServiceFacebook.parseReactions(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/facebook_json/comments_and_reactions/posts_and_comments.json`)))));
        console.log(await ServiceFacebook.parsePagesLiked(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/facebook_json/pages/pages_you've_liked.json`)))));
        console.log(await ServiceFacebook.parsePagesFollowed(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/facebook_json/pages/pages_you_follow.json`)))));
        console.log(await ServiceFacebook.parseAppsConnected(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/facebook_json/apps_and_websites_off_of_facebook/apps_and_websites.json`)))));
        console.log(await ServiceFacebook.parseFriendRequestsSent(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/facebook_json/friends_and_followers/friend_requests_sent.json`)))));
        console.log(await ServiceFacebook.parseRejectedFriendshipRequests(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/facebook_json/friends_and_followers/rejected_friend_requests.json`)))));
        console.log(await ServiceFacebook.parseRemovedFriends(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/facebook_json/friends_and_followers/removed_friends.json`)))));
        console.log(await ServiceFacebook.parseWhoYouFollow(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/facebook_json/friends_and_followers/who_you_follow.json`)))));
        console.log(await ServiceFacebook.parseLanguages(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/facebook_json/preferences/language_and_locale.json`)))));
        console.log(await ServiceFacebook.parsePagesRecommended(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/facebook_json/pages/pages_you've_recommended.json`)))));
        console.log(await ServiceFacebook.parseRecentlyViewed(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/facebook_json/your_interactions_on_facebook/recently_viewed.json`)))));
        console.log(await ServiceFacebook.parseYourPosts(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/facebook_json/posts/your_posts_1.json`)))));
        console.log(await ServiceFacebook.parseFriends(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/facebook_json/friends_and_followers/friends.json`)))));
        console.log(await ServiceFacebook.parsePagesUnfollowed(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/facebook_json/pages/pages_you've_unfollowed.json`)))));
        console.log(await ServiceFacebook.parseAdsInterests(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/facebook_json/other_logged_information/ads_interests.json`)))));
        console.log(await ServiceFacebook.parseYourTopics(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/facebook_json/your_topics/your_topics.json`)))));
        console.log(await ServiceFacebook.parseYourTopics(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/facebook_json/your_topics/your_topics.json`)))));
        console.log(await ServiceFacebook.parseInformationSubmittedAds(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/facebook_json/ads_information/information_you've_submitted_to_advertisers.json`))));
        console.log(await ServiceFacebook.parseStoriesReactions(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/facebook_json/stories/story_reactions.json`)))));
        */
        console.log(await ServiceFacebook.parseRecentlyVisited(Buffer.from(JSON.stringify(require(`../../src/mock/datasource/raw files/facebook_json/your_interactions_on_facebook/recently_visited.json`)))));
    } catch (e: any) {
        if (e.code == 'MODULE_NOT_FOUND') {
            console.log('[Error not founding module] ' + e);
        } else {
            console.log(e);
        }
    }
}

testFacebook();
