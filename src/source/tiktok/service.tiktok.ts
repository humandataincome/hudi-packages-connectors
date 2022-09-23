import Logger from "../../utils/logger";
import {
    CommentsTK, ConversationsTK,
    FavoriteEffectsTK, FavoriteSoundsTK,
    FollowListTK, LoginHistoryTK,
    ProfileTK,
    SearchHistoryTK,
    SearchTK, ShareHistoryTK, StatusListTK,
    UserDataTK,
    VideoBrowsingHistoryTK,
    VideoLikedListTK, YourVideoListTK
} from "./model.tiktok";
import {ValidatorObject, Months} from "../../utils";
import {FileCodeTikTok} from "./enum.tiktok";

export class ServiceTiktok {
    private static readonly logger = new Logger("TikTok Service");

    /**
     * Abstraction to parse a TikTok file regardless its respective parsing function
     * @param fileCode - code of the file to parse
     * @param data - file to parse as Buffer
     */
    static async parseFile(fileCode: FileCodeTikTok, data: Buffer) {
        switch (fileCode) {
            case FileCodeTikTok.USER_DATA:
                return this.parseUserData(data);
            default:
                return undefined;
        }
    }

    /**
     * @param data - FileCodeTikTok.USER_DATA file in input as Buffer
     */
    static async parseUserData(data: Buffer): Promise<UserDataTK | undefined> {
        let model: UserDataTK = {};
        try {
            let document = JSON.parse(data.toString());
            if (document && document['Activity']) {
                const activity = document['Activity'];
                if (activity['Favorite Effects']) {
                    if (activity['Favorite Effects'].FavoriteEffectsList) {
                        model.favoriteEffects = this.buildEffectsModel(activity['Favorite Effects'].FavoriteEffectsList);
                    }
                }
                if (activity['Favorite Hashtags']) {} //NO DATA
                if (activity['Favorite Sounds']) {
                    if (activity['Favorite Sounds'].FavoriteSoundList) {
                        model.favoriteSounds = this.buildSoundsModel(activity['Favorite Sounds'].FavoriteSoundList);
                    }
                }
                if (activity['Favorite Videos']) {
                    if (activity['Favorite Videos'].FavoriteVideoList) {
                        model.favoriteVideos = this.buildVideoFavouriteModel(activity['Favorite Videos'].FavoriteVideoList);
                    }
                }
                if (activity['Follower List']) {
                    if (activity['Follower List'].FansList) {
                        model.followersList = this.buildFollowModel(activity['Follower List'].FansList);
                    }
                }
                if (activity['Following List']) {
                    if (activity['Following List'].Following) {
                        model.followingList = this.buildFollowModel(activity['Following List'].Following);
                    }
                }
                if (activity['Hashtag']) {
                } //NO DATA
                if (activity['Like List']) {
                    if (activity['Like List'].ItemFavoriteList) {
                        model.videoLiked = this.buildVideoLikedModel(activity['Like List'].ItemFavoriteList);
                    }
                }
                if (activity['Login History']) {
                    if (activity['Login History'].LoginHistoryList) {
                        model.logins = this.buildLoginsModel(activity['Login History'].LoginHistoryList);
                    }
                }
                if (activity['Purchase History']) {
                } //NO DATA
                if (activity['Search History']) {
                    if (activity['Search History'].SearchList) {
                        model.searchHistory = this.buildSearchHistoryModel(activity['Search History'].SearchList);
                    }
                }
                if (activity['Share History']) {
                    if (activity['Share History'].ShareHistoryList) {
                        model.shareHistory = this.buildShareHistoryModel(activity['Share History'].ShareHistoryList);
                    }
                }
                if (activity['Status']) {
                    if (activity['Status']["Status List"]) {
                        model.statusList = this.buildStatusListModel(activity['Status']["Status List"]);
                    }
                }
                if (activity['Video Browsing History']) {
                    if (activity['Video Browsing History'].VideoList) {
                        model.videoBrowsingHistory = this.buildVideoBrowsingHistoryModel(activity['Video Browsing History'].VideoList);
                    }
                }
                if (activity['Ads and data']) {} //NO DATA
            }
            if (document['App Settings']) {} //NO DATA
            if (document['Comment']?.Comments?.CommentsList) {
                model.comments = this.buildCommentsModel(document['Comment'].Comments.CommentsList);
            }
            if (document['Direct Messages']) {
                if (document['Direct Messages']["Chat History"] && document['Direct Messages']["Chat History"].ChatHistory) {
                    model.directMessage = this.buildConversations(document['Direct Messages']["Chat History"].ChatHistory);
                }
            }
            if (document['Profile']) {
                model.profile = this.buildProfileModel(document['Profile']);
            }
            if (document['Tiktok Live']) {}//NO DATA
            if (document['Tiktok Shopping']) {}//NO DATA
            if (document['Video']?.Videos?.VideoList) {
                model.yourVideo = this.buildYourVideoModel(document['Video'].Videos.VideoList);
            }
            return !ValidatorObject.objectIsEmpty(model) ? model : undefined;
        } catch (error) {
            this.logger.log('error', `${error}`, 'parseUserData');
            return undefined;
        }
    }

    private static buildConversations<K extends {Date: string, From: string, Content: string}, T extends Record<string, K[]>>(list: T): ConversationsTK | undefined {
        const model: ConversationsTK = {
            list: Object.keys(list).map((key: string) => {
                const match = key.match(/^Chat History with (.+):$/)
                return {
                    withUser: (match && match[1]) ? match[1] : key,
                    messages: (list[key].map((message: K) => {
                        return {date: new Date(message.Date), content:message.Content, from:message.From}
                    }))
                }
            })
        };
        return (model.list.length > 0) ? model : undefined;
    }

    private static buildYourVideoModel<T extends { Date: string, Link: string, Likes: string }>(list: T[]): YourVideoListTK | undefined {
        const model: YourVideoListTK = {
            list: list.map((video: T) => {
                return {
                    date: new Date(video.Date),
                    link: video.Link,
                    likes: parseInt(video.Likes)
                };
            })
        };
        return (model.list.length > 0) ? model : undefined;
    }

    private static buildCommentsModel<T extends { Date: string, Comment: string }>(list: T[]): CommentsTK | undefined {
        const model: CommentsTK = {
            list: list.map((comment: T) => {
                return {
                    date: new Date(comment.Date),
                    comment: comment.Comment
                };
            })
        };
        return (model.list.length > 0) ? model : undefined;
    }

    private static buildSoundsModel<T extends { Date: string, Link: string }>(list: T[]): FavoriteSoundsTK | undefined {
        const model: FavoriteSoundsTK = {
            list: list.map((sound: T) => {
                return {
                    date: new Date(sound.Date),
                    link: sound.Link
                };
            })
        };
        return (model.list.length > 0) ? model : undefined;
    }

    private static buildEffectsModel<T extends { Date: string, EffectLink: string }>(list: T[]): FavoriteEffectsTK | undefined {
        const model: FavoriteEffectsTK = {
            list: list.map((effect: T) => {
                return {
                    date: new Date(effect.Date),
                    effectLink: effect.EffectLink
                };
            })
        };
        return (model.list.length > 0) ? model : undefined;
    }

    private static buildFollowModel<T extends { Date: string, UserName: string }>(list: T[]): FollowListTK | undefined {
        const model: FollowListTK = {
            list: list.map((follow: T) => {
                return {
                    date: new Date(follow.Date),
                    username: follow.UserName
                };
            })
        };
        return (model.list.length > 0) ? model : undefined;
    }

    private static buildProfileModel(profile: any): ProfileTK | undefined {
        const model: ProfileTK = {};
        if (profile && profile['Profile Information'] && profile['Profile Information'].ProfileMap) {
            const profileMap = profile['Profile Information'].ProfileMap;
            if (profileMap.PlatformInfo && profileMap.PlatformInfo[0]) {
                (profileMap.PlatformInfo[0].Description) && (model.description = profileMap.PlatformInfo[0].Description);
                (profileMap.PlatformInfo[0].Name) && (model.name = profileMap.PlatformInfo[0].Name);
                (profileMap.PlatformInfo[0].Platform) && (model.platform = profileMap.PlatformInfo[0].Platform);
                (profileMap.PlatformInfo[0]['Profile Photo']) && (model.profilePhoto = profileMap.PlatformInfo[0]['Profile Photo']);
            }
            (profileMap.bioDescription) && (model.bioDescription = profileMap.bioDescription);
            if (profileMap.birthDate) {
                const match = profileMap.birthDate.match(/(\d+)-(\w+)-(\d+)/);
                const monthIndex = Months[match[2].toUpperCase()];
                model.birthDate = new Date(Date.UTC(parseInt(match[3]), parseInt(monthIndex) - 1, parseInt(match[1])));
            }
            (profileMap.emailAddress && profileMap.emailAddress!=="None") && (model.emailAddress = profileMap.emailAddress);
            (profileMap.likesReceived && profileMap.likesReceived!=="None") && (model.likesReceived = profileMap.likesReceived);
            (profileMap.profilePhoto && profileMap.profilePhoto!=="None") && (model.profilePhoto = profileMap.profilePhoto);
            (profileMap.profileVideo && profileMap.profileVideo!=="None") && (model.profileVideo = profileMap.profileVideo);
            (profileMap.telephoneNumber && profileMap.telephoneNumber!=="None") && (model.telephoneNumber = profileMap.telephoneNumber);
            (profileMap.userName && profileMap.userName!=="None") && (model.userName = profileMap.userName);
        }
        return !ValidatorObject.objectIsEmpty(model) ? model : undefined;
    }

    private static buildVideoLikedModel<T extends { Date: string, VideoLink: string }>(list: T[]): VideoLikedListTK | undefined {
        const model: VideoLikedListTK = {
            list: list.map((like: T) => {
                return {
                    date: new Date(like.Date),
                    videoLink: like.VideoLink
                };
            })
        };
        return (model.list.length > 0) ? model : undefined;
    }

    private static buildSearchHistoryModel<T extends { Date: string, SearchTerm: string }>(list: T[]): SearchHistoryTK | undefined {
        const model: SearchHistoryTK = {
            list: <SearchTK[]>(list.map((search: T) => {
                if (search.SearchTerm !== "") {
                    return {
                        date: new Date(search.Date),
                        searchTerm: search.SearchTerm
                    };
                }
            }).filter(item => item))
        };
        return (model.list.length > 0) ? model : undefined;
    }

    private static buildVideoBrowsingHistoryModel<T extends { Date: string, VideoLink: string }>(list: T[]): VideoBrowsingHistoryTK | undefined {
        const model: VideoBrowsingHistoryTK = {
            list: list.map((like: T) => {
                return {
                    date: new Date(like.Date),
                    videoLink: like.VideoLink
                };
            })
        };
        return (model.list.length > 0) ? model : undefined;
    }

    private static buildVideoFavouriteModel<T extends { Date: string, Link: string }>(list: T[]): ShareHistoryTK | undefined {
        const model: ShareHistoryTK = {
            list: list.map((share: T) => {
                return {
                    date: new Date(share.Date),
                    link: share.Link
                };
            })
        };
        return (model.list.length > 0) ? model : undefined;
    }

    private static buildLoginsModel(list: any[]): LoginHistoryTK | undefined {
        const model: LoginHistoryTK = {
            list: list.map((login: any) => {
                return {
                    date: new Date(login.Date),
                    IP: login.IP,
                    deviceModel: login.DeviceModel,
                    deviceSystem: login.DeviceSystem,
                    networkType: login.NetworkType,
                    carrier: login.Carrier
                };
            })
        };
        return (model.list.length > 0) ? model : undefined;
    }

    private static buildStatusListModel(list: any[]): StatusListTK | undefined {
        const model: StatusListTK = {
            list: list.map((status: any) => {
                return {
                    resolution: ValidatorObject.isCSVFieldValid(status.Resolution) ? status.Resolution : undefined,
                    appVersion: ValidatorObject.isCSVFieldValid(status["App Version"]) ? status["App Version"] : undefined,
                    IDFA: ValidatorObject.isCSVFieldValid(status.IDFA) ? status.IDFA : undefined,
                    GAID: ValidatorObject.isCSVFieldValid(status.GAID) ? status.GAID : undefined,
                    androidID: ValidatorObject.isCSVFieldValid(status["Android ID"]) ? status["Android ID"] : undefined,
                    IDFV: ValidatorObject.isCSVFieldValid(status.IDFV) ? status.IDFV : undefined,
                    webID: ValidatorObject.isCSVFieldValid(status["Web ID"]) ? status["Web ID"] : undefined
                };
            })
        };
        return (model.list.length > 0) ? model : undefined;
    }

    private static buildShareHistoryModel(list: any[]): ShareHistoryTK | undefined {
        const model: ShareHistoryTK = {
            list: list.map((share: any) => {
                return {
                    date: new Date(share.Date),
                    sharedContent: share.SharedContent,
                    link: share.Link,
                    method: share.Method,
                };
            })
        };
        return (model.list.length > 0) ? model : undefined;
    }
}
