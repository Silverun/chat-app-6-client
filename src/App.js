import Login from "./components/Login";
import Form from "./components/Form";
import { UserContext } from "./context/UserContext";
import { useContext } from "react";
import Messages from "./components/Messages";

function App() {
  const userCtx = useContext(UserContext);
  return (
    <>
      {!userCtx.isAuth ? (
        <Login />
      ) : (
        <div>
          <Form />
          <Messages />
        </div>
      )}
    </>
  );
}

export default App;
