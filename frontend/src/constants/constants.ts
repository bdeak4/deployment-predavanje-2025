const API_BASE_URL = "http://localhost:3000/api";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
  },
  QUIZ: {
    ALL_QUIZZES: `${API_BASE_URL}/quiz`,
    SEARCH: `${API_BASE_URL}/quiz/search`,
  },
};
