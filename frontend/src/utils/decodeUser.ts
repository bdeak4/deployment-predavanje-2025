import { Role } from "@/enums/Role";
import { jwtDecode } from "jwt-decode";

export type JwtPayload = {
  sub: string;
  username: string;
  email: string;
  role: Role;
};

export const getUserFromToken = (token: string): JwtPayload => {
  const decodedToken = jwtDecode<JwtPayload>(token);
  return decodedToken;
};
