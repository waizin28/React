import { useEffect, useContext } from "react";
import BadgerCard from "../BadgerCard";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  SafeAreaView,
  Dimensions,
} from "react-native";
import BadgerNewsItemCard from "../content/BadgerNewsItemCard";
import BadgerArticleContext from "../../contexts/BadgerArticleContext";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

function BadgerNewsScreen(props) {
  const navigation = useNavigation();
  const [newsArticles, setNewsArticles] = useContext(BadgerArticleContext);

  useEffect(() => {}, [newsArticles]);

  return (
    <SafeAreaView>
      <SafeAreaView style={[styles.container]}>
        <Text style={styles.text}>Articles</Text>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.contnStyl}>
        {newsArticles.length === 0 ? (
          <View style={styles.prefTextContainer}>
            <Text style={styles.prefTextStyl}>
              There are no articles that fit your preferences!
            </Text>
          </View>
        ) : (
          newsArticles.map((article) => {
            return (
              <BadgerCard
                key={article.id}
                onPress={() =>
                  navigation.push("Article", {
                    id: article.id,
                    img: article.img,
                    title: article.title,
                  })
                }
                onLongPress={() => console.log("Long Press")}
                style={styles.bgCard}
              >
                <BadgerNewsItemCard key={article.id} {...article} />
              </BadgerCard>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contnStyl: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 50,
  },
  bgCard: {
    margin: 10,
    width: width / 1.12,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
  prefTextStyl: {
    textAlign: "center",
    fontSize: 28,
  },
  prefTextContainer: {
    marginTop: height / 3,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BadgerNewsScreen;
