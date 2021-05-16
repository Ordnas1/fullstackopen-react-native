import { useMutation, useApolloClient } from "@apollo/client";
import { AUTHORIZE } from "../graphql/mutations";

import useAuthStorage from "../hooks/useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHORIZE);
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password } });
    const token = data.authorize.accessToken;

    await authStorage.setAccessToken(token);
    apolloClient.resetStore();

    return token;
  };

  return [signIn, result];
};

export default useSignIn;
