import {InstagramService} from './services/instagram.service';
import {LanguageMode} from "./utils/utils.enum"
import {ConfigInstagram} from "./config/config.instagram";
import {FacebookService} from "./services/facebook.service";

async function main(){
    let configIG = new ConfigInstagram(LanguageMode.ITALIAN);
    let instagramService = new InstagramService(configIG);
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
    //let x11 = await instagramService.fetchMessages();

    let facebookService = new FacebookService();
    //let x12 = await facebookService.fetchPersonalInformation();
    //let x13 = await facebookService.fetchAdsInformation();
    //let x14 = await facebookService.fetchSearchHistory();
    //let x15 = await facebookService.fetchComments();
    //let x16 = await facebookService.fetchPageLiked();
    //let x17 = await facebookService.fetchPageFollowed();
    //let x18 = await facebookService.fetchAppsConnected();
    let x19 = await facebookService.fetchMessages();
    console.log(x19);
}
main();

