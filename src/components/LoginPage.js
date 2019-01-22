import React from "react";
import { Alert, StyleSheet, TextInput } from "react-native";
import SocketIOClient from "socket.io-client";
import { registerWithUsername, loginWithUsername } from "../socket";

import { getDaiBalance, fillBalance } from "../web3Functions";
import Wallet from "./Wallet";
import {
  Container,
  Content,
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
class LoginPage extends React.Component {
  state = {
    username: "",
    username_placeholder: "Enter Username",
    private_key: "",
    import_account_clicked: false,
    import_account_placeholder: "enter your private key here",
    dail_balance: ""
  };

  render() {
    if (this.state.username == "" && this.state.private_key == "") {
      return (
        <Container>
          <Header>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}
              >
                <Icon type="FontAwesome5" name="arrow-left" />
              </Button>
            </Left>
            <Body />
            <Right />
          </Header>
          <Content>
            <Card>
              <Text>
                Import a previous account or enter a username to genearete a new
                key
              </Text>

              <Button
                onPress={() => {
                  this.props.navigation.navigate("ImportAccount");
                }}
              >
                <Text>Import Account</Text>
              </Button>
            </Card>
            <Card>
              <Text>
                Import a previous account or enter a username to genearete a new
                key
              </Text>
              <Button
                onPress={() => {
                  this.props.navigation.navigate("CreateAccount");
                }}
              >
                <Text>Create Account</Text>
              </Button>
            </Card>
          </Content>
        </Container>
      );
    }
    return <Wallet dail_balance={this.state.dail_balance} />;
  }
}
export default LoginPage;
