import React, { useEffect, useState, useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import BadgerLayout from "./BadgerLayout";
import BadgerLogin from "../auth/BadgerLogin";
import BadgerRegister from "../auth/BadgerRegister";
import BadgerLogout from "../auth/BadgerLogout";
import BadgerChatroom from "../content/BadgerChatroom";
import BadgerChatHome from "../content/BadgerChatHome";
import BadgerNoMatch from "../content/BadgerNoMatch";
import isLoggedInContext from "../../contexts/isLoggedInContext";

function BadgerApp() {
  const [chatrooms, setChatrooms] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const providerValue = useMemo(
    () => ({ isLoggedIn, setIsLoggedIn }),
    [isLoggedIn, setIsLoggedIn]
  );

  useEffect(() => {
    fetch("https://cs571.org/s23/hw6/api/chatroom", {
      headers: {
        "X-CS571-ID": "bid_d5f87cfbd68cea89ba78",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setChatrooms(json);
      });
  }, []);

  return (
    <isLoggedInContext.Provider value={providerValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BadgerLayout chatrooms={chatrooms} />}>
            <Route index element={<BadgerChatHome />} />

            <Route path="/login" element={<BadgerLogin />}></Route>
            <Route path="/register" element={<BadgerRegister />}></Route>

            <Route path="/logout" element={<BadgerLogout />}></Route>

            {chatrooms.map((chatroom) => {
              return (
                <Route
                  key={chatroom}
                  path={`chatrooms/${chatroom}`}
                  element={<BadgerChatroom name={chatroom} />}
                />
              );
            })}
            <Route path="*" element={<BadgerNoMatch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </isLoggedInContext.Provider>
  );
}

export default BadgerApp;
