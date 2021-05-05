import React from "react";
import Constants from "expo-constants";

import { View, StyleSheet, ScrollView } from "react-native";

import AppBarTab from "./AppBarTab";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
      <AppBarTab path="/">Repositories</AppBarTab>
        <AppBarTab path="/signin">Sign In</AppBarTab>
      </ScrollView>
    </View>
  );
};

export default AppBar;
