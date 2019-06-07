import React, { Component } from "react";
import { Router, Scene } from "react-native-router-flux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ComicPage from "./pages/ComicPage";
import UserPage from "./pages/UserPage";
import CharOrAuthorPage from "./pages/CharOrAuthorPage";

class Routes extends Component {
  render() {
    return (
      <Router>
          <Scene key="root">
            <Scene key="login" component={Login} hideNavBar={true} />
            <Scene key="register" component={Register} hideNavBar={true} />
            <Scene initial key="home" type="reset" component={Home} hideNavBar={true} />
            <Scene key="comicPage" component={ComicPage} hideNavBar={true} navigateInternal={true} />
            <Scene key="userPage" component={UserPage} hideNavBar={true} navigateInternal={true} />
            <Scene key="charOrAuthorPage" component={CharOrAuthorPage} hideNavBar={true} navigateInternal={true} />
          </Scene>
      </Router>
    );
  }
}

export default Routes;
