/**
 * Aggregation of information from TikTok's models
 */
export interface TiktokDataAggregator {
    userData: UserDataAggregatorTK;
    creationDate?: Date;
}

//subset of UserDataTK interface
export interface UserDataAggregatorTK {
    directMessages?: ConversationsTK;
    favoriteVideos?: FavoriteVideosTK;
    followersList?: FollowListTK;
    followingList?: FollowListTK;
    profile?: ProfileTK;
    searchHistory?: SearchHistoryTK;
    shareHistory?: ShareHistoryTK;
    videoLiked?: VideoLikedListTK;
    videoBrowsingHistory?: VideoBrowsingHistoryTK;
    yourVideo?: YourVideoListTK;
}

//FileCodeTikTok.USER_DATA model
export interface UserDataTK {
    comments?: CommentsTK;
    directMessages?: ConversationsTK;
    favoriteEffects?: FavoriteEffectsTK;
    favoriteSounds?: FavoriteSoundsTK;
    favoriteVideos?: FavoriteVideosTK;
    followersList?: FollowListTK;
    followingList?: FollowListTK;
    logins?: LoginHistoryTK;
    profile?: ProfileTK;
    searchHistory?: SearchHistoryTK;
    shareHistory?: ShareHistoryTK;
    statusList?: StatusListTK;
    videoBrowsingHistory?: VideoBrowsingHistoryTK;
    videoLiked?: VideoLikedListTK;
    yourVideo?: YourVideoListTK;
    //TODO: find the structure of Ads section in some datasource and build the model
}

export interface ConversationsTK {
    list: ConversationTK[];
}

export interface FavoriteEffectsTK {
    list: FavoriteEffectTK[];
}

export interface FavoriteSoundsTK {
    list: FavoriteSoundTK[];
}

export interface FavoriteVideosTK {
    list: FavoriteVideoTK[];
}

export interface FollowListTK {
    list: FollowTK[];
}

export interface VideoLikedListTK {
    list: VideoTK[];
}

export interface LoginHistoryTK {
    list: LoginTK[];
}

export interface SearchHistoryTK {
    list: SearchTK[];
}

export interface ShareHistoryTK {
    list: ShareTK[];
}

export interface StatusListTK {
    list: StatusTK[];
}

export interface VideoBrowsingHistoryTK {
    list: VideoTK[];
}

export interface CommentsTK {
    list: CommentTK[];
}

export interface ProfileTK {
    name?: string;
    description?: string;
    platform?: string;
    bioDescription?: string;
    birthDate?: Date;
    emailAddress?: string;
    likesReceived?: string;
    profilePhoto?: string;
    profileVideo?: string;
    telephoneNumber?: string;
    userName?: string;
}


export interface YourVideoListTK {
    list: YourVideoTK[];
}

//---------------------------------------------------
export interface ConversationTK {
    withUser: string;
    messages: DirectMessageTK[];
}

export interface DirectMessageTK {
    date?: Date;
    from?: string;
    content?: string;
}

export interface YourVideoTK {
    date?: Date;
    link?: string;
    likes?: number;
}

export interface FavoriteEffectTK {
    date?: Date;
    effectLink?: string;
}
export interface FavoriteSoundTK {
    date?: Date;
    link?: string;
}

export interface FavoriteVideoTK {
    date?: Date;
    link?: string;
}

export interface FollowTK {
    date: Date;
    username: string;
}

export interface VideoTK {
    date: Date;
    videoLink: string;
}

export interface LoginTK {
    date?: Date;
    IP?: string;
    deviceModel?: string;
    deviceSystem?: string;
    networkType?: string;
    carrier?: string;
}

export interface SearchTK {
    date: Date;
    searchTerm: string;
}

export interface ShareTK {
    date?: Date;
    sharedContent?: string;
    link?: string;
    method?: string;
}

export interface StatusTK {
    resolution?: string;
    appVersion?: string;
    IDFA?: string;
    GAID?: string;
    androidID?: string;
    IDFV?: string;
    webID?: string;
}

export interface CommentTK {
    date?: Date;
    comments?: string;
}

