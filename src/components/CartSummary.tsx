import type { RootState } from "../store/store";
import { useSelector } from "react-redux";


function CartSummary () {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    return (<div><span>Cart Item Count :</span><span>{cartItems.length}</span></div>)
}

export default CartSummary;

// ******************** Below Logic is for Context ***************************

// import { useCart } from "../context/CartContext";

// function CartSummary () {
//     const cartContext = useCart();

//     return (<div><span>Cart Item Count :</span><span>{cartContext.cartItems.length}</span></div>)
// }

// export default CartSummary;

// ******************** Above Logic is for Context ***************************

