import { LanguageCode } from '../../descriptor';
import {
    CommentPostedIG,
    EmojiSliderIG,
    InstagramDataAggregator,
    LikeIG,
    PollIG,
    PostIG,
    QuizIG,
    StoryIG,
} from './model.instagram';
import LoggerUtils from '../../utils/logger.utils';
import { Unzipped, unzipSync } from 'fflate';
import { ValidatorInstagram } from './validator.instagram';
import { ServiceInstagram } from './service.instagram';
import { FileCodeInstagram } from './enum.instagram';
import { staticImplements } from '../../utils/decorator.utils';
import {
    daysDifference,
    mergeArrays,
    ProcessorGDPRDatasource,
    ProcessorOptions,
} from '../../processor';
import { ValidatorObject } from '../../validator';
import { sliceIfTooLong } from '../../utils/array.utils';

@staticImplements<ProcessorGDPRDatasource>()
export class ProcessorInstagram {
    private static readonly logger = new LoggerUtils('Processor Instagram');

    static initAggregator(): InstagramDataAggregator {
        return {
            engagement: {},
        };
    }

    /**
     * @param zipFile - file zip as Uint8Array
     * @param options - optional set of options
     * @return aggregation of data from Instagram datasource
     */
    static async zipAggregatorBuilder(
        zipFile: Uint8Array,
        options?: ProcessorOptions,
    ): Promise<InstagramDataAggregator | undefined> {
        try {
            if (zipFile) {
                const files: Unzipped = unzipSync(zipFile);
                //find the language code
                let language: LanguageCode | undefined = LanguageCode.ENGLISH;
                let found = false;
                for (const pathName in files) {
                    if (!found) {
                        if (!ValidatorObject.isDirectory(pathName)) {
                            if (
                                new RegExp(
                                    FileCodeInstagram.PERSONAL_INFO,
                                ).test(pathName)
                            ) {
                                const file = files[pathName];
                                language =
                                    await ValidatorInstagram.getInstance().getLanguage(
                                        pathName,
                                        file,
                                    );
                                found = true;
                            }
                        }
                    }
                }
                //process the zip file
                const model: InstagramDataAggregator = this.initAggregator();
                for (const pathName in files) {
                    const file = files[pathName];
                    const data = Buffer.from(
                        file,
                        file.byteOffset,
                        file.length,
                    );
                    if (!ValidatorObject.isDirectory(pathName)) {
                        await this.aggregatorBuilder(
                            data,
                            pathName,
                            model,
                            (options = { ...options, language }),
                        );
                    }
                }
                if (!ValidatorObject.objectIsEmpty(model)) {
                    model.creationDate = new Date();
                    return model;
                }
            }
        } catch (error: any) {
            error &&
                error.message &&
                this.logger.log('error', error.message, 'zipAggregatorBuilder');
            if (
                options &&
                options.throwExceptions !== undefined &&
                options.throwExceptions
            ) {
                throw error;
            }
        }
        return undefined;
    }

    static async aggregatorBuilder(
        data: Buffer,
        pathName: string,
        model: InstagramDataAggregator,
        options: ProcessorOptions = {},
    ) {
        const timeIntervalDays = options.timeIntervalDays
            ? options.timeIntervalDays
            : 365;
        !model.engagement.timeInterval &&
            (model.engagement.timeInterval = timeIntervalDays);
        ServiceInstagram.languagePrefix = options.language
            ? options.language
            : LanguageCode.ENGLISH;
        let result;
        let regex;
        if (
            (regex = new RegExp(FileCodeInstagram.PERSONAL_INFO)) &&
            regex.test(pathName)
        ) {
            result = await ServiceInstagram.parsePersonalInformation(data);
            if (result) {
                result.username && (model.username = result.username);
                result.name && (model.name = result.name);
                result.email && (model.email = result.email);
                result.phoneNumber && (model.phoneNumber = result.phoneNumber);
                result.gender && (model.gender = result.gender);
            }
        } else if (
            (regex = new RegExp(FileCodeInstagram.ELIGIBILITY)) &&
            regex.test(pathName)
        ) {
            result = await ServiceInstagram.parseEligibility(data);
            if (result) {
                model.eligibility = result;
            }
        } else if (
            (regex = new RegExp(FileCodeInstagram.ACCOUNT_NOT_INTERESTED)) &&
            regex.test(pathName)
        ) {
            result =
                await ServiceInstagram.parseAccountYouAreNotInterested(data);
            if (result) {
                model.accountsNotInterestedIn = {
                    list: sliceIfTooLong(
                        result.list,
                        options.maxEntitiesPerArray,
                    ),
                };
            }
        } else if (
            (regex = new RegExp(FileCodeInstagram.v2_ADS_CLICKED)) &&
            regex.test(pathName)
        ) {
            result = await ServiceInstagram.parseAdsClicked(data);
            if (result) {
                model.engagement.adsClicked = result.list.length;
                model.engagement.adsClickedTI = result.list.filter(
                    (item) =>
                        item.date &&
                        daysDifference(item.date) < timeIntervalDays,
                ).length;
                model.adsClicked = {
                    list: sliceIfTooLong(
                        result.list,
                        options.maxEntitiesPerArray,
                    ),
                };
            }
        } else if (
            (regex = new RegExp(FileCodeInstagram.ADS_USING_YOUR_INFO)) &&
            regex.test(pathName)
        ) {
            result = await ServiceInstagram.parseAdsUsingYourInformation(data);
            if (result) {
                model.adsUsingYourInfo = {
                    list: sliceIfTooLong(
                        result.list,
                        options.maxEntitiesPerArray,
                    ),
                };
            }
        } else if (
            (regex = new RegExp(FileCodeInstagram.v2_ADS_VIEWED)) &&
            regex.test(pathName)
        ) {
            result = await ServiceInstagram.parseAdsViewed(data);
            if (result) {
                model.engagement.adsViewed = result.list.length;
                model.engagement.adsViewedTI = result.list.filter(
                    (item) =>
                        item.date &&
                        daysDifference(item.date) < timeIntervalDays,
                ).length;
                model.adsViewed = {
                    list: sliceIfTooLong(
                        result.list,
                        options.maxEntitiesPerArray,
                    ),
                };
            }
        } else if (
            (regex = new RegExp(FileCodeInstagram.v2_POSTS_VIEWED)) &&
            regex.test(pathName)
        ) {
            result = await ServiceInstagram.parsePostViewed(data);
            if (result) {
                model.engagement.postsViewed = result.list.length;
                model.engagement.postsViewedTI = result.list.filter(
                    (item) =>
                        item.date &&
                        daysDifference(item.date) < timeIntervalDays,
                ).length;
                model.postsViewed = {
                    list: sliceIfTooLong(
                        result.list,
                        options.maxEntitiesPerArray,
                    ),
                };
            }
        } else if (
            (regex = new RegExp(FileCodeInstagram.v2_ACCOUNT_VIEWED)) &&
            regex.test(pathName)
        ) {
            result = await ServiceInstagram.parseSuggestedAccountViewed(data);
            if (result) {
                model.suggestedAccountsViewed = {
                    list: sliceIfTooLong(
                        result.list,
                        options.maxEntitiesPerArray,
                    ),
                };
            }
        } else if (
            (regex = new RegExp(FileCodeInstagram.AUTOFILL_INFO)) &&
            regex.test(pathName)
        ) {
            result = await ServiceInstagram.parseAutofillInformation(data);
            if (result) {
                model.autofillInfo = result;
            }
        } else if (
            (regex = new RegExp(FileCodeInstagram.v2_POST_COMMENT)) &&
            regex.test(pathName)
        ) {
            result = await ServiceInstagram.parseCommentsPosted(data);
            if (result) {
                model.engagement.commentsPosted =
                    (model.engagement.commentsPosted ?? 0) + result.list.length;
                model.engagement.commentsPostedTI =
                    (model.engagement.commentsPostedTI ?? 0) +
                    result.list.filter(
                        (item: CommentPostedIG) =>
                            item.date &&
                            daysDifference(item.date) < timeIntervalDays,
                    ).length;
                model.commentsPosted = {
                    list: mergeArrays(
                        model.commentsPosted?.list,
                        result.list,
                        options.maxEntitiesPerArray,
                    ),
                };
            }
        } else if (
            (regex = new RegExp(FileCodeInstagram.FOLLOWING_HASHTAGS)) &&
            regex.test(pathName)
        ) {
            result = await ServiceInstagram.parseFollowingHashtags(data);
            if (result) {
                model.engagement.followingHashtagsCounter = result.list.length;
                model.followingHashtags = {
                    list: sliceIfTooLong(
                        result.list,
                        options.maxEntitiesPerArray,
                    ),
                };
            }
        } else if (
            (regex = new RegExp(FileCodeInstagram.INFO_ADS_INTERESTS)) &&
            regex.test(pathName)
        ) {
            result = await ServiceInstagram.parseAdsInterests(data);
            if (result) {
                model.adsInterests = {
                    list: sliceIfTooLong(
                        result.list,
                        options.maxEntitiesPerArray,
                    ),
                };
            }
        } else if (
            (regex = new RegExp(FileCodeInstagram.INFO_ACCOUNT_BASED_IN)) &&
            regex.test(pathName)
        ) {
            result = await ServiceInstagram.parseLocation(data);
            if (result) {
                model.locations = result;
            }
        } else if (
            (regex = new RegExp(FileCodeInstagram.ACCOUNT_SEARCHES)) &&
            regex.test(pathName)
        ) {
            result = await ServiceInstagram.parseSearches(data);
            if (result) {
                model.searches = {
                    list: sliceIfTooLong(
                        result.list,
                        options.maxEntitiesPerArray,
                    ),
                };
            }
        } else if (
            (regex = new RegExp(FileCodeInstagram.YOUR_REEL_TOPICS)) &&
            regex.test(pathName)
        ) {
            result = await ServiceInstagram.parseReelTopics(data);
            if (result) {
                model.reelTopics = {
                    list: sliceIfTooLong(
                        result.list,
                        options.maxEntitiesPerArray,
                    ),
                };
            }
        } else if (
            (regex = new RegExp(FileCodeInstagram.YOUR_TOPICS)) &&
            regex.test(pathName)
        ) {
            result = await ServiceInstagram.parseYourTopics(data);
            if (result) {
                model.yourTopics = {
                    list: sliceIfTooLong(
                        result.list,
                        options.maxEntitiesPerArray,
                    ),
                };
            }
        } else if (
            (regex = new RegExp(FileCodeInstagram.SHOPPING_VIEWED_ITEMS)) &&
            regex.test(pathName)
        ) {
            result = await ServiceInstagram.parseShoppingViewedItems(data);
            if (result) {
                model.shoppingItemsViewed = {
                    list: sliceIfTooLong(
                        result.list,
                        options.maxEntitiesPerArray,
                    ),
                };
            }
        } else if (
            (regex = new RegExp(FileCodeInstagram.FOLLOWING_ACCOUNTS)) &&
            regex.test(pathName)
        ) {
            result = await ServiceInstagram.parseFollowingAccounts(data);
            if (result) {
                model.engagement.followingCounter = result.list.length;
            }
        } else if (
            (regex = new RegExp(FileCodeInstagram.v2_FOLLOWERS)) &&
            regex.test(pathName)
        ) {
            result = await ServiceInstagram.parseFollowers(data);
            if (result) {
                model.engagement.followersCounter =
                    (model.engagement.followersCounter ?? 0) +
                    result.list.length;
            }
        } else if (
            (regex = new RegExp(FileCodeInstagram.EMOJI_SLIDERS)) &&
            regex.test(pathName)
        ) {
            result = await ServiceInstagram.parseEmojiSliders(data);
            if (result) {
                model.engagement.emojiSliders = result.list.length;
                model.engagement.emojiSlidersTI = result.list.filter(
                    (item: EmojiSliderIG) =>
                        item.date &&
                        daysDifference(item.date) < timeIntervalDays,
                ).length;
            }
        } else if (
            (regex = new RegExp(FileCodeInstagram.LIKE_COMMENTS)) &&
            regex.test(pathName)
        ) {
            result = await ServiceInstagram.parseLikedComments(data);
            if (result) {
                model.engagement.likesComments = result.list.length;
                model.engagement.likesCommentsTI = result.list.filter(
                    (item: LikeIG) =>
                        item.date &&
                        daysDifference(item.date) < timeIntervalDays,
                ).length;
            }
        } else if (
            (regex = new RegExp(FileCodeInstagram.LIKE_POSTS)) &&
            regex.test(pathName)
        ) {
            result = await ServiceInstagram.parseLikedPosts(data);
            if (result) {
                model.engagement.likesPosts = result.list.length;
                model.engagement.likesPostsTI = result.list.filter(
                    (item: LikeIG) =>
                        item.date &&
                        daysDifference(item.date) < timeIntervalDays,
                ).length;
            }
        } else if (
            (regex = new RegExp(FileCodeInstagram.POLLS)) &&
            regex.test(pathName)
        ) {
            result = await ServiceInstagram.parsePolls(data);
            if (result) {
                model.engagement.polls = result.list.length;
                model.engagement.pollsTI = result.list.filter(
                    (item: PollIG) =>
                        item.date &&
                        daysDifference(item.date) < timeIntervalDays,
                ).length;
            }
        } else if (
            (regex = new RegExp(FileCodeInstagram.POSTS_CREATED)) &&
            regex.test(pathName)
        ) {
            result = await ServiceInstagram.parsePersonalPost(data);
            if (result) {
                model.engagement.postsCreated = result.list.length;
                model.engagement.postsCreatedTI = result.list.filter(
                    (item: PostIG) =>
                        item.date &&
                        daysDifference(item.date) < timeIntervalDays,
                ).length;
            }
        } else if (
            (regex = new RegExp(FileCodeInstagram.QUIZZES)) &&
            regex.test(pathName)
        ) {
            result = await ServiceInstagram.parseQuizzes(data);
            if (result) {
                model.engagement.quizzes = result.list.length;
                model.engagement.quizzesTI = result.list.filter(
                    (item: QuizIG) =>
                        item.date &&
                        daysDifference(item.date) < timeIntervalDays,
                ).length;
            }
        } else if (
            (regex = new RegExp(FileCodeInstagram.STORIES_CREATED)) &&
            regex.test(pathName)
        ) {
            result = await ServiceInstagram.parsePersonalStories(data);
            if (result) {
                model.engagement.storiesCreated = result.list.length;
                model.engagement.storiesCreatedTI = result.list.filter(
                    (item: StoryIG) =>
                        item.date &&
                        daysDifference(item.date) < timeIntervalDays,
                ).length;
            }
        } else if (
            (regex = new RegExp(FileCodeInstagram.v2_VIDEO_VIEWED)) &&
            regex.test(pathName)
        ) {
            result = await ServiceInstagram.parseVideoWatched(data);
            if (result) {
                model.engagement.videosViewed = result.list.length;
                model.engagement.videosViewedTI = result.list.filter(
                    (item) =>
                        item.date &&
                        daysDifference(item.date) < timeIntervalDays,
                ).length;
            }
        }
    }
}
