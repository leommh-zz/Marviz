import { combineReducers } from "redux";

import LoginReducer from './LoginReducer';
import RegisterReducer from './RegisterReducer';

const appReducer = combineReducers({LoginReducer, RegisterReducer});

export default (rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
});
