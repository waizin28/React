import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

function BadgerRegisterScreen(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const waveAnimation = useRef(new Animated.Value(0)).current;

  const waveConfig = {
    duration: 4000,
    amplitude: 15,
    frequency: 2,
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnimation, {
          toValue: 1,
          duration: waveConfig.duration / 2,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnimation, {
          toValue: 0,
          duration: waveConfig.duration / 2,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: -1,
      }
    ).start();
  }, [waveAnimation]);

  const transform = [
    {
      translateY: waveAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -waveConfig.amplitude],
      }),
    },
    {
      translateX: waveAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, waveConfig.amplitude / waveConfig.frequency],
      }),
    },
  ];

  useEffect(() => {
    setPasswordsMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient colors={["#cc2b5e", "#753a88"]} style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Animated.Text style={[{ transform }]}>
              {"Join BadgerChat!".split("").map((char, index) => (
                <Text key={index} style={styles.headerStyl}>
                  {char}
                </Text>
              ))}
            </Animated.Text>
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

            <View style={styles.inputContainer}>
              <View style={styles.inputTitleContainer}>
                <Text style={styles.labelStyl}>Confirm Password</Text>
                <Icon name="lock" size={22} color="#333" style={styles.icon} />
              </View>
              <TextInput
                style={styles.inputStyl}
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
          </View>
          {!passwordsMatch ? (
            <Text style={styles.passwordsMismatchStyl}>
              Passwords do not match!
            </Text>
          ) : password === "" || confirmPassword === "" ? (
            <Text style={styles.enterPassword}>Please enter a password</Text>
          ) : null}
          <View style={styles.buttonContainer}>
            <Button
              color="#D3D3D3"
              title="Signup"
              onPress={() => {
                if (passwordsMatch) {
                  props.handleSignup(userName, password);
                }
              }}
            />
            <Button
              color="#D3D3D3"
              title="Nevermind!"
              onPress={() => props.setIsRegistering(false)}
            />
          </View>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  inputTitleContainer: {
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "center",
  },
  icon: {
    paddingHorizontal: 10,
  },
  passwordsMismatchStyl: {
    fontSize: 18,
    color: "#e91e63",
    fontWeight: "bold",
  },
  enterPassword: {
    fontSize: 18,
    color: "gold",
    fontWeight: "bold",
  },
});

export default BadgerRegisterScreen;
