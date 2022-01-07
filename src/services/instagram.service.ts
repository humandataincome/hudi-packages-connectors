import {ConfigInstagram} from "../config/config.instagram";
import {
    AccountYouAreNotInterested, AdsClicked, AdsInterests, AdsViewed, ArchivedPosts,
    CommentsPosted,
    Conversation,
    Followers,
    FollowingAccounts, FollowingHashtags,
    LikedComments,
    LikedPosts, LocationInformation, Message, MusicHeardInStories, MusicRecentlyUsedInStories,
    PersonalInformation,
    PersonalPosts,
    PostViewed, ReelSentiments, ReelTopics,
    Searches, SuggestedAccountViewed,
    SyncedContracts, Topics, VideoWatched
} from "../models/instagram.model";
import Logger from "../utils/logger";
import {Decoding} from "../utils/decoding";
import {Validating} from "../utils/validating";

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
     * @param config - the service needs a language configuration since the json files have unique fields for any country
     *                  (i.e 'Nome utente' for italian instead of 'Username')
     */
    constructor(config: ConfigInstagram) {
        this.configInstagram = config;
        this.prefix = this.configInstagram.languageMode;
    }

    /**
     * @param data - file 'account_information/personal_information.json' in input as Buffer
     * @return {Promise<PersonalInformation | undefined>}
     */
    async parsePersonalInformation(data: Buffer): Promise<PersonalInformation | undefined> {
        let personalInfoModel: PersonalInformation = {};
        try {
            let document = JSON.parse(data.toString());
            try {
                let parameterName = this.configInstagram.get(`${this.prefix}-username`);
                personalInfoModel.username = Decoding.decodeObject(document.profile_user[0].string_map_data[parameterName].value);
            } catch {}
            try {
                personalInfoModel.name = Decoding.decodeObject(document.profile_user[0].string_map_data[this.configInstagram.get(`${this.prefix}-name`)].value);
            } catch {}
            try {
                personalInfoModel.email = Decoding.decodeObject(document.profile_user[0].string_map_data[this.configInstagram.get(`${this.prefix}-email`)].value);
            } catch {}
            try {
                personalInfoModel.private = document.profile_user[0].string_map_data[this.configInstagram.get(`${this.prefix}-privateAccount`)].value;
            } catch {}
            try {
                let date = Decoding.decodeObject(document.profile_user[0].string_map_data[this.configInstagram.get(`${this.prefix}-birthdate`)].value);
                let match = date.split('-');
                match && (personalInfoModel.birthdate = new Date(Date.UTC(match[0], match[1]-1, match[2], 0, 0, 0)));
            } catch {}
            try {
                personalInfoModel.phoneNumber = Decoding.decodeObject(document.profile_user[0].string_map_data[this.configInstagram.get(`${this.prefix}-phoneNumber`)].value);
            } catch {}
            try {
                personalInfoModel.biography = Decoding.decodeObject(document.profile_user[0].string_map_data[this.configInstagram.get(`${this.prefix}-biography`)].value);
            } catch {}
            try {
                personalInfoModel.gender = Decoding.decodeObject(document.profile_user[0].string_map_data[this.configInstagram.get(`${this.prefix}-gender`)].value);
            } catch {}
            return !Validating.objectIsEmpty(personalInfoModel) ? personalInfoModel : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parsePersonalInformation');
        }
    }

    /**
     * @param data - file 'account_information/personal_information.json' in input as Buffer
     * @return {Promise<LocationInformation | undefined>}
     */
    async parseLocation(data: Buffer): Promise<LocationInformation | undefined>{
        try {
            let document = JSON.parse(data.toString());
            return {basedIn: Decoding.decodeObject(document.inferred_data_primary_location[0].string_map_data[this.configInstagram.get(`${this.prefix}-cityName`)].value)};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseLocation');
        }
    }

    /**
     * @param data - file 'ads_and_content/ads_clicked.json' in input as Buffer
     * @return {Promise<AdsClicked | undefined>}
     */
    async parseAdsClicked(data: Buffer): Promise<AdsClicked | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {list: document.impressions_history_ads_clicked.map((value: any) => Decoding.decodeObject(value.title))};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseAdsClicked');
        }
    }

    /**
     * @param data - file 'ads_and_content/ads_viewed.json' in input as Buffer
     * @return {Promise<AdsViewed | undefined>}
     */
    async parseAdsViewed(data: Buffer): Promise<AdsViewed | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {list: document.impressions_history_ads_seen.map((value:any) => Decoding.decodeObject(value.string_map_data[this.configInstagram.get(`${this.prefix}-author`)].value))};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseAdsViewed');
        }
    }

    /**
     * @param data - file 'information_about_you/ads_interests.json' in input as Buffer
     * @return {Promise<AdsInterests | undefined>}
     */
    async parseAdsInterests(data: Buffer): Promise<AdsInterests | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {list: document.inferred_data_ig_interest.map((value: any) => Decoding.decodeObject(value.string_map_data[this.configInstagram.get(`${this.prefix}-interest`)].value))};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseAdsInterests');
        }
    }

    /**
     * @param data - file 'ads_and_content/music_heard_in_stories.json' in input as Buffer
     * @return {Promise<MusicHeardInStories | undefined>}
     */
    async parseMusicHeardInStories(data: Buffer): Promise<MusicHeardInStories | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {list: document.impressions_history_music_heard_in_stories.map((value: any) => {
                return {
                    title: Decoding.decodeObject(value.string_map_data[this.configInstagram.get(`${this.prefix}-song`)].value),
                    artist: Decoding.decodeObject(value.string_map_data[this.configInstagram.get(`${this.prefix}-artist`)].value),
                    time: new Date(1000 * value.string_map_data[this.configInstagram.get(`${this.prefix}-time`)].timestamp)
                }
            })};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseMusicHeardInStories');
        }
    }

    /**
     * @param data - file 'ads_and_content/music_recently_used_in_stories.json' in input as Buffer
     * @return {Promise<MusicRecentlyUsedInStories | undefined>}
     */
    async parseMusicRecentlyUsedInStories(data: Buffer): Promise<MusicRecentlyUsedInStories | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {list: document.impressions_history_music_recently_used_in_stories.map((value: any) => {
                return {
                    title: Decoding.decodeObject(value.string_map_data[this.configInstagram.get(`${this.prefix}-song`)].value),
                    artist: Decoding.decodeObject(value.string_map_data[this.configInstagram.get(`${this.prefix}-artist`)].value),
                    time: new Date(1000 * value.string_map_data[this.configInstagram.get(`${this.prefix}-time`)].timestamp)
                }
            })};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseMusicRecentlyUsedInStories');
        }
    }

    /**
     * @param data - file 'ads_and_content/posts_viewed.json' in input as Buffer
     * @return {Promise<PostViewed | undefined>}
     */
    async parsePostViewed(data: Buffer): Promise<PostViewed | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {list: document.impressions_history_posts_seen.map((value: any) => Decoding.decodeObject(value.string_map_data[this.configInstagram.get(`${this.prefix}-author`)].value))};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parsePostViewed');
        }
    }

    /**
     * @param data - file 'ads_and_content/videos_watched.json' in input as Buffer
     * @return {Promise<VideoWatched | undefined>}
     */
    async parseVideoWatched(data: Buffer): Promise<VideoWatched | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {list: document.impressions_history_videos_watched.map((value: any) => Decoding.decodeObject(value.string_map_data[this.configInstagram.get(`${this.prefix}-author`)].value))};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseVideoWatched');
        }
    }

    /**
     * @param data - file 'ads_and_content/suggested_accounts_viewed.json' in input as Buffer
     * @return {Promise<SuggestedAccountViewed | undefined>}
     */
    async parseSuggestedAccountViewed(data: Buffer): Promise<SuggestedAccountViewed | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {list: document.impressions_history_chaining_seen.map((value: any) => Decoding.decodeObject(value.string_map_data[this.configInstagram.get(`${this.prefix}-username`)].value))};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseSuggestedAccountViewed');
        }
    }

    /**
     * @param data - file 'ads_and_content/accounts_you're_not_interested_in.json' in input as Buffer
     * @return {Promise<AccountYouAreNotInterested | undefined>}
     */
    async parseAccountYouAreNotInterested(data: Buffer): Promise<AccountYouAreNotInterested | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {list: document.impressions_history_recs_hidden_authors.map((value: any) => Decoding.decodeObject(value.string_map_data[this.configInstagram.get(`${this.prefix}-username`)].value))};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseAccountYouAreNotInterested');
        }
    }

    /**
     * @param data - file 'comments/post_comments.json' in input as Buffer
     * @return {Promise<CommentsPosted | undefined>}
     */
    async parseCommentsPosted(data: Buffer): Promise<CommentsPosted | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {list: document.comments_media_comments.map((value: any) => {
                return {
                    toUser: Decoding.decodeObject(value.title),
                    text: Decoding.decodeObject(value.string_list_data[0].value),
                    time: new Date(1000 * value.string_list_data[0].timestamp)
                }
            })};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseCommentsPosted');
        }
    }

    /**
     * @param data - file 'contacts/synced_contacts.json' in input as Buffer
     * @return {Promise<SyncedContracts | undefined>}
     */
    async parseSyncedContracts(data: Buffer): Promise<SyncedContracts | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {list: document.contacts_contact_info.map((value: any) => {
                return {
                    firstName: Decoding.decodeObject(value.string_map_data[this.configInstagram.get(`${this.prefix}-name`)].value),
                    secondName: Decoding.decodeObject(value.string_map_data[this.configInstagram.get(`${this.prefix}-secondName`)].value),
                    contactInfo: Decoding.decodeObject(value.string_map_data[this.configInstagram.get(`${this.prefix}-contactInfo`)].value)
                }
            })};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseSyncedContracts');
        }
    }

    /**
     * @param data - file 'content/archived_posts.json' in input as Buffer
     * @return {Promise<ArchivedPosts | undefined>}
     */
    async parseArchivedPost(data: Buffer): Promise<ArchivedPosts | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {listArchivedPosts: document.ig_archived_post_media.map((value: any) => {
                return {
                    uri: Decoding.decodeObject(value.media[0].uri),
                    creation_timestamp: new Date(1000 * value.media[0].creation_timestamp),
                    title: Decoding.decodeObject(value.media[0].title)
                }
            })};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseArchivedPost');
        }
    }

    /**
     * @param data - file 'content/posts_1.json' in input as Buffer
     * @return {Promise<PersonalPosts | undefined>}
     */
    async parsePersonalPost(data: Buffer): Promise<PersonalPosts | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {listPost: document.map((value: any) => {
                return {
                    uri: Decoding.decodeObject(value.media[0].uri),
                    creation_timestamp: new Date(1000 * value.media[0].creation_timestamp),
                    title: Decoding.decodeObject(value.media[0].title)
                }
            })};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parsePersonalPost');
        }
    }

    /**
     * @param data - file 'followers_and_following/followers.json' in input as Buffer
     * @return {Promise<Followers | undefined>}
     */
    async parseFollowers(data: Buffer): Promise<Followers | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {listAccounts: document.relationships_followers.map((value: any) => {
                    return {
                        href: Decoding.decodeObject(value.string_list_data[0].href),
                        value: Decoding.decodeObject(value.string_list_data[0].value),
                        timestamp: new Date(1000 * value.string_list_data[0].timestamp)
                    }
                })};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseFollowers');
        }
    }

    /**
     * @param data - file 'likes/liked_comments.json' in input as Buffer
     * @return {Promise<FollowingAccounts | undefined>}
     */
    async parseFollowingAccounts(data: Buffer): Promise<FollowingAccounts | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {list: document.relationships_following.map((value: any) => {
                return {
                    href: Decoding.decodeObject(value.string_list_data[0].href),
                    value: Decoding.decodeObject(value.string_list_data[0].value),
                    timestamp: new Date(1000 * value.string_list_data[0].timestamp)
                }
            })};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseFollowingAccounts');
        }
    }

    /**
     * @param data - file 'followers_and_following/following_hashtags.json' in input as Buffer
     * @return {Promise<FollowingHashtags | undefined>}
     */
    async parseFollowingHashtags(data: Buffer): Promise<FollowingHashtags | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {list: document.relationships_following_hashtags.map((value: any) => {
                    return {
                        href: Decoding.decodeObject(value.string_list_data[0].href),
                        value: Decoding.decodeObject(value.string_list_data[0].value),
                        timestamp: new Date(1000 * value.string_list_data[0].timestamp)
                    }
                })};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseFollowingHashtags');
        }
    }

    /**
     * @param data - file 'likes/liked_posts.json' in input as Buffer
     * @return {Promise<LikedPosts | undefined>}
     */
    async parseLikedPosts(data: Buffer): Promise<LikedPosts | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {list: document.likes_comment_likes.map((value: any) => {
                return {
                    title: Decoding.decodeObject(value.title),
                    href: Decoding.decodeObject(value.string_list_data[0].href),
                    timestamp: new Date(1000 * value.string_list_data[0].timestamp)
                }
            })};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseLikedPosts');
        }
    }

    /**
     * @param data - file 'likes/liked_comments.json' in input as Buffer
     * @return {Promise<LikedComments | undefined>}
     */
    async parseLikedComments(data: Buffer): Promise<LikedComments | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {list: document.likes_media_likes.map((value: any) => {
                return {
                    title: Decoding.decodeObject(value.title),
                    href: Decoding.decodeObject(value.string_list_data[0].href),
                    timestamp: new Date(1000 * value.string_list_data[0].timestamp)
                }
            })};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseLikedComments');
        }
    }

    /**
     * @param data - file 'recent_search/account_searches.json' in input as Buffer
     * @return {Promise<Searches | undefined>}
     */
    async parseSearches(data: Buffer): Promise<Searches | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {list: document.searches_user.map((value: any) => {
                return {
                    value: Decoding.decodeObject(value.string_map_data[this.configInstagram.get(`${this.prefix}-search`)].value),
                    timestamp: new Date(1000 * value.string_map_data[this.configInstagram.get(`${this.prefix}-time`)].timestamp)
                }
            })};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseSearches');
        }
    }

    /**
     * @param data - file 'your_topics/your_reels_sentiments.json' in input as Buffer
     * @return {Promise<ReelSentiments | undefined>}
     */
    async parseReelSentiments(data: Buffer): Promise<ReelSentiments | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {list: document.topics_your_reels_emotions.map((value: any) => Decoding.decodeObject(value.string_map_data[this.configInstagram.get(`${this.prefix}-name`)].value))};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseReelSentiments');
        }
    }

    /**
     * @param data - file 'your_topics/your_reels_topics.json' in input as Buffer
     * @return {Promise<ReelTopics | undefined>}
     */
    async parseReelTopics(data: Buffer): Promise<ReelTopics | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {list: document.topics_your_reels_topics.map((value: any) => Decoding.decodeObject(value.string_map_data[this.configInstagram.get(`${this.prefix}-name`)].value))};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseReelTopics');
        }
    }

    /**
     * @param data - file 'your_topics/your_topics.json' in input as Buffer
     * @return {Promise<Topics | undefined>}
     */
    async parseTopics(data: Buffer): Promise<Topics | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {list: document.topics_your_topics.map((value: any) => Decoding.decodeObject(value.string_map_data[this.configInstagram.get(`${this.prefix}-name`)].value))};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseTopics');
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

            return !Validating.objectIsEmpty(conversationModel) ? conversationModel : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseMessages');
        }
    }
}