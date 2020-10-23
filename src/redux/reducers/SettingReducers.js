import * as constants from '../../utils/Constants';

const initialState = {
    userId: '',

    isFetching: false,
    settingData: {
        "privacyData": {
        },
        "list": [
        ],
        "sparkData": {
        },
        "accountData": {
        },
        "notificationData": {
        }
    },
    error: false,

    updatingBlockList: false,
    blockListError: false,

    updatingMuteList: false,
    muteListError: false,

    updatingPrivacy: false,
    privacyError: false,

    sparkDataError: false,
    updatingSpark: false,

    updatingnotification: false,

    authenticatedLogin: true,

    dataUpdated: false,
    showDialog: false,
    isChanging: false,
    isFromPassword: false,
    error: false
}

export default function settingReducer(state = initialState, action) {

    switch (action.type) {

        //account settings
        case constants.FETCHING_SETTNGS:
            return {
                ...state,
                isFetching: true,
            }
        case constants.SUCCESS_SETTING_DATA:
            return {
                ...state,

                isFetching: false,
                error: false,
                settingData: action.payload,
                userId: action.userId
            }
        case constants.FAILURE_SETTING_DATA:
            return {
                ...state, isFetching: false,
                error: true,
                settingData: {
                    "privacyData": {
                    },
                    "list": [
                    ],
                    "sparkData": {
                    },
                    "accountData": {
                    },
                    "notificationData": {
                    }
                }
            }


        //updating Block List
        case constants.UPDATING_BLOCK_LIST:
            return {
                ...state,
                updatingMuteList: true,
            }
        case constants.REMOVE_USER_FROM_BLOCKED_LIST:
            state.settingData.list.blockList.splice(action.payload, 1)
            return {
                ...state,
                blockListError: false,
                updatingMuteList: false
            }
        case constants.REMOVING_USER_FROM_BLOCKED_LIST_FAILURE:
            return {
                ...state,
                blockListError: true,
                updatingMuteList: false,
            }


        //updating Mute List
        case constants.REMOVE_USER_FROM_MUTE_LIST:
            state.settingData.list.mutedList.splice(action.payload, 1)
            return {
                ...state,
                muteListError: false,
                updatingBlockList: false
            }
        case constants.REMOVING_USER_FROM_MUTE_LIST_FAILURE:
            return {
                ...state,
                muteListError: true,
                updatingBlockList: false,
            }


        //updating privacy
        case constants.UPDATING_USER_PRIVACY:
            return {
                ...state,
                updatingPrivacy: true,
            }
        case constants.UPDATING_PRIVACY_SUCCESS:
            state.settingData.privacyData = action.payload;
            return {
                ...state,
                privacyError: false,
                updatingPrivacy: false,
            }
        case constants.UPDATING_PRIVACY_FAILURE:
            return {
                ...state,
                privacyError: true,
                updatingPrivacy: false,
            }


        //updating Spark data
        case constants.UPDATING_SPARK:
            return {
                ...state,
                updatingSpark: true,
            }
        case constants.UPDATING_SPARK_SUCCESS:
            return {
                ...state,
                sparkDataError: false,
                updatingSpark: false
            }
        case constants.UPDATING_SPARK_FAILURE:
            return {
                ...state,
                sparkDataError: true,
                updatingSpark: false,
            }


        //updating Notification data
        case constants.UPDATING_NOTIFICATION_SETTING:
            return {
                ...state,
                updatingnotification: true,
            }
        case constants.UPDATED_NOTIFICATION_SETTING_SUCCESS:
            if (action.isEmail) {
                state.settingData.notificationData.emailData = action.payload;
            } else {
                state.settingData.notificationData.pushData = action.payload;
            }
            return {
                ...state,
                updatingnotification: false
            }
        case constants.UPDATED_NOTIFICATION_SETTING_FAILURE:
            return {
                ...state,
                updatingnotification: false
            }



        //updating account setting 
        case constants.UPDATING_PROFILE_DATA_SETTING:
            return {
                ...state,
                isChanging: true
            }
        case constants.CHANGES_USER_DATA_SUCCESS:
            state.settingData.accountData = action.payload
            return {
                ...state,
                isChanging: false,
                showDialog: false,
                error: false,
                dataUpdated: true
            }
        case constants.CHANGES_USER_DATA_FAILURE:
            return {
                ...state,
                error: true,
                isChanging: false,
                showDialog: true,
                dataUpdated: false
            }
        case constants.SHOW_DIALOG_ACCOUNT:
            return {
                ...state,
                showDialog: true,
                isFromPassword: action.payload
            }
        case constants.HIDE_DIALOG_ACCOUNT:
            return {
                ...state,
                showDialog: false,
                isFromPassword: action.payload
            }
        case constants.GO_TO_LOGIN:
            return {
                ...state,
                authenticatedLogin: false
            }
        case constants.LOG_OUT_FROM_APP:
            return {
                ...state,
                authenticatedLogin: false
            }
        case constants.INITIALIZE_SETTING_REDUCER:
            return {
                ...state,
                authenticatedLogin: true
            }
        default:
            return state
    }
}

