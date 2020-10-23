import * as constants from '../../utils/Constants';
import { showError } from "../../utils/Utilities";
import * as viewPostServiceApi from "../../Service/ViewPostServices";
import * as commonApis from "../../Service/CommonApis";

export function getPostDetail(jsonObject) {
    return dispatch => {
        dispatch(showDialog());
        viewPostServiceApi.getSinglePostDetail(jsonObject).then(
            response => {
                dispatch(hideDialog());
                if (response.status == "true") {
                    dispatch(FetchingPostDetailSuccess(response.allpost));
                } else {
                    showError("Error : " + response.msg)
                }
            },
            error => {
                showError("Error " + error)
            }
        );
    }
}

export function initializeState() {
    return dispatch => {
        dispatch(initialState())
    }
}
function initialState() {
    return {
        type: constants.SINGLE_POST_INITIALIZE
    }
}

function showDialog() {
    return {
        type: constants.FETCHING_SINGLE_POST
    }
}

function hideDialog() {
    return {
        type: constants.HIDE_FETCHING_SINGLE_POST,
    };
}

function FetchingPostDetailSuccess(data) {
    return {
        type: constants.FETCH_SUCCESS_SINGLE_POST,
        payload: data
    };
}

function FetchingPostDetailFailure() {
    return {
        type: constants.FETCH_FAILURE_SINGLE_POST
    };
}

export function postForHomePost(URL, jsonObject) {
    var jsonObject = jsonObject;
    return dispatch => {
        dispatch(showDialog());
        commonApis.postOnHomePost(jsonObject, URL).then(
            response => {
                dispatch(hideDialog());
                if (response.status === "true") {
                    // if (URL == ADD_REMOVE_BOOKMARK)
                    //     showError("Success " + response.msg)
                    // else
                    dispatch(FetchingPostDetailSuccess(response.updated_post))
                } else {
                    showError("Failure " + response.msg)
                }
            },
            error => {
                showError("Error " + error)
            }
        );
    }
}

export function showActionDialogs(showDialog, post_id, dialogType) {
    return dispatch => {
        dispatch(showactionDialog(post_id, showDialog, dialogType))
    };
}

function showactionDialog(post_id, showDialog, dialogType) {
    return {
        type: constants.SHOW_SHARE_DIALOG_SINGLE_POST,
        dialogType: dialogType,
        post_id: post_id,
        showDialog: showDialog
    };
}

export function postVotePoll(URL, jsonObject) {
    return dispatch => {
        dispatch(showDialog());
        commonApis.postVotePollApi(jsonObject, URL).then(
            response => {
                dispatch(hideDialog());
                if (response.status == "true") {
                    dispatch(FetchingPostDetailSuccess(response.updated_post));
                } else {
                    showError("Failure", response.msg)
                }
            },
            error => {
                showError("Failure", error)
            }
        );
    }
}

//delete post
export function deletePost(userId, jsonObject, deletePost, ind) {
    var index = ind
    return dispatch => {
        dispatch(showDialog());
        commonApis.deletePost(jsonObject, deletePost).then(
            response => {
                dispatch(hideDialog());
                if (response.status == "true") {
                    if (index === undefined || index === null || index === "")
                        dispatch(postDeleted());
                    else
                        dispatch(commentDeleted(index, userId));
                } else {
                    showError("Failure", response.msg)
                }
            },
            error => {
                showError("Failure", error)
            }
        )
    }
}

function postDeleted() {
    return {
        type: constants.SINGLE_POST_DELETED_SUCCESSFULLY
    }
}
function commentDeleted(index, userId) {
    return {
        type: constants.SINGLE_POST_DELETED_COMMENT,
        payload: index,
        userId: userId,
    }
}

// BlockUser fucntions 
export function blockUser(jsonObject, postUserId) {
    var postUserId = postUserId;
    return dispatch => {
        dispatch(showDialog());
        commonApis.blockUser(jsonObject).then(
            response => {
                dispatch(hideDialog());
                if (response.status == "true") {
                    if (postUserId == "")
                        dispatch(userBlocked())
                    else
                        dispatch(userBlockFromComment(postUserId))
                } else {
                    showError("Error " + response.msg)
                }
            },
            error => {
                showError("Error " + error)
            }
        )
    }
}

function userBlocked() {
    return {
        type: constants.BLOCKED_USER_SINGLE_POST
    }
}

function userBlockFromComment(userId) {
    return {
        type: constants.BLOCKED_USER_FROM_COMMENT_SINGLE_POST,
        payload: userId
    }
}

//mute User
export function muteUser(jsonObject, postUserId) {
    return dispatch => {
        dispatch(showDialog());
        commonApis.muteUser(jsonObject).then(
            response => {
                dispatch(hideDialog())
                if (response.status == "true") {
                    if (postUserId == "")
                        dispatch(userBlocked())
                    else
                        dispatch(userBlockFromComment(postUserId))
                } else {
                    showError("Error " + response.msg)
                }
            },
            error => {
                showError("Error " + error)
            }
        )
    }
}
//Report Spark
export function reportSpark(jsonObject) {
    return dispatch => {
        dispatch(showDialog());
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
                showError("Error " + error)
            }
        )
    }
}
