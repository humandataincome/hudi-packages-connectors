import {InstagramService} from './services/instagram.service';
import {LanguageMode} from "./utils/utils.enum"
import {ConfigInstagram} from "./config/config.instagram";

function main(){
    let configIG = new ConfigInstagram(LanguageMode.ITALIAN);
    let instagramService = new InstagramService(configIG);

    //let x0 = instagramService.fetchPersonalInformation();
    //let x1 = instagramService.fetchAdsInformation();
    //let x2 = instagramService.fetchContentInformation();
    //let x3 = instagramService.fetchCommentsPosted();
    //let x4 = instagramService.fetchSyncedContracts();
    //let x5 = instagramService.fetchPersonalPost();
    //let x6 = instagramService.fetchFollowers();
    //let x7 = instagramService.fetchFollowing();
    //let x8 = instagramService.fetchLikes();
    //let x9 = instagramService.fetchSearches();
    //let x10 = instagramService.fetchTopics();
    let x11 = instagramService.fetchMessages();
    console.log(x11);
}
main();

