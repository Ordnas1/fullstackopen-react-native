import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
    this.key = `${this.namespace}:token`;
  }

  async getAccessToken() {
    const accessToken = await AsyncStorage.getItem(this.key);

    return accessToken ? JSON.parse(accessToken) : null;
  }
  async setAccessToken(AccessToken) {
    await AsyncStorage.setItem(this.key, JSON.stringify(AccessToken));
  }
  async removeAccessToken() {
    await AsyncStorage.removeItem(this.key);
  }
}

export default AuthStorage;
