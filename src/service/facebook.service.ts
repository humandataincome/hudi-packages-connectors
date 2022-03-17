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
    AddressLocationFB,
    PlaceLivedFB,
    PagesFB,
    AdvInteractionFB,
    AdvUsingYourInfoFB,
    SearchFB,
    PageFB,
    ReactionsFB,
    ReactionFB,
    LanguagesFB,
    PagesRecommendedFB,
    RecentlyViewedFB,
    VisualizationFB,
    YourPostsFB,
    YourPostFB,
    FriendRequestsSentFB, FriendActivityFB, RejectedFriendshipRequestsFB, RemovedFriendsFB, WhoYouFollowFB,
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
        try {
            const document = JSON.parse(data.toString());
            const personalInfoModel: PersonalInformationFB = {};
            (document.profile_v2?.name?.first_name) && (personalInfoModel.firstName = Decoding.decodeObject(document.profile_v2.name.first_name));
            (document.profile_v2?.name?.middle_name) && (personalInfoModel.middleName = Decoding.decodeObject(document.profile_v2.name.middle_name));
            (document.profile_v2?.name?.last_name) && (personalInfoModel.lastName = Decoding.decodeObject(document.profile_v2.name.last_name));
            (document.profile_v2?.emails?.emails) && (personalInfoModel.emails = Decoding.decodeObject(document.profile_v2.emails.emails));
            (document.profile_v2?.birthday) && (personalInfoModel.birthdate = new Date(Date.UTC(document.profile_v2.birthday.year, document.profile_v2.birthday.month-1, document.profile_v2.birthday.day, 0, 0, 0)));
            (document.profile_v2?.gender?.gender_option) && (personalInfoModel.gender = Decoding.decodeObject(document.profile_v2.gender.gender_option));
            (document.profile_v2?.current_city?.name) && (personalInfoModel.currentCity = Decoding.decodeObject(document.profile_v2.current_city.name));
            (document.profile_v2?.hometown?.name) && (personalInfoModel.homeTown = Decoding.decodeObject(document.profile_v2.hometown.name));

            const relationshipModel: RelationshipFB = {};
            (document.profile_v2?.relationship?.status) && (relationshipModel.status = Decoding.decodeObject(document.profile_v2.relationship.status));
            (document.profile_v2?.relationship?.anniversary) && (relationshipModel.anniversary = document.profile_v2.relationship.anniversary);
            (document.profile_v2?.relationship?.timestamp) && (relationshipModel.dateAdded = new Date(1000 * document.profile_v2.relationship.timestamp));
            (!Validator.objectIsEmpty(relationshipModel)) && (personalInfoModel.relationship = relationshipModel);

            (document.profile_v2?.education_experiences?.length > 0) && (personalInfoModel.educationExperiences =
                document.profile_v2.education_experiences.map((value: any) => {
                    const educationModel: EducationExperienceFB = {};
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

            (document.profile_v2?.work_experiences?.length > 0) && (personalInfoModel.workExperience =
                document.profile_v2.work_experiences.map((value: any) => {
                    const workModel: WorkExperienceFB = {};
                    (value.employer) && (workModel.employer = Decoding.decodeObject(value.employer));
                    (value.title) && (workModel.title = Decoding.decodeObject(value.title));
                    (value.location) && (workModel.location = Decoding.decodeObject(value.location));
                    (value.description) && (workModel.description = Decoding.decodeObject(value.description));
                    (value.start_timestamp) && (workModel.startDate = new Date(1000 * value.start_timestamp));
                    (value.end_timestamp) && (workModel.endDate = new Date(1000 * value.end_timestamp));
                    return workModel;
                }));

            (document.profile_v2?.languages?.length > 0) && (personalInfoModel.languages = document.profile_v2.languages.map((value: any) => Decoding.decodeObject(value.name)));
            (document.profile_v2?.interested_in?.length > 0) && (personalInfoModel.gendersInterests = Decoding.decodeObject(document.profile_v2.interested_in));
            (document.profile_v2?.political_view?.length > 0) && (personalInfoModel.politicalView = document.profile_v2.political_view.map((value: any) => {
                const viewModel: ViewFB = {};
                (value.name) && (viewModel.name = Decoding.decodeObject(value.name));
                (value.description) && (viewModel.description = Decoding.decodeObject(value.description));
                return viewModel;
            }));
            (document.profile_v2?.political_view?.length > 0) && (personalInfoModel.religiousView = document.profile_v2.religious_view.map((value: any) => {
                const viewModel: ViewFB = {};
                (value.name) && (viewModel.name = Decoding.decodeObject(value.name));
                (value.description) && (viewModel.description = Decoding.decodeObject(value.description));
                return viewModel;
            }));
            (document.profile_v2?.blood_donor_status) && (personalInfoModel.bloodInfo = Decoding.decodeObject(document.profile_v2.blood_info.blood_donor_status));
            (document.profile_v2?.websites && document.profile_v2.websites.length > 0) && (personalInfoModel.websites = document.profile_v2.websites.map((value: any) => Decoding.decodeObject(value.address)));

            const addressModel: AddressLocationFB = {};
            (document.profile_v2?.address?.street) && (addressModel.street = Decoding.decodeObject(document.profile_v2.address.street));
            (document.profile_v2?.address?.city) && (addressModel.city = Decoding.decodeObject(document.profile_v2.address.city));
            (document.profile_v2?.address?.zipcode) && (addressModel.zipcode = Decoding.decodeObject(document.profile_v2.address.zipcode));
            (document.profile_v2?.address?.neighborhood) && (addressModel.neighborhood = Decoding.decodeObject(document.profile_v2.address.neighborhood));
            (document.profile_v2?.address?.country) && (addressModel.country = Decoding.decodeObject(document.profile_v2.address.country));
            (document.profile_v2?.address?.country_code) && (addressModel.countryCode = Decoding.decodeObject(document.profile_v2.address.country_code));
            (document.profile_v2?.address?.region) && (addressModel.region = Decoding.decodeObject(document.profile_v2.address.region));
            (!Validator.objectIsEmpty(addressModel)) && (personalInfoModel.address = addressModel);

            (document.profile_v2?.phone_numbers?.length > 0) && (personalInfoModel.phoneNumbers = document.profile_v2.phone_numbers);
            (document.profile_v2?.places_lived?.length > 0) && (personalInfoModel.placesLived = document.profile_v2.places_lived.map((value: any) => {
                const placeModel: PlaceLivedFB = {};
                (value.place) && (placeModel.place = Decoding.decodeObject(value.place));
                (value.start_timestamp) && (placeModel.startDate = new Date(1000 * value.start_timestamp));
                return placeModel;
            }));


            (document.profile_v2?.pages?.length > 0) && (personalInfoModel.pagesInterests =
                document.profile_v2.pages.map((value: any) => {
                    const pagesModel: PagesFB = {};
                    (value.name) && (pagesModel.category = Decoding.decodeObject(value.name));
                    (value.pages && value.pages.length > 0) && (pagesModel.pages = Decoding.decodeObject(value.pages));
                    return pagesModel;
                }));
            (document.profile_v2?.registration_timestamp) && (personalInfoModel.registrationDate = new Date(1000*document.profile_v2.registration_timestamp));
            (document.profile_v2?.profile_uri) && (personalInfoModel.profileUri = Decoding.decodeObject(document.profile_v2.profile_uri));
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
        try {
            const document = JSON.parse(data.toString());
            const adsModel: AdsInteractedWithFB = {list: []};
            (document.history_v2 && document.history_v2.length > 0) && (adsModel.list = document.history_v2.map((value: any) => {
                const model: AdvInteractionFB = {};
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
        try {
            const document = JSON.parse(data.toString());
            const adsModel: AdsUsingYourInfoFB = {list:[]};
            (document.custom_audiences_all_types_v2 && document.custom_audiences_all_types_v2.length > 0) && (adsModel.list = document.custom_audiences_all_types_v2.map((value: any) => {
                const model: AdvUsingYourInfoFB = {};
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
        try {
            const document = JSON.parse(data.toString());
            const searchHistoryModel: SearchHistoryFB = {listSearches: []};
            (document.searches_v2 && document.searches_v2.length > 0) && (searchHistoryModel.listSearches = document.searches_v2.map((value: any) => {
                const model: SearchFB = {};
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
        try {
            const document = JSON.parse(data.toString());
            const commentsPostedModel: CommentsPostedFB = {list: []};
            (document.comments_v2 && document.comments_v2.length > 0) && (commentsPostedModel.list = document.comments_v2.map((value: any) => {
                const model: CommentPostedFB = {};
                (value.data && value.data[0].comment?.comment) && (model.text = Decoding.decodeObject(value.data[0].comment.comment));
                (value.data && value.data[0].comment?.author) && (model.author = Decoding.decodeObject(value.data[0].comment.author));
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
     * @param data - file 'comments_and_reactions/posts_and_comments.json' in input as Buffer
     * @return {Promise<ReactionsFB | undefined>}
     */
    async parseReactions(data: Buffer): Promise<ReactionsFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const reactionsModel: ReactionsFB = {list: []};
            (document.reactions_v2 && document.reactions_v2.length > 0) && (reactionsModel.list = document.reactions_v2.map((value: any) => {
                const model: ReactionFB = {};
                (value.data && value.data[0].reaction?.reaction) && (model.reaction = Decoding.decodeObject(value.data[0].reaction.reaction));
                (value.data && value.data[0].reaction?.actor) && (model.actor = Decoding.decodeObject(value.data[0].reaction.actor));
                (value.timestamp) && (model.date = new Date(1000 * value.timestamp));
                (value.title) && (model.title = Decoding.decodeObject(value.title));
                return model;
            }));
            return reactionsModel.list.length > 0 ? reactionsModel : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseReactions');
            return undefined;
        }
    }
    /**
     * @param data - file 'pages/pages_you've_liked.json' in input as Buffer
     * @return {Promise<PagesLikedFB | undefined>}
     */
    async parsePagesLiked(data: Buffer): Promise<PagesLikedFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const modelPagesLiked: PagesLikedFB = {list: []};
            (document.page_likes_v2 && document.page_likes_v2.length > 0) && (modelPagesLiked.list = document.page_likes_v2.map((value: any) => {
                const model: PageFB = {};
                (value.name) && (model.name = Decoding.decodeObject(value.name));
                (value.timestamp) && (model.date = new Date(1000 * value.timestamp));
                return model;
            }));
            return modelPagesLiked.list.length > 0 ? modelPagesLiked : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parsePagesLiked');
            return undefined;
        }
    }

    /**
     * @param data - file 'pages/pages_you_follow.json' in input as Buffer
     * @return {Promise<PagesFollowFB | undefined>}
     */
    async parsePagesFollowed(data: Buffer): Promise<PagesFollowFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const modelPagesFollow: PagesFollowFB = {list: []};
            (document.pages_followed_v2 && document.pages_followed_v2.length > 0) && (modelPagesFollow.list = document.pages_followed_v2.map((value: any) => {
                const model: PageFB = {};
                (value.title) && (model.name = Decoding.decodeObject(value.title));
                (value.timestamp) && (model.date = new Date(1000 * value.timestamp));
                return model;
            }));
            return modelPagesFollow.list.length > 0 ? modelPagesFollow : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parsePagesFollowed');
            return undefined;
        }
    }

    /**
     * @param data - file 'apps_and_websites_off_of_facebook/apps_and_websites.json' in input as Buffer
     * @return {Promise<AppsConnectedFB | undefined>}
     */
    async parseAppsConnected(data: Buffer): Promise<AppsConnectedFB | undefined> {
        try {
            let document = JSON.parse(data.toString());
            const modelAppsConnected: AppsConnectedFB = {list: []};
            modelAppsConnected.list = document.installed_apps_v2.map((value: any) => {
                const model: AppConnectedFB = {};
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
            const document = JSON.parse(data.toString());
            let messages: Array<MessageFB> = [];
            (document.messages) && (messages = document.messages.map((value: any) => {
                const model: MessageFB = {};
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

            const conversationModel: ConversationFB = {};
            (document.title) && (conversationModel.title = Decoding.decodeObject(document.title));
            (messages.length > 0) && (conversationModel.listMessages = messages);
            (participants.length > 0) && (conversationModel.participants = participants);
            (document.is_still_participant) && (conversationModel.isStillParticipant = document.is_still_participant);

            return !Validator.objectIsEmpty(conversationModel) ? conversationModel : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`,'parseMessages');
            return undefined;
        }
    }

    /**
     * @param data - file 'preferences/language_and_locale.json' in input as Buffer
     * @return {Promise<LanguagesFB | undefined>}
     */
    async parseLanguages(data: Buffer): Promise<LanguagesFB | undefined> {
        try{
            const document = JSON.parse(data.toString());
            const model: LanguagesFB = {};
            if (document.language_and_locale_v2 && document.language_and_locale_v2.length > 0) {
                (document.language_and_locale_v2[0].children[0].entries[0].data?.value) && (model.settingsLanguage = Decoding.decodeObject(document.language_and_locale_v2[0].children[0].entries[0].data.value));
                (document.language_and_locale_v2[1].entries) && (model.languagesKnown = document.language_and_locale_v2[1].entries.map((item: {"data": {"value": string}}) => Decoding.decodeObject(item.data.value)));
                (document.language_and_locale_v2[2].entries[0].data?.value) && (model.favouriteLanguage = Decoding.decodeObject(document.language_and_locale_v2[2].entries[0].data.value));
                return !Validator.objectIsEmpty(model) ? model : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseLanguages');
            return undefined;
        }
    }

    /**
     * @param data - file 'pages/pages_you've_recommended.json' in input as Buffer
     * @return {Promise<PagesRecommendedFB | undefined>}
     */
    async parsePagesRecommended(data: Buffer): Promise<PagesRecommendedFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const modelPages: PagesRecommendedFB = {list: []};
            (document.recommended_pages_v2 && document.recommended_pages_v2.length > 0) && (modelPages.list = document.recommended_pages_v2.map((value: any) => {
                const model: PageFB = {};
                (value.name) && (model.name = Decoding.decodeObject(value.name));
                (value.timestamp) && (model.date = new Date(1000 * value.timestamp));
                (value.url) && (model.url = Decoding.decodeObject(value.url));
                return model;
            }));
            return modelPages.list.length > 0 ? modelPages : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parsePagesRecommended');
            return undefined;
        }
    }

    /**
     * @param data - file 'your_interactions_on_facebook/recently_viewed.json' in input as Buffer
     * @return {Promise<RecentlyViewedFB | undefined>}
     */
    async parseRecentlyViewed(data: Buffer): Promise<RecentlyViewedFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const modelRecentlyViewed: RecentlyViewedFB = {};
            if (document.recently_viewed) {
                if(document.recently_viewed[0] && document.recently_viewed[0].children) {
                    if (document.recently_viewed[0].children[0] && document.recently_viewed[0].children[0].entries) {
                        modelRecentlyViewed.timeSpentOnPageVideos = document.recently_viewed[0].children[0].entries.map((entry: any) => {
                            const model: VisualizationFB = {};
                            (entry.timestamp) && (model.date = new Date(1000 * entry.timestamp));
                            (entry.data?.name) && (model.name = Decoding.decodeObject(entry.data.name));
                            (entry.data?.uri) && (model.uri = Decoding.decodeObject(entry.data.uri));
                            (entry.data?.watch_time) && (model.watchTimeInSeconds = Decoding.decodeObject(entry.data.watch_time));
                            return model;
                        });
                    }
                    if (document.recently_viewed[0].children[1] && document.recently_viewed[0].children[1].entries) {
                        modelRecentlyViewed.videoWatched = document.recently_viewed[0].children[1].entries.map((entry: any) => {
                            const model: VisualizationFB = {};
                            (entry.timestamp) && (model.date = new Date(1000 * entry.timestamp));
                            (entry.data?.name) && (model.name = Decoding.decodeObject(entry.data.name));
                            (entry.data?.uri) && (model.uri = Decoding.decodeObject(entry.data.uri));
                            return model;
                        });
                    }
                    if (document.recently_viewed[0].children[2] && document.recently_viewed[0].children[2].entries) {
                        modelRecentlyViewed.timeSpentOnSingleVideo = document.recently_viewed[0].children[2].entries.map((entry: any) => {
                            const model: VisualizationFB = {};
                            (entry.timestamp) && (model.date = new Date(1000 * entry.timestamp));
                            (entry.data?.name) && (model.name = Decoding.decodeObject(entry.data.name));
                            (entry.data?.uri) && (model.uri = Decoding.decodeObject(entry.data.uri));
                            (entry.data?.watch_position_seconds) && (model.watchTimeInSeconds = Decoding.decodeObject(entry.data.watch_position_seconds));
                            return model;
                        });
                    }
                }
                if(document.recently_viewed[1]) {
                    (document.recently_viewed[1].entries) && (modelRecentlyViewed.postsShownInNewsLast90Days = document.recently_viewed[1].entries.map((entry: any) => {
                        const model: VisualizationFB = {};
                        (entry.timestamp) && (model.date = new Date(1000 * entry.timestamp));
                        (entry.data?.name) && (model.name = Decoding.decodeObject(entry.data.name));
                        (entry.data?.uri) && (model.uri = Decoding.decodeObject(entry.data.uri));
                        return model;
                    }));
                }
                if(document.recently_viewed[2]) {
                    (document.recently_viewed[2].entries) && (modelRecentlyViewed.peopleVisualizedWhenSuggested = document.recently_viewed[2].entries.map((entry: any) => {
                        const model: VisualizationFB = {};
                        (entry.timestamp) && (model.date = new Date(1000 * entry.timestamp));
                        (entry.data?.name) && (model.name = Decoding.decodeObject(entry.data.name));
                        (entry.data?.uri) && (model.uri = Decoding.decodeObject(entry.data.uri));
                        return model;
                    }));
                }
                if(document.recently_viewed[3] && document.recently_viewed[3].children) {
                    if (document.recently_viewed[3].children[4] && document.recently_viewed[3].children[4].entries) {
                        modelRecentlyViewed.marketplaceArticlesVisualized = document.recently_viewed[3].children[4].entries.map((entry: any) => {
                            const model: VisualizationFB = {};
                            (entry.timestamp) && (model.date = new Date(1000 * entry.timestamp));
                            (entry.data?.name) && (model.name = Decoding.decodeObject(entry.data.name));
                            (entry.data?.uri) && (model.uri = Decoding.decodeObject(entry.data.uri));
                            return model;
                        });
                    }
                }
                if(document.recently_viewed[4]) {
                    (document.recently_viewed[4].entries) && (modelRecentlyViewed.insertionsVisualized = document.recently_viewed[4].entries.map((entry: any) => {
                        const model: VisualizationFB = {};
                        (entry.timestamp) && (model.date = new Date(1000 * entry.timestamp));
                        (entry.data?.name) && (model.name = Decoding.decodeObject(entry.data.name));
                        (entry.data?.uri) && (model.uri = Decoding.decodeObject(entry.data.uri));
                        return model;
                    }));
                }
                return !Validator.objectIsEmpty(modelRecentlyViewed) ? modelRecentlyViewed : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseRecentlyViewed');
            return undefined;
        }
    }

    /**
     * @param data - file 'posts/your_posts_1.json' in input as Buffer
     * @return {Promise<YourPostsFB | undefined>}
     */
    async parseYourPosts(data: Buffer): Promise<YourPostsFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const modelPosts: YourPostsFB = {list: []};
            modelPosts.list = document.map((item: any) => {
                const model: YourPostFB = {};
                (item.timestamp) && (model.date = new Date(1000 * item.timestamp));
                (item.attachments && item.attachments[0] && item.attachments[0].data && item.attachments[0].data[0]?.external_context?.url) && (model.url = Decoding.decodeObject(item.attachments[0].data[0].external_context.url));
                (item.title) && (model.title = Decoding.decodeObject(item.title));
                (item.data?.post) && (model.post = Decoding.decodeObject(item.data.post));
                (item.data && item.data[0].update_timestamp) && (model.updateDate = new Date(1000 * item.data[0].update_timestamp));
                return model;
            });
            return modelPosts.list.length > 0 ? modelPosts : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseYourPosts');
            return undefined;
        }
    }


    /**
     * @param data - file 'friends_and_followers/friend_requests_sent.json' in input as Buffer
     * @return {Promise<FriendRequestsSentFB | undefined>}
     */
    async parseFriendRequestsSent(data: Buffer): Promise<FriendRequestsSentFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const modelPosts: FriendRequestsSentFB = {list: []};
            modelPosts.list = document.sent_requests_v2.map((item: any) => {
                const model: FriendActivityFB = {};
                (item.timestamp) && (model.date = new Date(1000 * item.timestamp));
                (item.name) && (model.name = Decoding.decodeObject(item.name));
                return model;
            });
            return modelPosts.list.length > 0 ? modelPosts : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseFriendRequestsSent');
            return undefined;
        }
    }

    /**
     * @param data - file 'friends_and_followers/rejected_friend_requests.json' in input as Buffer
     * @return {Promise<RejectedFriendshipRequestsFB | undefined>}
     */
    async parseRejectedFriendshipRequests(data: Buffer): Promise<RejectedFriendshipRequestsFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const modelPosts: FriendRequestsSentFB = {list: []};
            modelPosts.list = document.rejected_requests_v2.map((item: any) => {
                const model: FriendActivityFB = {};
                (item.timestamp) && (model.date = new Date(1000 * item.timestamp));
                (item.name) && (model.name = Decoding.decodeObject(item.name));
                return model;
            });
            return modelPosts.list.length > 0 ? modelPosts : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseRejectedFriendshipRequests');
            return undefined;
        }
    }

    /**
     * @param data - file 'friends_and_followers/removed_friends.json' in input as Buffer
     * @return {Promise<RemovedFriendsFB | undefined>}
     */
    async parseRemovedFriends(data: Buffer): Promise<RemovedFriendsFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const modelPosts: FriendRequestsSentFB = {list: []};
            modelPosts.list = document.deleted_friends_v2.map((item: any) => {
                const model: FriendActivityFB = {};
                (item.timestamp) && (model.date = new Date(1000 * item.timestamp));
                (item.name) && (model.name = Decoding.decodeObject(item.name));
                return model;
            });
            return modelPosts.list.length > 0 ? modelPosts : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseRemovedFriends');
            return undefined;
        }
    }

    /**
     * @param data - file 'friends_and_followers/who_you_follow.json' in input as Buffer
     * @return {Promise<WhoYouFollowFB | undefined>}
     */
    async parseWhoYouFollow(data: Buffer): Promise<WhoYouFollowFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const modelPosts: FriendRequestsSentFB = {list: []};
            modelPosts.list = document.following_v2.map((item: any) => {
                const model: FriendActivityFB = {};
                (item.timestamp) && (model.date = new Date(1000 * item.timestamp));
                (item.name) && (model.name = Decoding.decodeObject(item.name));
                return model;
            });
            return modelPosts.list.length > 0 ? modelPosts : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseWhoYouFollow');
            return undefined;
        }
    }

}
