import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import io from "socket.io-client";
import { UserContext } from "../context/UserContext";

const socket = io("http://localhost:3001");

const Form = () => {
  const recipientInputRef = useRef(null);
  const titleInputRef = useRef(null);
  const messageInputRef = useRef(null);
  const userCtx = useContext(UserContext);
  const [replyOnSend, setReplyOnSend] = useState("");

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

    socket.emit("message_send", data, (response) => {
      console.log(response.message);
      setReplyOnSend(response.message);
      setTimeout(() => {
        setReplyOnSend("");
      }, 2000);
    });
  };

  const LogOutButtonHandler = useCallback(() => {
    userCtx.setCurrentUser("");
    userCtx.setIsAuth(false);
    localStorage.clear();
  }, [userCtx]);

  return (
    <div className="container mt-3">
      <div className="row align-items-center">
        <div className="col">
          <h4>Welcome, {userCtx.currentUser}</h4>
        </div>
        <div className="col-auto">
          <button
            onClick={LogOutButtonHandler}
            type="button"
            className="btn btn-secondary"
          >
            Log Out
          </button>
        </div>
      </div>

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
      <div className="row">
        <div className="col">
          <button
            onClick={sendButtonHandler}
            type="submit"
            className="btn btn-primary"
          >
            Send
          </button>
        </div>
        <div className="col">
          {replyOnSend ? (
            <div className="alert alert-success" role="alert">
              {replyOnSend}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Form;
