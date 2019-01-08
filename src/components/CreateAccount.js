import React from "react";
import SocketIOClient from "socket.io-client";
import {
  Alert,
  ActivityIndicator,
  Button,
  Text,
  View,
  StyleSheet,
  TextInput,
  AsyncStorage
} from "react-native";
import { registerWithUsername, socketClientIP } from "../socket";
import { getNotificationToken } from "../helpers";
class CreateAccount extends React.Component {
  state = {
    placeholder: "Enter a username to get started",
    username: ""
  };
  clearUsername = () => {
    console.log("inside Clear Username");
    this.setState({
      placeholder: ""
    });
  };
  componentWillUnmount() {
    console.log("inside component will unmount");
    this.socket.disconnect();
  }
  submitUsername = () => {
    this.setState(
      {
        username: this.state.placeholder
      },
      () => {
        var input_username = this.state.username;
        this.socket = SocketIOClient(socketClientIP);
        socket = this.socket;
        getNotificationToken().then(fcmToken => {
          registerWithUsername(input_username, fcmToken)
            .then(msg => {
              console.log(msg);
              AsyncStorage.setItem("username", input_username);
              this.props.navigation.navigate("Wallet", {
                username: input_username,
                pvt_key: null
              });
            })
            .catch(err => {
              console.log(err);
              console.log("Inside catch of registerWithUsername");

              Alert.alert("Username taked", err, [
                {
                  text: "choose a different username",
                  onPress: () => {
                    this.clearUsername();
                  }
                }
              ]);
            });
        });
      }
    );
  };
  clearText = () => {
    this.setState({
      placeholder: ""
    });
  };
  render() {
    return (
      <View>
        <Text> create and account by entering a username below</Text>
        <TextInput
          value={this.state.placeholder}
          ref="username-text-field"
          onChangeText={text => {
            this.setState({ placeholder: text });
          }}
          onFocus={this.clearText}
        />

        <Button title="Submit Username" onPress={this.submitUsername} />
      </View>
    );
  }
}
export default CreateAccount;
