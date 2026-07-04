import { useCart } from "../context/CartContext";

function CartItems() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();
  const total = cartItems.reduce(
    (acc, cartItem) => acc + cartItem.product.price,
    0,
  );
  const totalQuantity = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
  return (
    <div>
      {cartItems.map((cartItem) => (
        <div key={cartItem.product.id}>
          <div>{cartItem.product.title}</div>
          <div>{cartItem.product.price}</div>
          <div>
            <button onClick={() => decreaseQuantity(cartItem.product.id)}>
              -
            </button>
            <div>Quantity: {cartItem.quantity}</div>
            <button onClick={() => increaseQuantity(cartItem.product.id)}>
              +
            </button>
          </div>
          <button onClick={() => removeFromCart(cartItem.product.id)}>
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
