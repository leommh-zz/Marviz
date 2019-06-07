import React, { PureComponent } from "react";
import { ActivityIndicator } from "react-native";
import { colors } from "../styles";

class Loader extends PureComponent {
  render() {
    const { size } = this.props;
    return <ActivityIndicator size={size ? size : 'small'} color={colors.secundary} />;
  }
}

export default Loader;
