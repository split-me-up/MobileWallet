import React from "react";
import {
  AsyncStorage,
  Alert,
  Button,
  Text,
  View,
  StyleSheet,
  TextInput
} from "react-native";
// import { Permissions, Notifications } from "expo";
import { fillBalance } from "../web3Functions";
import SocketIOClient from "socket.io-client";
import { loginWithUsername, socketClientIP } from "../socket";
import { decryptObject } from "../helpers";
class Wallet extends React.Component {
  state = {
    dai_balance: 0,
    username: ""
  };
  componentDidMount() {
    // Permissions.getAsync(Permissions.NOTIFICATIONS).then(status => {
    //   console.log("permission status: ", status);
    //   Notifications.getExpoPushTokenAsync().then(token => {
    //     console.log("expo push token: ", token);
    //   });
    // });
    _retrieveData("username").then(username => {
      this.setState({ username: username });
      fetch(socketClientIP + "/latestMessages", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: this.state.username })
      }).then(res => {
        res.json().then(response => {
          console.log("inside pormise", response);
          response.forEach(message => {
            _retrieveData("key").then(key => {
              console.log("key:", key);
              console.log("message:", message);
              decrypted_object = decryptObject(message, key);
              console.log("decrypted_object:", decrypted_object);
              _storeData(decrypted_object.identity, decrypted_object.shard);
            });
          });
        });
        // res = await res.json();
      });
    });

    this.socket = SocketIOClient(socketClientIP);
    socket = this.socket;
    AsyncStorage.getItem("username")
      .then(username => {
        console.log("inside get item");
        loginWithUsername(username).then(() => {
          console.log("logged in with username");
          this.getDaiBalance();
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  getDaiBalance = () => {
    fillBalance(this.props.navigation.getParam("pvt_key"), dai => {
      console.log("inside fill balance");
      console.log(this.props.navigation.getParam("pvt_key"));
      console.log("dai:", dai);
      if (dai == 0) {
        this.setState({
          dai_balance: "zero"
        });
      } else {
        this.setState({ dai_balance: dai });
      }
    });
  };

  render() {
    return (
      <View>
        <Text>Welcome {this.props.navigation.getParam("username")}</Text>
        <Text>{this.state.dai_balance || " wait for your dail balance"}</Text>
      </View>
    );
  }
}
export default Wallet;
