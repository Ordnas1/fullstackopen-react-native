import React from "react";

import { Text, StyleSheet, Pressable } from "react-native";
import { Link } from "react-router-native";

import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: "700",
  },
  tab: {
    flexGrow: 0,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 12,
    paddingRight: 8,
  },
});

const AppBarTab = (props) => {
  return props.pressable ? (
    <Pressable style={styles.tab} onPress={props.onPress}>
      <Text style={styles.text}>{props.children}</Text>
    </Pressable>
  ) : (
    <Link style={styles.tab} to={props.path}>
      <Text style={styles.text}>{props.children}</Text>
    </Link>
  );
};

export default AppBarTab;
