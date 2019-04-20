import React from "react";
import { ScrollView } from "react-native";
import { Actions } from "react-native-router-flux";
import Button from "../components/Button";
import Row from "../components/Row";
import Container from "../components/Container";
import Column from "../components/Column";
import Divider from "../components/Divider";
import Navbar from "../components/Navbar";
import TextInput from "../components/TextInput";
import {
  SmallText,
  RegularText,
  BigText,
  ExtraBigText
} from "../components/Text";
import { colors } from "../styles";

const Register = props => {
  return (
    <Container>
      <Navbar />
      <Column flex={1}>
        <ExtraBigText>Registre-se</ExtraBigText>
        <Divider height="4" />
        <TextInput placeholder="Login" />
        <TextInput placeholder="Senha" />
        <Divider height="2" />
        <Row align="center" justify="center">
          <Button>
            <BigText>Concluir</BigText>
          </Button>
        </Row>
        <Divider height="2" />
      </Column>
    </Container>
  );
};

export default Register;
