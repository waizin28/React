import React from "react";
import { Button } from "react-bootstrap";

function BadgerMessage(props) {
  const dt = new Date(props.created);

  const deletePost = () => {
    fetch(
      `https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages/${props.id}`,
      {
        headers: {
          "X-CS571-ID": "bid_d5f87cfbd68cea89ba78",
          "Content-Type": "application/json",
        },
        method: "DELETE",
        credentials: "include",
      }
    )
      .then((res) => {
        if (res.status === 200) {
          alert("Successfully deleted the post!");
        }
        return res.json();
      })
      .then((data) => {
        props.loadMessages();
      });
  };

  return (
    <>
      <h2>{props.title}</h2>
      <sub>
        Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}
      </sub>
      <br />
      <br />
      <i>{props.poster}</i>
      <p>{props.content}</p>
      {props.userName.replace(/"/g, "") === props.poster ? (
        <Button variant="danger" type="submit" onClick={deletePost}>
          Delete Post
        </Button>
      ) : null}
    </>
  );
}

export default BadgerMessage;
