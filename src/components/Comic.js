import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import styled from "styled-components/native";
import Card from "./Card";
import Image from "./Image";
import { stringCut, getValue } from "../services/helpers";
import { SmallText } from "./Text";
import { colors } from "../styles";

class Comic extends Component {

  render() {
    const {
      id,
      title,
      thumbnail: { path, extension }
    } = this.props.item;

    const ComicStyled = styled.View`
      flex: 1;
    `;

    const HeaderStyled = styled.View`
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      min-width: 100%;
      background-color: ${colors.primary};
      justify-content: center;
      align-items: center;
      padding: 5px;
    `;

    const url = `${path}.${extension}`;

    return (
      <Card
        width={getValue(50)}
        onPress={() => Actions.comicPage({ comic: this.props.item, thumbnail: url })}
      >
        <ComicStyled>
          <HeaderStyled>
            <SmallText fontSize={14}>{stringCut(title, 15, "...")}</SmallText>
          </HeaderStyled>
          <Image
            source={{ uri: url }}
            width={getValue(50)}
            radiusBottom={10}
          />
        </ComicStyled>
      </Card>
    );
  }
}

export default Comic;
