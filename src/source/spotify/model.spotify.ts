/**
 * Aggregation of information from Spotify's models
 */
export interface SpotifyDataAggregator {
    follow?: FollowSP;
    identifiers?: IdentifiersSP;
    inferences?: InferencesSP;
    //payments?: PaymentsSP; //not parsed yet
    playlists?: PlaylistsSP;
    streamingHistory?: StreamingHistorySP;
    userData?: UserdataSP;
    yourLibrary?: YourLibrarySP;
    creationDate?: Date;
}

//FileCodeSpotify.FOLLOW model
export interface FollowSP {
    followerCount?: number;
    followingUsersCount?: number;
    dismissingUsersCount?: number;
}

//FileCodeSpotify.IDENTIFIERS model
export interface IdentifiersSP {
    identifierType?: string;
    identifierValue?: string;
}

//FileCodeSpotify.INFERENCES model
export interface InferencesSP {
    list: string[];
}

//FileCodeSpotify.PAYMENTS model
export interface PaymentsSP {
    list: PaymentSP[];
}

export interface PaymentSP {}

//FileCodeSpotify.PLAYLISTS model
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

//FileCodeSpotify.STREAMING_HISTORY model
export interface StreamingHistorySP {
    list: StreamingSP[];
}

export interface StreamingSP {
    endTime?: Date;
    artistName?: string;
    trackName?: string;
    msPlayed?: number;
}

//FileCodeSpotify.USERDATA model
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

//FileCodeSpotify.YOUR_LIBRARY model
export interface YourLibrarySP {
    list: TrackSP[];
}
