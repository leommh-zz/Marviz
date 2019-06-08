import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { TouchableOpacity } from 'react-native';
import styled from "styled-components/native";
import Container from "../components/Container";
import Image from "../components/Image";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Tag from "../components/Tag";
import List from "../components/List";
import Divider from "../components/Divider";
import { ScrollView } from "react-native";
import { BigText, RegularText } from "../components/Text";
import { getValue } from "../services/helpers";
import ImageView from 'react-native-image-view';
import { getCharacters, getAuthors } from "../services/api";
import { favorite } from "../actions/UserActions";
import { colors } from "../styles";

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

const Options = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Padding = styled.View`
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

const Avatar = styled.View`
  margin-right: 10px;
`;

class ComicPage extends Component {
  state = {
    favorited: false,
    characters: [],
    authors: [],
    loading: false,
    indexImage: 0,
    isImageViewVisible: false
  };

  favoritedFilter = () => {
    this.props.user.comicsFavorite.filter(c => c.id === this.props.comic.id)
      .length > 0
      ? this.setState({ favorited: true })
      : this.setState({ favorited: false });
  };

  favorite = async comic => {
    await this.setState({ loading: true });
    setTimeout(() => this.props.favorite({ comic }), 1000);
  };

  getChars = () => {
    const { comic: { id } } = this.props;
    getCharacters({ 
      comicId: id, 
      callback: (characters) => this.setState({ characters })
    });

    getAuthors({ 
      comicId: id, 
      callback: (authors) => this.setState({ authors })
    });
  }

  componentDidMount() {
    this.favoritedFilter();
    this.getChars();
  }

  async componentDidUpdate(oldProps) {
    const { user } = this.props;
    if (user.comicsFavorite !== oldProps.user.comicsFavorite) {
      await this.setState({ loading: false });
      this.favoritedFilter();
    }
  }

  handleImage = (index) => {
    this.setState({
      indexImage: index,
      isImageViewVisible: true
    })
  }

  closeImageView = () => {
    this.setState({
      isImageViewVisible: false
    })
  }

  renderCharOrAuthor = (item, color, type) => {
    const { thumbnail } = item;

    let uri = '';

    if ( !!thumbnail ) {
      const { path, extension } = thumbnail;
      if ( !!path && !!extension ) {
        uri = path + '.' + extension;
      }
    }

    return (
      <TouchableOpacity 
        onPress={() => Actions.charOrAuthorPage({
          title: type == 'author' ? item.fullName : item.name,
          item,
          color,
          thumbnail: uri,
          typePage: type,
        })}
      >
        <Tag color={color}>

          {
            uri.length > 0 && (
              <Avatar>
                <Image
                  source={{ uri: uri }}
                  width={getValue(10)}
                  height={getValue(10)}
                  radius={50}
                />  
              </Avatar>
            )
          }

          <RegularText color={color}>{type == 'author' ? item.fullName : item.name}</RegularText>
        </Tag>
      </TouchableOpacity>

    )
  }

  render() {
    const { comic, thumbnail } = this.props;

    const {
      title,
      description,
      characters: { items: persons },
      creators: { items: creators },
      dates,
      images,
      series,
      prices,
      stories
    } = comic;

    const { favorited, loading, characters, authors } = this.state;

    const imagesArray = images.map((img, index) => {
      const uri = img.path + '.' + img.extension;
      return {
        source: {
            uri: uri,
        },
        title: `Gallery - #` + index,
        width: getValue(200),
        height: getValue(300),
      }
    }) 

    return (
      <Container>
        <Navbar navigateInternal={this.props.navigateInternal} />
        <ScrollView
          style={{ flex: 1, width: "100%" }}
          contentContainerStyle={{ alignItems: "center" }}
        >
            <Header>
              <BigText align="center">{title}</BigText>
            </Header>

            <Image
              source={{ uri: thumbnail }}
              width={getValue(80)}
              height={getValue(80)}
              radius={10}
            />

            <Options>
              <Button
                outline={!favorited ? true : false}
                onPress={!loading ? () => this.favorite(comic) : () => false}
              >
                {!loading ? (
                  <RegularText>
                    {!favorited ? "Favorite" : "Favorited"}
                  </RegularText>
                ) : (
                  <Loader size={20} />
                )}
              </Button>
            </Options>

            <Divider />

            {
              persons && persons.length > 0 && (
                <List
                  title="Characters"
                  data={characters}
                  loading={characters.length > 0 ? false : true}
                  renderItem={({ item, index }) => {
                    const color = index % 2 === 0 ? colors.primary : colors.rose;
                    return (
                      this.renderCharOrAuthor(item, color, 'character')
                    )
                  }}
                  keyExtractor={(item, index) => `${index}_characters`}
                  horizontal={true}
                />
              )
            }

            {
              creators && creators.length > 0 && (
                <List
                  title="Authors"
                  data={authors}
                  loading={authors.length > 0 ? false : true}
                  renderItem={({ item, index }) => {
                    const color = index % 2 === 0 ? colors.purple : colors.violet;
                    return (
                      this.renderCharOrAuthor(item, color, 'author')
                    )
                  }}
                  keyExtractor={(item, index) => `${index}_authors`}
                  horizontal={true}
                />
              )
            }

            {
              !!images && images.length > 0 && (
                <>
                  <List
                    title="Gallery"
                    data={images}
                    renderItem={({ item, index }) => {
                      const uri = item.path + '.' + item.extension;
                      return (
                        <TouchableOpacity onPress={() => this.handleImage(index)} style={{ marginHorizontal: 5 }}>
                          <Image 
                            source={{ uri }}
                            width={getValue(30)}
                            height={getValue(30)}
                            radius={10} 
                          />
                        </TouchableOpacity>
                      )
                    }}
                    keyExtractor={(item, index) => `${index}_gallery`}
                    horizontal={true}
                  />

                  <ImageView
                    animationType="slide"
                    isSwipeCloseEnabled={true}
                    images={imagesArray}
                    imageIndex={this.state.indexImage}
                    isVisible={this.state.isImageViewVisible}
                    onClose={() => this.closeImageView()}
                  />
                </>
              )
            }

            {description && (
              <Info>
                <BigText>Description:</BigText>
                <RegularText line={20} align="justify">
                  { description }
                </RegularText>
              </Info>
            )}
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.UserReducer.user
});

export default connect(
  mapStateToProps,
  { favorite }
)(ComicPage);
