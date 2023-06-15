import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("window");

function BadgerLoginScreen(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient colors={["#cc2b5e", "#753a88"]} style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image
            source={require("../figures/badger.png")}
            style={styles.imgStyle}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.headerStyl}>BadgerChat Login</Text>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.inputTitleContainer}>
                <Text style={styles.labelStyl}>Username</Text>
                <Icon name="user" size={22} color="#333" style={styles.icon} />
              </View>
              <TextInput
                style={styles.inputStyl}
                value={userName}
                onChangeText={setUserName}
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputTitleContainer}>
                <Text style={styles.labelStyl}>Password</Text>
                <Icon name="lock" size={22} color="#333" style={styles.icon} />
              </View>
              <TextInput
                style={styles.inputStyl}
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>

          <View style={styles.logInContainer}>
            <Button
              color="#FFD700"
              title="LOGIN"
              onPress={() => {
                props.handleLogin(userName, password);
                setUserName("");
                setPassword("");
              }}
            />
          </View>

          <View style={styles.lineContainer}>
            <View style={[styles.lineStyl, { marginRight: 10 }]} />
            <Text style={styles.nwTxtStyl}>New here?</Text>
            <View style={[styles.lineStyl, { marginLeft: 10 }]} />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              color="#D3D3D3"
              title="SIGN UP"
              onPress={() => props.setIsRegistering(true)}
            />
            <Button
              color="#D3D3D3"
              title="CONTINUE AS GUEST"
              onPress={() => {
                props.setIsGuestPressed(true);
              }}
            />
          </View>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    marginBottom: 20,
  },
  headerStyl: {
    fontFamily: "Helvetica-Bold",
    fontSize: 34,
    color: "white",
  },
  formContainer: {
    width: "75%",
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  labelStyl: {
    textAlign: "center",
    fontSize: 18,
    color: "#F8F8F8",
  },
  inputStyl: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 10,
  },
  buttonContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logInContainer: {
    marginBottom: 15,
  },
  inputTitleContainer: {
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "center",
  },
  nwTxtStyl: {
    fontSize: 17,
    color: "#e66767",
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  lineStyl: {
    borderBottomColor: "#e66767",
    borderBottomWidth: 0.75,
    width: width * 0.26,
  },
  icon: {
    paddingHorizontal: 10,
  },
  imgStyle: {
    marginTop: height * 0.12,
    width: 200,
    height: 200,
  },
});

export default BadgerLoginScreen;
