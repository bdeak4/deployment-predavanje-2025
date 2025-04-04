import { MainLayout } from "@/layouts/MainLayout";
import { Login, Register } from "@/pages/Auth";
import { Page404 } from "@/pages/Page404";
import { useEffect } from "react";
import { useLocation, useRoutes } from "react-router";
import { paths } from "./paths";
import { QuizzesPage } from "@/pages/Quizzes";
import { SinglePageQuiz } from "@/pages/SingleQuizPage";

export default function Router() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return useRoutes([
    {
      path: paths.home,
      element: <MainLayout />,
      children: [
        {
          element: <QuizzesPage />,
          index: true,
        },
        {
          path: "quiz/:id",
          element: <SinglePageQuiz />,
        },
      ],
    },

    {
      path: paths.login,
      element: <Login />,
    },
    {
      path: paths.register,
      element: <Register />,
    },

    { path: "*", element: <Page404 /> },
  ]);
}
