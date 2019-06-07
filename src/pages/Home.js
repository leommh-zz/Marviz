import React, { Component } from "react";
import { connect } from "react-redux";
import Container from "../components/Container";
import Comic from "../components/Comic";
import Loader from "../components/Loader";
import Menu from "../components/Menu";
import List from "../components/List";
import { getComics } from "../actions/MarvelActions";

class Home extends Component {

  initialLimit = 10;
  limit = 20;
  skip = 0;


  getComics = (newLimit) => {
    this.props.getComics(newLimit);

    if (newLimit !== this.initialLimit) {
      this.skip += this.limit;
      this.limit = newLimit;
    }
  }

  componentDidMount() {
    this.getComics(this.limit);
  }

  render() {
    
    const { comics } = this.props;
    return (
      <Container>
        <Menu user={this.props.user}/>
        {comics.length > 0 ? (
          <List
            title="Comics"
            data={comics}
            renderItem={({ item }) => <Comic item={item} />}
            keyExtractor={(item, index) => `${item.id}`}
            numColumns={2}
            refreshFunc={() => this.getComics(this.initialLimit)}
          />
        ) : (
          <Container flex={1}>
            <Loader size={50} />
          </Container>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.UserReducer.user,
  comics: state.MarvelReducer.comics
});

export default connect(
  mapStateToProps, { getComics }
)(Home);