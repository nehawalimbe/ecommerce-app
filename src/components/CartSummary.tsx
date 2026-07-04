import { useCart } from "../context/CartContext";

function CartSummary () {
    const cartContext = useCart();

    return (<div><span>Cart Item Count :</span><span>{cartContext.cartItems.length}</span></div>)
}

export default CartSummary;