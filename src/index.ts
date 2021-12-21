import {InstagramService} from './services/instagram.service';
import {LanguageMode} from "./utils/utils.enum"
import {ConfigInstagram} from "./config/config.instagram";
import {FacebookService} from "./services/facebook.service";
import {NetflixService} from "./services/netflix.service";
import {AmazonService} from "./services/amazon.service";

async function main(){
    //console.log(await netflixServiceRun());
    //console.log(await amazonServiceRun());
    //console.log(await facebookServiceRun());
    console.log(await instagramServiceRun());
}

async function amazonServiceRun() {
    const amazonService = new AmazonService();
    //return await amazonService.fetchPrimeVideoWatchlist();
    //return await amazonService.fetchPrimeVideoWatchlistHistory();
    //return await amazonService.fetchPrimeVideoViewingHistory();
    //return await amazonService.fetchSearchDataCustomerEngagement();
    //return await amazonService.fetchAudibleLibrary();
    //return await amazonService.fetchAdvertiserAudiences();
    //return await amazonService.fetchAdvertiserClicked();
}

async function netflixServiceRun() {
    const netflixService = new NetflixService();
    //return await netflixService.fetchPersonalInformation();
    //return await netflixService.fetchPreferences();
    //return await netflixService.fetchMyList();
    //return await netflixService.fetchSearchHistory();
    //return await netflixService.fetchViewingActivity();
    //return await netflixService.fetchPlaybackEvents();
    //return await netflixService.fetchProfiles();
}

async function facebookServiceRun() {
    const facebookService = new FacebookService();
    //return await facebookService.fetchPersonalInformation();
    //return await facebookService.fetchAdsInformation();
    //return await facebookService.fetchSearchHistory();
    //return await facebookService.fetchComments();
    //return await facebookService.fetchPageLiked();
    //return await facebookService.fetchPageFollowed();
    //return await facebookService.fetchAppsConnected();
    //return await facebookService.fetchMessages();
}

async function instagramServiceRun() {
    let configIG = new ConfigInstagram(LanguageMode.ITALIAN);
    const instagramService = new InstagramService(configIG);
    //return await instagramService.fetchPersonalInformation();
    //return await instagramService.fetchAdsInformation();
    //return await instagramService.fetchAdsViewed();
    //return await instagramService.fetchAdsClicked();
    //return await instagramService.fetchAdsInterests();
    return await instagramService.fetchMusicHeardInStories();
    //return await instagramService.fetchMusicRecentlyUsedInStories();
    //return await instagramService.fetchPostViewed();
    //return await instagramService.fetchVideoWatched();
    //return await instagramService.fetchSuggestedAccountViewed();
    //return await instagramService.fetchAccountYouAreNotInterested();
    //return await instagramService.fetchCommentsPosted();
    //return await instagramService.fetchSyncedContracts();
    //return await instagramService.fetchPersonalPost();
    //return await instagramService.fetchFollowers();
    //return await instagramService.fetchFollowing();
    //return await instagramService.fetchLikes();
    //return await instagramService.fetchSearches();
    //return await instagramService.fetchTopics();
    //return await instagramService.fetchMessages();
}


main();

