// Components/Test.js

import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import Hello from "./hello";

class Test extends React.Component {
  render() {
    return (
      <View style={styles.main_container}>
        {/* <View style={styles.subview_container}></View> */}
        <Hello />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subview_container: {
    height: 80,
    width: 80,
    backgroundColor: Platform.OS === "ios" ? "yellow" : "green",
  },
});

export default Test;
