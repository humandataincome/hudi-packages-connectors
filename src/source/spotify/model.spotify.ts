export interface SpotifyDataAggregator {
    follow?: FollowSP;
    identifiers?: IdentifiersSP;
    payments?: PaymentsSP;
    playlists?: PlaylistsSP;
    streamingHistory?: StreamingHistorySP;
    userData?: UserdataSP;
    creationDate?: Date;
}

export interface FollowSP {
    followerCount?: number;
    followingUsersCount?: number;
    dismissingUsersCount?: number;
}

export interface IdentifiersSP {
    identifierType?: string;
    identifierValue?: string;
}

export interface PaymentsSP {
    list: PaymentSP[];
}

export interface PaymentSP {

}

export interface PlaylistsSP {
    list: PlaylistSP[];
}

export interface PlaylistSP {
    name?: string;
    lastModifiedDate?: Date;
    items?: ItemSP[];
    description?: string;
    numberOfFollowers?: number;
}

export interface ItemSP {
    track?: TrackSP;
    episode?: string;
    localTrack?: string;
    addedDate?: Date;
}

export interface TrackSP {
    trackName?: string;
    artistName?: string;
    albumName?: string;
    trackUri?: string;
}

export interface StreamingHistorySP {
    list: StreamingSP[];
}

export interface StreamingSP {
    endTime?: Date;
    artistName?: string;
    trackName?: string;
    msPlayed?: number;
}

export interface UserdataSP {
    username?: string;
    email?: string;
    country?: string;
    createdFromFacebook?: boolean;
    facebookUid?: string;
    birthdate?: Date;
    gender?: string;
    postalCode?: string;
    mobileNumber?: string;
    mobileOperator?: string;
    mobileBrand?: string;
    creationTime?: Date;
}
