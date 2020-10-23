import * as constants from '../../utils/Constants';
import * as commonApis from "../../Service/CommonApis";
import * as searchApis from "../../Service/SearchApis";
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

export function getPopularPostData(jsonObject) {
    return dispatch => {
        dispatch(fetching())
        searchApis.getPopularPostData(jsonObject).then(
            response => {
                dispatch(hideDialog())
                if (response.status == "true") {
                    dispatch(searchSuccess(response))
                } else {
                    dispatch(searchFailure())
                }
            },
            error => {
                dispatch(searchFailure())
            }
        )
    }
}

function searchSuccess(searchResponse) {
    return {
        type: constants.FETCH_SEARCH_SUCCESS,
        payload: searchResponse
    };
}

function searchFailure() {
    return {
        type: constants.FETCH_SEARCH_FAILURE
    }
}

export function postForHomePost(URL, jsonObject) {
    var jsonObject = jsonObject
    return dispatch => {
        dispatch(fetching())
        commonApis.postOnHomePost(jsonObject, URL).then(
            response => {
                dispatch(hideDialog())
                if (response.status == "true") {
                    dispatch(hideActionDialog())
                    dispatch(updateValueAtIndex(response.updated_post));
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

function updateValueAtIndex(updated_post) {
    return {
        type: constants.UPDATE_SEARCH_INDEX,
        payload: updated_post
    }
}

export function showActionDialogs(showDialog, post_id, dialogType) {
    return dispatch => {
        dispatch(showactionDialog(post_id, showDialog, dialogType))
    };
}

function showactionDialog(post_id, showDialog, dialogType) {
    return {
        type: constants.SHOW_SEARCH_SHARE_DIALOG,
        dialogType: dialogType,
        post_id: post_id,
        showDialog: showDialog
    };
}

function hideActionDialog() {
    return {
        type: constants.HIDE_SEARCH_SHARE_DIALOG
    }
}

export function deletePost(index, jsonObject) {
    var index = index;
    return dispatch => {
        dispatch(fetching());
        commonApis.deletePost(jsonObject, true).then(
            response => {
                dispatch(hideDialog());
                if (response.status == "true") {
                    dispatch(postDeleted(index));
                } else {
                    showError("Failure", response.msg)
                }
            },
            error => { showError("Failure", error) }
        )
    }
}

function postDeleted(index) {
    return {
        type: constants.POST_DELETED_SUCCESSFULLY_SEARCH,
        ind: index
    }
}

// BlockUser fucntions 
export function blockUser(user_id, jsonObject) {
    var userId = user_id;
    return dispatch => {
        dispatch(fetching());
        commonApis.blockUser(jsonObject).then(
            response => {
                dispatch(hideDialog());
                if (response.status === "true") {
                    dispatch(userBlocked(userId));
                } else {
                    showError("Failure " + response.msg)
                }
            },
            error => {
                showError("Failure " + error)
            }

        )
    }
}

function userBlocked(userId) {
    return {
        type: constants.BLOCKED_USER_POST_SEARCH,
        payload: userId
    }
}

export function muteUser(user_id, jsonObject) {
    var userId = user_id;
    return dispatch => {
        dispatch(fetching());
        commonApis.blockUser(jsonObject).then(
            response => {
                dispatch(hideDialog());
                if (response.status === "true") {
                    dispatch(userBlocked(userId));
                } else {
                    showError("Failure " + response.msg)
                }
            },
            error => {
                showError("Failure " + error)
            }
        )
    }
}

//Report Spark
export function reportSpark(jsonObject) {
    return dispatch => {
        dispatch(gotFetchingHome());
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

export function setInitialiStage() {
    return dispatch => {
        dispatch(initialStage())
    }
}

function initialStage() {
    return {
        type: constants.INITIAL_STATE_SEARCH_DETAIL
    }
}

export function searchKeyword(jsonObject) {
    return dispatch => {
        searchApis.searchKeyword(jsonObject).then(
            response => {
                if (response.status == "true") {
                    dispatch(searchedKeySuccess(response));
                } else {
                    dispatch(searchedKeyFailure())
                }
            },
            error => {
                dispatch(searchedKeyFailure())
            }
        )
    };
}

function searchedKeySuccess(data) {
    return {
        type: constants.SEARCHED_KEY_SUCCESS,
        payload: data
    }
}

function searchedKeyFailure() {
    return {
        type: constants.SEARCHED_KEY_FAILURE
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
                dispatch(getPopularPostData(jsonObj))
            }
        )
    }
}