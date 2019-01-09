import React from "react";
import {
  Alert,
  Button,
  Text,
  View,
  StyleSheet,
  TextInput,
  AsyncStorage
} from "react-native";
import SocketIOClient from "socket.io-client";
import { registerWithUsername, socketClientIP } from "../socket";
import { KeyIsValid, getAccountAdress } from "../web3Functions";
import {
  verifyInputKey,
  _storeData,
  _retrieveData,
  getNotificationToken
} from "../helpers";
class ImportAccount extends React.Component {
  state = {
    private_key: "",
    import_account_placeholder: "enter your private key here",
    username_placeholder: ""
  };

  clearText = () => {
    console.log("inside clearText");

    this.setState({
      import_account_placeholder: "",
      private_key: ""
    });
  };
  clearUsername = () => {
    console.log("inside Clear Username");
    this.setState({
      username_placeholder: ""
    });
  };
  newSubmitKey = async () => {
    console.log("inside newSubmitKey");
    var input_pvt_key = this.refs["import-account-text-field"].props.value;
    this.setState({
      username: this.state.username_placeholder
    });
    verifyInputKey(input_pvt_key)
      .then(input_pvt_key => {
        this.setState({ private_key: input_pvt_key });
        console.log("key is valid fomat");
        this.socket = SocketIOClient(socketClientIP);
        socket = this.socket;
        getNotificationToken().then(fcmToken => {
          var address = getAccountAdress(input_pvt_key);
          registerWithUsername(this.state.username, fcmToken, address)
            .then(msg => {
              console.log("Inside then of registerWithUsername");
              console.log(msg);
              AsyncStorage.setItem("privateKey", this.state.private_key)
                .then(() => {
                  AsyncStorage.setItem("username", this.state.username).then(
                    () => {
                      this.props.navigation.navigate("Wallet", {
                        pvt_key: input_pvt_key,
                        username: this.state.username
                      });
                    }
                  );
                  console.log("hey don't ignore");
                })
                .catch(err => {
                  console.log(err);
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
      })
      .catch(err => {
        Alert.alert("Invalid Input Key", err, [
          {
            text: "re-enter private key",
            onPress: () => {
              this.clearText();
            }
          }
        ]);
      });
  };

  submitKey = () => {
    console.log("inside Submit Key");
    var input_pvt_key = this.refs["import-account-text-field"].props.value;
    this.setState({
      username: this.state.username_placeholder
    });
    if (input_pvt_key.length == 64) {
      input_pvt_key = "0x" + input_pvt_key;
      this.setState({ private_key: input_pvt_key }, () => {
        this.socket = SocketIOClient(socketClientIP);
        // console.log(this.socket);
        socket = this.socket;
        const usernameNotValid = registerWithUsername(this.state.username);
        console.log("usernameNotValid");
        console.log(usernameNotValid);
        if (usernameNotValid) {
          Alert.alert(
            "Invalid Username entered",
            "This username is already taken",
            [
              {
                text: "enter a different username",
                onPress: () => {
                  console.log("inside re enter username");
                  this.clearText();
                }
              }
            ]
          );
        } else {
          console.log(input_pvt_key);
          KeyIsValid(input_pvt_key).then(key_is_valid => {
            if (key_is_valid) {
              console.log("inside key is valid call if");
              this.setState({ username: this.state.username_placeholder });
              this.props.navigation.navigate("Wallet", {
                pvt_key: input_pvt_key
              });
            } else {
              console.log("inside key is valid call else");
              Alert.alert(
                "Account does not exist",
                "The key you have entered does not match any accounts on this chain",
                [
                  {
                    text: "enter a different key",
                    onPress: () => {
                      console.log("entered a non existent account");
                      this.clearText();
                    }
                  }
                ]
              );
            }
          });
        }
      });
    } else {
      Alert.alert(
        "Invalid Key entered",
        "The key you have entered is not 64 bits long",
        [
          {
            text: "Re-enter Key",
            onPress: () => {
              console.log("inside re enter key");
              this.clearText();
            }
          }
        ]
      );
    }
  };

  render() {
    return (
      <View>
        <TextInput
          value={this.state.import_account_placeholder}
          ref="import-account-text-field"
          onChangeText={text => {
            this.setState({ import_account_placeholder: text });
          }}
          onFocus={this.clearText}
        />
        <TextInput
          value={this.state.username_placeholder}
          onChangeText={text => {
            this.setState({ username_placeholder: text });
          }}
          onFocus={this.clearUsername}
        />
        <Button title="Submit Key" onPress={this.newSubmitKey} />
      </View>
    );
  }
}
export default ImportAccount;
