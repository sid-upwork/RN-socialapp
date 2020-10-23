import { Alert, AsyncStorage } from "react-native";

import { UPLOADING, UPLOADING_SUCCESS, UPLOADING_FAILURE, INITIAL_STATE } from '../../utils/Constants';
import { showError } from "../../utils/Utilities";
import { MULTIPART_APP_HEADER, APP_HEADER, EDIT_PROFILE } from '../../utils/URLs';

export function uploadData(Url, methodType, jsonObject, haveImage) {
    return dispatch => {
        dispatch(UploadSpark());
        return fetch(Url, {
            method: methodType,
            headers: haveImage ? MULTIPART_APP_HEADER : APP_HEADER,
            body: jsonObject
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.data.status == "true") {
                    if (Url == EDIT_PROFILE) {
                        var loginResposneObj = responseJson.data.userdata;

                        try {
                            AsyncStorage.setItem('loginResponse', JSON.stringify({ loginResposneObj }));
                        } catch (error) {
                            console.log(error.message);
                        }
                    }

                    Alert.alert(
                        'Success',
                        responseJson.data.msg,
                        [{ text: 'OK', onPress: () => dispatch(sparkUploadSuccess()) }],
                        { cancelable: false }
                    )

                } else {
                    showError("Error " + responseJson.data.msg)
                    dispatch(sparkUploadFailure())
                }
            })
            .catch((error) => {
                console.error(error);
                dispatch(sparkUploadFailure(error))
            });
    }
}

function UploadSpark() {
    return {
        type: UPLOADING,
    };
}

function sparkUploadSuccess() {
    return {
        type: UPLOADING_SUCCESS
    };
}

function sparkUploadFailure() {
    return {
        type: UPLOADING_FAILURE
    };
}
export function setInitialStage() {
    return dispatch => {
        dispatch(setInitialState());
    }
}
function setInitialState() {
    return {
        type: INITIAL_STATE
    };
}