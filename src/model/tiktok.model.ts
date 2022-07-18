export interface UserDataTK {
    favoriteEffects?: FavoriteEffectsTK;
    favoriteHashtags?: FavoriteHashtagsTK;
    favoriteSounds?: FavoriteSoundsTK;
    favoriteVideos?: FavoriteVideosTK;
    followerList?: FollowerListTK;
    followingList?: FollowingListTK;
    hashtags?: HashtagsTK;
    likes?: LikeListTK;
    logins?: LoginHistoryTK;
    shareHistory?: ShareHistoryTK;
    statusList?: StatusListTK;
    videoBrowsingHistory?: VideoBrowsingHistoryTK;
    adsAndData?: AdsAndDataTK;
    appSettings?: AppSettingsTK;
    comments?: CommentsTK;
    directMessages?: DirectMessagesTK;
    profile?: ProfileTK;
    lives?: TiktokLiveTK;
    tiktokShopping?: TiktokShoppingTK;
    videos?: VideosTK;
}

export interface FavoriteEffectsTK {

}

export interface FavoriteHashtagsTK {

}

export interface FavoriteSoundsTK {

}

export interface FavoriteVideosTK {
    favouriteVideosList: FavoriteVideoTK[];
}

export interface FollowerListTK {
    followers: FollowerTK[];
}

export interface FollowingListTK {
    followingList: FollowingTK[];
}

export interface HashtagsTK {

}

export interface LikeListTK {
    likes: VideoTK[];
}

export interface LoginHistoryTK {
    logins: LoginTK[];
}

export interface ShareHistoryTK {
    shareList: ShareTK[];
}

export interface StatusListTK {
    statusList: StatusTK[];
}

export interface VideoBrowsingHistoryTK {
    videoList: VideoTK[];
}

export interface AdsAndDataTK {
    adInterests: AdInterestsTK[];
    adsBasedOnData: AdsBasedOnDataTK[];
    usageDataFrom3PartyApps: UsageDataFrom3PartyAppsTK[];
}

export interface AppSettingsTK {
    blocks: BlocksTK;
    settings: SettingsTK;
}

export interface CommentsTK {
    commentsList: CommentTK[];
}

export interface DirectMessagesTK {
    chatHistory: DirectMessageTK[];
}

export interface ProfileTK {
    name?: string;
    description?: string;
    platform?: string;
    bioDescription: string;
    birthDate: Date;
    emailAddress: string;
    likesReceived: string;
    profilePhoto: string;
    profileVideo: string;
    telephoneNumber: string;
    userName: string;
}

export interface TiktokLiveTK {
    goLiveHistory?: GoLiveHistoryTK;
    goLiveSettings?: GoLiveSettingsTK;
    watchLiveHistory?: WatchLiveHistoryTK;
    watchLiveSettings?: WatchLiveSettingsTK;
    mostRecentModificationTimeInApp?: Date;
    mostRecentModificationTimeInWeb?: Date;
}

export interface TiktokShoppingTK {
    communicationHistory?: CommunicationHistoryTK;
    currentPaymentInfo?: CurrentPaymentInformationTK;
    customerSupportHistory?: CustomerSupportHistoryTK;
    orderDisputeHistory?: OrderDisputeHistoryTK;
    orderHistory?: OrderHistoryTK;
    productBrowsingHistory?: ProductBrowsingHistoryTK;
    productReviewHistory?: ProductReviewHistoryTK;
    returnRefundHistory?: ReturnRefundHistoryTK;
    savedAddressInformation?: SavedAddressInformationTK;
    shoppingCartList?: ShoppingCartListTK;
    vouchers?: VouchersTK;
}

export interface VideosTK {

}

//---------------------------------------------------
export interface FavoriteVideoTK {
    date?: Date;
    link?: string;
}

export interface FollowerTK {
    date?: Date;
    username?: string;
}

export interface FollowingTK {
    date?: Date;
    link?: string;
}

export interface VideoTK {
    date?: Date;
    videoLink?: string;
}

export interface LoginTK {
    date?: Date;
    IP?: string;
    deviceModel?: string;
    deviceSystem?: string;
    networkType?: string;
    carrier?: string;
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

export interface AdInterestsTK {}
export interface AdsBasedOnDataTK {}
export interface UsageDataFrom3PartyAppsTK {}

export interface BlocksTK {}
export interface SettingsTK {}

export interface CommentTK {}
export interface DirectMessageTK{}

export interface GoLiveHistoryTK {}
export interface GoLiveSettingsTK {}
export interface WatchLiveHistoryTK {}
export interface WatchLiveSettingsTK {}

export interface CommunicationHistoryTK {}
export interface CurrentPaymentInformationTK {}
export interface CustomerSupportHistoryTK {}
export interface OrderDisputeHistoryTK {}
export interface OrderHistoryTK {}
export interface ProductBrowsingHistoryTK {}
export interface ProductReviewHistoryTK {}
export interface ReturnRefundHistoryTK {}
export interface SavedAddressInformationTK {}
export interface ShoppingCartListTK {}
export interface VouchersTK {}
