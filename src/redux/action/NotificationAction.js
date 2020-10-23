import * as constants from '../../utils/Constants';
import { showError } from "../../utils/Utilities";
import * as notificationApis from "../../Service/NotificationApis";

export function getNotificationList(jsonObject) {
    return dispatch => {
        dispatch(showLoader())
        notificationApis.getNotificationList(jsonObject).then(
            response => {
                dispatch(hideLoader())
                if (response.status == "true") {
                    dispatch(success(response.response))
                } else {
                    showError("Error " + response.msg)
                    dispatch(failure())
                }
            },
            error => {
                showError("Error " + error)
                dispatch(failure())
            }
        )
    }
}

function showLoader() {
    return {
        type: constants.FETCHING_NOTIFICATION
    };
}

function hideLoader() {
    return {
        type: constants.HIDE_FETCHING_NOTIFICATION
    };
}

function success(response) {
    return {
        type: constants.NOTIFICATION_SUCCESS,
        payload: response
    };
}

function failure() {
    return {
        type: constants.NOTIFICATION_FAILURE
    }
}
