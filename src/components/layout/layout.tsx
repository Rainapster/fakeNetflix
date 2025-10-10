import { Navbar } from "../navbar/navbar";
import { Outlet } from "react-router-dom";
import { Footer } from "../footer/footer";

export const Layout = () => {
  return (
    <div className="d-flex flex-column">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
