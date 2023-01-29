import React, { useEffect, useRef } from "react";
import { useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const effRef = useRef(false);

  useEffect(() => {
    console.log("effect ran");
    if (effRef.current === false) {
      socket.on("receive_message", (message) => {
        console.log(message);
        setMessages((prevMsgs) => [...prevMsgs, message]);
      });
      return () => {
        console.log(`unmounted`);
        effRef.current = true;
      };
    }
  }, []);

  return (
    <div className="container">
      <ul>
        {messages.map((message, i) => (
          <li key={Math.random().toFixed(3) + i}>
            <p>From:{message.sender}</p>
            <p>To: {message.recipient}</p>
            <p>Message title: {message.title}</p>
            <p>Message: {message.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;
