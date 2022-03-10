import {ConfigInstagram} from "../config/config.instagram";
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
    QuizzesIG, PersonalStoriesIG, StoryIG
} from "../model";
import Logger from "../utils/logger";
import {Decoding} from "../utils/decoding";
import {LanguageCode} from "../descriptor";
import {Validator} from "../validator";

/**
 * Class used to parse most important files into the directory returned by Instagram in JSON format.
 * All the files are given in input as Buffer, parsed back to JSON and then mapped into a specific interface model.
 * All functions return the relevant information (if there are any) as a promised model if the parsing is successful, undefined otherwise.
 */
export class InstagramService {
    private logger = new Logger("Instagram Service");
    private readonly configInstagram;
    private readonly prefix: string;

    /**
     * @param language
     */
    constructor(language: LanguageCode) {
        this.configInstagram = new ConfigInstagram();
        this.prefix = language;
    }

    /**
     * @param data - file 'account_information/personal_information.json' in input as Buffer
     * @return {Promise<PersonalInformation | undefined>}
     */
    async parsePersonalInformation(data: Buffer): Promise<PersonalInformationIG | undefined> {
        let personalInfoModel: PersonalInformationIG = {};
        try {
            let parameterName, match;
            let document = JSON.parse(data.toString());

            parameterName = this.configInstagram.get(`${this.prefix}-1-username`);
            (InstagramService.pathExists(parameterName, document)) && (personalInfoModel.username = Decoding.decodeObject(document.profile_user[0].string_map_data[parameterName].value));

            parameterName = this.configInstagram.get(`${this.prefix}-2-name`);
            (InstagramService.pathExists(parameterName, document)) && (personalInfoModel.name = Decoding.decodeObject(document.profile_user[0].string_map_data[parameterName].value));

            parameterName = this.configInstagram.get(`${this.prefix}-3-email`);
            (InstagramService.pathExists(parameterName, document)) && (personalInfoModel.email = Decoding.decodeObject(document.profile_user[0].string_map_data[parameterName].value));

            parameterName = this.configInstagram.get(`${this.prefix}-4-privateAccount`);
            (InstagramService.pathExists(parameterName, document)) && (personalInfoModel.private = document.profile_user[0].string_map_data[parameterName].value.toLowerCase() == 'true');

            parameterName = this.configInstagram.get(`${this.prefix}-5-birthdate`);
            (InstagramService.pathExists(parameterName, document)) && (match = Decoding.decodeObject(document.profile_user[0].string_map_data[parameterName].value).split('-'));
            match && (personalInfoModel.birthdate = new Date(Date.UTC(match[0], match[1]-1, match[2], 0, 0, 0)));

            parameterName = this.configInstagram.get(`${this.prefix}-6-phoneNumber`);
            (InstagramService.pathExists(parameterName, document)) && (personalInfoModel.phoneNumber = Decoding.decodeObject(document.profile_user[0].string_map_data[parameterName].value));

            parameterName = this.configInstagram.get(`${this.prefix}-7-biography`);
            (InstagramService.pathExists(parameterName, document)) && (personalInfoModel.biography = Decoding.decodeObject(document.profile_user[0].string_map_data[parameterName].value));

            parameterName = this.configInstagram.get(`${this.prefix}-8-gender`);
            (InstagramService.pathExists(parameterName, document)) && (personalInfoModel.gender = Decoding.decodeObject(document.profile_user[0].string_map_data[parameterName].value));

            return !Validator.objectIsEmpty(personalInfoModel) ? personalInfoModel : undefined;
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
     * @return {Promise<LocationInformationIG | undefined>}
     */
    async parseLocation(data: Buffer): Promise<LocationInformationIG | undefined>{
        try {
            let document = JSON.parse(data.toString());
            let parameterName = this.configInstagram.get(`${this.prefix}-9-cityName`);
            let model: LocationInformationIG = {};
            (document.inferred_data_primary_location &&
                document.inferred_data_primary_location[0].string_map_data &&
                document.inferred_data_primary_location[0].string_map_data[parameterName] &&
                document.inferred_data_primary_location[0].string_map_data[parameterName].value) &&
            (model.basedIn = Decoding.decodeObject(document.inferred_data_primary_location[0].string_map_data[parameterName].value));
            return !Validator.objectIsEmpty(model) ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseLocation');
            return undefined;
        }
    }

    /**
     * @param data - file 'ads_and_content/ads_clicked.json' in input as Buffer
     * @return {Promise<AdsClickedIG | undefined>}
     */
    async parseAdsClicked(data: Buffer): Promise<AdsClickedIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: AdsClickedIG = document.impressions_history_ads_clicked.map((value: any) => {
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
     * @return {Promise<AdsViewedIG | undefined>}
     */
    async parseAdsViewed(data: Buffer): Promise<AdsViewedIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName1 = this.configInstagram.get(`${this.prefix}-10-author`);
            let parameterName2 = this.configInstagram.get(`${this.prefix}-11-time`);
            let model: AdsViewedIG = document.impressions_history_ads_seen.map((value: any) => {
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
     * @return {Promise<AdsInterestsIG | undefined>}
     */
    async parseAdsInterests(data: Buffer): Promise<AdsInterestsIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName = this.configInstagram.get(`${this.prefix}-12-interest`);
            let model: AdsInterestsIG = document.inferred_data_ig_interest.map((value: any) => {
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
     * @return {Promise<MusicHeardInStoriesIG | undefined>}
     */
    async parseMusicHeardInStories(data: Buffer): Promise<MusicHeardInStoriesIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName1 = this.configInstagram.get(`${this.prefix}-13-song`);
            let parameterName2 = this.configInstagram.get(`${this.prefix}-14-artist`);
            let parameterName3 = this.configInstagram.get(`${this.prefix}-15-time`);
            let model: MusicHeardInStoriesIG = document.impressions_history_music_heard_in_stories.map((value: any) => {
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
     * @return {Promise<MusicRecentlyUsedInStoriesIG | undefined>}
     */
    async parseMusicRecentlyUsedInStories(data: Buffer): Promise<MusicRecentlyUsedInStoriesIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName1 = this.configInstagram.get(`${this.prefix}-16-song`);
            let parameterName2 = this.configInstagram.get(`${this.prefix}-17-artist`);
            let parameterName3 = this.configInstagram.get(`${this.prefix}-18-time`);
            let model: MusicHeardInStoriesIG = document.impressions_history_music_recently_used_in_stories.map((value: any) => {
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
     * @return {Promise<PostViewedIG | undefined>}
     */
    async parsePostViewed(data: Buffer): Promise<PostViewedIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName1 = this.configInstagram.get(`${this.prefix}-19-author`);
            let parameterName2 = this.configInstagram.get(`${this.prefix}-20-time`);
            let model: PostViewedIG = document.impressions_history_posts_seen.map((value: any) => {
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
     * @return {Promise<VideoWatchedIG | undefined>}
     */
    async parseVideoWatched(data: Buffer): Promise<VideoWatchedIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName1 = this.configInstagram.get(`${this.prefix}-21-author`);
            let parameterName2 = this.configInstagram.get(`${this.prefix}-22-time`);
            let model: VideoWatchedIG = document.impressions_history_videos_watched.map((value: any) => {
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
     * @return {Promise<SuggestedAccountViewedIG | undefined>}
     */
    async parseSuggestedAccountViewed(data: Buffer): Promise<SuggestedAccountViewedIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName1 = this.configInstagram.get(`${this.prefix}-23-username`);
            let parameterName2 = this.configInstagram.get(`${this.prefix}-24-time`);
            let model: SuggestedAccountViewedIG = document.impressions_history_chaining_seen.map((value: any) => {
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
     * @return {Promise<AccountYouAreNotInterestedIG | undefined>}
     */
    async parseAccountYouAreNotInterested(data: Buffer): Promise<AccountYouAreNotInterestedIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName1 = this.configInstagram.get(`${this.prefix}-25-username`);
            let parameterName2 = this.configInstagram.get(`${this.prefix}-26-dateAndTime`);0
            let model: SuggestedAccountViewedIG = document.impressions_history_recs_hidden_authors.map((value: any) => {
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
     * @return {Promise<CommentsPostedIG | undefined>}
     */
    async parseCommentsPosted(data: Buffer): Promise<CommentsPostedIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: CommentsPostedIG = document.comments_media_comments.map((value: any) => {
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
     * @return {Promise<SyncedContractsIG | undefined>}
     */
    async parseSyncedContracts(data: Buffer): Promise<SyncedContractsIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName1 = this.configInstagram.get(`${this.prefix}-27-name`);
            let parameterName2 = this.configInstagram.get(`${this.prefix}-28-secondName`);
            let parameterName3 = this.configInstagram.get(`${this.prefix}-29-contactInfo`);
            let model: SyncedContractsIG = document.contacts_contact_info.map((value: any) => {
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
     * @return {Promise<ArchivedPostsIG | undefined>}
     */
    async parseArchivedPost(data: Buffer): Promise<ArchivedPostsIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: ArchivedPostsIG = document.ig_archived_post_media.map((value: any) => {
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
     * @return {Promise<PersonalPostsIG | undefined>}
     */
    async parsePersonalPost(data: Buffer): Promise<PersonalPostsIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: PersonalPostsIG = document.map((value: any) => {
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
     * @return {Promise<PersonalStoriesIG | undefined>}
     */
    async parsePersonalStories(data: Buffer): Promise<PersonalStoriesIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: PersonalStoriesIG = document.ig_stories.map((value: any) => {
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
     * @return {Promise<FollowersIG | undefined>}
     */
    async parseFollowers(data: Buffer): Promise<FollowersIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: FollowersIG = document.relationships_followers.map((value: any) => {
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
     * @param data - file 'likes/liked_comments.json' in input as Buffer
     * @return {Promise<FollowingAccountsIG | undefined>}
     */
    async parseFollowingAccounts(data: Buffer): Promise<FollowingAccountsIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: FollowingAccountsIG = document.relationships_following.map((value: any) => {
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
     * @return {Promise<FollowingHashtagsIG | undefined>}
     */
    async parseFollowingHashtags(data: Buffer): Promise<FollowingHashtagsIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: FollowingAccountsIG = document.relationships_following_hashtags.map((value: any) => {
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
     * @return {Promise<LikedPostsIG | undefined>}
     */
    async parseLikedPosts(data: Buffer): Promise<LikedPostsIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: LikedPostsIG = document.likes_media_likes.map((value: any) => {
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
     * @return {Promise<LikedCommentsIG | undefined>}
     */
    async parseLikedComments(data: Buffer): Promise<LikedCommentsIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: LikedPostsIG = document.likes_comment_likes.map((value: any) => {
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
     * @param data - file 'recent_search/account_searches.json' in input as Buffer
     * @return {Promise<SearchesIG | undefined>}
     */
    async parseSearches(data: Buffer): Promise<SearchesIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName1 = this.configInstagram.get(`${this.prefix}-30-search`);
            let parameterName2 = this.configInstagram.get(`${this.prefix}-31-time`);
            let model: SearchesIG = document.searches_user.map((value: any) => {
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
     * @return {Promise<ReelSentimentsIG | undefined>}
     */
    async parseReelSentiments(data: Buffer): Promise<ReelSentimentsIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName = this.configInstagram.get(`${this.prefix}-32-name`);
            let model: ReelSentimentsIG = document.topics_your_reels_emotions.map((value: any) => {
                let newItem: SentimentIG = {};
                (value.string_map_data && value.string_map_data[parameterName].value) && (newItem.value = Decoding.decodeObject(value.string_map_data[parameterName].value));
                model.list.push(newItem);
            });
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseReelSentiments');
            return undefined;
        }
    }

    /**
     * @param data - file 'your_topics/your_reels_topics.json' in input as Buffer
     * @return {Promise<ReelTopicsIG | undefined>}
     */
    async parseReelTopics(data: Buffer): Promise<ReelTopicsIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName = this.configInstagram.get(`${this.prefix}-33-name`);
            let model: ReelTopicsIG = document.topics_your_reels_topics.map((value: any) => {
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
     * @return {Promise<TopicsIG | undefined>}
     */
    async parseTopics(data: Buffer): Promise<TopicsIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName = this.configInstagram.get(`${this.prefix}-34-name`);
            let model: TopicsIG = document.topics_your_topics.map((value: any) => {
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
     * @return {Promise<EmojiSlidersIG | undefined>}
     */
    async parseEmojiSliders(data: Buffer): Promise<EmojiSlidersIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: EmojiSlidersIG = document.story_activities_emoji_sliders.map((value: any) => {
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
     * @return {Promise<PollsIG | undefined>}
     */
    async parsePolls(data: Buffer): Promise<PollsIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: PollsIG = document.story_activities_polls.map((value: any) => {
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
     * @return {Promise<QuizzesIG | undefined>}
     */
    async parseQuizzes(data: Buffer): Promise<QuizzesIG | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: QuizzesIG = document.story_activities_quizzes.map((value: any) => {
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
     * @return {Promise<EligibilityIG | undefined>}
     */
    async parseEligibility(data: Buffer): Promise<EligibilityIG | undefined> {
        try {
            let eligibility: EligibilityIG = {};
            let parameterName;
            let document = JSON.parse(data.toString());
            if (document.monetization_eligibility && document.monetization_eligibility[0] && document.monetization_eligibility[0].string_map_data) {
                parameterName = this.configInstagram.get(`${this.prefix}-35-productName`);
                if (document.monetization_eligibility[0].string_map_data[parameterName] && document.monetization_eligibility[0].string_map_data[parameterName].value) {
                    eligibility.value = Decoding.decodeObject(document.monetization_eligibility[0].string_map_data[parameterName].value);
                }
                parameterName = this.configInstagram.get(`${this.prefix}-36-decision`);
                if (document.monetization_eligibility[0].string_map_data[parameterName] && document.monetization_eligibility[0].string_map_data[parameterName].value) {
                    eligibility.decision = Decoding.decodeObject(document.monetization_eligibility[0].string_map_data[parameterName].value);
                }
                parameterName = this.configInstagram.get(`${this.prefix}-37-reason`);
                if (document.monetization_eligibility[0].string_map_data[parameterName] && document.monetization_eligibility[0].string_map_data[parameterName].value) {
                    eligibility.reason = Decoding.decodeObject(document.monetization_eligibility[0].string_map_data[parameterName].value);
                }
                return !Validator.objectIsEmpty(eligibility) ? eligibility : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseEligibility');
            return undefined;
        }
    }

    /**
     * @param data - file 'messages/inbox/{chat_directory_name}/message_1.json' in input as Buffer
     * @return {Promise<ConversationIG | undefined>}
     */
    async parseMessages(data: Buffer): Promise<ConversationIG | undefined> {
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

            return !Validator.objectIsEmpty(conversationModel) ? conversationModel : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseMessages');
            return undefined;
        }
    }
}
