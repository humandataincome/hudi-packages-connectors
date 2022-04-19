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

export type FileCode = FileCodeInstagram | FileCodeFacebook | FileCodeAmazon | FileCodeGoogle;

export enum FileCodeInstagram {
    PERSONAL_INFO = 'account_information/personal_information.json',
    ACCOUNT_BASED_IN = 'information_about_you/account_based_in.json',
    ADS_CLICKED = 'ads_and_content/ads_clicked.json',
    ADS_VIEWED = 'ads_and_content/ads_viewed.json',
    ADS_INTERESTS = 'information_about_you/ads_interests.json',
    MUSIC_HEARD_HISTORY = 'ads_and_content/music_heard_in_stories.json',
    MUSIC_USED_HISTORY = 'ads_and_content/music_recently_used_in_stories.json',
    POSTS_VIEWED = 'ads_and_content/posts_viewed.json',
    VIDEO_VIEWED = 'ads_and_content/videos_watched.json',
    ACCOUNT_VIEWED = 'ads_and_content/suggested_accounts_viewed.json',
    ACCOUNT_NOT_INTERESTED = 'ads_and_content/accounts_you\'re_not_interested_in.json',
    POST_COMMENT = 'comments/post_comments.json',
    SYNCED_CONTACTS = 'contacts/synced_contacts.json',
    POSTS_ARCHIVED = 'content/archived_posts.json',
    POSTS_CREATED = 'content/posts_1.json',
    STORIES_CREATED = 'content/stories.json',
    FOLLOWERS = 'followers_and_following/followers.json',
    FOLLOWING_ACCOUNTS = 'followers_and_following/following.json',
    FOLLOWING_HASHTAGS = 'followers_and_following/following_hashtags.json',
    LIKE_COMMENTS = 'likes/liked_comments.json',
    LIKE_POSTS = 'likes/liked_posts.json',
    ACCOUNT_SEARCHES = 'recent_search/account_searches.json',
    YOUR_REEL_SENTIMENTS = 'your_topics/your_reels_sentiments.json',
    YOUR_REEL_TOPICS = 'your_topics/your_reels_topics.json',
    YOUR_TOPICS = 'your_topics/your_topics.json',
    ELIGIBILITY = 'monetization/eligibility.json',
    EMOJI_SLIDERS = 'story_sticker_interactions/emoji_sliders.json',
    POLLS = 'story_sticker_interactions/polls.json',
    QUIZZES = 'story_sticker_interactions/quizzes.json',
    CONVERSATION = `(\\.*)/message_1.json`,
}

export enum FileCodeFacebook {
    PROFILE_INFO = 'profile_information/profile_information.json',
    ADS_INTERACTED_WITH = 'ads_information/advertisers_you\'ve_interacted_with.json',
    ADS_USING_YOUR_ACTIVITY = 'ads_information/advertisers_using_your_activity_or_information.json',
    SEARCH_HISTORY = 'search/your_search_history.json',
    APP_WEBSITES = 'apps_and_websites_off_of_facebook/apps_and_websites.json',
    COMMENTS = 'comments_and_reactions/comments.json',
    REACTIONS = 'comments_and_reactions/posts_and_comments.json',
    PAGES_FOLLOWED = 'pages/pages_you_follow.json',
    PAGES_LIKED = 'pages/pages_you’ve_liked.json',
    PAGES_RECOMMENDED = 'pages/pages_you’ve_recommended.json',
    LANGUAGE = 'preferences/language_and_locale.json',
    RECENTLY_VIEWED = 'your_interactions_on_facebook/recently_viewed.json',
    YOUR_POSTS = 'posts/your_posts_1.json',
    FRIENDS = 'friends_and_followers/friends.json',
    FRIEND_REQUESTS_SENT = 'friends_and_followers/friend_requests_sent.json',
    REJECTED_FRIEND_REQUESTS = 'friends_and_followers/rejected_friend_requests.json',
    REMOVED_FRIENDS = 'friends_and_followers/removed_friends.json',
    WHO_YOU_FOLLOW = 'friends_and_followers/who_you_follow.json',
    CONVERSATION = `(\\.*)/message_1.json`,
}

export enum FileCodeAmazon {
    AUDIBLE_LISTENING = 'Audible.Listening/Audible.Listening.csv',
    AUDIBLE_LIBRARY = 'Audible.Library/Audible.Library.csv',
    AUDIBLE_MEMBERSHIP_BILLINGS = 'Audible.MembershipBillings/Audible.MembershipBillings.csv',
    AUDIBLE_MEMBERSHIP_EVENT = 'Audible.MembershipEvent/Audible.MembershipEvent.csv',
    ADV_THIRDPARTIES = 'Advertising.(\\d+)/Advertising.3PAudiences.csv',
    AUDIENCES = 'Advertising.(\\d+)/Advertising.AmazonAudiences.csv',
    ADV_AUDIENCES = 'Advertising.(\\d+)/Advertising.AdvertiserAudiences.csv',
    ADV_CLICKS = 'Advertising.(\\d+)/Advertising.AdvertiserClicks.csv',
    WISHLIST = 'Amazon.Lists.Wishlist.2.1/Amazon.Lists.Wishlist.json',
    TWITCHPRIME_SUB_HISTORY = 'AmazonGames/AmazonGames.TwitchPrime.SubscriptionCreditHistory.csv',
    PRIMEVIDEO_VIEW_COUNT = 'Digital.PrimeVideo.ViewCounts.2/Digital.PrimeVideo.ViewCounts.2.csv',
    PRIMEVIDEO_VIEWING_HISTORY = 'Digital.PrimeVideo.Viewinghistory/Digital.PrimeVideo.Viewinghistory.csv',
    PRIMEVIDEO_WATCHLIST_HISTORY = 'Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.WatchlistHistory.csv',
    PRIMEVIDEO_WATCHLIST = 'Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.Watchlist.csv',
    DIGITAL_SUBSCRIPTION = 'Digital.Subscriptions/Subscriptions.csv',
    RETAIL_LIGHT_WEIGHT_INTERACTIONS = 'LightWeightInteractions/LightWeightInteractions.csv',
    RETAIL_ORDER_HISTORY = 'Retail.OrderHistory.2/Retail.OrderHistory.2.csv',
    RETAIL_SELLER_FEEDBACK = 'Retail.Seller-Feedback.2/Retail.Seller-Feedback.csv',
    CUSTOMER_ENGAGEMENT = 'Search-Data/Search-Data.Customer-Engagement.csv',
    RETAIL_REGION_AUTHORITY = 'Retail.RegionAuthority.2/Retail.RegionAuthority.2.csv',
}

export enum FileCodeGoogle {
    PROFILE = 'Profile/Profile.json',
    CHROME_BROWSER_HISTORY = 'Chrome/BrowserHistory.json',
    CHROME_EXTENSION = 'Chrome/Extensions.json',
    CHROME_SEARCH_ENGINES = 'Chrome/SearchEngines.json',
    YOUTUBE_LIKED_VIDEOS = 'playlists/Liked videos.csv',
    YOUTUBE_UPLOADS = 'playlists/Uploads from (\\.*).csv',
    PLAY_STORE_PURCHASE_HISTORY = 'Google Play Store/PurchaseHistory.json',
    PLAY_STORE_LIBRARY = 'Google Play Store/Library.json.json',
    PLAY_STORE_REVIEWS = 'Google Play Store/Reviews.json.json',

    ACTIVITY_ADS = 'Ads/My Activity.html',
    ACTIVITY_ASSISTANT = 'Assistant/My Activity.html',
    ACTIVITY_CHROME = 'Chrome/My Activity.html',
    ACTIVITY_DEVELOPERS = 'Developers/My Activity.html',
    ACTIVITY_DISCOVER = 'Discover/My Activity.html',
    ACTIVITY_DRIVE = 'Drive/My Activity.html',
    ACTIVITY_GMAIL = 'Gmail/My Activity.html',
    ACTIVITY_LENS = 'Google Lens/My Activity.html',
    ACTIVITY_NEWS = 'Google News/My Activity.html',
    ACTIVITY_PLAY_GAMES = 'Google Play Games/My Activity.html',
    ACTIVITY_PLAY_MOVIES = 'Google Play Movies _ TV/My Activity.html',
    ACTIVITY_PLAY_STORE = 'Google Play Store/My Activity.html',
    ACTIVITY_TRANSLATE = 'Google Translate/My Activity.html',
    ACTIVITY_HELP = 'Help/My Activity.html',
    ACTIVITY_IMAGE_SEARCH = 'Image Search/My Activity.html',
    ACTIVITY_MAPS = 'Maps/My Activity.html',
    ACTIVITY_SEARCH = 'Search/My Activity.html',
    ACTIVITY_SHOPPING = 'Shopping/My Activity.html',
    ACTIVITY_TAKEOUT = 'Takeout/My Activity.html',
    ACTIVITY_VIDEO_SEARCH = 'Video Search/My Activity.html',
    ACTIVITY_YOUTUBE = 'YouTube/My Activity.html',

    SEMANTIC_LOCATION_HISTORY = '(\\d{4})/(\\d{4})_((JANUARY)|(FEBRUARY)|(MARCH)|(APRIL)|(MAY)|(JUNE)|(JULY)|(AUGUST)|(SEPTEMBER)|(OCTOBER)|(NOVEMBER)|(DECEMBER)).json', //es. 2017/2017_MARCH.json
    SESSION = '(\\.+)(WALKING | RUNNING).json', //es. 2019-12-15T13_46_55+01_00_WALKING.json
    DAILY_ACTIVITIES = '(\\d+)-(\\d+)-(\\d+).csv', //es. 2020-01-13.csv
    ACCOUNT_INFO = 'Google Account/(\\.+)SubscriberInfo.html',
    MAPS_YOUR_PLACES_REVIEWS = 'Maps (your places)/Reviews.json'
}
