import * as types from "../../utils/Constants";
import * as messageApis from "../../Service/MessageApis";
import { database } from "../../services/firebase";

const FIREBASE_REF_MESSAGES = database.ref("Messages");
const FIREBASE_REF_USERS = database.ref("/Users");

// getMessageFromFirebase(type,id) {
//   const messagesRef = database.ref(type+'/'+id+'/messages/')
//     .orderByKey()
//     .limitToLast(100);

//   messagesRef.on('child_added', snapshot => {

//     const data = snapshot.val();
//     const message = { text: data.text, user_id: data.user_id };
//     const usersRef = database.ref("users/"+data.user_id+"/");

//     usersRef.on('value', snapshotUser => {
//       const data11 = snapshotUser.val();
//       const message = {text: data.text, user_id: data.user_id, status : data11.status, user_name: data11.user_name, image: data11.image};
//       this.setState(prevState => ({
//         messages: [ message, ...prevState.messages ],
//       }));
//     });

//   });
// }

export function getUserListToChat(id) {
  return dispatch => {
    dispatch(showDialog());
    var list = [];

 
    // messageApis.getUserListToChat(jsonObject).then(
    //     response => {
    //         dispatch(hidefetchingUser())
    //         if (response.status == "true") {
    //             dispatch(Success(response));
    //         } else {
    //             showError("Error " + response.msg)
    //             dispatch(Failure())
    //         }
    //     },
    //     error => {
    //         showError("Error " + error)
    //         dispatch(Failure(error))
    //     }
    // )
  }
}

function showDialog() {
  return { type: types.FETCHING_USERS_FOR_MESSAGE }
}

function hideDialog() {
  return { type: types.FETCHING_STOPPED_USERS_FOR_MESSAGE }
}

function userFetchedSuccess(response) {
  return {
    type: types.FETCHING_STOPPED_USERS_FOR_MESSAGE,
    payload: response
  }
}

export function sendMessage(jsonData) {
  return dispatch => {
    let chatMessage = {
      message: jsonData,
      chatId: "39-40",
      seen: "false",
      senderId: "39",
      timestamp: "1-2-2019",
      messageType: "text",
      mediaUrl: "no url"
    };
    // FIREBASE_REF_MESSAGES.child("39-40").child("data").push().set(chatMessage, error => {
    //   console.log(error);
    //   if (error) {
    //     dispatch(chatMessageError(error.message));
    //   } else {
    //     dispatch(chatMessageSuccess());
    //   }
    // });
  };
}

export const updateMessage = text => {
  return dispatch => {
    dispatch(chatUpdateMessage(text));
  };
};

export function loadMessages(chatId) {
  return dispatch => {
    // FIREBASE_REF_MESSAGES.child(chatId).child("data").on(
    //   'value',
    //   snapshot => {
    //     dispatch(loadMessagesSuccess(snapshot.val()));
    //   },
    //   errorObject => {
    //     dispatch(loadMessagesError(errorObject.message));
    //   }
    // );

    var starCountRef = database.ref('Messages/' + chatId + '/data');
    starCountRef.on('value', function (snapshot) {
      console.log(snapshot);
      dispatch(loadMessagesSuccess(snapshot.val()));
    });

  };
};


export function getFriendsChat() {
  return dispatch => {
    FIREBASE_REF_MESSAGES
  }

}

const chatMessageLoading = () => ({
  type: types.CHAT_MESSAGE_LOADING
});

const chatMessageSuccess = () => ({
  type: types.CHAT_MESSAGE_SUCCESS
});

const chatMessageError = error => ({
  type: types.CHAT_MESSAGE_ERROR,
  error
});

const chatUpdateMessage = text => ({
  type: types.CHAT_MESSAGE_UPDATE,
  text
});

const loadMessagesSuccess = messages => ({
  type: types.CHAT_LOAD_MESSAGES_SUCCESS,
  messages
});

const loadMessagesError = error => ({
  type: types.CHAT_LOAD_MESSAGES_ERROR,
  error
});
