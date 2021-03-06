import React from "react";
import {
  View,
  StyleSheet,
  Button,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { getFilmsFromApiWithSearchedText } from "../API/TMDBApi";
import FilmList from "./filmList";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { films: [], isLoading: false };
    this.searchedText = "";
    this.page = 0;
    this.totalPages = 0;
  }
  _loadFilms = () => {
    this.setState({ isLoading: true });
    if (this.searchedText.length > 0) {
      getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(
        (data) => {
          this.page = data.page;
          this.totalPages = data.total_pages;
          this.setState({
            films: [...this.state.films, ...data.results],
            isLoading: false,
          });
        }
      );
    }
  };
  _searchFilms() {
    this.page = 0;
    this.totalPages = 0;
    this.setState({ films: [] }, () => this._loadFilms());
  }
  _searchTextInputChanged(text) {
    this.searchedText = text;
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }

  render() {
    // console.log("render");
    return (
      <View stylte={styles.main_container}>
        <TextInput
          onSubmitEditing={() => this._searchFilms()}
          onChangeText={(text) => this._searchTextInputChanged(text)}
          style={styles.input}
          placeholder="Titre de film"
        />
        <Button
          style={styles.button}
          title="Rechercher"
          onPress={() => this._searchFilms()}
        />
        <FilmList
          films={this.state.films}
          navigation={this.props.navigation}
          loadFilms={this._loadFilms}
          page={this.page}
          totalPages={this.totalPages}
          favoriteList={false}
        />
        {this._displayLoading()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    marginLeft: 5,
    marginRight: 5,
    borderColor: "#000000",
    borderWidth: 1,
    paddingLeft: 5,
    height: 50,
  },
  button: {
    height: 50,
  },
  main_container: {
    marginTop: 20,
    flex: 1,
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Search;
