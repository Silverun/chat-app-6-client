import io from "socket.io-client";
import { useContext, useRef } from "react";
import { UserContext } from "../context/UserContext";
const socket = io("http://localhost:3001");

function Login() {
  const userNameRef = useRef(null);
  const userCtx = useContext(UserContext);

  const onEnterChatClickHandler = () => {
    const user = userNameRef.current.value;
    userCtx.setCurrentUser(user);
    userCtx.setIsAuth(true);

    // socket.connect("http://localhost:3001");

    socket.emit("enter_chat", user);
  };

  return (
    <div className="container mt-3">
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
        />
      </div>
    </div>
  );
}

export default Login;
