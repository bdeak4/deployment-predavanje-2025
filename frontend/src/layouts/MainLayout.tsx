import { Navbar } from "@/components";
import { Outlet } from "react-router";

export const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
