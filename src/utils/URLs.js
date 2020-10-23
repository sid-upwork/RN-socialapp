//Api Methods
export const POST = 'POST';
export const GET = 'GET';

//Normal Header 
export const APP_HEADER = {
    'content': 'json',
    'Content-Type': 'application/json',
    Authorization: 'Basic YWRtaW46YWRtaW4='
};
// Multipart Form Data Header
export const MULTIPART_APP_HEADER = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data;',
    Authorization: 'Basic YWRtaW46YWRtaW4='
};

//Base Url Live
const BASE_URL = 'https://api.2cents.com/';
//Base Url Development
// const BASE_URL = 'http://salentro.quicquik.com/webservices/2cents/';
export const PLANS_URL = 'http://allen2cents.firebaseapp.com/plan';


// Basic Urls
export const SIGN_IN = BASE_URL + 'sign_in';
export const REGISTER = BASE_URL + 'signup';
export const FORGOT_PASSWORD = BASE_URL + 'forget_password';

//AccountSetting Url
export const LOG_OUT = BASE_URL + 'logout';
export const DEACTIVATE_ACCOUNT = BASE_URL + 'deactivateAccount';
export const CHANGE_USER_DETAIL = BASE_URL + 'accountSettings';
export const BLOCK_USER = BASE_URL + 'block_user';
export const MUTE_USER = BASE_URL + 'muteUnmuteAccount';

export const GET_USER_ACCOUNT_SETTING = BASE_URL + 'userSettings';
export const SET_USER_PRIVACY = BASE_URL + 'setPrivacy';
export const SET_NOTIFICATIONS_SETTING = BASE_URL + 'setNotifySetting';

//Profile Urls
export const EDIT_PROFILE = BASE_URL + 'editProfile';
export const GET_PROFILE = BASE_URL + 'getProfileData';

//Homepost Urls
export const CREATE_A_SPARK = BASE_URL + 'createPost';
export const GET_ALL_SPARKS = BASE_URL + 'homePost';
export const RETWEET_POST = BASE_URL + 'retweetPost';
export const LIKE_DISLIKE_POST = BASE_URL + 'post_likedislike';
export const VOTE_FOR_POLL = BASE_URL + 'votePoll';
export const GET_POST_DETAIL = BASE_URL + 'singlePost';
export const COMMENT_POST = BASE_URL + 'commentPost';
export const DELETE_POST = BASE_URL + 'DeletePost';
export const DELETE_COMMENT = BASE_URL + 'deleteComment';
export const REPORT_POST = BASE_URL + 'reportPost';

//Search Urls
export const GET_POPULAR_POST = BASE_URL + 'popularPost';
export const GET_SEARCH_RESULT = BASE_URL + 'getSearchSuggestion';
export const GET_SEARCHED_DATA = BASE_URL + 'getSearchData';

//Bookmark Urls
export const ADD_REMOVE_BOOKMARK = BASE_URL + 'bookmark';
export const GET_BOOKMARK_LIST = BASE_URL + 'bookmarkList';
export const CLEAR_BOOKMARK_LIST = BASE_URL + 'deleteBookmark';

//List Urls
export const MY_LIST = BASE_URL + 'myList';
export const ADD_EDIT_MY_LIST = BASE_URL + "createEditList";
export const LIST_DETAIL = BASE_URL + "listDetails";
export const ADD_DELETE_MEMBER = BASE_URL + "addDeleteMembers";
export const SEARCH_MEMBER = BASE_URL + "searchUsers";
export const DELETE_LIST = BASE_URL + "deleteList";
export const SUBSCRIBE_LIST = BASE_URL + "listSubscribe";


// Follow FOllowing Urls
export const FOLLOW_UNFOLLOW_USER = BASE_URL + 'follow';
export const GET_FOLLOWING_FOLLOWER = BASE_URL + 'suggestionFriend';
export const ACCEPT_USER_REQUEST = BASE_URL + 'followResponse';

// BlockList Url
export const GET_BLOCK_LIST = BASE_URL + 'getBlockedList';

//Moments Url
export const GET_MOMENT_LIST = BASE_URL + 'getmomentsList';
export const GET_MOMENT_DETAIL = BASE_URL + 'getMomentsDetail';
export const DELETE_MOMENT = BASE_URL + 'deleteMoment';
export const LIKE_MOMENT = BASE_URL + 'moment_likedislike';
export const TWEET_MOMENT = BASE_URL + 'tweetMoment';
export const DELETE_TWEET_MOMENT = BASE_URL + 'deleteAttachTweet';

//Notiication
export const GET_NOTIFICATIONS = BASE_URL + 'getNotificationList';

//Messages 
export const GET_USERS_FOR_CHAT = BASE_URL + 'chatUserSearchSuggestion';

// Help center
export const GET_HELP_CENTER_URLS = BASE_URL + 'getPageLinks';

//Kit Verification 
export const KIT_VERIFICATION = BASE_URL + 'kitVerficationDone';


