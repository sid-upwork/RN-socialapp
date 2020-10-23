import * as  verificationApi from "../../Service/VerficationApi";
import { showError } from "../../utils/Utilities";
import * as constants from "../../utils/Constants";

export function kitState(email, phone) {
    return dispatch => {
        dispatch(kitVerifiedState(email, phone))
    }
}

function kitVerifiedState(email, phone) {
    return {
        type: constants.INITIAL_VERFICATION_STATE,
        email: email,
        phone: phone
    }
}

export function afterVerificationKit(jsonObj, actionType) {
    return dispatch => {
        dispatch(verifying())
        verificationApi.verifyUser(jsonObj)
            .then(response => {
                if (response.status == "true" && response.response == "1") {

                    dispatch(verified(actionType, response.user))
                } else {
                    showError("Error: " + "Something went wrong!")
                }
            }, error => {
                showError("Error: " + "Something went wrong!")
            })
    }
}

function verifying() {
    return {
        type: constants.VERIFYING,
    };
}

function verified(actionType, user) {
    return {
        type: constants.VERIFYING_SUCCESS,
        payload: actionType,
        userResponse: user
    }
}
