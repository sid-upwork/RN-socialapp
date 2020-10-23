import * as constants from '../../utils/Constants';
import { Alert, AsyncStorage } from "react-native";
import {
    POST,
    APP_HEADER,
    GET_USER_ACCOUNT_SETTING,
    BLOCK_USER,
    SET_USER_PRIVACY,
    LOG_OUT, DEACTIVATE_ACCOUNT, CHANGE_USER_DETAIL,
    SET_NOTIFICATIONS_SETTING,
    MUTE_USER
} from '../../utils/URLs';
import { showError } from "../../utils/Utilities";

export function initializeReducer() {
    return dispatch => {
        dispatch(initializeReducerValue())
    }
}
function initializeReducerValue() {
    return { type: constants.INITIALIZE_SETTING_REDUCER }
}
//Setting functions
export function getAccountSettings(jsonObject, user_Id) {
    const userId = user_Id;
    return dispatch => {
        dispatch(fetchingAccountSetting());
        return fetch(GET_USER_ACCOUNT_SETTING, {
            method: POST,
            headers: APP_HEADER,
            body: jsonObject
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.data.status === "true") {
                    dispatch(accountSettingSuccess(responseJson.data.settings, userId));

                } else {
                    showError("Error " + responseJson.data.msg)
                    dispatch(accountSettingFailure())
                }
            })
            .catch((error) => {
                console.error(error);
                dispatch(accountSettingFailure(error))
            });
    }
}

function fetchingAccountSetting() {
    return {
        type: constants.FETCHING_SETTNGS,
    }
}

function accountSettingSuccess(data, userId) {
    return {
        type: constants.SUCCESS_SETTING_DATA,
        payload: data,
        userId: userId
    }
}

function accountSettingFailure() {
    return {
        type: constants.FAILURE_SETTING_DATA
    }
}

// UnBlockUser fucntions 
export function unblockUser(jsonObject, itemIndex) {
    var index = itemIndex;
    return dispatch => {
        dispatch(fetchingBlockedUserList());
        return fetch(BLOCK_USER, {
            method: POST,
            headers: APP_HEADER,
            body: jsonObject
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson)
                if (responseJson.data.status === "true") {
                    dispatch(removeUserFromBlockedUserList(index));
                } else {
                    showError("Error : " + responseJson.data.msg)
                    dispatch(removingFailure())
                }
            })
            .catch((error) => {
                dispatch(removingFailure(error))
            });
    }
}

function fetchingBlockedUserList() {
    return {
        type: constants.UPDATING_BLOCK_LIST,
    }
}

function removeUserFromBlockedUserList(index) {
    return {
        type: constants.REMOVE_USER_FROM_BLOCKED_LIST,
        payload: index
    }
}

function removingFailure() {
    return {
        type: constants.REMOVING_USER_FROM_BLOCKED_LIST_FAILURE
    }
}


// Unmute User
export function unMuteUser(jsonObject, itemIndex) {
    var index = itemIndex;
    return dispatch => {
        dispatch(fetchingBlockedUserList());
        return fetch(MUTE_USER, {
            method: POST,
            headers: APP_HEADER,
            body: jsonObject
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson)
                if (responseJson.data.status === "true") {
                    dispatch(removeUserFromMuteUserList(index));
                } else {
                    showError("Error : " + responseJson.data.msg)
                    dispatch(removingFailure())
                }
            })
            .catch((error) => {
                dispatch(removingFailure(error))
            });
    }
}

function removeUserFromMuteUserList(index) {
    return {
        type: constants.REMOVE_USER_FROM_MUTE_LIST,
        payload: index
    }
}

function removingFailure() {
    return {
        type: constants.REMOVING_USER_FROM_MUTE_LIST_FAILURE
    }
}




//Privacy functions
export function editPrivacy(jsonObject) {
    return dispatch => {
        dispatch(updatingUserPrivacy());
        return fetch(SET_USER_PRIVACY, {
            method: POST,
            headers: APP_HEADER,
            body: jsonObject
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.data.status === "true") {
                    console.log(responseJson.data.privacyData);
                    dispatch(updatingPrivacySuccess(responseJson.data.privacyData));
                    dispatch(updateSideBarReducer(responseJson.data.privacyData))
                } else {
                    showError("Error " + responseJson.data.msg)
                    dispatch(updatingPrivacyFailure())
                }
            })
            .catch((error) => {
                console.error(error);
                dispatch(removinupdatingPrivacyFailuregFailure(error))
            });
    }
}

function updatingUserPrivacy() {
    return {
        type: constants.UPDATING_USER_PRIVACY,
    };
}

function updatingPrivacySuccess(index) {
    return {
        type: constants.UPDATING_PRIVACY_SUCCESS,
        payload: index
    };
}

function updatingPrivacyFailure() {
    return {
        type: constants.UPDATING_PRIVACY_FAILURE
    };
}

// UpdateSideBar 
function updateSideBarReducer(value) {
    return {
        type: constants.UPDATE_PRIVACY_STATUS,
        value: value
    }
}




//Notification functions
export function changeNotificationValue(jsonObject, isTypeEmail) {
    var isTypeEmail = isTypeEmail;
    return dispatch => {
        dispatch(updatingNotificationSetting());
        return fetch(SET_NOTIFICATIONS_SETTING, {
            method: POST,
            headers: APP_HEADER,
            body: jsonObject
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.data.status === "true") {
                    console.log(responseJson.data);
                    dispatch(updatedNotificationSuccess(responseJson.data.response, isTypeEmail));
                } else {
                    dispatch(updatedNotificationFailure())
                    showError("Error " + responseJson.data.msg)
                }
            })
            .catch((error) => {
                showError("Error " + error)
                dispatch(updatedNotificationFailure())
            });
    }
}

function updatingNotificationSetting() {
    return {
        type: constants.UPDATING_NOTIFICATION_SETTING,
    }
}

function updatedNotificationSuccess(response, isTypeEmail) {
    return {
        type: constants.UPDATED_NOTIFICATION_SETTING_SUCCESS,
        payload: response,
        isEmail: isTypeEmail
    }
}

function updatedNotificationFailure() {
    return {
        type: constants.UPDATED_NOTIFICATION_SETTING_FAILURE
    }
}



// Account Settings
export function changeUserVariable(jsonObject) {
    return dispatch => {
        dispatch(showLoader());
        return fetch(CHANGE_USER_DETAIL, {
            method: POST,
            headers: APP_HEADER,
            body: jsonObject
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson)
                if (responseJson.data.status === "true") {
                    console.log(responseJson.data.userdata);
                    var loginResposneObj = responseJson.data.userdata;
                    try {
                        AsyncStorage.setItem("loginResponse", JSON.stringify({ loginResposneObj }));
                    } catch (error) {
                        console.log(error.message);
                    }

                    Alert.alert(
                        'Success',
                        responseJson.data.msg,
                        [{ text: 'OK', onPress: () => dispatch(changingStatusSuccess(loginResposneObj)) }],
                        { cancelable: false }
                    )

                } else {
                    showError("Error " + responseJson.data.msg)
                    dispatch(changingStatusFailure())
                }
            })
            .catch((error) => {
                console.error(error);
                dispatch(changingStatusFailure(error))
            });
    }
}

function showLoader() {
    return {
        type: constants.UPDATING_PROFILE_DATA_SETTING,
    }
}


export function showDialogThroughReducer(isFromPassword) {
    return dispatch => {
        dispatch(showDialog(isFromPassword))
    }
}

export function hideDialogThroughReducer(isFromPassword) {
    return dispatch => {
        dispatch(hideDialog(isFromPassword))
    }
}

function showDialog(isFromPassword) {
    return {
        type: constants.SHOW_DIALOG_ACCOUNT,
        payload: isFromPassword
    }
}
function hideDialog(isFromPassword) {
    return {
        type: constants.HIDE_DIALOG_ACCOUNT,
        payload: isFromPassword
    }
}


function changingStatusSuccess(response) {
    return {
        type: constants.CHANGES_USER_DATA_SUCCESS,
        payload: response
    };
}

function changingStatusFailure() {
    return {
        type: constants.CHANGES_USER_DATA_FAILURE
    };
}

function goToLogin() {
    return {
        type: constants.GO_TO_LOGIN
    };
}

export function logout(jsonObject) {
    return dispatch => {
        dispatch(showLoader());
        return fetch(LOG_OUT, {
            method: POST,
            headers: APP_HEADER,
            body: jsonObject
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.data.status == "true") {
                    dispatch(goToLogin());
                } else {
                    showError("Error " + responseJson.data.msg)
                }
            })
            .catch((error) => {
                showError("Error " + error)
            });
    }
}


export function deactivateAccount(jsonObject) {
    return dispatch => {
        dispatch(showLoader());
        return fetch(DEACTIVATE_ACCOUNT, {
            method: POST,
            headers: APP_HEADER,
            body: jsonObject
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson)
                if (responseJson.data.status == "true") {
                    dispatch(goToLogin());
                } else {
                    showError("Error " + responseJson.data.msg)
                }
            })
            .catch((error) => {
                showError("Error " + error)
            });
    }
}
