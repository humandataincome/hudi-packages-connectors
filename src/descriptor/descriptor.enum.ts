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
    ACCOUNT_NOT_INTERESTED = 'ads_and_content/accounts_you\'re_not_interested_in.json',
    ADS_CLICKED = 'ads_and_content/ads_clicked.json',
    ADS_VIEWED = 'ads_and_content/ads_viewed.json',
    POSTS_VIEWED = 'ads_and_content/posts_viewed.json',
    ACCOUNT_VIEWED = 'ads_and_content/suggested_accounts_viewed.json',
    VIDEO_VIEWED = 'ads_and_content/videos_watched.json',
    MUSIC_HEARD_HISTORY = 'ads_and_content/music_heard_in_stories.json',
    MUSIC_USED_HISTORY = 'ads_and_content/music_recently_used_in_stories.json',
    POST_COMMENT = 'comments/post_comments.json',
    SYNCED_CONTACTS = 'contacts/synced_contacts.json',
    POSTS_ARCHIVED = 'content/archived_posts.json',
    POSTS_CREATED = 'content/posts_1.json',
    STORIES_CREATED = 'content/stories.json',
    FOLLOWERS = 'followers_and_following/followers.json',
    FOLLOWING_ACCOUNTS = 'followers_and_following/following.json',
    FOLLOWING_HASHTAGS = 'followers_and_following/following_hashtags.json',
    ADS_INTERESTS = 'information_about_you/ads_interests.json',
    ACCOUNT_BASED_IN = 'information_about_you/account_based_in.json',
    LIKE_COMMENTS = 'likes/liked_comments.json',
    LIKE_POSTS = 'likes/liked_posts.json',
    ELIGIBILITY = 'monetization/eligibility.json',
    CONVERSATION = `(.*)/message_1.json`,
    ACCOUNT_SEARCHES = 'recent_search/account_searches.json',
    EMOJI_SLIDERS = 'story_sticker_interactions/emoji_sliders.json',
    POLLS = 'story_sticker_interactions/polls.json',
    QUIZZES = 'story_sticker_interactions/quizzes.json',
    YOUR_REEL_SENTIMENTS = 'your_topics/your_reels_sentiments.json',
    YOUR_REEL_TOPICS = 'your_topics/your_reels_topics.json',

    //not parsed yet
    ACCOUNT_INFO = 'account_information/account_information.json',
    PROFILE_CHANGES = 'account_information/profile_changes.json',
    ADS_USING_YOUR_INFO = 'ads_and_business/advertisers_using_your_activity_or_information.json',
    AUTOFILL_INFO = 'autofill_information/autofill_information.json',
    COMMENTS_ALLOWED = 'comments_settings/comments_allowed_from.json',
    CROSS_APP_MESSAGING = 'comments_settings/use_cross-app_messaging.json',
    PROFILE_PHOTOS = 'content/profile_photos.json',
    DEVICE_INFO = 'device_information/camera_information.json',
    DEVICES = 'device_information/devices.json',
    BLOCKED_ACCOUNTS = 'followers_and_following/blocked_accounts.json',
    PENDING_FOLLOW_REQUESTS = 'followers_and_following/pending_follow_requests.json',
    RECENT_FOLLOW_REQUESTS = 'followers_and_following/recent_follow_requests.json',
    RECENT_UNFOLLOWED_ACCOUNTS = 'followers_and_following/recent_unfollowed_accounts.json',
    REMOVED_SUGGESTIONS = 'followers_and_following/removed_suggestions.json',
    YOUR_TOPICS = 'your_topics/your_topics.json',
}

export enum FileCodeFacebook {
    ADS_INTERACTED_WITH = 'ads_information/advertisers_you\'ve_interacted_with.json',
    ADS_USING_YOUR_ACTIVITY = 'ads_information/advertisers_using_your_activity_or_information.json',
    APP_WEBSITES = 'apps_and_websites_off_of_facebook/apps_and_websites.json',
    COMMENTS = 'comments_and_reactions/comments.json',
    REACTIONS = 'comments_and_reactions/posts_and_comments.json',
    FRIENDS = 'friends_and_followers/friends.json',
    FRIEND_REQUESTS_SENT = 'friends_and_followers/friend_requests_sent.json',
    REJECTED_FRIEND_REQUESTS = 'friends_and_followers/rejected_friend_requests.json',
    REMOVED_FRIENDS = 'friends_and_followers/removed_friends.json',
    WHO_YOU_FOLLOW = 'friends_and_followers/who_you_follow.json',
    CONVERSATION = `(.*)/message_1.json`,
    PAGES_LIKED = 'pages/pages_you’ve_liked.json',
    PAGES_RECOMMENDED = 'pages/pages_you’ve_recommended.json',
    PAGES_FOLLOWED = 'pages/pages_you_follow.json',
    LANGUAGE = 'preferences/language_and_locale.json',
    PROFILE_INFO = 'profile_information/profile_information.json',
    YOUR_POSTS = 'posts/your_posts_1.json',
    SEARCH_HISTORY = 'search/your_search_history.json',
    RECENTLY_VIEWED = 'your_interactions_on_facebook/recently_viewed.json',

    //not parsed yet
    GROUP_INTERACTIONS = 'activity_messages/group_interaction.json',
    PEOPLE_FRIENDS = 'activity_messages/people_and_friends.json',
    INFO_SUBMITTED_ADS = 'ads_information/information_you\'ve_submitted_to_advertisers.json',
    OFF_ACTIVITIES = 'apps_and_websites_off_of_facebook/your_off-facebook_activity.json',
    EVENT_INVITATION = 'events/event_invitations.json',
    EVENT_RESPONSES = 'events/your_event_responses.json',
    ACCOUNT_CENTER = 'facebook_accounts_center/accounts_center.json',
    INSTANT_GAMES = 'facebook_gaming/instant_games.json',
    PAYMENT_HISTORY = 'facebook_payments/payment_history.json',
    FEED = 'feed/feed.json',
    GROUPS_COMMENTS = 'groups/your_comments_in_groups.json',
    GROUPS_MEMBERSHIP_ACTIVITY = 'groups/your_group_membership_activity.json',
    LAST_LOCATION = 'location/last_location.json',
    PRIMARY_LOCATION = 'location/primary_location.json',
    PRIMARY_PUBLIC_LOCATION = 'location/primary_public_location.json',
    TIMEZONE = 'location/timezone.json',
    NOTIFICATIONS = 'notifications/notifications.json',
    ADS_INTERESTS = 'other_logged_information/ads_interests.json',
    FRIEND_PEER_GROUP = 'other_logged_information/friend_peer_group.json',
    YOUR_ADDRESS_BOOKS = 'other_personal_information/your_address_books.json',
    PAGES_YOU_FOLLOW = 'pages/pages_you_follow.json',
    PAGES_YOU_LIKE = 'pages/pages_you\'ve_liked.json',
    PAGES_UNFOLLOWED = 'pages/pages_you\'ve_unfollowed.json',
    WATCH = 'preferences/facebook_watch.json',
    LANGUAGE_LOCALE = 'preferences/language_and_locale.json',
    PROFILE_UPDATE_HISTORY = 'profile_information/profile_update_history.json',
    SAVED_ITEMS = 'saved_items_and_collections/your_saved_items.json',
    ACCOUNT_ACTIVITY = 'security_and_login_information/account_activity.json',
    BROWSER_COOKIES = 'security_and_login_information/browser_cookies.json',
    IP_ADDRESS = 'security_and_login_information/ip_address_activity.json',
    LOGIN_PROTECTION_DATA = 'security_and_login_information/login_protection_data.json',
    LOGINS_LOGOUT = 'security_and_login_information/logins_and_logouts.json',
    MOBILE_DEVICES = 'security_and_login_information/mobile_devices.json',
    WHERE_LOGGED_IN = 'security_and_login_information/where_you\'re_logged_in.json',
    ACTIVITY_HISTORY = 'security_and_login_information/your_facebook_activity_history.json',
    ARCHIVED_STORY = 'stories/archived_stories.json',
    STORY_REACTION = 'stories/story_reactions.json',
    RECENTLY_VISITED = 'your_interactions_on_facebook/recently_visited.json',
    YOUR_TOPICS = 'your_topics/your_topics.json',
}

export enum FileCodeAmazon {
    ADV_THIRDPARTIES = 'Advertising.(\\d+)/Advertising.3PAudiences.csv',
    ADV_AUDIENCES = 'Advertising.(\\d+)/Advertising.AdvertiserAudiences.csv',
    ADV_CLICKS = 'Advertising.(\\d+)/Advertising.AdvertiserClicks.csv',
    AUDIENCES = 'Advertising.(\\d+)/Advertising.AmazonAudiences.csv',
    WISHLIST = 'Amazon.Lists.Wishlist.2.1/Amazon.Lists.Wishlist.json',
    GAMES_TWITCHPRIME_SUB_HISTORY = 'AmazonGames/AmazonGames.TwitchPrime.SubscriptionCreditHistory.csv',
    AUDIBLE_LIBRARY = 'Audible.Library/Audible.Library.csv',
    AUDIBLE_LISTENING = 'Audible.Listening/Audible.Listening.csv',
    AUDIBLE_MEMBERSHIP_BILLINGS = 'Audible.MembershipBillings/Audible.MembershipBillings.csv',
    PRIMEVIDEO_WATCHLIST = 'Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.Watchlist.csv',
    PRIMEVIDEO_WATCHLIST_HISTORY = 'Digital.PrimeVideo.Watchlist/Digital.PrimeVideo.WatchlistHistory.csv',
    PRIMEVIDEO_VIEW_COUNT = 'Digital.PrimeVideo.ViewCounts.2/Digital.PrimeVideo.ViewCounts.2.csv',
    PRIMEVIDEO_VIEWINGHISTORY = 'Digital.PrimeVideo.Viewinghistory/Digital.PrimeVideo.Viewinghistory.csv',
    DIGITAL_SUBSCRIPTION = 'Digital.Subscriptions/Subscriptions.csv',
    RETAIL_LIGHT_WEIGHT_INTERACTIONS = 'LightWeightInteractions/LightWeightInteractions.csv',
    RETAIL_ORDER_HISTORY = 'Retail.OrderHistory.2/Retail.OrderHistory.2.csv',
    RETAIL_REGION_AUTHORITY = 'Retail.RegionAuthority.(\\d+)/Retail.RegionAuthority.(\\d+).csv',
    RETAIL_SELLER_FEEDBACK = 'Retail.Seller-Feedback.2/Retail.Seller-Feedback.csv',
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
    ALEXA_CAMERAS_ALERTS = 'Cameras Smart Alerts/Cameras Smart Alerts.csv',
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
    DIGITAL_ACTION_BENEFIT = 'Digital.ActionBenefit.2/Digital.ActionBenefit.2.csv',
    DIGITAL_CONTENT_WHISPERSYNC = 'Digital.Content.Whispersync/whispersync.csv',
    DIGITAL_CUSTOMER_ATTRIBUTES = 'Digital.CustomerAttributes.(\\d+)/Digital.CustomerAttributes.(\\d+)',
    DIGITAL_ORDERS_RETURNS_MONETARY = 'Digital.Orders.Returns.2/Digital.Orders.Returns.Monetary.2.csv',
    DIGITAL_ORDERS_RETURNS_TRANSACTION = 'Digital.Orders.Returns.2/Digital.Orders.Returns.Transaction.2.csv',
    PRIMEVIDEO_CUSTOMER_TITLE_RECOMMENDED = 'Digital.PrimeVideo.CustomerTitleRelevanceRecommendations/Digital.PrimeVideo.CustomerTitleRelevanceRecommendations.csv',
    PRIMEVIDEO_LOCATION_DATA = 'Digital.PrimeVideo.LocationData/Digital.PrimeVideo.LocationData.csv',
    DIGITAL_SUBSCRIPTION_BENEFICIARIES = 'Digital.Subscriptions/Beneficiaries.csv',
    DIGITAL_SUBSCRIPTION_BILLING_ITEMS = 'Digital.Subscriptions/Billing Schedule Items.csv',
    DIGITAL_SUBSCRIPTION_BILLING_SCHEDULE = 'Digital.Subscriptions/Billing Schedules.csv',
    DIGITAL_SUBSCRIPTION_PERIODS = 'Digital.Subscriptions/Subscription Periods.csv',
    DIGITAL_SUBSCRIPTION_PROBLEMS = 'Digital.Subscriptions/Subscription Problems.csv',
    DIGITAL_SUBSCRIPTION_STATUS_HISTORY = 'Digital.Subscriptions/Subscription Status History.csv',
    DIGITAL_ORDERING_ITEM = 'Digital-Ordering.2/Digital Items.csv',
    DIGITAL_ORDERING_ORDERS = 'Digital-Ordering.2/Digital Orders.csv',
    DIGITAL_ORDERING_MONETARY = 'Digital-Ordering.2/Digital Orders Monetary.csv',
    DIGITAL_ORDERING_PAYMENT_INFO = 'Digital-Ordering.2/Legacy Payment Information.csv',
    OUTBOUND_NOTIFICATIONS_HISTORY = 'OutboundNotifications.AmazonApplicationUpdateHistory/OutboundNotifications.AmazonApplicationUpdateHistory.zip.csv',
    OUTBOUND_NOTIFICATIONS_FEEDBACK = 'OutboundNotifications.EmailDeliveryStatusFeedback/OutboundNotifications.EmailDeliveryStatusFeedback.zip.csv',
    OUTBOUND_NOTIFICATIONS_EVENTS = 'OutboundNotifications.NotificationEngagementEvents/OutboundNotifications.NotificationEngagementEvents.zip.csv',
    OUTBOUND_NOTIFICATIONS_DATA = 'OutboundNotifications.PushSentData/OutboundNotifications.PushSentData.zip.csv',
    OUTBOUND_NOTIFICATIONS_SENT = 'OutboundNotifications.SentNotifications/OutboundNotifications.SentNotifications.zip.csv',
    PAYMENT_OPTIONS_INSTRUMENTS = 'PaymentOptions.PaymentInstruments/PaymentOptions.PaymentInstruments.csv',
    PRIMEVIDEO_WATCH_EVENT = 'PrimeVideo.WatchEvent.(\\d+).(\\d+)/PrimeVideo.WatchEvent.(\\d+).(\\d+).csv',
    RETAIL_AUTHENTICATION = 'Retail.Authentication/Retail.Authentication.json',
    RETAIL_AUTHENTICATION_TOKENS = 'Retail.AuthenticationTokens/Retail.AuthenticationTokens.json',
    RETAIL_CART_ITEMS = 'Retail.CartItems.2/Retail.CartItems.2.csv',
    RETAIL_CHAT_MESSAGE_TRANSCRIPT = 'Retail.ChatTranscripts.MessageTranscriptsCampfire/Retail.ChatTranscripts.MessageTranscriptsCampfire.csv',
    RETAIL_COMMUNITY_CONTRIBUTION_ELIGIBILITY = 'Retail.CommunityTrust.CommunityContentContributionEligibility/Retail.CommunityTrust.CommunityContentContributionEligibility.csv',
    RETAIL_CUSTOMER_PROFILE_ATTRIBUTES = 'Retail.CustomerProfile.ProfileAttributes/Retail.CustomerProfile.ProfileAttributes.csv',
    RETAIL_CUSTOMER_QUESTION_POSTED = 'Retail.CustomerQuestionsAndAnswers.QuestionsPosted/Retail.CustomerQuestionsAndAnswers.QuestionsPosted.csv',
    RETAIL_CUSTOMER_ANSWER_POSTED = 'Retail.CustomerQuestionsAndAnswers.AnswersPosted/Retail.CustomerQuestionsAndAnswers.AnswersPosted.csv',
    RETAIL_CUSTOMER_RETURNS = 'Retail.CustomerReturns.(\\d+)/Retail.CustomerReturns.(\\d+).csv',
    RETAIL_CUSTOMER_REVIEWS = 'Retail.CustomerReviews.ReviewsVersions2/Retail.CustomerReviews.ReviewsVersions2.csv',
    RETAIL_CUSTOMER_FEEDBACK = 'Retail.CustomerServiceFeedback.2/Retail.CustomerServiceFeedback.2.csv',
    RETAIL_LIGHTWEIGHT_INTERACTIONS = 'LightWeightInteractions/LightWeightInteractions.csv',
    RETAIL_ORDER_RETURNED = 'Retail.OrdersReturned.2/Retail.OrdersReturned.2.csv',
    RETAIL_ORDER_RETURNED_PAYMENTS = 'Retail.OrdersReturned.Payments.2/Retail.OrdersReturned.Payments.2.csv',
    RETAIL_OUTBOUND_NOTIFICATION_EML = 'media/(.+).eml',
    RETAIL_OUTBOUND_NOTIFICATION_METADATA_1 = 'Retail.OutboundNotifications.notificationMetadata/Retail.OutboundNotifications.notificationMetadata_1.csv',
    RETAIL_OUTBOUND_NOTIFICATION_METADATA = 'Retail.OutboundNotifications.notificationMetadata/Retail.OutboundNotifications.notificationMetadata.csv',
    RETAIL_OUTBOUND_NOTIFICATION_MOBILE = 'Retail.OutboundNotifications.MobileApplications/Retail.OutboundNotifications.MobileApplications.csv',
    RETAIL_PROMOTIONS = 'Retail.Promotions.2/Retail.Promotions.csv',
    RETAIL_SEARCH_PRODUCT_METRICS = 'Retail.Search-Data/Retail.Search-Data.Retail.Product-Metrics.csv',
    RETAIL_SEARCH_CUSTOMER_ENGAGEMENT = 'Retail.Search-Data/Retail.Search-Data.Retail.Customer-Engagement.csv',
    RETAIL_TRANSACTIONAL_INVOICING = 'Retail.TransactionalInvoicing.2/Retail.TransactionalInvoicing.(\\d+).pdf',
    SUBSCRIPTION_BILLING_REFUNDS_DATA = 'Subscriptions.Digital-Billing-And-Refunds.2/Billing and Refunds Data.csv',
}

export enum FileCodeGoogle {
    SEMANTIC_LOCATION_HISTORY = '(\\d{4})/(\\d{4})_((JANUARY)|(FEBRUARY)|(MARCH)|(APRIL)|(MAY)|(JUNE)|(JULY)|(AUGUST)|(SEPTEMBER)|(OCTOBER)|(NOVEMBER)|(DECEMBER)).json', //es. 2017/2017_MARCH.json
    CHROME_BROWSER_HISTORY = 'Chrome/BrowserHistory.json',
    CHROME_SEARCH_ENGINES = 'Chrome/SearchEngines.json',
    ACCOUNT_INFO = 'Google Account/(.+).SubscriberInfo.html',
    PLAY_STORE_LIBRARY = 'Google Play Store/Library.json',
    PLAY_STORE_ORDER_HISTORY = 'Google Play Store/OrderHistory.json',
    PLAY_STORE_PURCHASE_HISTORY = 'Google Play Store/PurchaseHistory.json',
    PLAY_STORE_REVIEWS = 'Google Play Store/Reviews.json',
    PAY_TRANSACTIONS = 'Google transactions/transactions_(\\d+).csv',
    MAPS_YOUR_PLACES_REVIEWS = 'Maps your_places/Reviews.json', //originally:  'Maps (your places)/Reviews.json'
    PHOTO = 'Photos from (\\d+)/(.+).json',
    PROFILE = 'Profile/Profile.json',

    //not parsed yet
    ANDROID_DEVICE_CONFIG = 'Android Device Configuration Service/Device-(\\d+).html',
    BLOGGER_PROFILE = 'Profile/profile.json',
    CALENDAR = 'Calendar/(.*).ics',
    CHROME_AUTOFILL = 'Chrome/Autofill.json',
    CHROME_BOOKMARKS = 'Chrome/Bookmarks.html',
    CHROME_DICTIONARY = 'Chrome/Dictionary.csv',
    CHROME_EXTENSION = 'Chrome/Extensions.json',
    CHROME_SYNC_SETTINGS = 'Chrome/SyncSettings.json',
    CLOUD_PRINT_JOBS = 'Cloud Print/Jobs metadata takeout.json',
    CLOUD_PRINT_PRINTERS = 'Cloud Print/Printers metadata takeout.json',
    FIT_ACTIVITY = 'Activities/(.*).tcx',
    FIT_DATA = 'All Data/((derived_com)|(raw_com))(.*).json',
    FIT_SESSION = 'All sessions/(.+)((WALKING)|(RUNNING)).json', //es. All sessions/2019-12-15T13_46_55+01_00_WALKING.json
    FIT_DAILY_ACTIVITIES = 'Daily activity metrics/(\\d+)-(\\d+)-(\\d+).csv', //es. Daily activity metrics/2020-01-13.csv
    BUSINESS_PROFILE_PERSONALIZATION = 'Google Business Profile/businessPersonalization.json',
    BUSINESS_PROFILE_DATA = 'account-(//d+)/data.json',
    PAY_REMITTANCES_REQUESTS = 'Google Pay/Money remittances and requests.csv',
    PLAY_GAMES_ACTIVITY = '(.+)/Activity.html', //e.g. Asphalt 8 - Car Racing Game/Activity.html
    PLAY_GAMES_PLAYER = 'Global/Player.html',
    PLAY_MOVIES_SERVICES = 'Google Play Movies _ TV/Linked Services.json',
    PLAY_MOVIES_NOTIFICATION = 'Google Play Movies _ TV/Notification Preferences.json',
    PLAY_MOVIES_RATINGS = 'Google Play Movies _ TV/Ratings.json',
    PLAY_MOVIES_STREAMING_SERVICES = 'Google Play Movies _ TV/Streaming Services.json',
    PLAY_MOVIES_WATCHLIST = 'Google Play Movies _ TV/Watchlist.json',
    PLAY_STORE_DEVICES = 'Google Play Store/Devices.json',
    PLAY_STORE_INSTALLS = 'Google Play Store/Installs.json',
    PLAY_STORE_SETTINGS = 'Google Play Store/Play Settings.json',
    SHOPPING_ADDRESSES = 'Addresses/Addresses.txt',
    SHOPPING_COLLECTION_POINTS = 'Collection Point/Collection Point.txt',
    SHOPPING_LOYALTY = 'Loyalty/Loyalty.txt',
    SHOPPING_MERCHANT_REVIEWS = 'Merchant Reviews/Merchant Reviews.txt',
    SHOPPING_CONTACT_EMAILS = 'Order Preferred Contact Emails/Order Preferred Contact Emails.txt',
    SHOPPING_ORDERS = 'Orders/Orders.txt',
    SHOPPING_PERSON_COLLECTING = 'Person Collecting/Person Collecting.txt',
    SHOPPING_PRODUCT_REVIEWS = 'Product Reviews/Product Reviews.txt',
    GROUPS_RECENT_VIEWED_DISCUSSIONS = 'recent activity/recently viewed discussions.csv',
    GROUPS_RECENT_VIEWED_GROUPS = 'recent activity/recently viewed groups.csv',
    HANGOUTS = 'Hangouts/Hangouts.json',
    APP_HOME = 'Home App/HomeApp.json',
    APP_HOME_PARTNER_CONNECTIONS = 'Home App/GoogleNestPartnerConnections.json',
    APP_HOME_HISTORY = 'Home App/HomeHistory.json',
    APP_HOME_SOUND_SENSING = 'Home App/SoundSensing.json',
    KEEP_FILE_JSON = 'Keep/(.+).json',
    KEEP_FILE_HTML = 'Keep/(.+).json',
    MAIL_BLOCKED_ADDRESSES = 'User Settings/Blocked addresses.json',
    MAIL_ALL = 'Mail/All mail Including Spam and Trash.mbox',
    MAPS_ADDED = 'Added dishes, products, activities/Added dishes, products, activities.json',
    MAPS_COMMUTE_SETTINGS = 'Commute settings/Commute settings.json',
    MAPS_VEHICLE_SETTINGS = 'Electric vehicle settings/Electric vehicle settings.json',
    MAPS_LABELLED_PLACES = 'Labelled places/Labelled places.json',
    MAPS_QUESTIONS_ANSWERS = 'Questions and answers/Questions and answers.json',
    MAPS_REQUESTS_SERVICES = 'Requests for services/Requests for services.json',
    MAPS_PERSONAL_FEEDBACK = 'Your personalisation feedback/Your personalisation feedback.json',
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
    NEWS_ARTICLES = 'News/articles.txt',
    NEWS_FOLLOWED_LOCATIONS = 'News/followed_locations.txt',
    NEWS_FOLLOWED_SOURCES = 'News/followed_sources.txt',
    NEWS_FOLLOWED_TOPICS = 'News/followed_topics.txt',
    NEWS_MAGAZINES = 'News/magazines.txt',
    REMINDERS = 'Reminders/Reminders.html',
    SAVED_DEFAULT_LIST = 'Saved/Default list.csv',
    SAVED_FAVOURITE_IMAGES = 'Saved/Favourite images.csv',
    SAVED_FAVOURITE_PAGES = 'Saved/Favourite pages.csv',
    SAVED_FAVOURITE_PLACES = 'Saved/Favourite places.csv',
    SEARCH_CONTRIBUTIONS_HEARTS = 'Search Contributions/Hearts.json',
    SEARCH_CONTRIBUTIONS_THUMBS = 'Search Contributions/Thumbs.json',
    STADIA_GAMING_DATA_HISTORY = 'GAME_DATA/GAMER_HISTORY.json',
    STADIA_GAMING_DATA_LIBRARY = 'GAME_DATA/LIBRARY.json',
    STADIA_GAMING_SOCIAL_MULTI = 'SOCIAL/MULTIPLAYER_RECENT_PLAYERS.json',
    STADIA_GAMING_SOCIAL_GRAPH = 'SOCIAL/SOCIAL_GRAPH.json',
    STADIA_GAMING_USER_PARENTAL = 'SOCIAL/PARENTAL_CONTROL.json',
    STADIA_GAMING_USER_PROFILE = 'SOCIAL/USER_PROFILE.json',
    TASKS = 'Tasks/Tasks.json',
    YOUTUBE_LIKED_VIDEOS = 'playlists/Liked videos.csv',
    YOUTUBE_UPLOADS = 'playlists/Uploads from (.*).csv',
}
