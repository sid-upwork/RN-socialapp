import * as constants from '../../utils/Constants';
const initialState = {
    isFetching: false,
    followerFollowingData: '',
    error: true
}

export default function ChangeUserVariableReducer(state = initialState, action) {

    switch (action.type) {
        case constants.FETCHING_FOLLOWER:
            return {
                ...state,
                isFetching: true,
            }
        case constants.HIDE_FETCHING_FOLLOWER:
            return {
                ...state,
                isFetching: false,
            }
        case constants.FETCH_FOLLOWER_SUCCESS:
            return {
                ...state,
                error: false, isFetching: false,
                followerFollowingData: action.payload
            }
        case constants.FETCH_FOLLOWER_FAILURE:
            return {
                ...state,
                error: true, isFetching: false,
                followerFollowingData: ''
            }
        case constants.UNFOLLOW_USER:
            state.followerFollowingData.followings.splice(action.payload, 1);
            var afterDeletedUser = state.followerFollowingData.followings
            return {
                ...state, isFetching: false,
                followerFollowingData: {
                    ...state.followerFollowingData,
                    followings: afterDeletedUser.length <= 0 ? [] : afterDeletedUser
                }
            }

        case constants.ACCEPT_REJECT_USER:
            state.followerFollowingData.follow_request.splice(action.payload, 1);
            var afterAcceptRejectUser = state.followerFollowingData.follow_request
            return {
                ...state, isFetching: false,
                followerFollowingData: {
                    ...state.followerFollowingData,
                    follow_request: afterAcceptRejectUser.length <= 0 ? [] : afterAcceptRejectUser
                }
            }
        case constants.FOLLOW_UNFOLLOW_USERS:
            if (action.classnames == "FollowerClass") {
                state.followerFollowingData.followers =
                    state.followerFollowingData.followers.map((val, index) => {
                        if (index == action.ind) {
                            return { ...val, status: action.statuss };
                        }
                        return { ...val };
                    })
            } else {
                state.followerFollowingData.suggestion =
                    state.followerFollowingData.suggestion.map((val, index) => {
                        if (index == action.ind) {
                            return { ...val, status: action.statuss };
                        }
                        return { ...val };
                    })
            }
            return {
                ...state,
                isFetching: false,
            }
        default:
            return state
    }
}