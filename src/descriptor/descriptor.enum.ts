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
    INSTAGRAM_ADS_CLICKED = 'ads_and_content/ads_clicked.json',
    INSTAGRAM_ADS_VIEWED = 'ads_and_content/ads_viewed.json',
    INSTAGRAM_POSTS_VIEWED = 'ads_and_content/posts_viewed.json',
    INSTAGRAM_VIDEO_VIEWED = 'ads_and_content/videos_watched.json',
    INSTAGRAM_POST_COMMENT = 'comments/post_comments.json',
    INSTAGRAM_POSTS_CREATED = 'content/posts_1.json',
    INSTAGRAM_STORIES_CREATED = 'content/stories.json',
    INSTAGRAM_FOLLOWERS = 'followers_and_following/followers.json',
    INSTAGRAM_FOLLOWING_ACCOUNTS = 'followers_and_following/following.json',
    INSTAGRAM_LIKE_COMMENTS = 'likes/liked_comments.json',
    INSTAGRAM_LIKE_POSTS = 'likes/liked_posts.json',
    INSTAGRAM_ELEGIBILITY = 'monetization/eligibility.json',
    INSTAGRAM_EMOJI_SLIDERS = 'story_sticker_interactions/emoji_sliders.json',
    INSTAGRAM_POLLS = 'story_sticker_interactions/polls.json',
    INSTAGRAM_QUIZZES = 'story_sticker_interactions/quizzes.json'
}