import api from "@/constants/api";
import { API_ENDPOINTS } from "@/constants/constants";

export const getRanking = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.USER.RANKING);
    if (response.status !== 200) {
      throw new Error("Something went wrong while fetching user data.");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
