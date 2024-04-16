import { createContext, useContext, useState } from "react";
import { executeJwtAuthenticationService } from "../api/AuthentecationApiService";
import { apiClient } from "../api/ApiClients";

// Create context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

//share the created context with other components

export default function AuthProvider({ children }) {
  //put some state in the context
  const [isAthentecated, setAthentecated] = useState(false);

  const [username, setUsername] = useState(null);

  const [token, setToken] = useState(null);

  // function login(username, password) {
  //   if (username === "ahmed" && password === "1234") {
  //     setAthentecated(true);
  //     setUsername(username);
  //     return true;
  //   } else {
  //     setAthentecated(false);
  //     setUsername(null);
  //     return false;
  //   }
  // }

  // async function login(username, password) {
  //   const baToken = "Basic " + btoa(username + ":" + password);

  //   try {
  //     const response = await executeBasicAuthenticationService(baToken);

  //     if (response.status === 200) {
  //       setAthentecated(true);
  //       setUsername(username);
  //       setToken(baToken);

  //       apiClient.interceptors.request.use((config) => {
  //         console.log("intercepting and adding a token");
  //         config.headers.Authorization = baToken;
  //         return config;
  //       });

  //       return true;
  //     } else {
  //       logout();
  //       return false;
  //     }
  //   } catch (error) {
  //     logout();
  //     return false;
  //   }
  // }

  async function login(username, password) {
    try {
      const response = await executeJwtAuthenticationService(
        username,
        password
      );

      if (response.status === 200) {
        const jwtToken = "Bearer " + response.data.token;

        setAthentecated(true);

        setUsername(username);

        setToken(jwtToken);

        apiClient.interceptors.request.use((config) => {
          console.log("intercepting and adding a token");
          config.headers.Authorization = jwtToken;
          return config;
        });

        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  }

  function logout() {
    setAthentecated(false);
    setUsername(null);
    setToken(null);
  }
  return (
    <AuthContext.Provider
      value={{ isAthentecated, login, logout, username, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}
