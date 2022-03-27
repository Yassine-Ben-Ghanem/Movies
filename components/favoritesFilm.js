import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import FilmList from "./filmList";

class FavoritesFilm extends React.Component {
  render() {
    console.log(this.props);
    return (
      <FilmList
        films={this.props.favoriteFilm}
        navigation={this.props.navigation}
        favoriteList={true}
      />
    );
  }
}
const styles = StyleSheet.create({
  text: {
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    favoriteFilm: state.favoriteFilm,
  };
};

export default connect(mapStateToProps)(FavoritesFilm);
