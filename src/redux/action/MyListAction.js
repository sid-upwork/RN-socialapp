import * as constants from "../../utils/Constants";
import * as commonApis from "../../Service/CommonApis";
import {
  POST,
  APP_HEADER,
  MY_LIST,
  ADD_EDIT_MY_LIST,
  LIST_DETAIL,
  ADD_DELETE_MEMBER,
  SEARCH_MEMBER,
  DELETE_LIST,
  SUBSCRIBE_LIST
} from "../../utils/URLs";
import { showError } from "../../utils/Utilities";

export function getList(jsonObject) {
  return dispatch => {
    dispatch(fetchingList());
    return fetch(MY_LIST, {
      method: POST,
      headers: APP_HEADER,
      body: jsonObject
    })
      .then(response => response.json())
      .then(responseJson => {
        dispatch(hideDialog())
        if (responseJson.data.status === "true") {
          dispatch(listSuccess(responseJson.data));
        } else {
          showError("Error " + responseJson.data.msg);
          dispatch(listFailure());
        }
      })
      .catch(error => {
        console.error(error);
        dispatch(listFailure(error));
      });
  };
}

export function addEditList(jsonObject, actionType) {
  console.log(jsonObject);
  return dispatch => {
    dispatch(fetchingList());
    return fetch(ADD_EDIT_MY_LIST, {
      method: POST,
      headers: APP_HEADER,
      body: jsonObject
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        dispatch(hideDialog())
        if (responseJson.data.status == "true") {
          dispatch(createListSuccess(responseJson.data.list, actionType));
        } else {
          showError("Error " + responseJson.data.msg);
          dispatch(listFailure());
        }
      })
      .catch(error => {
        console.error(error);
        dispatch(listFailure(error));
      });
  };
}

export function deleteList(jsonObject, listId) {
  return dispatch => {
    dispatch(fetchingList());
    return fetch(DELETE_LIST, {
      method: POST,
      headers: APP_HEADER,
      body: jsonObject
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson); dispatch(hideDialog())
        if (responseJson.data.status == "true") {
          dispatch(deleteListSuccess(responseJson.data, listId));
          showError("Success : " + responseJson.data.msg);
        } else {
          showError("Error " + responseJson.data.msg);
          dispatch(deleteListFailure());
        }
      })
      .catch(error => {
        console.error(error);
        dispatch(deleteListFailure(error));
      });
  };

}

export function getListDetail(jsonObject) {
  return dispatch => {
    dispatch(fetchingList());
    return fetch(LIST_DETAIL, {
      method: POST,
      headers: APP_HEADER,
      body: jsonObject
    })
      .then(response => response.json())
      .then(responseJson => {
        dispatch(hideDialog())
        if (responseJson.data.status == "true") {
          dispatch(listDetailSuccess(responseJson.data));
        } else {
          // showError("Error " + responseJson.data.msg);
          dispatch(listDetailFailure());
        }
      })
      .catch(error => {
        console.error(error);
        dispatch(listDetailFailure(error));
      });
  };
}

export function subscribelist(jsonObject, listId) {
  return dispatch => {
    dispatch(fetchingList());
    return fetch(SUBSCRIBE_LIST, {
      method: POST,
      headers: APP_HEADER,
      body: jsonObject
    })
      .then(response => response.json())
      .then(responseJson => {
        dispatch(hideDialog())
        if (responseJson.data.status == "true") {
          dispatch(subscribeUnSubscribeList(responseJson.data.response, listId))
        } else {
          showError("Error " + responseJson.data.msg);
        }
      })
      .catch(error => {
        console.error(error);
        dispatch(listDetailFailure(error));
      });
  };
}

function subscribeUnSubscribeList(status, listId) {
  return {
    type: constants.SUBSCRIBE_UNSUBSCRIBE_LIST,
    payload: status,
    listId: listId
  }
}

export function addDeleteMember(jsonObject, action, index, item) {

  return dispatch => {
    dispatch(fetchingList());
    return fetch(ADD_DELETE_MEMBER, {
      method: POST,
      headers: APP_HEADER,
      body: jsonObject
    })
      .then(response => response.json())
      .then(responseJson => {
        dispatch(hideDialog())
        if (responseJson.data.status == "true") {
          showError("Success " + responseJson.data.msg);
          dispatch(addDeleteSuccess(responseJson.data, action, index, item));
        } else {
          showError("Error " + responseJson.data.msg, action);
          dispatch(listFailure());
        }
      })
      .catch(error => {
        console.error(error);
        dispatch(listFailure(error));
      });
  };
}

export function searchMember(jsonObject) {
  return dispatch => {
    // dispatch(fetchingList());
    return fetch(SEARCH_MEMBER, {
      method: POST,
      headers: APP_HEADER,
      body: jsonObject
    })
      .then(response => response.json())
      .then(responseJson => {
        // dispatch(hideDialog())
        console.log(responseJson);
        if (responseJson.data.status == "true") {
          dispatch(searchMemberSuccess(responseJson.data.UserList));
        } else {
          showError("Error " + responseJson.data.msg);
          dispatch(listFailure());
        }
      })
      .catch(error => {
        console.error(error);
        dispatch(listFailure(error));
      });
  };
}


function createListSuccess(data, actionType) {
  return {
    type: constants.CREATE_LIST_SUCCESS,
    payload: data,
    actionType: actionType
  };
}

function deleteListSuccess(data, listId) {
  return {
    type: constants.DELETE_LIST_SUCCESS,
    payload: data,
    listId: listId
  };
}

function deleteListFailure() {
  return {
    type: constants.DELETE_LIST_FAILURE
  };
}


function fetchingList() {
  return {
    type: constants.FETCHING_LIST
  };
}

function hideDialog() {
  return {
    type: constants.HIDE_DIALOG_FETCHING_LIST
  }
}

function listSuccess(data) {
  return {
    type: constants.FETCH_SUCCESS_LIST,
    payload: data
  };
}

function listFailure() {
  return {
    type: constants.FETCH_FAILURE_LIST
  };
}

function listDetailSuccess(data) {
  return {
    type: constants.LIST_DETAIL_SUCCESS,
    payload: data
  };
}

function listDetailFailure() {
  return {
    type: constants.LIST_DETAIL_FAILURE
  };
}

export function setCreatedFalse() {
  return {
    type: constants.SET_CREATED_FALSE
  };
}

function addDeleteSuccess(data, action, index, item) {
  return {
    type: constants.ADD_DELETE_SUCCESS,
    payload: data,
    actionType: action,
    index: index,
    item: item
  };
}

function searchMemberSuccess(data) {
  return {
    type: constants.SEARCH_DETAIL_SUCCESS,
    payload: data
  };
}




export function postVotePoll(URL, jsonObject) {
  return dispatch => {
    dispatch(fetchingList());
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
    dispatch(fetchingList())
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
    type: constants.UPDATE_INDEX_IN_LIST,
    payload: updated_post
  }
}
function hidePostEventDialogs() {
  return {
    type: constants.HIDE_DIALOGS_LIST
  }
}

export function showActionDialogs(showDialog, post_id, dialogType) {
  return dispatch => {
    dispatch(showactionDialog(post_id, showDialog, dialogType))
  };
}

function showactionDialog(post_id, showDialog, dialogType) {
  return {
    type: constants.SHOW_LIST_SHARE_DIALOG,
    dialogType: dialogType,
    post_id: post_id,
    showDialog: showDialog
  };
}

export function deletePost(index, jsonObject) {
  var index = index;
  return dispatch => {
    dispatch(fetchingList());
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
    type: constants.POST_DELETED_SUCCESSFULLY_LIST,
    ind: index
  }
}

// BlockUser fucntions 
export function blockUser(user_id, jsonObject) {
  var userId = user_id;
  return dispatch => {
    dispatch(fetchingList());
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
    type: constants.BLOCKED_USER_POST_LIST,
    payload: userId
  }
}

export function muteUser(user_id, jsonObject) {
  var userId = user_id;
  return dispatch => {
    dispatch(fetchingList());
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
    dispatch(fetchingList());
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
