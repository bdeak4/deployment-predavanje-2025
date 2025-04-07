import { Role } from "@/enums/Role";
import { jwtDecode } from "jwt-decode";

export type JwtPayload = {
  sub: string;
  username: string;
  email: string;
  role: Role;
  exp: number;
};
export const getUserFromToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const now = Date.now() / 1000;

    if (decoded.exp && decoded.exp < now) {
      return null;
    }

    return decoded;
  } catch (error) {
    return null;
  }
};
