import * as constants from "../../utils/Constants";

const initialState = {
    isFetchingResponse: false,
    helpResponse: "",
    error: false
}

export default function helpReducer(state = initialState, action) {

    switch (action.type) {
        case constants.FETCHING_HELP_CENTER:
            return {
                ...state,
                isFetchingResponse: true
            }
        case constants.HELP_CENTER_SUCCESS:
            return {
                isFetchingResponse: false,
                error: false,
                helpResponse: action.payload
            }
        case constants.HELP_CENTER_FAILURE:
            return {
                ...state,
                isFetchingResponse: false,
                error: true,
            }
        default:
            return state
    }
}

