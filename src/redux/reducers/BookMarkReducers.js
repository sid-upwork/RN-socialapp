import * as constants from "../../utils/Constants";

const initialState = {
    isFetching: false,
    bookmarkData: [],
    error: true,
    post_id: '',
    showDialog: false,
    dialogType: ''
}

export default function bookmarkReducer(state = initialState, action) {

    switch (action.type) {
        case constants.FETCHING_BOOKMARK:
            return {
                ...state,
                isFetching: true,
            }
        case constants.HIDE_FETCHING_BOOKMARK:
            return {
                ...state,
                isFetching: false,
            }
        case constants.FETCHED_BOOKMARK_SUCCESS:
            return {
                ...state,
                post_id: "",
                showDialog: false,
                error: false,
                bookmarkData: action.payload
            }
        case constants.FETCH_BOOKMARK_FAILURE:
            return {
                ...state,
                error: true,
                bookmarkData: []
            }
        case constants.SHOW_SHARE_DIALOG_BOOKMARK:
            return {
                ...state,
                dialogType: action.dialogType,
                post_id: action.post_id,
                showDialog: action.showDialog
            }

        case constants.UPDATE_INDEX_IN_BOOKMARK:
            return {
                ...state,
                post_id: "",
                showDialog: false,
                error: false,
                bookmarkData: state.bookmarkData.map(spark =>
                    spark.post_id === action.payload[0].post_id
                        ? { ...spark, ...action.payload[0] }
                        : spark
                )
            }
        case constants.REMOVE_BOOKMARK:
            return {
                ...state,
                bookmarkData: state.bookmarkData.filter(spark => spark.post_id !== action.payload[0].post_id)
            }

        case constants.BOOKMARK_DELETED_SUCCESSFULLY:
            state.bookmarkData.splice(action.payload, 1)
            var deleteBookmark = state.bookmarkData
            return {
                ...state,
                bookmarkData: deleteBookmark.length <= 0 ? [] : deleteBookmark
            }

        case constants.BLOCKED_USER_BOOKMARK:
            return {
                ...state,
                bookmarkData: state.bookmarkData.filter(spark => spark.user_id !== action.payload)
            }
        default:
            return state
    }
}