import {InstagramDataAggregator} from "./processor.instagram.model";
import {FileCode} from "../descriptor/descriptor.enum";
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
import {FileContainer} from "../descriptor/descriptor.model";
import {Validator} from "../validator/validator";

export class ProcessorInstagram{
    private logger = new Logger("Instagram Processor");

    async aggregatorFactory(filesContainer: Array<FileContainer>): Promise<InstagramDataAggregator | undefined>{
        let model: InstagramDataAggregator = {};
        await Promise.all(filesContainer.map(async (data: FileContainer) => {
            if (data.fileLanguage) {
                let igService = new InstagramService(data.fileLanguage);
                let result;
                switch (data.fileCode) {
                    case FileCode.INSTAGRAM_ADS_CLICKED:
                        result = <AdsClicked>await igService.parseAdsClicked(data.fileBuffer);
                        if (result) {
                            let counterTI = 0;
                            let today = new Date();
                            result.list.map((item: Adv) => {
                                (item.date && data.fileTIdays) && (ProcessorUtils.daysDifference(today, item.date) < data.fileTIdays) && (counterTI++);
                            });
                            model.adsClickTI = counterTI;
                            model.adsClick = result.list.length;
                        } else {
                            this.logger.log('info', `empty file with ${data.fileCode} code`, 'aggregatorFactory');
                        }
                        break;
                    case FileCode.INSTAGRAM_ADS_VIEWED:
                        result = <AdsViewed>await igService.parseAdsViewed(data.fileBuffer);
                        if (result) {
                            let counterTI = 0;
                            let today = new Date();
                            result.list.map((item: Adv) => {
                                (item.date && data.fileTIdays) && (ProcessorUtils.daysDifference(today, item.date) < data.fileTIdays) && (counterTI++);
                            });
                            model.adsViewedTI = counterTI;
                            model.adsViewed = result.list.length;
                        } else {
                            this.logger.log('info', `empty file with ${data.fileCode} code`, 'aggregatorFactory');
                        }
                        break;
                    case FileCode.INSTAGRAM_POST_COMMENT:
                        result = <CommentsPosted>await igService.parseCommentsPosted(data.fileBuffer);
                        if (result) {
                            let counterTI = 0;
                            let today = new Date();
                            result.list.map((comment: CommentPosted) => {
                                (comment.date && data.fileTIdays) && (ProcessorUtils.daysDifference(today, comment.date) < data.fileTIdays) && (counterTI++);
                            });
                            model.commentsPostsTI = counterTI;
                            model.commentsPosts = result.list.length;
                        } else {
                            this.logger.log('info', `empty file with ${data.fileCode} code`, 'aggregatorFactory');
                        }
                        break;
                    case FileCode.INSTAGRAM_EMOJI_SLIDERS:
                        result = <EmojiSliders>await igService.parseEmojiSliders(data.fileBuffer);
                        if (result) {
                            let counterTI = 0;
                            let today = new Date();
                            result.list.map((item: EmojiSlider) => {
                                (item.date && data.fileTIdays) && (ProcessorUtils.daysDifference(today, item.date) < data.fileTIdays) && (counterTI++);
                            });
                            model.emojiSlidersTI = counterTI;
                            model.emojiSliders = result.list.length;
                        } else {
                            this.logger.log('info', `empty file with ${data.fileCode} code`, 'aggregatorFactory');
                        }
                        break;
                    case FileCode.INSTAGRAM_FOLLOWERS:
                        result = <Followers>await igService.parseFollowers(data.fileBuffer);
                        if (result) {
                            model.followers = result.list.length;
                        } else {
                            this.logger.log('info', `empty file with ${data.fileCode} code`, 'aggregatorFactory');
                        }
                        break;
                    case FileCode.INSTAGRAM_FOLLOWING_ACCOUNTS:
                        result = <FollowingAccounts>await igService.parseFollowingAccounts(data.fileBuffer);
                        if (result) {
                            model.following = result.list.length;
                        } else {
                            this.logger.log('info', `empty file with ${data.fileCode} code`, 'aggregatorFactory');
                        }
                        break;
                    case FileCode.INSTAGRAM_LIKE_COMMENTS:
                        result = <LikedComments>await igService.parseLikedComments(data.fileBuffer);
                        if (result) {
                            let counterTI = 0;
                            let today = new Date();
                            result.list.map((item: Like) => {
                                (item.date && data.fileTIdays) && (ProcessorUtils.daysDifference(today, item.date) < data.fileTIdays) && (counterTI++);
                            });
                            model.likesCommentsTI = counterTI;
                            model.likesComments = result.list.length;
                        } else {
                            this.logger.log('info', `empty file with ${data.fileCode} code`, 'aggregatorFactory');
                        }
                        break;
                    case FileCode.INSTAGRAM_LIKE_POSTS:
                        result = <LikedPosts>await igService.parseLikedPosts(data.fileBuffer);
                        if (result) {
                            let counterTI = 0;
                            let today = new Date();
                            result.list.map((item: Like) => {
                                (item.date && data.fileTIdays) && (ProcessorUtils.daysDifference(today, item.date) < data.fileTIdays) && (counterTI++);
                            });
                            model.likesPostsTI = counterTI;
                            model.likesPosts = result.list.length;
                        } else {
                            this.logger.log('info', `empty file with ${data.fileCode} code`, 'aggregatorFactory');
                        }
                        break;
                    case FileCode.INSTAGRAM_ELEGIBILITY:
                        result = <Eligibility>await igService.parseEligibility(data.fileBuffer);
                        if (result) {
                            model.isMonetizable = result.decision == 'Eligible';
                        } else {
                            this.logger.log('info', `empty file with ${data.fileCode} code`, 'aggregatorFactory');
                        }
                        break;
                    case FileCode.INSTAGRAM_POLLS:
                        result = <Polls>await igService.parsePolls(data.fileBuffer);
                        if (result) {
                            let counterTI = 0;
                            let today = new Date();
                            result.list.map((item: Poll) => {
                                (item.date && data.fileTIdays) && (ProcessorUtils.daysDifference(today, item.date) < data.fileTIdays) && (counterTI++);
                            });
                            model.pollsTI = counterTI;
                            model.polls = result.list.length;
                        } else {
                            this.logger.log('info', `empty file with ${data.fileCode} code`, 'aggregatorFactory');
                        }
                        break;
                    case FileCode.INSTAGRAM_POSTS_CREATED:
                        result = <PersonalPosts>await igService.parsePersonalPost(data.fileBuffer);
                        if (result) {
                            let counterTI = 0;
                            let today = new Date();
                            result.list.map((item: Post) => {
                                (item.date && data.fileTIdays) && (ProcessorUtils.daysDifference(today, item.date) < data.fileTIdays) && (counterTI++);
                            });
                            model.postsCreatedTI = counterTI;
                            model.postsCreated = result.list.length;
                        } else {
                            this.logger.log('info', `empty file with ${data.fileCode} code`, 'aggregatorFactory');
                        }
                        break;
                    case FileCode.INSTAGRAM_POSTS_VIEWED:
                        result = <PostViewed>await igService.parsePostViewed(data.fileBuffer);
                        if (result) {
                            let counterTI = 0;
                            let today = new Date();
                            result.list.map((item: Post) => {
                                (item.date && data.fileTIdays) && (ProcessorUtils.daysDifference(today, item.date) < data.fileTIdays) && (counterTI++);
                            });
                            model.postsViewedTI = counterTI;
                            model.postsViewed = result.list.length;
                        } else {
                            this.logger.log('info', `empty file with ${data.fileCode} code`, 'aggregatorFactory');
                        }
                        break;
                    case FileCode.INSTAGRAM_QUIZZES:
                        result = <Quizzes>await igService.parseQuizzes(data.fileBuffer);
                        if (result) {
                            let counterTI = 0;
                            let today = new Date();
                            result.list.map((item: Quiz) => {
                                (item.date && data.fileTIdays) && (ProcessorUtils.daysDifference(today, item.date) < data.fileTIdays) && (counterTI++);
                            });
                            model.quizzesTI = counterTI;
                            model.quizzes = result.list.length;
                        } else {
                            this.logger.log('info', `empty file with ${data.fileCode} code`, 'aggregatorFactory');
                        }
                        break;
                    case FileCode.INSTAGRAM_STORIES_CREATED:
                        result = <PersonalStories>await igService.parsePersonalStories(data.fileBuffer);
                        if (result) {
                            let counterTI = 0;
                            let today = new Date();
                            result.list.map((item: Story) => {
                                (item.date && data.fileTIdays) && (ProcessorUtils.daysDifference(today, item.date) < data.fileTIdays) && (counterTI++);
                            });
                            model.storiesCreatedTI = counterTI;
                            model.storiesCreated = result.list.length;
                        } else {
                            this.logger.log('info', `empty file with ${data.fileCode} code`, 'aggregatorFactory');
                        }
                        break;
                    case FileCode.INSTAGRAM_VIDEO_VIEWED:
                        result = <VideoWatched>await igService.parseVideoWatched(data.fileBuffer);
                        if (result) {
                            let counterTI = 0;
                            let today = new Date();
                            result.list.map((item: Media) => {
                                (item.date && data.fileTIdays) && (ProcessorUtils.daysDifference(today, item.date) < data.fileTIdays) && (counterTI++);
                            });
                            model.videosViewedTI = counterTI;
                            model.videosViewed = result.list.length;
                        } else {
                            this.logger.log('info', `empty file with ${data.fileCode} code`, 'aggregatorFactory');
                        }
                        break;
                    default:
                        this.logger.log('info', `file not recognized`, 'aggregatorFactory');
                }
            }
        }));
        model.dataPoints = ProcessorUtils.calculateInstagramPoints(model);
        return !Validator.objectIsEmpty(model) ? model : undefined;
    }

}