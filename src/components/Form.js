import React, { useContext, useRef } from "react";
import io from "socket.io-client";
import { UserContext } from "../context/UserContext";

const socket = io("http://localhost:3001");

const Form = () => {
  const recipientInputRef = useRef(null);
  const titleInputRef = useRef(null);
  const messageInputRef = useRef(null);
  const userCtx = useContext(UserContext);

  const sendButtonHandler = () => {
    const recipient = recipientInputRef.current.value;
    const title = titleInputRef.current.value;
    const message = messageInputRef.current.value;

    const data = {
      sender: userCtx.currentUser,
      recipient: recipient,
      title: title,
      message: message,
    };

    socket.emit("message_send", data, (messageBack) => {
      console.log(messageBack);
    });
  };

  return (
    <div className="container mt-3">
      <div className="mb-3">
        <label htmlFor="recipient" className="form-label">
          Recipient
        </label>
        <input
          ref={recipientInputRef}
          type="text"
          className="form-control"
          id="recipient"
          placeholder="To..."
          autoComplete="true"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          ref={titleInputRef}
          type="text"
          className="form-control"
          id="title"
          placeholder="About..."
        />
      </div>
      <div className="mb-3">
        <label htmlFor="message" className="form-label">
          Message
        </label>
        <textarea
          ref={messageInputRef}
          className="form-control"
          id="message"
          rows="3"
        ></textarea>
      </div>
      <button
        onClick={sendButtonHandler}
        type="submit"
        className="btn btn-primary"
      >
        Send
      </button>
    </div>
  );
};

export default Form;
