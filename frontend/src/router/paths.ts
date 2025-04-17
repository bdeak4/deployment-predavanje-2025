export const paths = {
  home: "/",
  login: "/login",
  register: "/register",
  quiz: (id: string) => `/quiz/${id}`,
  stats: "/stats",
  admin: "/admin",
  createQuiz: "/admin/create-quiz",
  createCategory: "/admin/create-category",
};
