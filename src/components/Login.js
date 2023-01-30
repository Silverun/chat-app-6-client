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
        console.log(...response.result);
        userCtx.setAllMessages([...response.result]);
        console.log(...response.names);
        userCtx.setAllNames([...response.names]);
      });
    }
  };

  return (
    <div className="container text-center w-50 my-5">
      <h3>Just chat</h3>
      <div className="input-group mt-5">
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
