import { Pressable, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function BadgerCard(props) {
  return (
    <Pressable onPress={props.onPress} onLongPress={props.onLongPress}>
      <View style={[styles.card, props.style]}>{props.children}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    elevation: 5,
    borderRadius: 14,
    backgroundColor: "white",
    shadowOpacity: 0.4,
    shadowRadius: 7,
  },
});
