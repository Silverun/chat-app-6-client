import Login from "./components/Login";
import Form from "./components/Form";
import Messages from "./components/Messages";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

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
