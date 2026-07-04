import { createContext, useContext, useState } from "react";
import type { Product } from "../types/Product";
import type { CartItem } from "../types/CartItem";

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
};

type CartProviderProps = {
  children: React.ReactNode;
};
const CartContext = createContext<CartContextType | null>(null);

function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const addToCart = (productToAdd: Product) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem.product.id === productToAdd.id,
      );
      if (existingCartItem) {
        return prevCartItems.map((cartItem) =>
          cartItem.product.id === productToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }
      return [...prevCartItems, { product: productToAdd, quantity: 1 }];
    });
  };
  const removeFromCart = (id: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((cartItem) => cartItem.product.id !== id),
    );
  };
  const increaseQuantity = (id: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((cartItem) =>
        cartItem.product.id === id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem,
      ),
    );
  };
  const decreaseQuantity = (id: number) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem.product.id === id,
      );
      if (existingCartItem?.quantity === 1) {
        return prevCartItems.filter((cartItem) => cartItem.product.id !== id);
      } else {
        return prevCartItems.map((cartItem) =>
          cartItem.product.id === id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem,
        );
      }
    });
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw Error("useCart must be used within CartProvider");
  }
  return cartContext;
}
export { CartProvider, useCart };
export default CartContext;
