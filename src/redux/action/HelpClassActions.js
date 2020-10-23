import * as constants from "../../utils/Constants";
import * as helpCenterApis from "../../Service/HelpCenterApis";
import { showError } from '../../utils/Utilities';

export function getHelpCenterUrls() {
    return dispatch => {
        dispatch(fetching());

        helpCenterApis.getHelpCenterUrls().then(
            response => {
                if (response.status === "true") {
                    dispatch(helpClassSuccess(response))
                } else {
                    dispatch(helpClassFailure())
                }
            },
            error => {
                showError("Failure " + error)
                dispatch(helpClassFailure())
            }
        )
    };
}

function fetching() {
    return {
        type: constants.FETCHING_HELP_CENTER
    };
}

function helpClassSuccess(response) {
    return {
        type: constants.HELP_CENTER_SUCCESS,
        payload: response.response
    };
}

function helpClassFailure() {
    return {
        type: constants.HELP_CENTER_FAILURE
    };
}