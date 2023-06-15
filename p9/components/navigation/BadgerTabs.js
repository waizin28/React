import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import BadgerPreferencesScreen from "../screens/BadgerPreferencesScreen";
import BadgerNewsStack from "./BadgerNewsStack";
import BadgerNewsPref from "../../contexts/BadgerNewsPref";
import { useEffect, useState, useCallback } from "react";
import BadgerArticleContext from "../../contexts/BadgerArticleContext";

const BadgerNewsTabs = createBottomTabNavigator();

function BadgerTabs(props) {
  const [newsArticles, setNewsArticles] = useState([]);
  const [tempCopy, setTempCopy] = useState([]);
  const [prefs, setPrefs] = useState({});

  const addNews = useCallback(() => {
    fetch("https://www.cs571.org/s23/hw9/api/news/articles", {
      headers: {
        "X-CS571-ID": "bid_d5f87cfbd68cea89ba78",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((json) => {
        setNewsArticles(json);
        setTempCopy(json);
      });
  }, [setNewsArticles]);

  useEffect(() => {
    addNews();
  }, []);

  useEffect(() => {
    const newArticle = {};
    tempCopy.map((article) => {
      article.tags.forEach((tag) => {
        newArticle[tag] = true;
      });
    });
    setPrefs(newArticle);
  }, [tempCopy]);

  useEffect(() => {
    const update = () => {
      const filteredKeys = Object.keys(prefs).filter((key) => prefs[key]);
      const newFilteredArray = tempCopy.filter((news) => {
        return news.tags.every((tag) => filteredKeys.includes(tag));
      });
      setNewsArticles(newFilteredArray);
    };
    update();
  }, [prefs]);

  return (
    <BadgerArticleContext.Provider value={[newsArticles, setNewsArticles]}>
      <BadgerNewsPref.Provider value={[prefs, setPrefs]}>
        <BadgerNewsTabs.Navigator>
          <BadgerNewsTabs.Screen
            name="Articles"
            component={BadgerNewsStack}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="article" color={color} size={size} />
              ),
              headerShown: false,
            }}
          />
          <BadgerNewsTabs.Screen
            name="Preferences"
            component={BadgerPreferencesScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="settings" color={color} size={size} />
              ),
              headerShown: false,
            }}
          />
        </BadgerNewsTabs.Navigator>
      </BadgerNewsPref.Provider>
    </BadgerArticleContext.Provider>
  );
}

export default BadgerTabs;
