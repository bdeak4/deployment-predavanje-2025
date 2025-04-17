import { MainLayout } from "@/layouts/MainLayout";
import { Login, Register } from "@/pages/Auth";
import { Page404 } from "@/pages/Page404";
import { useEffect } from "react";
import { useLocation, useRoutes } from "react-router";
import { paths } from "./paths";
import { QuizzesPage } from "@/pages/Quizzes";
import { SinglePageQuiz } from "@/pages/SingleQuizPage";
import { AdminRoute, PrivateRoute } from "@/contexts";
import { StatsPage } from "@/pages/Stats";
import { AdminPage } from "@/pages/AdminPage";

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
          element: <PrivateRoute />,
          children: [
            {
              path: "quiz/:id",
              element: <SinglePageQuiz />,
            },
            {
              path: paths.stats,
              element: <StatsPage />,
            },
          ],
        },
        {
          element: <AdminRoute />,
          children: [{ path: paths.admin, element: <AdminPage /> }],
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
