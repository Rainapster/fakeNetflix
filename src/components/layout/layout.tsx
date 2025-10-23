import { Navbar } from "../navbar/navbar";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../footer/footer";
import Hero from "../hero/Hero";

export const Layout = () => {
  const location = useLocation()
  const isDetailPage = location.pathname.startsWith("/detail")
  return (
    <div className="d-flex flex-column">
      <Navbar />
      {!isDetailPage && <Hero/>}
      <Outlet />
      <Footer />
    </div>
  );
};
