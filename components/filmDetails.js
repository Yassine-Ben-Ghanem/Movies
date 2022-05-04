import moment from "moment";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
  Share,
  Platform,
} from "react-native";
import { getFilmDetailFromApi } from "../API/TMDBApi";
import { getImageFromApi } from "../API/TMDBApi";
import numeral from "numeral";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/EvilIcons";
import CachedImage from "react-native-expo-cached-image";

class FilmDetail extends React.Component {
  static navigationOptions;

  constructor(props) {
    super(props);
    this.state = {
      film: undefined,
      isLoading: true,
    };
  }

  _updateNavigationParams() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => this._shareFilm()}>
          <Icon2 name="share-apple" size={40} />
        </TouchableOpacity>
      ),
    });
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

  componentDidMount() {
    const { filmId } = this.props.route.params;
    const favoriteFilmIndex = this.props.favoriteFilm.findIndex(
      (item) => item.id === filmId
    );
    if (favoriteFilmIndex !== -1) {
      this.setState(
        {
          film: this.props.favoriteFilm[favoriteFilmIndex],
          isLoading: false,
        },
        () => {
          Platform.OS === "ios" ? this._updateNavigationParams() : null;
        }
      );
      return;
    }
    this.setState({ isLoading: true });
    const { route } = this.props;
    getFilmDetailFromApi(filmId).then((data) => {
      this.setState(
        {
          film: data,
          isLoading: false,
        },
        () => {
          Platform.OS === "ios" ? this._updateNavigationParams() : null;
        }
      );
    });
  }

  _shareFilm() {
    const { film } = this.state;
    Share.share({ title: film.title, message: film.overview });
  }

  _toggleFavorite() {
    const action = { type: "TOGGLE_FAVORITE", value: this.state.film };
    this.props.dispatch(action);
  }

  _displayFavoriteImage() {
    if (
      this.props.favoriteFilm.findIndex(
        (item) => item.id === this.state.film.id
      ) !== -1
    ) {
      return <Icon name="heart" size={60} />;
    } else {
      return <Icon name="hearto" size={40} />;
    }
  }

  _displayFloatingActionButton() {
    const { film } = this.state;
    console.log(film);
    if (film != undefined && Platform.OS === "android") {
      return (
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={() => this._shareFilm()}
        >
          <Icon name="sharealt" size={40} color="#fff" />
        </TouchableOpacity>
      );
    }
  }

  _displayFilm() {
    const film = this.state.film;
    console.log(film);
    if (film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <CachedImage
            style={styles.image_film}
            source={
              film.backdrop_path
                ? {
                    uri: getImageFromApi(film.backdrop_path),
                  }
                : require("../assets/not-found.png")
            }
          />
          <Text style={styles.title_text}>{film.title}</Text>
          <TouchableOpacity
            style={styles.favorite_container}
            onPress={() => this._toggleFavorite()}
          >
            {this._displayFavoriteImage()}
          </TouchableOpacity>
          <Text style={styles.description_text}>{film.overview}</Text>
          <Text style={styles.default_text}>
            sortie le {moment(new Date(film.release_date)).format("L")}
          </Text>
          <Text style={styles.default_text}>
            Note : {film.vote_average} / 10
          </Text>
          <Text style={styles.default_text}>
            Budget : {numeral(film.budget).format("0,0[.]00 $")}
          </Text>
          <Text style={styles.default_text} t>
            Genre (s) : {film.genres.map((obj) => obj.name).join(" / ")}
          </Text>
          <Text style={styles.default_text}>
            Companie (s) :{" "}
            {film.production_companies.map((obj) => obj.name).join(" / ")}
          </Text>
        </ScrollView>
      );
    }
  }
  render() {
    console.log("test");
    // console.log(this.props);
    // const film = route.params;
    return (
      <View style={styles.main_container}>
        {this._displayFilm()}
        {this._displayLoading()}
        {this._displayFloatingActionButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollview_container: {
    flex: 1,
    backgroundColor: "red",
  },
  main_container: {
    flex: 1,
  },
  image_film: {
    height: 200,
  },

  main_container: {
    flex: 1,
  },
  favorite_container: {
    alignItems: "center",
  },
  favoriteImage: {
    width: 40,
    height: 40,
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollview_container: {
    flex: 1,
  },
  image: {
    height: 169,
    margin: 5,
  },
  title_text: {
    fontWeight: "bold",
    fontSize: 35,
    flex: 1,
    flexWrap: "wrap",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: "#000000",
    textAlign: "center",
  },
  description_text: {
    fontStyle: "italic",
    color: "#666666",
    margin: 5,
    marginBottom: 15,
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  share_touchable_floatingactionbutton: {
    height: 60,
    width: 60,
    position: "absolute",
    bottom: 30,
    right: 10,
    backgroundColor: "blue",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    favoriteFilm: state.toggleFavorite.favoriteFilm,
  };
};

export default connect(mapStateToProps)(FilmDetail);
