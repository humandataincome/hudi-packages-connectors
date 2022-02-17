
export interface InstagramDataAggregator {
    //from INSTAGRAM_ADS_CLICKED
    adsClick?: number;
    adsClickTI?: number;
    //from INSTAGRAM_ADS_VIEWED
    adsViewed?: number;
    adsViewedTI?: number;
    //from INSTAGRAM_POST_COMMENT
    commentsPosts?: number;
    commentsPostsTI?: number;
    //from INSTAGRAM_EMOJI_SLIDERS
    emojiSliders?: number;
    emojiSlidersTI?: number;
    //from INSTAGRAM_FOLLOWERS
    followers?: number;
    //from INSTAGRAM_FOLLOWING
    following?: number;
    //from INSTAGRAM_LIKE_COMMENTS
    likesComments?: number;
    likesCommentsTI?: number;
    //from INSTAGRAM_LIKE_POSTS
    likesPosts?: number;
    likesPostsTI?: number;
    //from INSTAGRAM_ELEGIBILITY
    isMonetizable?: boolean;
    //from INSTAGRAM_POLLS
    polls?: number;
    pollsTI?: number;
    //from INSTAGRAM_POSTS_CREATED
    postsCreated?: number;
    postsCreatedTI?: number;
    //from INSTAGRAM_POSTS_VIEWED
    postsViewed?: number;
    postsViewedTI?: number;
    //from INSTAGRAM_QUIZZES
    quizzes?: number;
    quizzesTI?: number;
    //from INSTAGRAM_STORIES_CREATED
    storiesCreated?: number;
    storiesCreatedTI?: number;
    //from INSTAGRAM_VIDEO_VIEWED
    videosViewed?: number;
    videosViewedTI?: number;

    //dataPoints is the total points generated
    dataPoints?: number;
}