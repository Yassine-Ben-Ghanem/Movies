import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import FilmItem from "./filmItem";
class FilmList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
    };
  }

  _displayDetailForFilm = (filmId) => {
    this.props.navigation.navigate("Details", { filmId });
  };

  render() {
    return (
      <FlatList
        // style={styles.list}
        data={this.props.films}
        extraData={this.props.favoriteFilm}
        keyExtractor={(item) => item.id.toString()}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (
            !this.props.favoriteList &&
            this.props.page < this.props.totalPages
          ) {
            this.props.loadFilms();
          }
        }}
        renderItem={({ item }) => (
          <FilmItem
            film={item}
            displayDetailForFilm={this._displayDetailForFilm}
            isFilmFavorite={
              this.props.favoriteFilm.findIndex(
                (film) => film.id === item.id
              ) !== -1
                ? true
                : false
            }
          />
        )}
      />
    );
  }
}
const styles = StyleSheet.create({
  //   list: {
  //     flex: 1,
  //   },
});
const mapStateToProps = (state) => {
  return {
    favoriteFilm: state.toggleFavorite.favoriteFilm,
  };
};

export default connect(mapStateToProps)(FilmList);
