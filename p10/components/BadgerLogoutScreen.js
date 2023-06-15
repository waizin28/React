import { Alert, Button, StyleSheet, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useRoute, useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import UserNameContext from "../context/UserNameContext";
function BadgerLogoutScreen(props) {
  const { login } = useContext(UserNameContext);
  const [isLoggedIn, setIsLoggedIn] = login;

  const logOut = async () => {
    await SecureStore.deleteItemAsync("jwt");
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, marginTop: -100 }}>
        Are you sure you're done?
      </Text>
      <Text>Come back soon!</Text>
      <Text />
      <Button title="Logout" color="darkred" onPress={logOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: "50%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default BadgerLogoutScreen;
