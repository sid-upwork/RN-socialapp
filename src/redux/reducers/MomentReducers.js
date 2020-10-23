import * as constants from '../../utils/Constants';

const initialState = {
    momentData: '',
    isFetching: false,
    error: false,
    momentDetailData: '',
    momentDetailError: false
}

export default function momentReducer(state = initialState, action) {
    switch (action.type) {
        case constants.FETCHING_MOMENT:
            return {
                ...state,
                isFetching: true
            }
        case constants.HIDE_LOADER_MOMENTS:
            return {
                ...state,
                isFetching: false
            }
        case constants.MOMENT_DATA_SUCCESS:
            return {
                ...state,
                error: false,
                momentData: action.payload,
            }
        case constants.MOMENT_DATA_FAILURE:
            return {
                ...state,
                error: true,
                momentData: ''
            }
        case constants.MOMENT_DETAIL_SUCCESS:
            return {
                ...state,
                momentDetailError: false,
                momentDetailData: action.payload,
            }
        case constants.MOMENT_DETAIL_FAILURE:
            return {
                ...state,
                momentDetailError: true,
                momentDetailData: ''
            }
        case constants.DELETE_MOMENT_SUCCESS:
            state.momentData.splice(action.payload, 1)
            return {
                ...state
            }

        case constants.NO_MOMENT_AVAILABLE:
            return {
                ...state,
                momentDetailError: true,
                momentDetailData: ''
            }
        case constants.UPDATE_LIKE_STATUS:
            state.momentDetailData.momentsDetail.likeStatus = action.payload.likeStatus
            state.momentDetailData.momentsDetail.totalLikes = action.payload.totalLikes
            return {
                ...state
            }

        case constants.DELETE_ATTACHED_TWEET_MOMENT_SUCCESS:
            state.momentDetailData.momentsDetail.posts.splice(action.payload, 1)
            return {
                ...state
            }
        default:
            return state
    }
}


