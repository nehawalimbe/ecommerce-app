import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItems from "../components/CartItems";
import CartSummary from "../components/CartSummary";
import type { RootState } from "../store/store";

function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const totalQuantity = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0,
  );

  return (
    <section className="cart-page-content" aria-labelledby="cart-heading">
      <header className="cart-page-header">
        <p className="page-eyebrow">Your order</p>
        <h1 id="cart-heading">Shopping cart</h1>
        <p className="page-description">
          {totalQuantity === 0
            ? "Your cart is ready for something great."
            : `${totalQuantity} ${totalQuantity === 1 ? "item" : "items"} in your cart.`}
        </p>
      </header>

      {cartItems.length === 0 ? (
        <div className="status-state cart-empty-state">
          <span className="empty-cart-icon" aria-hidden="true">
            Bag
          </span>
          <h2>Your cart is empty</h2>
          <p>Browse the collection and add something you like.</p>
          <Link className="primary-link" to="/">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <CartItems />
          <CartSummary />
        </div>
      )}
    </section>
  );
}

export default CartPage;
