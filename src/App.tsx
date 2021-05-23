import React, { useContext, useEffect } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useFetch } from "./hooks/use-fetch";

interface Auth {
  id: string;
  type: "login";
  attributes: {
    name: string;
    email: string;
    token: string;
    permissions: object[];
    relationships: [
      {
        type: string;
        attributes: {
          name: string;
          address: string;
          contact: string;
          site: string;
          type: string;
        };
        relationships: object[];
      }
    ];
  };
}

interface Error {
  error: boolean;
  message: string;
}

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  const [data, error] = useFetch<Auth, Error>("/auth/login", {
    method: "POST",
    payload: { email: "fulano@example.com", password: "123456" },
  });

  useEffect(() => console.log("data", data), [data]);
  useEffect(() => console.log("error", error), [error]);

  return <AuthProvider>Hello world</AuthProvider>;
}

export default App;
