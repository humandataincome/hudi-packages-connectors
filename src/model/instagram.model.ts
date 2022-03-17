
export interface PersonalInformationIG {
    username?: string;
    name?: string;
    email?: string;
    private?: boolean;
    birthdate?: Date;
    phoneNumber?: string;
    biography? :string;
    gender?: string;
}

export interface EligibilityIG {
    value?: string;
    decision?: string;
    reason?: string;
}

export interface LocationInformationIG {
    basedIn?:string;
}

export interface AdsClickedIG {
    list: Array<AdvIG>;
}

export interface AdsViewedIG {
    list: Array<AdvIG>;
}

export interface AdsInterestsIG {
    list: Array<AdvIG>;
}

export interface MusicHeardInStoriesIG {
    list: Array<MediaIG>;
}

export interface MusicRecentlyUsedInStoriesIG {
    list: Array<MediaIG>;
}

export interface PostViewedIG {
    list: Array<PostIG>;
}

export interface VideoWatchedIG {
    list: Array<MediaIG>;
}

export interface SuggestedAccountViewedIG {
    list: Array<AccountIG>;
}

export interface AccountYouAreNotInterestedIG {
    list: Array<AccountIG>;
}

export interface CommentsPostedIG {
    list: Array<CommentPostedIG>;
}

export interface SyncedContractsIG {
    list: Array<ContactSyncedIG>;
}

export interface ArchivedPostsIG {
    list: Array<PostIG>;
}

export interface PersonalPostsIG {
    list: Array<PostIG>;
}

export interface PersonalStoriesIG {
    list: Array<StoryIG>;
}

export interface FollowersIG {
    list: Array<AccountIG>;
}

export interface FollowingAccountsIG {
    list: Array<AccountIG>;
}

export interface FollowingHashtagsIG {
    list: Array<AccountIG>;
}

export interface LikedPostsIG {
    list: Array<LikeIG>;
}

export interface LikedCommentsIG {
    list: Array<LikeIG>;
}

export interface SearchesIG {
    list: Array<SearchIG>;
}

export interface ReelSentimentsIG {
    list: Array<SentimentIG>;
}
export interface ReelTopicsIG {
    list: Array<TopicIG>;
}

export interface TopicsIG {
    list: Array<TopicIG>;
}

export interface EmojiSlidersIG {
    list: Array<EmojiSliderIG>;
}

export interface PollsIG {
    list: Array<PollIG>;
}

export interface QuizzesIG {
    list: Array<QuizIG>;
}

 export interface ConversationsIG {
    listInbox?: Array<ConversationIG>;
 }

//---------------------------------------
export interface AccountIG {
    href?: string;
    name?: string;
    date?: Date;
}

/*
 *  if it's a post crated then date is the creation date
 *  if it's other people's post then date is the viewing date and uri doesn't exist
 */
export interface PostIG {
    uri?: string;
    title?: string;
    date?: Date;
}

export interface StoryIG {
    uri?: string;
    title?: string;
    date?: Date;
}

export interface ContactSyncedIG {
    firstName?: string;
    secondName?: string;
    contactInfo?: string;
}

export interface CommentPostedIG {
    text?: string;
    toUser?: string;
    date?: Date;
}

export interface LikeIG {
    title?: string;
    href?: string;
    emoticon?: string;
    date?: Date;
}

export interface SearchIG {
    text?: string;
    date?: Date;
}

export interface ConversationIG {
    title?: string;
    listMessages?: Array<MessageIG>;
    participants?: Array<string>;
    isStillParticipant?: boolean;
}

export interface MessageIG {
    senderName?: string;
    date?: Date;
    content?: string;
    link?: string;
    type?: string;
    isUnsent?: boolean;
}

//Song or Video
export interface MediaIG {
    title?: string;
    artist?: string;
    date?: Date;
}

export interface AdvIG {
    title?: string;
    date?: Date;
}

export interface TopicIG {
    value?: string;
}

export interface EmojiSliderIG {
    title?: string;
    date?: Date;
}

export interface PollIG {
    title?: string;
    date?: Date;
}

export interface QuizIG {
    title?: string;
    date?: Date;
}

export interface SentimentIG {
    value?: string;
}
