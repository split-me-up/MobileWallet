import React from "react";
import { Linking, View, StyleSheet, AsyncStorage } from "react-native";
import { _retrieveData } from "../helpers";
import firebase from "react-native-firebase";
import socketClientIP from "../socket";
import styles from "./StyleSheet";
import {
  Container,
  Content,
  Header,
  Title,
  Icon,
  Subtitle,
  Body,
  Left,
  Right,
  Button,
  Card,
  Text
} from "native-base";

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
    _retrieveData("privateKey").then(pvt_key => {
      console.log("inside retrieve key");
      console.log(pvt_key);
      _retrieveData("username").then(username => {
        if (pvt_key) {
          console.log(pvt_key);
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
      <Container>
        <Header style={styles.headerMain}>
          <Body>
            <Title style={styles.title}>Split Me Up</Title>
            <Subtitle style={styles.subtitle}>
              The digital way to backup Private Keys
            </Subtitle>
            <Subtitle style={styles.subtitle}>
              <Text
                onPress={() =>
                  Linking.openURL(
                    "https://github.com/pranav-singhal/SplitMeUp2.git"
                  )
                }
              >
                <Icon type="FontAwesome" name="github" />
              </Text>
            </Subtitle>
          </Body>
        </Header>
        <Content
          padder
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
        >
          <Button
            full
            light
            onPress={this.choose_navigation_path}
            style={styles.button}
          >
            <Text style={styles.text}>Open Wallet</Text>
          </Button>
          <Button
            style={styles.button}
            full
            light
            onPress={() => this.props.navigation.navigate("Backup")}
          >
            <Text style={styles.text}>Backup SeedPhrase</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
export default HomeScreen;
