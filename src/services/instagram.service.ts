import {CONFIG} from "../config/config.utils"
import {ConfigInstagram} from "../config/config.instagram";
import {
    Account,
    AdsInformation,
    CommentPosted,
    CommentsPosted,
    ContactSynced,
    ContentInformation, Conversation, Conversations,
    Followers,
    Following,
    Like,
    LikedList, LocationInformation, Message,
    PersonalInformation,
    PersonalPosts,
    Post,
    Search,
    Searches, Song,
    SyncedContracts, Topics
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

    async fetchPersonalInformation(): Promise<PersonalInformation | undefined> {
        let personalInfoModel: PersonalInformation = {};
        try {
            let document = require(`${CONFIG.get('PATH')}instagram_json/account_information/personal_information.json`);
            try {
                personalInfoModel.username = Decoding.decodeObject(document.profile_user[0].string_map_data[this.configInstagram.get(`${this.prefix}-username`)].value);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - username parameter is missing');
            }try {
                personalInfoModel.name = Decoding.decodeObject(document.profile_user[0].string_map_data[this.configInstagram.get(`${this.prefix}-name`)].value);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - name parameter is missing');
            }try {
                personalInfoModel.email = Decoding.decodeObject(document.profile_user[0].string_map_data[this.configInstagram.get(`${this.prefix}-email`)].value);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - email parameter is missing');
            }
            try {
                personalInfoModel.private = document.profile_user[0].string_map_data[this.configInstagram.get(`${this.prefix}-privateAccount`)].value;
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - privateAccount parameter is missing');
            }
            try {
                let regex = /(\d+)-(\d+)-(\d+)/;
                let match: RegExpExecArray | null = regex.exec(Decoding.decodeObject(document.profile_user[0].string_map_data[this.configInstagram.get(`${this.prefix}-birthdate`)].value));
                match && (personalInfoModel.birthdate = {year: parseInt(match[0]), month: parseInt(match[1]), day: parseInt(match[2])});
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - birthdate parameter is missing');
            }
            try {
                personalInfoModel.phoneNumber = Decoding.decodeObject(document.profile_user[0].string_map_data[this.configInstagram.get(`${this.prefix}-phoneNumber`)].value);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - phoneNumber parameter is missing');
            }
            try {
                personalInfoModel.biography = Decoding.decodeObject(document.profile_user[0].string_map_data[this.configInstagram.get(`${this.prefix}-biography`)].value);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - biography parameter is missing');
            }
            try {
                personalInfoModel.gender = Decoding.decodeObject(document.profile_user[0].string_map_data[this.configInstagram.get(`${this.prefix}-gender`)].value);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - gender parameter is missing');
            }
            return personalInfoModel != {} ? personalInfoModel : undefined;
        } catch {
            this.logger.log('error', 'fetchPersonalInformation - personal_information.json');
        }
    }

    async fetchLocation(): Promise<LocationInformation | undefined>{
        try {
            let document = require(`${CONFIG.get('PATH')}instagram_json/information_about_you/account_based_in.json`);
            return {basedIn: Decoding.decodeObject(document.inferred_data_primary_location[0].string_map_data[this.configInstagram.get(`${this.prefix}-cityName`)].value)};
        } catch {
            this.logger.log('error', 'fetchPersonalInformation - account_based_in.json');
        }
    }

    async fetchAdsInformation(): Promise<AdsInformation | undefined> {
        let document, length, array;
        let adsInformationModel: AdsInformation = {};
        try {
            document = require(`${CONFIG.get('PATH')}instagram_json/ads_and_content/ads_clicked.json`);
            length = document.impressions_history_ads_clicked.length;
            array = new Array<string>(length);
            for (let i = 0; i < length; i++) {
                array[i] = Decoding.decodeObject(document.impressions_history_ads_clicked[i].title);
            }
            adsInformationModel.listAdsClicked = array;
        } catch {
            this.logger.log('error', "fetchAdsInformation - ads_clicked.json");
        }

        try {
            document = require(`${CONFIG.get('PATH')}instagram_json/ads_and_content/ads_viewed.json`);
            length = document.impressions_history_ads_seen.length;
            array = new Array<string>(length);
            for (let i = 0; i < length; i++) {
                array[i] = Decoding.decodeObject(document.impressions_history_ads_seen[i].string_map_data[this.configInstagram.get(`${this.prefix}-author`)].value);
            }
            adsInformationModel.listAdsViewed = array;
        } catch {
            this.logger.log('error', "fetchAdsInformation - ads_viewed.json");
        }

        try {
            document = require(`${CONFIG.get('PATH')}instagram_json/information_about_you/ads_interests.json`);
            length = document.inferred_data_ig_interest.length;
            array = new Array<string>(length);
            for (let i = 0; i < length; i++) {
                array[i] = Decoding.decodeObject(document.inferred_data_ig_interest[i].string_map_data[this.configInstagram.get(`${this.prefix}-interest`)].value);
            }
            adsInformationModel.listAdsInterests = array;
        } catch {
            this.logger.log('error', "fetchAdsInformation - ads_interests.json");
        }
        return adsInformationModel != {} ? adsInformationModel : undefined;
    }

    async fetchContentInformation(): Promise<ContentInformation | undefined> {
        let document, length, array;
        let contentInformationModel: ContentInformation = {};
        try {
            document = require(`${CONFIG.get('PATH')}instagram_json/ads_and_content/music_heard_in_stories.json`);
            length = document.impressions_history_music_heard_in_stories.length;
            array = new Array<Song>(length);
            for (let i = 0; i < length; i++) {
                let title = Decoding.decodeObject(document.impressions_history_music_heard_in_stories[i].string_map_data[this.configInstagram.get(`${this.prefix}-song`)].value);
                let artist = Decoding.decodeObject(document.impressions_history_music_heard_in_stories[i].string_map_data[this.configInstagram.get(`${this.prefix}-artist`)].value);
                let time = document.impressions_history_music_heard_in_stories[i].string_map_data[this.configInstagram.get(`${this.prefix}-time`)].timestamp;
                array[i] = {title: title, artist: artist, timestamp: time};
            }
            contentInformationModel.music_heard_in_stories = array;
        } catch {
            this.logger.log('error', "fetchContentInformation - music_heard_in_stories.json");
        }

        try {
            document = require(`${CONFIG.get('PATH')}instagram_json/ads_and_content/music_recently_used_in_stories.json`);
            length = document.impressions_history_music_recently_used_in_stories.length;
            array = new Array<Song>(length);
            for (let i = 0; i < length; i++) {
                let title = Decoding.decodeObject(document.impressions_history_music_recently_used_in_stories[i].string_map_data[this.configInstagram.get(`${this.prefix}-song`)].value);
                let artist = Decoding.decodeObject(document.impressions_history_music_recently_used_in_stories[i].string_map_data[this.configInstagram.get(`${this.prefix}-artist`)].value);
                let time = document.impressions_history_music_recently_used_in_stories[i].string_map_data[this.configInstagram.get(`${this.prefix}-time`)].timestamp;
                array[i] = {title: title, artist: artist, timestamp: time};
            }
            contentInformationModel.music_recently_used_in_stories = array;
        } catch {
            this.logger.log('error', "fetchContentInformation - music_recently_used_in_stories.json");
        }

        try {
            document = require(`${CONFIG.get('PATH')}instagram_json/ads_and_content/posts_viewed.json`);
            length = document.impressions_history_posts_seen.length;
            array = new Array<string>(length);
            for (let i = 0; i < length; i++) {
                array[i] = Decoding.decodeObject(document.impressions_history_posts_seen[i].string_map_data[this.configInstagram.get(`${this.prefix}-author`)].value);
            }
            contentInformationModel.posts_viewed = array;
        } catch {
            this.logger.log('error', "fetchContentInformation - posts_viewed.json");
        }

        try {
            document = require(`${CONFIG.get('PATH')}instagram_json/ads_and_content/videos_watched.json`);
            length = document.impressions_history_videos_watched.length;
            array = new Array<string>(length);
            for (let i = 0; i < length; i++) {
                array[i] = Decoding.decodeObject(document.impressions_history_videos_watched[i].string_map_data[this.configInstagram.get(`${this.prefix}-author`)].value);
            }
            contentInformationModel.videos_watched = array;
        } catch {
            this.logger.log('error', "fetchContentInformation - videos_watched.json");
        }

        try {
            document = require(`${CONFIG.get('PATH')}instagram_json/ads_and_content/suggested_accounts_viewed.json`);
            length = document.impressions_history_chaining_seen.length;
            array = new Array<string>(length);
            for (let i = 0; i < length; i++) {
                array[i] = Decoding.decodeObject(document.impressions_history_chaining_seen[i].string_map_data[this.configInstagram.get(`${this.prefix}-username`)].value);
            }
            contentInformationModel.suggested_accounts_viewed = array;
        } catch {
            this.logger.log('error', "fetchContentInformation - suggested_accounts_viewed.json");
        }

        try {
            document = require(`${CONFIG.get('PATH')}instagram_json/ads_and_content/accounts_you're_not_interested_in.json`);
            length = document.impressions_history_recs_hidden_authors.length;
            array = new Array<string>(length);
            for (let i = 0; i < length; i++) {
                array[i] = Decoding.decodeObject(document.impressions_history_recs_hidden_authors[i].string_map_data[this.configInstagram.get(`${this.prefix}-username`)].value);
            }
            contentInformationModel.account_you_are_not_interested = array;
        } catch {
            this.logger.log('error', "fetchContentInformation - accounts_you're_not_interested_in.json");
        }

        return contentInformationModel != {} ? contentInformationModel : undefined;
    }

    async fetchCommentsPosted(): Promise<CommentsPosted | undefined> {
        let document, length, array;
        try {
            document = require(`${CONFIG.get('PATH')}instagram_json/comments/post_comments.json`);
            length = document.comments_media_comments.length;
            array = new Array<CommentPosted>(length);
            for (let i = 0; i < length; i++) {
                let toUser = Decoding.decodeObject(document.comments_media_comments[i].title);
                let text = Decoding.decodeObject(document.comments_media_comments[i].string_list_data[0].value);
                let time = document.comments_media_comments[i].string_list_data[0].timestamp;
                array[i] = {text: text, toUser: toUser, timestamp: time};
            }
            return {listCommentsPosted: array};
        } catch {
            this.logger.log('error', "fetchCommentsPosted - post_comments.json");
        }
    }

    async fetchSyncedContracts(): Promise<SyncedContracts | undefined> {
        let document, length, array;
        try {
            document = require(`${CONFIG.get('PATH')}instagram_json/contacts/synced_contacts.json`);
            length = document.contacts_contact_info.length;
            array = new Array<ContactSynced>(length);
            for (let i = 0; i < length; i++) {
                let firstName = Decoding.decodeObject(document.contacts_contact_info[i].string_map_data[this.configInstagram.get(`${this.prefix}-name`)].value);
                let secondName = Decoding.decodeObject(document.contacts_contact_info[i].string_map_data[this.configInstagram.get(`${this.prefix}-secondName`)].value);
                let contactInfo = Decoding.decodeObject(document.contacts_contact_info[i].string_map_data[this.configInstagram.get(`${this.prefix}-contactInfo`)].value);
                array[i] = {firstName: firstName, secondName: secondName, contactInfo: contactInfo};
            }
            return {listContactSynced: array};
        } catch {
            this.logger.log('error', "fetchContentInformation - synced_contacts.json");
        }
    }

    async fetchPersonalPost(): Promise<PersonalPosts | undefined> {
        let document, length, array;
        let personalPostsModel: PersonalPosts = {};
        try {
            document = require(`${CONFIG.get('PATH')}instagram_json/content/archived_posts.json`);
            length = document.ig_archived_post_media.length;
            array = new Array<Post>(length);
            for (let i = 0; i < length; i++) {
                let uri = Decoding.decodeObject(document.ig_archived_post_media[i].media[0].uri);
                let creation_timestamp = document.ig_archived_post_media[i].media[0].creation_timestamp;
                let title = Decoding.decodeObject(document.ig_archived_post_media[i].media[0].title);
                array[i] = {uri: uri, creation_timestamp: creation_timestamp, title: title};
            }
            personalPostsModel.listArchivedPosts = array;
        } catch {
            this.logger.log('error', "fetchPersonalPost - archived_posts.json");
        }
        try {
            document = require(`${CONFIG.get('PATH')}instagram_json/content/posts_1.json`);
            length = document.length;
            array = new Array<Post>(length);
            for (let i = 0; i < length; i++) {
                let uri = Decoding.decodeObject(document[i].media[0].uri);
                let creation_timestamp = document[i].media[0].creation_timestamp;
                let title = Decoding.decodeObject(document[i].media[0].title);
                array[i] = {uri: uri, creation_timestamp: creation_timestamp, title: title};
            }
            personalPostsModel.listPost = array;
        } catch {
            this.logger.log('error', "fetchPersonalPost - posts_1.json");
        }
        return personalPostsModel != {} ? personalPostsModel : undefined;
    }

    async fetchFollowers(): Promise<Followers | undefined> {
        let document, length, array;
        let followersModel: Followers = {};
        try {
            document = require(`${CONFIG.get('PATH')}instagram_json/followers_and_following/followers.json`);
            length = document.relationships_followers.length;
            array = new Array<Account>(length);
            for (let i = 0; i < length; i++) {
                let href = Decoding.decodeObject(document.relationships_followers[i].string_list_data[0].href);
                let value = Decoding.decodeObject(document.relationships_followers[i].string_list_data[0].value);
                let timestamp = document.relationships_followers[i].string_list_data[0].timestamp;
                array[i] = {href: href, value: value, timestamp: timestamp};
            }
            followersModel.listAccounts = array;
            return followersModel;
        } catch {
            this.logger.log('error', "fetchFollowers - followers.json");
        }
    }

    async fetchFollowing(): Promise<Following | undefined> {
        let document, length, array;
        let followingModel: Following = {};
        try {
            document = require(`${CONFIG.get('PATH')}instagram_json/followers_and_following/following.json`);
            length = document.relationships_following.length;
            array = new Array<Account>(length);
            for (let i = 0; i < length; i++) {
                let href = Decoding.decodeObject(document.relationships_following[i].string_list_data[0].href);
                let value = Decoding.decodeObject(document.relationships_following[i].string_list_data[0].value);
                let timestamp = document.relationships_following[i].string_list_data[0].timestamp;
                array[i] = {href: href, value: value, timestamp: timestamp};
            }
            followingModel.listAccounts = array;
        } catch {
            this.logger.log('error', "fetchFollowing - following.json");
        }
        try {
            document = require(`${CONFIG.get('PATH')}instagram_json/followers_and_following/following_hashtags.json`);
            length = document.relationships_following_hashtags.length;
            array = new Array<Account>(length);
            for (let i = 0; i < length; i++) {
                let href = Decoding.decodeObject(document.relationships_following_hashtags[i].string_list_data[0].href);
                let value = Decoding.decodeObject(document.relationships_following_hashtags[i].string_list_data[0].value);
                let timestamp = document.relationships_following_hashtags[i].string_list_data[0].timestamp;
                array[i] = {href: href, value: value, timestamp: timestamp};
            }
            followingModel.listHashtags = array;
        } catch {
            this.logger.log('error', "fetchFollowing - following_hashtags.json");
        }
        return followingModel != {} ? followingModel : undefined;
    }

    async fetchLikes(): Promise<LikedList | undefined> {
        let document, length, array;
        let likedListModel: LikedList = {};
        try {
            document = require(`${CONFIG.get('PATH')}instagram_json/likes/liked_comments.json`);
            length = document.likes_comment_likes.length;
            array = new Array<Like>(length);
            for (let i = 0; i < length; i++) {
                let title = Decoding.decodeObject(document.likes_comment_likes[i].title);
                let href = Decoding.decodeObject(document.likes_comment_likes[i].string_list_data[0].href);
                let timestamp = document.likes_comment_likes[i].string_list_data[0].timestamp;
                array[i] = {title: title, href: href, timestamp: timestamp};
            }
            likedListModel.listLikedComments = array;
        } catch {
            this.logger.log('error', "fetchLikes - liked_comments.json");
        }
        try {
            document = require(`${CONFIG.get('PATH')}instagram_json/likes/liked_posts.json`);
            length = document.likes_media_likes.length;
            array = new Array<Like>(length);
            for (let i = 0; i < length; i++) {
                let title = Decoding.decodeObject(document.likes_media_likes[i].title);
                let href = Decoding.decodeObject(document.likes_media_likes[i].string_list_data[0].href);
                let timestamp = document.likes_media_likes[i].string_list_data[0].timestamp;
                array[i] = {title: title, href: href, timestamp: timestamp};
            }
            likedListModel.listLikedPosts = array;
        } catch {
            this.logger.log('error', "fetchLikes - liked_posts.json");
        }

        return likedListModel != {} ? likedListModel : undefined;
    }

    async fetchSearches(): Promise<Searches | undefined> {
        let document, length, array;
        let searchesModel: Searches = {};
        try {
            document = require(`${CONFIG.get('PATH')}instagram_json/recent_search/account_searches.json`);
            length = document.searches_user.length;
            array = new Array<Search>(length);
            for (let i = 0; i < length; i++) {
                let value = Decoding.decodeObject(document.searches_user[i].string_map_data[this.configInstagram.get(`${this.prefix}-search`)].value);
                let timestamp = document.searches_user[i].string_map_data[this.configInstagram.get(`${this.prefix}-time`)].timestamp;
                array[i] = {value: value, timestamp: timestamp};
            }
            searchesModel.listSearches = array;
            return searchesModel;
        } catch {
            this.logger.log('error', "fetchSearches - account_searches.json");
        }
    }

    async fetchTopics(): Promise<Topics | undefined> {
        let document, length, array;
        let topicsModel: Topics = {};
        try {
            document = require(`${CONFIG.get('PATH')}instagram_json/your_topics/your_reels_sentiments.json`);
            length = document.topics_your_reels_emotions.length;
            array = new Array<string>(length);
            for (let i = 0; i < length; i++) {
                array[i] = Decoding.decodeObject(document.topics_your_reels_emotions[i].string_map_data[this.configInstagram.get(`${this.prefix}-name`)].value);
            }
            topicsModel.listReelSentiments = array;
        } catch {
            this.logger.log('error', "fetchTopics - your_reel_sentiments.json");
        }

        try {
            document = require(`${CONFIG.get('PATH')}instagram_json/your_topics/your_reels_topics.json`);
            length = document.topics_your_reels_topics.length;
            array = new Array<string>(length);
            for (let i = 0; i < length; i++) {
                array[i] = Decoding.decodeObject(document.topics_your_reels_topics[i].string_map_data[this.configInstagram.get(`${this.prefix}-name`)].value);
            }
            topicsModel.listReelTopics = array;
        } catch {
            this.logger.log('error', "fetchTopics - your_reel_topics.json");
        }

        try {
            document = require(`${CONFIG.get('PATH')}instagram_json/your_topics/your_topics.json`);
            length = document.topics_your_topics.length;
            array = new Array<string>(length);
            for (let i = 0; i < length; i++) {
                array[i] = Decoding.decodeObject(document.topics_your_topics[i].string_map_data[this.configInstagram.get(`${this.prefix}-name`)].value);
            }
            topicsModel.listTopic = array;
        } catch {
            this.logger.log('error', "fetchTopics - your_topics.json");
        }
        return topicsModel != {} ? topicsModel : undefined;
    }

    async fetchMessages(): Promise<Conversations | undefined> {
        try {
            const path = require('path');
            const fs = require('fs');
            let source = path.join(__dirname, `${CONFIG.get('PATH')}instagram_json/messages/inbox/`);
            const directories = fs.readdirSync(source);

            if(directories.length > 0) {
                let conversationsModel: Conversations = {};
                let array = new Array<Conversation>(directories.length);

                for (let i = 0; i < directories.length; i++) {
                    let document = require(`${CONFIG.get('PATH')}instagram_json/messages/inbox/${directories[i]}/message_1.json`);

                    let messages = new Array<Message>(document.messages.length);
                    for (let j = 0; j < document.messages.length; j++) {
                        messages[j] = {
                            sender_name: Decoding.decodeObject(document.messages[j].sender_name),
                            timestamp_ms: document.messages[j].timestamp_ms,
                            content: Decoding.decodeObject(document.messages[j].content),
                            type: Decoding.decodeObject(document.messages[j].type),
                            is_unsent: document.messages[j].is_unsent
                        }
                        try {
                            messages[j].link = Decoding.decodeObject(document.messages[j].share.link);
                        } catch {
                            this.logger.log('info', "fetchMessages - parameter link in message is missing");
                        }
                    }
                    let participants = new Array<string>(document.participants.length);
                    for (let k = 0; k < document.participants.length; k++) {
                        participants[k] = Decoding.decodeObject(document.participants[k].name);
                    }
                    array[i] = {
                        title: Decoding.decodeObject(document.title),
                        listMessages: messages,
                        participants: participants,
                        is_still_participant: document.is_still_participant
                    }
                }
                conversationsModel.listInbox = array;
                return conversationsModel;
            } else {
                return undefined;
            }
        } catch {
            this.logger.log('error', "fetchMessages ");
        }
    }
}