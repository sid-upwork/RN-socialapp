import * as constants from '../../utils/Constants';
import * as commonApis from "../../Service/CommonApis";
import * as searchApis from "../../Service/SearchApis";
import * as followerFollowingApis from "../../Service/FollowerFollowingApis";
import { showError } from "../../utils/Utilities";

function fetching() {
    return {
        type: constants.FETCHING_SEARCH,
    };
}

function hideDialog() {
    return {
        type: constants.HIDE_FETCHING_SEARCH
    }
}

export function getSearchedResult(jsonObject) {
    return dispatch => {
        dispatch(fetching())

        searchApis.getSearchedResult(jsonObject, URL).then(
            response => {
                dispatch(hideDialog())
                if (response.status == "true") {
                    dispatch(showSearchedResult(response))
                } else {
                    showError("Failure", response.msg)
                    dispatch(errorSearchedResult());
                }
            },
            error => {
                dispatch(hideDialog());
                dispatch(errorSearchedResult())
            }
        )
    }
}

function showSearchedResult(jsonResult) {
    return {
        type: constants.SEARCHED_RESULT_FOR_HASTAG_AND_STRINGS,
        payload: jsonResult
    }
}

function errorSearchedResult() {
    return {
        type: constants.SEARCHED_RESULT_FOR_HASTAG_AND_STRINGS_ERROR
    }
}


export function postVotePoll(URL, jsonObject) {
    var jsonObj = jsonObject;
    return dispatch => {
        dispatch(fetching());
        commonApis.postVotePollApi(jsonObject, URL).then(
            response => {
                dispatch(hideDialog());
                if (response.status === "true") {
                    dispatch(hideActionDialog())
                    showError("Success", response.msg)
                    dispatch(getPopularPostData(jsonObj));
                } else {
                    showError("Failure", response.msg)
                    dispatch(getPopularPostData(jsonObj));
                }
            },
            error => {
                dispatch(hideDialog());
                dispatch(getPopularPostData(jsonObj))
            }
        )
    }
}


export function postForHomePost(URL, jsonObject, className) {
    var jsonObject = jsonObject
    return dispatch => {
        dispatch(fetching())
        commonApis.postOnHomePost(jsonObject, URL).then(
            response => {
                dispatch(hideDialog())
                if (response.status == "true") {
                    dispatch(hideActionDialog())
                    dispatch(updateValueAtIndex(response.updated_post, className));
                } else {
                    showError("Failure", response.msg)
                }
            },
            error => {
                dispatch(hideDialog());
                showError("Failure", error)
            }
        )
    }
}

function updateValueAtIndex(updated_post, className) {
    return {
        type: constants.UPDATE_SEARCH_DETAIL_INDEX,
        payload: updated_post,
        classname: className
    }
}

export function showActionDialogs(showDialog, post_id, dialogType, className) {
    return dispatch => {
        dispatch(showactionDialog(post_id, showDialog, dialogType, className))
    };
}

function showactionDialog(post_id, showDialog, dialogType, className) {
    return {
        type: constants.SHOW_SEARCH_DETAIL_SHARE_DIALOG,
        dialogType: dialogType,
        post_id: post_id,
        showDialog: showDialog,
        classname: className
    };
}

function hideActionDialog() {
    return {
        type: constants.HIDE_SEARCH_DETAIL_SHARE_DIALOG
    }
}

export function deletePost(index, jsonObject, className) {
    var index = index;
    return dispatch => {
        dispatch(fetching());
        commonApis.deletePost(jsonObject, true).then(
            response => {
                dispatch(hideDialog());
                if (response.status == "true") {
                    dispatch(postDeleted(index, className));
                } else {
                    showError("Failure", response.msg)
                }
            },
            error => {
                dispatch(hideDialog());
                showError("Failure", error)
            }
        )
    }
}

function postDeleted(index, className) {
    return {
        type: constants.POST_DELETED_SUCCESSFULLY_SEARCH_DETAIL,
        ind: index,
        classname: className
    }
}

// BlockUser fucntions 
export function blockUser(user_id, jsonObject, className) {
    var userId = user_id;
    return dispatch => {
        dispatch(fetching());
        commonApis.blockUser(jsonObject).then(
            response => {
                dispatch(hideDialog());
                if (response.status == "true") {
                    dispatch(userBlocked(userId, className));
                } else {
                    showError("Failure " + response.msg)
                }
            },
            error => {
                dispatch(hideDialog());
                showError("Failure " + error)
            }

        )
    }
}

function userBlocked(userId, className) {
    return {
        type: constants.BLOCKED_USER_POST_SEARCH_DETAIL,
        payload: userId
    }
}

export function muteUser(user_id, jsonObject, className) {
    var userId = user_id;
    return dispatch => {
        dispatch(fetching());
        commonApis.blockUser(jsonObject).then(
            response => {
                dispatch(hideDialog());
                if (response.status == "true") {
                    dispatch(userBlocked(userId, className));
                } else {
                    showError("Failure " + response.msg)
                }
            },
            error => {
                dispatch(hideDialog());
                showError("Failure " + error)
            }
        )
    }
}

//Report Spark
export function reportSpark(jsonObject) {
    return dispatch => {
        dispatch(fetching());
        commonApis.reportSpark(jsonObject).then(
            response => {
                dispatch(hideDialog())
                if (response.status == "true") {
                    showError("Success " + response.msg)
                } else {
                    showError("Error " + response.msg)
                }
            },
            error => {
                dispatch(hideDialog());
                showError("Error " + error)
            }
        )
    }
}


export function followUnfollowUser(jsonObject, index) {
    return dispatch => {
        dispatch(fetching());
        followerFollowingApis.followUser(jsonObject).then(
            response => {
                dispatch(hideDialog())
                if (response.status == "true") {
                    dispatch(followUnfollow(index, response.follow_status))
                } else {
                    showError("Error " + response.msg)
                }
            },
            error => {
                dispatch(hideDialog())
                showError("Error " + error)
            }
        )
    }
}


function followUnfollow(index, statuss) {
    return { 
        type: constants.SEARCH_DETAIL_FOLLOW_UNFOLLOW,
        ind: index,
        statuss: statuss
    }
}
