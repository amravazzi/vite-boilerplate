import React, { useContext, useEffect } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";

function App(): JSX.Element {
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => console.log("AuthProvider", isAuthenticated), []);

  return (
    <AuthProvider>Hello world</AuthProvider>
  );
}

export default App;
