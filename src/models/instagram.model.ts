
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
    list: Array<Adv>;
}
export interface AdsViewed {
    list: Array<Adv>;
}
export interface AdsInterests {
    list: Array<Adv>;
}

export interface MusicHeardInStories {
    list: Array<Media>;
}

export interface MusicRecentlyUsedInStories {
    list: Array<Media>;
}

export interface PostViewed {
    list: Array<Post>;
}

export interface VideoWatched {
    list: Array<Media>;
}

export interface SuggestedAccountViewed {
    list: Array<Account>;
}

export interface AccountYouAreNotInterested {
    list: Array<Account>;
}

export interface CommentsPosted {
    list: Array<CommentPosted>;
}

export interface SyncedContracts {
    list: Array<ContactSynced>;
}

export interface ArchivedPosts {
    list: Array<Post>;
}

export interface PersonalPosts {
    list: Array<Post>;
}

export interface Followers {
    list: Array<Account>;
}

export interface FollowingAccounts {
    list: Array<Account>;
}

export interface FollowingHashtags {
    list: Array<Account>;
}

export interface LikedPosts {
    list: Array<Like>;
}

export interface LikedComments {
    list?: Array<Like>;
}

export interface Searches {
    list: Array<Search>;
}

export interface ReelSentiments {
    list: Array<Sentiment>;
}
export interface ReelTopics {
    list: Array<Topic>;
}

export interface Topics {
    list: Array<Topic>;
}

 export interface Conversations {
    listInbox?: Array<Conversation>;
 }

//---------------------------------------
export interface Account {
    href?: string;
    name?: string;
    date?: Date;
}

/*
 *  if it's a post crated then date is the creation date
 *  if it's other people's post then date is the viewing date and uri doesn't exist
 */
export interface Post {
    uri?: string;
    title?: string;
    date?: Date;
}

export interface ContactSynced {
    firstName?: string;
    secondName?: string;
    contactInfo?: string;
}

export interface CommentPosted {
    text?: string;
    toUser?: string;
    date?: Date;
}

export interface Like {
    title?: string;
    href?: string;
    emoticon?: string;
    date?: Date;
}

export interface Search {
    text?: string;
    date?: Date;
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

//Song or Video
export interface Media {
    title?: string;
    artist?: string;
    date?: Date;
}

export interface Adv {
    title?: string;
    date?: Date;
}

export interface Topic {
    value?: string;
}

export interface Sentiment {
    value?: string;
}
