import { MainLayout } from "@/layouts/MainLayout";
import { Login, Register } from "@/pages/Auth";
import { Page404 } from "@/pages/Page404";
import { useEffect } from "react";
import { Navigate, useLocation, useRoutes } from "react-router";
import { paths } from "./paths";

export default function Router() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return useRoutes([
    {
      path: "/",
      element: <Navigate to={paths.login} />,
    },
    {
      path: paths.quizzes,
      element: <MainLayout />,
      children: [
        {
          path: paths.quizzes,
          element: <div>Quizzes Page</div>,
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
