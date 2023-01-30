import React, { useContext, useEffect } from "react";
import { useState } from "react";
import io from "socket.io-client";
import { UserContext } from "../context/UserContext";

const socket = io("https://chat-app-6.herokuapp.com/");

const Messages = () => {
  const userCtx = useContext(UserContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (message) => {
      if (message.recipient === userCtx.currentUser) {
        setMessages((prevMsgs) => [...prevMsgs, message]);
      }
    });
    return () => {
      socket.off("receive_message");
    };
  }, [userCtx]);

  return (
    <div className="container w-50 mt-3">
      <ul className="list-group">
        {userCtx.allMessages.map((message, i) => (
          <li className="list-group-item" key={Math.random().toFixed(3) + i}>
            <p>From: {message.sender}</p>
            <p>Title: {message.title}</p>
            <p>{message.message}</p>
          </li>
        ))}
        {messages.map((message, i) => (
          <li className="list-group-item" key={Math.random().toFixed(3) + i}>
            <p>From: {message.sender}</p>
            <p>Title: {message.title}</p>
            <p>{message.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;
