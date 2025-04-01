import { MainLayout } from "@/layouts/MainLayout";
import { Login } from "@/pages/Auth";
import { Page404 } from "@/pages/Page404";
import { useEffect } from "react";
import { useLocation, useRoutes } from "react-router";

export default function Router() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          element: <Login />,
          index: true,
        },
      ],
    },
    { path: "*", element: <Page404 /> },
  ]);
}
