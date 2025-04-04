import { API_ENDPOINTS } from "@/constants/constants";
import axios from "axios";

export const fetchAllQuizzes = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.QUIZ.ALL_QUIZZES);
    if (response.status !== 200) {
      throw new Error("Something went wrong while fetching quizzes");
    }
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
