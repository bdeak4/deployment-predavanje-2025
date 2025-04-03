import { API_ENDPOINTS } from "@/constants/constants";
import axios from "axios";

export const login = async (prompt: string, password: string) => {
  try {
    const response = await axios.post(API_ENDPOINTS.AUTH.LOGIN, {
      prompt: prompt,
      password: password,
    });

    if (response.status !== 201) {
      throw new Error("Something went wrong.");
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(API_ENDPOINTS.AUTH.REGISTER, {
      username: username,
      email: email,
      password: password,
    });

    if (response.status !== 201) {
      throw new Error("Something went wrong.");
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
