import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import io from "socket.io-client";
import { UserContext } from "../context/UserContext";

const socket = io("http://localhost:3001");

const Messages = () => {
  const userCtx = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("receive_message", (message) => {
      console.log(message);
      if (message.recipient === userCtx.currentUser) {
        setMessages((prevMsgs) => [...prevMsgs, message]);
      }
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("receive_message");
    };
  }, [userCtx]);

  return (
    <div className="container mt-3">
      <p>Connected: {"" + isConnected}</p>
      <ul className="list-group">
        {userCtx.allMessages.map((message, i) => (
          <li
            className="list-group-item mb-3"
            key={Math.random().toFixed(3) + i}
          >
            <p>From: {message.sender}</p>
            <p>Title: {message.title}</p>
            <p>{message.message}</p>
          </li>
        ))}
        {messages.map((message, i) => (
          <li
            className="list-group-item mb-3"
            key={Math.random().toFixed(3) + i}
          >
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
