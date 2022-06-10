import {FileCodeInstagram, LanguageCode} from "../descriptor";
import {InstagramService} from "../service";
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
} from "../model";
import {ProcessorUtils} from "./processor.utils";
import {ValidatorFiles, ValidatorInstagram} from "../validator";
import {InstagramDataAggregator} from "./processor.aggregator.model";
import Logger from "../utils/logger";
import {ProcessorOptions} from "./index";
import {Unzipped, unzipSync} from "fflate";

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
        InstagramService.languagePrefix = code ? code : LanguageCode.ENGLISH;
        let result, regex;
        for (let pathName in files) {
            const file = files[pathName];
            const data = Buffer.from(file, file.byteOffset, file.length);
            if (!ValidatorFiles.isDirectory(pathName)) {
                if ((regex = new RegExp(FileCodeInstagram.ADS_CLICKED)) && (regex.test(pathName))) {
                    result = <AdsClickedIG>await InstagramService.parseAdsClicked(data);
                    if (result) {
                        model.adsClick = result.list.length;
                        model.adsClickTI = result.list.filter((item: AdvIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.ADS_VIEWED)) && (regex.test(pathName))) {
                    result = <AdsViewedIG>await InstagramService.parseAdsViewed(data);
                    if (result) {
                        model.adsViewed = result.list.length;
                        model.adsViewedTI = result.list.filter((item: AdvIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.POST_COMMENT)) && (regex.test(pathName))) {
                    result = <CommentsPostedIG>await InstagramService.parseCommentsPosted(data);
                    if (result) {
                        model.commentsPosts = result.list.length;
                        model.commentsPostsTI = result.list.filter((item: CommentPostedIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.EMOJI_SLIDERS)) && (regex.test(pathName))) {
                    result = <EmojiSlidersIG>await InstagramService.parseEmojiSliders(data);
                    if (result) {
                        model.emojiSliders = result.list.length;
                        model.emojiSlidersTI = result.list.filter((item: EmojiSliderIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.FOLLOWERS)) && (regex.test(pathName))) {
                    result = <FollowersIG>await InstagramService.parseFollowers(data);
                    if (result) {
                        model.followers = result.list.length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.FOLLOWING_ACCOUNTS)) && (regex.test(pathName))) {
                    result = <FollowingAccountsIG>await InstagramService.parseFollowingAccounts(data);
                    if (result) {
                        model.following = result.list.length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.LIKE_COMMENTS)) && (regex.test(pathName))) {
                    result = <LikedCommentsIG>await InstagramService.parseLikedComments(data);
                    if (result) {
                        model.likesComments = result.list.length;
                        model.likesCommentsTI = result.list.filter((item: LikeIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.LIKE_POSTS)) && (regex.test(pathName))) {
                    result = <LikedPostsIG>await InstagramService.parseLikedPosts(data);
                    if (result) {
                        model.likesPosts = result.list.length;
                        model.likesPostsTI = result.list.filter((item: LikeIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.ELIGIBILITY)) && (regex.test(pathName))) {
                    result = <EligibilityIG>await InstagramService.parseEligibility(data);
                    if (result) {
                        model.isMonetizable = !(result.decision == 'Not Eligible');
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.POLLS)) && (regex.test(pathName))) {
                    result = <PollsIG>await InstagramService.parsePolls(data);
                    if (result) {
                        model.polls = result.list.length;
                        model.pollsTI = result.list.filter((item: PollIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.POSTS_CREATED)) && (regex.test(pathName))) {
                    result = <PersonalPostsIG>await InstagramService.parsePersonalPost(data);
                    if (result) {
                        model.postsCreated = result.list.length;
                        model.postsCreatedTI = result.list.filter((item: PostIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.POSTS_VIEWED)) && (regex.test(pathName))) {
                    result = <PostViewedIG>await InstagramService.parsePostViewed(data);
                    if (result) {
                        model.postsViewed = result.list.length;
                        model.postsViewedTI = result.list.filter((item: PostIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.QUIZZES)) && (regex.test(pathName))) {
                    result = <QuizzesIG>await InstagramService.parseQuizzes(data);
                    if (result) {
                        model.quizzes = result.list.length;
                        model.quizzesTI = result.list.filter((item: QuizIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.STORIES_CREATED)) && (regex.test(pathName))) {
                    result = <PersonalStoriesIG>await InstagramService.parsePersonalStories(data);
                    if (result) {
                        model.storiesCreated = result.list.length;
                        model.storiesCreatedTI = result.list.filter((item: StoryIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                } else if ((regex = new RegExp(FileCodeInstagram.VIDEO_VIEWED)) && (regex.test(pathName))) {
                    result = <VideoWatchedIG>await InstagramService.parseVideoWatched(data);
                    if (result) {
                        model.videosViewed = result.list.length;
                        model.videosViewedTI = result.list.filter((item: MediaIG) => (item.date) && (ProcessorUtils.daysDifference(item.date) < timeIntervalDays)).length;
                    }
                }
            }
        }
        return !ValidatorFiles.objectIsEmpty(model) ? model : undefined;
    }
}
