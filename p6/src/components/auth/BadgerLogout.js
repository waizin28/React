import React, { useEffect, useContext } from "react";
import isLoggedInContext from "../../contexts/isLoggedInContext";

export default function BadgerLogout() {
  const { setIsLoggedIn } = useContext(isLoggedInContext);

  useEffect(() => {
    fetch("https://cs571.org/s23/hw6/api/logout", {
      method: "POST",
      headers: {
        "X-CS571-ID": "bid_d5f87cfbd68cea89ba78",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        // Maybe you need to do something here?
        sessionStorage.removeItem("badgerchat_auth");
        setIsLoggedIn(false);
      });
  }, [setIsLoggedIn]);

  return (
    <>
      <h1>Logout</h1>
      <p>You have been successfully logged out.</p>
    </>
  );
}
