import {InstagramService} from './services/instagram.service';
import {LanguageMode} from "./utils/utils.enum"
import {ConfigInstagram} from "./config/config.instagram";
import {FacebookService} from "./services/facebook.service";
import {NetflixService} from "./services/netflix.service";
import {AmazonService} from "./services/amazon.service";

async function main(){
    //console.log(await netflixServiceRun());
    console.log(await amazonServiceRun());

}

async function amazonServiceRun() {
    const amazonService = new AmazonService();
    //return await amazonService.fetchPrimeVideoWatchlist();
    //return await amazonService.fetchPrimeVideoWatchlistHistory();
    //return await amazonService.fetchPrimeVideoViewingHistory();
    return await amazonService.fetchSearchDataCustomerEngagement();
    //return await amazonService.fetchAudibleLibrary();
}

async function netflixServiceRun() {
    const netflixService = new NetflixService();
    return await netflixService.fetchPersonalInformation();
    //let x1 = await netflixService.fetchPreferences();
    //let x2 = await netflixService.fetchMyList();
    //let x3 = await netflixService.fetchSearchHistory();
    //let x4 = await netflixService.fetchViewingActivity();
    //return await netflixService.fetchPlaybackEvents();
    //return await netflixService.fetchProfiles();
}

async function facebookServiceRun() {
    const facebookService = new FacebookService();
    //let x0 = await facebookService.fetchPersonalInformation();
    //let x1 = await facebookService.fetchAdsInformation();
    //let x2 = await facebookService.fetchSearchHistory();
    //let x3 = await facebookService.fetchComments();
    //let x4 = await facebookService.fetchPageLiked();
    //let x5 = await facebookService.fetchPageFollowed();
    //let x6 = await facebookService.fetchAppsConnected();
    return await facebookService.fetchMessages();
}

async function instagramServicesRun() {
    let configIG = new ConfigInstagram(LanguageMode.ITALIAN);
    const instagramService = new InstagramService(configIG);
    //let x0 = await instagramService.fetchPersonalInformation();
    //let x1 = await instagramService.fetchAdsInformation();
    //let x2 = await instagramService.fetchContentInformation();
    //let x3 = await instagramService.fetchCommentsPosted();
    //let x4 = await instagramService.fetchSyncedContracts();
    //let x5 = await instagramService.fetchPersonalPost();
    //let x6 = await instagramService.fetchFollowers();
    //let x7 = await instagramService.fetchFollowing();
    //let x8 = await instagramService.fetchLikes();
    //let x9 = await instagramService.fetchSearches();
    //let x10 = await instagramService.fetchTopics();
    return await instagramService.fetchMessages();
}


main();

