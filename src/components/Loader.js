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
  Icon,
  Spinner
} from "native-base";

class Loader extends React.Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Text>{this.props.message}</Text>
          <Spinner color="red" />
        </Content>
      </Container>
    );
  }
}

export default Loader;
