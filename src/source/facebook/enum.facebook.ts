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
    //TODO: not parsed yet
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
    POSTS_VIDEOS = 'posts/your_videos.json',
    POSTS_ALBUM = 'album/(\\d+).json',
    POSTS_UNCATEGORIZED_PHOTOS = 'posts/your_uncategorized_photos.json',
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
