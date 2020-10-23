import * as constants from '../../utils/Constants';

const initialState = {
    profileResponse: {
        user_id: "",
        'myTweets': [],
        'postLikes': []
    },
    isFetching: false,
    error: false,
    userId: "",
    post_id: '',
    showDialog: false,
    dialogType: '',
    userBlocked: false
}

export default function ProfileReducer(state = initialState, action) {
    switch (action.type) {
        case constants.PROFILE_FETCHING:
            return {
                ...state,
                isFetching: true,
                userBlocked: false
            }
        case constants.PROFILE_FETCHING_DONE:
            return {
                ...state,
                isFetching: false
            }
        case constants.PROFILE_DATA_SUCCESS:
            return {
                ...state,
                post_id: "",
                showDialog: false,
                error: false,
                profileResponse: action.payload,
                userId: action.payload.user_id
            }
        case constants.PROFILE_DATA_FAILURE:
            return {
                ...state,
                error: true,
                profileResponse: {
                    'myTweets': [],
                    'postLikes': []
                },
            }
        case constants.SHOW_PROFILE_POST_DIALOG:
            return {
                ...state,
                dialogType: action.dialogType,
                post_id: action.post_id,
                showDialog: action.showDialog
            }
        case constants.UPDATE_INDEX_PROFILE:
            return {
                ...state,
                post_id: "",
                showDialog: false,
                error: false,
                profileResponse: {
                    ...state.profileResponse,
                    myTweets: state.profileResponse.myTweets.map(spark =>
                        spark.post_id === action.payload[0].post_id
                            ? { ...spark, ...action.payload[0] }
                            : spark)
                }

            }
        case constants.UPDATE_ANOTHER_USER_PROFILE:
            if (action.class == "FollowingClass") {
                state.profileResponse.followings = state.profileResponse.followings.map((val, index) => {
                    if (index == action.ind) {
                        return { ...val, status: action.payload };
                    }
                    return { ...val };
                })

            } else {
                state.profileResponse.followers = state.profileResponse.followers.map((val, index) => {
                    if (index == action.ind) {
                        return { ...val, status: action.payload };
                    }
                    return { ...val };
                })
            }
            return {
                ...state
            }

        case constants.POST_DELETED_SUCCESSFULLY_PROFILE:
            state.profileResponse.myTweets.splice(action.ind, 1)
            return {
                ...state,
            }

        case constants.BLOCKED_USER_POST_PROFILE:
            state.userBlocked = true
            state.profileResponse = state.profileResponse.myTweets.filter(spark => spark.user_id !== action.payload)
            return {
                ...state,
            }
        default:
            return state
    }
}


