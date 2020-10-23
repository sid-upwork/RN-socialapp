import * as constants from '../../utils/Constants';

const initialState = {
    homeSparksResponse: [],
    isFetching: false,
    error: false,
    post_id: '',
    showDialog: false,
    dialogType: ''
}

export default function HomeReducer(state = initialState, action) {
    switch (action.type) {
        case constants.FETCHING_HOME:
            return {
                ...state,
                isFetching: true
            }
        case constants.HIDE_FETCHING_HOME:
            return {
                ...state,
                isFetching: false
            }
        case constants.FETCH_HOME_SUCCESS:
            return {
                ...state,
                post_id: "",
                showDialog: false,
                homeSparksResponse: action.payload,
                error: false
            }
        case constants.FETCH_HOME_FAILURE:
            return {
                ...state,
                homeSparksResponse: [],
                error: true
            }
        case constants.SHOW_HOME_SHARE_DIALOG:
            return {
                ...state,
                dialogType: action.dialogType,
                post_id: action.post_id,
                showDialog: action.showDialog
            }
        case constants.UPDATE_INDEX_IN_HOME:
            return {
                ...state,
                homeSparksResponse: state.homeSparksResponse.map(spark =>
                    spark.post_id === action.payload[0].post_id
                        ? { ...spark, ...action.payload[0] }
                        : spark
                )
            }
        case constants.HIDE_DIALOGS_HOME:
            return {
                ...state,
                post_id: "",
                showDialog: false,
                error: false
            }
        case constants.POST_DELETED_SUCCESSFULLY:
            state.homeSparksResponse.splice(action.ind, 1)
            return {
                ...state,
            }

        case constants.BLOCKED_USER_POST:
            return {
                ...state,
                homeSparksResponse: state.homeSparksResponse.filter(spark => spark.user_id !== action.payload)
            }
        default:
            return state
    }
}