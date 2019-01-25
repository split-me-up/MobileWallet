import React from "react";
import SocketIOClient from "socket.io-client";
import {
  Alert,
  ActivityIndicator,
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
import styles from "./StyleSheet";
import { registerWithUsername, socketClientIP } from "../socket";
import { getNotificationToken } from "../helpers";
import { CreateNewAccount } from "../web3Functions";
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
    if (this.socket !== undefined) {
      this.socket.disconnect();
    }
    console.log("inside component will unmount");
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
          var newAccountOBject = CreateNewAccount();
          registerWithUsername(
            input_username,
            fcmToken,
            newAccountOBject.address
          )
            .then(msg => {
              console.log(msg);
              AsyncStorage.setItem("username", input_username);

              this.props.navigation.navigate("Wallet", {
                username: input_username,
                pvt_key: newAccountOBject.privateKey
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
              Create an Ethereum account by entering a username below
            </Text>
            <Item>
              <Input
                value={this.state.placeholder}
                ref="username-text-field"
                onChangeText={text => {
                  this.setState({ placeholder: text });
                }}
                onFocus={this.clearText}
              />
            </Item>
          </Form>
          <Button
            full
            title="Submit Username"
            onPress={this.submitUsername}
            style={[styles.button, { alignSelf: "center" }]}
          >
            <Text style={styles.text}> Submit UserName</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
export default CreateAccount;
