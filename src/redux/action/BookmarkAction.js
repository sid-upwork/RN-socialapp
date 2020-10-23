import { ADD_REMOVE_BOOKMARK } from '../../utils/URLs';
import { showError } from "../../utils/Utilities";
import * as constants from "../../utils/Constants";
import * as bookmarkApis from "../../Service/BookmarkApis";
import * as commonApis from "../../Service/CommonApis";

export function getBookmarkList(jsonObject) {
    return dispatch => {
        dispatch(fetchingBookmarkList());
        bookmarkApis.getBookmarkList(jsonObject).then(
            response => {
                dispatch(hideDialog());
                if (response.status === "true") {
                    dispatch(bookmarkSuccess(response.bookmarkpost));
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

export function clearBookmarkList(jsonObject) {
    return dispatch => {
        dispatch(fetchingBookmarkList())
        bookmarkApis.clearBookmarkList(jsonObject).then(
            response => {
                dispatch(hideDialog());
                if (response.status === "true") {
                    dispatch(bookmarkCleared())
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

function fetchingBookmarkList() {
    return {
        type: constants.FETCHING_BOOKMARK,
    }
}
function hideDialog() {
    return {
        type: constants.HIDE_FETCHING_BOOKMARK,
    }
}

function bookmarkSuccess(data) {
    return {
        type: constants.FETCHED_BOOKMARK_SUCCESS,
        payload: data
    }
}

function bookmarkCleared() {
    return {
        type: constants.FETCH_BOOKMARK_FAILURE
    }
}

export function postForHomePost(URL, jsonObject) {
    return dispatch => {
        dispatch(fetchingBookmarkList());
        commonApis.postOnHomePost(jsonObject, URL).then(
            response => {
                dispatch(hideDialog());
                if (response.status === "true") {
                    showError("Success", response.msg)
                    if (URL == ADD_REMOVE_BOOKMARK) {
                        dispatch(removeBookMark(response.updated_post))
                        return;
                    }
                    dispatch(updateValueAtIndex(response.updated_post));
                } else {
                    showError("Failure", response.msg)
                    dispatch(updateValueAtIndex(""));
                }
            },
            error => {
                dispatch(updateValueAtIndex(""))
            }
        )
    }
}

export function showActionDialogs(showDialog, post_id, dialogType) {
    return dispatch => {
        dispatch(showactionDialog(post_id, showDialog, dialogType))
    };
}

function showactionDialog(post_id, showDialog, dialogType) {
    return {
        type: constants.SHOW_SHARE_DIALOG_BOOKMARK,
        dialogType: dialogType,
        post_id: post_id,
        showDialog: showDialog
    };
}

function updateValueAtIndex(updated_post) {
    return {
        type: constants.UPDATE_INDEX_IN_BOOKMARK,
        payload: updated_post
    }
}

function removeBookMark(updated_post) {
    return {
        type: constants.REMOVE_BOOKMARK,
        payload: updated_post
    }
}

export function deletePost(index, jsonObject) {
    var index = index;
    return dispatch => {
        dispatch(fetchingBookmarkList());
        commonApis.deletePost(jsonObject, true).then(
            response => {
                dispatch(hideDialog());
                if (response.status === "true") {
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
        type: constants.BOOKMARK_DELETED_SUCCESSFULLY,
        ind: index
    }
}

// BlockUser fucntions 
export function blockUser(user_id, jsonObject) {
    var userId = user_id;
    return dispatch => {
        dispatch(fetchingBookmarkList());
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
        type: constants.BLOCKED_USER_BOOKMARK,
        payload: userId
    }
}

export function muteUser(user_id, jsonObject) {
    var userId = user_id;
    return dispatch => {
        dispatch(fetchingBookmarkList());
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