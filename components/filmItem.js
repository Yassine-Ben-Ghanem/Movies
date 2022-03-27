import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { getImageFromApi } from "../API/TMDBApi";
import Icon from "react-native-vector-icons/AntDesign";
import CachedImage from "react-native-expo-cached-image";
import FadeIn from "../Animations/FadeIn";

class FilmItem extends React.Component {
  _displayFavoriteImage() {
    if (this.props.isFilmFavorite) {
      return (
        // <Image
        //   style={styles.favorite_image}
        //   source={require("../assets/favorite.png")}
        // />
        <Icon name="heart" size={40} />
      );
    }
  }
  render() {
    const { displayDetailForFilm, film } = this.props;

    return (
      <FadeIn>
        <TouchableOpacity
          onPress={() => displayDetailForFilm(film.id)}
          style={styles.main_container}
        >
          <CachedImage
            style={styles.image_film}
            source={
              film.poster_path
                ? {
                    uri: getImageFromApi(film.poster_path),
                  }
                : require("../assets/not-found.png")
            }
          />
          <View style={styles.right_bloc}>
            <View style={styles.header}>
              {this._displayFavoriteImage()}
              <Text style={styles.tiltle_text}>{film.title}</Text>
              <Text style={styles.vote_text}>{film.vote_average}</Text>
            </View>
            <View style={styles.description}>
              <Text style={styles.description_text} numberOfLines={6}>
                {film.overview}
              </Text>
            </View>
            <View style={styles.date}>
              <Text style={styles.date_text}>
                Sortie le {film.release_date}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </FadeIn>
    );
  }
}
const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: "row",
  },
  image_film: {
    width: 120,
    height: 180,
    margin: 5,
  },
  right_bloc: {
    flex: 1,
    margin: 5,
  },
  header: {
    flexDirection: "row",
    flex: 3,
  },
  tiltle_text: {
    fontWeight: "bold",
    fontSize: 20,
    flex: 1,
    flexWrap: "wrap",
    paddingRight: 5,
  },
  vote_text: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#666666",
  },
  description: {
    flex: 7,
  },
  description_text: {
    fontStyle: "italic",
    color: "#666666",
  },
  date: {
    flex: 1,
  },
  date_text: {
    textAlign: "right",
    fontSize: 14,
  },
  favorite_image: {
    height: 40,
    width: 40,
    marginRight: 5,
  },
});
export default FilmItem;
