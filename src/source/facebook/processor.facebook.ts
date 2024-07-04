import {
    AdvInteractionFB,
    CommentPostedFB,
    FacebookDataAggregator,
    PageFB,
    ReactionFB,
    ReactionsFB,
    VisualizationFB,
    YourPostFB
} from "./model.facebook";
import {
    ProcessorOptions,
    ProcessorUtils,
    ValidatorObject,
    ProcessorGDPRDatasource
} from "../../utils";
import LoggerUtils from "../../utils/logger.utils";
import {Unzipped, unzipSync} from "fflate";
import {ServiceFacebook} from "./service.facebook";
import {FileCodeFacebook} from "./enum.facebook";
import {staticImplements} from "../../utils/decorator.utils";

@staticImplements<ProcessorGDPRDatasource>()
export class ProcessorFacebook {
    private static readonly logger = new LoggerUtils("Processor Facebook");

    static initAggregator(): FacebookDataAggregator {
        return {
            engagement: {},
        };
    }

    /**
     * @param zipFile - file zip as Uint8Array
     * @param options - optional set of options
     * @return aggregation of data from Facebook datasource
     */
    static async zipAggregatorBuilder(zipFile: Uint8Array, options?: ProcessorOptions): Promise<FacebookDataAggregator | undefined> {
        try {
            const files: Unzipped = unzipSync(zipFile);
            const model: FacebookDataAggregator = this.initAggregator();
            for (let pathName in files) {
                const file = files[pathName];
                const data = Buffer.from(file, file.byteOffset, file.length);
                if (!ValidatorObject.isDirectory(pathName)) {
                    await this.aggregatorBuilder(data, pathName, model, options);
                }
            }
            if (!ValidatorObject.objectIsEmpty(model)) {
                model.creationDate = new Date();
                return model;
            }
        } catch (error: any) {
            (error && error.message) && (this.logger.log('error', error.message, 'zipAggregatorBuilder'));
            if (options && options.throwExceptions !== undefined && options.throwExceptions) {
                throw error;
            }
        }
        return undefined;
    }

    static async aggregatorBuilder(data: Buffer, pathName: string, model: FacebookDataAggregator, options: ProcessorOptions = {}) {
        let result, regex;
        const timeIntervalDays = (options && options.timeIntervalDays) ? options.timeIntervalDays : 365;
        (!model.engagement.timeInterval) && (model.engagement.timeInterval = timeIntervalDays);
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
                model.engagement.adsInteractions = result.list.length;
                model.engagement.adsInteractionsTI = result.list.filter((item: AdvInteractionFB) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
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
                model.engagement.commentsPosts = result.list.length;
                model.engagement.commentsPostsTI = result.list.filter((item: CommentPostedFB) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                (options.maxEntitiesPerArray && result.list.length > options.maxEntitiesPerArray)
                    ? (model.commentsPosted = {list: result.list.slice(0,options.maxEntitiesPerArray)})
                    : (model.commentsPosted = result);
            }
        } else if ((regex = new RegExp(FileCodeFacebook.PAGES_LIKED)) && (regex.test(pathName))) {
            result = await ServiceFacebook.parsePagesLiked(data);
            if (result) {
                model.engagement.pagesLiked = result.list.length;
                model.engagement.pagesLikedTI = result.list.filter((item: PageFB) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                (options.maxEntitiesPerArray && result.list.length > options.maxEntitiesPerArray)
                    ? (model.pagesLiked = {list: result.list.slice(0,options.maxEntitiesPerArray)})
                    : (model.pagesLiked = result);
            }
        } else if ((regex = new RegExp(FileCodeFacebook.PAGES_FOLLOWED)) && (regex.test(pathName))) {
            result = await ServiceFacebook.parsePagesFollowed(data);
            if (result) {
                model.engagement.pagesFollowed = result.list.length;
                model.engagement.pagesFollowedTI = result.list.filter((item: PageFB) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                (options.maxEntitiesPerArray && result.list.length > options.maxEntitiesPerArray)
                    ? (model.pagesFollowed = {list: result.list.slice(0,options.maxEntitiesPerArray)})
                    : (model.pagesFollowed = result);
            }
        } else if ((regex = new RegExp(FileCodeFacebook.PAGES_RECOMMENDED)) && (regex.test(pathName))) {
            result = await ServiceFacebook.parsePagesRecommended(data);
            if (result) {
                model.engagement.pagesRecommended = result.list.length;
                model.engagement.pagesRecommendedTI = result.list.filter((item: PageFB) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
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
                model.engagement.postsCreated = result.list.length;
                model.engagement.postsCreatedTI = result.list.filter((item: YourPostFB) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
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
                    model.engagement.videoWatched = result.videoWatched.length;
                    model.engagement.videoWatchedTI = result.videoWatched.filter((item: VisualizationFB) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
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
                model.engagement.likeReactions = 0;
                model.engagement.angryReactions = 0;
                model.engagement.hugReactions = 0;
                model.engagement.laughReactions = 0;
                model.engagement.loveReactions = 0;
                model.engagement.sadReactions = 0;
                model.engagement.wowReactions = 0;
                model.engagement.likeReactionsTI = 0;
                model.engagement.angryReactionsTI = 0;
                model.engagement.hugReactionsTI = 0;
                model.engagement.laughReactionsTI = 0;
                model.engagement.loveReactionsTI = 0;
                model.engagement.sadReactionsTI = 0;
                model.engagement.wowReactionsTI = 0;
                result.list.forEach((item: ReactionFB) => {
                    if (item.reaction === 'LIKE') {
                        model.engagement.likeReactions!++;
                        (item.date && ProcessorUtils.daysDifference(item.date) < timeIntervalDays) && (model.engagement.likeReactionsTI!++);
                    } else if (item.reaction === 'ANGER') {
                        model.engagement.angryReactions!++;
                        (item.date && ProcessorUtils.daysDifference(item.date) < timeIntervalDays) && (model.engagement.angryReactionsTI!++);
                    } else if (item.reaction === 'SUPPORT') {
                        model.engagement.hugReactions!++;
                        (item.date && ProcessorUtils.daysDifference(item.date) < timeIntervalDays) && (model.engagement.hugReactionsTI!++);
                    } else if (item.reaction === 'HAHA') {
                        model.engagement.laughReactions!++;
                        (item.date && ProcessorUtils.daysDifference(item.date) < timeIntervalDays) && (model.engagement.laughReactionsTI!++);
                    } else if (item.reaction === 'LOVE') {
                        model.engagement.loveReactions!++;
                        (item.date && ProcessorUtils.daysDifference(item.date) < timeIntervalDays) && (model.engagement.loveReactionsTI!++);
                    } else if (item.reaction === 'SORRY') {
                        model.engagement.sadReactions!++;
                        (item.date && ProcessorUtils.daysDifference(item.date) < timeIntervalDays) && (model.engagement.sadReactionsTI!++);
                    } else if (item.reaction === 'WOW') {
                        model.engagement.wowReactions!++;
                        (item.date && ProcessorUtils.daysDifference(item.date) < timeIntervalDays) && (model.engagement.wowReactionsTI!++);
                    }
                });
            }
        } else if ((regex = new RegExp(FileCodeFacebook.FRIENDS)) && (regex.test(pathName))) {
            result = await ServiceFacebook.parseFriends(data);
            if (result) {
                model.engagement.friendsCounter = result.list.length;
            }
        } else if ((regex = new RegExp(FileCodeFacebook.FRIENDS_WHO_YOU_FOLLOW)) && (regex.test(pathName))) {
            result = await ServiceFacebook.parseWhoYouFollow(data);
            if (result) {
                model.engagement.followingCounter = result.list.length;
            }
        }
    }
}
