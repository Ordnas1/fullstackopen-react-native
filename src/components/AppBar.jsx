import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import { View, StyleSheet, ScrollView } from "react-native";
import { useApolloClient, useQuery } from "@apollo/client";

import useAuthStorage from "../hooks/useAuthStorage";
import theme from "../theme";

import AppBarTab from "./AppBarTab";

import { IS_AUTHORIZED_USER } from "../graphql/queries";

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
  const { loading, error, data } = useQuery(IS_AUTHORIZED_USER);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  useEffect(() => {
    const checkIfUserLogged = async () => {
      console.log("authorized data", data.authorizedUser);
    };
    checkIfUserLogged();
  }, []);

  const logOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    console.log("loggin out", data.authorizedUser);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab path="/">Repositories</AppBarTab>
        {!data?.authorizedUser ? (
          <AppBarTab path="/signin">Sign In</AppBarTab>
        ) : (
          <AppBarTab onPress={logOut} pressable>
            Sign Out
          </AppBarTab>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
