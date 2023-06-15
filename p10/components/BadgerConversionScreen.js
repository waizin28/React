import { Button, StyleSheet, Text, View } from "react-native";
import UserNameContext from "../context/UserNameContext";
import { useContext } from "react";

function BadgerConversionScreen(props) {
  const { guest, register } = useContext(UserNameContext);
  const [isRegistering, setIsRegistering] = register;
  const [isGuestPressed, setIsGuestPressed] = guest;

  const navgateScreen = () => {
    setIsGuestPressed(false);
    setIsRegistering(true);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, marginTop: -100 }}>Ready to signup?</Text>
      <Text>Join BadgerChat to be able to make posts!</Text>
      <Text />
      <Button title="Sign Up!" color="darkred" onPress={navgateScreen} />
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
});

export default BadgerConversionScreen;
