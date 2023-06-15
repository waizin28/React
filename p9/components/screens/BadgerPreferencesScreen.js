import BadgerPreferenceSwitch from "../BadgerPreferenceSwitch";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import BadgerNewsPref from "../../contexts/BadgerNewsPref";
import { useContext, useEffect } from "react";

function BadgerPreferencesScreen(props) {
  const [prefs, setPrefs] = useContext(BadgerNewsPref);

  useEffect(() => {}, [prefs]);

  if (Object.keys(prefs).length === 0) {
    return <Text>Loading...</Text>;
  }

  function onToggle(prf, newVal) {
    setPrefs((prevPrefs) => ({
      ...prevPrefs,
      [prf]: newVal,
    }));
  }

  return (
    <View>
      <SafeAreaView style={[styles.container]}>
        <Text style={styles.text}>Preferences</Text>
      </SafeAreaView>
      <View style={styles.cardContainer}>
        {Object.keys(prefs).map((tag) => {
          return (
            <BadgerPreferenceSwitch
              key={tag}
              prefName={tag}
              handleToggle={onToggle}
            ></BadgerPreferenceSwitch>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
  cardContainer: {
    justifyContent: "space-between",
    alignContent: "center",
  },
  cardStyle: {
    width: "100%",
    marginVertical: 5,
  },
  cardTxtStyle: {
    textAlign: "center",
    fontSize: 20,
  },
});

export default BadgerPreferencesScreen;
