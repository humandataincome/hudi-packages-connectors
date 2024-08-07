import LoggerUtils from '../../utils/logger.utils';
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
    FriendRequestsSentFB,
    FriendActivityFB,
    RejectedFriendshipRequestsFB,
    RemovedFriendsFB,
    WhoYouFollowFB,
    FriendsFB,
    PagesUnfollowedFB,
    YourTopicsFB,
    AdsInterestsFB,
    InformationSubmittedAdsFB,
    InformationAdsFB,
    StoriesReactionsFB,
    StoryReactionFB,
    RecentlyVisitedFB,
    VisitedFB,
    VisitedListFB,
} from './model.facebook';
import { DecodingUtils } from '../../utils/decoding.utils';
import { ValidatorObject } from '../../validator/validator.object';
import { FileCodeFacebook } from './enum.facebook';

/**
 * Class used to parse most important files into the directory returned by Facebook in JSON format.
 * All the files are given in input as Buffer, parsed back to JSON and then mapped into a specific interface model.
 * All functions return the relevant information (if there are any) as a promised model if the parsing is successful, undefined otherwise.
 */
export class ServiceFacebook {
    private static readonly logger = new LoggerUtils('Facebook Service');

    /**
     * Abstraction to parse a Facebook file regardless its respective parsing function
     * @param fileCode - code of the file to parse
     * @param data - file to parse as Buffer
     */
    static async parseFile(fileCode: FileCodeFacebook, data: Buffer) {
        switch (fileCode) {
            case FileCodeFacebook.ADS_INTERACTED_WITH:
                return this.parseAdsInteractedWith(data);
            case FileCodeFacebook.ADS_USING_YOUR_ACTIVITY:
                return this.parseAdsUsingYourInfo(data);
            case FileCodeFacebook.INFO_SUBMITTED_ADS:
                return this.parseInformationSubmittedAds(data);
            case FileCodeFacebook.APP_WEBSITES:
                return this.parseAppsConnected(data);
            case FileCodeFacebook.COMMENTS:
                return this.parseComments(data);
            case FileCodeFacebook.REACTIONS:
                return this.parseReactions(data);
            case FileCodeFacebook.FRIENDS:
                return this.parseFriends(data);
            case FileCodeFacebook.FRIENDS_REQUESTS_SENT:
                return this.parseFriendRequestsSent(data);
            case FileCodeFacebook.FRIENDS_REJECTED_REQUESTS:
                return this.parseRejectedFriendshipRequests(data);
            case FileCodeFacebook.FRIENDS_REMOVED:
                return this.parseRemovedFriends(data);
            case FileCodeFacebook.FRIENDS_WHO_YOU_FOLLOW:
                return this.parseWhoYouFollow(data);
            case FileCodeFacebook.MESSAGE_FILTERED:
            case FileCodeFacebook.MESSAGE_CONVERSATION:
                return this.parseMessages(data);
            case FileCodeFacebook.ADS_INTERESTS:
                return this.parseAdsInterests(data);
            case FileCodeFacebook.PAGES_LIKED:
                return this.parsePagesLiked(data);
            case FileCodeFacebook.PAGES_RECOMMENDED:
                return this.parsePagesRecommended(data);
            case FileCodeFacebook.PAGES_FOLLOWED:
                return this.parsePagesFollowed(data);
            case FileCodeFacebook.PAGES_UNFOLLOWED:
                return this.parsePagesUnfollowed(data);
            case FileCodeFacebook.LANGUAGE:
                return this.parseLanguages(data);
            case FileCodeFacebook.PROFILE_INFO:
                return this.parsePersonalInformation(data);
            case FileCodeFacebook.YOUR_POSTS:
                return this.parseYourPosts(data);
            case FileCodeFacebook.SEARCH_HISTORY:
                return this.parseSearchHistory(data);
            case FileCodeFacebook.STORIES_REACTION:
                return this.parseStoriesReactions(data);
            case FileCodeFacebook.RECENTLY_VIEWED:
                return this.parseRecentlyViewed(data);
            case FileCodeFacebook.RECENTLY_VISITED:
                return this.parseRecentlyVisited(data);
            case FileCodeFacebook.YOUR_TOPICS:
                return this.parseYourTopics(data);
            default:
                return undefined;
        }
    }

    /**
     * @param data - FileCodeFacebook.PROFILE_INFO file in input as Buffer
     */
    static async parsePersonalInformation(
        data: Buffer,
    ): Promise<PersonalInformationFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const personalInfoModel: PersonalInformationFB = {};
            if (document) {
                document.profile_v2?.name?.first_name &&
                    (personalInfoModel.firstName = DecodingUtils.decodeObject(
                        document.profile_v2.name.first_name,
                    ));
                document.profile_v2?.name?.middle_name &&
                    (personalInfoModel.middleName = DecodingUtils.decodeObject(
                        document.profile_v2.name.middle_name,
                    ));
                document.profile_v2?.name?.last_name &&
                    (personalInfoModel.lastName = DecodingUtils.decodeObject(
                        document.profile_v2.name.last_name,
                    ));
                document.profile_v2?.emails?.emails &&
                    (personalInfoModel.emails = DecodingUtils.decodeObject(
                        document.profile_v2.emails.emails,
                    ));
                document.profile_v2?.birthday &&
                    (personalInfoModel.birthdate = new Date(
                        Date.UTC(
                            document.profile_v2.birthday.year,
                            document.profile_v2.birthday.month - 1,
                            document.profile_v2.birthday.day,
                            0,
                            0,
                            0,
                        ),
                    ));
                document.profile_v2?.gender?.gender_option &&
                    (personalInfoModel.gender = DecodingUtils.decodeObject(
                        document.profile_v2.gender.gender_option,
                    ));
                document.profile_v2?.current_city?.name &&
                    (personalInfoModel.currentCity = DecodingUtils.decodeObject(
                        document.profile_v2.current_city.name,
                    ));
                document.profile_v2?.hometown?.name &&
                    (personalInfoModel.homeTown = DecodingUtils.decodeObject(
                        document.profile_v2.hometown.name,
                    ));

                const relationshipModel: RelationshipFB = {};
                document.profile_v2?.relationship?.status &&
                    (relationshipModel.status = DecodingUtils.decodeObject(
                        document.profile_v2.relationship.status,
                    ));
                document.profile_v2?.relationship?.anniversary &&
                    (relationshipModel.anniversary =
                        document.profile_v2.relationship.anniversary);
                document.profile_v2?.relationship?.timestamp &&
                    (relationshipModel.dateAdded = new Date(
                        1000 * document.profile_v2.relationship.timestamp,
                    ));
                !ValidatorObject.objectIsEmpty(relationshipModel) &&
                    (personalInfoModel.relationship = relationshipModel);

                document.profile_v2?.education_experiences?.length > 0 &&
                    (personalInfoModel.educationExperiences =
                        document.profile_v2.education_experiences.map(
                            (value: any) => {
                                const educationModel: EducationExperienceFB =
                                    {};
                                value.name &&
                                    (educationModel.name =
                                        DecodingUtils.decodeObject(value.name));
                                value.start_timestamp &&
                                    (educationModel.startDate = new Date(
                                        1000 * value.start_timestamp,
                                    ));
                                value.end_timestamp &&
                                    (educationModel.endDate = new Date(
                                        1000 * value.end_timestamp,
                                    ));
                                value.graduated &&
                                    (educationModel.graduated =
                                        value.graduated);
                                value.description &&
                                    (educationModel.description =
                                        DecodingUtils.decodeObject(
                                            value.description,
                                        ));
                                value.concentrations &&
                                    value.concentrations.length > 0 &&
                                    (educationModel.educationTopics =
                                        DecodingUtils.decodeObject(
                                            value.concentrations,
                                        ));
                                value.degree &&
                                    (educationModel.degree =
                                        DecodingUtils.decodeObject(
                                            value.degree,
                                        ));
                                value.school_type &&
                                    (educationModel.schoolType =
                                        DecodingUtils.decodeObject(
                                            value.school_type,
                                        ));
                                return educationModel;
                            },
                        ));

                document.profile_v2?.work_experiences?.length > 0 &&
                    (personalInfoModel.workExperience =
                        document.profile_v2.work_experiences.map(
                            (value: any) => {
                                const workModel: WorkExperienceFB = {};
                                value.employer &&
                                    (workModel.employer =
                                        DecodingUtils.decodeObject(
                                            value.employer,
                                        ));
                                value.title &&
                                    (workModel.title =
                                        DecodingUtils.decodeObject(
                                            value.title,
                                        ));
                                value.location &&
                                    (workModel.location =
                                        DecodingUtils.decodeObject(
                                            value.location,
                                        ));
                                value.description &&
                                    (workModel.description =
                                        DecodingUtils.decodeObject(
                                            value.description,
                                        ));
                                value.start_timestamp &&
                                    (workModel.startDate = new Date(
                                        1000 * value.start_timestamp,
                                    ));
                                value.end_timestamp &&
                                    (workModel.endDate = new Date(
                                        1000 * value.end_timestamp,
                                    ));
                                return workModel;
                            },
                        ));

                document.profile_v2?.languages?.length > 0 &&
                    (personalInfoModel.languages =
                        document.profile_v2.languages.map((value: any) =>
                            DecodingUtils.decodeObject(value.name),
                        ));
                document.profile_v2?.interested_in?.length > 0 &&
                    (personalInfoModel.gendersInterests =
                        DecodingUtils.decodeObject(
                            document.profile_v2.interested_in,
                        ));
                document.profile_v2?.political_view?.length > 0 &&
                    (personalInfoModel.politicalView =
                        document.profile_v2.political_view.map((value: any) => {
                            const viewModel: ViewFB = {};
                            value.name &&
                                (viewModel.name = DecodingUtils.decodeObject(
                                    value.name,
                                ));
                            value.description &&
                                (viewModel.description =
                                    DecodingUtils.decodeObject(
                                        value.description,
                                    ));
                            return viewModel;
                        }));
                document.profile_v2?.political_view?.length > 0 &&
                    (personalInfoModel.religiousView =
                        document.profile_v2.religious_view.map((value: any) => {
                            const viewModel: ViewFB = {};
                            value.name &&
                                (viewModel.name = DecodingUtils.decodeObject(
                                    value.name,
                                ));
                            value.description &&
                                (viewModel.description =
                                    DecodingUtils.decodeObject(
                                        value.description,
                                    ));
                            return viewModel;
                        }));
                document.profile_v2?.blood_donor_status &&
                    (personalInfoModel.bloodInfo = DecodingUtils.decodeObject(
                        document.profile_v2.blood_info.blood_donor_status,
                    ));
                document.profile_v2?.websites &&
                    document.profile_v2.websites.length > 0 &&
                    (personalInfoModel.websites =
                        document.profile_v2.websites.map((value: any) =>
                            DecodingUtils.decodeObject(value.address),
                        ));

                const addressModel: AddressLocationFB = {};
                document.profile_v2?.address?.street &&
                    (addressModel.street = DecodingUtils.decodeObject(
                        document.profile_v2.address.street,
                    ));
                document.profile_v2?.address?.city &&
                    (addressModel.city = DecodingUtils.decodeObject(
                        document.profile_v2.address.city,
                    ));
                document.profile_v2?.address?.zipcode &&
                    (addressModel.zipcode = DecodingUtils.decodeObject(
                        document.profile_v2.address.zipcode,
                    ));
                document.profile_v2?.address?.neighborhood &&
                    (addressModel.neighborhood = DecodingUtils.decodeObject(
                        document.profile_v2.address.neighborhood,
                    ));
                document.profile_v2?.address?.country &&
                    (addressModel.country = DecodingUtils.decodeObject(
                        document.profile_v2.address.country,
                    ));
                document.profile_v2?.address?.country_code &&
                    (addressModel.countryCode = DecodingUtils.decodeObject(
                        document.profile_v2.address.country_code,
                    ));
                document.profile_v2?.address?.region &&
                    (addressModel.region = DecodingUtils.decodeObject(
                        document.profile_v2.address.region,
                    ));
                !ValidatorObject.objectIsEmpty(addressModel) &&
                    (personalInfoModel.address = addressModel);

                document.profile_v2?.phone_numbers?.length > 0 &&
                    (personalInfoModel.phoneNumbers =
                        document.profile_v2.phone_numbers);
                document.profile_v2?.places_lived?.length > 0 &&
                    (personalInfoModel.placesLived =
                        document.profile_v2.places_lived.map((value: any) => {
                            const placeModel: PlaceLivedFB = {};
                            value.place &&
                                (placeModel.place = DecodingUtils.decodeObject(
                                    value.place,
                                ));
                            value.start_timestamp &&
                                (placeModel.startDate = new Date(
                                    1000 * value.start_timestamp,
                                ));
                            return placeModel;
                        }));

                document.profile_v2?.pages?.length > 0 &&
                    (personalInfoModel.pagesInterests =
                        document.profile_v2.pages.map((value: any) => {
                            const pagesModel: PagesFB = {};
                            value.name &&
                                (pagesModel.category =
                                    DecodingUtils.decodeObject(value.name));
                            value.pages &&
                                value.pages.length > 0 &&
                                (pagesModel.pages = DecodingUtils.decodeObject(
                                    value.pages,
                                ));
                            return pagesModel;
                        }));
                document.profile_v2?.registration_timestamp &&
                    (personalInfoModel.registrationDate = new Date(
                        1000 * document.profile_v2.registration_timestamp,
                    ));
                document.profile_v2?.profile_uri &&
                    (personalInfoModel.profileUri = DecodingUtils.decodeObject(
                        document.profile_v2.profile_uri,
                    ));
            }
            return !ValidatorObject.objectIsEmpty(personalInfoModel)
                ? personalInfoModel
                : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parsePersonalInformation');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeFacebook.ADS_INTERACTED_WITH file in input as Buffer
     */

    static async parseAdsInteractedWith(
        data: Buffer,
    ): Promise<AdsInteractedWithFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const adsModel: AdsInteractedWithFB = { list: [] };
            document &&
                document.history_v2 &&
                document.history_v2.length > 0 &&
                (adsModel.list = document.history_v2.map((value: any) => {
                    const model: AdvInteractionFB = {};
                    value.title &&
                        (model.title = DecodingUtils.decodeObject(value.title));
                    value.action &&
                        (model.action = DecodingUtils.decodeObject(
                            value.action,
                        ));
                    value.timestamp &&
                        (model.date = new Date(1000 * value.timestamp));
                    return model;
                }));
            return adsModel.list.length > 0 ? adsModel : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseAdsInteractedWith');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeFacebook.ADS_USING_YOUR_ACTIVITY file in input as Buffer
     */
    static async parseAdsUsingYourInfo(
        data: Buffer,
    ): Promise<AdsUsingYourInfoFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const adsModel: AdsUsingYourInfoFB = { list: [] };
            document &&
                document.custom_audiences_all_types_v2 &&
                document.custom_audiences_all_types_v2.length > 0 &&
                (adsModel.list = document.custom_audiences_all_types_v2.map(
                    (value: any) => {
                        const model: AdvUsingYourInfoFB = {};
                        value.advertiser_name &&
                            (model.advertiserName = DecodingUtils.decodeObject(
                                value.advertiser_name,
                            ));
                        value.has_data_file_custom_audience &&
                            (model.hasDataFileCustomAudience =
                                value.has_data_file_custom_audience);
                        value.has_remarketing_custom_audience &&
                            (model.hasRemarketingCustomAudience =
                                value.has_remarketing_custom_audience);
                        value.has_in_person_store_visit &&
                            (model.hasInPersonStoreVisit =
                                value.has_in_person_store_visit);
                        return model;
                    },
                ));
            return adsModel.list.length > 0 ? adsModel : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseAdsUsingYourInfo');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeFacebook.SEARCH_HISTORY file in input as Buffer
     */
    static async parseSearchHistory(
        data: Buffer,
    ): Promise<SearchHistoryFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const searchHistoryModel: SearchHistoryFB = { list: [] };
            document &&
                document.searches_v2 &&
                document.searches_v2.length > 0 &&
                (searchHistoryModel.list = document.searches_v2.map(
                    (value: any) => {
                        const model: SearchFB = {};
                        value.data &&
                            value.data[0].text &&
                            (model.text = DecodingUtils.decodeObject(
                                value.data[0].text,
                            ));
                        value.timestamp &&
                            (model.date = new Date(1000 * value.timestamp));
                        return model;
                    },
                ));
            return searchHistoryModel.list.length > 0
                ? searchHistoryModel
                : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseSearchHistory');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeFacebook.COMMENTS file in input as Buffer
     */
    static async parseComments(
        data: Buffer,
    ): Promise<CommentsPostedFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const commentsPostedModel: CommentsPostedFB = { list: [] };
            document &&
                document.comments_v2 &&
                document.comments_v2.length > 0 &&
                (commentsPostedModel.list = document.comments_v2.map(
                    (value: any) => {
                        const model: CommentPostedFB = {};
                        value.data &&
                            value.data[0].comment?.comment &&
                            (model.text = DecodingUtils.decodeObject(
                                value.data[0].comment.comment,
                            ));
                        value.data &&
                            value.data[0].comment?.author &&
                            (model.author = DecodingUtils.decodeObject(
                                value.data[0].comment.author,
                            ));
                        value.timestamp &&
                            (model.date = new Date(1000 * value.timestamp));
                        value.title &&
                            (model.title = DecodingUtils.decodeObject(
                                value.title,
                            ));
                        return model;
                    },
                ));
            return commentsPostedModel.list.length > 0
                ? commentsPostedModel
                : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseComments');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeFacebook.REACTIONS file in input as Buffer
     */
    static async parseReactions(
        data: Buffer,
    ): Promise<ReactionsFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const reactionsModel: ReactionsFB = { list: [] };
            document &&
                document.reactions_v2 &&
                document.reactions_v2.length > 0 &&
                (reactionsModel.list = document.reactions_v2.map(
                    (value: any) => {
                        const model: ReactionFB = {};
                        value.data &&
                            value.data[0].reaction?.reaction &&
                            (model.reaction = DecodingUtils.decodeObject(
                                value.data[0].reaction.reaction,
                            ));
                        value.data &&
                            value.data[0].reaction?.actor &&
                            (model.actor = DecodingUtils.decodeObject(
                                value.data[0].reaction.actor,
                            ));
                        value.timestamp &&
                            (model.date = new Date(1000 * value.timestamp));
                        value.title &&
                            (model.title = DecodingUtils.decodeObject(
                                value.title,
                            ));
                        return model;
                    },
                ));
            return reactionsModel.list.length > 0 ? reactionsModel : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseReactions');
            return undefined;
        }
    }
    /**
     * @param data - FileCodeFacebook.PAGES_LIKED file in input as Buffer
     */
    static async parsePagesLiked(
        data: Buffer,
    ): Promise<PagesLikedFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const modelPagesLiked: PagesLikedFB = { list: [] };
            document &&
                document.page_likes_v2 &&
                document.page_likes_v2.length > 0 &&
                (modelPagesLiked.list = document.page_likes_v2.map(
                    (value: any) => {
                        const model: PageFB = {};
                        value.name &&
                            (model.name = DecodingUtils.decodeObject(
                                value.name,
                            ));
                        value.timestamp &&
                            (model.date = new Date(1000 * value.timestamp));
                        return model;
                    },
                ));
            return modelPagesLiked.list.length > 0
                ? modelPagesLiked
                : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parsePagesLiked');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeFacebook.PAGES_FOLLOWED file in input as Buffer
     */
    static async parsePagesFollowed(
        data: Buffer,
    ): Promise<PagesFollowFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const modelPagesFollow: PagesFollowFB = { list: [] };
            document &&
                document.pages_followed_v2 &&
                document.pages_followed_v2.length > 0 &&
                (modelPagesFollow.list = document.pages_followed_v2.map(
                    (value: any) => {
                        const model: PageFB = {};
                        value.title &&
                            (model.name = DecodingUtils.decodeObject(
                                value.title,
                            ));
                        value.timestamp &&
                            (model.date = new Date(1000 * value.timestamp));
                        return model;
                    },
                ));
            return modelPagesFollow.list.length > 0
                ? modelPagesFollow
                : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parsePagesFollowed');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeFacebook.APP_WEBSITES file in input as Buffer
     */
    static async parseAppsConnected(
        data: Buffer,
    ): Promise<AppsConnectedFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const modelAppsConnected: AppsConnectedFB = { list: [] };
            document &&
                (modelAppsConnected.list = document.installed_apps_v2.map(
                    (value: any) => {
                        const model: AppConnectedFB = {};
                        value.name &&
                            (model.name = DecodingUtils.decodeObject(
                                value.name,
                            ));
                        value.user_app_scoped_id &&
                            (model.userAppScopedId = value.user_app_scoped_id);
                        value.category &&
                            (model.category = DecodingUtils.decodeObject(
                                value.category,
                            ));
                        //addedTimestamp and removedTimestamp parameters are mutual exclusive
                        value.added_timestamp &&
                            (model.addedTimestamp = new Date(
                                1000 * value.added_timestamp,
                            ));
                        value.removed_timestamp &&
                            (model.removedTimestamp = new Date(
                                1000 * value.removed_timestamp,
                            ));
                        return model;
                    },
                ));
            return modelAppsConnected.list.length > 0
                ? modelAppsConnected
                : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseAppsConnected');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeFacebook.MESSAGE_FILTERED or FileCodeFacebook.MESSAGE_CONVERSATION file in input as Buffer
     */
    static async parseMessages(
        data: Buffer,
    ): Promise<ConversationFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            let messages: MessageFB[] = [];
            document &&
                document.messages &&
                (messages = document.messages.map((value: any) => {
                    const model: MessageFB = {};
                    value.sender_name &&
                        (model.senderName = DecodingUtils.decodeObject(
                            value.sender_name,
                        ));
                    value.content &&
                        (model.content = DecodingUtils.decodeObject(
                            value.content,
                        ));
                    value.type &&
                        (model.type = DecodingUtils.decodeObject(value.type));
                    value.is_unsent && (model.isUnsent = value.is_unsent);
                    value.share &&
                        value.share.link &&
                        (model.link = DecodingUtils.decodeObject(
                            value.share.link,
                        ));
                    value.timestamp_ms &&
                        (model.date = new Date(value.timestamp_ms));
                    return model;
                }));
            let participants: string[] = [];
            document.participants &&
                (participants = document.participants.map((value: any) =>
                    DecodingUtils.decodeObject(value.name),
                ));

            const conversationModel: ConversationFB = {};
            document.title &&
                (conversationModel.title = DecodingUtils.decodeObject(
                    document.title,
                ));
            messages.length > 0 && (conversationModel.listMessages = messages);
            participants.length > 0 &&
                (conversationModel.participants = participants);
            document.is_still_participant &&
                (conversationModel.isStillParticipant =
                    document.is_still_participant);

            return !ValidatorObject.objectIsEmpty(conversationModel)
                ? conversationModel
                : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseMessages');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeFacebook.LANGUAGE file in input as Buffer
     */
    static async parseLanguages(
        data: Buffer,
    ): Promise<LanguagesFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const model: LanguagesFB = {};
            if (
                document &&
                document.language_and_locale_v2 &&
                document.language_and_locale_v2.length > 0
            ) {
                document.language_and_locale_v2[0].children[0].entries[0].data
                    ?.value &&
                    (model.settingsLanguage = DecodingUtils.decodeObject(
                        document.language_and_locale_v2[0].children[0]
                            .entries[0].data.value,
                    ));
                document.language_and_locale_v2[1].entries &&
                    (model.languagesKnown =
                        document.language_and_locale_v2[1].entries.map(
                            (item: { data: { value: string } }) =>
                                DecodingUtils.decodeObject(item.data.value),
                        ));
                document.language_and_locale_v2[2].entries[0].data?.value &&
                    (model.favouriteLanguage = DecodingUtils.decodeObject(
                        document.language_and_locale_v2[2].entries[0].data
                            .value,
                    ));
                return !ValidatorObject.objectIsEmpty(model)
                    ? model
                    : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseLanguages');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeFacebook.PAGES_RECOMMENDED file in input as Buffer
     */
    static async parsePagesRecommended(
        data: Buffer,
    ): Promise<PagesRecommendedFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const modelPages: PagesRecommendedFB = { list: [] };
            document &&
                document.recommended_pages_v2 &&
                document.recommended_pages_v2.length > 0 &&
                (modelPages.list = document.recommended_pages_v2.map(
                    (value: any) => {
                        const model: PageFB = {};
                        value.name &&
                            (model.name = DecodingUtils.decodeObject(
                                value.name,
                            ));
                        value.timestamp &&
                            (model.date = new Date(1000 * value.timestamp));
                        value.url &&
                            (model.url = DecodingUtils.decodeObject(value.url));
                        return model;
                    },
                ));
            return modelPages.list.length > 0 ? modelPages : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parsePagesRecommended');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeFacebook.PAGES_UNFOLLOWED file in input as Buffer
     */
    static async parsePagesUnfollowed(
        data: Buffer,
    ): Promise<PagesUnfollowedFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const modelPages: PagesUnfollowedFB = { list: [] };
            document &&
                document.pages_unfollowed_v2 &&
                document.pages_unfollowed_v2.length > 0 &&
                (modelPages.list = document.pages_unfollowed_v2.map(
                    (value: any) => {
                        const model: PageFB = {};
                        value.title &&
                            (model.name = DecodingUtils.decodeObject(
                                value.title,
                            ));
                        value.timestamp &&
                            (model.date = new Date(1000 * value.timestamp));
                        return model;
                    },
                ));
            return modelPages.list.length > 0 ? modelPages : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parsePagesUnfollowed');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeFacebook.RECENTLY_VIEWED file in input as Buffer
     */
    static async parseRecentlyViewed(
        data: Buffer,
    ): Promise<RecentlyViewedFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const modelRecentlyViewed: RecentlyViewedFB = {};
            if (document && document.recently_viewed) {
                if (
                    document.recently_viewed[0] &&
                    document.recently_viewed[0].children
                ) {
                    if (
                        document.recently_viewed[0].children[0] &&
                        document.recently_viewed[0].children[0].entries
                    ) {
                        modelRecentlyViewed.timeSpentOnPageVideos =
                            document.recently_viewed[0].children[0].entries.map(
                                (entry: any) => {
                                    const model: VisualizationFB = {};
                                    entry.timestamp &&
                                        (model.date = new Date(
                                            1000 * entry.timestamp,
                                        ));
                                    entry.data?.name &&
                                        (model.name =
                                            DecodingUtils.decodeObject(
                                                entry.data.name,
                                            ));
                                    entry.data?.uri &&
                                        (model.uri = DecodingUtils.decodeObject(
                                            entry.data.uri,
                                        ));
                                    entry.data?.watch_time &&
                                        (model.watchTimeInSeconds =
                                            DecodingUtils.decodeObject(
                                                entry.data.watch_time,
                                            ));
                                    return model;
                                },
                            );
                    }
                    if (
                        document.recently_viewed[0].children[1] &&
                        document.recently_viewed[0].children[1].entries
                    ) {
                        modelRecentlyViewed.videoWatched =
                            document.recently_viewed[0].children[1].entries.map(
                                (entry: any) => {
                                    const model: VisualizationFB = {};
                                    entry.timestamp &&
                                        (model.date = new Date(
                                            1000 * entry.timestamp,
                                        ));
                                    entry.data?.name &&
                                        (model.name =
                                            DecodingUtils.decodeObject(
                                                entry.data.name,
                                            ));
                                    entry.data?.uri &&
                                        (model.uri = DecodingUtils.decodeObject(
                                            entry.data.uri,
                                        ));
                                    return model;
                                },
                            );
                    }
                    if (
                        document.recently_viewed[0].children[2] &&
                        document.recently_viewed[0].children[2].entries
                    ) {
                        modelRecentlyViewed.timeSpentOnSingleVideo =
                            document.recently_viewed[0].children[2].entries.map(
                                (entry: any) => {
                                    const model: VisualizationFB = {};
                                    entry.timestamp &&
                                        (model.date = new Date(
                                            1000 * entry.timestamp,
                                        ));
                                    entry.data?.name &&
                                        (model.name =
                                            DecodingUtils.decodeObject(
                                                entry.data.name,
                                            ));
                                    entry.data?.uri &&
                                        (model.uri = DecodingUtils.decodeObject(
                                            entry.data.uri,
                                        ));
                                    entry.data?.watch_position_seconds &&
                                        (model.watchTimeInSeconds =
                                            DecodingUtils.decodeObject(
                                                entry.data
                                                    .watch_position_seconds,
                                            ));
                                    return model;
                                },
                            );
                    }
                }
                if (document.recently_viewed[1]) {
                    document.recently_viewed[1].entries &&
                        (modelRecentlyViewed.postsShownInNewsLast90Days =
                            document.recently_viewed[1].entries.map(
                                (entry: any) => {
                                    const model: VisualizationFB = {};
                                    entry.timestamp &&
                                        (model.date = new Date(
                                            1000 * entry.timestamp,
                                        ));
                                    entry.data?.name &&
                                        (model.name =
                                            DecodingUtils.decodeObject(
                                                entry.data.name,
                                            ));
                                    entry.data?.uri &&
                                        (model.uri = DecodingUtils.decodeObject(
                                            entry.data.uri,
                                        ));
                                    return model;
                                },
                            ));
                }
                if (document.recently_viewed[2]) {
                    document.recently_viewed[2].entries &&
                        (modelRecentlyViewed.peopleVisualizedWhenSuggested =
                            document.recently_viewed[2].entries.map(
                                (entry: any) => {
                                    const model: VisualizationFB = {};
                                    entry.timestamp &&
                                        (model.date = new Date(
                                            1000 * entry.timestamp,
                                        ));
                                    entry.data?.name &&
                                        (model.name =
                                            DecodingUtils.decodeObject(
                                                entry.data.name,
                                            ));
                                    entry.data?.uri &&
                                        (model.uri = DecodingUtils.decodeObject(
                                            entry.data.uri,
                                        ));
                                    return model;
                                },
                            ));
                }
                if (
                    document.recently_viewed[3] &&
                    document.recently_viewed[3].children
                ) {
                    if (
                        document.recently_viewed[3].children[4] &&
                        document.recently_viewed[3].children[4].entries
                    ) {
                        modelRecentlyViewed.marketplaceArticlesVisualized =
                            document.recently_viewed[3].children[4].entries.map(
                                (entry: any) => {
                                    const model: VisualizationFB = {};
                                    entry.timestamp &&
                                        (model.date = new Date(
                                            1000 * entry.timestamp,
                                        ));
                                    entry.data?.name &&
                                        (model.name =
                                            DecodingUtils.decodeObject(
                                                entry.data.name,
                                            ));
                                    entry.data?.uri &&
                                        (model.uri = DecodingUtils.decodeObject(
                                            entry.data.uri,
                                        ));
                                    return model;
                                },
                            );
                    }
                }
                if (document.recently_viewed[4]) {
                    document.recently_viewed[4].entries &&
                        (modelRecentlyViewed.insertionsVisualized =
                            document.recently_viewed[4].entries.map(
                                (entry: any) => {
                                    const model: VisualizationFB = {};
                                    entry.timestamp &&
                                        (model.date = new Date(
                                            1000 * entry.timestamp,
                                        ));
                                    entry.data?.name &&
                                        (model.name =
                                            DecodingUtils.decodeObject(
                                                entry.data.name,
                                            ));
                                    entry.data?.uri &&
                                        (model.uri = DecodingUtils.decodeObject(
                                            entry.data.uri,
                                        ));
                                    return model;
                                },
                            ));
                }
                return !ValidatorObject.objectIsEmpty(modelRecentlyViewed)
                    ? modelRecentlyViewed
                    : undefined;
            }
            return undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseRecentlyViewed');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeFacebook.YOUR_POSTS file in input as Buffer
     */
    static async parseYourPosts(
        data: Buffer,
    ): Promise<YourPostsFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const modelPosts: YourPostsFB = { list: [] };
            document &&
                (modelPosts.list = document.map((item: any) => {
                    const model: YourPostFB = {};
                    item.timestamp &&
                        (model.date = new Date(1000 * item.timestamp));
                    item.title &&
                        (model.title = DecodingUtils.decodeObject(item.title));
                    item.data &&
                        item.data.post &&
                        (model.post = DecodingUtils.decodeObject(
                            item.data.post,
                        ));
                    !item.title &&
                        item.attachments &&
                        item.attachments[0] &&
                        item.attachments[0].data &&
                        item.attachments[0].data[0] &&
                        item.attachments[0].data[0].media &&
                        item.attachments[0].data[0].media.title &&
                        (model.title = item.attachments[0].data[0].media.title);
                    return model;
                }));
            return modelPosts.list.length > 0 ? modelPosts : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseYourPosts');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeFacebook.FRIENDS_REQUESTS_SENT file in input as Buffer
     */
    static async parseFriendRequestsSent(
        data: Buffer,
    ): Promise<FriendRequestsSentFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const modelPosts: FriendRequestsSentFB = { list: [] };
            document &&
                (modelPosts.list = document.sent_requests_v2.map(
                    (item: any) => {
                        const model: FriendActivityFB = {};
                        item.timestamp &&
                            (model.date = new Date(1000 * item.timestamp));
                        item.name &&
                            (model.name = DecodingUtils.decodeObject(
                                item.name,
                            ));
                        return model;
                    },
                ));
            return modelPosts.list.length > 0 ? modelPosts : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseFriendRequestsSent');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeFacebook.FRIENDS_REJECTED_REQUESTS file in input as Buffer
     */
    static async parseRejectedFriendshipRequests(
        data: Buffer,
    ): Promise<RejectedFriendshipRequestsFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const modelPosts: FriendRequestsSentFB = { list: [] };
            document &&
                (modelPosts.list = document.rejected_requests_v2.map(
                    (item: any) => {
                        const model: FriendActivityFB = {};
                        item.timestamp &&
                            (model.date = new Date(1000 * item.timestamp));
                        item.name &&
                            (model.name = DecodingUtils.decodeObject(
                                item.name,
                            ));
                        return model;
                    },
                ));
            return modelPosts.list.length > 0 ? modelPosts : undefined;
        } catch (error) {
            this.logger.log(
                'error',
                `${error}`,
                'parseRejectedFriendshipRequests',
            );
            return undefined;
        }
    }

    /**
     * @param data - FileCodeFacebook.FRIENDS_REMOVED file in input as Buffer
     */
    static async parseRemovedFriends(
        data: Buffer,
    ): Promise<RemovedFriendsFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const modelPosts: FriendRequestsSentFB = { list: [] };
            document &&
                (modelPosts.list = document.deleted_friends_v2.map(
                    (item: any) => {
                        const model: FriendActivityFB = {};
                        item.timestamp &&
                            (model.date = new Date(1000 * item.timestamp));
                        item.name &&
                            (model.name = DecodingUtils.decodeObject(
                                item.name,
                            ));
                        return model;
                    },
                ));
            return modelPosts.list.length > 0 ? modelPosts : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseRemovedFriends');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeFacebook.FRIENDS_WHO_YOU_FOLLOW file in input as Buffer
     */
    static async parseWhoYouFollow(
        data: Buffer,
    ): Promise<WhoYouFollowFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const modelPosts: FriendRequestsSentFB = { list: [] };
            document &&
                (modelPosts.list = document.following_v2.map((item: any) => {
                    const model: FriendActivityFB = {};
                    item.timestamp &&
                        (model.date = new Date(1000 * item.timestamp));
                    item.name &&
                        (model.name = DecodingUtils.decodeObject(item.name));
                    return model;
                }));
            return modelPosts.list.length > 0 ? modelPosts : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseWhoYouFollow');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeFacebook.FRIENDS file in input as Buffer
     */
    static async parseFriends(data: Buffer): Promise<FriendsFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const modelFriends: FriendsFB = { list: [] };
            document &&
                (modelFriends.list = document.friends_v2.map((item: any) => {
                    const model: FriendActivityFB = {};
                    item.timestamp &&
                        (model.date = new Date(1000 * item.timestamp));
                    item.name &&
                        (model.name = DecodingUtils.decodeObject(item.name));
                    return model;
                }));
            return modelFriends.list.length > 0 ? modelFriends : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseFriends');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeFacebook.YOUR_TOPICS file in input as Buffer
     */
    static async parseYourTopics(
        data: Buffer,
    ): Promise<YourTopicsFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const modelPosts: YourTopicsFB = { list: [] };
            if (document && document.inferred_topics_v2) {
                modelPosts.list = document.inferred_topics_v2.map(
                    (item: string) => DecodingUtils.decodeObject(item),
                );
            }
            return modelPosts.list.length > 0 ? modelPosts : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseYourTopics');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeFacebook.ADS_INTERESTS file in input as Buffer
     */
    static async parseAdsInterests(
        data: Buffer,
    ): Promise<AdsInterestsFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const modelPosts: AdsInterestsFB = { list: [] };
            if (document && document.topics_v2) {
                modelPosts.list = document.topics_v2.map((item: string) =>
                    DecodingUtils.decodeObject(item),
                );
            }
            return modelPosts.list.length > 0 ? modelPosts : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseAdsInterests');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeFacebook.INFO_SUBMITTED_ADS file in input as Buffer
     */
    static async parseInformationSubmittedAds(
        data: Buffer,
    ): Promise<InformationSubmittedAdsFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const modelInfo: InformationSubmittedAdsFB = { list: [] };
            if (document) {
                modelInfo.list = document.lead_gen_info_v2.map((item: any) => {
                    const model: InformationAdsFB = {};
                    item.label &&
                        (model.label = DecodingUtils.decodeObject(item.label));
                    item.value &&
                        (model.value = DecodingUtils.decodeObject(item.value));
                    return model;
                });
            }
            return modelInfo.list.length > 0 ? modelInfo : undefined;
        } catch (error) {
            this.logger.log(
                'error',
                `${error}`,
                'parseInformationSubmittedAds',
            );
            return undefined;
        }
    }
    /**
     * @param data - FileCodeFacebook.STORIES_REACTION file in input as Buffer
     */
    static async parseStoriesReactions(
        data: Buffer,
    ): Promise<StoriesReactionsFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const modelInfo: StoriesReactionsFB = { list: [] };
            if (document) {
                modelInfo.list = document.stories_feedback_v2.map(
                    (item: any) => {
                        const model: StoryReactionFB = {};
                        item.timestamp &&
                            (model.date = new Date(1000 * item.timestamp));
                        item.title &&
                            (model.title = DecodingUtils.decodeObject(
                                item.title,
                            ));
                        return model;
                    },
                );
            }
            return modelInfo.list.length > 0 ? modelInfo : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseStoriesReactions');
            return undefined;
        }
    }

    /**
     * @param data - FileCodeFacebook.RECENTLY_VISITED file in input as Buffer
     */
    static async parseRecentlyVisited(
        data: Buffer,
    ): Promise<RecentlyVisitedFB | undefined> {
        try {
            const document = JSON.parse(data.toString());
            const model: RecentlyVisitedFB = { list: [] };
            if (document && document.visited_things_v2) {
                //last array of visits to marketplace isn't parsed
                for (
                    let i = 0;
                    i < document.visited_things_v2.length - 1;
                    i++
                ) {
                    const modelList: VisitedListFB = { list: [] };
                    document.visited_things_v2[i].name &&
                        (modelList.name = document.visited_things_v2[i].name);
                    document.visited_things_v2[i].entries &&
                        (modelList.list = document.visited_things_v2[
                            i
                        ].entries.map((item: any) => {
                            const model: VisitedFB = {};
                            item.timestamp &&
                                (model.date = new Date(1000 * item.timestamp));
                            item.data &&
                                item.data.name &&
                                (model.name = DecodingUtils.decodeObject(
                                    item.data.name,
                                ));
                            item.data &&
                                item.data.uri &&
                                (model.uri = DecodingUtils.decodeObject(
                                    item.data.uri,
                                ));
                            return model;
                        }));
                    modelList.list.length > 0 && model.list.push(modelList);
                }
            }
            return model.list.length > 0 ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseRecentlyVisited');
            return undefined;
        }
    }
}
