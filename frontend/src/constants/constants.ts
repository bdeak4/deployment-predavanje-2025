import { API_BASE_URL } from "./api";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
  },
  QUIZ: {
    ALL_QUIZZES: `${API_BASE_URL}/quiz`,
    SEARCH: `${API_BASE_URL}/quiz/search`,
    SINGLE: (id: string) => `${API_BASE_URL}/quiz/${id}`,
  },
  USER: {
    RANKING: `${API_BASE_URL}/user/ranking`,
  },
  CATEGORY: {
    ALL_CATEGORIES: `${API_BASE_URL}/category`,
    CREATE: `${API_BASE_URL}/category`,
  },
  QUIZ_RESULTS: {
    CREATE: `${API_BASE_URL}/quiz-result`,
  },
};
