import {FileCodeInstagram, LanguageCode} from "../../descriptor";
import {
    AdsClickedIG,
    AdsViewedIG,
    AdvIG,
    CommentPostedIG,
    CommentsPostedIG,
    EligibilityIG,
    EmojiSliderIG,
    EmojiSlidersIG,
    FollowersIG,
    FollowingAccountsIG,
    LikedCommentsIG,
    LikedPostsIG,
    LikeIG,
    MediaIG,
    PersonalPostsIG,
    PersonalStoriesIG,
    PollIG,
    PollsIG,
    PostIG,
    PostViewedIG,
    QuizIG,
    QuizzesIG,
    StoryIG,
    VideoWatchedIG
} from "./model.instagram";
import {ProcessorOptions, ProcessorUtils} from "../../utils/processor/processor.utils";
import {InstagramDataAggregator} from "../../utils/processor/processor.aggregator.model";
import Logger from "../../utils/logger";
import {Unzipped, unzipSync} from "fflate";
import {ValidatorInstagram} from "./validator.instagram";
import {ValidatorObject} from "../../utils/validator/validator.object";
import {ServiceInstagram} from "./service.instagram";

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
                return await this._aggregateFactory(files, options);
            }
        } catch (error: any) {
            (error && error.message) && (this.logger.log('error', error.message, 'aggregatorFactory'));
            if (options && options.throwExceptions !== undefined && options.throwExceptions) {
                throw error;
            }
        }
        return undefined;
    }


    private static async _aggregateFactory(files: Unzipped, options?: ProcessorOptions): Promise<InstagramDataAggregator | undefined> {
        const timeIntervalDays = (options && options.timeIntervalDays) ? options.timeIntervalDays : 365;
        const model: InstagramDataAggregator = {};
        //get language code if possible, otherwise ENGLISH as default
        let code = (options && options.throwExceptions) ? await ValidatorInstagram.getInstance().getLanguage(files, {throwExceptions: options.throwExceptions}) : await ValidatorInstagram.getInstance().getLanguage(files);
        ServiceInstagram.languagePrefix = code ? code : LanguageCode.ENGLISH;
        let result, regex;
        for (let pathName in files) {
            const file = files[pathName];
            const data = Buffer.from(file, file.byteOffset, file.length);
            if (!ValidatorObject.isDirectory(pathName)) {
                if ((regex = new RegExp(FileCodeInstagram.ADS_CLICKED)) && (regex.test(pathName))) {
                    result = <AdsClickedIG>await ServiceInstagram.parseAdsClicked(data);
                    if (result) {
                        model.adsClick = result.list.length;
                        model.adsClickTI = result.list.filter((item: AdvIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.ADS_VIEWED)) && (regex.test(pathName))) {
                    result = <AdsViewedIG>await ServiceInstagram.parseAdsViewed(data);
                    if (result) {
                        model.adsViewed = result.list.length;
                        model.adsViewedTI = result.list.filter((item: AdvIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.POST_COMMENT)) && (regex.test(pathName))) {
                    result = <CommentsPostedIG>await ServiceInstagram.parseCommentsPosted(data);
                    if (result) {
                        model.commentsPosts = result.list.length;
                        model.commentsPostsTI = result.list.filter((item: CommentPostedIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.EMOJI_SLIDERS)) && (regex.test(pathName))) {
                    result = <EmojiSlidersIG>await ServiceInstagram.parseEmojiSliders(data);
                    if (result) {
                        model.emojiSliders = result.list.length;
                        model.emojiSlidersTI = result.list.filter((item: EmojiSliderIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.FOLLOWERS)) && (regex.test(pathName))) {
                    result = <FollowersIG>await ServiceInstagram.parseFollowers(data);
                    if (result) {
                        model.followers = result.list.length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.FOLLOWING_ACCOUNTS)) && (regex.test(pathName))) {
                    result = <FollowingAccountsIG>await ServiceInstagram.parseFollowingAccounts(data);
                    if (result) {
                        model.following = result.list.length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.LIKE_COMMENTS)) && (regex.test(pathName))) {
                    result = <LikedCommentsIG>await ServiceInstagram.parseLikedComments(data);
                    if (result) {
                        model.likesComments = result.list.length;
                        model.likesCommentsTI = result.list.filter((item: LikeIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.LIKE_POSTS)) && (regex.test(pathName))) {
                    result = <LikedPostsIG>await ServiceInstagram.parseLikedPosts(data);
                    if (result) {
                        model.likesPosts = result.list.length;
                        model.likesPostsTI = result.list.filter((item: LikeIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.ELIGIBILITY)) && (regex.test(pathName))) {
                    result = <EligibilityIG>await ServiceInstagram.parseEligibility(data);
                    if (result) {
                        model.isMonetizable = !(result.decision == 'Not Eligible');
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.POLLS)) && (regex.test(pathName))) {
                    result = <PollsIG>await ServiceInstagram.parsePolls(data);
                    if (result) {
                        model.polls = result.list.length;
                        model.pollsTI = result.list.filter((item: PollIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.POSTS_CREATED)) && (regex.test(pathName))) {
                    result = <PersonalPostsIG>await ServiceInstagram.parsePersonalPost(data);
                    if (result) {
                        model.postsCreated = result.list.length;
                        model.postsCreatedTI = result.list.filter((item: PostIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.POSTS_VIEWED)) && (regex.test(pathName))) {
                    result = <PostViewedIG>await ServiceInstagram.parsePostViewed(data);
                    if (result) {
                        model.postsViewed = result.list.length;
                        model.postsViewedTI = result.list.filter((item: PostIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.QUIZZES)) && (regex.test(pathName))) {
                    result = <QuizzesIG>await ServiceInstagram.parseQuizzes(data);
                    if (result) {
                        model.quizzes = result.list.length;
                        model.quizzesTI = result.list.filter((item: QuizIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.STORIES_CREATED)) && (regex.test(pathName))) {
                    result = <PersonalStoriesIG>await ServiceInstagram.parsePersonalStories(data);
                    if (result) {
                        model.storiesCreated = result.list.length;
                        model.storiesCreatedTI = result.list.filter((item: StoryIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.VIDEO_VIEWED)) && (regex.test(pathName))) {
                    result = <VideoWatchedIG>await ServiceInstagram.parseVideoWatched(data);
                    if (result) {
                        model.videosViewed = result.list.length;
                        model.videosViewedTI = result.list.filter((item: MediaIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                }
            }
        }
        return !ValidatorObject.objectIsEmpty(model) ? model : undefined;
    }
}
