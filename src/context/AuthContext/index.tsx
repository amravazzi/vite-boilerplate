import React, { ReactNode, createContext, useState } from "react";

interface ProviderPropsInterface {
  children: ReactNode;
}

interface AuthContextInterface {
  isLoading: boolean;
  isAuthenticated: boolean;
  handleLogin?: () => void;
  handleLogout?: () => void;
}

export const AuthContext = createContext<AuthContextInterface>({
  isLoading: false,
  isAuthenticated: false,
});

export function AuthProvider({ children }: ProviderPropsInterface): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  function handleLogin(): void {}

  function handleLogout(): void {}

  return (
    <AuthContext.Provider
      value={{ isLoading, isAuthenticated, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
