
export enum DataSourceCode {
    INSTAGRAM = 'INSTAGRAM',
    FACEBOOK = 'FACEBOOK',
    GOOGLE = 'GOOGLE',
    NETFLIX = 'NETFLIX',
    AMAZON = 'AMAZON',
    LINKEDIN = 'LINKEDIN',
    SHOPIFY_CUSTOMERS = 'SHOPIFY_CUSTOMERS',
    SHOPIFY_ORDERS = 'SHOPIFY_ORDERS',
    SHOPIFY_PRODUCTS = 'SHOPIFY_PRODUCTS',
    SHOPIFY_DISCOUNTS = 'SHOPIFY_DISCOUNTS',
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
    TXT = 'txt',
    HTML = 'html',
    PDF = 'pdf',
    EML = 'eml',
    ICS = 'ics',
    TCX = 'tcx',
    MBOX = 'mbox',
    XML = 'xml',
    JPG = 'jpg',
    PNG = 'png',
    GIF = 'gif',
    VCF = 'vcf',
    MP4 = 'mp4',
    JS = 'js',
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

export type FileCode = FileCodeInstagram | FileCodeFacebook | FileCodeAmazon | FileCodeGoogle | FileCodeLinkedIn | FileCodeNetflix | FileCodeShopify;

export enum FileCodeInstagram {
    PERSONAL_INFO = 'account_information/personal_information.json',
    ACCOUNT_NOT_INTERESTED = 'ads_and_content/accounts_you\'re_not_interested_in.json',
    ADS_CLICKED = 'ads_and_content/ads_clicked.json',
    ADS_USING_YOUR_INFO = 'ads_and_businesses/advertisers_using_your_activity_or_information.json',
    ADS_VIEWED = 'ads_and_content/ads_viewed.json',
    POSTS_VIEWED = 'ads_and_content/posts_viewed.json',
    ACCOUNT_VIEWED = 'ads_and_content/suggested_accounts_viewed.json',
    VIDEO_VIEWED = 'ads_and_content/videos_watched.json',
    AUTOFILL_INFO = 'autofill_information/autofill_information.json',
    POST_COMMENT = 'comments/post_comments.json',
    SYNCED_CONTACTS = 'contacts/synced_contacts.json',
    POSTS_ARCHIVED = 'content/archived_posts.json',
    POSTS_CREATED = 'content/posts_(\\d+).json',
    STORIES_CREATED = 'content/stories.json',
    FOLLOWERS = 'followers_and_following/followers.json',
    FOLLOWING_ACCOUNTS = 'followers_and_following/following.json',
    FOLLOWING_HASHTAGS = 'followers_and_following/following_hashtags.json',
    INFO_ADS_INTERESTS = 'information_about_you/ads_interests.json',
    INFO_ACCOUNT_BASED_IN = 'information_about_you/account_based_in.json',
    LIKE_COMMENTS = 'likes/liked_comments.json',
    LIKE_POSTS = 'likes/liked_posts.json',
    MESSAGE_REQUESTS = `messages/message_requests/(.*)/message_1.json`,
    MESSAGE_CONVERSATION = `messages/inbox/(.*)/message_1.json`,
    ELIGIBILITY = 'monetization/eligibility.json',
    ACCOUNT_SEARCHES = 'recent_searches/account_searches.json',
    EMOJI_SLIDERS = 'story_sticker_interactions/emoji_sliders.json',
    POLLS = 'story_sticker_interactions/polls.json',
    QUIZZES = 'story_sticker_interactions/quizzes.json',
    SHOPPING_VIEWED_ITEMS = 'shopping/recently_viewed_items.json',
    YOUR_REEL_SENTIMENTS = 'your_topics/your_reels_sentiments.json',
    YOUR_REEL_TOPICS = 'your_topics/your_reels_topics.json',
    YOUR_TOPICS = 'your_topics/your_topics.json',
    //outdated
    MUSIC_HEARD_HISTORY = 'ads_and_content/music_heard_in_stories.json',
    MUSIC_USED_HISTORY = 'ads_and_content/music_recently_used_in_stories.json',
    //not parsed yet
    APPS_EXPIRED = 'apps_and_websites/expired_pps.json',
    ACCOUNT_INFO = 'account_information/account_information.json',
    PROFESSIONAL_INFO = 'account_information/professional_information.json',
    PROFILE_CHANGES = 'account_information/profile_changes.json',
    COMMENTS_ALLOWED = 'comments_settings/comments_allowed_from.json',
    CROSS_APP_MESSAGING = 'comments_settings/use_cross-app_messaging.json',
    PROFILE_PHOTOS = 'content/profile_photos.json',
    DEVICE_INFO = 'device_information/camera_information.json',
    DEVICES = 'device_information/devices.json',
    BLOCKED_ACCOUNTS = 'followers_and_following/blocked_accounts.json',
    PENDING_FOLLOW_REQUESTS = 'followers_and_following/pending_follow_requests.json',
    RECENT_FOLLOW_REQUESTS = 'followers_and_following/recent_follow_requests.json',
    RECENT_UNFOLLOWED_ACCOUNTS = 'followers_and_following/recently_unfollowed_accounts.json',
    REMOVED_SUGGESTIONS = 'followers_and_following/removed_suggestions.json',
    INFO_POSSIBLE_PHONE = 'information_about_you/possible_phone_numbers.json',
    SECRET_GROUPS = 'messages/secret_groups.json',
    SECRET_CONVERSATIONS = 'messages/secret_conversations.json',
    LOGIN_SIGNUP_INFO = 'login_and_account_creation/signup_information.json',
    LOGIN_LOGOUT_ACTIVITY = 'login_and_account_creation/logout_activity.json',
    LOGIN_LOGIN_ACTIVITY = 'login_and_account_creation/login_activity.json',
    LOGIN_PRIVACY_CHANGES = 'login_and_account_creation/account_privacy_changes.json',
    SAVED_POSTS = 'saved/saved_posts.json',
    //cannot be parsed
    MEDIA = 'media/(\w+)/(.+).(jpg|map4|webp)',
}

export enum FileCodeFacebook {
    ADS_INTERACTED_WITH = 'ads_information/advertisers_you\'ve_interacted_with.json',
    ADS_USING_YOUR_ACTIVITY = 'ads_information/advertisers_using_your_activity_or_information.json',
    INFO_SUBMITTED_ADS = 'ads_information/information_you\'ve_submitted_to_advertisers.json',
    APP_WEBSITES = 'apps_and_websites_off_of_facebook/apps_and_websites.json',
    COMMENTS = 'comments_and_reactions/comments.json',
    REACTIONS = 'comments_and_reactions/posts_and_comments.json',
    FRIENDS = 'friends_and_followers/friends.json',
    FRIENDS_REQUESTS_SENT = 'friends_and_followers/friend_requests_sent.json',
    FRIENDS_REJECTED_REQUESTS = 'friends_and_followers/rejected_friend_requests.json',
    FRIENDS_REMOVED = 'friends_and_followers/removed_friends.json',
    FRIENDS_WHO_YOU_FOLLOW = 'friends_and_followers/who_you_follow.json',
    MESSAGE_FILTERED = `messages/filtered_threads/(.*)/message_1.json`,
    MESSAGE_CONVERSATION = `messages/inbox/(.*)/message_1.json`,
    ADS_INTERESTS = 'other_logged_information/ads_interests.json',
    PAGES_LIKED = 'pages/pages_you\'ve_liked.json',
    PAGES_RECOMMENDED = 'pages/pages_you\'ve_recommended.json',
    PAGES_FOLLOWED = 'pages/pages_you_follow.json',
    PAGES_UNFOLLOWED = 'pages/pages_you\'ve_unfollowed.json',
    LANGUAGE = 'preferences/language_and_locale.json',
    PROFILE_INFO = 'profile_information/profile_information.json',
    YOUR_POSTS = 'posts/your_posts_1.json',
    SEARCH_HISTORY = 'search/your_search_history.json',
    STORIES_REACTION = 'stories/story_reactions.json',
    RECENTLY_VIEWED = 'your_interactions_on_facebook/recently_viewed.json',
    RECENTLY_VISITED = 'your_interactions_on_facebook/recently_visited.json',
    YOUR_TOPICS = 'your_topics/your_topics.json',

    //not parsed yet
    ACTIVITY_GROUP_INTERACTIONS = 'activity_messages/group_interactions.json',
    ACTIVITY_PEOPLE_FRIENDS = 'activity_messages/people_and_friends.json',
    OFF_ACTIVITIES = 'apps_and_websites_off_of_facebook/your_off-facebook_activity.json',
    EVENT_INVITATION = 'events/event_invitations.json',
    EVENT_RESPONSES = 'events/your_event_responses.json',
    ACCOUNT_CENTER = 'facebook_accounts_center/accounts_center.json',
    INSTANT_GAMES = 'facebook_gaming/instant_games.json',
    PAYMENT_HISTORY = 'facebook_payments/payment_history.json',
    FEED = 'feed/feed.json',
    GROUPS_COMMENTS = 'groups/your_comments_in_groups.json',
    GROUPS_MEMBERSHIP_ACTIVITY = 'groups/your_group_membership_activity.json',
    LOCATION_LAST = 'location/last_location.json',
    LOCATION_PRIMARY = 'location/primary_location.json',
    LOCATION_PRIMARY_PUBLIC = 'location/primary_public_location.json',
    LOCATION_TIMEZONE = 'location/timezone.json',
    NOTIFICATIONS = 'notifications/notifications.json',
    OTHER_FRIEND_PEER_GROUP = 'other_logged_information/friend_peer_group.json',
    OTHER_YOUR_ADDRESS_BOOKS = 'other_personal_information/your_address_books.json',
    PREFERENCES_WATCH = 'preferences/facebook_watch.json',
    PREFERENCES_LANGUAGE_LOCALE = 'preferences/language_and_locale.json',
    PROFILE_UPDATE_HISTORY = 'profile_information/profile_update_history.json',
    SAVED_ITEMS = 'saved_items_and_collections/your_saved_items.json',
    SECURITY_ACCOUNT_ACTIVITY = 'security_and_login_information/account_activity.json',
    SECURITY_BROWSER_COOKIES = 'security_and_login_information/browser_cookies.json',
    SECURITY_IP_ADDRESS = 'security_and_login_information/ip_address_activity.json',
    SECURITY_LOGIN_PROTECTION_DATA = 'security_and_login_information/login_protection_data.json',
    SECURITY_LOGINS_LOGOUT = 'security_and_login_information/logins_and_logouts.json',
    SECURITY_MOBILE_DEVICES = 'security_and_login_information/mobile_devices.json',
    SECURITY_WHERE_LOGGED_IN = 'security_and_login_information/where_you\'re_logged_in.json',
    SECURITY_ACTIVITY_HISTORY = 'security_and_login_information/your_facebook_activity_history.json',
    STORIES_ARCHIVED = 'stories/archived_stories.json',
}

export enum FileCodeAmazon {
    ADV_THIRDPARTIES = 'Advertising.(\\d+)/Advertising.3PAudiences.csv',
    ADV_AUDIENCES = 'Advertising.(\\d+)/Advertising.AdvertiserAudiences.csv',
    ADV_CLICKS = 'Advertising.(\\d+)/Advertising.AdvertiserClicks.csv',
    AUDIENCES = 'Advertising.(\\d+)/Advertising.AmazonAudiences.csv',
    WISHLIST = 'Amazon.Lists.Wishlist.(\\d+).(\\d+)/Amazon.Lists.Wishlist.json',
    GAMES_TWITCHPRIME_SUB_HISTORY = 'AmazonGames/AmazonGames.TwitchPrime.SubscriptionCreditHistory.csv',
    AUDIBLE_LIBRARY = 'Audible.Library/Audible.Library.csv',
    AUDIBLE_LISTENING = 'Audible.Listening/Audible.Listening.csv',
    AUDIBLE_MEMBERSHIP_BILLINGS = 'Audible.MembershipBillings/Audible.MembershipBillings.csv',
    PRIMEVIDEO_WATCHLIST = 'Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.Watchlist.csv',
    PRIMEVIDEO_WATCHLIST_HISTORY = 'Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.WatchlistHistory.csv',
    PRIMEVIDEO_VIEW_COUNT = 'Digital.PrimeVideo.ViewCounts.(\\d+)/Digital.PrimeVideo.ViewCounts.(\\d+).csv',
    PRIMEVIDEO_VIEWINGHISTORY = 'Digital.PrimeVideo.Viewinghistory/Digital.PrimeVideo.Viewinghistory.csv',
    DIGITAL_ORDERING_ITEM = 'Digital-Ordering.(\\d+)/Digital Items.csv',
    DIGITAL_ORDERING_ORDERS = 'Digital-Ordering.(\\d+)/Digital Orders.csv',
    DIGITAL_ORDERING_MONETARY = 'Digital-Ordering.(\\d+)/Digital Orders Monetary.csv',
    DIGITAL_SUBSCRIPTION = 'Digital.Subscriptions/Subscriptions.csv',
    RETAIL_LIGHT_WEIGHT_INTERACTIONS = 'LightWeightInteractions/LightWeightInteractions.csv',
    RETAIL_CART_ITEMS = 'Retail.CartItems.(\\d+)/Retail.CartItems.(\\d+).csv',
    RETAIL_ORDER_HISTORY = 'Retail.OrderHistory.(\\d+)/Retail.OrderHistory.(\\d+).csv',
    RETAIL_REGION_AUTHORITY = 'Retail.RegionAuthority.(\\d+)/Retail.RegionAuthority.(\\d+).csv',
    RETAIL_SELLER_FEEDBACK = 'Retail.Seller-Feedback.(\\d+)/Retail.Seller-Feedback.csv',
    CUSTOMER_ENGAGEMENT = 'Search-Data/Search-Data.Customer-Engagement.csv',

    //not parsed yet
    SETTING_PRIVACY = 'AccountSettings.PrivacyPreferences.Consents/AccountSettings.PrivacyPreferences.Consents.csv',
    ALEXA_NOTIFICATIONS = 'Alerts/Notifications.csv',
    ALEXA_PROACTIVE = 'AlexaProactive/ProactiveRecommendations-(\\d+).csv',
    ALEXA_USER_STATS = 'AnswerGroups/User Stats.csv',
    ALEXA_CALENDARS = 'Calendars/Calendars-(\\d+).csv',
    ALEXA_DEVICES = 'Mobile/000.csv',
    ALEXA_FEEDBACK = 'Feedback/Feedback-(\\d+).csv',
    ALEXA_LISTS = 'Lists/Lists.csv',
    ALEXA_LOCATION = 'Location/Country of Residence-(\\d+).csv',
    ALEXA_SHOPPING = 'Shopping/Notifications History.csv',
    ALEXA_KARAOKE = 'Karaoke/Karaoke.csv',
    ALEXA_HUNCHES = 'Smart Home/Hunches.csv',
    ALEXA_CAMERA_ALERTS = 'Camera Smart Alerts/Camera Smart Alerts.csv',
    ALEXA_CAMERAS_ALERTS = 'Cameras Smart Alerts/Camera Smart Alerts.csv',
    GAMES_ENTITLEMENTS = 'AmazonGames/AmazonGames.AmazonGamesApp.Entitlements.csv',
    GAMES_EGRESS_IDENTITY = 'AmazonGames/AmazonGames.EgressIdentity.csv',
    GAMES_IDENTITIES = 'AmazonGames/AmazonGames.Identities.csv',
    GAMES_TWITCHPRIME_ACCOUNT_HISTORY = 'AmazonGames/AmazonGames.TwitchPrime.AccountHistory.csv',
    GAMES_TWITCHPRIME_CLAIMED_OFFERS = 'AmazonGames/AmazonGames.TwitchPrime.ClaimedOffers.csv',
    GAMES_TWITCHPRIME_LINKED_ACCOUNT = 'AmazonGames/AmazonGames.TwitchPrime.LinkedTwitchAccounts.csv',
    GAMES_LOSTARK_FORUM = 'AmazonGames/LostArk_Forums_Instructions.txt',
    GAMES_NEWWORLD_FORUM = 'AmazonGames/NewWorld_Forums_Instructions.txt',
    MUSIC_ACCOUNT = 'Amazon-Music/account.csv',
    MUSIC_PREFERENCES_ACCOUNT = 'Amazon-Music/accountPreferences.csv',
    APPSTORE_SUB_PERIOD = 'subscription-period/subscription-period.csv',
    APPSTORE_SUB_TRANSACTION = 'subscription-transaction/subscription-transaction.csv',
    AUDIBLE_DEVICES_ACTIVATIONS = 'Audible.DevicesActivations/Audible.DevicesActivations.csv',
    AUDIBLE_MEMBERSHIP_EVENT = 'Audible.MembershipEvent/Audible.MembershipEvent.csv',
    DEVICES_COMMUNICATION_PREFERENCES = 'CustomerCommunicationExperience.Preferences/CustomerCommunicationExperience.Preferences.csv',
    DEVICES_COMMUNICATION_EMAIL_HISTORY = 'CustomerCommunicationExperience.PreferencesEmailHistory/CustomerCommunicationExperience.PreferencesEmailHistory.csv',
    DIGITAL_ACTION_BENEFIT = 'Digital.ActionBenefit.(\\d+)/Digital.ActionBenefit.(\\d+).csv',
    DIGITAL_CONTENT_WHISPERSYNC = 'Digital.Content.Whispersync/whispersync.csv',
    DIGITAL_CUSTOMER_ATTRIBUTES = 'Digital.CustomerAttributes.(\\d+)/Digital.CustomerAttributes.(\\d+).csv',
    DIGITAL_ORDERS_RETURNS_MONETARY = 'Digital.Orders.Returns.(\\d+)/Digital.Orders.Returns.Monetary.(\\d+).csv',
    DIGITAL_ORDERS_RETURNS_TRANSACTION = 'Digital.Orders.Returns.(\\d+)/Digital.Orders.Returns.Transaction.(\\d+).csv',
    PRIMEVIDEO_CUSTOMER_TITLE_RECOMMENDED = 'Digital.PrimeVideo.CustomerTitleRelevanceRecommendations/Digital.PrimeVideo.CustomerTitleRelevanceRecommendations.csv',
    PRIMEVIDEO_LOCATION_DATA = 'Digital.PrimeVideo.LocationData/Digital.PrimeVideo.LocationData.csv',
    DIGITAL_SUBSCRIPTION_BENEFICIARIES = 'Digital.Subscriptions/Beneficiaries.csv',
    DIGITAL_SUBSCRIPTION_BILLING_ITEMS = 'Digital.Subscriptions/Billing Schedule Items.csv',
    DIGITAL_SUBSCRIPTION_BILLING_SCHEDULE = 'Digital.Subscriptions/Billing Schedules.csv',
    DIGITAL_SUBSCRIPTION_PERIODS = 'Digital.Subscriptions/Subscription Periods.csv',
    DIGITAL_SUBSCRIPTION_PROBLEMS = 'Digital.Subscriptions/Subscription Problems.csv',
    DIGITAL_SUBSCRIPTION_STATUS_HISTORY = 'Digital.Subscriptions/Subscription Status History.csv',
    DIGITAL_ORDERING_PAYMENT_INFO = 'Digital-Ordering.(\\d+)/Legacy Payment Information.csv',
    OUTBOUND_NOTIFICATIONS_HISTORY = 'OutboundNotifications.AmazonApplicationUpdateHistory/OutboundNotifications.AmazonApplicationUpdateHistory.zip.csv',
    OUTBOUND_NOTIFICATIONS_FEEDBACK = 'OutboundNotifications.EmailDeliveryStatusFeedback/OutboundNotifications.EmailDeliveryStatusFeedback.zip.csv',
    OUTBOUND_NOTIFICATIONS_EVENTS = 'OutboundNotifications.NotificationEngagementEvents/OutboundNotifications.NotificationEngagementEvents.zip.csv',
    OUTBOUND_NOTIFICATIONS_DATA = 'OutboundNotifications.PushSentData/OutboundNotifications.PushSentData.zip.csv',
    OUTBOUND_NOTIFICATIONS_SENT = 'OutboundNotifications.SentNotifications/OutboundNotifications.SentNotifications.zip.csv',
    PAYMENT_OPTIONS_INSTRUMENTS = 'PaymentOptions.PaymentInstruments/PaymentOptions.PaymentInstruments.csv',
    PRIMEVIDEO_WATCH_EVENT = 'PrimeVideo.WatchEvent.(\\d+).(\\d+)/PrimeVideo.WatchEvent.(\\d+).(\\d+).csv',
    RETAIL_AUTHENTICATION = 'Retail.Authentication/Retail.Authentication.json',
    RETAIL_AUTHENTICATION_TOKENS = 'Retail.AuthenticationTokens/Retail.AuthenticationTokens.json',
    RETAIL_CHAT_MESSAGE_TRANSCRIPT = 'Retail.ChatTranscripts.MessageTranscriptsCampfire/Retail.ChatTranscripts.MessageTranscriptsCampfire.csv',
    RETAIL_COMMUNITY_CONTRIBUTION_ELIGIBILITY = 'Retail.CommunityTrust.CommunityContentContributionEligibility/Retail.CommunityTrust.CommunityContentContributionEligibility.csv',
    RETAIL_CUSTOMER_PROFILE_ATTRIBUTES = 'Retail.CustomerProfile.ProfileAttributes/Retail.CustomerProfile.ProfileAttributes.csv',
    RETAIL_CUSTOMER_QUESTION_POSTED = 'Retail.CustomerQuestionsAndAnswers.QuestionsPosted/Retail.CustomerQuestionsAndAnswers.QuestionsPosted.csv',
    RETAIL_CUSTOMER_ANSWER_POSTED = 'Retail.CustomerQuestionsAndAnswers.AnswersPosted/Retail.CustomerQuestionsAndAnswers.AnswersPosted.csv',
    RETAIL_CUSTOMER_RETURNS = 'Retail.CustomerReturns.(\\d+)/Retail.CustomerReturns.(\\d+).csv',
    RETAIL_CUSTOMER_REVIEWS = 'Retail.CustomerReviews.ReviewsVersions(\\d+)/Retail.CustomerReviews.ReviewsVersions(\\d+).csv',
    RETAIL_CUSTOMER_FEEDBACK = 'Retail.CustomerServiceFeedback.(\\d+)/Retail.CustomerServiceFeedback.(\\d+).csv',
    RETAIL_ORDER_RETURNED = 'Retail.OrdersReturned.(\\d+)/Retail.OrdersReturned.(\\d+).csv',
    RETAIL_ORDER_RETURNED_PAYMENTS = 'Retail.OrdersReturned.Payments.(\\d+)/Retail.OrdersReturned.Payments.(\\d+).csv',
    RETAIL_OUTBOUND_NOTIFICATION_EML = 'media/(.+).eml',
    RETAIL_OUTBOUND_NOTIFICATION_METADATA_1 = 'Retail.OutboundNotifications.notificationMetadata/Retail.OutboundNotifications.notificationMetadata_(\\d+).csv',
    RETAIL_OUTBOUND_NOTIFICATION_METADATA = 'Retail.OutboundNotifications.notificationMetadata/Retail.OutboundNotifications.notificationMetadata.csv',
    RETAIL_OUTBOUND_NOTIFICATION_MOBILE = 'Retail.OutboundNotifications.MobileApplications/Retail.OutboundNotifications.MobileApplications.csv',
    RETAIL_PROMOTIONS = 'Retail.Promotions.(\\d+)/Retail.Promotions.csv',
    RETAIL_SEARCH_PRODUCT_METRICS = 'Retail.Search-Data/Search-Data.Retail.Product-Metrics.csv',
    RETAIL_SEARCH_CUSTOMER_ENGAGEMENT = 'Retail.Search-Data/Search-Data.Retail.Customer-Engagement.csv',
    RETAIL_TRANSACTIONAL_INVOICING = 'Retail.TransactionalInvoicing.(\\d+)/Retail.TransactionalInvoicing.(\\d+).pdf',
    SUBSCRIPTION_BILLING_REFUNDS_DATA = 'Subscriptions.Digital-Billing-And-Refunds.(\\d+)/Billing and Refunds Data.csv',
}

export enum FileCodeGoogle {
    ACCOUNT_INFO = 'Takeout/Google Account/(.+).SubscriberInfo.html',
    BOOK = 'Takeout/Google Play Books/(.+)/(.+).html',
    CHROME_BROWSER_HISTORY = 'Takeout/Chrome/BrowserHistory.json',
    CHROME_SEARCH_ENGINES = 'Takeout/Chrome/SearchEngines.json',
    PAY_TRANSACTIONS = 'Takeout/Google Pay/Google transactions/transactions_(\\d+).csv',
    PLAY_STORE_LIBRARY = 'Takeout/Google Play Store/Library.json',
    PLAY_STORE_ORDER_HISTORY = 'Takeout/Google Play Store/Order History.json',
    PLAY_STORE_PURCHASE_HISTORY = 'Takeout/Google Play Store/Purchase History.json',
    PLAY_STORE_REVIEWS = 'Takeout/Google Play Store/Reviews.json',
    PROFILE = 'Takeout/Profile/Profile.json',
    LOCATION_HISTORY_SEMANTIC = 'Takeout/Location History/Semantic Location History/(\\d{4})/(\\d{4})_((JANUARY)|(FEBRUARY)|(MARCH)|(APRIL)|(MAY)|(JUNE)|(JULY)|(AUGUST)|(SEPTEMBER)|(OCTOBER)|(NOVEMBER)|(DECEMBER)).json',
    MAPS_YOUR_PLACES_REVIEWS = 'Takeout/Maps \\(your places\\)/Reviews.json',
    TASKS = 'Takeout/Tasks/Tasks.json',
    //not parsed yet
    ACTIVITY_ADS = 'Takeout/My Activity/Ads/My Activity.json',
    ACTIVITY_APPS = 'Takeout/My Activity/Google Apps/My Activity.json',
    ACTIVITY_ASSISTANT = 'Takeout/My Activity/Assistant/My Activity.json',
    ACTIVITY_CHROME = 'Takeout/My Activity/Chrome/My Activity.json',
    ACTIVITY_DEVELOPERS = 'Takeout/My Activity/Developers/My Activity.json',
    ACTIVITY_DISCOVER = 'Takeout/My Activity/Discover/My Activity.json',
    ACTIVITY_DRIVE = 'Takeout/My Activity/Drive/My Activity.json',
    ACTIVITY_GMAIL = 'Takeout/My Activity/Gmail/My Activity.json',
    ACTIVITY_LENS = 'Takeout/My Activity/Google Lens/My Activity.json',
    ACTIVITY_NEWS = 'Takeout/My Activity/Google News/My Activity.json',
    ACTIVITY_PLAY_GAMES = 'Takeout/My Activity/Google Play Games/My Activity.json',
    ACTIVITY_PLAY_MOVIES = 'Takeout/My Activity/Google Play Movies _ TV/My Activity.json',
    ACTIVITY_PLAY_STORE = 'Takeout/My Activity/Google Play Store/My Activity.json',
    ACTIVITY_TRANSLATE = 'Takeout/My Activity/Google Translate/My Activity.json',
    ACTIVITY_HELP = 'Takeout/My Activity/Help/My Activity.json',
    ACTIVITY_IMAGE_SEARCH = 'Takeout/My Activity/Image Search/My Activity.json',
    ACTIVITY_MAPS = 'Takeout/My Activity/Maps/My Activity.json',
    ACTIVITY_SEARCH = 'Takeout/My Activity/Search/My Activity.json',
    ACTIVITY_SHOPPING = 'Takeout/My Activity/Shopping/My Activity.json',
    ACTIVITY_TAKEOUT = 'Takeout/My Activity/Takeout/My Activity.json',
    ACTIVITY_VIDEO_SEARCH = 'Takeout/My Activity/Video Search/My Activity.json',
    ACTIVITY_YOUTUBE = 'Takeout/My Activity/YouTube/My Activity.json',
    ANDROID_DEVICE_CONFIG = 'Takeout/Android Device Configuration Service/Device-(\\d+).html',
    APP_HOME = 'Takeout/Home App/HomeApp.json',
    APP_HOME_PARTNER_CONNECTIONS = 'Takeout/Home App/GoogleNestPartnerConnections.json',
    APP_HOME_HISTORY = 'Takeout/Home App/HomeHistory.json',
    APP_HOME_SOUND_SENSING = 'Takeout/Home App/SoundSensing.json',
    BLOGGER_PROFILE_CSV = 'Takeout/Blogger/Profile/profile.csv',
    BLOGGER_PROFILE_JSON = 'Takeout/Blogger/Profile/profile.json',
    BUSINESS_PROFILE_DATA = 'Takeout/Google Business Profile/account-(\\d+)/data.json',
    BUSINESS_PERSONALIZATION = 'Takeout/Google Business Profile/businessPersonalization.json',
    CALENDAR = 'Takeout/Calendar/(.*).ics',
    CLOUD_PRINT_JOBS = 'Takeout/Cloud Print/Jobs metadata takeout.csv',
    CLOUD_PRINT_PRINTERS = 'Takeout/Cloud Print/Printers metadata takeout.csv',
    CHROME_AUTOFILL = 'Takeout/Chrome/Autofill.json',
    CHROME_BOOKMARKS = 'Takeout/Chrome/Bookmarks.html',
    CHROME_DICTIONARY = 'Takeout/Chrome/Dictionary.csv',
    CHROME_EXTENSION = 'Takeout/Chrome/Extensions.json',
    CHROME_SYNC_SETTINGS = 'Takeout/Chrome/SyncSettings.json',
    DRIVE_FILE = 'Takeout/Drive/(.+)',
    FIT_ACTIVITY = 'Takeout/Activities/(.*).tcx',
    FIT_DATA = 'Takeout/Fit/All Data/(.*).json',
    FIT_SESSION = 'Takeout/Fit/All sessions/(.+)((WALKING)|(RUNNING)).json', //es. All sessions/2019-12-15T13_46_55+01_00_WALKING.json
    FIT_DAILY_ACTIVITIES = 'Takeout/Fit/Daily activity metrics/(\\d+)-(\\d+)-(\\d+).csv', //es. Daily activity metrics/2020-01-13.csv
    GROUPS_RECENT_VIEWED_DISCUSSIONS = 'Takeout/Groups/googlegroups.com/user data/recent activity/recently viewed discussions.csv',
    GROUPS_RECENT_VIEWED_GROUPS = 'Takeout/Groups/googlegroups.com/user data/recent activity/recently viewed groups.csv',
    HANGOUTS = 'Takeout/Hangouts/Hangouts.json',
    KEEP_FILE_JSON = 'Takeout/Keep/(.+).json',
    KEEP_FILE_HTML = 'Takeout/Keep/(.+).html',
    MAIL_BLOCKED_ADDRESSES = 'Takeout/Mail/User Settings/Blocked addresses.json',
    MAIL_ALL = 'Takeout/Mail/All mail Including Spam and Trash.mbox',
    LOCATION_HISTORY_RECORDS = 'Takeout/Location History/Records.json',
    LOCATION_HISTORY_SETTINGS = 'Takeout/Location History/Settings.json',
    MAPS_ADDED = 'Takeout/Maps/Added dishes, products, activities/Added dishes, products, activities.json',
    MAPS_COMMUTE_SETTINGS = 'Takeout/Maps/Commute settings/Commute settings.json',
    MAPS_VEHICLE_SETTINGS = 'Takeout/Maps/Electric vehicle settings/Electric vehicle settings.json',
    MAPS_LABELLED_PLACES = 'Takeout/Maps/My labelled places/Labelled places.json',
    MAPS_QUESTIONS_ANSWERS = 'Takeout/Maps/Questions and answers/Questions and answers.json',
    MAPS_REQUESTS_SERVICES = 'Takeout/Maps/Requests for services/Requests for services.json',
    MAPS_PERSONAL_FEEDBACK = 'Takeout/Maps/Your personalisation feedback/Your personalisation feedback.csv',
    MY_CONTACTS = 'Takeout/Contacts/My Contacts/My Contacts.csv',
    NEWS_ARTICLES = 'Takeout/News/articles.txt',
    NEWS_FOLLOWED_LOCATIONS = 'Takeout/News/followed_locations.txt',
    NEWS_FOLLOWED_SOURCES = 'Takeout/News/followed_sources.txt',
    NEWS_FOLLOWED_TOPICS = 'Takeout/News/followed_topics.txt',
    NEWS_MAGAZINES = 'Takeout/News/magazines.txt',
    PHOTO_JSON = 'Takeout/Google Photos/(.+)/(.+).json',
    PHOTO_JPG = 'Takeout/Google Photos/(.+)/(.+).jpg',
    PHOTO_MP4 = 'Takeout/Google Photos/(.+)/(.+).mp4',
    PHOTO_PRINT_SUB = 'Takeout/Google Photos/print-subscriptions.json',
    PHOTO_SHARED_ALBUM = 'Takeout/Google Photos/shared_album_comments.json',
    PHOTO_GENERATED_MEMORY_TITLES = 'Takeout/Google Photos/user-generated-memory-titles.json',
    PAY_REMITTANCES_REQUESTS = 'Takeout/Google Pay/Money remittances and requests/Money remittances and requests.csv',
    PLAY_GAMES_ACTIVITY = 'Takeout/Google Play Games Services/Games/(.+)/Activity.html',
    PLAY_GAMES_ACHIEVEMENTS = 'Takeout/Google Play Games Services/Games/(.+)/Achievements.html',
    PLAY_GAMES_EXPERIENCE = 'Takeout/Google Play Games Services/Games/(.+)/Experience.html',
    PLAY_GAMES_SCORES = 'Takeout/Google Play Games Services/Games/(.+)/Scores.html',
    PLAY_GLOBAL_PLAYER = 'Takeout/Google Play Games Services/Global/Player.html',
    PLAY_MOVIES_SERVICES = 'Takeout/Google Play Movies _ TV/Linked Services.json',
    PLAY_MOVIES_NOTIFICATION = 'Takeout/Google Play Movies _ TV/Notification Preferences.json',
    PLAY_MOVIES_RATINGS = 'Takeout/Google Play Movies _ TV/Ratings.json',
    PLAY_MOVIES_STREAMING_SERVICES = 'Takeout/Google Play Movies _ TV/Streaming Services.json',
    PLAY_MOVIES_WATCHLIST = 'Takeout/Google Play Movies _ TV/Watchlist.json',
    PLAY_STORE_DEVICES = 'Takeout/Google Play Store/Devices.json',
    PLAY_STORE_INSTALLS = 'Takeout/Google Play Store/Installs.json',
    PLAY_STORE_SETTINGS = 'Takeout/Google Play Store/Play Settings.json',
    REMINDERS = 'Takeout/Reminders/Reminders.html',
    SAVED_DEFAULT_LIST = 'Takeout/Saved/Default list.csv',
    SAVED_FAVOURITE_IMAGES = 'Takeout/Saved/Favourite images.csv',
    SAVED_FAVOURITE_PAGES = 'Takeout/Saved/Favourite pages.csv',
    SAVED_FAVOURITE_PLACES = 'Takeout/Saved/Favourite places.csv',
    SEARCH_CONTRIBUTIONS_HEARTS = 'Takeout/Search Contributions/Hearts.json',
    SEARCH_CONTRIBUTIONS_THUMBS = 'Takeout/Search Contributions/Thumbs.json',
    SEARCH_CONTRIBUTIONS_ACCOUNT = 'Takeout/Search Contributions/(.+)/Account.json',
    SHOPPING_ADDRESSES = 'Takeout/Google Shopping/Addresses/Addresses.txt',
    SHOPPING_COLLECTION_POINTS = 'Takeout/Google Shopping/Collection Point/Collection Point.txt',
    SHOPPING_LOYALTY = 'Takeout/Google Shopping/Loyalty/Loyalty.txt',
    SHOPPING_MERCHANT_REVIEWS = 'Takeout/Google Shopping/Merchant Reviews/Merchant Reviews.txt',
    SHOPPING_CONTACT_EMAILS = 'Takeout/Google Shopping/Order Preferred Contact Emails/Order Preferred Contact Emails.txt',
    SHOPPING_ORDERS = 'Takeout/Google Shopping/Orders/Orders.txt',
    SHOPPING_PERSON_COLLECTING = 'Takeout/Google Shopping/Person Collecting/Person Collecting.txt',
    SHOPPING_PRODUCT_REVIEWS = 'Takeout/Google Shopping/Product Reviews/Product Reviews.txt',
    STADIA_GAMING_DATA_HISTORY = 'Takeout/Stadia/GAMING/GAME_DATA/GAMER_HISTORY.json',
    STADIA_GAMING_DATA_LIBRARY = 'Takeout/Stadia/GAMING/GAME_DATA/LIBRARY.json',
    STADIA_GAMING_SAVE = 'Takeout/Stadia/GAMING/GAME_SAVE/(.*)',
    STADIA_GAMING_USER_ACHIEVEMENT = 'Takeout/Stadia/GAMING/USER_ACHIEVEMENTS/(.*)',
    STADIA_GAMING_USER_STATS = 'Takeout/Stadia/GAMING/USER_GAMER_STATS/(.*)',
    STADIA_SOCIAL_MULTI = 'Takeout/Stadia/SOCIAL/MULTIPLAYER_RECENT_PLAYERS.json',
    STADIA_SOCIAL_GRAPH = 'Takeout/Stadia/SOCIAL/SOCIAL_GRAPH.json',
    STADIA_USER_PARENTAL = 'Takeout/Stadia/USER/PARENTAL_CONTROL.json',
    STADIA_USER_PROFILE = 'Takeout/Stadia/USER/USER_PROFILE.json',
    YOUTUBE_LIKED_VIDEOS = 'Takeout/YouTube and YouTube Music/playlists/Liked videos.csv',
    YOUTUBE_PLAYLIST_UPLOADS = 'Takeout/YouTube and YouTube Music/playlists/Uploads from (.*).csv',
}

export enum FileCodeLinkedIn {
    JOBS_APPLICATIONS = 'Jobs/Job Applications.csv',
    JOBS_SEEKER_PREFERENCES = 'Jobs/Job Seeker Preferences.csv',
    JOBS_SAVED_JOBS = 'Jobs/Saved Jobs.csv',
    ACCOUNT_STATUS_HISTORY = 'Account Status History.csv',
    ADS_CLICKED = 'Ads Clicked.csv',
    ADS_TARGETING = 'Ad_Targeting.csv',
    COMPANY_FOLLOWS = 'Company Follows.csv',
    CONNECTIONS = 'Connections.csv',
    CONTACTS = 'Contacts.csv',
    EDUCATION = 'Education.csv',
    EMAIL_ADDRESSES = 'Email Addresses.csv',
    ENDORSEMENT_RECEIVED_INFO_1 = 'Endorsement Received Info.csv',
    ENDORSEMENT_RECEIVED_INFO_2 = 'Endorsement_Received_Info.csv',
    INFERENCES_ABOUT_YOU = 'Inferences_about_you.csv',
    INVITATIONS = 'Invitations.csv',
    JOB_APPLICANT_SAVED_ANSWERS = 'Job Applicant Saved Answers.csv',
    JOB_APPLICANT_SAVED_QUESTION_RESPONSES = 'Job Applicant Saved Screening Question Responses.csv',
    LEARNING = 'Learning.csv',
    LOGINS = 'Logins.csv',
    MEMBER_FOLLOWS = 'Member_Follows.csv',
    MESSAGE = 'messages.csv',
    PHONE_NUMBERS = 'PhoneNumbers.csv',
    POSITIONS = 'Positions.csv',
    PROFILE = 'Profile.csv',
    REACTIONS = 'Reactions.csv',
    REGISTRATION = 'Registration.csv',
    RICH_MEDIA = 'Rich Media.csv',
    SAVED_JOBS_ALERTS = 'SavedJobAlerts.csv',
    SEARCH_QUERIES = 'SearchQueries.csv',
    SECURITY_CHALLENGES = 'Security Challenges.csv',
    SKILLS = 'Skills.csv',
    VOTES = 'Votes.csv',
}

export enum FileCodeNetflix {
    ACCOUNT_DETAILS = 'ACCOUNT/AccountDetails.csv',
    ACCOUNT_SUB_HISTORY = 'ACCOUNT/SubscriptionHistory.csv',
    ACCOUNT_TERMS_OF_USE = 'ACCOUNT/TermsOfUse.csv',
    CLICKSTREAM = 'CLICKSTREAM/Clickstream.csv',
    CONTENT_INTERACTION_PREFERENCES = 'CONTENT_INTERACTION/IndicatedPreferences.csv',
    CONTENT_INTERACTION_TITLES = 'CONTENT_INTERACTION/InteractiveTitles.txt',
    CONTENT_INTERACTION_MY_LIST = 'CONTENT_INTERACTION/MyList.csv',
    CONTENT_INTERACTION_PLAYBACK_EVENTS = 'CONTENT_INTERACTION/PlaybackRelatedEvents.csv',
    CONTENT_INTERACTION_RATINGS = 'CONTENT_INTERACTION/Ratings.txt',
    CONTENT_INTERACTION_SEARCH_HISTORY = 'CONTENT_INTERACTION/SearchHistory.csv',
    CONTENT_INTERACTION_VIEWING_ACTIVITY = 'CONTENT_INTERACTION/ViewingActivity.csv',
    CUSTOMER_SERVICE_CHAT_TRANSCRIPT = 'CUSTOMER_SERVICE/ChatTranscripts.txt',
    CUSTOMER_SERVICE_CSCONTACT = 'CUSTOMER_SERVICE/CSContact.txt',
    DEVICES = 'DEVICES/Devices.csv',
    GAMES = 'GAMES/GamePlaySessions.txt',
    IP_ADDRESSES_ACCOUNT = 'IP_ADDRESSES/IpAddressesAccountCreation.csv',
    IP_ADDRESSES_LOGIN = 'IP_ADDRESSES/IpAddressesLogin.csv',
    IP_ADDRESSES_STREAMING = 'IP_ADDRESSES/IpAddressesStreaming.csv',
    MESSAGES_SENT_BY_NETFLIX = 'MESSAGES/MessagesSentByNetflix.csv',
    PAYMENT_AND_BILLING_BILLING_HISTORY = 'PAYMENT_AND_BILLING/BillingHistory.csv',
    PROFILES = 'PROFILES/Profiles.csv',
    PROFILES_AVATAR_HISTORY = 'PROFILES/AvatarHistory.csv',
    PROFILES_AVATAR_PARENTAL_CONTROL = 'PROFILES/ParentalControlsRestrictedTitles.txt',
    SOCIAL_MEDIA_CONNECTIONS = 'SOCIAL_MEDIA_CONNECTIONS/SocialMediaConnections.txt',
    SURVEYS_PRODUCT_CANCELLATION = 'SURVEYS/ProductCancellationSurvey.txt',
}

// SHOPIFY_CUSTOMERS, SHOPIFY_ORDERS, SHOPIFY_PRODUCTS, SHOPIFY_DISCOUNTS collapse into this enum of file codes
export enum FileCodeShopify {
    CUSTOMERS = 'customers_export_(\\d+).csv',
    ORDERS = 'orders_export_(\\d+).csv',
    PRODUCTS = 'products_export_(\\d+).csv',
    DISCOUNTS = 'discounts_export_(\\d+)..csv',
}
