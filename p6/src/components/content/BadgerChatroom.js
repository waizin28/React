import React, { useEffect, useState, useContext, useCallback } from "react";
import BadgerMessage from "./BadgerMessage";
import isLoggedInContext from "../../contexts/isLoggedInContext";
import { Form, Button } from "react-bootstrap";

export default function BadgerChatroom(props) {
  const [messages, setMessages] = useState([]);
  const { isLoggedIn } = useContext(isLoggedInContext);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [userName, setUserName] = useState("");

  const loadMessages = useCallback(() => {
    fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
      headers: {
        "X-CS571-ID": "bid_d5f87cfbd68cea89ba78",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setMessages(json.messages);
      });
  }, [props.name]);

  const postSubmit = (e) => {
    e.preventDefault();

    if (!postTitle || !postContent) {
      alert("You must provide both a title and content!");
      return;
    }

    fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
      method: "POST",
      headers: {
        "X-CS571-ID": "bid_d5f87cfbd68cea89ba78",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        title: postTitle,
        content: postContent,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          alert("Successfully posted!");
          setPostTitle("");
          setPostContent("");
        }
        return res.json();
      })
      .then((data) => {
        setMessages([
          ...messages,
          {
            id: JSON.stringify(data["id"]),
            title: postTitle,
            content: postContent,
          },
        ]);
        loadMessages();
      });
  };

  fetch("https://cs571.org/s23/hw6/api/whoami", {
    headers: {
      "X-CS571-ID": "bid_d5f87cfbd68cea89ba78",
    },
    credentials: "include",
  }).then((res) => {
    return res.json().then((data) => {
      if (res.status === 200) {
        setUserName(JSON.stringify(data["user"]["username"]));
      } else {
        setUserName("");
      }
    });
  });

  useEffect(() => {
    loadMessages();
  }, [props, loadMessages]);

  return (
    <>
      <h1>{props.name} Chatroom</h1>
      {isLoggedIn ? (
        <>
          <Form onSubmit={postSubmit}>
            <Form.Group style={{ marginBottom: "1rem" }}>
              <Form.Label>Post Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter chat title"
                value={postTitle}
                onChange={(e) => {
                  setPostTitle(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group style={{ marginBottom: "1rem" }}>
              <Form.Label>Post Content</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter chat content"
                value={postContent}
                onChange={(e) => {
                  setPostContent(e.target.value);
                }}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Create Post
            </Button>
          </Form>
        </>
      ) : (
        <p>You must be logged in to post!</p>
      )}
      <hr />
      {messages.length > 0 ? (
        <>
          {messages.map((message) => {
            return (
              <BadgerMessage
                key={message.id}
                id={message.id}
                userName={userName}
                name={props.name}
                title={message.title}
                poster={message.poster}
                content={message.content}
                created={message.created}
                loadMessages={loadMessages}
              ></BadgerMessage>
            );
          })}
        </>
      ) : (
        <>
          <p>There are no messages in this chatroom yet!</p>
        </>
      )}
    </>
  );
}
