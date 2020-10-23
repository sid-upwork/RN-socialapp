import * as constants from '../../utils/Constants';

const initialState = {
    isFetching: false,
    error: false,
    notificationData: []
}

export default function notificationReducer(state = initialState, action) {

    switch (action.type) {
        case constants.FETCHING_NOTIFICATION:
            return {
                ...state,
                isFetching: true
            }
        case constants.HIDE_FETCHING_NOTIFICATION:
            return {
                ...state,
                isFetching: false
            }
        case constants.NOTIFICATION_SUCCESS:
            return {
                ...state,
                error: false,
                notificationData: action.payload
            }
        case constants.NOTIFICATION_FAILURE:
            return {
                ...state,
                error: true,
                notificationData: []
            }
        default:
            return state
    }
}


