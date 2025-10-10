import { NavLink } from "react-router-dom";
import "../navbar/navbar.css"

export const Navbar = () => (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <NavLink className="nav-link" to = "/">Home </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className={({isActive}: { isActive: boolean })  => `nav-link ${isActive ? "text-red" : "text-white"}`} to="/series">Series</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className={({ isActive}: { isActive: boolean }) => `nav-link ${isActive ? "text-red" : "text-white"}`} to="/movies">Movies</NavLink>
      </li>

    </ul>
  </div>
</nav>
);
