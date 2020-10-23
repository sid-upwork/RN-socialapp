import * as constants from '../../utils/Constants';
import * as followerFollowingApis from "../../Service/FollowerFollowingApis";
import { showError } from "../../utils/Utilities";

export function getFollowingFollowerList(jsonObject) {
    return dispatch => {
        dispatch(fetchingUser());
        followerFollowingApis.getFollowingFollowerList(jsonObject).then(
            response => {
                dispatch(hidefetchingUser())
                if (response.status == "true") {
                    dispatch(Success(response));
                } else {
                    showError("Error " + response.msg)
                    dispatch(Failure())
                }
            },
            error => {
                showError("Error " + error)
                dispatch(Failure(error))
            }
        )
    }
}

export function followUser(index, jsonObject, className) {
    var index = index;
    return dispatch => {
        dispatch(fetchingUser());
        followerFollowingApis.followUser(jsonObject).then(
            response => {
                dispatch(hidefetchingUser())
                if (response.status === "true") {
                    if (className == 'FollowingClass') {
                        showError("Success ! " + response.msg)
                        dispatch(followUnfollowSuccessForFollowingClass(index))
                        response.follow_status != "0" ? dispatch(addFollowings()) : dispatch(removeFollowings())

                    } else if (className == 'FollowerClass') {
                        dispatch(followUnfollowSuccessForFollowerClass(response.follow_status, index, className))
                        response.follow_status != "0" ? dispatch(addFollowers()) : dispatch(removeFollowers())
                  
                    } else if (className == "SuggestionClass") {
                        dispatch(followUnfollowSuccessForFollowerClass(response.follow_status, index, className))
                        response.follow_status != "0" ? dispatch(addFollowers()) : dispatch(removeFollowers())

                    }
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

export function acceptUserRequest(index, jsonObject) {
    var index = index;
    return dispatch => {
        dispatch(fetchingUser());
        followerFollowingApis.acceptUserRequest(jsonObject).then(
            response => {
                dispatch(hidefetchingUser())
                if (response.status == "true") {
                    dispatch(acceptRejectUserfromRequest(index))
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

function fetchingUser() {
    return {
        type: constants.FETCHING_FOLLOWER,
    };
}
function hidefetchingUser() {
    return {
        type: constants.HIDE_FETCHING_FOLLOWER,
    };
}
function Success(data) {
    return {
        type: constants.FETCH_FOLLOWER_SUCCESS,
        payload: data
    };
}
function Failure() {
    return {
        type: constants.FETCH_FOLLOWER_FAILURE
    };
}
function followUnfollowSuccessForFollowingClass(index) {
    return {
        type: constants.UNFOLLOW_USER,
        payload: index
    }
}
function acceptRejectUserfromRequest(index) {
    return {
        type: constants.ACCEPT_REJECT_USER,
        payload: index
    }
}

function followUnfollowSuccessForFollowerClass(status, index, classname) {
    return {
        type: constants.FOLLOW_UNFOLLOW_USERS,
        ind: index,
        statuss: status,
        classnames: classname
    }
}





function addFollowers() {
    return {
        type: constants.ADD_FOLLOWER_SIDE_BAR
    }
}
function removeFollowers() {
    return {
        type: constants.REMOVE_FOLLOWER_SIDE_BAR
    }
}
function addFollowings() {
    return {
        type: constants.ADD_FOLLOWINGS_SIDE_BAR
    }
}
function removeFollowings() {
    return {
        type: constants.REMOVE_FOLLOWINGS_SIDE_BAR
    }
}