import api from "@/constants/api";
import { API_ENDPOINTS } from "@/constants/constants";

export const saveQuizResult = async (quizId: string, score: number) => {
  try {
    const response = await api.post(`${API_ENDPOINTS.QUIZ_RESULTS.CREATE}`, {
      quizId: quizId,
      score: score,
    });
    if (response.status !== 201) {
      throw new Error("Something went wrong while creating quiz result.");
    }
    return response.data;
  } catch (error) {
    console.error("Error while creating quiz result:", error);
    throw error;
  }
};
