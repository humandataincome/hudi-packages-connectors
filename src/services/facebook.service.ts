import Logger from "../utils/logger";
import {
    AdsInformation,
    AdvInteraction,
    AdvUsingYourInfo,
    AppConnected,
    AppsConnected,
    CommentPosted,
    CommentsPosted,
    Page,
    Pages,
    PagesFollow,
    PagesLiked,
    PersonalInformation,
    PlaceLived,
    SearchHistory,
    Conversation, Conversations, Message
} from "../models/facebook.model";
import {CONFIG} from "../config/config.utils";
import {Decoding} from "../utils/decoding";

export class FacebookService{
    private logger = new Logger("Facebook Service");

    async fetchPersonalInformation(): Promise<PersonalInformation | undefined> {
        let personalInfoModel: PersonalInformation = {};
        try {
            let document = require(`${CONFIG.get('PATH')}facebook_json/profile_information/profile_information.json`);
            try {
                personalInfoModel.firstName = Decoding.decodeObject(document.profile_v2.name.first_name);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - first_name parameter is missing');
            }
            try {
                personalInfoModel.middleName = Decoding.decodeObject(document.profile_v2.name.middle_name);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - last_name parameter is missing');
            }
            try {
                personalInfoModel.lastName = Decoding.decodeObject(document.profile_v2.name.last_name);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - last_name parameter is missing');
            }
            try {
                personalInfoModel.emails = Decoding.decodeObject(document.profile_v2.emails.emails);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - emails parameter is missing');
            }
            try {
                personalInfoModel.birthdate = document.profile_v2.birthday;
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - birthdate parameter is missing');
            }
            try {
                personalInfoModel.gender = Decoding.decodeObject(document.profile_v2.gender.gender_option);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - gender parameter is missing');
            }
            try {
                personalInfoModel.currentCity = Decoding.decodeObject(document.profile_v2.current_city.name);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - current_city parameter is missing');
            }
            try {
                personalInfoModel.homeTown = Decoding.decodeObject(document.profile_v2.hometown.name);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - hometown parameter is missing');
            }
            try {
                personalInfoModel.relationship = {
                    status: Decoding.decodeObject(document.profile_v2.relationship.status),
                    anniversary: document.profile_v2.relationship.anniversary,
                    timestamp: document.profile_v2.relationship.timestamp
                };
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - relationship parameter is missing');
            }
            try {
                personalInfoModel.educationExperiences = Decoding.decodeObject(document.profile_v2.education_experiences);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - education_experiences parameter is missing');
            }

            try {

                personalInfoModel.workExperience = Decoding.decodeObject(document.profile_v2.work_experiences);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - work_experiences parameter is missing');
            }
            try {
                personalInfoModel.languages = Array<string>(document.profile_v2.languages.length);
                for(let i = 0; i < document.profile_v2.languages.length; i++){
                    personalInfoModel.languages[i] = Decoding.decodeObject(document.profile_v2.languages[i].name);
                }
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - languages parameter is missing');
            }
            try {
                personalInfoModel.interestedInGenders = Decoding.decodeObject(document.profile_v2.interested_in);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - interested_in parameter is missing');
            }
            try {
                personalInfoModel.politicalView = Decoding.decodeObject(document.profile_v2.political_view);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - political_view parameter is missing');
            }
            try {
                personalInfoModel.religiousView = Decoding.decodeObject(document.profile_v2.religious_view);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - religious_view parameter is missing');
            }
            try {
                personalInfoModel.bloodInfo = Decoding.decodeObject(document.profile_v2.blood_info.blood_donor_status);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - blood_info parameter is missing');
            }
            try {
                personalInfoModel.websites = Array<string>(document.profile_v2.websites.length);
                for(let i = 0; i < document.profile_v2.websites.length; i++){
                    personalInfoModel.websites[i] = Decoding.decodeObject(document.profile_v2.websites[i].address);
                }
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - websites parameter is missing');
            }
            try {
                personalInfoModel.address = document.profile_v2.address;
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - address parameter is missing');
            }
            try {
                //to fill
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - phone_numbers parameter is missing');
            }
            try {
                personalInfoModel.placesLived = Array<PlaceLived>(document.profile_v2.places_lived.length);
                for(let i = 0; i < document.profile_v2.places_lived.length; i++){
                    personalInfoModel.placesLived[i] = Decoding.decodeObject(document.profile_v2.places_lived[i]);
                }
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - places_lived parameter is missing');
            }
            try {
                personalInfoModel.pagesInterests = Array<Pages>(document.profile_v2.pages.length);
                for(let i = 0; i < document.profile_v2.pages.length; i++){
                    personalInfoModel.pagesInterests[i] = {
                        category: Decoding.decodeObject(document.profile_v2.pages[i].name),
                        pages: Decoding.decodeObject(document.profile_v2.pages[i].pages)
                    }
                }
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - pages parameter is missing');
            }
            try {
                personalInfoModel.registrationTimestamp = document.profile_v2.registration_timestamp;
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - registration_timestamp parameter is missing');
            }
            try {
                personalInfoModel.profileUri = Decoding.decodeObject(document.profile_v2.profile_uri);
            } catch {
                this.logger.log('info', 'fetchPersonalInformation - profile_uri parameter is missing');
            }
            return personalInfoModel != {} ? personalInfoModel : undefined;
        } catch {
            this.logger.log('info', 'fetchPersonalInformation - profile_information.json ');
        }
    }

    async fetchAdsInformation(): Promise<AdsInformation | undefined> {
        let adsInformationModel: AdsInformation = {};
        try {
            let document = require(`${CONFIG.get('PATH')}facebook_json/ads_information/advertisers_you've_interacted_with.json`);
            adsInformationModel.listAdsInteractedWith = Array<AdvInteraction>(document.history_v2.length);
            for(let i = 0; i < document.history_v2.length; i++){
                adsInformationModel.listAdsInteractedWith[i] = Decoding.decodeObject(document.history_v2[i]);
            }
        } catch {
            this.logger.log('error', 'fetchAdsInformation - advertisers_you\'ve_interacted_with.json');
        }
        try {
            let document = require(`${CONFIG.get('PATH')}facebook_json/ads_information/advertisers_using_your_activity_or_information.json`);
            adsInformationModel.listAdsUsingYourInfo = Array<AdvUsingYourInfo>(document.custom_audiences_all_types_v2.length);
            for(let i = 0; i < document.custom_audiences_all_types_v2.length; i++){
                adsInformationModel.listAdsUsingYourInfo[i] = Decoding.decodeObject(document.custom_audiences_all_types_v2[i]);
            }
        } catch {
            this.logger.log('error', 'fetchAdsInformation - advertisers_using_your_activity_or_information.json');
        }
        return adsInformationModel != {} ? adsInformationModel : undefined;
    }

    async fetchSearchHistory(): Promise<SearchHistory | undefined> {
        let searchHistoryModel: SearchHistory = {};
        try {
            let document = require(`${CONFIG.get('PATH')}facebook_json/search/your_search_history.json`);
            searchHistoryModel.searches = Array<string>(document.searches_v2.length);
            for(let i = 0; i < document.searches_v2.length; i++){
                searchHistoryModel.searches[i] = Decoding.decodeObject(document.searches_v2[i].data[0].text);
            }
            return searchHistoryModel != {} ? searchHistoryModel : undefined;
        } catch {
            this.logger.log('error', 'fetchSearchHistory - your_search_history.json');
        }
    }

    async fetchComments(): Promise<CommentsPosted | undefined> {
        let commentsPostedModel: CommentsPosted = {};
        try {
            let document = require(`${CONFIG.get('PATH')}facebook_json/comments_and_reactions/comments.json`);
            commentsPostedModel.listCommentsPosted = Array<CommentPosted>(document.comments_v2.length);
            for(let i = 0; i < document.comments_v2.length; i++){
                commentsPostedModel.listCommentsPosted[i] = {};
                try{
                    commentsPostedModel.listCommentsPosted[i].text = Decoding.decodeObject(document.comments_v2[i].data[0].comment.comment);
                } catch {
                    this.logger.log('info', 'fetchComments - parameter comment is missing');
                }
                try {
                    commentsPostedModel.listCommentsPosted[i].author = Decoding.decodeObject(document.comments_v2[i].data[0].comment.author);
                } catch {
                    this.logger.log('info', 'fetchComments - parameter author is missing');
                }
                try {
                    commentsPostedModel.listCommentsPosted[i].timestamp = document.comments_v2[i].timestamp;
                } catch {
                    this.logger.log('info', 'fetchComments - parameter timestamp is missing');
                }
                try {
                    commentsPostedModel.listCommentsPosted[i].title = Decoding.decodeObject(document.comments_v2[i].title);
                } catch {
                    this.logger.log('info', 'fetchComments - parameter title is missing');
                }
            }
            return commentsPostedModel != {} ? commentsPostedModel : undefined;
        } catch {
            this.logger.log('error', 'fetchComments - comments.json');
        }
    }

    async fetchPageLiked(): Promise<PagesLiked | undefined> {
        let modelPagesLiked: PagesLiked = {};
        try {
            let document = require(`${CONFIG.get('PATH')}facebook_json/pages/pages_you've_liked.json`);
            modelPagesLiked.listPages = Array<Page>(document.page_likes_v2.length);
            for(let i = 0; i < document.page_likes_v2.length; i++) {
                modelPagesLiked.listPages[i] = {
                    name: Decoding.decodeObject(document.page_likes_v2[i].name),
                    timestamp: document.page_likes_v2[i].timestamp
                };
            }
            return modelPagesLiked != {} ? modelPagesLiked : undefined;
        } catch {
            this.logger.log('error', 'fetchPageLiked - pages_you\'ve_liked.json');
        }
    }

    async fetchPageFollowed(): Promise<PagesFollow | undefined> {
        let modelPagesFollow: PagesFollow = {};
        try {
            let document = require(`${CONFIG.get('PATH')}facebook_json/pages/pages_you_follow.json`);
            modelPagesFollow.listPages = Array<Page>(document.pages_followed_v2.length);
            for(let i = 0; i < document.pages_followed_v2.length; i++) {
                modelPagesFollow.listPages[i] = {
                    name: Decoding.decodeObject(document.pages_followed_v2[i].title),
                    timestamp: document.pages_followed_v2[i].timestamp
                };
            }
            return modelPagesFollow!= {} ? modelPagesFollow : undefined;
        } catch {
            this.logger.log('error', 'fetchPageFollow - pages_you_follow.json');
        }
    }

    async fetchAppsConnected(): Promise<AppsConnected | undefined> {
        let modelAppsConnected: AppsConnected = {};
        try {
            let document = require(`${CONFIG.get('PATH')}facebook_json/apps_and_websites_off_of_facebook/apps_and_websites.json`);
            modelAppsConnected.listApps = Array<AppConnected>(document.installed_apps_v2.length);
            for(let i = 0; i < document.installed_apps_v2.length; i++) {
                modelAppsConnected.listApps[i] = document.installed_apps_v2[i];
            }
            return modelAppsConnected != {} ? modelAppsConnected : undefined;
        } catch {
            this.logger.log('error', 'fetchAppsConnected - app_and_websites.json');
        }
    }

    async fetchMessages(): Promise<Conversations | undefined> {
        try {
            const path = require('path');
            const fs = require('fs');
            let source = path.join(__dirname, `${CONFIG.get('PATH')}facebook_json/messages/inbox/`);
            const directories = fs.readdirSync(source);

            if(directories.length > 0) {
                let conversationsModel: Conversations = {};
                let array = new Array<Conversation>(directories.length);

                for (let i = 0; i < directories.length; i++) {
                    let document = require(`${CONFIG.get('PATH')}facebook_json/messages/inbox/${directories[i]}/message_1.json`);

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