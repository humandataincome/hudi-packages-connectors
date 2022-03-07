import {InstagramDataAggregator} from "./processor.instagram.model";
import {FileCode, LanguageCode} from "../descriptor/descriptor.enum";
import {InstagramService} from "../service/instagram.service";
import {
    AdsClicked,
    AdsViewed,
    Adv,
    CommentPosted,
    CommentsPosted,
    Eligibility,
    EmojiSlider,
    EmojiSliders,
    Followers,
    FollowingAccounts,
    Like,
    LikedComments,
    LikedPosts, Media,
    PersonalPosts, PersonalStories,
    Poll,
    Polls,
    Post,
    PostViewed, Quiz, Quizzes, Story, VideoWatched
} from "../model/instagram.model";
import Logger from "../utils/logger";
import {ProcessorUtils} from "./processor.utils";
import {Validator} from "../validator/validator";
import * as JSZip from "jszip";

export class ProcessorInstagram{
    private logger = new Logger("Instagram Processor");

    async aggregatorFactory(zipFile: Buffer, timeIntervalDays: number): Promise<InstagramDataAggregator | undefined> {
        let model: InstagramDataAggregator = {};
        await JSZip.loadAsync(zipFile).then(async (zip: JSZip) => {
            const keys = Object.keys(zip.files);
                await Promise.all(keys.map(async (pathName: string) => {
                    const file = zip.files[pathName];
                    if (!file.dir) {
                        await file.async('nodebuffer').then( async (data: Buffer) => {
                            let languageCode = file.comment;
                            let igService = new InstagramService(languageCode as LanguageCode);
                            let result;
                            switch (pathName) {
                                case FileCode.INSTAGRAM_ADS_CLICKED:
                                    result = <AdsClicked>await igService.parseAdsClicked(data);
                                    if (result) {
                                        let counterTI = 0;
                                        let today = new Date();
                                        result.list.map((item: Adv) => {
                                            (item.date && timeIntervalDays) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                                        });
                                        model.adsClickTI = counterTI;
                                        model.adsClick = result.list.length;
                                    } else {
                                        this.logger.log('info', `empty file with ${pathName} code`, 'aggregatorFactory');
                                    }
                                    break;
                                case FileCode.INSTAGRAM_ADS_VIEWED:
                                    result = <AdsViewed>await igService.parseAdsViewed(data);
                                    if (result) {
                                        let counterTI = 0;
                                        let today = new Date();
                                        result.list.map((item: Adv) => {
                                            (item.date && timeIntervalDays) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                                        });
                                        model.adsViewedTI = counterTI;
                                        model.adsViewed = result.list.length;
                                    } else {
                                        this.logger.log('info', `empty file with ${pathName} code`, 'aggregatorFactory');
                                    }
                                    break;
                                case FileCode.INSTAGRAM_POST_COMMENT:
                                    result = <CommentsPosted>await igService.parseCommentsPosted(data);
                                    if (result) {
                                        let counterTI = 0;
                                        let today = new Date();
                                        result.list.map((comment: CommentPosted) => {
                                            (comment.date && timeIntervalDays) && (ProcessorUtils.daysDifference(today, comment.date) < timeIntervalDays) && (counterTI++);
                                        });
                                        model.commentsPostsTI = counterTI;
                                        model.commentsPosts = result.list.length;
                                    } else {
                                        this.logger.log('info', `empty file with ${pathName} code`, 'aggregatorFactory');
                                    }
                                    break;
                                case FileCode.INSTAGRAM_EMOJI_SLIDERS:
                                    result = <EmojiSliders>await igService.parseEmojiSliders(data);
                                    if (result) {
                                        let counterTI = 0;
                                        let today = new Date();
                                        result.list.map((item: EmojiSlider) => {
                                            (item.date && timeIntervalDays) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                                        });
                                        model.emojiSlidersTI = counterTI;
                                        model.emojiSliders = result.list.length;
                                    } else {
                                        this.logger.log('info', `empty file: ${pathName}`, 'aggregatorFactory');
                                    }
                                    break;
                                case FileCode.INSTAGRAM_FOLLOWERS:
                                    result = <Followers>await igService.parseFollowers(data);
                                    if (result) {
                                        model.followers = result.list.length;
                                    } else {
                                        this.logger.log('info', `empty file: ${pathName}`, 'aggregatorFactory');
                                    }
                                    break;
                                case FileCode.INSTAGRAM_FOLLOWING_ACCOUNTS:
                                    result = <FollowingAccounts>await igService.parseFollowingAccounts(data);
                                    if (result) {
                                        model.following = result.list.length;
                                    } else {
                                        this.logger.log('info', `empty file: ${pathName}`, 'aggregatorFactory');
                                    }
                                    break;
                                case FileCode.INSTAGRAM_LIKE_COMMENTS:
                                    result = <LikedComments>await igService.parseLikedComments(data);
                                    if (result) {
                                        let counterTI = 0;
                                        let today = new Date();
                                        result.list.map((item: Like) => {
                                            (item.date && timeIntervalDays) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                                        });
                                        model.likesCommentsTI = counterTI;
                                        model.likesComments = result.list.length;
                                    } else {
                                        this.logger.log('info', `empty file: ${pathName}`, 'aggregatorFactory');
                                    }
                                    break;
                                case FileCode.INSTAGRAM_LIKE_POSTS:
                                    result = <LikedPosts>await igService.parseLikedPosts(data);
                                    if (result) {
                                        let counterTI = 0;
                                        let today = new Date();
                                        result.list.map((item: Like) => {
                                            (item.date && timeIntervalDays) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                                        });
                                        model.likesPostsTI = counterTI;
                                        model.likesPosts = result.list.length;
                                    } else {
                                        this.logger.log('info', `empty file: ${pathName}`, 'aggregatorFactory');
                                    }
                                    break;
                                case FileCode.INSTAGRAM_ELEGIBILITY:
                                    result = <Eligibility>await igService.parseEligibility(data);
                                    if (result) {
                                        model.isMonetizable = !(result.decision == 'Not Eligible');
                                    } else {
                                        this.logger.log('info', `empty file: ${pathName}`, 'aggregatorFactory');
                                    }
                                    break;
                                case FileCode.INSTAGRAM_POLLS:
                                    result = <Polls>await igService.parsePolls(data);
                                    if (result) {
                                        let counterTI = 0;
                                        let today = new Date();
                                        result.list.map((item: Poll) => {
                                            (item.date && timeIntervalDays) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                                        });
                                        model.pollsTI = counterTI;
                                        model.polls = result.list.length;
                                    } else {
                                        this.logger.log('info', `empty file: ${pathName}`, 'aggregatorFactory');
                                    }
                                    break;
                                case FileCode.INSTAGRAM_POSTS_CREATED:
                                    result = <PersonalPosts>await igService.parsePersonalPost(data);
                                    if (result) {
                                        let counterTI = 0;
                                        let today = new Date();
                                        result.list.map((item: Post) => {
                                            (item.date && timeIntervalDays) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                                        });
                                        model.postsCreatedTI = counterTI;
                                        model.postsCreated = result.list.length;
                                    } else {
                                        this.logger.log('info', `empty file: ${pathName}`, 'aggregatorFactory');
                                    }
                                    break;
                                case FileCode.INSTAGRAM_POSTS_VIEWED:
                                    result = <PostViewed>await igService.parsePostViewed(data);
                                    if (result) {
                                        let counterTI = 0;
                                        let today = new Date();
                                        result.list.map((item: Post) => {
                                            (item.date && timeIntervalDays) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                                        });
                                        model.postsViewedTI = counterTI;
                                        model.postsViewed = result.list.length;
                                    } else {
                                        this.logger.log('info', `empty file: ${pathName}`, 'aggregatorFactory');
                                    }
                                    break;
                                case FileCode.INSTAGRAM_QUIZZES:
                                    result = <Quizzes>await igService.parseQuizzes(data);
                                    if (result) {
                                        let counterTI = 0;
                                        let today = new Date();
                                        result.list.map((item: Quiz) => {
                                            (item.date && timeIntervalDays) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                                        });
                                        model.quizzesTI = counterTI;
                                        model.quizzes = result.list.length;
                                    } else {
                                        this.logger.log('info', `empty file: ${pathName}`, 'aggregatorFactory');
                                    }
                                    break;
                                case FileCode.INSTAGRAM_STORIES_CREATED:
                                    result = <PersonalStories>await igService.parsePersonalStories(data);
                                    if (result) {
                                        let counterTI = 0;
                                        let today = new Date();
                                        result.list.map((item: Story) => {
                                            (item.date && timeIntervalDays) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                                        });
                                        model.storiesCreatedTI = counterTI;
                                        model.storiesCreated = result.list.length;
                                    } else {
                                        this.logger.log('info', `empty file: ${pathName}`, 'aggregatorFactory');
                                    }
                                    break;
                                case FileCode.INSTAGRAM_VIDEO_VIEWED:
                                    result = <VideoWatched>await igService.parseVideoWatched(data);
                                    if (result) {
                                        let counterTI = 0;
                                        let today = new Date();
                                        result.list.map((item: Media) => {
                                            (item.date && timeIntervalDays) && (ProcessorUtils.daysDifference(today, item.date) < timeIntervalDays) && (counterTI++);
                                        });
                                        model.videosViewedTI = counterTI;
                                        model.videosViewed = result.list.length;
                                    } else {
                                        this.logger.log('info', `empty file: ${pathName}`, 'aggregatorFactory');
                                    }
                                    break;
                                default:
                                    this.logger.log('info', `file not recognized`, 'aggregatorFactory');
                            }
                        });
                    }
                }));
        });
        return !Validator.objectIsEmpty(model) ? model : undefined;
    }
}