import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import Routes from "./Routes";
import Reducers from "./reducers";

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(Reducers, {}, applyMiddleware(ReduxThunk))}>
        <Routes />
      </Provider>
    );
  }
}
