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
    JSON = 'json',
    CSV = 'csv',
    XML = 'xml',
    TXT = 'txt',
    HTML = 'html',
    PDF = 'pdf',
    JPG = 'jpg',
    PNG = 'png',
    GIF = 'gif',
    VCF = 'vcf',
    EML = 'eml',
}

export enum LanguageCode {
    ENGLISH = 'EN',
    ITALIAN = 'IT',
    SPANISH = 'ES',
    HINDI = 'HI',
    FRENCH = 'FR',
    GERMAN = 'DE',
    CHINESE_SIMPLIFIED = 'ZH-CN',
    ARABIC = 'AR',
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
    INSTAGRAM_CONVERSATION = `(\\.*)/message_1.json`,

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
    FACEBOOK_FRIENDS = 'friends_and_followers/friends.json',
    FACEBOOK_FRIEND_REQUESTS_SENT = 'friends_and_followers/friend_requests_sent.json',
    FACEBOOK_REJECTED_FRIEND_REQUESTS = 'friends_and_followers/rejected_friend_requests.json',
    FACEBOOK_REMOVED_FRIENDS = 'friends_and_followers/removed_friends.json',
    FACEBOOK_WHO_YOU_FOLLOW = 'friends_and_followers/who_you_follow.json',
    FACEBOOK_CONVERSATION = `(\\.*)/message_1.json`,

    AMAZON_AUDIBLE_LISTENING = 'Audible.Listening/Audible.Listening.csv',
    AMAZON_AUDIBLE_LIBRARY = 'Audible.Library/Audible.Library.csv',
    AMAZON_AUDIBLE_MEMBERSHIP_BILLINGS = 'Audible.MembershipBillings/Audible.MembershipBillings.csv',
    AMAZON_AUDIBLE_MEMBERSHIP_EVENT = 'Audible.MembershipEvent/Audible.MembershipEvent.csv',
    AMAZON_ADV_THIRDPARTIES = 'Advertising.(\\d+)/Advertising.3PAudiences.csv',
    AMAZON_AUDIENCES = 'Advertising.(\\d+)/Advertising.AmazonAudiences.csv',
    AMAZON_ADV_AUDIENCES = 'Advertising.(\\d+)/Advertising.AdvertiserAudiences.csv',
    AMAZON_ADV_CLICKS = 'Advertising.(\\d+)/Advertising.AdvertiserClicks.csv',
    AMAZON_WISHLIST = 'Amazon.Lists.Wishlist.2.1/Amazon.Lists.Wishlist.json',
    AMAZON_TWITCHPRIME_SUB_HISTORY = 'AmazonGames/AmazonGames.TwitchPrime.SubscriptionCreditHistory.csv',
    AMAZON_PRIMEVIDEO_VIEW_COUNT = 'Digital.PrimeVideo.ViewCounts.2/Digital.PrimeVideo.ViewCounts.2.csv',
    AMAZON_PRIMEVIDEO_VIEWING_HISTORY = 'Digital.PrimeVideo.Viewinghistory/Digital.PrimeVideo.Viewinghistory.csv',
    AMAZON_PRIMEVIDEO_WATCHLIST_HISTORY = 'Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.WatchlistHistory.csv',
    AMAZON_PRIMEVIDEO_WATCHLIST = 'Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.Watchlist.csv',
    AMAZON_DIGITAL_SUBSCRIPTION = 'Digital.Subscriptions/Subscriptions.csv',
    AMAZON_RETAIL_LIGHT_WEIGHT_INTERACTIONS = 'LightWeightInteractions/LightWeightInteractions.csv',
    AMAZON_RETAIL_ORDER_HISTORY = 'Retail.OrderHistory.2/Retail.OrderHistory.2.csv',
    AMAZON_RETAIL_SELLER_FEEDBACK = 'Retail.Seller-Feedback.2/Retail.Seller-Feedback.csv',
    AMAZON_CUSTOMER_ENGAGEMENT = 'Search-Data/Search-Data.Customer-Engagement.csv',
    AMAZON_RETAIL_REGION_AUTHORITY = 'Retail.RegionAuthority.2/Retail.RegionAuthority.2.csv',








}
