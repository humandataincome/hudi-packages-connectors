import { ConfigInstagram } from '../../config/config.instagram';
import {
    AccountIG,
    AccountsYouAreNotInterestedIG,
    AdsClickedIG,
    AdsInterestsIG,
    AdsViewedIG,
    AdvIG,
    ArchivedPostsIG,
    CommentPostedIG,
    CommentsPostedIG,
    ContactSyncedIG,
    ConversationIG,
    FollowersIG,
    FollowingAccountsIG,
    FollowingHashtagsIG,
    LikeIG,
    LikedCommentsIG,
    LikedPostsIG,
    LocationInformationIG,
    MediaIG,
    SearchIG,
    MessageIG,
    MusicHeardInStoriesIG,
    MusicRecentlyUsedInStoriesIG,
    PersonalInformationIG,
    PersonalPostsIG,
    PostIG,
    PostViewedIG,
    ReelSentimentsIG,
    ReelTopicsIG,
    SearchesIG,
    SuggestedAccountsViewedIG,
    SyncedContractsIG,
    YourTopicsIG,
    VideoWatchedIG,
    SentimentIG,
    TopicIG,
    EmojiSlidersIG,
    EmojiSliderIG,
    EligibilityIG,
    PollsIG,
    PollIG,
    QuizIG,
    QuizzesIG,
    PersonalStoriesIG,
    StoryIG,
    AdsUsingYourInformationIG,
    AdvUsingYourInformationIG,
    ShoppingViewedItemsIG,
    ShoppingViewedItemIG,
    AutofillInformationIG,
} from './model.instagram';
import LoggerUtils from '../../utils/logger.utils';
import { DecodingUtils } from '../../utils/decoding.utils';
import { LanguageCode } from '../../descriptor';
import { ValidatorObject } from '../../validator/validator.object';
import { FileCodeInstagram } from './enum.instagram';

/**
 * Class used to parse most important files into the directory returned by Instagram in JSON format.
 * All the files are given in input as Buffer, parsed back to JSON and then mapped into a specific interface model.
 * All functions return the relevant information (if there are any) as a promised model if the parsing is successful, undefined otherwise.
 */
export class ServiceInstagram {
    private static readonly logger = new LoggerUtils('Instagram Service');
    public static languagePrefix: LanguageCode = LanguageCode.ENGLISH;

    /**
     * Abstraction to parse an Instagram file regardless its respective parsing function
     * @param fileCode - code of the file to parse
     * @param data - file to parse as Buffer
     */
    static async parseFile(fileCode: FileCodeInstagram, data: Buffer) {
        switch (fileCode) {
            case FileCodeInstagram.PERSONAL_INFO:
                return this.parsePersonalInformation(data);
            case FileCodeInstagram.ACCOUNT_NOT_INTERESTED:
                return this.parseAccountYouAreNotInterested(data);
            case FileCodeInstagram.v2_ADS_CLICKED:
                return this.parseAdsClicked(data);
            case FileCodeInstagram.ADS_USING_YOUR_INFO:
                return this.parseAdsUsingYourInformation(data);
            case FileCodeInstagram.v2_ADS_VIEWED:
                return this.parseAdsViewed(data);
            case FileCodeInstagram.v2_POSTS_VIEWED:
                return this.parsePostViewed(data);
            case FileCodeInstagram.v2_ACCOUNT_VIEWED:
                return this.parseSuggestedAccountViewed(data);
            case FileCodeInstagram.v2_VIDEO_VIEWED:
                return this.parseVideoWatched(data);
            case FileCodeInstagram.AUTOFILL_INFO:
                return this.parseAutofillInformation(data);
            case FileCodeInstagram.POST_COMMENT:
                return this.parseCommentsPosted(data);
            case FileCodeInstagram.SYNCED_CONTACTS:
                return this.parseSyncedContracts(data);
            case FileCodeInstagram.POSTS_ARCHIVED:
                return this.parseArchivedPost(data);
            case FileCodeInstagram.POSTS_CREATED:
                return this.parsePersonalPost(data);
            case FileCodeInstagram.STORIES_CREATED:
                return this.parsePersonalStories(data);
            case FileCodeInstagram.FOLLOWERS:
                return this.parseFollowers(data);
            case FileCodeInstagram.FOLLOWING_ACCOUNTS:
                return this.parseFollowingAccounts(data);
            case FileCodeInstagram.FOLLOWING_HASHTAGS:
                return this.parseFollowingHashtags(data);
            case FileCodeInstagram.INFO_ADS_INTERESTS:
                return this.parseAdsInterests(data);
            case FileCodeInstagram.INFO_ACCOUNT_BASED_IN:
                return this.parseLocation(data);
            case FileCodeInstagram.LIKE_COMMENTS:
                return this.parseLikedComments(data);
            case FileCodeInstagram.LIKE_POSTS:
                return this.parseLikedPosts(data);
            case FileCodeInstagram.MESSAGE_REQUESTS:
            case FileCodeInstagram.MESSAGE_CONVERSATION:
                return this.parseMessages(data);
            case FileCodeInstagram.ELIGIBILITY:
                return this.parseEligibility(data);
            case FileCodeInstagram.ACCOUNT_SEARCHES:
                return this.parseSearches(data);
            case FileCodeInstagram.EMOJI_SLIDERS:
                return this.parseEmojiSliders(data);
            case FileCodeInstagram.POLLS:
                return this.parsePolls(data);
            case FileCodeInstagram.SHOPPING_VIEWED_ITEMS:
                return this.parseShoppingViewedItems(data);
            case FileCodeInstagram.QUIZZES:
                return this.parseQuizzes(data);
            case FileCodeInstagram.YOUR_REEL_SENTIMENTS:
                return this.parseReelSentiments(data);
            case FileCodeInstagram.YOUR_REEL_TOPICS:
                return this.parseReelTopics(data);
            case FileCodeInstagram.MUSIC_HEARD_HISTORY:
                return this.parseMusicHeardInStories(data);
            case FileCodeInstagram.MUSIC_USED_HISTORY:
                return this.parseMusicRecentlyUsedInStories(data);
            default:
                return undefined;
        }
    }

    /**
     * @param data - FileCodeInstagram.PERSONAL_INFO file in input as Buffer
     */
    static async parsePersonalInformation(
        data: Buffer,
    ): Promise<PersonalInformationIG | undefined> {
        const personalInfoModel: PersonalInformationIG = {};
        try {
            let parameterName;
            let match;
            const document = JSON.parse(data.toString());

            parameterName =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-1-username`
                ];
            ServiceInstagram.pathExists(parameterName, document) &&
                (personalInfoModel.username = DecodingUtils.decodeObject(
                    document.profile_user[0].string_map_data[parameterName]
                        .value,
                ));

            parameterName =
                ConfigInstagram.keyTranslation[`${this.languagePrefix}-2-name`];
            ServiceInstagram.pathExists(parameterName, document) &&
                (personalInfoModel.name = DecodingUtils.decodeObject(
                    document.profile_user[0].string_map_data[parameterName]
                        .value,
                ));

            parameterName =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-3-email`
                ];
            ServiceInstagram.pathExists(parameterName, document) &&
                (personalInfoModel.email = DecodingUtils.decodeObject(
                    document.profile_user[0].string_map_data[parameterName]
                        .value,
                ));

            parameterName =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-4-privateAccount`
                ];
            ServiceInstagram.pathExists(parameterName, document) &&
                (personalInfoModel.private =
                    document.profile_user[0].string_map_data[
                        parameterName
                    ].value.toLowerCase() === 'true');

            parameterName =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-5-birthdate`
                ];
            ServiceInstagram.pathExists(parameterName, document) &&
                (match = DecodingUtils.decodeObject(
                    document.profile_user[0].string_map_data[parameterName]
                        .value,
                ).split('-'));
            match &&
                (personalInfoModel.birthdate = new Date(
                    Date.UTC(match[0], match[1] - 1, match[2], 0, 0, 0),
                ));

            parameterName =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-6-phoneNumber`
                ];
            ServiceInstagram.pathExists(parameterName, document) &&
                (personalInfoModel.phoneNumber = DecodingUtils.decodeObject(
                    document.profile_user[0].string_map_data[parameterName]
                        .value,
                ));

            parameterName =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-7-biography`
                ];
            ServiceInstagram.pathExists(parameterName, document) &&
                (personalInfoModel.biography = DecodingUtils.decodeObject(
                    document.profile_user[0].string_map_data[parameterName]
                        .value,
                ));

            parameterName =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-8-gender`
                ];
            ServiceInstagram.pathExists(parameterName, document) &&
                (personalInfoModel.gender = DecodingUtils.decodeObject(
                    document.profile_user[0].string_map_data[parameterName]
                        .value,
                ));

            return !ValidatorObject.objectIsEmpty(personalInfoModel)
                ? personalInfoModel
                : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parsePersonalInformation');
            return undefined;
        }
    }

    private static pathExists(parameterName: string, document: any): boolean {
        return !!(
            document.profile_user &&
            document.profile_user[0].string_map_data &&
            document.profile_user[0].string_map_data[parameterName] &&
            document.profile_user[0].string_map_data[parameterName].value
        );
    }

    /**
     * @param data - FileCodeInstagram.INFO_ACCOUNT_BASED_IN file in input as Buffer
     */
    static async parseLocation(
        data: Buffer,
    ): Promise<LocationInformationIG | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const parameterName =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-9-cityName`
                ];
            const model: LocationInformationIG = {};
            document.inferred_data_primary_location &&
                document.inferred_data_primary_location[0].string_map_data &&
                document.inferred_data_primary_location[0].string_map_data[
                    parameterName
                ] &&
                document.inferred_data_primary_location[0].string_map_data[
                    parameterName
                ].value &&
                (model.basedIn = DecodingUtils.decodeObject(
                    document.inferred_data_primary_location[0].string_map_data[
                        parameterName
                    ].value,
                ));
            return !ValidatorObject.objectIsEmpty(model) ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseLocation');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeInstagram.ADS_CLICKED file in input as Buffer
     */
    static async parseAdsClicked(
        data: Buffer,
    ): Promise<AdsClickedIG | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const model: AdsClickedIG = { list: [] };
            model.list = document.impressions_history_ads_clicked.map(
                (value: any) => {
                    const newItem: AdvIG = {};
                    value.title &&
                        (newItem.title = DecodingUtils.decodeObject(
                            value.title,
                        ));
                    value.string_list_data &&
                        value.string_list_data[0].timestamp &&
                        (newItem.date = new Date(
                            1000 * value.string_list_data[0].timestamp,
                        ));
                    return newItem;
                },
            );
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseAdsClicked');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeInstagram.ADS_VIEWED file in input as Buffer
     */
    static async parseAdsViewed(
        data: Buffer,
    ): Promise<AdsViewedIG | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const parameterName1 =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-10-author`
                ];
            const parameterName2 =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-11-time`
                ];
            const model: AdsViewedIG = { list: [] };
            model.list = document.impressions_history_ads_seen.map(
                (value: any) => {
                    const newItem: AdvIG = {};
                    value.string_map_data &&
                        value.string_map_data[parameterName1].value &&
                        (newItem.title = DecodingUtils.decodeObject(
                            value.string_map_data[parameterName1].value,
                        ));
                    value.string_map_data &&
                        value.string_map_data[parameterName2].timestamp &&
                        (newItem.date = new Date(
                            1000 *
                                value.string_map_data[parameterName2].timestamp,
                        ));
                    return newItem;
                },
            );
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseAdsViewed');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeInstagram.INFO_ADS_INTERESTS file in input as Buffer
     */
    static async parseAdsInterests(
        data: Buffer,
    ): Promise<AdsInterestsIG | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const parameterName =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-12-interest`
                ];
            const model: AdsInterestsIG = { list: [] };
            model.list = document.inferred_data_ig_interest.map(
                (value: any) => {
                    const newItem: AdvIG = {};
                    value.string_map_data &&
                        value.string_map_data[parameterName].value &&
                        (newItem.title = DecodingUtils.decodeObject(
                            value.string_map_data[parameterName].value,
                        ));
                    return newItem;
                },
            );
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseAdsInterests');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeInstagram.MUSIC_HEARD_HISTORY file in input as Buffer
     */
    static async parseMusicHeardInStories(
        data: Buffer,
    ): Promise<MusicHeardInStoriesIG | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const parameterName1 =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-13-song`
                ];
            const parameterName2 =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-14-artist`
                ];
            const parameterName3 =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-15-time`
                ];
            const model: MusicHeardInStoriesIG = { list: [] };
            model.list =
                document.impressions_history_music_heard_in_stories.map(
                    (value: any) => {
                        const newItem: MediaIG = {};
                        value.string_map_data &&
                            value.string_map_data[parameterName1].value &&
                            (newItem.title = DecodingUtils.decodeObject(
                                value.string_map_data[parameterName1].value,
                            ));
                        value.string_map_data &&
                            value.string_map_data[parameterName2].value &&
                            (newItem.artist = DecodingUtils.decodeObject(
                                value.string_map_data[parameterName2].value,
                            ));
                        value.string_map_data &&
                            value.string_map_data[parameterName3].timestamp &&
                            (newItem.date = new Date(
                                1000 *
                                    value.string_map_data[parameterName3]
                                        .timestamp,
                            ));
                        return newItem;
                    },
                );
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseMusicHeardInStories');
            return undefined;
        }
    }

    /**
     * @param data - file FileCodeInstagram.MUSIC_USED_HISTORY in input as Buffer
     */
    static async parseMusicRecentlyUsedInStories(
        data: Buffer,
    ): Promise<MusicRecentlyUsedInStoriesIG | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const parameterName1 =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-16-song`
                ];
            const parameterName2 =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-17-artist`
                ];
            const parameterName3 =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-18-time`
                ];
            const model: MusicHeardInStoriesIG = { list: [] };
            model.list =
                document.impressions_history_music_recently_used_in_stories.map(
                    (value: any) => {
                        const newItem: MediaIG = {};
                        value.string_map_data &&
                            value.string_map_data[parameterName1].value &&
                            (newItem.title = DecodingUtils.decodeObject(
                                value.string_map_data[parameterName1].value,
                            ));
                        value.string_map_data &&
                            value.string_map_data[parameterName2].value &&
                            (newItem.artist = DecodingUtils.decodeObject(
                                value.string_map_data[parameterName2].value,
                            ));
                        value.string_map_data &&
                            value.string_map_data[parameterName3].timestamp &&
                            (newItem.date = new Date(
                                1000 *
                                    value.string_map_data[parameterName3]
                                        .timestamp,
                            ));
                        return newItem;
                    },
                );
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log(
                'error',
                `${error}`,
                'parseMusicRecentlyUsedInStories',
            );
            return undefined;
        }
    }

    /**
     * @param data - FileCodeInstagram.POSTS_VIEWED file in input as Buffer
     */
    static async parsePostViewed(
        data: Buffer,
    ): Promise<PostViewedIG | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const parameterName1 =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-19-author`
                ];
            const parameterName2 =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-20-time`
                ];
            const model: PostViewedIG = { list: [] };
            model.list = document.impressions_history_posts_seen.map(
                (value: any) => {
                    const newItem: PostIG = {};
                    value.string_map_data &&
                        value.string_map_data[parameterName1].value &&
                        (newItem.title = DecodingUtils.decodeObject(
                            value.string_map_data[parameterName1].value,
                        ));
                    value.string_map_data &&
                        value.string_map_data[parameterName2].timestamp &&
                        (newItem.date = new Date(
                            1000 *
                                value.string_map_data[parameterName2].timestamp,
                        ));
                    return newItem;
                },
            );
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parsePostViewed');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeInstagram.VIDEO_VIEWED file in input as Buffer
     */
    static async parseVideoWatched(
        data: Buffer,
    ): Promise<VideoWatchedIG | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const parameterName1 =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-21-author`
                ];
            const parameterName2 =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-22-time`
                ];
            const model: VideoWatchedIG = { list: [] };
            model.list = document.impressions_history_videos_watched.map(
                (value: any) => {
                    const newItem: MediaIG = {};
                    value.string_map_data &&
                        value.string_map_data[parameterName1].value &&
                        (newItem.title = DecodingUtils.decodeObject(
                            value.string_map_data[parameterName1].value,
                        ));
                    value.string_map_data &&
                        value.string_map_data[parameterName2].timestamp &&
                        (newItem.date = new Date(
                            1000 *
                                value.string_map_data[parameterName2].timestamp,
                        ));
                    return newItem;
                },
            );
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseVideoWatched');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeInstagram.ACCOUNT_VIEWED file in input as Buffer
     */
    static async parseSuggestedAccountViewed(
        data: Buffer,
    ): Promise<SuggestedAccountsViewedIG | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const parameterName1 =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-23-username`
                ];
            const parameterName2 =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-24-time`
                ];
            const model: SuggestedAccountsViewedIG = { list: [] };
            model.list = document.impressions_history_chaining_seen.map(
                (value: any) => {
                    const newItem: AccountIG = {};
                    value.string_map_data &&
                        value.string_map_data[parameterName1].value &&
                        (newItem.name = DecodingUtils.decodeObject(
                            value.string_map_data[parameterName1].value,
                        ));
                    value.string_map_data &&
                        value.string_map_data[parameterName2].timestamp &&
                        (newItem.date = new Date(
                            1000 *
                                value.string_map_data[parameterName2].timestamp,
                        ));
                    return newItem;
                },
            );
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseSuggestedAccountViewed');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeInstagram.ACCOUNT_NOT_INTERESTED file in input as Buffer
     */
    static async parseAccountYouAreNotInterested(
        data: Buffer,
    ): Promise<AccountsYouAreNotInterestedIG | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const parameterName1 =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-25-username`
                ];
            const parameterName2 =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-26-dateAndTime`
                ];
            const model: AccountsYouAreNotInterestedIG = { list: [] };
            model.list = document.impressions_history_recs_hidden_authors.map(
                (value: any) => {
                    const newItem: AccountIG = {};
                    value.string_map_data &&
                        value.string_map_data[parameterName1].value &&
                        (newItem.name = DecodingUtils.decodeObject(
                            value.string_map_data[parameterName1].value,
                        ));
                    value.string_map_data &&
                        value.string_map_data[parameterName2].timestamp &&
                        (newItem.date = new Date(
                            1000 *
                                value.string_map_data[parameterName2].timestamp,
                        ));
                    return newItem;
                },
            );
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log(
                'error',
                `${error}`,
                'parseAccountYouAreNotInterested',
            );
            return undefined;
        }
    }

    /**
     * @param data - FileCodeInstagram.POST_COMMENT file in input as Buffer
     */
    static async parseCommentsPosted(
        data: Buffer,
    ): Promise<CommentsPostedIG | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const model: CommentsPostedIG = { list: [] };
            model.list = document.comments_media_comments.map((value: any) => {
                const newItem: CommentPostedIG = {};
                value.title &&
                    (newItem.toUser = DecodingUtils.decodeObject(value.title));
                value.string_list_data &&
                    value.string_list_data[0].value &&
                    (newItem.text = DecodingUtils.decodeObject(
                        value.string_list_data[0].value,
                    ));
                value.string_list_data &&
                    value.string_list_data[0].timestamp &&
                    (newItem.date = new Date(
                        1000 * value.string_list_data[0].timestamp,
                    ));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseCommentsPosted');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeInstagram.SYNCED_CONTACTS file in input as Buffer
     */
    static async parseSyncedContracts(
        data: Buffer,
    ): Promise<SyncedContractsIG | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const parameterName1 =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-27-name`
                ];
            const parameterName2 =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-28-secondName`
                ];
            const parameterName3 =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-29-contactInfo`
                ];
            const model: SyncedContractsIG = { list: [] };
            model.list = document.contacts_contact_info.map((value: any) => {
                const newItem: ContactSyncedIG = {};
                value.string_map_data &&
                    value.string_map_data[parameterName1].value &&
                    (newItem.firstName = DecodingUtils.decodeObject(
                        value.string_map_data[parameterName1].value,
                    ));
                value.string_map_data &&
                    value.string_map_data[parameterName2].value &&
                    (newItem.secondName = DecodingUtils.decodeObject(
                        value.string_map_data[parameterName2].value,
                    ));
                value.string_map_data &&
                    value.string_map_data[parameterName3].value &&
                    (newItem.contactInfo = DecodingUtils.decodeObject(
                        value.string_map_data[parameterName3].value,
                    ));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseSyncedContracts');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeInstagram.POSTS_ARCHIVED file in input as Buffer
     */
    static async parseArchivedPost(
        data: Buffer,
    ): Promise<ArchivedPostsIG | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const model: ArchivedPostsIG = { list: [] };
            model.list = document.ig_archived_post_media.map((value: any) => {
                const newItem: PostIG = {};
                value.media &&
                    value.media[0].uri &&
                    (newItem.uri = DecodingUtils.decodeObject(
                        value.media[0].uri,
                    ));
                value.media &&
                    value.media[0].creation_timestamp &&
                    (newItem.date = new Date(
                        1000 * value.media[0].creation_timestamp,
                    ));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseArchivedPost');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeInstagram.POSTS_CREATED file in input as Buffer
     */
    static async parsePersonalPost(
        data: Buffer,
    ): Promise<PersonalPostsIG | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const model: PersonalPostsIG = { list: [] };
            model.list = document.map((value: any) => {
                const newItem: PostIG = {};
                value.media &&
                    value.media[0].uri &&
                    (newItem.uri = DecodingUtils.decodeObject(
                        value.media[0].uri,
                    ));
                value.media &&
                    value.media[0].title &&
                    (newItem.title = DecodingUtils.decodeObject(
                        value.media[0].title,
                    ));
                value.media &&
                    value.media[0].creation_timestamp &&
                    (newItem.date = new Date(
                        1000 * value.media[0].creation_timestamp,
                    ));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parsePersonalPost');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeInstagram.STORIES_CREATED file in input as Buffer
     */
    static async parsePersonalStories(
        data: Buffer,
    ): Promise<PersonalStoriesIG | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const model: PersonalStoriesIG = { list: [] };
            model.list = document.ig_stories.map((value: any) => {
                const newItem: StoryIG = {};
                value.uri &&
                    (newItem.uri = DecodingUtils.decodeObject(value.uri));
                value.title &&
                    (newItem.title = DecodingUtils.decodeObject(value.title));
                value.creation_timestamp &&
                    (newItem.date = new Date(1000 * value.creation_timestamp));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parsePersonalStories');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeInstagram.FOLLOWERS file in input as Buffer
     */
    static async parseFollowers(
        data: Buffer,
    ): Promise<FollowersIG | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const model: FollowersIG = { list: [] };
            model.list = document.relationships_followers.map((value: any) => {
                const newItem: AccountIG = {};
                value.string_list_data &&
                    value.string_list_data[0].href &&
                    (newItem.href = DecodingUtils.decodeObject(
                        value.string_list_data[0].href,
                    ));
                value.string_list_data &&
                    value.string_list_data[0].value &&
                    (newItem.name = DecodingUtils.decodeObject(
                        value.string_list_data[0].value,
                    ));
                value.string_list_data &&
                    value.string_list_data[0].timestamp &&
                    (newItem.date = new Date(
                        1000 * value.string_list_data[0].timestamp,
                    ));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseFollowers');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeInstagram.FOLLOWING_ACCOUNTS file in input as Buffer
     */
    static async parseFollowingAccounts(
        data: Buffer,
    ): Promise<FollowingAccountsIG | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const model: FollowingAccountsIG = { list: [] };
            model.list = document.relationships_following.map((value: any) => {
                const newItem: AccountIG = {};
                value.string_list_data &&
                    value.string_list_data[0].href &&
                    (newItem.href = DecodingUtils.decodeObject(
                        value.string_list_data[0].href,
                    ));
                value.string_list_data &&
                    value.string_list_data[0].value &&
                    (newItem.name = DecodingUtils.decodeObject(
                        value.string_list_data[0].value,
                    ));
                value.string_list_data &&
                    value.string_list_data[0].timestamp &&
                    (newItem.date = new Date(
                        1000 * value.string_list_data[0].timestamp,
                    ));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseFollowingAccounts');
            return undefined;
        }
    }

    /**
     * @param data - file 'followers_and_following/following_hashtags.json' in input as Buffer
     */
    static async parseFollowingHashtags(
        data: Buffer,
    ): Promise<FollowingHashtagsIG | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const model: FollowingAccountsIG = { list: [] };
            model.list = document.relationships_following_hashtags.map(
                (value: any) => {
                    const newItem: AccountIG = {};
                    value.string_list_data &&
                        value.string_list_data[0].href &&
                        (newItem.href = DecodingUtils.decodeObject(
                            value.string_list_data[0].href,
                        ));
                    value.string_list_data &&
                        value.string_list_data[0].value &&
                        (newItem.name = DecodingUtils.decodeObject(
                            value.string_list_data[0].value,
                        ));
                    value.string_list_data &&
                        value.string_list_data[0].timestamp &&
                        (newItem.date = new Date(
                            1000 * value.string_list_data[0].timestamp,
                        ));
                    return newItem;
                },
            );
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseFollowingHashtags');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeInstagram.LIKE_POSTS file in input as Buffer
     */
    static async parseLikedPosts(
        data: Buffer,
    ): Promise<LikedPostsIG | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const model: LikedPostsIG = { list: [] };
            model.list = document.likes_media_likes.map((value: any) => {
                const newItem: LikeIG = {};
                value.title &&
                    (newItem.title = DecodingUtils.decodeObject(value.title));
                value.string_list_data &&
                    value.string_list_data[0].href &&
                    (newItem.href = DecodingUtils.decodeObject(
                        value.string_list_data[0].href,
                    ));
                value.string_list_data &&
                    value.string_list_data[0].value &&
                    (newItem.emoticon = DecodingUtils.decodeObject(
                        value.string_list_data[0].value,
                    ));
                value.string_list_data &&
                    value.string_list_data[0].timestamp &&
                    (newItem.date = new Date(
                        1000 * value.string_list_data[0].timestamp,
                    ));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseLikedPosts');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeInstagram.LIKE_COMMENTS file in input as Buffer
     */
    static async parseLikedComments(
        data: Buffer,
    ): Promise<LikedCommentsIG | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const model: LikedCommentsIG = { list: [] };
            model.list = document.likes_comment_likes.map((value: any) => {
                const newItem: LikeIG = {};
                value.title &&
                    (newItem.title = DecodingUtils.decodeObject(value.title));
                value.string_list_data &&
                    value.string_list_data[0].href &&
                    (newItem.href = DecodingUtils.decodeObject(
                        value.string_list_data[0].href,
                    ));
                value.string_list_data &&
                    value.string_list_data[0].value &&
                    (newItem.emoticon = DecodingUtils.decodeObject(
                        value.string_list_data[0].value,
                    ));
                value.string_list_data &&
                    value.string_list_data[0].timestamp &&
                    (newItem.date = new Date(
                        1000 * value.string_list_data[0].timestamp,
                    ));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseLikedComments');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeInstagram.ACCOUNT_SEARCHES file in input as Buffer
     */
    static async parseSearches(data: Buffer): Promise<SearchesIG | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const parameterName1 =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-30-search`
                ];
            const parameterName2 =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-31-time`
                ];
            const model: SearchesIG = { list: [] };
            model.list = document.searches_user.map((value: any) => {
                const newItem: SearchIG = {};
                value.string_map_data &&
                    value.string_map_data[parameterName1].value &&
                    (newItem.text = DecodingUtils.decodeObject(
                        value.string_map_data[parameterName1].value,
                    ));
                value.string_map_data &&
                    value.string_map_data[parameterName2].timestamp &&
                    (newItem.date = new Date(
                        1000 * value.string_map_data[parameterName2].timestamp,
                    ));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseSearches');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeInstagram.YOUR_REEL_SENTIMENTS file in input as Buffer
     */
    static async parseReelSentiments(
        data: Buffer,
    ): Promise<ReelSentimentsIG | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const parameterName =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-32-name`
                ];
            const model: ReelSentimentsIG = { list: [] };
            model.list = document.topics_your_reels_emotions.map(
                (value: any) => {
                    const newItem: SentimentIG = {};
                    value.string_map_data &&
                        value.string_map_data[parameterName].value &&
                        (newItem.value = DecodingUtils.decodeObject(
                            value.string_map_data[parameterName].value,
                        ));
                    return newItem;
                },
            );
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseReelSentiments');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeInstagram.YOUR_REEL_TOPICS file in input as Buffer
     */
    static async parseReelTopics(
        data: Buffer,
    ): Promise<ReelTopicsIG | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const parameterName =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-33-name`
                ];
            const model: ReelTopicsIG = { list: [] };
            model.list = document.topics_your_reels_topics.map((value: any) => {
                const newItem: TopicIG = {};
                value.string_map_data &&
                    value.string_map_data[parameterName].value &&
                    (newItem.value = DecodingUtils.decodeObject(
                        value.string_map_data[parameterName].value,
                    ));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseReelTopics');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeInstagram.YOUR_TOPICS file in input as Buffer
     */
    static async parseYourTopics(
        data: Buffer,
    ): Promise<YourTopicsIG | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const parameterName =
                ConfigInstagram.keyTranslation[
                    `${this.languagePrefix}-34-name`
                ];
            const model: YourTopicsIG = { list: [] };
            model.list = document.topics_your_topics.map((value: any) => {
                const newItem: TopicIG = {};
                value.string_map_data &&
                    value.string_map_data[parameterName].value &&
                    (newItem.value = DecodingUtils.decodeObject(
                        value.string_map_data[parameterName].value,
                    ));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseTopics');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeInstagram.EMOJI_SLIDERS file in input as Buffer
     */
    static async parseEmojiSliders(
        data: Buffer,
    ): Promise<EmojiSlidersIG | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const model: EmojiSlidersIG = { list: [] };
            model.list = document.story_activities_emoji_sliders.map(
                (value: any) => {
                    const newItem: EmojiSliderIG = {};
                    value.title &&
                        (newItem.title = DecodingUtils.decodeObject(
                            value.title,
                        ));
                    value.string_list_data &&
                        value.string_list_data[0] &&
                        value.string_list_data[0].timestamp &&
                        (newItem.date = new Date(
                            1000 * value.string_list_data[0].timestamp,
                        ));
                    return newItem;
                },
            );
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseEmojiSliders');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeInstagram.POLLS file in input as Buffer
     */
    static async parsePolls(data: Buffer): Promise<PollsIG | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const model: PollsIG = { list: [] };
            model.list = document.story_activities_polls.map((value: any) => {
                const newItem: PollIG = {};
                value.title &&
                    (newItem.title = DecodingUtils.decodeObject(value.title));
                value.string_list_data &&
                    value.string_list_data[0] &&
                    value.string_list_data[0].timestamp &&
                    (newItem.date = new Date(
                        1000 * value.string_list_data[0].timestamp,
                    ));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parsePolls');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeInstagram.QUIZZES file in input as Buffer
     */
    static async parseQuizzes(data: Buffer): Promise<QuizzesIG | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const model: QuizzesIG = { list: [] };
            model.list = document.story_activities_quizzes.map((value: any) => {
                const newItem: QuizIG = {};
                value.title &&
                    (newItem.title = DecodingUtils.decodeObject(value.title));
                value.string_list_data &&
                    value.string_list_data[0] &&
                    value.string_list_data[0].timestamp &&
                    (newItem.date = new Date(
                        1000 * value.string_list_data[0].timestamp,
                    ));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseQuizzes');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeInstagram.ELIGIBILITY file in input as Buffer
     */
    static async parseEligibility(
        data: Buffer,
    ): Promise<EligibilityIG | undefined> {
        try {
            const eligibility: EligibilityIG = {};
            let parameterName;
            const document = JSON.parse(data.toString());
            if (
                document.monetization_eligibility &&
                document.monetization_eligibility[0] &&
                document.monetization_eligibility[0].string_map_data
            ) {
                parameterName =
                    ConfigInstagram.keyTranslation[
                        `${this.languagePrefix}-35-productName`
                    ];
                if (
                    document.monetization_eligibility[0].string_map_data[
                        parameterName
                    ] &&
                    document.monetization_eligibility[0].string_map_data[
                        parameterName
                    ].value
                ) {
                    eligibility.value = DecodingUtils.decodeObject(
                        document.monetization_eligibility[0].string_map_data[
                            parameterName
                        ].value,
                    );
                }
                parameterName =
                    ConfigInstagram.keyTranslation[
                        `${this.languagePrefix}-36-decision`
                    ];
                if (
                    document.monetization_eligibility[0].string_map_data[
                        parameterName
                    ] &&
                    document.monetization_eligibility[0].string_map_data[
                        parameterName
                    ].value
                ) {
                    eligibility.decision = DecodingUtils.decodeObject(
                        document.monetization_eligibility[0].string_map_data[
                            parameterName
                        ].value,
                    );
                }
                parameterName =
                    ConfigInstagram.keyTranslation[
                        `${this.languagePrefix}-37-reason`
                    ];
                if (
                    document.monetization_eligibility[0].string_map_data[
                        parameterName
                    ] &&
                    document.monetization_eligibility[0].string_map_data[
                        parameterName
                    ].value
                ) {
                    eligibility.reason = DecodingUtils.decodeObject(
                        document.monetization_eligibility[0].string_map_data[
                            parameterName
                        ].value,
                    );
                }
                return !ValidatorObject.objectIsEmpty(eligibility)
                    ? eligibility
                    : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseEligibility');
            return undefined;
        }
    }

    /**
     * @param data - file FileCodeInstagram.MESSAGE_REQUESTS or FileCodeInstagram.MESSAGE_CONVERSATION in input as Buffer
     */
    static async parseMessages(
        data: Buffer,
    ): Promise<ConversationIG | undefined> {
        try {
            const document = JSON.parse(data.toString());
            let messages: MessageIG[] = [];
            document.messages &&
                (messages = document.messages.map((value: any) => {
                    const model: MessageIG = {};
                    value.sender_name &&
                        (model.senderName = DecodingUtils.decodeObject(
                            value.sender_name,
                        ));
                    value.content &&
                        (model.content = DecodingUtils.decodeObject(
                            value.content,
                        ));
                    value.type &&
                        (model.type = DecodingUtils.decodeObject(value.type));
                    value.is_unsent && (model.isUnsent = value.is_unsent);
                    value.share &&
                        value.share.link &&
                        (model.link = DecodingUtils.decodeObject(
                            value.share.link,
                        ));
                    value.timestamp_ms &&
                        (model.date = new Date(value.timestamp_ms));
                    return model;
                }));
            let participants: string[] = [];
            document.participants &&
                (participants = document.participants.map((value: any) =>
                    DecodingUtils.decodeObject(value.name),
                ));

            const conversationModel: ConversationIG = {};
            document.title &&
                (conversationModel.title = DecodingUtils.decodeObject(
                    document.title,
                ));
            messages && (conversationModel.listMessages = messages);
            participants && (conversationModel.participants = participants);
            document.is_still_participant &&
                (conversationModel.isStillParticipant =
                    document.is_still_participant);

            return !ValidatorObject.objectIsEmpty(conversationModel)
                ? conversationModel
                : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseMessages');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeInstagram.ADS_USING_YOUR_INFO file in input as Buffer
     */
    static async parseAdsUsingYourInformation(
        data: Buffer,
    ): Promise<AdsUsingYourInformationIG | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const model: AdsUsingYourInformationIG = { list: [] };
            model.list = document.ig_custom_audiences_all_types.map(
                (value: any) => {
                    const newItem: AdvUsingYourInformationIG = {};
                    value.advertiser_name &&
                        (newItem.advertiserName = DecodingUtils.decodeObject(
                            value.advertiser_name,
                        ));
                    value.has_data_file_custom_audience !== undefined &&
                        (newItem.hasDataFileCustomAudience =
                            value.has_data_file_custom_audience);
                    value.has_remarketing_custom_audience !== undefined &&
                        (newItem.hasRemarketingCustomAudience =
                            value.has_remarketing_custom_audience);
                    value.has_in_person_store_visit !== undefined &&
                        (newItem.hasInPersonStoreVisit =
                            value.has_in_person_store_visit);
                    return newItem;
                },
            );
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log(
                'error',
                `${error}`,
                'parseAdsUsingYourInformation',
            );
            return undefined;
        }
    }

    /**
     * @param data - file FileCodeInstagram.SHOPPING_VIEWED_ITEMS in input as Buffer
     */
    static async parseShoppingViewedItems(
        data: Buffer,
    ): Promise<ShoppingViewedItemsIG | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const model: ShoppingViewedItemsIG = { list: [] };
            let parameterName;
            model.list = document.checkout_saved_recently_viewed_products.map(
                (value: any) => {
                    const newItem: ShoppingViewedItemIG = {};
                    parameterName =
                        ConfigInstagram.keyTranslation[
                            `${this.languagePrefix}-38-productID`
                        ];
                    if (
                        value.string_map_data[parameterName] &&
                        value.string_map_data[parameterName].value
                    ) {
                        newItem.productID = DecodingUtils.decodeObject(
                            value.string_map_data[parameterName].value,
                        );
                    }
                    parameterName =
                        ConfigInstagram.keyTranslation[
                            `${this.languagePrefix}-39-productName`
                        ];
                    if (
                        value.string_map_data[parameterName] &&
                        value.string_map_data[parameterName].value
                    ) {
                        newItem.productName = DecodingUtils.decodeObject(
                            value.string_map_data[parameterName].value,
                        );
                    }
                    parameterName =
                        ConfigInstagram.keyTranslation[
                            `${this.languagePrefix}-40-handlerID`
                        ];
                    if (
                        value.string_map_data[parameterName] &&
                        value.string_map_data[parameterName].value
                    ) {
                        newItem.handlerID = DecodingUtils.decodeObject(
                            value.string_map_data[parameterName].value,
                        );
                    }
                    parameterName =
                        ConfigInstagram.keyTranslation[
                            `${this.languagePrefix}-41-handlerName`
                        ];
                    if (
                        value.string_map_data[parameterName] &&
                        value.string_map_data[parameterName].value
                    ) {
                        newItem.handlerName = DecodingUtils.decodeObject(
                            value.string_map_data[parameterName].value,
                        );
                    }
                    return newItem;
                },
            );
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseShoppingViewedItems');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeInstagram.AUTOFILL_INFO file in input as Buffer
     */
    static async parseAutofillInformation(
        data: Buffer,
    ): Promise<AutofillInformationIG | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const model: AutofillInformationIG = {};
            if (document && document.ig_autofill_data) {
                document.ig_autofill_data.tel &&
                    (model.tel = document.ig_autofill_data.tel);
                document.ig_autofill_data.tel_country_code &&
                    (model.telCountryCode =
                        document.ig_autofill_data.tel_country_code);
                document.ig_autofill_data.tel_national &&
                    (model.telNational =
                        document.ig_autofill_data.tel_national);
                document.ig_autofill_data.tel_area_code &&
                    (model.telAreaCode =
                        document.ig_autofill_data.tel_area_code);
                document.ig_autofill_data.tel_local &&
                    (model.telLocal = document.ig_autofill_data.tel_local);
                document.ig_autofill_data.tel_local_prefix &&
                    (model.telLocalPrefix =
                        document.ig_autofill_data.tel_local_prefix);
                document.ig_autofill_data.tel_local_suffix &&
                    (model.telLocalSuffix =
                        document.ig_autofill_data.tel_local_suffix);
                document.ig_autofill_data.street_address &&
                    (model.streetAddress =
                        document.ig_autofill_data.street_address);
                document.ig_autofill_data.address_line1 &&
                    (model.streetLine1 =
                        document.ig_autofill_data.address_line1);
                document.ig_autofill_data.address_line2 &&
                    (model.streetLine2 =
                        document.ig_autofill_data.address_line2);
                document.ig_autofill_data.address_line3 &&
                    (model.streetLine3 =
                        document.ig_autofill_data.address_line3);
                document.ig_autofill_data.address_level1 &&
                    (model.streetLevel1 =
                        document.ig_autofill_data.address_level1);
                document.ig_autofill_data.address_level2 &&
                    (model.streetLevel2 =
                        document.ig_autofill_data.address_level2);
                document.ig_autofill_data.address_level3 &&
                    (model.streetLevel3 =
                        document.ig_autofill_data.address_level3);
                document.ig_autofill_data.address_level4 &&
                    (model.streetLevel4 =
                        document.ig_autofill_data.address_level4);
                document.ig_autofill_data.country &&
                    (model.country = document.ig_autofill_data.country);
                document.ig_autofill_data.country_name &&
                    (model.countryName =
                        document.ig_autofill_data.country_name);
                document.ig_autofill_data.postal_code &&
                    (model.postalCode = document.ig_autofill_data.postal_code);
                document.ig_autofill_data.email &&
                    (model.email = document.ig_autofill_data.email);
                document.ig_autofill_data.family_name &&
                    (model.familyName = document.ig_autofill_data.family_name);
                document.ig_autofill_data.given_name &&
                    (model.givenName = document.ig_autofill_data.given_name);
            }
            return !ValidatorObject.objectIsEmpty(model) ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseAutofillInformation');
            return undefined;
        }
    }
}
