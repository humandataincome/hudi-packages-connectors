import {ConfigInstagram} from "../config/config.instagram";
import {
    Account,
    AccountYouAreNotInterested,
    AdsClicked,
    AdsInterests,
    AdsViewed,
    Adv,
    ArchivedPosts,
    CommentPosted,
    CommentsPosted,
    ContactSynced,
    Conversation,
    Followers,
    FollowingAccounts,
    FollowingHashtags,
    Like,
    LikedComments,
    LikedPosts,
    LocationInformation,
    Media,
    Search,
    Message,
    MusicHeardInStories,
    MusicRecentlyUsedInStories,
    PersonalInformation,
    PersonalPosts,
    Post,
    PostViewed,
    ReelSentiments,
    ReelTopics,
    Searches,
    SuggestedAccountViewed,
    SyncedContracts,
    Topics,
    VideoWatched,
    Sentiment,
    Topic,
    EmojiSliders,
    EmojiSlider,
    Eligibility,
    Polls,
    Poll,
    Quiz,
    Quizzes, PersonalStories, Story
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
    async parsePersonalInformation(data: Buffer): Promise<PersonalInformation | undefined> {
        let personalInfoModel: PersonalInformation = {};
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
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parsePersonalInformation');
            return undefined;
        }
    }

    private static pathExists(parameterName: string, document: any): boolean {
        return !!(document.profile_user && document.profile_user[0].string_map_data && document.profile_user[0].string_map_data[parameterName] && document.profile_user[0].string_map_data[parameterName].value);
    }

    /**
     * @param data - file 'information_about_you/account_based_in.json' in input as Buffer
     * @return {Promise<LocationInformation | undefined>}
     */
    async parseLocation(data: Buffer): Promise<LocationInformation | undefined>{
        try {
            let document = JSON.parse(data.toString());
            let parameterName = this.configInstagram.get(`${this.prefix}-9-cityName`);
            let model: LocationInformation = {};
            (document.inferred_data_primary_location &&
                document.inferred_data_primary_location[0].string_map_data &&
                document.inferred_data_primary_location[0].string_map_data[parameterName] &&
                document.inferred_data_primary_location[0].string_map_data[parameterName].value) &&
            (model.basedIn = Decoding.decodeObject(document.inferred_data_primary_location[0].string_map_data[parameterName].value));
            return !Validator.objectIsEmpty(model) ? model : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseLocation');
            return undefined;
        }
    }

    /**
     * @param data - file 'ads_and_content/ads_clicked.json' in input as Buffer
     * @return {Promise<AdsClicked | undefined>}
     */
    async parseAdsClicked(data: Buffer): Promise<AdsClicked | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: AdsClicked = {list: []};
            document.impressions_history_ads_clicked.map((value: any) => {
                let newItem: Adv = {};
                (value.title) && (newItem.title = Decoding.decodeObject(value.title));
                (value.string_list_data && value.string_list_data[0].timestamp) && (newItem.date = new Date(1000 * value.string_list_data[0].timestamp));
                model.list.push(newItem);
                });
            return model.list.length > 0 ? model : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseAdsClicked');
            return undefined;
        }
    }

    /**
     * @param data - file 'ads_and_content/ads_viewed.json' in input as Buffer
     * @return {Promise<AdsViewed | undefined>}
     */
    async parseAdsViewed(data: Buffer): Promise<AdsViewed | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName1 = this.configInstagram.get(`${this.prefix}-10-author`);
            let parameterName2 = this.configInstagram.get(`${this.prefix}-11-time`);
            let model: AdsViewed = {list: []};
            document.impressions_history_ads_seen.map((value: any) => {
                let newItem: Adv = {};
                (value.string_map_data && value.string_map_data[parameterName1].value) && (newItem.title = Decoding.decodeObject(value.string_map_data[parameterName1].value));
                (value.string_map_data && value.string_map_data[parameterName2].timestamp) && (newItem.date = new Date(1000 * value.string_map_data[parameterName2].timestamp));
                model.list.push(newItem);
            });
            return model.list.length > 0 ? model : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseAdsViewed');
            return undefined;
        }
    }

    /**
     * @param data - file 'information_about_you/ads_interests.json' in input as Buffer
     * @return {Promise<AdsInterests | undefined>}
     */
    async parseAdsInterests(data: Buffer): Promise<AdsInterests | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName = this.configInstagram.get(`${this.prefix}-12-interest`);
            let model: AdsInterests = {list: []};
            document.inferred_data_ig_interest.map((value: any) => {
                let newItem: Adv = {};
                (value.string_map_data && value.string_map_data[parameterName].value) && (newItem.title = Decoding.decodeObject(value.string_map_data[parameterName].value));
                model.list.push(newItem);
            });
            return model.list.length > 0 ? model : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseAdsInterests');
            return undefined;
        }
    }

    /**
     * @param data - file 'ads_and_content/music_heard_in_stories.json' in input as Buffer
     * @return {Promise<MusicHeardInStories | undefined>}
     */
    async parseMusicHeardInStories(data: Buffer): Promise<MusicHeardInStories | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName1 = this.configInstagram.get(`${this.prefix}-13-song`);
            let parameterName2 = this.configInstagram.get(`${this.prefix}-14-artist`);
            let parameterName3 = this.configInstagram.get(`${this.prefix}-15-time`);
            let model: MusicHeardInStories = {list: []};
            document.impressions_history_music_heard_in_stories.map((value: any) => {
                let newItem: Media = {};
                (value.string_map_data && value.string_map_data[parameterName1].value) && (newItem.title = Decoding.decodeObject(value.string_map_data[parameterName1].value));
                (value.string_map_data && value.string_map_data[parameterName2].value) && (newItem.artist = Decoding.decodeObject(value.string_map_data[parameterName2].value));
                (value.string_map_data && value.string_map_data[parameterName3].timestamp) && (newItem.date = new Date(1000 * value.string_map_data[parameterName3].timestamp));
                model.list.push(newItem);
            });
            return model.list.length > 0 ? model : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseMusicHeardInStories');
            return undefined;
        }
    }

    /**
     * @param data - file 'ads_and_content/music_recently_used_in_stories.json' in input as Buffer
     * @return {Promise<MusicRecentlyUsedInStories | undefined>}
     */
    async parseMusicRecentlyUsedInStories(data: Buffer): Promise<MusicRecentlyUsedInStories | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName1 = this.configInstagram.get(`${this.prefix}-16-song`);
            let parameterName2 = this.configInstagram.get(`${this.prefix}-17-artist`);
            let parameterName3 = this.configInstagram.get(`${this.prefix}-18-time`);
            let model: MusicHeardInStories = {list: []};
            document.impressions_history_music_recently_used_in_stories.map((value: any) => {
                let newItem: Media = {};
                (value.string_map_data && value.string_map_data[parameterName1].value) && (newItem.title = Decoding.decodeObject(value.string_map_data[parameterName1].value));
                (value.string_map_data && value.string_map_data[parameterName2].value) && (newItem.artist = Decoding.decodeObject(value.string_map_data[parameterName2].value));
                (value.string_map_data && value.string_map_data[parameterName3].timestamp) && (newItem.date = new Date(1000 * value.string_map_data[parameterName3].timestamp));
                model.list.push(newItem);
            });
            return model.list.length > 0 ? model : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseMusicRecentlyUsedInStories');
            return undefined;
        }
    }

    /**
     * @param data - file 'ads_and_content/posts_viewed.json' in input as Buffer
     * @return {Promise<PostViewed | undefined>}
     */
    async parsePostViewed(data: Buffer): Promise<PostViewed | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName1 = this.configInstagram.get(`${this.prefix}-19-author`);
            let parameterName2 = this.configInstagram.get(`${this.prefix}-20-time`);
            let model: PostViewed = {list: []};
            document.impressions_history_posts_seen.map((value: any) => {
                let newItem: Post = {};
                (value.string_map_data && value.string_map_data[parameterName1].value) && (newItem.title = Decoding.decodeObject(value.string_map_data[parameterName1].value));
                (value.string_map_data && value.string_map_data[parameterName2].timestamp) && (newItem.date = new Date(1000 * value.string_map_data[parameterName2].timestamp));
                model.list.push(newItem);
            });
            return model.list.length > 0 ? model : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parsePostViewed');
            return undefined;
        }
    }

    /**
     * @param data - file 'ads_and_content/videos_watched.json' in input as Buffer
     * @return {Promise<VideoWatched | undefined>}
     */
    async parseVideoWatched(data: Buffer): Promise<VideoWatched | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName1 = this.configInstagram.get(`${this.prefix}-21-author`);
            let parameterName2 = this.configInstagram.get(`${this.prefix}-22-time`);
            let model: VideoWatched = {list: []};
            document.impressions_history_videos_watched.map((value: any) => {
                let newItem: Media = {};
                (value.string_map_data && value.string_map_data[parameterName1].value) && (newItem.title = Decoding.decodeObject(value.string_map_data[parameterName1].value));
                (value.string_map_data && value.string_map_data[parameterName2].timestamp) && (newItem.date = new Date(1000 * value.string_map_data[parameterName2].timestamp));
                model.list.push(newItem);
            });
            return model.list.length > 0 ? model : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseVideoWatched');
            return undefined;
        }
    }

    /**
     * @param data - file 'ads_and_content/suggested_accounts_viewed.json' in input as Buffer
     * @return {Promise<SuggestedAccountViewed | undefined>}
     */
    async parseSuggestedAccountViewed(data: Buffer): Promise<SuggestedAccountViewed | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName1 = this.configInstagram.get(`${this.prefix}-23-username`);
            let parameterName2 = this.configInstagram.get(`${this.prefix}-24-time`);
            let model: SuggestedAccountViewed = {list: []};
            document.impressions_history_chaining_seen.map((value: any) => {
                let newItem: Account = {};
                (value.string_map_data && value.string_map_data[parameterName1].value) && (newItem.name = Decoding.decodeObject(value.string_map_data[parameterName1].value));
                (value.string_map_data && value.string_map_data[parameterName2].timestamp) && (newItem.date = new Date(1000 * value.string_map_data[parameterName2].timestamp));
                model.list.push(newItem);
            });
            return model.list.length > 0 ? model : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseSuggestedAccountViewed');
            return undefined;
        }
    }

    /**
     * @param data - file 'ads_and_content/accounts_you're_not_interested_in.json' in input as Buffer
     * @return {Promise<AccountYouAreNotInterested | undefined>}
     */
    async parseAccountYouAreNotInterested(data: Buffer): Promise<AccountYouAreNotInterested | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName1 = this.configInstagram.get(`${this.prefix}-25-username`);
            let parameterName2 = this.configInstagram.get(`${this.prefix}-26-dateAndTime`);
            let model: SuggestedAccountViewed = {list: []};
            document.impressions_history_recs_hidden_authors.map((value: any) => {
                let newItem: Account = {};
                (value.string_map_data && value.string_map_data[parameterName1].value) && (newItem.name = Decoding.decodeObject(value.string_map_data[parameterName1].value));
                (value.string_map_data && value.string_map_data[parameterName2].timestamp) && (newItem.date = new Date(1000 * value.string_map_data[parameterName2].timestamp));
                model.list.push(newItem);
            });
            return model.list.length > 0 ? model : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseAccountYouAreNotInterested');
            return undefined;
        }
    }

    /**
     * @param data - file 'comments/post_comments.json' in input as Buffer
     * @return {Promise<CommentsPosted | undefined>}
     */
    async parseCommentsPosted(data: Buffer): Promise<CommentsPosted | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: CommentsPosted = {list: []};
            document.comments_media_comments.map((value: any) => {
                let newItem: CommentPosted = {};
                (value.title) && (newItem.toUser = Decoding.decodeObject(value.title));
                (value.string_list_data && value.string_list_data[0].value) && (newItem.text = Decoding.decodeObject(value.string_list_data[0].value));
                (value.string_list_data && value.string_list_data[0].timestamp) && (newItem.date = new Date(1000 * value.string_list_data[0].timestamp));
                model.list.push(newItem);
            });
            return model.list.length > 0 ? model : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseCommentsPosted');
            return undefined;
        }
    }

    /**
     * @param data - file 'contacts/synced_contacts.json' in input as Buffer
     * @return {Promise<SyncedContracts | undefined>}
     */
    async parseSyncedContracts(data: Buffer): Promise<SyncedContracts | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName1 = this.configInstagram.get(`${this.prefix}-27-name`);
            let parameterName2 = this.configInstagram.get(`${this.prefix}-28-secondName`);
            let parameterName3 = this.configInstagram.get(`${this.prefix}-29-contactInfo`);
            let model: SyncedContracts = {list: []};
            document.contacts_contact_info.map((value: any) => {
                let newItem: ContactSynced = {};
                (value.string_map_data && value.string_map_data[parameterName1].value) && (newItem.firstName = Decoding.decodeObject(value.string_map_data[parameterName1].value));
                (value.string_map_data && value.string_map_data[parameterName2].value) && (newItem.secondName = Decoding.decodeObject(value.string_map_data[parameterName2].value));
                (value.string_map_data && value.string_map_data[parameterName3].value) && (newItem.contactInfo = Decoding.decodeObject(value.string_map_data[parameterName3].value));
                model.list.push(newItem);
            });
            return model.list.length > 0 ? model : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseSyncedContracts');
            return undefined;
        }
    }

    /**
     * @param data - file 'content/archived_posts.json' in input as Buffer
     * @return {Promise<ArchivedPosts | undefined>}
     */
    async parseArchivedPost(data: Buffer): Promise<ArchivedPosts | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: ArchivedPosts = {list: []};
            document.ig_archived_post_media.map((value: any) => {
                let newItem: Post = {};
                (value.media && value.media[0].uri) && (newItem.uri = Decoding.decodeObject(value.media[0].uri));
                (value.media && value.media[0].creation_timestamp) && (newItem.date = new Date(1000 * value.media[0].creation_timestamp));
                model.list.push(newItem);
            });
            return model.list.length > 0 ? model : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseArchivedPost');
            return undefined;
        }
    }

    /**
     * @param data - file 'content/posts_1.json' in input as Buffer
     * @return {Promise<PersonalPosts | undefined>}
     */
    async parsePersonalPost(data: Buffer): Promise<PersonalPosts | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: PersonalPosts = {list: []};
            document.map((value: any) => {
                let newItem: Post = {};
                (value.media && value.media[0].uri) && (newItem.uri = Decoding.decodeObject(value.media[0].uri));
                (value.media && value.media[0].title) && (newItem.title = Decoding.decodeObject(value.media[0].title));
                (value.media && value.media[0].creation_timestamp) && (newItem.date = new Date(1000 * value.media[0].creation_timestamp));
                model.list.push(newItem);
            });
            return model.list.length > 0 ? model : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parsePersonalPost');
            return undefined;
        }
    }

    /**
     * @param data - file 'content/stories.json' in input as Buffer
     * @return {Promise<PersonalStories | undefined>}
     */
    async parsePersonalStories(data: Buffer): Promise<PersonalStories | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: PersonalStories = {list: []};
            document.ig_stories.map((value: any) => {
                let newItem: Story = {};
                (value.uri) && (newItem.uri = Decoding.decodeObject(value.uri));
                (value.title) && (newItem.title = Decoding.decodeObject(value.title));
                (value.creation_timestamp) && (newItem.date = new Date(1000 * value.creation_timestamp));
                model.list.push(newItem);
            });
            return model.list.length > 0 ? model : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parsePersonalStories');
            return undefined;
        }
    }

    /**
     * @param data - file 'followers_and_following/followers.json' in input as Buffer
     * @return {Promise<Followers | undefined>}
     */
    async parseFollowers(data: Buffer): Promise<Followers | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: Followers = {list: []};
            document.relationships_followers.map((value: any) => {
                let newItem: Account = {};
                (value.string_list_data && value.string_list_data[0].href) && (newItem.href = Decoding.decodeObject(value.string_list_data[0].href));
                (value.string_list_data && value.string_list_data[0].value) && (newItem.name = Decoding.decodeObject(value.string_list_data[0].value));
                (value.string_list_data && value.string_list_data[0].timestamp) && (newItem.date = new Date(1000 * value.string_list_data[0].timestamp));
                model.list.push(newItem);
            });
            return model.list.length > 0 ? model : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseFollowers');
            return undefined;
        }
    }

    /**
     * @param data - file 'likes/liked_comments.json' in input as Buffer
     * @return {Promise<FollowingAccounts | undefined>}
     */
    async parseFollowingAccounts(data: Buffer): Promise<FollowingAccounts | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: FollowingAccounts = {list: []};
            document.relationships_following.map((value: any) => {
                let newItem: Account = {};
                (value.string_list_data && value.string_list_data[0].href) && (newItem.href = Decoding.decodeObject(value.string_list_data[0].href));
                (value.string_list_data && value.string_list_data[0].value) && (newItem.name = Decoding.decodeObject(value.string_list_data[0].value));
                (value.string_list_data && value.string_list_data[0].timestamp) && (newItem.date = new Date(1000 * value.string_list_data[0].timestamp));
                model.list.push(newItem);
            });
            return model.list.length > 0 ? model : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseFollowingAccounts');
            return undefined;
        }
    }

    /**
     * @param data - file 'followers_and_following/following_hashtags.json' in input as Buffer
     * @return {Promise<FollowingHashtags | undefined>}
     */
    async parseFollowingHashtags(data: Buffer): Promise<FollowingHashtags | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: FollowingAccounts = {list: []};
            document.relationships_following_hashtags.map((value: any) => {
                let newItem: Account = {};
                (value.string_list_data && value.string_list_data[0].href) && (newItem.href = Decoding.decodeObject(value.string_list_data[0].href));
                (value.string_list_data && value.string_list_data[0].value) && (newItem.name = Decoding.decodeObject(value.string_list_data[0].value));
                (value.string_list_data && value.string_list_data[0].timestamp) && (newItem.date = new Date(1000 * value.string_list_data[0].timestamp));
                model.list.push(newItem);
            });
            return model.list.length > 0 ? model : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseFollowingHashtags');
            return undefined;
        }
    }

    /**
     * @param data - file 'likes/liked_posts.json' in input as Buffer
     * @return {Promise<LikedPosts | undefined>}
     */
    async parseLikedPosts(data: Buffer): Promise<LikedPosts | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: LikedPosts = {list: []};
            document.likes_media_likes.map((value: any) => {
                let newItem: Like = {};
                (value.title) && (newItem.title = Decoding.decodeObject(value.title));
                (value.string_list_data && value.string_list_data[0].href) && (newItem.href = Decoding.decodeObject(value.string_list_data[0].href));
                (value.string_list_data && value.string_list_data[0].value) && (newItem.emoticon = Decoding.decodeObject(value.string_list_data[0].value));
                (value.string_list_data && value.string_list_data[0].timestamp) && (newItem.date = new Date(1000 * value.string_list_data[0].timestamp));
                model.list.push(newItem);
            });
            return model.list.length > 0 ? model : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseLikedPosts');
            return undefined;
        }
    }

    /**
     * @param data - file 'likes/liked_comments.json' in input as Buffer
     * @return {Promise<LikedComments | undefined>}
     */
    async parseLikedComments(data: Buffer): Promise<LikedComments | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: LikedPosts = {list: []};
            document.likes_comment_likes.map((value: any) => {
                let newItem: Like = {};
                (value.title) && (newItem.title = Decoding.decodeObject(value.title));
                (value.string_list_data && value.string_list_data[0].href) && (newItem.href = Decoding.decodeObject(value.string_list_data[0].href));
                (value.string_list_data && value.string_list_data[0].value) && (newItem.emoticon = Decoding.decodeObject(value.string_list_data[0].value));
                (value.string_list_data && value.string_list_data[0].timestamp) && (newItem.date = new Date(1000 * value.string_list_data[0].timestamp));
                model.list.push(newItem);
            });
            return model.list.length > 0 ? model : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseLikedComments');
            return undefined;
        }
    }

    /**
     * @param data - file 'recent_search/account_searches.json' in input as Buffer
     * @return {Promise<Searches | undefined>}
     */
    async parseSearches(data: Buffer): Promise<Searches | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName1 = this.configInstagram.get(`${this.prefix}-30-search`);
            let parameterName2 = this.configInstagram.get(`${this.prefix}-31-time`);
            let model: Searches = {list: []};
            document.searches_user.map((value: any) => {
                let newItem: Search = {};
                (value.string_map_data && value.string_map_data[parameterName1].value) && (newItem.text = Decoding.decodeObject(value.string_map_data[parameterName1].value));
                (value.string_map_data && value.string_map_data[parameterName2].timestamp) && (newItem.date = new Date(1000 * value.string_map_data[parameterName2].timestamp));
                model.list.push(newItem);
            });
            return model.list.length > 0 ? model : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseSearches');
            return undefined;
        }
    }

    /**
     * @param data - file 'your_topics/your_reels_sentiments.json' in input as Buffer
     * @return {Promise<ReelSentiments | undefined>}
     */
    async parseReelSentiments(data: Buffer): Promise<ReelSentiments | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName = this.configInstagram.get(`${this.prefix}-32-name`);
            let model: ReelSentiments = {list: []};
            document.topics_your_reels_emotions.map((value: any) => {
                let newItem: Sentiment = {};
                (value.string_map_data && value.string_map_data[parameterName].value) && (newItem.value = Decoding.decodeObject(value.string_map_data[parameterName].value));
                model.list.push(newItem);
            });
            return model.list.length > 0 ? model : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseReelSentiments');
            return undefined;
        }
    }

    /**
     * @param data - file 'your_topics/your_reels_topics.json' in input as Buffer
     * @return {Promise<ReelTopics | undefined>}
     */
    async parseReelTopics(data: Buffer): Promise<ReelTopics | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName = this.configInstagram.get(`${this.prefix}-33-name`);
            let model: ReelTopics = {list: []};
            document.topics_your_reels_topics.map((value: any) => {
                let newItem: Topic = {};
                (value.string_map_data && value.string_map_data[parameterName].value) && (newItem.value = Decoding.decodeObject(value.string_map_data[parameterName].value));
                model.list.push(newItem);
            });
            return model.list.length > 0 ? model : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseReelTopics');
            return undefined;
        }
    }

    /**
     * @param data - file 'your_topics/your_topics.json' in input as Buffer
     * @return {Promise<Topics | undefined>}
     */
    async parseTopics(data: Buffer): Promise<Topics | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let parameterName = this.configInstagram.get(`${this.prefix}-34-name`);
            let model: Topics = {list: []};
            document.topics_your_topics.map((value: any) => {
                let newItem: Topic = {};
                (value.string_map_data && value.string_map_data[parameterName].value) && (newItem.value = Decoding.decodeObject(value.string_map_data[parameterName].value));
                model.list.push(newItem);
            });
            return model.list.length > 0 ? model : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseTopics');
            return undefined;
        }
    }

    /**
     * @param data - file 'story_sticker_interactions/emoji_sliders.json' in input as Buffer
     * @return {Promise<EmojiSliders | undefined>}
     */
    async parseEmojiSliders(data: Buffer): Promise<EmojiSliders | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: EmojiSliders = {list: []};
            document.story_activities_emoji_sliders.map((value: any) => {
                let newItem: EmojiSlider = {};
                (value.title) && (newItem.title = Decoding.decodeObject(value.title));
                (value.string_list_data && value.string_list_data[0] && value.string_list_data[0].timestamp) && (newItem.date = new Date(1000 * value.string_list_data[0].timestamp));
                model.list.push(newItem);
            });
            return model.list.length > 0 ? model : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseEmojiSliders');
            return undefined;
        }
    }

    /**
     * @param data - file 'story_sticker_interactions/polls.json' in input as Buffer
     * @return {Promise<Polls | undefined>}
     */
    async parsePolls(data: Buffer): Promise<Polls | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: Polls = {list: []};
            document.story_activities_polls.map((value: any) => {
                let newItem: Poll = {};
                (value.title) && (newItem.title = Decoding.decodeObject(value.title));
                (value.string_list_data && value.string_list_data[0] && value.string_list_data[0].timestamp) && (newItem.date = new Date(1000 * value.string_list_data[0].timestamp));
                model.list.push(newItem);
            });
            return model.list.length > 0 ? model : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parsePolls');
            return undefined;
        }
    }

    /**
     * @param data - file 'story_sticker_interactions/quizzes.json' in input as Buffer
     * @return {Promise<Quizzes | undefined>}
     */
    async parseQuizzes(data: Buffer): Promise<Quizzes | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let model: Quizzes = {list: []};
            document.story_activities_quizzes.map((value: any) => {
                let newItem: Quiz = {};
                (value.title) && (newItem.title = Decoding.decodeObject(value.title));
                (value.string_list_data && value.string_list_data[0] && value.string_list_data[0].timestamp) && (newItem.date = new Date(1000 * value.string_list_data[0].timestamp));
                model.list.push(newItem);
            });
            return model.list.length > 0 ? model : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseQuizzes');
            return undefined;
        }
    }

    /**
     * @param data - file 'monetization/eligibility.json' in input as Buffer
     * @return {Promise<Eligibility | undefined>}
     */
    async parseEligibility(data: Buffer): Promise<Eligibility | undefined> {
        try {
            let eligibility: Eligibility = {};
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
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseEligibility');
            return undefined;
        }
    }

    /**
     * @param data - file 'messages/inbox/{chat_directory_name}/message_1.json' in input as Buffer
     * @return {Promise<Conversation | undefined>}
     */
    async parseMessages(data: Buffer): Promise<Conversation | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let messages: Message[] = [];
            (document.messages) && (messages = document.messages.map((value: any) => {
                let model: Message = {};
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

            let conversationModel: Conversation = {};
            (document.title) && (conversationModel.title = Decoding.decodeObject(document.title));
            (messages) && (conversationModel.listMessages = messages);
            (participants) && (conversationModel.participants = participants);
            (document.is_still_participant) && (conversationModel.isStillParticipant = document.is_still_participant);

            return !Validator.objectIsEmpty(conversationModel) ? conversationModel : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseMessages');
            return undefined;
        }
    }
}