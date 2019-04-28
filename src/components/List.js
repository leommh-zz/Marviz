import React, { Component } from "react";
import styled from "styled-components/native";
import { BigText, RegularText } from "./Text";
import { RefreshControl } from 'react-native';
import { colors } from "../styles";

const colorsRefresh = [colors.primary, colors.secundary];

const ViewStyled = styled.View`
  flex: 0;
  justify-content: center;
  align-items: center;
  padding: 10px;
  min-height: 50px;
`;

const FlatListStyled = styled.FlatList`
  flex: 1;
  width: 100%;
  height: 100%;
`;

class List extends Component {
  state = {
    refreshing: false
  };

  render() {
    const { title, refreshFunc, ...rest } = this.props;
    return (
      <FlatListStyled
        ListHeaderComponent={
          <ViewStyled>
            <BigText>{title}</BigText>
          </ViewStyled>
        }
        refreshControl={
          refreshFunc && (
            <RefreshControl
              colors={colorsRefresh}
              refreshing={this.state.refreshing}
              onRefresh={refreshFunc}
            />
          )
        }
        ListEmptyComponent={
          <ViewStyled>
            <RegularText>Lista Vazia :(</RegularText>
          </ViewStyled>
        }
        onEndReachedThreshold={1}
        {...rest}
      />
    );
  }
}

export default List;
