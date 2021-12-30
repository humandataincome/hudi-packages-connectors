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

export class InstagramService {
    private logger = new Logger("Instagram Service");
    private readonly configInstagram;
    private readonly prefix: string;

    constructor(config: ConfigInstagram) {
        this.configInstagram = config;
        this.prefix = this.configInstagram.languageMode;
    }

    async parsePersonalInformation(data: Buffer): Promise<PersonalInformation | undefined> {
        let personalInfoModel: PersonalInformation = {};
        try {
            let document = JSON.parse(data.toString());
            try {
                personalInfoModel.username = Decoding.decodeObject(document.profile_user[0].string_map_data[this.configInstagram.get(`${this.prefix}-username`)].value);
            } catch {
                this.logger.log('info', 'username parameter is missing','parsePersonalInformation');
            }try {
                personalInfoModel.name = Decoding.decodeObject(document.profile_user[0].string_map_data[this.configInstagram.get(`${this.prefix}-name`)].value);
            } catch {
                this.logger.log('info', 'name parameter is missing', 'parsePersonalInformation');
            }try {
                personalInfoModel.email = Decoding.decodeObject(document.profile_user[0].string_map_data[this.configInstagram.get(`${this.prefix}-email`)].value);
            } catch {
                this.logger.log('info', 'email parameter is missing','parsePersonalInformation');
            }
            try {
                personalInfoModel.private = document.profile_user[0].string_map_data[this.configInstagram.get(`${this.prefix}-privateAccount`)].value;
            } catch {
                this.logger.log('info', 'privateAccount parameter is missing','parsePersonalInformation');
            }
            try {
                let date = Decoding.decodeObject(document.profile_user[0].string_map_data[this.configInstagram.get(`${this.prefix}-birthdate`)].value);
                let match = date.split('-');
                match && (personalInfoModel.birthdate = new Date(Date.UTC(match[0], match[1]-1, match[2], 0, 0, 0)));
            } catch {
                this.logger.log('info', 'birthdate parameter is missing','parsePersonalInformation');
            }
            try {
                personalInfoModel.phoneNumber = Decoding.decodeObject(document.profile_user[0].string_map_data[this.configInstagram.get(`${this.prefix}-phoneNumber`)].value);
            } catch {
                this.logger.log('info', 'phoneNumber parameter is missing','parsePersonalInformation');
            }
            try {
                personalInfoModel.biography = Decoding.decodeObject(document.profile_user[0].string_map_data[this.configInstagram.get(`${this.prefix}-biography`)].value);
            } catch {
                this.logger.log('info', 'biography parameter is missing', 'parsePersonalInformation');
            }
            try {
                personalInfoModel.gender = Decoding.decodeObject(document.profile_user[0].string_map_data[this.configInstagram.get(`${this.prefix}-gender`)].value);
            } catch {
                this.logger.log('info', 'gender parameter is missing','parsePersonalInformation');
            }
            return personalInfoModel != {} ? personalInfoModel : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parsePersonalInformation');
        }
    }

    async parseLocation(data: Buffer): Promise<LocationInformation | undefined>{
        try {
            let document = JSON.parse(data.toString());
            return {basedIn: Decoding.decodeObject(document.inferred_data_primary_location[0].string_map_data[this.configInstagram.get(`${this.prefix}-cityName`)].value)};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseLocation');
        }
    }

    async parseAdsClicked(data: Buffer): Promise<AdsClicked | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {list: document.impressions_history_ads_clicked.map((value: any) => Decoding.decodeObject(value.title))};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseAdsClicked');
        }
    }

    async parseAdsViewed(data: Buffer): Promise<AdsViewed | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {list: document.impressions_history_ads_seen.map((value:any) => Decoding.decodeObject(value.string_map_data[this.configInstagram.get(`${this.prefix}-author`)].value))};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseAdsViewed');
        }
    }

    async parseAdsInterests(data: Buffer): Promise<AdsInterests | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {list: document.inferred_data_ig_interest.map((value: any) => Decoding.decodeObject(value.string_map_data[this.configInstagram.get(`${this.prefix}-interest`)].value))};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseAdsInterests');
        }
    }

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

    async parsePostViewed(data: Buffer): Promise<PostViewed | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {list: document.impressions_history_posts_seen.map((value: any) => Decoding.decodeObject(value.string_map_data[this.configInstagram.get(`${this.prefix}-author`)].value))};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parsePostViewed');
        }
    }

    async parseVideoWatched(data: Buffer): Promise<VideoWatched | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {list: document.impressions_history_videos_watched.map((value: any) => Decoding.decodeObject(value.string_map_data[this.configInstagram.get(`${this.prefix}-author`)].value))};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseVideoWatched');
        }
    }

    async parseSuggestedAccountViewed(data: Buffer): Promise<SuggestedAccountViewed | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {list: document.impressions_history_chaining_seen.map((value: any) => Decoding.decodeObject(value.string_map_data[this.configInstagram.get(`${this.prefix}-username`)].value))};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseSuggestedAccountViewed');
        }
    }

    async parseAccountYouAreNotInterested(data: Buffer): Promise<AccountYouAreNotInterested | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {list: document.impressions_history_recs_hidden_authors.map((value: any) => Decoding.decodeObject(value.string_map_data[this.configInstagram.get(`${this.prefix}-username`)].value))};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseAccountYouAreNotInterested');
        }
    }

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

    async parseReelSentiments(data: Buffer): Promise<ReelSentiments | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {list: document.topics_your_reels_emotions.map((value: any) => Decoding.decodeObject(value.string_map_data[this.configInstagram.get(`${this.prefix}-name`)].value))};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseReelSentiments');
        }
    }

    async parseReelTopics(data: Buffer): Promise<ReelTopics | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {list: document.topics_your_reels_topics.map((value: any) => Decoding.decodeObject(value.string_map_data[this.configInstagram.get(`${this.prefix}-name`)].value))};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseReelTopics');
        }
    }

    async parseTopics(data: Buffer): Promise<Topics | undefined> {
        try {
            let document = JSON.parse(data.toString());
            return {list: document.topics_your_topics.map((value: any) => Decoding.decodeObject(value.string_map_data[this.configInstagram.get(`${this.prefix}-name`)].value))};
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseTopics');
        }
    }

    async parseMessages(data: Buffer): Promise<Conversation | undefined> {
        try {
            let document = JSON.parse(data.toString());
            //console.log(document)
            let messages = document.messages.map((value: any) => {
                let newValue: Message = {
                    sender_name: Decoding.decodeObject(value.sender_name),
                    timestamp_ms: value.timestamp_ms,
                    content: Decoding.decodeObject(value.content),
                    type: Decoding.decodeObject(value.type),
                    is_unsent: value.is_unsent
                }
                try {
                    newValue.link = Decoding.decodeObject(value.share.link);
                } catch {
                    //do nothing: link parameter might be present or not, in both cases it's not an error
                }
                return newValue;
            });
            let participants = document.participants.map((value: any) => Decoding.decodeObject(value.name));

             return {
                title: Decoding.decodeObject(document.title),
                listMessages: messages,
                participants: participants,
                is_still_participant: document.is_still_participant
            }
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseMessages');
        }
    }
}