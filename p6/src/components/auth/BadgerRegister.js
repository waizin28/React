import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function BadgerRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("You must provide both a username and password!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Your passwords do not match!");
      return;
    }

    fetch("https://cs571.org/s23/hw6/api/register", {
      method: "POST",
      headers: {
        "X-CS571-ID": "bid_d5f87cfbd68cea89ba78",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((res) => {
      if (res.status === 200) {
        alert("Registration successful!");
      } else if (res.status === 409) {
        alert("That username has already been taken!");
      }
      return res.json();
    });
  };

  return (
    <>
      <h1>Register</h1>
      <Form onSubmit={handleRegister}>
        <Form.Group style={{ marginBottom: "1rem" }}>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group style={{ marginBottom: "1rem" }}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group style={{ marginBottom: "1rem" }}>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </>
  );
}
