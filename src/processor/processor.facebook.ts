import {FacebookService} from "../service";
import {FileCode} from "../descriptor";
import {
    AdsInteractedWithFB,
    AdvInteractionFB,
    CommentPostedFB,
    CommentsPostedFB, FriendRequestsSentFB,
    LanguagesFB, PagesFB,
    PagesFollowFB,
    PagesLikedFB,
    PagesRecommendedFB,
    PersonalInformationFB,
    ReactionFB,
    ReactionsFB, RecentlyViewedFB, VisualizationFB, YourPostFB, YourPostsFB
} from "../model";
import {ProcessorUtils} from "./processor.utils";
import {Validator} from "../validator";
import {ProcessorErrorEnums} from "./processor.error";
import {FacebookDataAggregator} from "./processor.aggregator.model";

export class ProcessorFacebook {
    /**
     * @param zipFile - file zip as Buffer
     * @param timeIntervalDays - optional days of interval wanted for TI parameters, default value is 365
     * @return {Promise<InstagramDataAggregator | undefined>} - aggregation of data from instagram data source
     */
    static async aggregatorFactory(zipFile: Buffer, timeIntervalDays: number = 365): Promise<FacebookDataAggregator | undefined> {
        const JSZip = require("jszip");
        let model: FacebookDataAggregator = {};
        const zip = await JSZip.loadAsync(zipFile);
        for (let pathName of Object.keys(zip.files)) {
            const file = zip.files[pathName];
            if (!file.dir) {
                let today = new Date();
                await file.async('nodebuffer').then(async (data: Buffer) => {
                    let result, regex;
                    if((regex = new RegExp(FileCode.FACEBOOK_ADS_INTERACTED_WITH)) && (regex.test(pathName))) {
                        result = <AdsInteractedWithFB>await FacebookService.parseAdsInteractedWith(data);
                        if (result) {
                            let counterTI = 0;
                            result.list.forEach((item: AdvInteractionFB) => {
                                (item.date) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                            });
                            model.adsClickTI = counterTI;
                            model.adsClick = result.list.length;
                        }
                    } else if ((regex = new RegExp(FileCode.FACEBOOK_COMMENTS)) && (regex.test(pathName))) {
                        result = <CommentsPostedFB>await FacebookService.parseComments(data);
                        if (result) {
                            let counterTI = 0;
                            result.list.forEach((item: CommentPostedFB) => {
                                (item.date) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                            });
                            model.commentsPostsTI = counterTI;
                            model.commentsPosts = result.list.length;
                        }
                    } else if ((regex = new RegExp(FileCode.FACEBOOK_REACTIONS)) && (regex.test(pathName))) {
                        result = <ReactionsFB>await FacebookService.parseReactions(data);
                        if (result) {
                            let counterLIKE = 0,
                                counterANGRY = 0,
                                counterHUG = 0,
                                counterLAUGH = 0,
                                counterLOVE = 0,
                                counterSAD = 0,
                                counterWOW = 0;
                            result.list.forEach((item: ReactionFB) => {
                                if(item.reaction === 'LIKE') {
                                    counterLIKE++;
                                } else if(item.reaction === 'ANGER') {
                                    counterANGRY++;
                                } else if(item.reaction === 'SUPPORT') {
                                    counterHUG++;
                                } else if(item.reaction === 'HAHA') {
                                    counterLAUGH++;
                                } else if(item.reaction === 'LOVE') {
                                    counterLOVE++;
                                } else if(item.reaction === 'SORRY') {
                                    counterSAD++;
                                } else if(item.reaction === 'WOW') {
                                    counterWOW++;
                                }
                            });
                            model.likeReactions = counterLIKE;
                            model.angryReactions = counterANGRY;
                            model.hugReaction = counterHUG;
                            model.laughReactions = counterLAUGH;
                            model.loveReactions = counterLOVE;
                            model.sadReactions = counterSAD;
                            model.wowReactions = counterWOW;
                        }
                    } else if ((regex = new RegExp(FileCode.FACEBOOK_LANGUAGE)) && (regex.test(pathName))) {
                        result = <LanguagesFB>await FacebookService.parseLanguages(data);
                        if(result && result.languagesKnown) {
                            model.languages = result.languagesKnown.length;
                            model.languagesList = result.languagesKnown;
                        }
                    } else if ((regex = new RegExp(FileCode.FACEBOOK_PAGES_FOLLOWED)) && (regex.test(pathName))) {
                        result = <PagesFollowFB>await FacebookService.parsePagesFollowed(data);
                        if(result) {
                            if(model.pages) {
                                model.pages = model.pages+result.list.length;
                            } else {
                                model.pages = result.list.length;
                            }
                        }
                    } else if ((regex = new RegExp(FileCode.FACEBOOK_PAGES_LIKED)) && (regex.test(pathName))) {
                        result = <PagesLikedFB>await FacebookService.parsePagesLiked(data);
                        if(result) {
                            if(model.pages) {
                                model.pages = model.pages+result.list.length;
                            } else {
                                model.pages = result.list.length;
                            }
                        }
                    } else if ((regex = new RegExp(FileCode.FACEBOOK_PAGES_RACCOMENDED)) && (regex.test(pathName))) {
                        result = <PagesRecommendedFB>await FacebookService.parsePagesRecommended(data);
                        if(result) {
                            if(model.pages) {
                                model.pages = model.pages+result.list.length;
                            } else {
                                model.pages = result.list.length;
                            }
                        }
                    } else if ((regex = new RegExp(FileCode.FACEBOOK_PROFILE_INFO)) && (regex.test(pathName))) {
                        result = <PersonalInformationFB>await FacebookService.parsePersonalInformation(data);
                        if(result) {
                            (result.gendersInterests) && (model.genderPreferences = result.gendersInterests);
                            let bestCategoryName = '';
                            let bestCategoryCounter = 0;
                            if(result.pagesInterests) {
                                result.pagesInterests.forEach((item: PagesFB) => {
                                    if (item.category && item.pages) {
                                        if (item.pages.length > bestCategoryCounter) {
                                            bestCategoryName = item.category;
                                            bestCategoryCounter = item.pages.length;
                                        }
                                    }
                                });
                                model.mainPageCategory = bestCategoryName;
                            }
                        }
                    } else if ((regex = new RegExp(FileCode.FACEBOOK_RECENTLY_VIEWED)) && (regex.test(pathName))) {
                        result = <RecentlyViewedFB>await FacebookService.parseRecentlyViewed(data);
                        if(result && result.videoWatched) {
                            let counterTI = 0;
                            result.videoWatched.forEach((item: VisualizationFB) => {
                                (item.date) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                            });
                            model.videosViewedTI = counterTI;
                            model.videosViewed = result.videoWatched.length;
                        }
                    } else if ((regex = new RegExp(FileCode.FACEBOOK_YOUR_POSTS)) && (regex.test(pathName))) {
                        result = <YourPostsFB>await FacebookService.parseYourPosts(data);
                        if(result){
                            let counterTI = 0;
                            result.list.forEach((item: YourPostFB) => {
                                (item.date) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                            });
                            model.postsCreatedTI = counterTI;
                            model.postsCreated = result.list.length;
                        }
                    } else if ((regex = new RegExp(FileCode.FACEBOOK_FRIENDS)) && (regex.test(pathName))) {
                        result = <FriendRequestsSentFB>await FacebookService.parseFriends(data);
                        if(result){
                            model.friends = result.list.length;
                        }
                    } else {
                        throw new Error(`${ProcessorErrorEnums.PROCESSOR_FACEBOOK_INVALID_FILE_CODE}`);
                    }

                });
            }
        }
        return !Validator.objectIsEmpty(model) ? model : undefined;
    }
}
