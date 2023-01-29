import React from "react";
import { useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

const Messages = () => {
  const [messages, setMessages] = useState([]);

  socket.on("send_all", (message) => {
    console.log(message);
    setMessages((prevMsgs) => [...prevMsgs, message]);
  });

  return (
    <div className="container">
      <ul>
        {messages.map((message, i) => (
          <li key={Math.random().toFixed(3) + i}>
            <p>{message.sender}</p>
            <p>{message.recipient}</p>
            <p>{message.title}</p>
            <p>{message.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;
