import { createStore, applyMiddleware } from "redux";
import RootReducer from "../reducers/RootReducers";
import thunk from "redux-thunk";

function configureStore() {
  let store = createStore(RootReducer, undefined, applyMiddleware(thunk));
  return store;
}
export default configureStore;
