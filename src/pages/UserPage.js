import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components/native";
import List from "../components/List";
import Comic from "../components/Comic";
import Container from "../components/Container";
import Column from "../components/Column";
import Image from "../components/Image";
import Navbar from "../components/Navbar";
import { PixelRatio, ScrollView } from "react-native";
import { BigText, RegularText, SmallText } from "../components/Text";
import { stringCut } from "../services/helpers";

const Header = styled.View`
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

const Info = styled.View`
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

class userPage extends Component {
  getValue = value => PixelRatio.getPixelSizeForLayoutSize(value);

  render() {
    const {
      user: { name, login, image, comicsFavorite }
    } = this.props;
    return (
      <Container>
        <Navbar />
        <ScrollView style={{ flex: 1, width: '100%' }}>
        
            <Header>
              <BigText align="center">{name}</BigText>
            </Header>

            <Image
              source={image}
              height={this.getValue(50)}
              radius={10}
              resizeMode="contain"
            />

            {
                console.warn(this.props.user)
            }

            <List
                title="Comics Favoritas"
                data={comicsFavorite}
                renderItem={({ item }) => <Comic item={item} />}
                keyExtractor={(item, index) => `${item.id}`}
                numColumns={2}
            />
            
     
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.UserReducer.user
});

export default connect(mapStateToProps)(userPage);
