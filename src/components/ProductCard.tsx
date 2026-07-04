import React from "react";
import type { Product } from "../types/Product";
import { useCart } from "../context/CartContext";
type ProductCardProps = {
  productData: Product;
};
function ProductCard({ productData }: ProductCardProps) {
  const { title, price, description, image } = productData;
  console.log("ProductCard rendered", title);
  const cartContext = useCart();

  const { addToCart } = cartContext;
  return (
    <div className="product-container">
      <h1 className="product-title">{title}</h1>
      <h2>{price}</h2>
      <p>{description}</p>
      <img src={image} alt={title}></img>
      <button onClick={() => addToCart(productData)}>Add To Cart</button>
    </div>
  );
}
export default React.memo(ProductCard);
