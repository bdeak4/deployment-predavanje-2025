import { API_ENDPOINTS } from "@/constants/constants";
import { Quiz } from "@/types/Quiz";
import axios from "axios";

export const fetchAllQuizzes = async (): Promise<Quiz[]> => {
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

export const fetchQuizzesBySearch = async (
  searchQuery: string
): Promise<Quiz[]> => {
  try {
    const response = await axios.get(
      `${API_ENDPOINTS.QUIZ.SEARCH}?search=${searchQuery}`
    );
    if (response.status !== 200) {
      throw new Error("Something went wrong while fetching quizzes");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
};
