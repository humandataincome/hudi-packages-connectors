export enum FileCodeGoogle {
    ACCOUNT_INFO = 'Takeout/Google Account/(.+).SubscriberInfo.html',
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
    YOUTUBE_LIKED_VIDEOS = 'Takeout/YouTube and YouTube Music/playlists/Liked videos.csv',
    YOUTUBE_PLAYLIST_UPLOADS = 'Takeout/YouTube and YouTube Music/playlists/Uploads from (.*).csv',
    //TODO: not parsed yet
    ACTIVITY_ADS = 'Takeout/My Activity/Ads/My Activity.json',
    ACTIVITY_APPS = 'Takeout/My Activity/Google Apps/My Activity.json',
    ACTIVITY_ASSISTANT = 'Takeout/My Activity/Assistant/My Activity.json',
    ACTIVITY_BOOKS = 'Takeout/My Activity/Books/My Activity.json',
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
    APP_HOME_NEST_PARTNER_CONNECTIONS = 'Takeout/Home App/GoogleNestPartnerConnections.json',
    APP_HOME_NEST_CONNECT = 'Takeout/Home App/GoogleNestConnect.json',
    APP_HOME_HISTORY = 'Takeout/Home App/HomeHistory.json',
    APP_HOME_SOUND_SENSING = 'Takeout/Home App/SoundSensing.json',
    APP_HOME_SECURITY_ALARM = 'Takeout/Home App/SecurityAlarmClips.json',
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
    CHROME_READING_LIST = 'Takeout/Chrome/ReadingList.html',
    CHROME_SYNC_SETTINGS = 'Takeout/Chrome/SyncSettings.json',
    DRIVE_FILE = 'Takeout/Drive/(.+)',
    FIT_ACTIVITY = 'Takeout/Activities/(.*).tcx',
    FIT_DATA = 'Takeout/Fit/All data/(.*).json',
    FIT_SESSION = 'Takeout/Fit/All sessions/(.+)((WALKING)|(RUNNING)|(CALISTHENICS)).json', //es. All sessions/2019-12-15T13_46_55+01_00_WALKING.json
    FIT_DAILY_ACTIVITIES_METRICS = 'Takeout/Fit/Daily activity metrics/Daily activity metrics.csv',
    FIT_DAILY_ACTIVITIES = 'Takeout/Fit/Daily activity metrics/(\\d+)-(\\d+)-(\\d+).csv', //es. Daily activity metrics/2020-01-13.csv
    GROUPS_RECENT_VIEWED_DISCUSSIONS = 'Takeout/Groups/googlegroups.com/user data/recent activity/recently viewed discussions.csv',
    GROUPS_RECENT_VIEWED_GROUPS = 'Takeout/Groups/googlegroups.com/user data/recent activity/recently viewed groups.csv',
    HANGOUTS = 'Takeout/Hangouts/Hangouts.json',
    LOG_ACTIVITIES_DEVICES = 'Takeout/Access log activity/Devices – A list of devices \\(i.e. Nest, Pixel, iPh.csv',
    LOG_ACTIVITIES = 'Takeout/Access log activity/Activities – A list of Google services accessed by.csv',
    KEEP_FILE_JSON = 'Takeout/Keep/(.+).json',
    KEEP_FILE_HTML = 'Takeout/Keep/(.+).html',
    MAIL_BLOCKED_ADDRESSES = 'Takeout/Mail/User settings/Blocked addresses.json',
    MAIL_ALL = 'Takeout/Mail/All mail Including Spam and Trash.mbox',
    LOCATION_HISTORY_RECORDS = 'Takeout/Location History/Records.json',
    LOCATION_HISTORY_SETTINGS = 'Takeout/Location History/Settings.json',
    MAPS_ADDED = 'Takeout/Maps/Added dishes, products, activities/Added dishes, products, activities.json',
    MAPS_COMMUTE_SETTINGS = 'Takeout/Maps/Commute settings/Commute settings.json',
    MAPS_COMMUTE_ROUTES = 'Takeout/Maps/Commute routes/Commute routes.json',
    MAPS_VEHICLE_SETTINGS = 'Takeout/Maps/Electric vehicle settings/Electric vehicle settings.json',
    MAPS_LABELLED_PLACES = 'Takeout/Maps/My labelled places/Labelled places.json',
    MAPS_QUESTIONS_ANSWERS = 'Takeout/Maps/Questions and answers/Questions and answers.json',
    MAPS_REQUESTS_SERVICES = 'Takeout/Maps/Requests for services/Requests for services.json',
    MAPS_PERSONAL_FEEDBACK = 'Takeout/Maps/Your personalisation feedback/Your personalisation feedback.csv',
    MAPS_YOUR_PLACES_SAVED = 'Takeout/Maps \\(your places\\)/Saved Places.json',
    CONTACTS_MY = 'Takeout/Contacts/My Contacts/My Contacts.csv',
    CONTACTS_ALL = 'Takeout/Contacts/All Contacts/All Contacts.csv',
    CONTACTS_ANDROIDS = 'Takeout/Contacts/Starred in Android/Starred in Android.csv',
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
    PLAY_GAMES_METADATA = 'Takeout/Google Play Games Services/Games/(.+)/Metadata.html',
    PLAY_GLOBAL_PLAYER = 'Takeout/Google Play Games Services/Global/Player.html',
    PLAY_MOVIES_SERVICES = 'Takeout/Google Play Movies _ TV/Linked Services.json',
    PLAY_MOVIES_NOTIFICATION = 'Takeout/Google Play Movies _ TV/Notification Preferences.json',
    PLAY_MOVIES_RATINGS = 'Takeout/Google Play Movies _ TV/Ratings.json',
    PLAY_MOVIES_STREAMING_SERVICES = 'Takeout/Google Play Movies _ TV/Streaming Services.json',
    PLAY_MOVIES_WATCHLIST = 'Takeout/Google Play Movies _ TV/Watchlist.json',
    PLAY_STORE_DEVICES = 'Takeout/Google Play Store/Devices.json',
    PLAY_STORE_INSTALLS = 'Takeout/Google Play Store/Installs.json',
    PLAY_STORE_SETTINGS = 'Takeout/Google Play Store/Play Settings.json',
    PLAY_STORE_SUBSCRIPTION = 'Takeout/Google Play Store/Subscriptions.json',
    REMINDERS = 'Takeout/Reminders/Reminders.html',
    SAVED_DEFAULT_LIST = 'Takeout/Saved/Default list.csv',
    SAVED_WANT_TO_GO = 'Takeout/Saved/Want to go.csv',
    SAVED_FAVOURITE_IMAGES = 'Takeout/Saved/Favourite images.csv',
    SAVED_FAVOURITE_PAGES = 'Takeout/Saved/Favourite pages.csv',
    SAVED_FAVOURITE_PLACES = 'Takeout/Saved/Favourite places.csv',
    SEARCH_CONTRIBUTIONS_HEARTS = 'Takeout/Search Contributions/Hearts.json',
    SEARCH_CONTRIBUTIONS_THUMBS = 'Takeout/Search Contributions/Thumbs.json',
    SEARCH_CONTRIBUTIONS_ACCOUNT = 'Takeout/Search Contributions/(.+)/Accounts.json',
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
    TASKS = 'Takeout/Tasks/Tasks.json',
    //cannot be parsed
    BOOK_HTML = 'Takeout/Google Play Books/(.+)/(.+).html',
    BOOK_JSON = 'Takeout/Google Play Books/(.+)/(.+).json',
}
