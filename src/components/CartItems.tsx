import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../store/cartSlice";
import type { RootAction, RootState } from "../store/store";

// ******************** Context API reference implementation ********************
// import { useCart } from "../context/CartContext";
//
// function CartItemsWithContext() {
//   const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
//     useCart();
//   const total = cartItems.reduce(
//     (acc, cartItem) => acc + cartItem.product.price * cartItem.quantity,
//     0,
//   );
//   const totalQuantity = cartItems.reduce(
//     (total, cartItem) => total + cartItem.quantity,
//     0,
//   );
//
//   return (
//     <div>
//       {cartItems.map((cartItem) => (
//         <div key={cartItem.product.id}>
//           <div>{cartItem.product.title}</div>
//           <div>{cartItem.product.price}</div>
//           <div>
//             <button onClick={() => decreaseQuantity(cartItem.product.id)}>
//               -
//             </button>
//             <div>Quantity: {cartItem.quantity}</div>
//             <button onClick={() => increaseQuantity(cartItem.product.id)}>
//               +
//             </button>
//           </div>
//           <button onClick={() => removeFromCart(cartItem.product.id)}>
//             Remove from Cart
//           </button>
//         </div>
//       ))}
//       <div>Total Price: {total}</div>
//       <div>Total Quantity: {totalQuantity}</div>
//     </div>
//   );
// }
// ******************** End Context API reference implementation ****************

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function CartItems() {
  const dispatch = useDispatch<RootAction>();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  return (
    <section className="cart-items" aria-label="Items in your cart">
      {cartItems.map((cartItem) => {
        const { product, quantity } = cartItem;

        return (
          <article className="cart-item" key={product.id}>
            <Link
              className="cart-item-image-wrapper"
              to={`/product/${product.id}`}
              aria-label={`View ${product.title}`}
            >
              <img className="cart-item-image" src={product.image} alt="" />
            </Link>

            <div className="cart-item-info">
              <p className="product-category">{product.category}</p>
              <h2 className="cart-item-title">
                <Link to={`/product/${product.id}`}>{product.title}</Link>
              </h2>
              <p className="cart-item-unit-price">
                {currencyFormatter.format(product.price)} each
              </p>
              <button
                className="remove-item-button"
                type="button"
                onClick={() => dispatch(removeFromCart(product.id))}
              >
                Remove
              </button>
            </div>

            <div className="cart-item-actions">
              <p className="cart-line-total">
                {currencyFormatter.format(product.price * quantity)}
              </p>
              <div className="cart-quantity">
                <span className="quantity-label">Quantity</span>
                <div className="quantity-control">
                  <button
                    className="quantity-button"
                    type="button"
                    aria-label={`Decrease quantity of ${product.title}`}
                    onClick={() => dispatch(decreaseQuantity(product.id))}
                  >
                    &minus;
                  </button>
                  <span className="quantity-value" aria-live="polite">
                    {quantity}
                  </span>
                  <button
                    className="quantity-button"
                    type="button"
                    aria-label={`Increase quantity of ${product.title}`}
                    onClick={() => dispatch(increaseQuantity(product.id))}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export default CartItems;
