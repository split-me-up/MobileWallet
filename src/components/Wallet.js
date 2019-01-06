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
import { loginWithUsername } from "../socket";
class Wallet extends React.Component {
    state = {
        dai_balance: 0
    };
    componentDidMount() {
        // Permissions.getAsync(Permissions.NOTIFICATIONS).then(status => {
        //   console.log("permission status: ", status);
        //   Notifications.getExpoPushTokenAsync().then(token => {
        //     console.log("expo push token: ", token);
        //   });
        // });
        this.socket = SocketIOClient("http://splitmeup-v2.herokuapp.com/");
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
