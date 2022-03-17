import {InstagramDataAggregator} from "./processor.instagram.model";
import {FileCode, LanguageCode} from "../descriptor";
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
    LikeIG,
    LikedCommentsIG,
    LikedPostsIG, MediaIG,
    PersonalPostsIG, PersonalStoriesIG,
    PollIG,
    PollsIG,
    PostIG,
    PostViewedIG, QuizIG, QuizzesIG, StoryIG, VideoWatchedIG
} from "../model";
import {ProcessorUtils} from "./processor.utils";
import {Validator} from "../validator";
import * as JSZip from "jszip";
import {ProcessorErrorEnums} from "./processor.error";

export class ProcessorInstagram {
    /**
     * @param zipFile - file zip as Buffer
     * @param timeIntervalDays - optional days of interval wanted for TI parameters, default value is 365
     * @return {Promise<InstagramDataAggregator | undefined>} - aggregation of data from instagram data source
     */
    static async aggregatorFactory(zipFile: Buffer, timeIntervalDays: number = 365): Promise<InstagramDataAggregator | undefined> {
        let model: InstagramDataAggregator = {};
        const zip = await JSZip.loadAsync(zipFile);
        for (let pathName of Object.keys(zip.files)) {
            const file = zip.files[pathName];
            if (!file.dir) {
                await file.async('nodebuffer').then(async (data: Buffer) => {
                    let languageCode = file.comment;
                    let igService = new InstagramService(languageCode as LanguageCode);
                    let result;
                    switch (pathName) {
                        case FileCode.INSTAGRAM_ADS_CLICKED:
                            result = <AdsClickedIG>await igService.parseAdsClicked(data);
                            if (result) {
                                let counterTI = 0;
                                let today = new Date();
                                result.list.forEach((item: AdvIG) => {
                                    (item.date) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                                });
                                model.adsClickTI = counterTI;
                                model.adsClick = result.list.length;
                            }
                            break;
                        case FileCode.INSTAGRAM_ADS_VIEWED:
                            result = <AdsViewedIG>await igService.parseAdsViewed(data);
                            if (result) {
                                let counterTI = 0;
                                let today = new Date();
                                result.list.forEach((item: AdvIG) => {
                                    (item.date) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                                });
                                model.adsViewedTI = counterTI;
                                model.adsViewed = result.list.length;
                            }
                            break;
                        case FileCode.INSTAGRAM_POST_COMMENT:
                            result = <CommentsPostedIG>await igService.parseCommentsPosted(data);
                            if (result) {
                                let counterTI = 0;
                                let today = new Date();
                                result.list.forEach((comment: CommentPostedIG) => {
                                    (comment.date) && (ProcessorUtils.daysDifference(today, comment.date) < timeIntervalDays) && (counterTI++);
                                });
                                model.commentsPostsTI = counterTI;
                                model.commentsPosts = result.list.length;
                            }
                            break;
                        case FileCode.INSTAGRAM_EMOJI_SLIDERS:
                            result = <EmojiSlidersIG>await igService.parseEmojiSliders(data);
                            if (result) {
                                let counterTI = 0;
                                let today = new Date();
                                result.list.forEach((item: EmojiSliderIG) => {
                                    (item.date) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                                });
                                model.emojiSlidersTI = counterTI;
                                model.emojiSliders = result.list.length;
                            }
                            break;
                        case FileCode.INSTAGRAM_FOLLOWERS:
                            result = <FollowersIG>await igService.parseFollowers(data);
                            if (result) {
                                model.followers = result.list.length;
                            }
                            break;
                        case FileCode.INSTAGRAM_FOLLOWING_ACCOUNTS:
                            result = <FollowingAccountsIG>await igService.parseFollowingAccounts(data);
                            if (result) {
                                model.following = result.list.length;
                            }
                            break;
                        case FileCode.INSTAGRAM_LIKE_COMMENTS:
                            result = <LikedCommentsIG>await igService.parseLikedComments(data);
                            if (result) {
                                let counterTI = 0;
                                let today = new Date();
                                result.list.forEach((item: LikeIG) => {
                                    (item.date) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                                });
                                model.likesCommentsTI = counterTI;
                                model.likesComments = result.list.length;
                            }
                            break;
                        case FileCode.INSTAGRAM_LIKE_POSTS:
                            result = <LikedPostsIG>await igService.parseLikedPosts(data);
                            if (result) {
                                let counterTI = 0;
                                let today = new Date();
                                result.list.forEach((item: LikeIG) => {
                                    (item.date) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                                });
                                model.likesPostsTI = counterTI;
                                model.likesPosts = result.list.length;
                            }
                            break;
                        case FileCode.INSTAGRAM_ELEGIBILITY:
                            result = <EligibilityIG>await igService.parseEligibility(data);
                            if (result) {
                                model.isMonetizable = !(result.decision == 'Not Eligible');
                            }
                            break;
                        case FileCode.INSTAGRAM_POLLS:
                            result = <PollsIG>await igService.parsePolls(data);
                            if (result) {
                                let counterTI = 0;
                                let today = new Date();
                                result.list.forEach((item: PollIG) => {
                                    (item.date) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                                });
                                model.pollsTI = counterTI;
                                model.polls = result.list.length;
                            }
                            break;
                        case FileCode.INSTAGRAM_POSTS_CREATED:
                            result = <PersonalPostsIG>await igService.parsePersonalPost(data);
                            if (result) {
                                let counterTI = 0;
                                let today = new Date();
                                result.list.forEach((item: PostIG) => {
                                    (item.date) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                                });
                                model.postsCreatedTI = counterTI;
                                model.postsCreated = result.list.length;
                            }
                            break;
                        case FileCode.INSTAGRAM_POSTS_VIEWED:
                            result = <PostViewedIG>await igService.parsePostViewed(data);
                            if (result) {
                                let counterTI = 0;
                                let today = new Date();
                                result.list.forEach((item: PostIG) => {
                                    (item.date) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                                });
                                model.postsViewedTI = counterTI;
                                model.postsViewed = result.list.length;
                            }
                            break;
                        case FileCode.INSTAGRAM_QUIZZES:
                            result = <QuizzesIG>await igService.parseQuizzes(data);
                            if (result) {
                                let counterTI = 0;
                                let today = new Date();
                                result.list.forEach((item: QuizIG) => {
                                    (item.date) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                                });
                                model.quizzesTI = counterTI;
                                model.quizzes = result.list.length;
                            }
                            break;
                        case FileCode.INSTAGRAM_STORIES_CREATED:
                            result = <PersonalStoriesIG>await igService.parsePersonalStories(data);
                            if (result) {
                                let counterTI = 0;
                                let today = new Date();
                                result.list.forEach((item: StoryIG) => {
                                    (item.date) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                                });
                                model.storiesCreatedTI = counterTI;
                                model.storiesCreated = result.list.length;
                            }
                            break;
                        case FileCode.INSTAGRAM_VIDEO_VIEWED:
                            result = <VideoWatchedIG>await igService.parseVideoWatched(data);
                            if (result) {
                                let counterTI = 0;
                                let today = new Date();
                                result.list.forEach((item: MediaIG) => {
                                    (item.date) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                                });
                                model.videosViewedTI = counterTI;
                                model.videosViewed = result.list.length;
                            }
                            break;
                        default:
                            throw new Error(`${ProcessorErrorEnums.PROCESSOR_INSTAGRAM_INVALID_FILE_CODE}`);
                    }
                });
            }
        }
        return !Validator.objectIsEmpty(model) ? model : undefined;
    }
}
