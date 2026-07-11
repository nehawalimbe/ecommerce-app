// import { useCart } from "../context/CartContext";
// function CartItems() {
//   const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
//     useCart();
//   const total = cartItems.reduce(
//     (acc, cartItem) => acc + cartItem.product.price,
//     0,
//   );
//   const totalQuantity = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
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
//           <br />
//         </div>
//       ))}
//       <hr />
//       <div>
//         <span>Total Price : </span>
//         <span>{total}</span>
//       </div>
//       <div>
//         <span>Total Quantity : </span>
//         <span>{totalQuantity}</span>
//       </div>
//     </div>
//   );
// }
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../store/cartSlice";
import type { RootState } from "../store/store.ts";
import { useDispatch, useSelector } from "react-redux";


function CartItems() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  // const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
  //   useCart();
  const total = cartItems.reduce(
    (acc, cartItem) => acc + cartItem.product.price * cartItem.quantity,
    0,
  );
  const totalQuantity = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0,
  );
  const handleDecreaseQuantity = (id: number) => {
    dispatch(decreaseQuantity(id));
  };
  const handleIncreaseQuantity = (id: number) => {
    dispatch(increaseQuantity(id));
  };
  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div>
      {cartItems.map((cartItem) => (
        <div key={cartItem.product.id}>
          <div>{cartItem.product.title}</div>
          <div>{cartItem.product.price}</div>
          <div>
            <button onClick={() => handleDecreaseQuantity(cartItem.product.id)}>
              -
            </button>
            <div>Quantity: {cartItem.quantity}</div>
            <button onClick={() => handleIncreaseQuantity(cartItem.product.id)}>
              +
            </button>
          </div>
          <button onClick={() => handleRemoveFromCart(cartItem.product.id)}>
            Remove from Cart
          </button>
          <br />
        </div>
      ))}
      <hr />
      <div>
        <span>Total Price : </span>
        <span>{total}</span>
      </div>
      <div>
        <span>Total Quantity : </span>
        <span>{totalQuantity}</span>
      </div>
    </div>
  );
}

export default CartItems;
