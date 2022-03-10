import Logger from "../utils/logger";
import {
    AppConnectedFB,
    AppsConnectedFB,
    CommentPostedFB,
    CommentsPostedFB,
    PagesFollowFB,
    PagesLikedFB,
    PersonalInformationFB,
    SearchHistoryFB,
    ConversationFB,
    MessageFB,
    AdsInteractedWithFB,
    AdsUsingYourInfoFB,
    EducationExperienceFB,
    RelationshipFB,
    WorkExperienceFB,
    ViewFB,
    AddressLocationFB, PlaceLivedFB, PagesFB, AdvInteractionFB, AdvUsingYourInfoFB, SearchFB, PageFB,
} from "../model";
import {Decoding} from "../utils/decoding";
import {Validator} from "../validator";

/**
 * Class used to parse most important files into the directory returned by Facebook in JSON format.
 * All the files are given in input as Buffer, parsed back to JSON and then mapped into a specific interface model.
 * All functions return the relevant information (if there are any) as a promised model if the parsing is successful, undefined otherwise.
 */
export class FacebookService{
    private logger = new Logger("Facebook Service");

    /**
     * @param data - file 'profile_information/profile_information.json' in input as Buffer
     * @return {Promise<PersonalInformationFB | undefined>}
     */
    async parsePersonalInformation(data: Buffer): Promise<PersonalInformationFB | undefined> {
        let personalInfoModel: PersonalInformationFB = {};
        try {
            let document = JSON.parse(data.toString());
            (document.profile_v2.name.first_name) && (personalInfoModel.firstName = Decoding.decodeObject(document.profile_v2.name.first_name));
            (document.profile_v2.name.middle_name) && (personalInfoModel.middleName = Decoding.decodeObject(document.profile_v2.name.middle_name));
            (document.profile_v2.name.last_name) && (personalInfoModel.lastName = Decoding.decodeObject(document.profile_v2.name.last_name));
            (document.profile_v2.emails.emails) && (personalInfoModel.emails = Decoding.decodeObject(document.profile_v2.emails.emails));
            (document.profile_v2.birthday) && (personalInfoModel.birthdate = new Date(Date.UTC(document.profile_v2.birthday.year, document.profile_v2.birthday.month-1, document.profile_v2.birthday.day, 0, 0, 0)));
            (document.profile_v2.gender.gender_option) && (personalInfoModel.gender = Decoding.decodeObject(document.profile_v2.gender.gender_option));
            (document.profile_v2.current_city.name) && (personalInfoModel.currentCity = Decoding.decodeObject(document.profile_v2.current_city.name));
            (document.profile_v2.hometown.name) && (personalInfoModel.homeTown = Decoding.decodeObject(document.profile_v2.hometown.name));

            let relationshipModel: RelationshipFB = {};
            (document.profile_v2.relationship.status) && (relationshipModel.status = Decoding.decodeObject(document.profile_v2.relationship.status));
            (document.profile_v2.relationship.anniversary) && (relationshipModel.anniversary = document.profile_v2.relationship.anniversary);
            (document.profile_v2.relationship.timestamp) && (relationshipModel.dateAdded = new Date(1000 * document.profile_v2.relationship.timestamp));
            (!Validator.objectIsEmpty(relationshipModel)) && (personalInfoModel.relationship = relationshipModel);

            (document.profile_v2.education_experiences && document.profile_v2.education_experiences.length > 0) && (personalInfoModel.educationExperiences =
                document.profile_v2.education_experiences.map((value: any) => {
                    let educationModel: EducationExperienceFB = {};
                    (value.name) && (educationModel.name = Decoding.decodeObject(value.name));
                    (value.start_timestamp) && (educationModel.startDate = new Date(1000 * value.start_timestamp));
                    (value.end_timestamp) && (educationModel.endDate = new Date(1000 * value.end_timestamp));
                    (value.graduated) && (educationModel.graduated = value.graduated);
                    (value.description) && (educationModel.description = Decoding.decodeObject(value.description));
                    (value.concentrations && value.concentrations.length > 0) && (educationModel.educationTopics = Decoding.decodeObject(value.concentrations));
                    (value.degree) && (educationModel.degree = Decoding.decodeObject(value.degree));
                    (value.school_type) && (educationModel.schoolType = Decoding.decodeObject(value.school_type));
                    return educationModel;
                }));

            (document.profile_v2.work_experiences && document.profile_v2.work_experiences.length > 0) && (personalInfoModel.workExperience =
                document.profile_v2.work_experiences.map((value: any) => {
                    let workModel: WorkExperienceFB = {};
                    (value.employer) && (workModel.employer = Decoding.decodeObject(value.employer));
                    (value.title) && (workModel.title = Decoding.decodeObject(value.title));
                    (value.location) && (workModel.location = Decoding.decodeObject(value.location));
                    (value.description) && (workModel.description = Decoding.decodeObject(value.description));
                    (value.start_timestamp) && (workModel.startDate = new Date(1000 * value.start_timestamp));
                    (value.end_timestamp) && (workModel.endDate = new Date(1000 * value.end_timestamp));
                    return workModel;
                }));

            (document.profile_v2.languages && document.profile_v2.languages.length > 0) && (personalInfoModel.languages = document.profile_v2.languages.map((value: any) => Decoding.decodeObject(value.name)));
            (document.profile_v2.interested_in && document.profile_v2.interested_in.length > 0) && (personalInfoModel.gendersInterests = Decoding.decodeObject(document.profile_v2.interested_in));
            (document.profile_v2.political_view && document.profile_v2.political_view.length > 0) && (personalInfoModel.politicalView = document.profile_v2.political_view.map((value: any) => {
                let viewModel: ViewFB = {};
                (value.name) && (viewModel.name = Decoding.decodeObject(value.name));
                (value.description) && (viewModel.description = Decoding.decodeObject(value.description));
                return viewModel;
            }));
            (document.profile_v2.religious_view && document.profile_v2.political_view.length > 0) && (personalInfoModel.religiousView = document.profile_v2.religious_view.map((value: any) => {
                let viewModel: ViewFB = {};
                (value.name) && (viewModel.name = Decoding.decodeObject(value.name));
                (value.description) && (viewModel.description = Decoding.decodeObject(value.description));
                return viewModel;
            }));
            (document.profile_v2.blood_donor_status) && (personalInfoModel.bloodInfo = Decoding.decodeObject(document.profile_v2.blood_info.blood_donor_status));
            (document.profile_v2.websites && document.profile_v2.websites.length > 0) && (personalInfoModel.websites = document.profile_v2.websites.map((value: any) => Decoding.decodeObject(value.address)));

            let addressModel: AddressLocationFB = {};
            (document.profile_v2.address.street) && (addressModel.street = Decoding.decodeObject(document.profile_v2.address.street));
            (document.profile_v2.address.city) && (addressModel.city = Decoding.decodeObject(document.profile_v2.address.city));
            (document.profile_v2.address.zipcode) && (addressModel.zipcode = Decoding.decodeObject(document.profile_v2.address.zipcode));
            (document.profile_v2.address.neighborhood) && (addressModel.neighborhood = Decoding.decodeObject(document.profile_v2.address.neighborhood));
            (document.profile_v2.address.country) && (addressModel.country = Decoding.decodeObject(document.profile_v2.address.country));
            (document.profile_v2.address.country_code) && (addressModel.countryCode = Decoding.decodeObject(document.profile_v2.address.country_code));
            (document.profile_v2.address.region) && (addressModel.region = Decoding.decodeObject(document.profile_v2.address.region));
            (!Validator.objectIsEmpty(addressModel)) && (personalInfoModel.address = addressModel);

            (document.profile_v2.phone_numbers && document.profile_v2.phone_numbers.length > 0) && (personalInfoModel.phoneNumbers = document.profile_v2.phone_numbers);
            (document.profile_v2.places_lived && document.profile_v2.places_lived.length > 0) && (personalInfoModel.placesLived = document.profile_v2.places_lived.map((value: any) => {
                let placeModel: PlaceLivedFB = {};
                (value.place) && (placeModel.place = Decoding.decodeObject(value.place));
                (value.start_timestamp) && (placeModel.startDate = new Date(1000 * value.start_timestamp));
                return placeModel;
            }));


            (document.profile_v2.pages && document.profile_v2.pages.length > 0) && (personalInfoModel.pagesInterests =
                document.profile_v2.pages.map((value: any) => {
                    let pagesModel: PagesFB = {};
                    (value.name) && (pagesModel.category = Decoding.decodeObject(value.name));
                    (value.pages && value.pages.length > 0) && (pagesModel.pages = Decoding.decodeObject(value.pages));
                    return pagesModel;
                }));
            (document.profile_v2.registration_timestamp) && (personalInfoModel.registrationDate = new Date(1000*document.profile_v2.registration_timestamp));
            (document.profile_v2.profile_uri) && (personalInfoModel.profileUri = Decoding.decodeObject(document.profile_v2.profile_uri));
            return !Validator.objectIsEmpty(personalInfoModel) ? personalInfoModel : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parsePersonalInformation');
            return undefined;
        }
    }

    /**
     * @param data - file 'ads_information/advertisers_you've_interacted_with.json' in input as Buffer
     * @return {Promise<AdsInteractedWithFB | undefined>}
     */
    async parseAdsInteractedWith(data: Buffer): Promise<AdsInteractedWithFB | undefined> {
        let adsModel: AdsInteractedWithFB = {list: []};
        try {
            let document = JSON.parse(data.toString());
            (document.history_v2 && document.history_v2.length > 0) && (adsModel.list = document.history_v2.map((value: any) => {
                let model: AdvInteractionFB = {};
                (value.title) && (model.title = Decoding.decodeObject(value.title));
                (value.action) && (model.action = Decoding.decodeObject(value.action));
                (value.timestamp) && (model.date = new Date(1000*value.timestamp));
                return model;
            }));
            return adsModel.list.length > 0 ? adsModel : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseAdsInteractedWith');
            return undefined;
        }
    }

    /**
     * @param data - file 'ads_information/advertisers_using_your_activity_or_information.json' in input as Buffer
     * @return {Promise<AdsUsingYourInfoFB | undefined>}
     */
    async parseAdsUsingYourInfo(data: Buffer): Promise<AdsUsingYourInfoFB | undefined> {
        let adsModel: AdsUsingYourInfoFB = {list:[]};
        try {
            let document = JSON.parse(data.toString());
            (document.custom_audiences_all_types_v2 && document.custom_audiences_all_types_v2.length > 0) && (adsModel.list = document.custom_audiences_all_types_v2.map((value: any) => {
                let model: AdvUsingYourInfoFB = {};
                (value.advertiser_name) && (model.advertiserName = Decoding.decodeObject(value.advertiser_name));
                (value.has_data_file_custom_audience) && (model.hasDataFileCustomAudience = value.has_data_file_custom_audience);
                (value.has_remarketing_custom_audience) && (model.hasRemarketingCustomAudience = value.has_remarketing_custom_audience);
                (value.has_in_person_store_visit) && (model.hasInPersonStoreVisit = value.has_in_person_store_visit);
                return model;
            }));
            return adsModel.list.length > 0 ? adsModel : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseAdsUsingYourInfo');
            return undefined;
        }
    }

    /**
     * @param data - file 'search/your_search_history.json' in input as Buffer
     * @return {Promise<SearchHistoryFB | undefined>}
     */
    async parseSearchHistory(data: Buffer): Promise<SearchHistoryFB | undefined> {
        let searchHistoryModel: SearchHistoryFB = {listSearches: []};
        try {
            let document = JSON.parse(data.toString());
            (document.searches_v2 && document.searches_v2.length > 0) && (searchHistoryModel.listSearches = document.searches_v2.map((value: any) => {
                let model: SearchFB = {};
                (value.data && value.data[0].text) && (model.text = Decoding.decodeObject(value.data[0].text));
                (value.timestamp) && (model.date = new Date(1000*value.timestamp));
                return model;
            }));
            return searchHistoryModel.listSearches.length > 0 ? searchHistoryModel : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseSearchHistory');
            return undefined;
        }
    }

    /**
     * @param data - file 'comments_and_reactions/comments.json' in input as Buffer
     * @return {Promise<CommentsPostedFB | undefined>}
     */
    async parseComments(data: Buffer): Promise<CommentsPostedFB | undefined> {
        let commentsPostedModel: CommentsPostedFB = {list: []};
        try {
            let document = JSON.parse(data.toString());
            (document.comments_v2 && document.comments_v2.length > 0) && (commentsPostedModel.list = document.comments_v2.map((value: any) => {
                let model: CommentPostedFB = {};
                (value.data && value.data[0].comment.comment) && (model.text = Decoding.decodeObject(value.data[0].comment.comment));
                (value.data && value.data[0].comment.author) && (model.author = Decoding.decodeObject(value.data[0].comment.author));
                (value.timestamp) && (model.date = new Date(1000 * value.timestamp));
                (value.title) && (model.title = Decoding.decodeObject(value.title));
                return model;
            }));
            return commentsPostedModel.list.length > 0 ? commentsPostedModel : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseComments');
            return undefined;
        }
    }

    /**
     * @param data - file 'pages/pages_you've_liked.json' in input as Buffer
     * @return {Promise<PagesLikedFB | undefined>}
     */
    async parsePageLiked(data: Buffer): Promise<PagesLikedFB | undefined> {
        let modelPagesLiked: PagesLikedFB = {list: []};
        try {
            let document = JSON.parse(data.toString());
            (document.page_likes_v2 && document.page_likes_v2.length > 0) && (modelPagesLiked.list = document.page_likes_v2.map((value: any) => {
                let model: PageFB = {};
                (value.name) && (model.name = Decoding.decodeObject(value.name));
                (value.timestamp) && (model.date = new Date(1000 * value.timestamp));
                return model;
            }));
            return modelPagesLiked.list.length > 0 ? modelPagesLiked : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parsePageLiked');
            return undefined;
        }
    }

    /**
     * @param data - file 'pages/pages_you_follow.json' in input as Buffer
     * @return {Promise<PagesFollowFB | undefined>}
     */
    async parsePageFollowed(data: Buffer): Promise<PagesFollowFB | undefined> {
        let modelPagesFollow: PagesFollowFB = {list: []};
        try {
            let document = JSON.parse(data.toString());
            (document.pages_followed_v2 && document.pages_followed_v2.length > 0) && (modelPagesFollow.list = document.pages_followed_v2.map((value: any) => {
                let model: PageFB = {};
                (value.title) && (model.name = Decoding.decodeObject(value.title));
                (value.timestamp) && (model.date = new Date(1000 * value.timestamp));
                return model;
            }));
            return modelPagesFollow.list.length > 0 ? modelPagesFollow : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parsePageFollowed');
            return undefined;
        }
    }

    /**
     * @param data - file 'apps_and_websites_off_of_facebook/apps_and_websites.json' in input as Buffer
     * @return {Promise<AppsConnectedFB | undefined>}
     */
    async parseAppsConnected(data: Buffer): Promise<AppsConnectedFB | undefined> {
        let modelAppsConnected: AppsConnectedFB = {list: []};
        try {
            let document = JSON.parse(data.toString());
            modelAppsConnected.list = document.installed_apps_v2.map((value: any) => {
                let model: AppConnectedFB = {};
                (value.name) && (model.name = Decoding.decodeObject(value.name));
                (value.user_app_scoped_id) && (model.userAppScopedId = value.user_app_scoped_id);
                (value.category) && (model.category = Decoding.decodeObject(value.category));
                //addedTimestamp and removedTimestamp parameters are mutual exclusive
                (value.added_timestamp) && (model.addedTimestamp = new Date(1000 * value.added_timestamp));
                (value.removed_timestamp) && (model.removedTimestamp = new Date(1000 * value.removed_timestamp));
                return model;
            });
            return modelAppsConnected.list.length > 0 ? modelAppsConnected : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseAppsConnected');
            return undefined;
        }
    }

    /**
     * @param data - file 'messages/inbox/{chat_directory_name}/message_1.json' in input as Buffer
     * @return {Promise<ConversationFB | undefined>}
     */
    async parseMessages(data: Buffer): Promise<ConversationFB | undefined> {
        try {
            let document = JSON.parse(data.toString());
            let messages: Array<MessageFB> = [];
            (document.messages) && (messages = document.messages.map((value: any) => {
                let model: MessageFB = {};
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

            let conversationModel: ConversationFB = {};
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
