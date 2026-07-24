import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../store/store";

// ******************** Context API reference implementation ********************
// import { useCart } from "../context/CartContext";
//
// function CartSummaryWithContext() {
//   const { cartItems } = useCart();
//   return (
//     <div>
//       <span>Cart Item Count: </span>
//       <span>{cartItems.length}</span>
//     </div>
//   );
// }
// ******************** End Context API reference implementation ****************

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function CartSummary() {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const totalQuantity = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0,
  );
  const totalPrice = cartItems.reduce(
    (total, cartItem) =>
      total + cartItem.product.price * cartItem.quantity,
    0,
  );

  return (
    <aside className="cart-summary" aria-labelledby="summary-heading">
      <h2 id="summary-heading">Order summary</h2>

      <div className="summary-rows">
        <div className="summary-row">
          <span>Items</span>
          <span>{totalQuantity}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span className="shipping-value">Free</span>
        </div>
      </div>

      <div className="summary-total">
        <span>Total</span>
        <span>{currencyFormatter.format(totalPrice)}</span>
      </div>

      <p className="summary-note">Taxes are calculated during checkout.</p>
      <Link className="continue-shopping-link" to="/">
        Continue shopping
      </Link>
    </aside>
  );
}

export default CartSummary;
