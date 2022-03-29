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
import {ProcessorErrorEnums} from "./processor.error";
import {InstagramDataAggregator} from "./processor.aggregator.model";

export class ProcessorInstagram {
    /**
     * @param zipFile - file zip as Buffer
     * @param timeIntervalDays - optional days of interval wanted for TI parameters, default value is 365
     * @return {Promise<InstagramDataAggregator | undefined>} - aggregation of data from instagram data source
     */
    static async aggregatorFactory(zipFile: Buffer, timeIntervalDays: number = 365): Promise<InstagramDataAggregator | undefined> {
        const JSZip = require("jszip");
        let model: InstagramDataAggregator = {};
        const zip = await JSZip.loadAsync(zipFile);
        for (let pathName of Object.keys(zip.files)) {
            const file = zip.files[pathName];
            if (!file.dir) {
                await file.async('nodebuffer').then(async (data: Buffer) => {
                    InstagramService.languagePrefix = file.comment as LanguageCode;
                    let result, regex;
                    if((regex = new RegExp(FileCode.INSTAGRAM_ADS_CLICKED)) && (regex.test(pathName))) {
                        result = <AdsClickedIG>await InstagramService.parseAdsClicked(data);
                        if (result) {
                            let counterTI = 0;
                            let today = new Date();
                            result.list.forEach((item: AdvIG) => {
                                (item.date) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                            });
                            model.adsClickTI = counterTI;
                            model.adsClick = result.list.length;
                        }
                    } else if ((regex = new RegExp(FileCode.INSTAGRAM_ADS_VIEWED)) && (regex.test(pathName))) {
                        result = <AdsViewedIG>await InstagramService.parseAdsViewed(data);
                        if (result) {
                            let counterTI = 0;
                            let today = new Date();
                            result.list.forEach((item: AdvIG) => {
                                (item.date) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                            });
                            model.adsViewedTI = counterTI;
                            model.adsViewed = result.list.length;
                        }
                    } else if ((regex = new RegExp(FileCode.INSTAGRAM_POST_COMMENT)) && (regex.test(pathName))) {
                        result = <CommentsPostedIG>await InstagramService.parseCommentsPosted(data);
                        if (result) {
                            let counterTI = 0;
                            let today = new Date();
                            result.list.forEach((comment: CommentPostedIG) => {
                                (comment.date) && (ProcessorUtils.daysDifference(today, comment.date) < timeIntervalDays) && (counterTI++);
                            });
                            model.commentsPostsTI = counterTI;
                            model.commentsPosts = result.list.length;
                        }
                    } else if ((regex = new RegExp(FileCode.INSTAGRAM_EMOJI_SLIDERS)) && (regex.test(pathName))) {
                        result = <EmojiSlidersIG>await InstagramService.parseEmojiSliders(data);
                        if (result) {
                            let counterTI = 0;
                            let today = new Date();
                            result.list.forEach((item: EmojiSliderIG) => {
                                (item.date) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                            });
                            model.emojiSlidersTI = counterTI;
                            model.emojiSliders = result.list.length;
                        }
                    } else if ((regex = new RegExp(FileCode.INSTAGRAM_FOLLOWERS)) && (regex.test(pathName))) {
                        result = <FollowersIG>await InstagramService.parseFollowers(data);
                        if (result) {
                            model.followers = result.list.length;
                        }
                    } else if ((regex = new RegExp(FileCode.INSTAGRAM_FOLLOWING_ACCOUNTS)) && (regex.test(pathName))) {
                        result = <FollowingAccountsIG>await InstagramService.parseFollowingAccounts(data);
                        if (result) {
                            model.following = result.list.length;
                        }
                    } else if ((regex = new RegExp(FileCode.INSTAGRAM_LIKE_COMMENTS)) && (regex.test(pathName))) {
                        result = <LikedCommentsIG>await InstagramService.parseLikedComments(data);
                        if (result) {
                            let counterTI = 0;
                            let today = new Date();
                            result.list.forEach((item: LikeIG) => {
                                (item.date) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                            });
                            model.likesCommentsTI = counterTI;
                            model.likesComments = result.list.length;
                        }
                    } else if ((regex = new RegExp(FileCode.INSTAGRAM_LIKE_POSTS)) && (regex.test(pathName))) {
                        result = <LikedPostsIG>await InstagramService.parseLikedPosts(data);
                        if (result) {
                            let counterTI = 0;
                            let today = new Date();
                            result.list.forEach((item: LikeIG) => {
                                (item.date) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                            });
                            model.likesPostsTI = counterTI;
                            model.likesPosts = result.list.length;
                        }
                    } else if ((regex = new RegExp(FileCode.INSTAGRAM_ELEGIBILITY)) && (regex.test(pathName))) {
                        result = <EligibilityIG>await InstagramService.parseEligibility(data);
                        if (result) {
                            model.isMonetizable = !(result.decision == 'Not Eligible');
                        }
                    } else if ((regex = new RegExp(FileCode.INSTAGRAM_POLLS)) && (regex.test(pathName))) {
                        result = <PollsIG>await InstagramService.parsePolls(data);
                        if (result) {
                            let counterTI = 0;
                            let today = new Date();
                            result.list.forEach((item: PollIG) => {
                                (item.date) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                            });
                            model.pollsTI = counterTI;
                            model.polls = result.list.length;
                        }
                    } else if ((regex = new RegExp(FileCode.INSTAGRAM_POSTS_CREATED)) && (regex.test(pathName))) {
                        result = <PersonalPostsIG>await InstagramService.parsePersonalPost(data);
                        if (result) {
                            let counterTI = 0;
                            let today = new Date();
                            result.list.forEach((item: PostIG) => {
                                (item.date) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                            });
                            model.postsCreatedTI = counterTI;
                            model.postsCreated = result.list.length;
                        }
                    } else if ((regex = new RegExp(FileCode.INSTAGRAM_POSTS_VIEWED)) && (regex.test(pathName))) {
                        result = <PostViewedIG>await InstagramService.parsePostViewed(data);
                        if (result) {
                            let counterTI = 0;
                            let today = new Date();
                            result.list.forEach((item: PostIG) => {
                                (item.date) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                            });
                            model.postsViewedTI = counterTI;
                            model.postsViewed = result.list.length;
                        }
                    } else if ((regex = new RegExp(FileCode.INSTAGRAM_QUIZZES)) && (regex.test(pathName))) {
                        result = <QuizzesIG>await InstagramService.parseQuizzes(data);
                        if (result) {
                            let counterTI = 0;
                            let today = new Date();
                            result.list.forEach((item: QuizIG) => {
                                (item.date) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                            });
                            model.quizzesTI = counterTI;
                            model.quizzes = result.list.length;
                        }
                    } else if ((regex = new RegExp(FileCode.INSTAGRAM_STORIES_CREATED)) && (regex.test(pathName))) {
                        result = <PersonalStoriesIG>await InstagramService.parsePersonalStories(data);
                        if (result) {
                            let counterTI = 0;
                            let today = new Date();
                            result.list.forEach((item: StoryIG) => {
                                (item.date) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                            });
                            model.storiesCreatedTI = counterTI;
                            model.storiesCreated = result.list.length;
                        }
                    } else if ((regex = new RegExp(FileCode.INSTAGRAM_VIDEO_VIEWED)) && (regex.test(pathName))) {
                        result = <VideoWatchedIG>await InstagramService.parseVideoWatched(data);
                        if (result) {
                            let counterTI = 0;
                            let today = new Date();
                            result.list.forEach((item: MediaIG) => {
                                (item.date) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                            });
                            model.videosViewedTI = counterTI;
                            model.videosViewed = result.list.length;
                        }
                    } else {
                        throw new Error(`${ProcessorErrorEnums.PROCESSOR_INSTAGRAM_INVALID_FILE_CODE}: File ${pathName} in input is not a valid Instagram file`);
                    }
                });
            }
        }
        return !Validator.objectIsEmpty(model) ? model : undefined;
    }
}
