import { API_ENDPOINTS } from "@/constants/constants";
import { Category } from "@/types/Category";
import axios from "axios";

export const fetchAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(API_ENDPOINTS.CATEGORY.ALL_CATEGORIES);
    if (response.status !== 200) {
      throw new Error("Something went wrong while fetching categories");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
