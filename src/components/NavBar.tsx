import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

function NavBar() {
  const cartQuantity = useSelector((state: RootState) =>
    state.cart.cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0,
    ),
  );

  return (
    <header className="site-header">
      <nav className="nav-bar-container" aria-label="Primary navigation">
        <Link className="brand-link" to="/" aria-label="MyStore home">
          <span className="brand-mark" aria-hidden="true">
            M
          </span>
          <span>MyStore</span>
        </Link>

        <div className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
            aria-label={`Cart, ${cartQuantity} ${cartQuantity === 1 ? "item" : "items"}`}
          >
            <span>Cart</span>
            <span className="cart-count" aria-hidden="true">
              {cartQuantity}
            </span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
export default NavBar;
