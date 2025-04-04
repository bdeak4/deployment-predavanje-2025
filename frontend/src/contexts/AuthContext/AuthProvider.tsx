import React, { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { getUserFromToken, JwtPayload } from "@/utils/decodeUser";
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = getUserFromToken(token);
      setUser(userData);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const userData = getUserFromToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
