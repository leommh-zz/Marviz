import React, { Component } from "react";
import { StatusBar } from "react-native";
import { Constants } from 'expo';
import { View } from 'react-native';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import Routes from "./src/Routes";
import Reducers from "./src/reducers";
import { colors } from "./src/styles";

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(Reducers, {}, applyMiddleware(ReduxThunk))}>
        <StatusBar backgroundColor={colors.backgroundLight} barStyle="light-content" />
        <>
          <View style={{ height: Constants.statusBarHeight, backgroundColor: colors.backgroundLight }} /> 
          <Routes />
        </>
      </Provider>
    );
  }
}
