import {LanguageCode} from "../../descriptor";
import {
    CommentPostedIG,
    EmojiSliderIG,
    EngagementIG,
    InstagramDataAggregator,
    LikeIG,
    MediaIG,
    PollIG,
    PostIG,
    QuizIG,
    StoryIG,
} from "./model.instagram";
import {ProcessorOptions, ProcessorUtils} from "../../utils/processor/processor.utils";
import Logger from "../../utils/logger";
import {Unzipped, unzipSync} from "fflate";
import {ValidatorInstagram} from "./validator.instagram";
import {ValidatorObject} from "../../utils/validator/validator.object";
import {ServiceInstagram} from "./service.instagram";
import {FileCodeInstagram} from "./enum.instagram";

export class ProcessorInstagram {
    private static readonly logger = new Logger("Processor Instagram");

    /**
     * @param zipFile - file zip as Uint8Array
     * @param options - optional set of options
     * @return aggregation of data from Instagram data source
     */
    static async aggregatorFactory(zipFile: Uint8Array, options?: ProcessorOptions): Promise<InstagramDataAggregator | undefined> {
        try {
            if (zipFile) {
                const files: Unzipped = unzipSync(zipFile);
                return await this._aggregatorFactory(files, options);
            }
        } catch (error: any) {
            (error && error.message) && (this.logger.log('error', error.message, 'aggregatorFactory'));
            if (options && options.throwExceptions !== undefined && options.throwExceptions) {
                throw error;
            }
        }
        return undefined;
    }


    private static async _aggregatorFactory(files: Unzipped, options: ProcessorOptions = {}): Promise<InstagramDataAggregator | undefined> {
        const timeIntervalDays = (options.timeIntervalDays) ? options.timeIntervalDays : 365;
        const model: InstagramDataAggregator = {};
        const modelEngagement: EngagementIG = {};
        //get language code if possible, otherwise ENGLISH as default
        let languageCode = (options && options.throwExceptions) ? await ValidatorInstagram.getInstance().getLanguage(files, {throwExceptions: options.throwExceptions}) : await ValidatorInstagram.getInstance().getLanguage(files);
        ServiceInstagram.languagePrefix = languageCode ? languageCode : LanguageCode.ENGLISH;
        let result, regex;
        for (let pathName in files) {
            const file = files[pathName];
            const data = Buffer.from(file, file.byteOffset, file.length);
            if (!ValidatorObject.isDirectory(pathName)) {
                if ((regex = new RegExp(FileCodeInstagram.PERSONAL_INFO)) && (regex.test(pathName))) {
                    result = await ServiceInstagram.parsePersonalInformation(data);
                    if (result) {
                        (result.username) && (model.username = result.username);
                        (result.name) && (model.name = result.name);
                        (result.email) && (model.email = result.email);
                        (result.phoneNumber) && (model.phoneNumber = result.phoneNumber);
                        (result.gender) && (model.gender = result.gender);
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.ELIGIBILITY)) && (regex.test(pathName))) {
                    result = await ServiceInstagram.parseEligibility(data);
                    if (result) {
                        model.eligibility = result;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.ACCOUNT_NOT_INTERESTED)) && (regex.test(pathName))) {
                    result = await ServiceInstagram.parseAccountYouAreNotInterested(data);
                    if (result) {
                        (options.maxEntitiesPerArray && result.list.length > options.maxEntitiesPerArray)
                            ? (model.accountsNotInterestedIn = {list: result.list.slice(0,options.maxEntitiesPerArray)})
                            : (model.accountsNotInterestedIn = result);
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.ADS_CLICKED)) && (regex.test(pathName))) {
                    result = await ServiceInstagram.parseAdsClicked(data);
                    if (result) {
                        modelEngagement.adsClicked = result.list.length;
                        modelEngagement.adsClickedTI = result.list.filter((item: PostIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                        (options.maxEntitiesPerArray && result.list.length > options.maxEntitiesPerArray)
                            ? (model.adsClicked = {list: result.list.slice(0,options.maxEntitiesPerArray)})
                            : (model.adsClicked = result);
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.ADS_USING_YOUR_INFO)) && (regex.test(pathName))) {
                    result = await ServiceInstagram.parseAdsUsingYourInformation(data);
                    if (result) {
                        (options.maxEntitiesPerArray && result.list.length > options.maxEntitiesPerArray)
                            ? (model.adsUsingYourInfo = {list: result.list.slice(0,options.maxEntitiesPerArray)})
                            : (model.adsUsingYourInfo = result);
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.ADS_VIEWED)) && (regex.test(pathName))) {
                    result = await ServiceInstagram.parseAdsViewed(data);
                    if (result) {
                        modelEngagement.adsViewedTI = result.list.length;
                        modelEngagement.adsViewedTI = result.list.filter((item: PostIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                        (options.maxEntitiesPerArray && result.list.length > options.maxEntitiesPerArray)
                            ? (model.adsViewed = {list: result.list.slice(0,options.maxEntitiesPerArray)})
                            : (model.adsViewed = result);
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.POSTS_VIEWED)) && (regex.test(pathName))) {
                    result = await ServiceInstagram.parsePostViewed(data);
                    if (result) {
                        modelEngagement.postsViewed = result.list.length;
                        modelEngagement.postsViewedTI = result.list.filter((item: PostIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                        (options.maxEntitiesPerArray && result.list.length > options.maxEntitiesPerArray)
                            ? (model.postsViewed = {list: result.list.slice(0,options.maxEntitiesPerArray)})
                            : (model.postsViewed = result);
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.ACCOUNT_VIEWED)) && (regex.test(pathName))) {
                    result = await ServiceInstagram.parseSuggestedAccountViewed(data);
                    if (result) {
                        (options.maxEntitiesPerArray && result.list.length > options.maxEntitiesPerArray)
                            ? (model.suggestedAccountsViewed = {list: result.list.slice(0, options.maxEntitiesPerArray)})
                            : (model.suggestedAccountsViewed = result);
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.AUTOFILL_INFO)) && (regex.test(pathName))) {
                    result = await ServiceInstagram.parseAutofillInformation(data);
                    if (result) {
                        model.autofillInfo = result;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.POST_COMMENT)) && (regex.test(pathName))) {
                    result = await ServiceInstagram.parseCommentsPosted(data);
                    if (result) {
                        modelEngagement.commentsPosted = result.list.length;
                        modelEngagement.commentsPostedTI = result.list.filter((item: CommentPostedIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                        (options.maxEntitiesPerArray && result.list.length > options.maxEntitiesPerArray)
                            ? (model.commentsPosted = {list: result.list.slice(0, options.maxEntitiesPerArray)})
                            : (model.commentsPosted = result);
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.FOLLOWING_HASHTAGS)) && (regex.test(pathName))) {
                    result = await ServiceInstagram.parseFollowingHashtags(data);
                    if (result) {
                        modelEngagement.followingHashtagsCounter = result.list.length;
                        (options.maxEntitiesPerArray && result.list.length > options.maxEntitiesPerArray)
                            ? (model.followingHashtags = {list: result.list.slice(0, options.maxEntitiesPerArray)})
                            : (model.followingHashtags = result);
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.INFO_ADS_INTERESTS)) && (regex.test(pathName))) {
                    result = await ServiceInstagram.parseAdsInterests(data);
                    if (result) {
                        (options.maxEntitiesPerArray && result.list.length > options.maxEntitiesPerArray)
                            ? (model.adsInterests = {list: result.list.slice(0, options.maxEntitiesPerArray)})
                            : (model.adsInterests = result);
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.INFO_ACCOUNT_BASED_IN)) && (regex.test(pathName))) {
                    result = await ServiceInstagram.parseLocation(data);
                    if (result) {
                        model.locations = result;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.ACCOUNT_SEARCHES)) && (regex.test(pathName))) {
                    result = await ServiceInstagram.parseSearches(data);
                    if (result) {
                        (options.maxEntitiesPerArray && result.list.length > options.maxEntitiesPerArray)
                            ? (model.searches = {list: result.list.slice(0, options.maxEntitiesPerArray)})
                            : (model.searches = result);
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.YOUR_REEL_TOPICS)) && (regex.test(pathName))) {
                    result = await ServiceInstagram.parseReelTopics(data);
                    if (result) {
                        (options.maxEntitiesPerArray && result.list.length > options.maxEntitiesPerArray)
                            ? (model.reelTopics = {list: result.list.slice(0, options.maxEntitiesPerArray)})
                            : (model.reelTopics = result);
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.YOUR_TOPICS)) && (regex.test(pathName))) {
                    result = await ServiceInstagram.parseYourTopics(data);
                    if (result) {
                        (options.maxEntitiesPerArray && result.list.length > options.maxEntitiesPerArray)
                            ? (model.yourTopics = {list: result.list.slice(0, options.maxEntitiesPerArray)})
                            : (model.yourTopics = result);
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.SHOPPING_VIEWED_ITEMS)) && (regex.test(pathName))) {
                    result = await ServiceInstagram.parseShoppingViewedItems(data);
                    if (result) {
                        (options.maxEntitiesPerArray && result.list.length > options.maxEntitiesPerArray)
                            ? (model.shoppingItemsViewed = {list: result.list.slice(0, options.maxEntitiesPerArray)})
                            : (model.shoppingItemsViewed = result);
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.FOLLOWING_ACCOUNTS)) && (regex.test(pathName))) {
                    result = await ServiceInstagram.parseFollowingAccounts(data);
                    if (result) {
                        modelEngagement.followingCounter = result.list.length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.FOLLOWERS)) && (regex.test(pathName))) {
                    result = await ServiceInstagram.parseFollowers(data);
                    if (result) {
                        modelEngagement.followersCounter = result.list.length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.EMOJI_SLIDERS)) && (regex.test(pathName))) {
                    result = await ServiceInstagram.parseEmojiSliders(data);
                    if (result) {
                        modelEngagement.emojiSliders = result.list.length;
                        modelEngagement.emojiSlidersTI = result.list.filter((item: EmojiSliderIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.LIKE_COMMENTS)) && (regex.test(pathName))) {
                    result = await ServiceInstagram.parseLikedComments(data);
                    if (result) {
                        modelEngagement.likesComments = result.list.length;
                        modelEngagement.likesCommentsTI = result.list.filter((item: LikeIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.LIKE_POSTS)) && (regex.test(pathName))) {
                    result = await ServiceInstagram.parseLikedPosts(data);
                    if (result) {
                        modelEngagement.likesPosts = result.list.length;
                        modelEngagement.likesPostsTI = result.list.filter((item: LikeIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.POLLS)) && (regex.test(pathName))) {
                    result = await ServiceInstagram.parsePolls(data);
                    if (result) {
                        modelEngagement.polls = result.list.length;
                        modelEngagement.pollsTI = result.list.filter((item: PollIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.POSTS_CREATED)) && (regex.test(pathName))) {
                    result = await ServiceInstagram.parsePersonalPost(data);
                    if (result) {
                        modelEngagement.postsCreated = result.list.length;
                        modelEngagement.postsCreatedTI = result.list.filter((item: PostIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.QUIZZES)) && (regex.test(pathName))) {
                    result = await ServiceInstagram.parseQuizzes(data);
                    if (result) {
                        modelEngagement.quizzes = result.list.length;
                        modelEngagement.quizzesTI = result.list.filter((item: QuizIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.STORIES_CREATED)) && (regex.test(pathName))) {
                    result = await ServiceInstagram.parsePersonalStories(data);
                    if (result) {
                        modelEngagement.storiesCreated = result.list.length;
                        modelEngagement.storiesCreatedTI = result.list.filter((item: StoryIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.VIDEO_VIEWED)) && (regex.test(pathName))) {
                    result = await ServiceInstagram.parseVideoWatched(data);
                    if (result) {
                        modelEngagement.videosViewed = result.list.length;
                        modelEngagement.videosViewedTI = result.list.filter((item: MediaIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
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
