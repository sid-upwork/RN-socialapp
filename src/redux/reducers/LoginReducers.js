import * as constants from "../../utils/Constants";

const initialState = {
    loginResposneObj: '',
    isFetchingResponse: false,
    error: false
}

export default function LoginReducer(state = initialState, action) {

    switch (action.type) {
        case constants.FETCHING_LOGIN:
            return {
                ...state,
                isFetchingResponse: true,
                loginResposneObj: ""
            }
        case constants.LOGIN_SUCCESS:
            return {
                isFetchingResponse: false,
                error: false,
                loginResposneObj: action.payload
            }
        case constants.LOGIN_FAILURE:
            return {
                isFetchingResponse: false,
                error: true,
                loginResposneObj: action.payload
            }
        default:
            return state
    }
}


