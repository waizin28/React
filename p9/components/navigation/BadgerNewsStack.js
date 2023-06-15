import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BadgerNewsScreen from "../screens/BadgerNewsScreen";
import BadgerNewsFeedDetailScreen from "../screens/BadgerNewsFeedDetailScreen";

const BadgerNwStack = createNativeStackNavigator();

function BadgerNewsStack() {
  return (
    <BadgerNwStack.Navigator>
      <BadgerNwStack.Screen
        name="HomeArticles"
        component={BadgerNewsScreen}
        options={{ headerShown: false }}
      />
      <BadgerNwStack.Screen
        name="Article"
        component={BadgerNewsFeedDetailScreen}
      />
    </BadgerNwStack.Navigator>
  );
}

export default BadgerNewsStack;
