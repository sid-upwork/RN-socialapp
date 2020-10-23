import * as types from "../../utils/Constants";

const initialState = {
  fetchingUsers: false,
  Users: [],

  sending: false,
  sendingError: null,
  message: "",
  messages: [],
  loadMessagesError: null
};

export default function FirebaseChatReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_USERS_FOR_MESSAGE:
      return {
        ...state,
        fetchingUsers: true
      }
    case types.FETCHING_STOPPED_USERS_FOR_MESSAGE:
      return {
        ...state,
        fetchingUsers: false
      }
    case types.USER_FROM_FIREBASE:
      return {
        ...state, Users: action.payload
      }
      
    case types.CHAT_MESSAGE_LOADING:
      return {
        ...state,
        sending: true,
        sendingError: null
      };
    case types.CHAT_MESSAGE_ERROR:
      return {
        ...state,
        sending: false,
        sendingError: action.error
      };
    case types.CHAT_MESSAGE_SUCCESS:
      return {
        ...state,
        sending: false,
        sendingError: null,
        message: ""
      };
    case types.CHAT_MESSAGE_UPDATE:
      return {
        ...state,
        sending: false,
        message: action.text,
        sendingError: null
      };
    case types.CHAT_LOAD_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.messages,
        loadMessagesError: null
      };
    case types.CHAT_LOAD_MESSAGES_ERROR:
      return {
        ...state,
        messages: null,
        loadMessagesError: action.error
      };
    default:
      return state;
  }
}
