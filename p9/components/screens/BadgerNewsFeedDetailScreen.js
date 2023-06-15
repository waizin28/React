import { useCallback, useState, useEffect, useRef } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const screenWidth = Dimensions.get("window").width;

function BadgerNewsFeedDetailScreen(props) {
  const details = props.route.params;
  const [articleDetails, setArticleDetails] = useState({});
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 4100,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const [fadeLoadAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeLoadAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(fadeLoadAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeLoadAnim]);

  const getArticleBody = useCallback(() => {
    fetch(`https://www.cs571.org/s23/hw9/api/news/articles/${details.id}`, {
      headers: {
        "X-CS571-ID": "bid_d5f87cfbd68cea89ba78",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((json) => {
        setArticleDetails(json);
      });
  }, [setArticleDetails]);

  useEffect(() => {
    getArticleBody();
  }, []);

  return (
    <View>
      <ScrollView>
        <Image style={styles.imgStyl} source={{ uri: details.img }}></Image>
        <Text style={styles.txtStyl}>{details.title}</Text>
        {articleDetails && articleDetails.body ? (
          <Animated.Text style={[{ opacity: fadeAnim }, styles.pargraphStyl]}>
            {articleDetails["body"].map((paragraph, index) => {
              return (
                <View key={index}>
                  <Text style={[styles.paragraph, styles.bottomMargin]}>
                    {paragraph}
                  </Text>
                </View>
              );
            })}
          </Animated.Text>
        ) : (
          <Animated.Text
            style={[{ opacity: fadeLoadAnim }, styles.loadingStyl]}
          >
            The content is loading!
          </Animated.Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  imgStyl: {
    width: screenWidth,
    height: screenWidth * (5 / 8),
  },
  txtStyl: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
  },
  loadingStyl: {
    fontSize: 24,
    margin: 15,
  },
  pargraphStyl: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  paragraph: {
    lineHeight: 30,
  },
  bottomMargin: {
    fontSize: 15,
    marginBottom: 8,
  },
});

export default BadgerNewsFeedDetailScreen;
