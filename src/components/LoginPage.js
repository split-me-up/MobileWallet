import React from "react";
import { Alert, Button, Text, View, StyleSheet, TextInput } from "react-native";
import SocketIOClient from "socket.io-client";
import { registerWithUsername, loginWithUsername } from "../socket";

import { getDaiBalance, fillBalance } from "../web3Functions";
import Wallet from "./Wallet";
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
        <View>
          <Text>
            Import a previous account or enter a username to genearete a new key
          </Text>

          <Button
            title="import account"
            onPress={() => {
              this.props.navigation.navigate("ImportAccount");
            }}
          />

          <Text>
            Import a previous account or enter a username to genearete a new key
          </Text>
          <Button
            title="Create account"
            onPress={() => {
              this.props.navigation.navigate("CreateAccount");
            }}
          />
        </View>
      );
    }
    return <Wallet dail_balance={this.state.dail_balance} />;
  }
}
export default LoginPage;
