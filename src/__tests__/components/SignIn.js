import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import * as yup from "yup";

import { SignInContainer } from "../../components/SignIn";

describe("SignInContainer", () => {
  it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
    const onSubmit = jest.fn();
    const initialValues = {
      username: "",
      password: "",
    };
    const validationSchema = yup.object().shape({
      username: yup.string().required("Username is required"),
      password: yup.string().required("Password is required"),
    });

    const { debug, getByTestId } = render(
      <SignInContainer
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      />
    );

    fireEvent.changeText(getByTestId("usernameInput"), "matti");
    fireEvent.changeText(getByTestId("passwordInput"), "password");
    fireEvent.press(getByTestId("submitPressable"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: "matti",
        password: "password",
      });
    });
  });
});
