import * as constants from '../../utils/Constants';

const initialState = {
    emailVerfied: "",
    mobileVerified: "",
    loading: false,
    loginResponse: ''
}

export default function verifyReducer(state = initialState, action) {

    switch (action.type) {
        case constants.VERIFYING:
            return {
                ...state,
                loading: true,
                loginResponse: ''
            }
        case constants.INITIAL_VERFICATION_STATE:
            return {
                ...state,
                mobileVerified: action.phone,
                emailVerfied: action.email,
                loginResponse: ""
            }
        case constants.VERIFYING_SUCCESS:
            if (action.payload == "email") {
                state.emailVerfied = "1"
            } else {
                state.mobileVerified = "1"
            }
            return {
                ...state,
                loading: false,
                loginResponse: action.userResponse
            }

        default:
            return state
    }
}