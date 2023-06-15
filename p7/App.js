import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Button, Text, View, TextInput, Alert } from "react-native";

export default function App() {
  const [total, setTotal] = useState(0);
  const [num, setNum] = useState("");

  const add = () => {
    setTotal(total + Number(num));
    setNum("");
  };

  const reset = () => {
    Alert.alert("Reset", "Your total has been reset.");
    setTotal(0);
  };

  return (
    <View style={styles.container}>
      <Text>Your total is {total}</Text>
      {/* https://reactnative.dev/docs/textinput */}
      <TextInput
        style={styles.input}
        onChangeText={setNum}
        value={num}
        placeholder="Enter a value"
        keyboardType="numbers-and-punctuation"
      />
      <Button title="Add" onPress={add}></Button>
      <Button title="Reset" onPress={reset}></Button>
      <StatusBar style="auto" />
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
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
