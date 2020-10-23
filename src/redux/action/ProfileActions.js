import * as constants from '../../utils/Constants';
import { showError } from "../../utils/Utilities";
import * as commonApis from "../../Service/CommonApis";
import * as profileApis from "../../Service/ProfileApis";
import * as followerFollowingApis from "../../Service/FollowerFollowingApis";

function fetchingProfile() {
    return {
        type: constants.PROFILE_FETCHING,
    };
}

function hideFetchingProfile() {
    return {
        type: constants.PROFILE_FETCHING_DONE,
    };
}

export function getProfileData(jsonObject, stateSearchedUsername) {
    return dispatch => {
        dispatch(fetchingProfile())
        profileApis.getProfileData(jsonObject)
            .then(response => {
                dispatch(hideFetchingProfile())
                if (response.status == "true") {
                    dispatch(profileSuccess(response.profileData, stateSearchedUsername))
                } else {
                    showError("Error: " + response.msg)
                    dispatch(profileFailure())
                }
            }, error => {
                showError("Failure " + error)
            })
    };
}

function profileSuccess(response, stateSearchedUsername) {
    return {
        type: constants.PROFILE_DATA_SUCCESS,
        payload: response,
        key: stateSearchedUsername
    };
}

function profileFailure() {
    return {
        type: constants.PROFILE_DATA_FAILURE
    };
}


export function postForHomePost(URL, jsonObject) {
    return dispatch => {
        dispatch(fetchingProfile());
        commonApis.postOnHomePost(jsonObject, URL).then(
            response => {
                dispatch(hideFetchingProfile())
                if (response.status === "true") {
                    dispatch(updateValueAtIndex(response.updated_post))
                } else {
                    showError("Failure " + response.msg)
                }
            },
            error => {
                showError("Failure " + error)
            }
        )
    };
}

function updateValueAtIndex(updated_post) {
    return {
        type: constants.UPDATE_INDEX_PROFILE,
        payload: updated_post
    };
}

export function showActionDialogs(showDialog, post_id, dialogType) {
    return dispatch => {
        dispatch(showactionDialog(post_id, showDialog, dialogType))
    };
}

function showactionDialog(post_id, showDialog, dialogType) {
    return {
        type: constants.SHOW_PROFILE_POST_DIALOG,
        dialogType: dialogType,
        post_id: post_id,
        showDialog: showDialog
    };
}


export function followUser(index, jsonObject, stateClassType) {
    var classType = stateClassType;
    var index = index;

    return dispatch => {
        dispatch(fetchingProfile());
        followerFollowingApis.followUser(jsonObject).then(
            response => {
                dispatch(hideFetchingProfile())
                if (response.status === "true") {
                    dispatch(updateUserProfile(response.follow_status, index, classType))
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

function updateUserProfile(status, index, classType) {
    return {
        type: constants.UPDATE_ANOTHER_USER_PROFILE,
        payload: status,
        ind: index,
        class: classType
    }
}



export function deletePost(index, jsonObject) {
    var index = index;
    return dispatch => {
        dispatch(fetchingProfile());
        commonApis.deletePost(jsonObject, true).then(
            response => {
                dispatch(hideFetchingProfile());
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
        type: constants.POST_DELETED_SUCCESSFULLY_PROFILE,
        ind: index
    }
}


// BlockUser fucntions 
export function blockUser(user_id, jsonObject) {
    var userId = user_id;
    return dispatch => {
        dispatch(fetchingProfile());
        commonApis.blockUser(jsonObject).then(
            response => {
                dispatch(hideFetchingProfile());
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
        type: constants.BLOCKED_USER_POST_PROFILE,
        payload: userId
    }
}

export function muteUser(user_id, jsonObject) {
    var userId = user_id;
    return dispatch => {
        dispatch(fetchingProfile());
        commonApis.blockUser(jsonObject).then(
            response => {
                dispatch(hideFetchingProfile());
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
        dispatch(fetchingProfile());
        commonApis.reportSpark(jsonObject).then(
            response => {
                dispatch(hideFetchingProfile())
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


export function postVotePoll(URL, jsonObject) {
    return dispatch => {
        dispatch(fetchingProfile());
        commonApis.postVotePollApi(jsonObject, URL).then(
            response => {
                dispatch(hideFetchingProfile());
                if (response.status === "true") {
                    dispatch(updateValueAtIndex(response.updated_post))
                    showError("Success", response.msg)
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