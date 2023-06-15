import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import BadgerTabs from "./components/navigation/BadgerTabs";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <BadgerTabs />
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}
