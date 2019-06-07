import React, { Component } from "react";
import styled from "styled-components/native";
import { BigText, RegularText } from "./Text";
import Loader from "./Loader";
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
  width: ${props => props.width ? props.width : '100%'};
  height: ${props => props.height ? props.height : '100%'};
`;

const Padding = styled.View`
  flex: 1;
  width: ${props => props.width ? props.width : '100%'};
  height: ${props => props.height ? props.height : '100%'};
  padding: 20px;
`;

class List extends Component {
  state = {
    refreshing: false
  };

  renderTitle = (title) => (
    <ViewStyled>
      <BigText>{title}</BigText>
    </ViewStyled>
  )

  render() {
    const { title, refreshFunc, loading, ...rest } = this.props;
    return (
      <Padding>
        <ViewStyled>
          <BigText>{title}</BigText>
        </ViewStyled>

        {
          loading ? (
            <Loader />
          ) : (
            <FlatListStyled
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
              initialNumToRender={10}
              removeClippedSubviews={true}
              onEndReachedThreshold={1}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              {...rest}
            />
          )
        }
      
        
      </Padding>
    );
  }
}

export default List;
