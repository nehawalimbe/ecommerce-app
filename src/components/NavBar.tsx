import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="nav-bar-container">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        Product
      </NavLink>
      <NavLink
        to="/cart"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        Cart
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        About
      </NavLink>
    </div>
  );
}
export default NavBar;
