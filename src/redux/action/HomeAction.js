import { AsyncStorage } from "react-native";
import * as contants from "../../utils/Constants";
import * as commonApis from "../../Service/CommonApis";
import * as homeApis from "../../Service/HomeApis";
import { showError } from '../../utils/Utilities';

export function getLoginResponse() {
  return async dispatch => {

      try {
          const auth = await AsyncStorage.getItem("loginResponse");
          if (auth != '') {
              dispatch(loginResponse(JSON.parse(auth).loginResposneObj))
              return;
          }

          dispatch(loginResponseNull())
      } catch (error) {
          console.log(error.message);
      }
  }
}

function loginResponse(response) {
  return {
      type: contants.LOGIN_RESPONSE,
      payload: response
  };
}

function loginResponseNull() {
  return {
      type: contants.LOGIN_RESPONSE_NULL
  };
}



export function getHomeTweetList(jsonObject) {
  return dispatch => {
    dispatch(gotFetchingHome());
    homeApis.getHomeTweetList(jsonObject).then(
      response => {
        dispatch(hideDialog());
        if (response.status === "true") {

          if (response.userUpdated != null ||
            response.userUpdated != undefined ||
            response.userUpdated != "") {

            var loginResposneObj = response.userUpdated;

            try {
              AsyncStorage.setItem("loginResponse", JSON.stringify({ loginResposneObj }));
            } catch (error) {
              console.log(error.message);
            }
          }
          dispatch(getHomeSuccessResponse(response.allpost));
          dispatch(getLoginResponse())
        } else {
          dispatch(getHomeFailureResponse(response.msg))
          dispatch(getLoginResponse())
        }
      },
      error => {
        dispatch(getHomeFailureResponse(error))
        dispatch(getLoginResponse())
      }
    )
  }
}

function gotFetchingHome() {
  return {
    type: contants.FETCHING_HOME
  }
}

function hideDialog() {
  return {
    type: contants.HIDE_FETCHING_HOME
  }
}

function getHomeSuccessResponse(data) {
  return {
    type: contants.FETCH_HOME_SUCCESS,
    payload: data
  }
}

function getHomeFailureResponse(error) {
  return {
    type: contants.FETCH_HOME_FAILURE
  };
}

export function postVotePoll(URL, jsonObject) {
  return dispatch => {
    dispatch(gotFetchingHome());
    commonApis.postVotePollApi(jsonObject, URL).then(
      response => {
        dispatch(hideDialog());
        if (response.status === "true") {
          dispatch(hidePostEventDialogs())
          dispatch(updateValueAtIndex(response.updated_post))
          showError("Success", response.msg)
        } else {
          showError("Failure", response.msg)
        }
      },
      error => {
        showError("Failure", error)
      }
    )
  }
}

export function postForHomePost(URL, jsonObject) {
  var jsonObject = jsonObject
  return dispatch => {
    dispatch(gotFetchingHome())
    commonApis.postOnHomePost(jsonObject, URL).then(
      response => {
        dispatch(hideDialog())
        if (response.status === "true") {
          dispatch(hidePostEventDialogs())
          dispatch(updateValueAtIndex(response.updated_post))
        } else {
          showError("Failure " + response.msg)
        }
      },
      error => {
        showError("Failure " + error)
      }
    )
  }
}

function updateValueAtIndex(updated_post) {
  return {
    type: contants.UPDATE_INDEX_IN_HOME,
    payload: updated_post
  }
}
function hidePostEventDialogs() {
  return {
    type: contants.HIDE_DIALOGS_HOME
  }
}

export function showActionDialogs(showDialog, post_id, dialogType) {
  return dispatch => {
    dispatch(showactionDialog(post_id, showDialog, dialogType))
  };
}

function showactionDialog(post_id, showDialog, dialogType) {
  return {
    type: contants.SHOW_HOME_SHARE_DIALOG,
    dialogType: dialogType,
    post_id: post_id,
    showDialog: showDialog
  };
}

export function deletePost(index, jsonObject) {
  var index = index;
  return dispatch => {
    dispatch(gotFetchingHome());
    commonApis.deletePost(jsonObject, true).then(
      response => {
        dispatch(hideDialog());
        if (response.status == "true") {
          dispatch(postDeleted(index));
        } else {
          showError("Failure", response.msg)
        }
      },
      error => { showError("Failure", error) }
    )
  }
}

function postDeleted(index) {
  return {
    type: contants.POST_DELETED_SUCCESSFULLY,
    ind: index
  }
}

// BlockUser fucntions 
export function blockUser(user_id, jsonObject) {
  var userId = user_id;
  return dispatch => {
    dispatch(gotFetchingHome());
    commonApis.blockUser(jsonObject).then(
      response => {
        dispatch(hideDialog());
        if (response.status === "true") {
          dispatch(userBlocked(userId));
        } else {
          showError("Failure " + response.msg)
        }
      },
      error => {
        showError("Failure " + error)
      }

    )
  }
}

function userBlocked(userId) {
  return {
    type: contants.BLOCKED_USER_POST,
    payload: userId
  }
}

export function muteUser(user_id, jsonObject) {
  var userId = user_id;
  return dispatch => {
    dispatch(gotFetchingHome());
    commonApis.muteUser(jsonObject).then(
      response => {
        dispatch(hideDialog());
        if (response.status === "true") {
          dispatch(userBlocked(userId));
        } else {
          showError("Failure " + response.msg)
        }
      },
      error => {
        showError("Failure " + error)
      }
    )
  }
}


//Report Spark
export function reportSpark(jsonObject) {
  return dispatch => {
      dispatch(gotFetchingHome());
      commonApis.reportSpark(jsonObject).then(
          response => {
              dispatch(hideDialog())
              if (response.status == "true") {
                  showError("Success " + response.msg)
              } else {
                  showError("Error " + response.msg)
              }
          },
          error => {
              showError("Error " + error)
          }
      )
  }
}
