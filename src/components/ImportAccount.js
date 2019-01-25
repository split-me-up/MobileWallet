import React from "react";
import {
  Alert,
  Text,
  View,
  StyleSheet,
  TextInput,
  AsyncStorage
} from "react-native";
import {
  Container,
  Content,
  Header,
  Title,
  Subtitle,
  Body,
  Item,
  Left,
  Right,
  Button,
  Card,
  Icon,
  Input,
  Form
} from "native-base";
import SocketIOClient from "socket.io-client";
import { registerWithUsername, socketClientIP } from "../socket";
import { KeyIsValid, getAccountAdress } from "../web3Functions";
import styles from "./StyleSheet";
import {
  verifyInputKey,
  _storeData,
  _retrieveData,
  getNotificationToken
} from "../helpers";
class ImportAccount extends React.Component {
  state = {
    private_key: "",
    import_account_placeholder: "Enter your private key here",
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
  submitKey = async () => {
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
  componentWillUnmount() {
    if (this.socket !== undefined) {
      this.socket.disconnect();
    }
  }
  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon type="FontAwesome" name="arrow-left" />
            </Button>
          </Left>
          <Body />
          <Right />
        </Header>
        <Content
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
        >
          <Form>
            <Text style={styles.formText}>
              If you already have an Ethereum account, Enter your private key
              below( without the '0x') and choose a username
            </Text>
            <Item>
              <Input
                placeholder="Username"
                onChangeText={text => {
                  this.setState({ username_placeholder: text });
                }}
                onFocus={this.clearUsername}
              />
            </Item>
            <Item last>
              <Input
                placeholder="Enter your private key here"
                ref="import-account-text-field"
                onChangeText={text => {
                  this.setState({ import_account_placeholder: text });
                }}
                onFocus={this.clearText}
              />
            </Item>
          </Form>

          <Button
            style={[styles.button, { alignSelf: "center" }]}
            title="Submit Key"
            full
            onPress={this.submitKey}
          >
            <Text style={styles.text}>Submit Key</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
export default ImportAccount;
