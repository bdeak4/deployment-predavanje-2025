import api from "@/constants/api";
import { API_ENDPOINTS } from "@/constants/constants";

export const getRanking = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.USER.RANKING);

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
