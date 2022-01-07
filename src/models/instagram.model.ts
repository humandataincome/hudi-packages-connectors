
export interface PersonalInformation {
    username?: string;
    name?: string;
    email?: string;
    private?: boolean;
    birthdate?: Date;
    phoneNumber?: string;
    biography? :string;
    gender?: string;
}

export interface LocationInformation {
    basedIn?:string;
}

export interface AdsClicked {
    list?: Array<string>;
}
export interface AdsViewed {
    list?: Array<string>;
}
export interface AdsInterests {
    list?: Array<string>;
}

export interface MusicHeardInStories {
    list?: Array<Song>;
}

export interface MusicRecentlyUsedInStories {
    list?: Array<Song>;
}

export interface PostViewed {
    list?: Array<string>;
}

export interface VideoWatched {
    list?: Array<string>;
}

export interface SuggestedAccountViewed {
    list?: Array<string>;
}

export interface AccountYouAreNotInterested {
    list?: Array<string>;
}

export interface CommentsPosted {
    list: Array<CommentPosted>;
}

export interface SyncedContracts {
    list: Array<ContactSynced>;
}

export interface ArchivedPosts {
    listArchivedPosts?: Array<Post>;
}

export interface PersonalPosts {
    listPost?: Array<Post>;
}

export interface Followers {
    listAccounts?: Array<Account>;
}

export interface FollowingAccounts {
    list?: Array<Account>;
}

export interface FollowingHashtags {
    list?: Array<Account>;
}

export interface LikedPosts {
    list?: Array<Like>;
}

export interface LikedComments {
    list?: Array<Like>;
}

export interface Searches {
    list?: Array<Search>;
}

export interface ReelSentiments {
    list?: Array<string>;
}
export interface ReelTopics {
    list?: Array<string>;
}

export interface Topics {
    list?: Array<string>;
}

 export interface Conversations {
    listInbox: Array<Conversation>;
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
    title?: string;
    listMessages?: Array<Message>;
    participants?: Array<string>;
    isStillParticipant?: boolean;
}

export interface Message {
    senderName?: string;
    date?: Date;
    content?: string;
    link?: string;
    type?: string;
    isUnsent?: boolean;
}

export interface Song {
    title: string;
    artist: string;
    timestamp: Date;
}