import * as constants from '../../utils/Constants';

const initialState = {

    isFetching: false,
    post_id: '',
    showDialog: false,
    dialogType: '',
    classname: "",
    searchResult: {
        "topData": [],
        "latestData": [],
        "peopleData": [],
        "videosData": [],
        "photosData": []
    },
    searchResultError: false
}

export default function searchReducer(state = initialState, action) {

    switch (action.type) {
        case constants.FETCHING_SEARCH_DETAIL:
            return {
                ...state,
                isFetching: true
            }
        case constants.HIDE_FETCHING_SEARCH_DETAIL:
            return {
                ...state,
                isFetching: false
            }
        case constants.SEARCHED_RESULT_FOR_HASTAG_AND_STRINGS:
            return {
                ...state,
                searchResult: action.payload,
                searchResultError: false
            }
        case constants.SEARCHED_RESULT_FOR_HASTAG_AND_STRINGS_ERROR:
            return {
                ...state,
                searchResult: {
                    "topData": [],
                    "latestData": [],
                    "peopleData": [],
                    "videosData": [],
                    "photosData": []
                },
                searchResultError: true
            }
        case constants.SHOW_SEARCH_DETAIL_SHARE_DIALOG:
            return {
                ...state,
                dialogType: action.dialogType,
                post_id: action.post_id,
                showDialog: action.showDialog,
                classname: action.classname
            }
        case constants.HIDE_SEARCH_DETAIL_SHARE_DIALOG:
            return {
                ...state,
                post_id: "",
                showDialog: false,
                error: false,
                classname: ""
            }

        case constants.UPDATE_SEARCH_DETAIL_INDEX:
            var topArray = state.searchResult.topData;
            var latestArray = state.searchResult.latestData;
            var videoArray = state.searchResult.videosData;
            if (action.classname == "top" || state.classname == "top") {
                topArray = state.searchResult.topData.map(spark =>
                    spark.post_id === action.payload[0].post_id
                        ? { ...spark, ...action.payload[0] }
                        : spark
                )
            } else if (action.classname == "video" || state.classname == "video") {
                videoArray = state.searchResult.videosData.map(spark =>
                    spark.post_id === action.payload[0].post_id
                        ? { ...spark, ...action.payload[0] }
                        : spark
                )
            } else {
                latestArray = state.searchResult.latestData.map(spark =>
                    spark.post_id === action.payload[0].post_id
                        ? { ...spark, ...action.payload[0] }
                        : spark
                )
            }
            return {
                ...state,
                searchResult: {
                    ...state.searchResult,
                    topData: topArray,
                    latestData: latestArray,
                    videosData: videoArray
                }
            }

        case constants.POST_DELETED_SUCCESSFULLY_SEARCH_DETAIL:
            if (action.classname == "top" || state.classname == "top") {
                state.searchResult.topData.splice(action.ind, 1)
            } else if (action.classname == "video" || state.classname == "video") {
                state.searchResult.videosData.splice(action.ind, 1)
            } else {
                state.searchResult.latestData.splice(action.ind, 1)
            }
            return {
                ...state,
                searchResult: {
                    ...state.searchResult,
                    topData: state.searchResult.topData,
                    latestData: state.searchResult.latestData,
                    videosData: state.searchResult.videosData
                }
            }

        case constants.BLOCKED_USER_POST_SEARCH_DETAIL:

            var topArray = state.searchResult.topData;
            var latestArray = state.searchResult.latestData;
            var videoArray = state.searchResult.videosData;
            if (action.classname == "top" || state.classname == "top") {
                topArray = state.searchResult.topData.filter(spark => spark.user_id !== action.payload)
            } else if (action.classname == "video" || state.classname == "video") {
                videoArray = state.searchResult.videosData.filter(spark => spark.user_id !== action.payload)
            } else {
                latestArray = state.searchResult.latestData.filter(spark => spark.user_id !== action.payload)
            }
            return {
                ...state,
                searchResult: {
                    ...state.searchResult,
                    topData: topArray,
                    latestData: latestArray,
                    videosData: videoArray
                }
            }

        case constants.SEARCH_DETAIL_FOLLOW_UNFOLLOW:
            state.searchResult.peopleData =
                state.searchResult.peopleData.map((val, index) => {
                    if (index == action.ind) {
                        return { ...val, followStatus: action.statuss };
                    }
                    return { ...val };
                })
            return {
                ...state
            }
        default:
            return state
    }
}