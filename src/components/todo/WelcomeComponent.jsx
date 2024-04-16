import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { retriveHelloWorldPathVariable } from "./api/HelloWorldApiService";
import { useAuth } from "./security/AuthContext";
export default function WelcomeComponent() {
  const { username } = useParams();

  const authContext = useAuth();

  const [message, setMessage] = useState(null);

  function callHelloWorldRestApi() {
    console.log("called");

    retriveHelloWorldPathVariable("Ahmed", authContext.token)
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("cleanup"));
  }

  function successfulResponse(response) {
    console.log(response);
    //setMessage(response.data);
    setMessage(response.data.message);
  }
  function errorResponse(error) {
    console.log(error);
  }

  return (
    <div className="WelcomeComponent">
      <h1>Welcome {username}</h1>
      <div>
        Manage Your Todos - <Link to="/todos">Go Here</Link>
      </div>
      <div>
        <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>
          Call Hello World API
        </button>
      </div>
      <div className="text-info">{message}</div>
    </div>
  );
}
