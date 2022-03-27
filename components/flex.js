import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

class FlexTest extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "blue",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{ height: 50, width: 50, backgroundColor: "yellow" }}
        ></View>
        <View
          style={{ height: 50, width: 50, backgroundColor: "green" }}
        ></View>
        <View style={{ height: 50, width: 50, backgroundColor: "red" }}></View>
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
  },
  button: {
    height: 50,
  },
});
export default FlexTest;
