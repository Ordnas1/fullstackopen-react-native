import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-native";

import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import { CREATE_REVIEW } from "../graphql/mutations";

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

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name required"),
  rating: yup
    .number("sexo")
    .required("Rating is required")
    .min(0, "Rating must be equal or greater than ${min}")
    .max(100, "Rating must be equal or lesser than ${max}"),
  text: yup.string().optional(),
});

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name="ownerName"
        placeholder="Repository owner name"
        style={styles.textInput}
      />
      <FormikTextInput
        name="repositoryName"
        placeholder="Repository name"
        style={styles.textInput}
      />
      <FormikTextInput
        name="rating"
        placeholder="Rating between 0 and 100"
        style={styles.textInput}
      />
      <FormikTextInput
        name="text"
        placeholder="Repository review"
        style={styles.textInput}
        multiline
      />
      <Pressable
        style={styles.submitButton}
        onPress={onSubmit}
        testID="submitPressable"
      >
        <Text color="white">Create a review</Text>
      </Pressable>
    </View>
  );
};

const CreateReview = ({}) => {
  const [addReview] = useMutation(CREATE_REVIEW);
  const history = useHistory();

  const onSubmit = (values) => {
    let newValues = { ...values };
    newValues.rating = Number(newValues.rating);

    addReview({ variables: { review: newValues } }).then(() => history.push(`/${values.ownerName}.${values.repositoryName}`));
    
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default CreateReview;
