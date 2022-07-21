import {ConfigInstagram} from "../../config/config.instagram";
import {
    AccountIG,
    AccountYouAreNotInterestedIG,
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
    SuggestedAccountViewedIG,
    SyncedContractsIG,
    TopicsIG,
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
    ShoppingViewedItemIG, AutofillInformationIG
} from "./model.instagram";
import Logger from "../../utils/logger";
import {Decoding} from "../../utils/decoding";
import {LanguageCode} from "../../descriptor";
import {ValidatorObject} from "../../utils/validator/validator.object";

/**
 * Class used to parse most important files into the directory returned by Instagram in JSON format.
 * All the files are given in input as Buffer, parsed back to JSON and then mapped into a specific interface model.
 * All functions return the relevant information (if there are any) as a promised model if the parsing is successful, undefined otherwise.
 */
export class ServiceInstagram {
    private static readonly logger = new Logger("Instagram Service");
    public static languagePrefix: LanguageCode = LanguageCode.ENGLISH;

    /**
     * @param data - file 'account_information/personal_information.json' in input as Buffer
     */
    static async parsePersonalInformation(data: Buffer): Promise<PersonalInformationIG | undefined> {
        let personalInfoModel: PersonalInformationIG = {};
        try {
            let parameterName, match;
            let document = JSON.parse(data.toString());

            parameterName = ConfigInstagram.keyTranslation[`${this.languagePrefix}-1-username`];
            (ServiceInstagram.pathExists(parameterName, document)) && (personalInfoModel.username = Decoding.decodeObject(document.profile_user[0].string_map_data[parameterName].value));

            parameterName = ConfigInstagram.keyTranslation[`${this.languagePrefix}-2-name`];
            (ServiceInstagram.pathExists(parameterName, document)) && (personalInfoModel.name = Decoding.decodeObject(document.profile_user[0].string_map_data[parameterName].value));

            parameterName = ConfigInstagram.keyTranslation[`${this.languagePrefix}-3-email`];
            (ServiceInstagram.pathExists(parameterName, document)) && (personalInfoModel.email = Decoding.decodeObject(document.profile_user[0].string_map_data[parameterName].value));

            parameterName = ConfigInstagram.keyTranslation[`${this.languagePrefix}-4-privateAccount`];
            (ServiceInstagram.pathExists(parameterName, document)) && (personalInfoModel.private = document.profile_user[0].string_map_data[parameterName].value.toLowerCase() === 'true');

            parameterName = ConfigInstagram.keyTranslation[`${this.languagePrefix}-5-birthdate`];
            (ServiceInstagram.pathExists(parameterName, document)) && (match = Decoding.decodeObject(document.profile_user[0].string_map_data[parameterName].value).split('-'));
            match && (personalInfoModel.birthdate = new Date(Date.UTC(match[0], match[1]-1, match[2], 0, 0, 0)));

            parameterName = ConfigInstagram.keyTranslation[`${this.languagePrefix}-6-phoneNumber`];
            (ServiceInstagram.pathExists(parameterName, document)) && (personalInfoModel.phoneNumber = Decoding.decodeObject(document.profile_user[0].string_map_data[parameterName].value));

            parameterName = ConfigInstagram.keyTranslation[`${this.languagePrefix}-7-biography`];
            (ServiceInstagram.pathExists(parameterName, document)) && (personalInfoModel.biography = Decoding.decodeObject(document.profile_user[0].string_map_data[parameterName].value));

            parameterName = ConfigInstagram.keyTranslation[`${this.languagePrefix}-8-gender`];
            (ServiceInstagram.pathExists(parameterName, document)) && (personalInfoModel.gender = Decoding.decodeObject(document.profile_user[0].string_map_data[parameterName].value));

            return !ValidatorObject.objectIsEmpty(personalInfoModel) ? personalInfoModel : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parsePersonalInformation');
            return undefined;
        }
    }

    private static pathExists(parameterName: string, document: any): boolean {
        return !!(document.profile_user && document.profile_user[0].string_map_data && document.profile_user[0].string_map_data[parameterName] && document.profile_user[0].string_map_data[parameterName].value);
    }

    /**
     * @param data - file 'information_about_you/account_based_in.json' in input as Buffer
     */
    static async parseLocation(data: Buffer): Promise<LocationInformationIG | undefined>{
        try {
            let document = JSON.parse(data.toString());
            let parameterName = ConfigInstagram.keyTranslation[`${this.languagePrefix}-9-cityName`];
            let model: LocationInformationIG = {};
            (document.inferred_data_primary_location &&
                document.inferred_data_primary_location[0].string_map_data &&
                document.inferred_data_primary_location[0].string_map_data[parameterName] &&
                document.inferred_data_primary_location[0].string_map_data[parameterName].value) &&
            (model.basedIn = Decoding.decodeObject(document.inferred_data_primary_location[0].string_map_data[parameterName].value));
            return !ValidatorObject.objectIsEmpty(model) ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseLocation');
            return undefined;
        }
    }

    /**
     * @param data - file 'ads_and_content/ads_clicked.json' in input as Buffer
     */
    static async parseAdsClicked(data: Buffer): Promise<AdsClickedIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: AdsClickedIG = {list: []};
            model.list = document.impressions_history_ads_clicked.map((value: any) => {
                let newItem: AdvIG = {};
                (value.title) && (newItem.title = Decoding.decodeObject(value.title));
                (value.string_list_data && value.string_list_data[0].timestamp) && (newItem.date = new Date(1000 * value.string_list_data[0].timestamp));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseAdsClicked');
            return undefined;
        }
    }

    /**
     * @param data - file 'ads_and_content/ads_viewed.json' in input as Buffer
     */
    static async parseAdsViewed(data: Buffer): Promise<AdsViewedIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName1 = ConfigInstagram.keyTranslation[`${this.languagePrefix}-10-author`];
            let parameterName2 = ConfigInstagram.keyTranslation[`${this.languagePrefix}-11-time`];
            let model: AdsViewedIG = {list: []};
            model.list = document.impressions_history_ads_seen.map((value: any) => {
                let newItem: AdvIG = {};
                (value.string_map_data && value.string_map_data[parameterName1].value) && (newItem.title = Decoding.decodeObject(value.string_map_data[parameterName1].value));
                (value.string_map_data && value.string_map_data[parameterName2].timestamp) && (newItem.date = new Date(1000 * value.string_map_data[parameterName2].timestamp));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseAdsViewed');
            return undefined;
        }
    }

    /**
     * @param data - file 'information_about_you/ads_interests.json' in input as Buffer
     */
    static async parseAdsInterests(data: Buffer): Promise<AdsInterestsIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName = ConfigInstagram.keyTranslation[`${this.languagePrefix}-12-interest`];
            let model: AdsInterestsIG = {list: []};
            model.list = document.inferred_data_ig_interest.map((value: any) => {
                let newItem: AdvIG = {};
                (value.string_map_data && value.string_map_data[parameterName].value) && (newItem.title = Decoding.decodeObject(value.string_map_data[parameterName].value));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseAdsInterests');
            return undefined;
        }
    }

    /**
     * @param data - file 'ads_and_content/music_heard_in_stories.json' in input as Buffer
     */
    static async parseMusicHeardInStories(data: Buffer): Promise<MusicHeardInStoriesIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName1 = ConfigInstagram.keyTranslation[`${this.languagePrefix}-13-song`];
            let parameterName2 = ConfigInstagram.keyTranslation[`${this.languagePrefix}-14-artist`];
            let parameterName3 = ConfigInstagram.keyTranslation[`${this.languagePrefix}-15-time`];
            let model: MusicHeardInStoriesIG = {list: []};
            model.list = document.impressions_history_music_heard_in_stories.map((value: any) => {
                let newItem: MediaIG = {};
                (value.string_map_data && value.string_map_data[parameterName1].value) && (newItem.title = Decoding.decodeObject(value.string_map_data[parameterName1].value));
                (value.string_map_data && value.string_map_data[parameterName2].value) && (newItem.artist = Decoding.decodeObject(value.string_map_data[parameterName2].value));
                (value.string_map_data && value.string_map_data[parameterName3].timestamp) && (newItem.date = new Date(1000 * value.string_map_data[parameterName3].timestamp));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseMusicHeardInStories');
            return undefined;
        }
    }

    /**
     * @param data - file 'ads_and_content/music_recently_used_in_stories.json' in input as Buffer
     */
    static async parseMusicRecentlyUsedInStories(data: Buffer): Promise<MusicRecentlyUsedInStoriesIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName1 = ConfigInstagram.keyTranslation[`${this.languagePrefix}-16-song`];
            let parameterName2 = ConfigInstagram.keyTranslation[`${this.languagePrefix}-17-artist`];
            let parameterName3 = ConfigInstagram.keyTranslation[`${this.languagePrefix}-18-time`];
            let model: MusicHeardInStoriesIG = {list: []};
            model.list = document.impressions_history_music_recently_used_in_stories.map((value: any) => {
                let newItem: MediaIG = {};
                (value.string_map_data && value.string_map_data[parameterName1].value) && (newItem.title = Decoding.decodeObject(value.string_map_data[parameterName1].value));
                (value.string_map_data && value.string_map_data[parameterName2].value) && (newItem.artist = Decoding.decodeObject(value.string_map_data[parameterName2].value));
                (value.string_map_data && value.string_map_data[parameterName3].timestamp) && (newItem.date = new Date(1000 * value.string_map_data[parameterName3].timestamp));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseMusicRecentlyUsedInStories');
            return undefined;
        }
    }

    /**
     * @param data - file 'ads_and_content/posts_viewed.json' in input as Buffer
     */
    static async parsePostViewed(data: Buffer): Promise<PostViewedIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName1 = ConfigInstagram.keyTranslation[`${this.languagePrefix}-19-author`];
            let parameterName2 = ConfigInstagram.keyTranslation[`${this.languagePrefix}-20-time`];
            let model: PostViewedIG = {list: []};
            model.list = document.impressions_history_posts_seen.map((value: any) => {
                let newItem: PostIG = {};
                (value.string_map_data && value.string_map_data[parameterName1].value) && (newItem.title = Decoding.decodeObject(value.string_map_data[parameterName1].value));
                (value.string_map_data && value.string_map_data[parameterName2].timestamp) && (newItem.date = new Date(1000 * value.string_map_data[parameterName2].timestamp));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parsePostViewed');
            return undefined;
        }
    }

    /**
     * @param data - file 'ads_and_content/videos_watched.json' in input as Buffer
     */
    static async parseVideoWatched(data: Buffer): Promise<VideoWatchedIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName1 = ConfigInstagram.keyTranslation[`${this.languagePrefix}-21-author`];
            let parameterName2 = ConfigInstagram.keyTranslation[`${this.languagePrefix}-22-time`];
            let model: VideoWatchedIG = {list: []};
            model.list = document.impressions_history_videos_watched.map((value: any) => {
                let newItem: MediaIG = {};
                (value.string_map_data && value.string_map_data[parameterName1].value) && (newItem.title = Decoding.decodeObject(value.string_map_data[parameterName1].value));
                (value.string_map_data && value.string_map_data[parameterName2].timestamp) && (newItem.date = new Date(1000 * value.string_map_data[parameterName2].timestamp));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseVideoWatched');
            return undefined;
        }
    }

    /**
     * @param data - file 'ads_and_content/suggested_accounts_viewed.json' in input as Buffer
     */
    static async parseSuggestedAccountViewed(data: Buffer): Promise<SuggestedAccountViewedIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName1 = ConfigInstagram.keyTranslation[`${this.languagePrefix}-23-username`];
            let parameterName2 = ConfigInstagram.keyTranslation[`${this.languagePrefix}-24-time`];
            let model: SuggestedAccountViewedIG = {list: []};
            model.list = document.impressions_history_chaining_seen.map((value: any) => {
                let newItem: AccountIG = {};
                (value.string_map_data && value.string_map_data[parameterName1].value) && (newItem.name = Decoding.decodeObject(value.string_map_data[parameterName1].value));
                (value.string_map_data && value.string_map_data[parameterName2].timestamp) && (newItem.date = new Date(1000 * value.string_map_data[parameterName2].timestamp));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseSuggestedAccountViewed');
            return undefined;
        }
    }

    /**
     * @param data - file 'ads_and_content/accounts_you're_not_interested_in.json' in input as Buffer
     */
    static async parseAccountYouAreNotInterested(data: Buffer): Promise<AccountYouAreNotInterestedIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName1 = ConfigInstagram.keyTranslation[`${this.languagePrefix}-25-username`];
            let parameterName2 = ConfigInstagram.keyTranslation[`${this.languagePrefix}-26-dateAndTime`];
            let model: SuggestedAccountViewedIG = {list: []};
            model.list = document.impressions_history_recs_hidden_authors.map((value: any) => {
                let newItem: AccountIG = {};
                (value.string_map_data && value.string_map_data[parameterName1].value) && (newItem.name = Decoding.decodeObject(value.string_map_data[parameterName1].value));
                (value.string_map_data && value.string_map_data[parameterName2].timestamp) && (newItem.date = new Date(1000 * value.string_map_data[parameterName2].timestamp));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseAccountYouAreNotInterested');
            return undefined;
        }
    }

    /**
     * @param data - file 'comments/post_comments.json' in input as Buffer
     */
    static async parseCommentsPosted(data: Buffer): Promise<CommentsPostedIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: CommentsPostedIG = {list: []};
            model.list = document.comments_media_comments.map((value: any) => {
                let newItem: CommentPostedIG = {};
                (value.title) && (newItem.toUser = Decoding.decodeObject(value.title));
                (value.string_list_data && value.string_list_data[0].value) && (newItem.text = Decoding.decodeObject(value.string_list_data[0].value));
                (value.string_list_data && value.string_list_data[0].timestamp) && (newItem.date = new Date(1000 * value.string_list_data[0].timestamp));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseCommentsPosted');
            return undefined;
        }
    }

    /**
     * @param data - file 'contacts/synced_contacts.json' in input as Buffer
     */
    static async parseSyncedContracts(data: Buffer): Promise<SyncedContractsIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName1 = ConfigInstagram.keyTranslation[`${this.languagePrefix}-27-name`];
            let parameterName2 = ConfigInstagram.keyTranslation[`${this.languagePrefix}-28-secondName`];
            let parameterName3 = ConfigInstagram.keyTranslation[`${this.languagePrefix}-29-contactInfo`];
            let model: SyncedContractsIG = {list: []};
            model.list = document.contacts_contact_info.map((value: any) => {
                let newItem: ContactSyncedIG = {};
                (value.string_map_data && value.string_map_data[parameterName1].value) && (newItem.firstName = Decoding.decodeObject(value.string_map_data[parameterName1].value));
                (value.string_map_data && value.string_map_data[parameterName2].value) && (newItem.secondName = Decoding.decodeObject(value.string_map_data[parameterName2].value));
                (value.string_map_data && value.string_map_data[parameterName3].value) && (newItem.contactInfo = Decoding.decodeObject(value.string_map_data[parameterName3].value));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseSyncedContracts');
            return undefined;
        }
    }

    /**
     * @param data - file 'content/archived_posts.json' in input as Buffer
     */
    static async parseArchivedPost(data: Buffer): Promise<ArchivedPostsIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: ArchivedPostsIG = {list: []};
            model.list = document.ig_archived_post_media.map((value: any) => {
                let newItem: PostIG = {};
                (value.media && value.media[0].uri) && (newItem.uri = Decoding.decodeObject(value.media[0].uri));
                (value.media && value.media[0].creation_timestamp) && (newItem.date = new Date(1000 * value.media[0].creation_timestamp));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseArchivedPost');
            return undefined;
        }
    }

    /**
     * @param data - file 'content/posts_1.json' in input as Buffer
     */
    static async parsePersonalPost(data: Buffer): Promise<PersonalPostsIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: PersonalPostsIG = {list: []};
            model.list = document.map((value: any) => {
                let newItem: PostIG = {};
                (value.media && value.media[0].uri) && (newItem.uri = Decoding.decodeObject(value.media[0].uri));
                (value.media && value.media[0].title) && (newItem.title = Decoding.decodeObject(value.media[0].title));
                (value.media && value.media[0].creation_timestamp) && (newItem.date = new Date(1000 * value.media[0].creation_timestamp));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parsePersonalPost');
            return undefined;
        }
    }

    /**
     * @param data - file 'content/stories.json' in input as Buffer
     */
    static async parsePersonalStories(data: Buffer): Promise<PersonalStoriesIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: PersonalStoriesIG = {list: []};
            model.list = document.ig_stories.map((value: any) => {
                let newItem: StoryIG = {};
                (value.uri) && (newItem.uri = Decoding.decodeObject(value.uri));
                (value.title) && (newItem.title = Decoding.decodeObject(value.title));
                (value.creation_timestamp) && (newItem.date = new Date(1000 * value.creation_timestamp));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parsePersonalStories');
            return undefined;
        }
    }

    /**
     * @param data - file 'followers_and_following/followers.json' in input as Buffer
     */
    static async parseFollowers(data: Buffer): Promise<FollowersIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: FollowersIG = {list: []};
            model.list = document.relationships_followers.map((value: any) => {
                let newItem: AccountIG = {};
                (value.string_list_data && value.string_list_data[0].href) && (newItem.href = Decoding.decodeObject(value.string_list_data[0].href));
                (value.string_list_data && value.string_list_data[0].value) && (newItem.name = Decoding.decodeObject(value.string_list_data[0].value));
                (value.string_list_data && value.string_list_data[0].timestamp) && (newItem.date = new Date(1000 * value.string_list_data[0].timestamp));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseFollowers');
            return undefined;
        }
    }

    /**
     * @param data - file 'followers_and_following/following.json' in input as Buffer
     */
    static async parseFollowingAccounts(data: Buffer): Promise<FollowingAccountsIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: FollowingAccountsIG = {list: []};
            model.list = document.relationships_following.map((value: any) => {
                let newItem: AccountIG = {};
                (value.string_list_data && value.string_list_data[0].href) && (newItem.href = Decoding.decodeObject(value.string_list_data[0].href));
                (value.string_list_data && value.string_list_data[0].value) && (newItem.name = Decoding.decodeObject(value.string_list_data[0].value));
                (value.string_list_data && value.string_list_data[0].timestamp) && (newItem.date = new Date(1000 * value.string_list_data[0].timestamp));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseFollowingAccounts');
            return undefined;
        }
    }

    /**
     * @param data - file 'followers_and_following/following_hashtags.json' in input as Buffer
     */
    static async parseFollowingHashtags(data: Buffer): Promise<FollowingHashtagsIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: FollowingAccountsIG = {list: []};
            model.list = document.relationships_following_hashtags.map((value: any) => {
                let newItem: AccountIG = {};
                (value.string_list_data && value.string_list_data[0].href) && (newItem.href = Decoding.decodeObject(value.string_list_data[0].href));
                (value.string_list_data && value.string_list_data[0].value) && (newItem.name = Decoding.decodeObject(value.string_list_data[0].value));
                (value.string_list_data && value.string_list_data[0].timestamp) && (newItem.date = new Date(1000 * value.string_list_data[0].timestamp));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseFollowingHashtags');
            return undefined;
        }
    }

    /**
     * @param data - file 'likes/liked_posts.json' in input as Buffer
     */
    static async parseLikedPosts(data: Buffer): Promise<LikedPostsIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: LikedPostsIG = {list: []};
            model.list = document.likes_media_likes.map((value: any) => {
                let newItem: LikeIG = {};
                (value.title) && (newItem.title = Decoding.decodeObject(value.title));
                (value.string_list_data && value.string_list_data[0].href) && (newItem.href = Decoding.decodeObject(value.string_list_data[0].href));
                (value.string_list_data && value.string_list_data[0].value) && (newItem.emoticon = Decoding.decodeObject(value.string_list_data[0].value));
                (value.string_list_data && value.string_list_data[0].timestamp) && (newItem.date = new Date(1000 * value.string_list_data[0].timestamp));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseLikedPosts');
            return undefined;
        }
    }

    /**
     * @param data - file 'likes/liked_comments.json' in input as Buffer
     */
    static async parseLikedComments(data: Buffer): Promise<LikedCommentsIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: LikedPostsIG = {list: []};
            model.list = document.likes_comment_likes.map((value: any) => {
                let newItem: LikeIG = {};
                (value.title) && (newItem.title = Decoding.decodeObject(value.title));
                (value.string_list_data && value.string_list_data[0].href) && (newItem.href = Decoding.decodeObject(value.string_list_data[0].href));
                (value.string_list_data && value.string_list_data[0].value) && (newItem.emoticon = Decoding.decodeObject(value.string_list_data[0].value));
                (value.string_list_data && value.string_list_data[0].timestamp) && (newItem.date = new Date(1000 * value.string_list_data[0].timestamp));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseLikedComments');
            return undefined;
        }
    }

    /**
     * @param data - file 'recent_searches/account_searches.json' in input as Buffer
     */
    static async parseSearches(data: Buffer): Promise<SearchesIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName1 = ConfigInstagram.keyTranslation[`${this.languagePrefix}-30-search`];
            let parameterName2 = ConfigInstagram.keyTranslation[`${this.languagePrefix}-31-time`];
            let model: SearchesIG = {list: []};
            model.list = document.searches_user.map((value: any) => {
                let newItem: SearchIG = {};
                (value.string_map_data && value.string_map_data[parameterName1].value) && (newItem.text = Decoding.decodeObject(value.string_map_data[parameterName1].value));
                (value.string_map_data && value.string_map_data[parameterName2].timestamp) && (newItem.date = new Date(1000 * value.string_map_data[parameterName2].timestamp));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseSearches');
            return undefined;
        }
    }

    /**
     * @param data - file 'your_topics/your_reels_sentiments.json' in input as Buffer
     */
    static async parseReelSentiments(data: Buffer): Promise<ReelSentimentsIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName = ConfigInstagram.keyTranslation[`${this.languagePrefix}-32-name`];
            let model: ReelSentimentsIG = {list: []};
            model.list = document.topics_your_reels_emotions.map((value: any) => {
                let newItem: SentimentIG = {};
                (value.string_map_data && value.string_map_data[parameterName].value) && (newItem.value = Decoding.decodeObject(value.string_map_data[parameterName].value));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseReelSentiments');
            return undefined;
        }
    }

    /**
     * @param data - file 'your_topics/your_reels_topics.json' in input as Buffer
     */
    static async parseReelTopics(data: Buffer): Promise<ReelTopicsIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName = ConfigInstagram.keyTranslation[`${this.languagePrefix}-33-name`];
            let model: ReelTopicsIG = {list: []};
            model.list = document.topics_your_reels_topics.map((value: any) => {
                let newItem: TopicIG = {};
                (value.string_map_data && value.string_map_data[parameterName].value) && (newItem.value = Decoding.decodeObject(value.string_map_data[parameterName].value));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseReelTopics');
            return undefined;
        }
    }

    /**
     * @param data - file 'your_topics/your_topics.json' in input as Buffer
     */
    static async parseTopics(data: Buffer): Promise<TopicsIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName = ConfigInstagram.keyTranslation[`${this.languagePrefix}-34-name`];
            let model: TopicsIG = {list: []};
            model.list = document.topics_your_topics.map((value: any) => {
                let newItem: TopicIG = {};
                (value.string_map_data && value.string_map_data[parameterName].value) && (newItem.value = Decoding.decodeObject(value.string_map_data[parameterName].value));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseTopics');
            return undefined;
        }
    }

    /**
     * @param data - file 'story_sticker_interactions/emoji_sliders.json' in input as Buffer
     */
    static async parseEmojiSliders(data: Buffer): Promise<EmojiSlidersIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: EmojiSlidersIG = {list: []};
            model.list = document.story_activities_emoji_sliders.map((value: any) => {
                let newItem: EmojiSliderIG = {};
                (value.title) && (newItem.title = Decoding.decodeObject(value.title));
                (value.string_list_data && value.string_list_data[0] && value.string_list_data[0].timestamp) && (newItem.date = new Date(1000 * value.string_list_data[0].timestamp));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseEmojiSliders');
            return undefined;
        }
    }

    /**
     * @param data - file 'story_sticker_interactions/polls.json' in input as Buffer
     */
    static async parsePolls(data: Buffer): Promise<PollsIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: PollsIG = {list: []};
            model.list = document.story_activities_polls.map((value: any) => {
                let newItem: PollIG = {};
                (value.title) && (newItem.title = Decoding.decodeObject(value.title));
                (value.string_list_data && value.string_list_data[0] && value.string_list_data[0].timestamp) && (newItem.date = new Date(1000 * value.string_list_data[0].timestamp));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parsePolls');
            return undefined;
        }
    }

    /**
     * @param data - file 'story_sticker_interactions/quizzes.json' in input as Buffer
     */
    static async parseQuizzes(data: Buffer): Promise<QuizzesIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: QuizzesIG = {list: []};
            model.list = document.story_activities_quizzes.map((value: any) => {
                let newItem: QuizIG = {};
                (value.title) && (newItem.title = Decoding.decodeObject(value.title));
                (value.string_list_data && value.string_list_data[0] && value.string_list_data[0].timestamp) && (newItem.date = new Date(1000 * value.string_list_data[0].timestamp));
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseQuizzes');
            return undefined;
        }
    }

    /**
     * @param data - file 'monetization/eligibility.json' in input as Buffer
     */
    static async parseEligibility(data: Buffer): Promise<EligibilityIG | undefined> {
        try {
            let eligibility: EligibilityIG = {};
            let parameterName;
            let document = JSON.parse(data.toString());
            if (document.monetization_eligibility && document.monetization_eligibility[0] && document.monetization_eligibility[0].string_map_data) {
                parameterName = ConfigInstagram.keyTranslation[`${this.languagePrefix}-35-productName`];
                if (document.monetization_eligibility[0].string_map_data[parameterName] && document.monetization_eligibility[0].string_map_data[parameterName].value) {
                    eligibility.value = Decoding.decodeObject(document.monetization_eligibility[0].string_map_data[parameterName].value);
                }
                parameterName = ConfigInstagram.keyTranslation[`${this.languagePrefix}-36-decision`];
                if (document.monetization_eligibility[0].string_map_data[parameterName] && document.monetization_eligibility[0].string_map_data[parameterName].value) {
                    eligibility.decision = Decoding.decodeObject(document.monetization_eligibility[0].string_map_data[parameterName].value);
                }
                parameterName = ConfigInstagram.keyTranslation[`${this.languagePrefix}-37-reason`];
                if (document.monetization_eligibility[0].string_map_data[parameterName] && document.monetization_eligibility[0].string_map_data[parameterName].value) {
                    eligibility.reason = Decoding.decodeObject(document.monetization_eligibility[0].string_map_data[parameterName].value);
                }
                return !ValidatorObject.objectIsEmpty(eligibility) ? eligibility : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseEligibility');
            return undefined;
        }
    }

    /**
     * @param data - file 'messages/inbox/{chat_directory_name}/message_1.json' in input as Buffer
     */
    static async parseMessages(data: Buffer): Promise<ConversationIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let messages: MessageIG[] = [];
            (document.messages) && (messages = document.messages.map((value: any) => {
                let model: MessageIG = {};
                (value.sender_name) && (model.senderName = Decoding.decodeObject(value.sender_name));
                (value.content) && (model.content = Decoding.decodeObject(value.content));
                (value.type) && (model.type = Decoding.decodeObject(value.type));
                (value.is_unsent) && (model.isUnsent = value.is_unsent);
                (value.share && value.share.link) && (model.link = Decoding.decodeObject(value.share.link));
                (value.timestamp_ms) && (model.date = new Date (value.timestamp_ms));
                return model;
            }));
            let participants: string[] = [];
            (document.participants) && (participants = document.participants.map((value: any) => Decoding.decodeObject(value.name)));

            let conversationModel: ConversationIG = {};
            (document.title) && (conversationModel.title = Decoding.decodeObject(document.title));
            (messages) && (conversationModel.listMessages = messages);
            (participants) && (conversationModel.participants = participants);
            (document.is_still_participant) && (conversationModel.isStillParticipant = document.is_still_participant);

            return !ValidatorObject.objectIsEmpty(conversationModel) ? conversationModel : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseMessages');
            return undefined;
        }
    }

    /**
     * @param data - file 'ads_business/advertisers_using_your_activity_or_information.json' in input as Buffer
     */
    static async parseAdsUsingYourInformation(data: Buffer): Promise<AdsUsingYourInformationIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: AdsUsingYourInformationIG = {list: []};
            model.list = document.ig_custom_audiences_all_types.map((value: any) => {
                let newItem: AdvUsingYourInformationIG = {};
                (value.advertiser_name) && (newItem.advertiserName = Decoding.decodeObject(value.advertiser_name));
                (value.has_data_file_custom_audience !== undefined) && (newItem.hasDataFileCustomAudience = value.has_data_file_custom_audience);
                (value.has_remarketing_custom_audience !== undefined) && (newItem.hasRemarketingCustomAudience = value.has_remarketing_custom_audience);
                (value.has_in_person_store_visit !== undefined) && (newItem.hasInPersonStoreVisit = value.has_in_person_store_visit);
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseAdsUsingYourInformation');
            return undefined;
        }
    }

    /**
     * @param data - file 'shopping/recently_viewed_items.json' in input as Buffer
     */
    static async parseShoppingViewedItems(data: Buffer): Promise<ShoppingViewedItemsIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: ShoppingViewedItemsIG = {list: []};
            let parameterName;
            model.list = document.checkout_saved_recently_viewed_products.map((value: any) => {
                let newItem: ShoppingViewedItemIG = {};
                parameterName = ConfigInstagram.keyTranslation[`${this.languagePrefix}-38-productID`];
                if (value.string_map_data[parameterName] && value.string_map_data[parameterName].value) {
                    newItem.productID = Decoding.decodeObject(value.string_map_data[parameterName].value);
                }
                parameterName = ConfigInstagram.keyTranslation[`${this.languagePrefix}-39-productName`];
                if (value.string_map_data[parameterName] && value.string_map_data[parameterName].value) {
                    newItem.productName = Decoding.decodeObject(value.string_map_data[parameterName].value);
                }
                parameterName = ConfigInstagram.keyTranslation[`${this.languagePrefix}-40-handlerID`];
                if (value.string_map_data[parameterName] && value.string_map_data[parameterName].value) {
                    newItem.handlerID = Decoding.decodeObject(value.string_map_data[parameterName].value);
                }
                parameterName = ConfigInstagram.keyTranslation[`${this.languagePrefix}-41-handlerName`];
                if (value.string_map_data[parameterName] && value.string_map_data[parameterName].value) {
                    newItem.handlerName= Decoding.decodeObject(value.string_map_data[parameterName].value);
                }
                return newItem;
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseShoppingViewedItems');
            return undefined;
        }
    }

    /**
     * @param data - file 'autofill_information/autofill_information.json' in input as Buffer
     */
    static async parseAutofillInformation(data: Buffer): Promise<AutofillInformationIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: AutofillInformationIG = {};
            if (document && document.ig_autofill_data) {
                (document.ig_autofill_data.tel) && (model.tel = document.ig_autofill_data.tel);
                (document.ig_autofill_data.tel_country_code) && (model.telCountryCode = document.ig_autofill_data.tel_country_code);
                (document.ig_autofill_data.tel_national) && (model.telNational = document.ig_autofill_data.tel_national);
                (document.ig_autofill_data.tel_area_code) && (model.telAreaCode = document.ig_autofill_data.tel_area_code);
                (document.ig_autofill_data.tel_local) && (model.telLocal = document.ig_autofill_data.tel_local);
                (document.ig_autofill_data.tel_local_prefix) && (model.telLocalPrefix = document.ig_autofill_data.tel_local_prefix);
                (document.ig_autofill_data.tel_local_suffix) && (model.telLocalSuffix = document.ig_autofill_data.tel_local_suffix);
                (document.ig_autofill_data.street_address) && (model.streetAddress = document.ig_autofill_data.street_address);
                (document.ig_autofill_data.address_line1) && (model.streetLine1 = document.ig_autofill_data.address_line1);
                (document.ig_autofill_data.address_line2) && (model.streetLine2 = document.ig_autofill_data.address_line2);
                (document.ig_autofill_data.address_line3) && (model.streetLine3 = document.ig_autofill_data.address_line3);
                (document.ig_autofill_data.address_level1) && (model.streetLevel1 = document.ig_autofill_data.address_level1);
                (document.ig_autofill_data.address_level2) && (model.streetLevel2 = document.ig_autofill_data.address_level2);
                (document.ig_autofill_data.address_level3) && (model.streetLevel3 = document.ig_autofill_data.address_level3);
                (document.ig_autofill_data.address_level4) && (model.streetLevel4 = document.ig_autofill_data.address_level4);
                (document.ig_autofill_data.country) && (model.country = document.ig_autofill_data.country);
                (document.ig_autofill_data.country_name) && (model.countryName = document.ig_autofill_data.country_name);
                (document.ig_autofill_data.postal_code) && (model.postalCode = document.ig_autofill_data.postal_code);
                (document.ig_autofill_data.email) && (model.email = document.ig_autofill_data.email);
                (document.ig_autofill_data.family_name) && (model.familyName = document.ig_autofill_data.family_name);
                (document.ig_autofill_data.given_name) && (model.givenName = document.ig_autofill_data.given_name);
            }
            return !ValidatorObject.objectIsEmpty(model) ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseAutofillInformation');
            return undefined;
        }
    }
}
