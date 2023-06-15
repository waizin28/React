import React, { useRef, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { BrowserRouter, useNavigate } from "react-router-dom";
import isLoggedInContext from "../../contexts/isLoggedInContext";

export default function BadgerLogin() {
  // TODO Create the login component.

  const username = useRef();
  const password = useRef();
  const { setIsLoggedIn } = useContext(isLoggedInContext);
  const reRoute = useNavigate();

  const logIn = (e) => {
    e.preventDefault();

    if (!username.current.value || !password.current.value) {
      alert("You must provide both a username and password!");
      return;
    }

    fetch("https://cs571.org/s23/hw6/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "X-CS571-ID": "bid_d5f87cfbd68cea89ba78",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.current.value,
        password: password.current.value,
      }),
    }).then((response) => {
      if (response.status === 200) {
        alert("Login successful!");
        setIsLoggedIn(true);
        return <BrowserRouter>{reRoute("/")}</BrowserRouter>;
      } else if (response.status === 404) {
        alert("Incorrect username!");
        setIsLoggedIn(false);
      } else if (response.status === 401) {
        alert("Incorrect password!");
        setIsLoggedIn(false);
      }
    });
  };

  return (
    <>
      <h1>Login</h1>
      <Form onSubmit={logIn}>
        <Form.Group style={{ marginBottom: "1rem" }}>
          <Form.Label htmlFor="userNameInput">Username</Form.Label>
          <Form.Control
            id="userNameInput"
            ref={username}
            type="text"
            placeholder="Enter username"
          />
        </Form.Group>
        <Form.Group style={{ marginBottom: "1rem" }}>
          <Form.Label htmlFor="userPassWordInput">Password</Form.Label>
          <Form.Control
            id="userPassWordInput"
            ref={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
}
