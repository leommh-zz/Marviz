import React, { Component } from "react";
import { Router, Scene } from "react-native-router-flux";
import PrivateScene from "./PrivateScene";

import Login from "./pages/Login";
import Register from "./pages/Register";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            initial
            key="login"
            component={Login}
            hideNavBar={true}
          />
          <Scene
            key="register"
            component={Register}
            hideNavBar={true}
          />
        </Scene>
      </Router>
    );
  }
}

export default Routes;
