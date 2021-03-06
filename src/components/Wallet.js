import React from "react";

import { AsyncStorage, Alert, View, StyleSheet, AppState } from "react-native";
import {
  Container,
  Content,
  Thumbnail,
  CardItem,
  Header,
  Title,
  Subtitle,
  Body,
  Left,
  Right,
  Button,
  Card,
  Text,
  Icon
} from "native-base";
import styles from "./StyleSheet";
import Loader from "./Loader";
import { fillBalance } from "../web3Functions";
import SocketIOClient from "socket.io-client";
import { loginWithUsername, socketClientIP } from "../socket";
import { decryptObject, encryptShardToSendIt } from "../helpers";
class Wallet extends React.Component {
  state = {
    dai_balance: 0,
    username: "",
    key: [],
    sentMsgCount: 0,
    loading: true,
    loadingMessage: "",
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
    this.setState({
      loadingMessage: "Please wait while we fetch your latest messages"
    });
    console.log("inside handle response");
    var i = 0;
    if (response.length === 0) {
      console.log("inside response.length === 0");
      this.setState({
        loading: false
      });
      Alert.alert("No message Recieved", "You don't have any new messages", [
        {
          text: "Ok"
        }
      ]);
    }
    let fireAlertforMessage = () => {
      if (i <= response.length) {
        console.log("inside this");

        this.setState({
          loading: false
        });
        if (this.state.sentMsgCount == 0) {
          Alert.alert(
            "No reward Recieved",
            "sorry! you did not recieve a reward at this time. You may have recieved a new piece so open the app next time you get a notification",
            [
              {
                text: "Ok"
              }
            ]
          );
        } else {
          Alert.alert(
            "Reward Recieved",
            `Congrats! you have recieved ${this.state.sentMsgCount *
              0.5} Dai which will be reflected in your balance soon!`,
            [
              {
                text: "Ok"
              }
            ]
          );
        }
      }
    };
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
        i++;
        fireAlertforMessage();
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
            socket.on("message sent", bool => {
              if (bool) {
                console.log("inside if of on message sent");
                console.log(this.state.sentMsgCount);
                this.setState({
                  sentMsgCount: this.state.sentMsgCount + 1
                });
              }
              i++;
              fireAlertforMessage();
            });
          });
        });
      }

      console.log("i:", i);

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
    if (this.state.loading) {
      return <Loader message={this.state.loadingMessage} />;
    } else {
      return (
        <Container>
          <Header style={styles.header}>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}
              >
                <Icon type="FontAwesome" name="arrow-left" />
              </Button>
            </Left>
            <Body />
            <Right />
          </Header>

          <Content style={styles.content}>
            <Card style={styles.assetCard}>
              <CardItem>
                <Text>
                  Welcome {this.props.navigation.getParam("username")}
                </Text>
              </CardItem>
              <CardItem>
                <Left>
                  <Text>Asset</Text>
                </Left>
                <Right>
                  <Text>Quantity</Text>
                </Right>
              </CardItem>
              <CardItem>
                <Left>
                  <Thumbnail
                    style={styles.assetThumbnails}
                    source={require("../assets/images/dai.png")}
                  />
                  <Text style={styles.walletAssetText}>Dai</Text>
                </Left>
                <Right>
                  <Text style={styles.assetQuantity}>
                    {this.state.dai_balance || " Loading"}
                  </Text>
                </Right>
              </CardItem>
            </Card>
            {
              //this.props.navigation.getParam("pvt_key")
            }
          </Content>
        </Container>
      );
    }
  }
}
export default Wallet;
