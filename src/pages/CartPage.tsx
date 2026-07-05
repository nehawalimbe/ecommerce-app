import CartSummary from "../components/CartSummary";
import CartItems from "../components/CartItems";
function CartPage() {
  return (
    <div className="cart-page-content">
      <CartSummary />
      <CartItems />
      <hr />
    </div>
  );
}
export default CartPage;
