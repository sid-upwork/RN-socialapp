import * as constants from '../../utils/Constants';

const initialState = {
    searchResponse: '',
    isFetching: false,
    error: true,
    post_id: '',
    showDialog: false,
    dialogType: '',
    searchDataList: {
        "username": [],
        "hashtag": [],
        "string": []
    },
    searchError: false
}

export default function searchReducer(state = initialState, action) {

    switch (action.type) {
        case constants.FETCHING_SEARCH:
            return {
                ...state,
                isFetching: true
            }
        case constants.HIDE_FETCHING_SEARCH:
            return {
                ...state,
                isFetching: false
            }
        case constants.FETCH_SEARCH_SUCCESS:
            return {
                ...state,
                error: false,
                searchResponse: action.payload
            }
        case constants.FETCH_SEARCH_FAILURE:
            return {
                ...state,
                error: true,
                searchResponse: ''
            }
        case constants.SHOW_SEARCH_SHARE_DIALOG:
            return {
                ...state,
                dialogType: action.dialogType,
                post_id: action.post_id,
                showDialog: action.showDialog
            }
        case constants.HIDE_SEARCH_SHARE_DIALOG:
            return {
                ...state,
                post_id: "",
                showDialog: false,
                error: false
            }
        case constants.UPDATE_SEARCH_INDEX:
            return {
                ...state,
                post_id: "",
                showDialog: false,
                error: false,
                searchResponse: {
                    ...state.searchResponse,
                    tagsPost: state.searchResponse.tagsPost.map(spark =>
                        spark.post_id === action.payload[0].post_id
                            ? { ...spark, ...action.payload[0] }
                            : spark)
                }
            }
        case constants.POST_DELETED_SUCCESSFULLY_SEARCH:
            console.log(action.payload)
            state.searchResponse.tagsPost.splice(action.payload, 1)
            var tagsPost = state.searchResponse.tagsPost

            console.log(tagsPost)
            return {
                ...state,
                searchResponse: {
                    ...state.searchResponse,
                    commentData: tagsPost.length <= 0 ? [] : tagsPost
                }
            }
        case constants.BLOCKED_USER_POST_SEARCH:
            return {
                ...state,
                searchResponse: {
                    ...state.searchResponse,
                    tagsPost: state.searchResponse.tagsPost.filter(comment => comment.user_id !== action.payload)
                }
            }
        case constants.INITIAL_STATE_SEARCH_DETAIL:
            return {
                ...state,
                searchDataList: {
                    "username": [],
                    "hashtag": [],
                    "string": []
                },
                searchError: false
            }
        case constants.SEARCHED_KEY_SUCCESS:
            return {
                ...state,
                searchDataList: action.payload,
                searchError: false
            }
        case constants.SEARCHED_KEY_FAILURE:
            return {
                ...state,
                searchDataList: {
                    "username": [],
                    "hashtag": [],
                    "string": []
                },
                searchError: true
            }
        default:
            return state
    }
}