import React from "react";
import Constants from "expo-constants";
import { View, StyleSheet, ScrollView } from "react-native";
import { useApolloClient, useQuery } from "@apollo/client";
import { useHistory } from "react-router-native";

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
  const history = useHistory();

  const logOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore().then(history.push("/"));
    console.log("loggin out", data.authorizedUser);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab path="/">Repositories</AppBarTab>
        {!data?.authorizedUser ? (
          <>
            <AppBarTab path="/signin">Sign In</AppBarTab>
            <AppBarTab path="/signup">Sign Up</AppBarTab>
          </>
        ) : (
          <>
            <AppBarTab path="/newreview">Create a Review</AppBarTab>
            <AppBarTab path="/userreview">My Reviews</AppBarTab>
            <AppBarTab onPress={logOut} pressable>
              Sign Out
            </AppBarTab>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
