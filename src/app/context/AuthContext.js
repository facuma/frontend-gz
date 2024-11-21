"use client";

import { createContext, useContext, useState } from "react";
import { loginUser } from "@/utils/api"; // Asegúrate de que este path sea correcto.

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const handleLogin = async (username, password) => {
    const data = await loginUser({ username, password });
    setUser(data.user); // Asegúrate de que el backend devuelva un objeto `user`
    setToken(data.token); // Asegúrate de que el backend devuelva un `token`
    localStorage.setItem("token", data.token); // Guarda el token en localStorage
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
