import React, { PureComponent } from "react";
import { TouchableOpacity, PixelRatio } from "react-native";
import { Actions } from "react-native-router-flux";
import styled from "styled-components/native";
import { ExtraBigText, RegularText } from "./Text";
import Image from "./Image";
import { colors } from "../styles";
const MenuStyled = styled.View`
  width: ${props => (props.width ? props.width : "100%")};
  height: ${props => (props.height ? props.height : "70px")};
  background-color: ${colors.backgroundLight};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
`;

const MenuBar = styled.View`
  flex: 1;
  flex-direction: row;
  margin-left: 20px;
  margin-top: 15px;
  justify-content: flex-start;
  align-items: center;
`;

const UserInfo = styled.TouchableOpacity`
  background-color: ${colors.secundary};
  border-radius: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

class Menu extends PureComponent {
  getValue = value => PixelRatio.getPixelSizeForLayoutSize(value);

  render() {
    return (
      <MenuStyled {...this.props}>
        <UserInfo onPress={() => Actions.userPage()}>
          <Image
            source={this.props.user.image}
            width={this.getValue(18)}
            height={this.getValue(18)}
            resizeMode="contain"
          />
        </UserInfo>

        <MenuBar>
          <MenuItem onPress={() => Actions.home()}>
            <ExtraBigText>Home</ExtraBigText>
          </MenuItem>
        </MenuBar>
      </MenuStyled>
    );
  }
}

export default Menu;
