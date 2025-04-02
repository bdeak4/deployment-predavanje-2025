import { API_ENDPOINTS } from "@/constants/constants";
import axios from "axios";

export const login = async (prompt: string, password: string) => {
  try {
    const response = await axios.post(API_ENDPOINTS.AUTH.LOGIN, {
      prompt: prompt,
      password: password,
    });

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
