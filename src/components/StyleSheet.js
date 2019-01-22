import React from "react";
import { StyleSheet } from "react-native";
export default StyleSheet.create({
  button: {
    marginTop: 10,
    backgroundColor: "rgb(1, 209, 178)",
    width: 400,
    height: 100
  },
  header: {
    backgroundColor: "rgb(34, 208, 178)",
    height: 140
  },
  subtitle: {
    textAlign: "center",
    fontFamily: "pacifico",
    alignSelf: "stretch",
    marginTop: 6
  },
  icons: {
    color: "rgb(47, 166, 154)",
    fontSize: 50
  },
  contentContainer: { justifyContent: "center", flex: 1, alignSelf: "center" },
  title: {
    fontFamily: "pacifico",
    textAlign: "center",
    fontSize: 30,
    alignSelf: "stretch"
  },
  text: {
    color: "white",
    fontFamily: "josefinSans-bold",
    fontSize: 30
  },
  content: {
    backgroundColor: "rgb(239, 239, 239)"
  },
  body: {
    flex: 1,
    justifyContent: "center"
  }
});
