import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-native";

import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import { CREATE_USER } from "../graphql/mutations";

import useSignIn from "../hooks/useSignIn";

import theme from "../theme";

const initialValues = {
  username: "",
  password: "",
  passwordConfirm: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(1, "Username must have a length greater than ${min} character")
    .max(30, "Username must have a length lesser than ${max} characters"),
  password: Yup.string()
    .required()
    .min(5, "Password must have a length greater than ${min} characters")
    .max(30, "Password must have a length lesser than ${max} characters"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password confirmation doesn't match")
    .required("Password confirmation is required"),
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 8,
  },
  textInput: {
    padding: 8,
    borderWidth: 1,
    backgroundColor: theme.colors.white,
    marginBottom: 6,
    marginTop: 8,
    borderRadius: 4,
  },
  submitButton: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: theme.colors.primary,
  },
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name="username"
        placeholder="Enter username"
        style={styles.textInput}
        textContent="username"
      />
      <FormikTextInput
        name="password"
        placeholder="Enter your password"
        style={styles.textInput}
        textcontent="newPassword"
        secureTextEntry
      />
      <FormikTextInput
        name="passwordConfirm"
        placeholder="Confirm your password"
        style={styles.textInput}
        textContent="newPassword"
        secureTextEntry
      />
      <Pressable
        style={styles.submitButton}
        onPress={onSubmit}
        testID="submitPressable"
      >
        <Text color="white">Create User</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [addUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const history = useHistory()

  const onSubmit = (values) => {
    addUser({
      variables: { user: {username: values.username, password: values.password} },
    }).then(
      async () =>
        await signIn({ username: values.username, password: values.password })
    ).then(
      () => history.push("/")
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;
