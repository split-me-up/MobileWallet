import React from "react";
import { Text, View } from "react-native";
import { Header, Left, Button, Icon, Body, Right } from "native-base";
import "./global";
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "./src/components/HomeScreen";
import LoginPage from "./src/components/LoginPage";
import ImportAccount from "./src/components/ImportAccount";
import CreateAccount from "./src/components/CreateAccount";
import Wallet from "./src/components/Wallet";

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  LoginPage: {
    screen: LoginPage,
    navigationOptions: {
      header: null
    }
  },
  ImportAccount: {
    screen: ImportAccount,
    navigationOptions: {
      header: null
    }
  },
  CreateAccount: {
    screen: CreateAccount,
    navigationOptions: {
      header: null
    }
  },
  Wallet: {
    screen: Wallet,
    navigationOptions: {
      header: null
    }
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
