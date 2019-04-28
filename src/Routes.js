import React, { Component } from "react";
import { Router, Scene } from "react-native-router-flux";
import PrivateScene from "./PrivateScene";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ComicPage from "./pages/ComicPage";
import UserPage from "./pages/UserPage";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            // initial
            key="login"
            component={Login}
            hideNavBar={true}
          />
          <Scene
            key="register"
            component={Register}
            hideNavBar={true}
          />
          <Scene
            initial
            key="home"
            type="reset"
            component={Home}
            hideNavBar={true}
          />
          <Scene
            key="comicPage"
            component={ComicPage}
            hideNavBar={true}
          />
          <Scene
            key="userPage"
            component={UserPage}
            hideNavBar={true}
          />
        </Scene>
      </Router>
    );
  }
}

export default Routes;
