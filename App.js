import React from "react";
import { Button, Text, View } from "react-native";
import "./global";
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "./src/components/HomeScreen";
import LoginPage from "./src/components/LoginPage";
import ImportAccount from "./src/components/ImportAccount";
import CreateAccount from "./src/components/CreateAccount";
import Wallet from "./src/components/Wallet";
const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    LoginPage: {
        screen: LoginPage
    },
    ImportAccount: {
        screen: ImportAccount
    },
    CreateAccount: {
        screen: CreateAccount
    },
    Wallet: {
        screen: Wallet
    },
    initialRouteName: "Home"
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    render() {
        console.disableYellowBox = true;
        return <AppContainer />;
    }
}
