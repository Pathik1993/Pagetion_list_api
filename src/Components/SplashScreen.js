/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { StackActions, NavigationActions } from "react-navigation";

export default class SplashScreen extends Component {
  componentDidMount() {
    setTimeout(() => {
      const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: "Home"
            })
          ]
        });
          this.props.navigation.dispatch(resetAction);
    }, 500);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>Test</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textStyle: {
    fontSize: 38,
    color: "black"
  }
});
