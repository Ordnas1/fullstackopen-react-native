import React from "react";
import { StyleSheet, View } from "react-native";
import { Route, Switch, Redirect } from "react-router-native";

// Components
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";

// Views
import SignIn from "./SignIn";
import SingleRepository from "./SingleRepository";
import CreateReview from "./CreateReview";
import SignUp from "./SignUp";
import UserReviews from "./UserReviews";

// Theme import
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/signin" exact>
          <SignIn />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/newreview">
          <CreateReview />
        </Route>
        <Route path="/userreview">
          <UserReviews />
        </Route>
        <Route path="/:repositoryId">
          <SingleRepository />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;
