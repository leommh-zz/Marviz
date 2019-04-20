import React from "react";
import { TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import styled from "styled-components/native";
import { BigText } from "./Text";
import { colors } from "../styles";

const Navbar = ({ Children, ...rest }) => {
  const NavbarStyled = styled.View`
    width: ${props => (props.width ? props.width : "100%")};
    height: ${props => (props.height ? props.height : "80px")};
    background-color: ${colors.backgroundLight};
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
  `;

  const leftRender = () => {
    return (
      <TouchableOpacity onPress={Actions.pop}>
        <BigText>Voltar</BigText>
      </TouchableOpacity>
    );
  };

  const rightRender = message => {
    return <SmallText>{message}</SmallText>;
  };

  return <NavbarStyled {...rest}>{leftRender()}</NavbarStyled>;
};

export default Navbar;
