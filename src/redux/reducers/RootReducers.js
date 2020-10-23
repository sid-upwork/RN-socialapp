import { combineReducers } from "redux";
import * as constants from '../../utils/Constants'

import HomeReducer from "../reducers/HomeReducers";
import LoginReducer from "./LoginReducers";
import OnlySuccessReducer from "./OnlySuccessReducer";
import BookMarkReducer from "./BookMarkReducers";
import MyListReducer from "./MyListReducer";
import FollowerFollowingReducer from "./FollowerFollowingReducer";
import GetPostDetailReducers from "./GetPostDetailReducers";
import ProfileReducers from "./ProfileReducers";
import ProfileReducerSelector from "./ProfileReducerSelector";
import SearchReducers from "./SearchReducers";
import MomentReducers from "./MomentReducers";
import SettingReducers from "./SettingReducers";
import NotificationReducer from "./NotificationReducer";
import FirebaseChatReducer from "./FirebaseChatReducer";
import SearchDetailReducers from "./SearchDetailReducers";
import HelpClassReducer from "./HelpClassReducer";
import VerifyReducer from "./VerifyReducer";

const appReducer = combineReducers({
  HomeReducer,
  LoginReducer,
  OnlySuccessReducer,
  BookMarkReducer,
  MyListReducer,
  FollowerFollowingReducer,
  GetPostDetailReducers,
  ProfileReducers,
  ProfileReducerSelector,
  SearchReducers,
  MomentReducers,
  SettingReducers,
  NotificationReducer,
  FirebaseChatReducer,
  SearchDetailReducers,
  HelpClassReducer,
  VerifyReducer
})

const initialState = appReducer({}, {})

export default RootReducer = (state, action) => {
  if (action.type == constants.LOG_OUT_FROM_APP
    || action.type == constants.GO_TO_LOGIN) {
    state = undefined;
  }

  return appReducer(state, action)
}
