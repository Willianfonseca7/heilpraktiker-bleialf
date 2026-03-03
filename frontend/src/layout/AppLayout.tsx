import { Outlet } from "react-router-dom";
import { Header } from "./Header.tsx";
import { Footer } from "./Footer.tsx";
import { useScrollToTop } from "../hooks/useScrollToTop.ts";

export function AppLayout() {
  useScrollToTop();
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
