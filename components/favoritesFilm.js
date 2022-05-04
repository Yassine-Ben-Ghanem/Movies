import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import FilmList from "./filmList";
import Avatar from "./Avatar";
class FavoritesFilm extends React.Component {
  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.avatar_container}>
          <Avatar />
        </View>
        <FilmList
          films={this.props.favoriteFilm}
          navigation={this.props.navigation}
          favoriteList={true}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  avatar_container: {
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    favoriteFilm: state.toggleFavorite.favoriteFilm,
  };
};

export default connect(mapStateToProps)(FavoritesFilm);
