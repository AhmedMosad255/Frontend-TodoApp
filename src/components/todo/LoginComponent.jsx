import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

export default function LoginComponent() {
  const [username, setUsername] = useState("ahmed");

  const [password, setPassword] = useState("");

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const naviget = useNavigate();

  const authContext = useAuth();

  function handelUserNameChange(event) {
    setUsername(event.target.value);
  }

  function handelPasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handelSubmit() {
    if (await authContext.login(username, password)) {
      naviget(`/welcome/${username}`);
    } else {
      setShowErrorMessage(true);
    }
  }

  return (
    <div className="login">
      <h1>Time To Login!</h1>
      {showErrorMessage && (
        <div className="errorMessage">
          Authenticated Failed. Please Check Your Credentails.
        </div>
      )}
      <div className="loginForm">
        <div>
          <label>User Name</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handelUserNameChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handelPasswordChange}
          />
        </div>
        <div>
          <button type="button" name="login" onClick={handelSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
