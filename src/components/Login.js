import io from "socket.io-client";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
const socket = io("http://localhost:3001");

function Login() {
  const userNameRef = useRef(null);
  const userCtx = useContext(UserContext);
  const [message, setMessage] = useState("");

  const onEnterChatClickHandler = () => {
    if (userNameRef.current.value === "") {
      setMessage("Name cannot be empty.");
    } else {
      const user = userNameRef.current.value.trim();
      userCtx.setIsAuth(true);
      userCtx.setCurrentUser(user);
      localStorage.setItem("logged_in_user", user);
      socket.emit("enter_chat", user, (response) => {
        console.log(...response);
        userCtx.setAllMessages([...response]);
      });
    }
  };

  return (
    <div className="container w-50 mt-3">
      <div className="input-group mb-3">
        <button
          onClick={onEnterChatClickHandler}
          className="btn btn-outline-secondary"
          type="button"
        >
          Enter chat
        </button>
        <input
          ref={userNameRef}
          type="text"
          className="form-control"
          placeholder="Enter user name"
          name="username"
        />
      </div>
      {message ? (
        <div className="alert alert-secondary" role="alert">
          {message}
        </div>
      ) : null}
    </div>
  );
}

export default Login;
