import type { CartItem } from "../types/CartItem";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/Product";

const initialState = {
  cartItems: [] as CartItem[],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const productToAdd = action.payload;
      const existingCartItem = state.cartItems.find(
        (cartItem) => cartItem.product.id === productToAdd.id,
      );
      if (existingCartItem) {
        existingCartItem.quantity++;
      } else {
        state.cartItems.push({ product: productToAdd, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.product.id !== action.payload,
      );
    },
    increaseQuantity(state, action: PayloadAction<number>) {
      const existingCartItem = state.cartItems.find(
        (cartItem) => cartItem.product.id === action.payload,
      );
      if (existingCartItem) {
        existingCartItem.quantity++;
      }
    },
    decreaseQuantity(state, action: PayloadAction<number>) {
      const existingCartItem = state.cartItems.find(
        (cartItem) => cartItem.product.id === action.payload,
      );
      if (!existingCartItem) {
        return;
      }
      if (existingCartItem) {
        if (existingCartItem.quantity > 1) {
          existingCartItem.quantity--;
        } else {
          state.cartItems = state.cartItems.filter(
            (cartItem) => cartItem.product.id !== action.payload,
          );
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
