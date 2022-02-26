import {InstagramDataAggregator} from "./processor.instagram.model";
import {FileCode, Language} from "../descriptor/descriptor.enum";
import {InstagramService} from "../services/instagram.service";
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
} from "../models/instagram.model";
import Logger from "../utils/logger";
import {ProcessorUtils} from "./processor.utils";
import {Validator} from "../validator/validator";
import * as JSZip from "jszip";

export class ProcessorInstagram{
    private logger = new Logger("Instagram Processor");
    private TIME_INTERVAL_DAYS: number = 180; //6 months

    async aggregatorFactory(zipFile: Buffer): Promise<InstagramDataAggregator | undefined> {
        let model: InstagramDataAggregator = {};
        await JSZip.loadAsync(zipFile).then(async (zip: JSZip) => {
            const keys = Object.keys(zip.files);
            await Promise.all(keys.map(async (pathName: string) => {
                const file = zip.files[pathName];
                const languageCode = file.comment;
                if (!file.dir) {
                    await file.async('nodebuffer').then( async (data: Buffer) => {
                        if (languageCode != '') {
                            let igService = new InstagramService(languageCode as Language);
                            let result;
                            switch (pathName) {
                                case FileCode.INSTAGRAM_ADS_CLICKED:
                                    result = <AdsClicked>await igService.parseAdsClicked(data);
                                    if (result) {
                                        let counterTI = 0;
                                        let today = new Date();
                                        result.list.map((item: Adv) => {
                                            (item.date && this.TIME_INTERVAL_DAYS) && (ProcessorUtils.daysDifference(today, item.date) < this.TIME_INTERVAL_DAYS) && (counterTI++);
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
                                            (item.date && this.TIME_INTERVAL_DAYS) && (ProcessorUtils.daysDifference(today, item.date) < this.TIME_INTERVAL_DAYS) && (counterTI++);
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
                                            (comment.date && this.TIME_INTERVAL_DAYS) && (ProcessorUtils.daysDifference(today, comment.date) < this.TIME_INTERVAL_DAYS) && (counterTI++);
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
                                            (item.date && this.TIME_INTERVAL_DAYS) && (ProcessorUtils.daysDifference(today, item.date) < this.TIME_INTERVAL_DAYS) && (counterTI++);
                                        });
                                        model.emojiSlidersTI = counterTI;
                                        model.emojiSliders = result.list.length;
                                    } else {
                                        this.logger.log('info', `empty file with ${pathName} code`, 'aggregatorFactory');
                                    }
                                    break;
                                case FileCode.INSTAGRAM_FOLLOWERS:
                                    result = <Followers>await igService.parseFollowers(data);
                                    if (result) {
                                        model.followers = result.list.length;
                                    } else {
                                        this.logger.log('info', `empty file with ${pathName} code`, 'aggregatorFactory');
                                    }
                                    break;
                                case FileCode.INSTAGRAM_FOLLOWING_ACCOUNTS:
                                    result = <FollowingAccounts>await igService.parseFollowingAccounts(data);
                                    if (result) {
                                        model.following = result.list.length;
                                    } else {
                                        this.logger.log('info', `empty file with ${pathName} code`, 'aggregatorFactory');
                                    }
                                    break;
                                case FileCode.INSTAGRAM_LIKE_COMMENTS:
                                    result = <LikedComments>await igService.parseLikedComments(data);
                                    if (result) {
                                        let counterTI = 0;
                                        let today = new Date();
                                        result.list.map((item: Like) => {
                                            (item.date && this.TIME_INTERVAL_DAYS) && (ProcessorUtils.daysDifference(today, item.date) < this.TIME_INTERVAL_DAYS) && (counterTI++);
                                        });
                                        model.likesCommentsTI = counterTI;
                                        model.likesComments = result.list.length;
                                    } else {
                                        this.logger.log('info', `empty file with ${pathName} code`, 'aggregatorFactory');
                                    }
                                    break;
                                case FileCode.INSTAGRAM_LIKE_POSTS:
                                    result = <LikedPosts>await igService.parseLikedPosts(data);
                                    if (result) {
                                        let counterTI = 0;
                                        let today = new Date();
                                        result.list.map((item: Like) => {
                                            (item.date && this.TIME_INTERVAL_DAYS) && (ProcessorUtils.daysDifference(today, item.date) < this.TIME_INTERVAL_DAYS) && (counterTI++);
                                        });
                                        model.likesPostsTI = counterTI;
                                        model.likesPosts = result.list.length;
                                    } else {
                                        this.logger.log('info', `empty file with ${pathName} code`, 'aggregatorFactory');
                                    }
                                    break;
                                case FileCode.INSTAGRAM_ELEGIBILITY:
                                    result = <Eligibility>await igService.parseEligibility(data);
                                    if (result) {
                                        model.isMonetizable = result.decision == 'Eligible';
                                    } else {
                                        this.logger.log('info', `empty file with ${pathName} code`, 'aggregatorFactory');
                                    }
                                    break;
                                case FileCode.INSTAGRAM_POLLS:
                                    result = <Polls>await igService.parsePolls(data);
                                    if (result) {
                                        let counterTI = 0;
                                        let today = new Date();
                                        result.list.map((item: Poll) => {
                                            (item.date && this.TIME_INTERVAL_DAYS) && (ProcessorUtils.daysDifference(today, item.date) < this.TIME_INTERVAL_DAYS) && (counterTI++);
                                        });
                                        model.pollsTI = counterTI;
                                        model.polls = result.list.length;
                                    } else {
                                        this.logger.log('info', `empty file with ${pathName} code`, 'aggregatorFactory');
                                    }
                                    break;
                                case FileCode.INSTAGRAM_POSTS_CREATED:
                                    result = <PersonalPosts>await igService.parsePersonalPost(data);
                                    if (result) {
                                        let counterTI = 0;
                                        let today = new Date();
                                        result.list.map((item: Post) => {
                                            (item.date && this.TIME_INTERVAL_DAYS) && (ProcessorUtils.daysDifference(today, item.date) < this.TIME_INTERVAL_DAYS) && (counterTI++);
                                        });
                                        model.postsCreatedTI = counterTI;
                                        model.postsCreated = result.list.length;
                                    } else {
                                        this.logger.log('info', `empty file with ${pathName} code`, 'aggregatorFactory');
                                    }
                                    break;
                                case FileCode.INSTAGRAM_POSTS_VIEWED:
                                    result = <PostViewed>await igService.parsePostViewed(data);
                                    if (result) {
                                        let counterTI = 0;
                                        let today = new Date();
                                        result.list.map((item: Post) => {
                                            (item.date && this.TIME_INTERVAL_DAYS) && (ProcessorUtils.daysDifference(today, item.date) < this.TIME_INTERVAL_DAYS) && (counterTI++);
                                        });
                                        model.postsViewedTI = counterTI;
                                        model.postsViewed = result.list.length;
                                    } else {
                                        this.logger.log('info', `empty file with ${pathName} code`, 'aggregatorFactory');
                                    }
                                    break;
                                case FileCode.INSTAGRAM_QUIZZES:
                                    result = <Quizzes>await igService.parseQuizzes(data);
                                    if (result) {
                                        let counterTI = 0;
                                        let today = new Date();
                                        result.list.map((item: Quiz) => {
                                            (item.date && this.TIME_INTERVAL_DAYS) && (ProcessorUtils.daysDifference(today, item.date) < this.TIME_INTERVAL_DAYS) && (counterTI++);
                                        });
                                        model.quizzesTI = counterTI;
                                        model.quizzes = result.list.length;
                                    } else {
                                        this.logger.log('info', `empty file with ${pathName} code`, 'aggregatorFactory');
                                    }
                                    break;
                                case FileCode.INSTAGRAM_STORIES_CREATED:
                                    result = <PersonalStories>await igService.parsePersonalStories(data);
                                    if (result) {
                                        let counterTI = 0;
                                        let today = new Date();
                                        result.list.map((item: Story) => {
                                            (item.date && this.TIME_INTERVAL_DAYS) && (ProcessorUtils.daysDifference(today, item.date) < this.TIME_INTERVAL_DAYS) && (counterTI++);
                                        });
                                        model.storiesCreatedTI = counterTI;
                                        model.storiesCreated = result.list.length;
                                    } else {
                                        this.logger.log('info', `empty file with ${pathName} code`, 'aggregatorFactory');
                                    }
                                    break;
                                case FileCode.INSTAGRAM_VIDEO_VIEWED:
                                    result = <VideoWatched>await igService.parseVideoWatched(data);
                                    if (result) {
                                        let counterTI = 0;
                                        let today = new Date();
                                        result.list.map((item: Media) => {
                                            (item.date && this.TIME_INTERVAL_DAYS) && (ProcessorUtils.daysDifference(today, item.date) < this.TIME_INTERVAL_DAYS) && (counterTI++);
                                        });
                                        model.videosViewedTI = counterTI;
                                        model.videosViewed = result.list.length;
                                    } else {
                                        this.logger.log('info', `empty file with ${pathName} code`, 'aggregatorFactory');
                                    }
                                    break;
                                default:
                                    this.logger.log('info', `file not recognized`, 'aggregatorFactory');
                            }
                        }
                    });
                }
            }));
        });
        return !Validator.objectIsEmpty(model) ? model : undefined;
    }
}