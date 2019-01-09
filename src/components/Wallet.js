import React from "react";
import {
  AsyncStorage,
  Alert,
  Button,
  Text,
  View,
  StyleSheet,
  TextInput,
  AppState
} from "react-native";
// import { Permissions, Notifications } from "expo";
import { fillBalance } from "../web3Functions";
import SocketIOClient from "socket.io-client";
import { loginWithUsername, socketClientIP } from "../socket";
import { decryptObject, encryptShardToSendIt } from "../helpers";
class Wallet extends React.Component {
  state = {
    dai_balance: 0,
    username: "",
    key: [],
    value: [],
    appstate: AppState.currentState
  };
  loginOnSockets = () => {
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
  };
  handleResponse = (response, pkey) => {
    console.log("inside handle response");
    response.forEach(message => {
      console.log("message:", message);
      var decrypted_object = decryptObject(message, pkey);
      console.log("decrypted_object:", decrypted_object);
      // setTimeout(() => {

      var isRequest = decrypted_object.isRequest;
      if (!isRequest) {
        var identity = decrypted_object.identity;
        var shard = decrypted_object.shard;
        console.log("identity: ", identity);
        console.log("shard: ", shard);
        console.log("");
        AsyncStorage.setItem(identity, shard).then(res => {
          console.log("storing on device promise:", decrypted_object.identity);
          this.setState({
            key: [...this.state.key, decrypted_object.identity],
            value: [...this.state.value, decrypted_object.shard]
          });
        });
      } else {
        var key = decrypted_object.key;
        var publicKey = decrypted_object.publicKey;
        var user_to_be_sent = decrypted_object.username;
        _retrieveData(key).then(shardToBeSent => {
          _retrieveData("username").then(my_username => {
            let object_to_be_sent = {
              userSending: my_username,
              shard: shardToBeSent
            };
            encrypted_object = encryptShardToSendIt(
              object_to_be_sent,
              publicKey
            );
            socket.emit("send shard to user", {
              user_to_be_sent: user_to_be_sent,
              encrypted_object: encrypted_object
            });
          });
        });
      }

      // }, 1000);
    });
  };
  _handleAppStateChange = newAppState => {
    console.log("newAppState: ", newAppState);
    if (newAppState == "background") {
      this.socket.disconnect();
      console.log("socket disconnected successfully");
    } else if (newAppState == "active") {
      this.loginOnSockets();
      console.log("socket connected again");
    }
  };
  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
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
      })
        .then(res => {
          res.json().then(response => {
            console.log("inside pormise", response);
            _retrieveData("key").then(key => {
              this.handleResponse(response, key);
            });
          });
          // res = await res.json();
        })
        .catch(err => {
          console.log(err);
        });
    });

    this.loginOnSockets();
  }
  componentWillUnmount() {
    console.log("inside component will unmount on wallet");
    this.socket.disconnect();
    console.log("socket disconnected successfully");
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
        <Text>
          Your Private Key is: {this.props.navigation.getParam("pvt_key")}
        </Text>
        {this.state.value.map(item => {
          return <Text key={Math.random()}> {item} </Text>;
        })}
      </View>
    );
  }
}
export default Wallet;
