import {
    AdvInteractionFB,
    CommentPostedFB,
    EngagementAggregatorFB,
    FacebookDataAggregator,
    PageFB,
    ReactionFB,
    ReactionsFB,
    VisualizationFB,
    YourPostFB
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
            return await this._aggregatorFactory(files, options);
        } catch (error: any) {
            (error && error.message) && (this.logger.log('error', error.message, 'aggregatorFactory'));
            if (options && options.throwExceptions !== undefined && options.throwExceptions) {
                throw error;
            }
        }
        return undefined;
    }

    private static async _aggregatorFactory(files: Unzipped, options: ProcessorOptions = {}): Promise<FacebookDataAggregator | undefined> {
        const timeIntervalDays = (options && options.timeIntervalDays) ? options.timeIntervalDays : 365;
        const model: FacebookDataAggregator = {};
        const modelEngagement: EngagementAggregatorFB = {};

        let result, regex;
        for (let pathName in files) {
            const file = files[pathName];
            const data = Buffer.from(file, file.byteOffset, file.length);
            if (!ValidatorObject.isDirectory(pathName)) {
                if ((regex = new RegExp(FileCodeFacebook.PROFILE_INFO)) && (regex.test(pathName))) {
                    result = await ServiceFacebook.parsePersonalInformation(data);
                    if (result) {
                        model.personalInfo = result;
                    }
                } else if ((regex = new RegExp(FileCodeFacebook.LANGUAGE)) && (regex.test(pathName))) {
                    result = await ServiceFacebook.parseLanguages(data);
                    if (result && result.languagesKnown) {
                        model.languagesKnown = result.languagesKnown;
                    }
                } else if ((regex = new RegExp(FileCodeFacebook.ADS_INTERACTED_WITH)) && (regex.test(pathName))) {
                    result = await ServiceFacebook.parseAdsInteractedWith(data);
                    if (result) {
                        modelEngagement.adsInteractions = result.list.length;
                        modelEngagement.adsInteractionsTI = result.list.filter((item: AdvInteractionFB) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                        (options.maxEntitiesPerArray && result.list.length > options.maxEntitiesPerArray)
                            ? (model.adsInteractedWith = {list: result.list.slice(0,options.maxEntitiesPerArray)})
                            : (model.adsInteractedWith = result);
                    }
                } else if ((regex = new RegExp(FileCodeFacebook.ADS_USING_YOUR_ACTIVITY)) && (regex.test(pathName))) {
                    result = await ServiceFacebook.parseAdsUsingYourInfo(data);
                    if (result) {
                        (options.maxEntitiesPerArray && result.list.length > options.maxEntitiesPerArray)
                            ? (model.adsUsingYourInfo = {list: result.list.slice(0,options.maxEntitiesPerArray)})
                            : (model.adsUsingYourInfo = result);
                    }
                } else if ((regex = new RegExp(FileCodeFacebook.ADS_INTERESTS)) && (regex.test(pathName))) {
                    result = await ServiceFacebook.parseAdsInterests(data);
                    if (result) {
                        (options.maxEntitiesPerArray && result.list.length > options.maxEntitiesPerArray)
                            ? (model.adsInterests = {list: result.list.slice(0,options.maxEntitiesPerArray)})
                            : (model.adsInterests = result);
                    }
                } else if ((regex = new RegExp(FileCodeFacebook.INFO_SUBMITTED_ADS)) && (regex.test(pathName))) {
                    result = await ServiceFacebook.parseInformationSubmittedAds(data);
                    if (result) {
                        (options.maxEntitiesPerArray && result.list.length > options.maxEntitiesPerArray)
                            ? (model.infoSubmittedToAds = {list: result.list.slice(0,options.maxEntitiesPerArray)})
                            : (model.infoSubmittedToAds = result);
                    }
                } else if ((regex = new RegExp(FileCodeFacebook.SEARCH_HISTORY)) && (regex.test(pathName))) {
                    result = await ServiceFacebook.parseSearchHistory(data);
                    if (result) {
                        (options.maxEntitiesPerArray && result.list.length > options.maxEntitiesPerArray)
                            ? (model.searchHistory = {list: result.list.slice(0,options.maxEntitiesPerArray)})
                            : (model.searchHistory = result);
                    }
                } else if ((regex = new RegExp(FileCodeFacebook.COMMENTS)) && (regex.test(pathName))) {
                    result = await ServiceFacebook.parseComments(data);
                    if (result) {
                        modelEngagement.commentsPosts = result.list.length;
                        modelEngagement.commentsPostsTI = result.list.filter((item: CommentPostedFB) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                        (options.maxEntitiesPerArray && result.list.length > options.maxEntitiesPerArray)
                            ? (model.commentsPosted = {list: result.list.slice(0,options.maxEntitiesPerArray)})
                            : (model.commentsPosted = result);
                    }
                } else if ((regex = new RegExp(FileCodeFacebook.PAGES_LIKED)) && (regex.test(pathName))) {
                    result = await ServiceFacebook.parsePagesLiked(data);
                    if (result) {
                        modelEngagement.pagesLiked = result.list.length;
                        modelEngagement.pagesLikedTI = result.list.filter((item: PageFB) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                        (options.maxEntitiesPerArray && result.list.length > options.maxEntitiesPerArray)
                            ? (model.pagesLiked = {list: result.list.slice(0,options.maxEntitiesPerArray)})
                            : (model.pagesLiked = result);
                    }
                } else if ((regex = new RegExp(FileCodeFacebook.PAGES_FOLLOWED)) && (regex.test(pathName))) {
                    result = await ServiceFacebook.parsePagesFollowed(data);
                    if (result) {
                        modelEngagement.pagesFollowed = result.list.length;
                        modelEngagement.pagesFollowedTI = result.list.filter((item: PageFB) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                        (options.maxEntitiesPerArray && result.list.length > options.maxEntitiesPerArray)
                            ? (model.pagesFollowed = {list: result.list.slice(0,options.maxEntitiesPerArray)})
                            : (model.pagesFollowed = result);
                    }
                } else if ((regex = new RegExp(FileCodeFacebook.PAGES_RECOMMENDED)) && (regex.test(pathName))) {
                    result = await ServiceFacebook.parsePagesRecommended(data);
                    if (result) {
                        modelEngagement.pagesRecommended = result.list.length;
                        modelEngagement.pagesRecommendedTI = result.list.filter((item: PageFB) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                        (options.maxEntitiesPerArray && result.list.length > options.maxEntitiesPerArray)
                            ? (model.pagesRecommended = {list: result.list.slice(0,options.maxEntitiesPerArray)})
                            : (model.pagesRecommended = result);
                    }
                } else if ((regex = new RegExp(FileCodeFacebook.PAGES_UNFOLLOWED)) && (regex.test(pathName))) {
                    result = await ServiceFacebook.parsePagesUnfollowed(data);
                    if (result) {
                        (options.maxEntitiesPerArray && result.list.length > options.maxEntitiesPerArray)
                            ? (model.pagesUnfollowed = {list: result.list.slice(0,options.maxEntitiesPerArray)})
                            : (model.pagesUnfollowed = result);
                    }
                } else if ((regex = new RegExp(FileCodeFacebook.YOUR_POSTS)) && (regex.test(pathName))) {
                    result = await ServiceFacebook.parseYourPosts(data);
                    if (result) {
                        modelEngagement.postsCreated = result.list.length;
                        modelEngagement.postsCreatedTI = result.list.filter((item: YourPostFB) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                        (options.maxEntitiesPerArray && result.list.length > options.maxEntitiesPerArray)
                            ? (model.postsCreated = {list: result.list.slice(0,options.maxEntitiesPerArray)})
                            : (model.postsCreated = result);
                    }
                } else if ((regex = new RegExp(FileCodeFacebook.YOUR_TOPICS)) && (regex.test(pathName))) {
                    result = await ServiceFacebook.parseYourTopics(data);
                    if (result) {
                        (options.maxEntitiesPerArray && result.list.length > options.maxEntitiesPerArray)
                            ? (model.yourTopics = {list: result.list.slice(0,options.maxEntitiesPerArray)})
                            : (model.yourTopics = result);
                    }
                } else if ((regex = new RegExp(FileCodeFacebook.RECENTLY_VIEWED)) && (regex.test(pathName))) {
                    result = await ServiceFacebook.parseRecentlyViewed(data);
                    if (result) {
                        if (result.videoWatched) {
                            modelEngagement.videoWatched = result.videoWatched.length;
                            modelEngagement.videoWatchedTI = result.videoWatched.filter((item: VisualizationFB) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                        }
                        model.recentlyViewed = result;
                    }
                } else if ((regex = new RegExp(FileCodeFacebook.RECENTLY_VISITED)) && (regex.test(pathName))) {
                    result = await ServiceFacebook.parseRecentlyVisited(data);
                    if (result) {
                        (options.maxEntitiesPerArray && result.list.length > options.maxEntitiesPerArray)
                            ? (model.recentlyVisited = {list: result.list.slice(0,options.maxEntitiesPerArray)})
                            : (model.recentlyVisited = result);
                    }
                } else if ((regex = new RegExp(FileCodeFacebook.REACTIONS)) && (regex.test(pathName))) {
                    result = <ReactionsFB>await ServiceFacebook.parseReactions(data);
                    if (result) {
                        modelEngagement.likeReactions = 0;
                        modelEngagement.angryReactions = 0;
                        modelEngagement.hugReactions = 0;
                        modelEngagement.laughReactions = 0;
                        modelEngagement.loveReactions = 0;
                        modelEngagement.sadReactions = 0;
                        modelEngagement.wowReactions = 0;
                        modelEngagement.likeReactionsTI = 0;
                        modelEngagement.angryReactionsTI = 0;
                        modelEngagement.hugReactionsTI = 0;
                        modelEngagement.laughReactionsTI = 0;
                        modelEngagement.loveReactionsTI = 0;
                        modelEngagement.sadReactionsTI = 0;
                        modelEngagement.wowReactionsTI = 0;
                        result.list.forEach((item: ReactionFB) => {
                            if (item.reaction === 'LIKE') {
                                modelEngagement.likeReactions!++;
                                (item.date && ProcessorUtils.daysDifference(item.date) < timeIntervalDays) && (modelEngagement.likeReactionsTI!++);
                            } else if (item.reaction === 'ANGER') {
                                modelEngagement.angryReactions!++;
                                (item.date && ProcessorUtils.daysDifference(item.date) < timeIntervalDays) && (modelEngagement.angryReactionsTI!++);
                            } else if (item.reaction === 'SUPPORT') {
                                modelEngagement.hugReactions!++;
                                (item.date && ProcessorUtils.daysDifference(item.date) < timeIntervalDays) && (modelEngagement.hugReactionsTI!++);
                            } else if (item.reaction === 'HAHA') {
                                modelEngagement.laughReactions!++;
                                (item.date && ProcessorUtils.daysDifference(item.date) < timeIntervalDays) && (modelEngagement.laughReactionsTI!++);
                            } else if (item.reaction === 'LOVE') {
                                modelEngagement.loveReactions!++;
                                (item.date && ProcessorUtils.daysDifference(item.date) < timeIntervalDays) && (modelEngagement.loveReactionsTI!++);
                            } else if (item.reaction === 'SORRY') {
                                modelEngagement.sadReactions!++;
                                (item.date && ProcessorUtils.daysDifference(item.date) < timeIntervalDays) && (modelEngagement.sadReactionsTI!++);
                            } else if (item.reaction === 'WOW') {
                                modelEngagement.wowReactions!++;
                                (item.date && ProcessorUtils.daysDifference(item.date) < timeIntervalDays) && (modelEngagement.wowReactionsTI!++);
                            }
                        });
                    }
                } else if ((regex = new RegExp(FileCodeFacebook.FRIENDS)) && (regex.test(pathName))) {
                    result = await ServiceFacebook.parseFriends(data);
                    if (result) {
                        modelEngagement.friendsCounter = result.list.length;
                    }
                } else if ((regex = new RegExp(FileCodeFacebook.FRIENDS_WHO_YOU_FOLLOW)) && (regex.test(pathName))) {
                    result = await ServiceFacebook.parseWhoYouFollow(data);
                    if (result) {
                        modelEngagement.followingCounter = result.list.length;
                    }
                }

            }
        }
        if (!ValidatorObject.objectIsEmpty(modelEngagement)) {
            modelEngagement.timeInterval = timeIntervalDays;
            model.engagement = modelEngagement;
        }
        if (!ValidatorObject.objectIsEmpty(model)) {
            model.creationDate = new Date();
            return model;
        }
        return undefined;
    }
}
