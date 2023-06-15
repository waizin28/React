// Keep this here!
import "react-native-gesture-handler";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import BadgerLoginScreen from "./components/BadgerLoginScreen";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import BadgerLandingScreen from "./components/BadgerLandingScreen";
import BadgerChatroomScreen from "./components/BadgerChatroomScreen";
import BadgerRegisterScreen from "./components/BadgerRegisterScreen";
import { Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import BadgerLogoutScreen from "./components/BadgerLogoutScreen";
import BadgerConversionScreen from "./components/BadgerConversionScreen";
import UserNameContext from "./context/UserNameContext";

const ChatDrawer = createDrawerNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);
  const [isGuestPressed, setIsGuestPressed] = useState(false);

  useEffect(() => {
    fetch("https://cs571.org/s23/hw10/api/chatroom", {
      headers: {
        "X-CS571-ID": "bid_d5f87cfbd68cea89ba78",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setChatrooms(data);
      });
  }, []);

  async function handleLogin(username, password) {
    // checking for empty user name or password
    if (!username || !password) {
      Alert.alert("Username or Password is empty", "Please try again!");
      return;
    }

    const response = await fetch("https://cs571.org/s23/hw10/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "X-CS571-ID": "bid_d5f87cfbd68cea89ba78",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (response.status === 200) {
      setIsLoggedIn(true);
      Alert.alert("Login Successful!", "Success!");
    } else if (response.status === 401) {
      Alert.alert("Incorrect password!", "Please try agin!");
      return;
    } else if (response.status === 404) {
      Alert.alert("Incorrect username!", "Please try agin!");
      return;
    } else {
      Alert.alert("Login failed!", "Please try agin!");
      return;
    }

    const json = await response.json();

    await SecureStore.setItemAsync("jwt", json.token);
  }

  async function handleSignup(username, password) {
    const response = await fetch("https://cs571.org/s23/hw10/api/register", {
      method: "POST",
      headers: {
        "X-CS571-ID": "bid_d5f87cfbd68cea89ba78",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (response.status === 200) {
      setIsLoggedIn(true);
      Alert.alert("Signup Successful", "Success!");
    } else if (response.status === 409) {
      Alert.alert("Sign Up failed!", "The account already exists.");
      return;
    } else if (response.status === 413) {
      Alert.alert(
        "Sign Up failed!",
        "Please ensure username is less than 64 characters and password less than 128 characters"
      );
      return;
    } else if (response.status === 400) {
      Alert.alert("Sign Up failed!", "Must contain both username and password");
      return;
    } else {
      Alert.alert("Sign Up failed!", "Please retry again.");
      return;
    }

    const json = await response.json();

    setIsRegistering(false);
    await SecureStore.setItemAsync("jwt", json.token);
  }

  if (isLoggedIn || isGuestPressed) {
    return (
      <UserNameContext.Provider
        value={{
          login: [isLoggedIn, setIsLoggedIn],
          guest: [isGuestPressed, setIsGuestPressed],
          register: [isRegistering, setIsRegistering],
        }}
      >
        <NavigationContainer>
          <ChatDrawer.Navigator
            screenOptions={{
              drawerStyle: {
                backgroundColor: "#c6cbef",
                width: 240,
              },
            }}
          >
            <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
            {chatrooms.map((chatroom) => {
              return (
                <ChatDrawer.Screen key={chatroom} name={chatroom}>
                  {(props) => <BadgerChatroomScreen name={chatroom} />}
                </ChatDrawer.Screen>
              );
            })}

            {isGuestPressed ? (
              <ChatDrawer.Screen
                name="SignUp"
                component={BadgerConversionScreen}
                options={{
                  title: "Sign Up",
                  drawerIcon: ({ focused, size }) => (
                    <Ionicons
                      name="person-add-outline"
                      size={size}
                      color={focused ? "#0074D9" : "#9B4F96"}
                    />
                  ),
                  drawerLabelStyle: {
                    marginLeft: -20,
                    color: "#9B4F96",
                  },
                }}
              />
            ) : (
              <ChatDrawer.Screen
                name="Logout"
                component={BadgerLogoutScreen}
                options={{
                  drawerLabel: "Logout",
                  drawerIcon: ({ focused, size }) => (
                    <Ionicons
                      name={focused ? "ios-log-out-outline" : "ios-log-out"}
                      size={size}
                      color={focused ? "#0074D9" : "#9B4F96"}
                    />
                  ),
                  drawerLabelStyle: {
                    marginLeft: -20,
                    color: "#9B4F96",
                  },
                }}
              />
            )}
          </ChatDrawer.Navigator>
        </NavigationContainer>
      </UserNameContext.Provider>
    );
  } else if (isRegistering) {
    return (
      <BadgerRegisterScreen
        name="BadgerRegisterScreen"
        handleSignup={handleSignup}
        setIsRegistering={setIsRegistering}
      />
    );
  } else {
    return (
      <BadgerLoginScreen
        name="LogInScreen"
        handleLogin={handleLogin}
        setIsRegistering={setIsRegistering}
        setIsGuestPressed={setIsGuestPressed}
      />
    );
  }
}
