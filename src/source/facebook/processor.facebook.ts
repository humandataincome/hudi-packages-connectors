import {
    AdsInteractedWithFB,
    AdvInteractionFB,
    CommentPostedFB,
    CommentsPostedFB, FacebookDataAggregator, FriendRequestsSentFB,
    LanguagesFB, PagesFB,
    PagesFollowFB,
    PagesLikedFB,
    PagesRecommendedFB,
    PersonalInformationFB,
    ReactionFB,
    ReactionsFB, RecentlyViewedFB, VisualizationFB, YourPostFB, YourPostsFB
} from "./model.facebook";
import {ProcessorOptions, ProcessorUtils} from "../../utils/processor/processor.utils";
import Logger from "../../utils/logger";
import {Unzipped, unzipSync} from "fflate";
import {ValidatorObject} from "../../utils/validator/validator.object";
import {ServiceFacebook} from "./service.facebook";
import {FileCodeFacebook} from "./enum.facebook";

export class ProcessorFacebook {
    private static readonly logger = new Logger("Processor Facebook");

    /**
     * @param zipFile - file zip as Uint8Array
     * @param options - optional set of options
     * @return aggregation of data from Facebook data source
     */
    static async aggregatorFactory(zipFile: Uint8Array, options?: ProcessorOptions): Promise<FacebookDataAggregator | undefined> {
        try {
            const files: Unzipped = unzipSync(zipFile);
            return await this._aggregateFactory(files, options);
        } catch (error: any) {
            (error && error.message) && (this.logger.log('error', error.message, 'aggregatorFactory'));
            if (options && options.throwExceptions !== undefined && options.throwExceptions) {
                throw error;
            }
        }
        return undefined;
    }

    private static async _aggregateFactory(files: Unzipped, options?: ProcessorOptions): Promise<FacebookDataAggregator | undefined> {
        const timeIntervalDays = (options && options.timeIntervalDays) ? options.timeIntervalDays : 365;
        const model: FacebookDataAggregator = {};
        let result, regex;
        for (let pathName in files) {
            const file = files[pathName];
            const data = Buffer.from(file, file.byteOffset, file.length);
            if (!ValidatorObject.isDirectory(pathName)) {
                if ((regex = new RegExp(FileCodeFacebook.ADS_INTERACTED_WITH)) && (regex.test(pathName))) {
                    result = <AdsInteractedWithFB>await ServiceFacebook.parseAdsInteractedWith(data);
                    if (result) {
                        model.adsClick = result.list.length;
                        model.adsClickTI = result.list.filter((item: AdvInteractionFB) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeFacebook.COMMENTS)) && (regex.test(pathName))) {
                    result = <CommentsPostedFB>await ServiceFacebook.parseComments(data);
                    if (result) {
                        model.commentsPosts = result.list.length;
                        model.commentsPostsTI = result.list.filter((item: CommentPostedFB) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeFacebook.REACTIONS)) && (regex.test(pathName))) {
                    result = <ReactionsFB>await ServiceFacebook.parseReactions(data);
                    if (result) {
                        let counterLIKE = 0,
                            counterANGRY = 0,
                            counterHUG = 0,
                            counterLAUGH = 0,
                            counterLOVE = 0,
                            counterSAD = 0,
                            counterWOW = 0;
                        result.list.forEach((item: ReactionFB) => {
                            if (item.reaction === 'LIKE') {
                                counterLIKE++;
                            } else if (item.reaction === 'ANGER') {
                                counterANGRY++;
                            } else if (item.reaction === 'SUPPORT') {
                                counterHUG++;
                            } else if (item.reaction === 'HAHA') {
                                counterLAUGH++;
                            } else if (item.reaction === 'LOVE') {
                                counterLOVE++;
                            } else if (item.reaction === 'SORRY') {
                                counterSAD++;
                            } else if (item.reaction === 'WOW') {
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
                } else if ((regex = new RegExp(FileCodeFacebook.LANGUAGE)) && (regex.test(pathName))) {
                    result = <LanguagesFB>await ServiceFacebook.parseLanguages(data);
                    if (result && result.languagesKnown) {
                        model.languages = result.languagesKnown.length;
                        model.languagesList = result.languagesKnown;
                    }
                } else if ((regex = new RegExp(FileCodeFacebook.PAGES_FOLLOWED)) && (regex.test(pathName))) {
                    result = <PagesFollowFB>await ServiceFacebook.parsePagesFollowed(data);
                    if (result) {
                        if (model.pages) {
                            model.pages = model.pages + result.list.length;
                        } else {
                            model.pages = result.list.length;
                        }
                    }
                } else if ((regex = new RegExp(FileCodeFacebook.PAGES_LIKED)) && (regex.test(pathName))) {
                    result = <PagesLikedFB>await ServiceFacebook.parsePagesLiked(data);
                    if (result) {
                        if (model.pages) {
                            model.pages = model.pages + result.list.length;
                        } else {
                            model.pages = result.list.length;
                        }
                    }
                } else if ((regex = new RegExp(FileCodeFacebook.PAGES_RECOMMENDED)) && (regex.test(pathName))) {
                    result = <PagesRecommendedFB>await ServiceFacebook.parsePagesRecommended(data);
                    if (result) {
                        if (model.pages) {
                            model.pages = model.pages + result.list.length;
                        } else {
                            model.pages = result.list.length;
                        }
                    }
                } else if ((regex = new RegExp(FileCodeFacebook.PROFILE_INFO)) && (regex.test(pathName))) {
                    result = <PersonalInformationFB>await ServiceFacebook.parsePersonalInformation(data);
                    if (result) {
                        (result.gendersInterests) && (model.genderPreferences = result.gendersInterests);
                        let bestCategoryName = '';
                        let bestCategoryCounter = 0;
                        if (result.pagesInterests) {
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
                } else if ((regex = new RegExp(FileCodeFacebook.RECENTLY_VIEWED)) && (regex.test(pathName))) {
                    result = <RecentlyViewedFB>await ServiceFacebook.parseRecentlyViewed(data);
                    if (result && result.videoWatched) {
                        model.videosViewed = result.videoWatched.length;
                        model.videosViewedTI = result.videoWatched.filter((item: VisualizationFB) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeFacebook.YOUR_POSTS)) && (regex.test(pathName))) {
                    result = <YourPostsFB>await ServiceFacebook.parseYourPosts(data);
                    if (result) {
                        model.postsCreated = result.list.length;
                        model.postsCreatedTI = result.list.filter((item: YourPostFB) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeFacebook.FRIENDS)) && (regex.test(pathName))) {
                    result = <FriendRequestsSentFB>await ServiceFacebook.parseFriends(data);
                    if (result) {
                        model.friends = result.list.length;
                    }
                }
            }
        }
        return !ValidatorObject.objectIsEmpty(model) ? model : undefined;
    }
}
