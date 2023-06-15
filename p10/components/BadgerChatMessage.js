import { Text, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import BadgerCard from "./BadgerCard";

function BadgerChatMessage(props) {
  const dt = new Date(props.created);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <BadgerCard
        style={{ marginTop: 16, padding: 8, marginLeft: 8, marginRight: 8 }}
      >
        <Text style={{ fontSize: 28, fontWeight: 600 }}>{props.title}</Text>
        <Text style={{ fontSize: 12 }}>
          by {props.poster} | Posted on {dt.toLocaleDateString()} at{" "}
          {dt.toLocaleTimeString()}
        </Text>
        <Text></Text>
        <Text>{props.content}</Text>
      </BadgerCard>
    </Animated.View>
  );
}

export default BadgerChatMessage;
