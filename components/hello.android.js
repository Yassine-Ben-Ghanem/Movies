// Components/Test.js

import React from "react";
import { StyleSheet, View, Platform, Text } from "react-native";

class Hello extends React.Component {
  render() {
    return <Text>hello andoid</Text>;
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

export default Hello;
