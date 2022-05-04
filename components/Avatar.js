import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
// import { ImagePicker } from "react-native-image-picker";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { connect } from "react-redux";

class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: require("../assets/avatar.png"),
    };
  }

  _avatarClicked = async () => {
    const response = await launchCamera();
    if (response.didCancel) {
      console.log("L'utilisateur a annulé");
    } else if (response.error) {
      console.log("Erreur : ", response.error);
    } else {
      console.log("Photo : ", response.assets[0].uri);
      let requireSource = { uri: response.assets[0].uri };
      console.log("requireSource : ", requireSource);
      const action = { type: "SET_AVATAR", value: requireSource };
      this.props.dispatch(action);
    }
  };
  render() {
    console.log("state ", this.state.avatar);
    return (
      <TouchableOpacity
        style={styles.TouchableOpacity}
        onPress={this._avatarClicked}
      >
        <Image style={styles.avatar} source={this.props.avatar} />
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  touchableOpacity: {
    margin: 5,
    width: 100, // Pensez bien à définir une largeur ici, sinon toute la largeur de l'écran sera cliquable
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "#9B9B9B",
    borderWidth: 2,
  },
});
const mapStateToProps = (state) => {
  return {
    avatar: state.setAvatar.avatar,
  };
};

export default connect(mapStateToProps)(Avatar);
