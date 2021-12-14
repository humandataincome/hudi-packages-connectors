
export interface PersonalInformation {
    username?: string;
    name?: string;
    email?: string;
    private?: boolean;
    birthdate?: DateLongFormat;
    phoneNumber?: string;
    biography? :string;
    gender?: string;
}

export interface LocationInformation {
    basedIn?:string;
}

export interface AdsInformation {
    listAdsClicked?: Array<string>;
    listAdsViewed?: Array<string>;
    listAdsInterests?: Array<string>;
}

export interface ContentInformation {
    music_heard_in_stories?: Array<Song>;
    music_recently_used_in_stories?: Array<Song>;
    posts_viewed?: Array<string>;
    videos_watched?: Array<string>;
    suggested_accounts_viewed?: Array<string>;
    account_you_are_not_interested?: Array<string>;
}

export interface CommentsPosted {
    listCommentsPosted: Array<CommentPosted>;
}

export interface SyncedContracts {
    listContactSynced: Array<ContactSynced>;
}

export interface PersonalPosts {
    listArchivedPosts?: Array<Post>;
    listPost?: Array<Post>;
}

export interface Followers {
    listAccounts?: Array<Account>;
}

export interface Following {
    listAccounts?: Array<Account>;
    listHashtags?: Array<Account>;
}

export interface LikedList {
    listLikedPosts?: Array<Like>;
    listLikedComments?: Array<Like>;
}

export interface Searches {
    listSearches?: Array<Search>;
}

export interface Topics {
    listReelSentiments?: Array<string>;
    listReelTopics?: Array<string>;
    listTopic?: Array<string>;
}
 export interface Conversations {
    listInbox?: Array<Conversation>;
 }

//---------------------------------------
export interface Account {
    href: string;
    value: string;
    timestamp?: Date;
}

export interface Post {
    uri: string;
    title: string;
    creation_timestamp: Date;
}

export interface ContactSynced {
    firstName?: string;
    secondName?: string;
    contactInfo?: string;
}

export interface CommentPosted {
    text: string;
    toUser: string;
    timestamp: Date;
}

export interface Like {
    title: string;
    href: string;
    timestamp: Date;
}

export interface Search {
    value: string;
    timestamp: Date;
}

export interface Conversation {
    title: string;
    listMessages: Array<Message>;
    participants: Array<string>;
    is_still_participant: boolean;
}

export interface Message {
    sender_name: string;
    timestamp_ms: Date;
    content: string;
    link?: string;
    type: string;
    is_unsent: boolean;
}

export interface DateLongFormat {
    year: number;
    month: number;
    day: number;
}

export interface Song {
    title: string;
    artist: string;
    timestamp: Date;
}