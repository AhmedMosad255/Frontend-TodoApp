import { apiClient } from "./ApiClients";

// export function retriveHelloWorldBean() {
//   return axios.get("http://localhost:8080/hello-world-bean");
// }

//another way to define retriveHelloWorldBean

export const retriveHelloWorldBean = () => apiClient.get("/hello-world-bean");

export const retriveHelloWorldPathVariable = (username, token) =>
  apiClient.get(
    `/hello-world/path-variable/${username}`
    // , {
    //   headers: {
    //     Authorization: token,
    //   },
    // }
  );
