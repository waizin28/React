import { View, Text, Image, StyleSheet } from "react-native";

function BadgerNewsItemCard(props) {
  return (
    <View>
      <Image
        style={styles.image}
        source={{
          uri: props.img,
        }}
      />
      <Text style={styles.txtStyl}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 340,
    height: 200,
  },
  txtStyl: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },
});
export default BadgerNewsItemCard;
