export enum DataSourceCode {
    INSTAGRAM = 'INSTAGRAM',
    FACEBOOK = 'FACEBOOK',
    GOOGLE = 'GOOGLE',
    NETFLIX = 'NETFLIX',
    AMAZON = 'AMAZON',
    LINKEDIN = 'LINKEDIN'
}

export enum RetrievingProcedureType {
    DEFAULT = 'DEFAULT',
    DESKTOP = 'DESKTOP',
    MOBILE = 'MOBILE'
}

export enum FileExtension {
    ZIP = 'zip',
    TGZ = 'tgz',
    JSON = 'json',
    CSV = 'csv',
    XML = 'xml',
    TXT = 'txt',
    HTML = 'html'
}

export enum LanguageCode {
    ENGLISH = 'EN',
    ITALIAN = 'IT',
    SPANISH = 'ES',
    FRENCH = 'FR',
    GERMAN = 'DE',
    HINDI = 'HI'
}

export enum FileCode {
    INSTAGRAM_PERSONAL_INFO = 'account_information/personal_information.json',
    INSTAGRAM_ACCOUNT_BASED_IN = 'information_about_you/account_based_in.json',
    INSTAGRAM_ADS_CLICKED = 'ads_and_content/ads_clicked.json',
    INSTAGRAM_ADS_VIEWED = 'ads_and_content/ads_viewed.json',
    INSTAGRAM_ADS_INTERESTS = 'ads_and_content/ads_interests.json',
    INSTAGRAM_MUSIC_HEARD_HISTORY = 'ads_and_content/music_heard_in_stories.json',
    INSTAGRAM_MUSIC_USED_HISTORY ='ads_and_content/music_recently_used_in_stories.json',
    INSTAGRAM_POSTS_VIEWED = 'ads_and_content/posts_viewed.json',
    INSTAGRAM_VIDEO_VIEWED = 'ads_and_content/videos_watched.json',
    INSTAGRAM_ACCOUNT_VIEWED = 'ads_and_content/suggested_accounts_viewed.json',
    INSTAGRAM_ACCOUNT_NOT_INTERESTED = 'ads_and_content/accounts_you\'re_not_interested_in.json',
    INSTAGRAM_POST_COMMENT = 'comments/post_comments.json',
    INSTAGRAM_SYNCED_CONTACTS = 'contacts/synced_contacts.json',
    INSTAGRAM_POSTS_ARCHIVED = 'content/archived_posts.json',
    INSTAGRAM_POSTS_CREATED = 'content/posts_1.json',
    INSTAGRAM_STORIES_CREATED = 'content/stories.json',
    INSTAGRAM_FOLLOWERS = 'followers_and_following/followers.json',
    INSTAGRAM_FOLLOWING_ACCOUNTS = 'followers_and_following/following.json',
    INSTAGRAM_FOLLOWING_HASHTAGS = 'followers_and_following/following_hashtags.json',
    INSTAGRAM_LIKE_COMMENTS = 'likes/liked_comments.json',
    INSTAGRAM_LIKE_POSTS = 'likes/liked_posts.json',
    INSTAGRAM_ACCOUNT_SEARCHES = 'recent_search/account_searches.json',
    INSTAGRAM_YOUR_REEL_SENTIMENTS = 'your_topics/your_reels_sentiments.json',
    INSTAGRAM_YOUR_REEL_TOPICS = 'your_topics/your_reels_topics.json',
    INSTAGRAM_YOUR_TOPICS = 'your_topics/your_topics.json',
    INSTAGRAM_ELEGIBILITY = 'monetization/eligibility.json',
    INSTAGRAM_EMOJI_SLIDERS = 'story_sticker_interactions/emoji_sliders.json',
    INSTAGRAM_POLLS = 'story_sticker_interactions/polls.json',
    INSTAGRAM_QUIZZES = 'story_sticker_interactions/quizzes.json',
    INSTAGRAM_CONVERSATION = `messages/inbox/{chat_directory_name}/message_1.json`,

    FACEBOOK_PROFILE_INFO = 'profile_information/profile_information.json',
    FACEBOOK_ADS_INTERACTED_WITH = 'ads_information/advertisers_you\'ve_interacted_with.json',
    FACEBOOK_ADS_USING_YOUR_ACTIVITY = 'ads_information/advertisers_using_your_activity_or_information.json',
    FACEBOOK_SEARCH_HISTORY = 'search/your_search_history.json',
    FACEBOOK_APP_WEBSITES = 'apps_and_websites_off_of_facebook/apps_and_websites.json',
    FACEBOOK_COMMENTS = 'comments_and_reactions/comments.json',
    FACEBOOK_REACTIONS = 'comments_and_reactions/posts_and_comments.json',
    FACEBOOK_PAGES_FOLLOWED = 'pages/pages_you_follow.json',
    FACEBOOK_PAGES_LIKED = 'pages/pages_you’ve_liked.json',
    FACEBOOK_PAGES_RACCOMENDED = 'pages/pages_you’ve_recommended.json',
    FACEBOOK_LANGUAGE = 'preferences/language_and_locale.json',
    FACEBOOK_RECENTLY_VIEWED = 'your_interactions_on_facebook/recently_viewed.json',
    FACEBOOK_YOUR_POSTS = 'posts/your_posts_1.json',
    FACEBOOK_FRIEND_REQUESTS_SENT = 'friends_and_followers/friend_requests_sent.json',
    FACEBOOK_REJECTED_FRIEND_REQUESTS = 'friends_and_followers/rejected_friend_requests.json',
    FACEBOOK_REMOVED_FRIENDS = 'friends_and_followers/removed_friends.json',
    FACEBOOK_WHO_YOU_FOLLOW = 'friends_and_followers/who_you_follow.json',
    FACEBOOK_CONVERSATION = `messages/inbox/{chat_directory_name}/message_1.json`,
}
