import * as constants from "../../utils/Constants";
import { POST, SIGN_IN, APP_HEADER, REGISTER } from "../../utils/URLs";
import { AsyncStorage } from "react-native";
import { showError } from "../../utils/Utilities";

export function getLoginResponse(isFromLogin, jsonObject) {
  return dispatch => {
    dispatch(fetchingLoginResponse());
    return fetch(isFromLogin ? SIGN_IN : REGISTER, {
      method: POST,
      headers: APP_HEADER,
      body: jsonObject
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.data.status == "true") {
          dispatch(loginSuccess(responseJson.data.response));
        } else {
          showError("Error: " + responseJson.data.description);
          dispatch(loginFailure("Error: " + responseJson.data.description));
        }
      })
      .catch(error => {
        console.error(error);
        dispatch(loginFailure(error));
      });
  };
}

function fetchingLoginResponse() {
  return {
    type: constants.FETCHING_LOGIN
  };
}

function loginSuccess(loginResponse) {
  return {
    type: constants.LOGIN_SUCCESS,
    payload: loginResponse
  };
}

function loginFailure(error) {
  return {
    type: constants.LOGIN_FAILURE,
    payload: error
  };
}
