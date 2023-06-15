import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Alert,
} from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
import BadgerChatMessage from "./BadgerChatMessage";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from "expo-secure-store";
import UserNameContext from "../context/UserNameContext";

const screenHeight = Dimensions.get("window").height;

function BadgerChatroomScreen(props) {
  const [messages, setMessages] = useState([]);
  const [popoutShown, setPopoutShown] = useState(false);
  const [token, setToken] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const { guest } = useContext(UserNameContext);
  const [isGuestPressed, setIsGuestPressed] = guest;

  const loadMessages = useCallback(() => {
    fetch(`https://cs571.org/s23/hw10/api/chatroom/${props.name}/messages`, {
      headers: {
        "X-CS571-ID": "bid_d5f87cfbd68cea89ba78",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMessages(data.messages);
      });
  }, [props.name]);

  useEffect(() => {
    loadMessages();
  }, [props, loadMessages]);

  const closeModal = () => {
    setPopoutShown(false);
  };

  const addPost = () => {
    setPopoutShown(true);
  };

  const createPost = async () => {
    const tokenFetch = await SecureStore.getItemAsync("jwt");
    const token = `Bearer ${tokenFetch}`;

    const res = await fetch(
      `https://cs571.org/s23/hw10/api/chatroom/${props.name}/messages`,
      {
        method: "POST",
        headers: {
          "X-CS571-ID": "bid_d5f87cfbd68cea89ba78",
          "Content-Type": "application/json",
          Authorization: token,
        },
        credentials: "include",
        body: JSON.stringify({
          title: postTitle,
          content: postContent,
        }),
      }
    );

    if (res.status === 200) {
      Alert.alert("Success!", "Successfully posted!");
    } else if (res.status === 400) {
      Alert.alert("Post failed!", "Please fill out title and content!");
      return;
    } else if (res.staus === 401) {
      Alert.alert("Post failed!", "Authentication failed!");
      return;
    } else if (res.status === 404) {
      Alert.alert("Post failed!", "Specified chatroom doesn't exist!");
      return;
    } else if (res.status === 413) {
      Alert.alert(
        "Post failed!",
        "Title' must be 128 characters or fewer and Content must be 1024 characters or fewer!"
      );
      return;
    }

    const json = await res.json();
    setPostTitle("");
    setPostContent("");
    setToken("");
    closeModal();
    loadMessages();
  };

  const refresh = () => {
    Alert.alert("Refresh!", "Posts have been refreshed!");
    loadMessages();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {messages ? (
          messages.map((message) => {
            return <BadgerChatMessage key={message.id} {...message} />;
          })
        ) : (
          <View>
            <Text style={styles.txtStyle}>There are no messages yet!</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.btnContainer}>
        {!isGuestPressed ? (
          <View style={styles.buttonWrapper1}>
            <Button
              color="white"
              onPress={addPost}
              title="ADD POST"
              style={styles.addButton}
            />
          </View>
        ) : null}

        <View style={styles.buttonWrapper2}>
          <Button
            color="white"
            onPress={refresh}
            title="REFRESH"
            style={styles.refreshButton}
          />
        </View>
      </View>

      <View style={styles.modelContainer}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={popoutShown}
          onRequestClose={closeModal}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <LinearGradient
              colors={["#FFC3A0", "#FFAFBD"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientBackground}
            >
              <View style={styles.modalView}>
                <Text style={styles.headPostStyl}>Create a Post</Text>
                <Text style={styles.modalTxtStyl}>Title</Text>

                <TextInput
                  style={styles.txtBoxTitle}
                  onChangeText={(inputTitle) => {
                    setPostTitle(inputTitle);
                  }}
                ></TextInput>

                <Text style={styles.modalTxtStyl}>Body</Text>

                <TextInput
                  style={styles.txtBoxBody}
                  multiline={true}
                  onChangeText={(inputBody) => {
                    setPostContent(inputBody);
                  }}
                ></TextInput>

                <Button title="Create Post" onPress={createPost}></Button>
                <Button
                  title="Cancel"
                  onPress={closeModal}
                  color="red"
                ></Button>
              </View>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txtStyle: {
    fontSize: 25,
    color: "#008B8B",
    textAlign: "center",
    fontWeight: "bold",
  },
  addButton: {
    fontSize: 15,
    fontWeight: "bold",
  },
  refreshButton: {
    fontSize: 15,
    fontWeight: "bold",
  },
  btnContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper1: {
    width: "100%",
    backgroundColor: "crimson",
  },
  buttonWrapper2: {
    width: "100%",
    backgroundColor: "grey",
  },
  modalView: {
    marginTop: screenHeight * 0.076,

    margin: 34,
    backgroundColor: "white",
    borderRadius: 25,
    padding: 23,
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTxtStyl: {
    fontSize: 18,
    marginBottom: 13,
  },
  headPostStyl: {
    fontFamily: "Avenir",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  txtBoxTitle: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  txtBoxBody: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    height: "50%",
    marginBottom: 15,
    fontSize: 16,
  },
  blurContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BadgerChatroomScreen;
