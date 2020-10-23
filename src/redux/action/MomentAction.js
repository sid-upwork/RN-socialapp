import * as constants from '../../utils/Constants';
import * as momentApis from "../../Service/MomentApis";
import { showError } from "../../utils/Utilities";

export function getMomentList(jsonObject) {
    return dispatch => {
        dispatch(fetchingMomentResponse())
        momentApis.getMomentList(jsonObject).then(
            response => {
                dispatch(hideLoader());
                if (response.status === "true") {
                    dispatch(momentSuccess(response.moments_list))
                } else {
                    showError("Error: " + response.msg)
                    dispatch(momentFailure("Error: " + response.msg))
                }
            },
            error => {
                showError("Failure " + error)
                dispatch(momentFailure(error))
            }
        )
    }
}

export function dispatchDeleteMoment(jsonObject, index) {
    var momentIndex = index;
    return dispatch => {
        dispatch(fetchingMomentResponse())
        momentApis.deleteMoment(jsonObject).then(
            response => {
                dispatch(hideLoader());
                if (response.status === "true") {
                    dispatch(deleteMomentDetailSuccess(momentIndex))
                } else {
                    showError("Error: " + response.msg)
                }
            },
            error => {
                showError("Failure " + error)
            }
        )
    }
}

export function getMomentDetail(jsonObject) {
    return dispatch => {
        dispatch(fetchingMomentResponse())
        momentApis.getMomentDetail(jsonObject).then(
            response => {
                dispatch(hideLoader());
                if (response.status === "true") {
                    dispatch(momentDetailSuccess(response));
                } else {
                    showError("Failure: " + response.msg)
                    dispatch(momentDetailFailure("Failure: " + response.msg))
                }
            },
            error => {
                showError("Failure " + error)
                dispatch(momentDetailFailure(error))
            }
        )
    }
}


export function likeMoment(jsonObject) {
    return dispatch => {
        dispatch(fetchingMomentResponse())
        momentApis.likeMoment(jsonObject).then(
            response => {
                dispatch(hideLoader());
                if (response.status === "true") {
                    dispatch(updateLikeStatus(response.moment_status));
                } else {
                    showError("Failure: " + response.msg)
                }
            },
            error => {
                showError("Failure " + error)
            }
        )
    }
}

export function tweetMoment(jsonObject) {
    return dispatch => {
        dispatch(fetchingMomentResponse())
        momentApis.tweetMoment(jsonObject).then(
            response => {
                dispatch(hideLoader());
                if (response.status === "true") {
                    showError("Success: " + response.msg)
                } else {
                    showError("Failure: " + response.msg)
                }
            },
            error => {
                showError("Failure " + error)
            }
        )
    }
}


export function deleteAttachedTweetFromMoment(jsonObject, index) {
    var index = index;
    return dispatch => {
        dispatch(fetchingMomentResponse())
        momentApis.tweetMoment(jsonObject).then(
            response => {
                dispatch(hideLoader());
                if (response.status === "true") {
                    dispatch(deleteTweetFromMoment(index));
                } else {
                    showError("Failure: " + response.msg)
                }
            },
            error => {
                showError("Failure " + error)
            }
        )
    }
}

export function momentDetailUnavailable() {
    return dispatch => {
        dispatch(noMomentAvailable());
    }
}

function noMomentAvailable() {
    return {
        type: constants.NO_MOMENT_AVAILABLE
    }
}


function fetchingMomentResponse() {
    return {
        type: constants.FETCHING_MOMENT,
    };
}

function hideLoader() {
    return {
        type: constants.HIDE_LOADER_MOMENTS,
    };
}

function momentSuccess(response) {
    return {
        type: constants.MOMENT_DATA_SUCCESS,
        payload: response
    };
}

function momentFailure(error) {
    return {
        type: constants.MOMENT_DATA_FAILURE,
        payload: error
    };
}

function momentDetailSuccess(response) {
    return {
        type: constants.MOMENT_DETAIL_SUCCESS,
        payload: response
    };
}

function momentDetailFailure(error) {
    return {
        type: constants.MOMENT_DETAIL_FAILURE,
        payload: error
    };
}
function updateLikeStatus(data) {
    return {
        type: constants.UPDATE_LIKE_STATUS,
        payload: data
    };
}

function deleteMomentDetailSuccess(index) {
    return {
        type: constants.DELETE_MOMENT_SUCCESS,
        payload: index
    };
}

function deleteTweetFromMoment(index) {
    return {
        type: constants.DELETE_ATTACHED_TWEET_MOMENT_SUCCESS,
        payload: index
    };
}

