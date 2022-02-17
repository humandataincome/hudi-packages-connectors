import {FileCode} from "../descriptor/descriptor.enum";
import {
    AdsClicked,
    AdsViewed,
    CommentsPosted,
    Eligibility,
    EmojiSliders,
    Followers,
    FollowingAccounts,
    LikedComments,
    LikedPosts,
    PersonalPosts, PersonalStories,
    Polls,
    PostViewed, Quizzes, VideoWatched
} from "../models/instagram.model";
import {InstagramService} from "../services/instagram.service";
import {FileContainer} from "../descriptor/descriptor.model";
import {Validator} from "./validator";

export class ValidatorInstagram {

    async valideFile(data: FileContainer): Promise<boolean> {
        try {
            let result;
            const igService = new InstagramService(data.fileLanguage);
            switch (data.fileCode) {
                case FileCode.INSTAGRAM_ADS_CLICKED:
                    result = <AdsClicked>await igService.parseAdsClicked(data.fileBuffer);
                    return result.list.length > 0;
                case FileCode.INSTAGRAM_ADS_VIEWED:
                    result = <AdsViewed>await igService.parseAdsViewed(data.fileBuffer);
                    return result.list.length > 0;
                case FileCode.INSTAGRAM_POST_COMMENT:
                    result = <CommentsPosted>await igService.parseCommentsPosted(data.fileBuffer);
                    return result.list.length > 0;
                case FileCode.INSTAGRAM_EMOJI_SLIDERS:
                    result = <EmojiSliders>await igService.parseEmojiSliders(data.fileBuffer);
                    return result.list.length > 0;
                case FileCode.INSTAGRAM_FOLLOWERS:
                    result = <Followers>await igService.parseFollowers(data.fileBuffer);
                    return result.list.length > 0;
                case FileCode.INSTAGRAM_FOLLOWING_ACCOUNTS:
                    result = <FollowingAccounts>await igService.parseFollowingAccounts(data.fileBuffer);
                    return result.list.length > 0;
                case FileCode.INSTAGRAM_LIKE_COMMENTS:
                    result = <LikedComments>await igService.parseLikedComments(data.fileBuffer);
                    return result.list.length > 0;
                case FileCode.INSTAGRAM_LIKE_POSTS:
                    result = <LikedPosts>await igService.parseLikedPosts(data.fileBuffer);
                    return result.list.length > 0;
                case FileCode.INSTAGRAM_ELEGIBILITY:
                    result = <Eligibility>await igService.parseEligibility(data.fileBuffer);
                    return !Validator.objectIsEmpty(result);
                case FileCode.INSTAGRAM_POLLS:
                    result = <Polls>await igService.parsePolls(data.fileBuffer);
                    return result.list.length > 0;
                case FileCode.INSTAGRAM_POSTS_CREATED:
                    result = <PersonalPosts>await igService.parsePersonalPost(data.fileBuffer);
                    return result.list.length > 0;
                case FileCode.INSTAGRAM_POSTS_VIEWED:
                    result = <PostViewed>await igService.parsePostViewed(data.fileBuffer);
                    return result.list.length > 0;
                case FileCode.INSTAGRAM_QUIZZES:
                    result = <Quizzes>await igService.parseQuizzes(data.fileBuffer);
                    return result.list.length > 0;
                case FileCode.INSTAGRAM_STORIES_CREATED:
                    result = <PersonalStories>await igService.parsePersonalStories(data.fileBuffer);
                    return result.list.length > 0;
                case FileCode.INSTAGRAM_VIDEO_VIEWED:
                    result = <VideoWatched>await igService.parseVideoWatched(data.fileBuffer);
                    return result.list.length > 0;
                default:
                    throw ("File Code not recognized");
            }
        } catch (error) {
            throw ("Error in valideFile function: " + error);
        }
    }


    async getLanguageInstagram() {}

}