import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useHistory } from "react-router-native";
import { Formik } from "formik";
import * as yup from "yup";

import Text from "./Text";
import FormikTextInput from "./FormikTextInput";

import useSignIn from "../hooks/useSignIn";

import theme from "../theme";

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

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const initialValues = {
  username: "",
  password: "",
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name="username"
        placeholder="username"
        style={styles.textInput}
        testID="usernameInput"
      />
      <FormikTextInput
        name="password"
        placeholder="password"
        secureTextEntry={true}
        style={styles.textInput}
        testID="passwordInput"
      />
      <Pressable
        style={styles.submitButton}
        onPress={onSubmit}
        testID="submitPressable"
      >
        <Text color="white">Sign In</Text>
      </Pressable>
    </View>
  );
};

export const SignInContainer = ({
  onSubmit,
  initialValues,
  validationSchema,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      history.push("/");
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SignInContainer
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    />
  );
};

export default SignIn;
