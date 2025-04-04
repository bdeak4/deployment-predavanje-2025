import { createContext } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  loginToken: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
