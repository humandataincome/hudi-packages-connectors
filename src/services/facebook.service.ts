import Logger from "../utils/logger";
import {
    AppConnected,
    AppsConnected,
    CommentPosted,
    CommentsPosted,
    PagesFollow,
    PagesLiked,
    PersonalInformation,
    SearchHistory,
    Conversation, Message, AdsInteractedWith, AdsUsingYourInfo,
} from "../models/facebook.model";
import {Decoding} from "../utils/decoding";

/**
 * Class used to parse most important files into the directory returned by Facebook in JSON format.
 * All the files are given in input as Buffer, parsed back to JSON and then mapped into a specific interface model.
 * All functions return the relevant information (if there are any) as a promised model if the parsing is successful, undefined otherwise.
 */
export class FacebookService{
    private logger = new Logger("Facebook Service");

    /**
     * @param data - file 'profile_information/profile_information.json' in input as Buffer
     * @return {Promise<PersonalInformation | undefined>}
     */
    async parsePersonalInformation(data: Buffer): Promise<PersonalInformation | undefined> {
        let personalInfoModel: PersonalInformation = {};
        try {
            let document = JSON.parse(data.toString());
            try {
                personalInfoModel.firstName = Decoding.decodeObject(document.profile_v2.name.first_name);
            } catch {
                this.logger.log('info', 'first_name parameter is missing', 'parsePersonalInformation');
            }
            try {
                personalInfoModel.middleName = Decoding.decodeObject(document.profile_v2.name.middle_name);
            } catch {
                this.logger.log('info', 'last_name parameter is missing', 'parsePersonalInformation');
            }
            try {
                personalInfoModel.lastName = Decoding.decodeObject(document.profile_v2.name.last_name);
            } catch {
                this.logger.log('info', 'last_name parameter is missing', 'parsePersonalInformation');
            }
            try {
                personalInfoModel.emails = Decoding.decodeObject(document.profile_v2.emails.emails);
            } catch {
                this.logger.log('info', 'emails parameter is missing', 'parsePersonalInformation');
            }
            try {
                personalInfoModel.birthdate = new Date(Date.UTC(document.profile_v2.birthday.year, document.profile_v2.birthday.month-1, document.profile_v2.birthday.day, 0, 0, 0));
            } catch {
                this.logger.log('info', 'birthdate parameter is missing', 'parsePersonalInformation');
            }
            try {
                personalInfoModel.gender = Decoding.decodeObject(document.profile_v2.gender.gender_option);
            } catch {
                this.logger.log('info', 'gender parameter is missing', 'parsePersonalInformation');
            }
            try {
                personalInfoModel.currentCity = Decoding.decodeObject(document.profile_v2.current_city.name);
            } catch {
                this.logger.log('info', 'current_city parameter is missing', 'parsePersonalInformation');
            }
            try {
                personalInfoModel.homeTown = Decoding.decodeObject(document.profile_v2.hometown.name);
            } catch {
                this.logger.log('info', 'hometown parameter is missing', 'parsePersonalInformation');
            }
            try {
                personalInfoModel.relationship = {
                    status: Decoding.decodeObject(document.profile_v2.relationship.status),
                    anniversary: document.profile_v2.relationship.anniversary,
                    timestamp: document.profile_v2.relationship.timestamp
                };
            } catch {
                this.logger.log('info', 'relationship parameter is missing', 'parsePersonalInformation');
            }
            try {
                personalInfoModel.educationExperiences = Decoding.decodeObject(document.profile_v2.education_experiences);
            } catch {
                this.logger.log('info', 'education_experiences parameter is missing', 'parsePersonalInformation');
            }
            try {
                personalInfoModel.workExperience = Decoding.decodeObject(document.profile_v2.work_experiences);
            } catch {
                this.logger.log('info', 'work_experiences parameter is missing', 'parsePersonalInformation');
            }
            try {
                personalInfoModel.languages = document.profile_v2.languages.map((value: any) => Decoding.decodeObject(value.name));
            } catch {
                this.logger.log('info', 'languages parameter is missing', 'parsePersonalInformation');
            }
            try {
                personalInfoModel.interestedInGenders = Decoding.decodeObject(document.profile_v2.interested_in);
            } catch {
                this.logger.log('info', 'interested_in parameter is missing', 'parsePersonalInformation');
            }
            try {
                personalInfoModel.politicalView = Decoding.decodeObject(document.profile_v2.political_view);
            } catch {
                this.logger.log('info', 'political_view parameter is missing', 'parsePersonalInformation');
            }
            try {
                personalInfoModel.religiousView = Decoding.decodeObject(document.profile_v2.religious_view);
            } catch {
                this.logger.log('info', 'religious_view parameter is missing', 'parsePersonalInformation');
            }
            try {
                personalInfoModel.bloodInfo = Decoding.decodeObject(document.profile_v2.blood_info.blood_donor_status);
            } catch {
                this.logger.log('info', 'blood_info parameter is missing', 'parsePersonalInformation');
            }
            try {
                personalInfoModel.websites = document.profile_v2.websites.map((value: any) => Decoding.decodeObject(value.address));
            } catch {
                this.logger.log('info', 'websites parameter is missing', 'parsePersonalInformation');
            }
            try {
                personalInfoModel.address = document.profile_v2.address;
            } catch {
                this.logger.log('info', 'address parameter is missing', 'parsePersonalInformation');
            }
            try {
                personalInfoModel.phoneNumbers = document.profile_v2.phone_numbers;
            } catch {
                this.logger.log('info', 'phone_numbers parameter is missing', 'parsePersonalInformation');
            }
            try {
                personalInfoModel.placesLived = Decoding.decodeObject(document.profile_v2.places_lived);
            } catch {
                this.logger.log('info', 'places_lived parameter is missing', 'parsePersonalInformation');
            }
            try {
                personalInfoModel.pagesInterests = document.profile_v2.pages.map((value: any) => {
                    return {
                        category: Decoding.decodeObject(value.name),
                        pages: Decoding.decodeObject(value.pages)
                    }
                });
            } catch {
                this.logger.log('info', 'pages parameter is missing', 'parsePersonalInformation');
            }
            try {
                personalInfoModel.registrationTimestamp = document.profile_v2.registration_timestamp;
            } catch {
                this.logger.log('info', 'registration_timestamp parameter is missing', 'parsePersonalInformation');
            }
            try {
                personalInfoModel.profileUri = Decoding.decodeObject(document.profile_v2.profile_uri);
            } catch {
                this.logger.log('info', 'profile_uri parameter is missing', 'parsePersonalInformation');
            }
            return personalInfoModel != {} ? personalInfoModel : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parsePersonalInformation');
        }
    }

    /**
     * @param data - file 'ads_information/advertisers_you've_interacted_with.json' in input as Buffer
     * @return {Promise<AdsInteractedWith | undefined>}
     */
    async parseAdsInteractedWith(data: Buffer): Promise<AdsInteractedWith | undefined> {
        let adsModel: AdsInteractedWith = {};
        try {
            let document = JSON.parse(data.toString());
            adsModel.list = Decoding.decodeObject(document.history_v2);
            return adsModel != {} ? adsModel : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseAdsInteractedWith');
        }
    }

    /**
     * @param data - file 'ads_information/advertisers_using_your_activity_or_information.json' in input as Buffer
     * @return {Promise<AdsUsingYourInfo | undefined>}
     */
    async parseAdsUsingYourInfo(data: Buffer): Promise<AdsUsingYourInfo | undefined> {
        let adsModel: AdsUsingYourInfo = {};
        try {
            let document = JSON.parse(data.toString());
            adsModel.list = Decoding.decodeObject(document.custom_audiences_all_types_v2);
            return adsModel != {} ? adsModel : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseAdsUsingYourInfo');
        }
    }

    /**
     * @param data - file 'search/your_search_history.json' in input as Buffer
     * @return {Promise<SearchHistory | undefined>}
     */
    async parseSearchHistory(data: Buffer): Promise<SearchHistory | undefined> {
        let searchHistoryModel: SearchHistory = {};
        try {
            let document = JSON.parse(data.toString());
            searchHistoryModel.searches = document.searches_v2.map((value: any) => Decoding.decodeObject(value.data[0].text));
            return searchHistoryModel != {} ? searchHistoryModel : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseSearchHistory');
        }
    }

    /**
     * @param data - file 'comments_and_reactions/comments.json' in input as Buffer
     * @return {Promise<CommentsPosted | undefined>}
     */
    async parseComments(data: Buffer): Promise<CommentsPosted | undefined> {
        let commentsPostedModel: CommentsPosted = {};
        try {
            let document = JSON.parse(data.toString());
            commentsPostedModel.list = document.comments_v2.map((value: any) => {
                let newValue: CommentPosted = {};
                try{
                    newValue.text = Decoding.decodeObject(value.data[0].comment.comment);
                    newValue.author = Decoding.decodeObject(value.data[0].comment.author);
                    newValue.timestamp = value.timestamp;
                    newValue.title = Decoding.decodeObject(value.title);
                    return newValue;
                } catch {
                    //return undefined if the text parameter isn't present (empty message)
                    return undefined;
                }
            });
            return commentsPostedModel != {} ? commentsPostedModel : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseComments');
        }
    }

    /**
     * @param data - file 'pages/pages_you've_liked.json' in input as Buffer
     * @return {Promise<PagesLiked | undefined>}
     */
    async parsePageLiked(data: Buffer): Promise<PagesLiked | undefined> {
        let modelPagesLiked: PagesLiked = {};
        try {
            let document = JSON.parse(data.toString());
            modelPagesLiked.listPages = document.page_likes_v2.map((value: any) => {
                return {
                    name: Decoding.decodeObject(value.name),
                    timestamp: value.timestamp
                };
            });
            return modelPagesLiked != {} ? modelPagesLiked : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parsePageLiked');
        }
    }

    /**
     * @param data - file 'pages/pages_you_follow.json' in input as Buffer
     * @return {Promise<PagesFollow | undefined>}
     */
    async parsePageFollowed(data: Buffer): Promise<PagesFollow | undefined> {
        let modelPagesFollow: PagesFollow = {};
        try {
            let document = JSON.parse(data.toString());
            modelPagesFollow.listPages = document.pages_followed_v2.map((value: any) => {
                return {
                    name: Decoding.decodeObject(value.title),
                    timestamp: value.timestamp
                };
            });
            return modelPagesFollow != {} ? modelPagesFollow : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parsePageFollowed');
        }
    }

    /**
     * @param data - file 'apps_and_websites_off_of_facebook/apps_and_websites.json' in input as Buffer
     * @return {Promise<AppsConnected | undefined>}
     */
    async parseAppsConnected(data: Buffer): Promise<AppsConnected | undefined> {
        let modelAppsConnected: AppsConnected = {};
        try {
            let document = JSON.parse(data.toString());
            modelAppsConnected.listApps = document.installed_apps_v2.map((value: any) => {
                let newValue: AppConnected = {
                    name: Decoding.decodeObject(value.name),
                    userAppScopedId: value.user_app_scoped_id,
                    category: Decoding.decodeObject(value.category),
                };
                //addedTimestamp and removedTimestamp parameters are mutual exclusive
                if(value.added_timestamp != 0) {
                    newValue.addedTimestamp = value.added_timestamp;
                } else {
                    newValue.removedTimestamp = value.removed_timestamp;
                }
                return newValue;
            });
            return modelAppsConnected != {} ? modelAppsConnected : undefined;
        } catch (e: any) {
            this.logger.log('error', `${e}`,'parseAppsConnected');
        }
    }

    /**
     * @param data - file 'messages/inbox/{chat_directory_name}/message_1.json' in input as Buffer
     * @return {Promise<Topics | undefined>}
     */
    async parseMessages(data: Buffer): Promise<Conversation | undefined> {
        try {
            let document = JSON.parse(data.toString());
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