import React from "react";
import { Button, Text, View, StyleSheet, AsyncStorage } from "react-native";
import { _retrieveData } from "../helpers";
import firebase from "react-native-firebase";
import socketClientIP from "../socket";
const styles = StyleSheet.create({
  button: {
    width: 100,
    color: "red"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    height: 600
  },
  box: {
    width: 200,
    height: 300,
    backgroundColor: "skyblue",
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 30
  },
  text: {
    textAlign: "center",
    marginTop: 10
  }
});

class HomeScreen extends React.Component {
  onTokenRefreshListener = username => {
    console.log("inside onTokenRefreshListener");
    firebase.messaging().onTokenRefresh(fcmToken => {
      //send username and fcmtoken from here
      console.log("inside onTokenRefresh");
      fetch(socketClientIP + "/updateToken", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          fcmToken: fcmToken
        })
      }).then(response => {
        console.log(response);
      });
    });
  };
  componentDidMount() {
    // AsyncStorage.clear();
    _retrieveData("username")
      .then(username => {
        console.log("inside _retrieveData before onTokenRefreshListener");
        if (username) {
          this.onTokenRefreshListener(username);
        }
      })
      .catch(err => {
        console.log("no username found");
      });

    // console.log(firebase);
    firebase
      .messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          console.log("user has permission");
        } else {
          firebase
            .messaging()
            .requestPermission()
            .then(() => {
              console.log("user has authorised");
            })
            .catch(error => {
              console.log("User has rejected permissions");
            });
        }
      });
  }
  choose_navigation_path = () => {
    console.log("inside choose_navigation_path");
    _retrieveData("key").then(pvt_key => {
      console.log("inside retrieve key");
      _retrieveData("username").then(username => {
        if (pvt_key) {
          this.props.navigation.navigate("Wallet", {
            pvt_key: pvt_key,
            username: username
          });
        } else {
          this.props.navigation.navigate("LoginPage");
        }
      });
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Split Me Up</Text>
        <View style={styles.box}>
          <Button title="Open Wallet" onPress={this.choose_navigation_path} />
          <Button
            title="Backup SeedPhrase"
            onPress={() => this.props.navigation.navigate("Backup")}
          />
        </View>
      </View>
    );
  }
}
export default HomeScreen;
