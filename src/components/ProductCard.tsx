import React from "react";
import type { Product } from "../types/Product";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
type ProductCardProps = {
  productData: Product;
};
function ProductCard({ productData }: ProductCardProps) {
  const { id, title, price, description, image } = productData;
  const cartContext = useCart();
  const { addToCart } = cartContext;
  const navigate = useNavigate();
  const handleAddToCart = () => {
    addToCart(productData);
    navigate("/cart");
  };

  return (
    <div className="product-container">
      <h1 className="product-title"><Link to={`/product/${id}`}>{title}</Link></h1>
      <h2>{price}</h2>
      <p>{description}</p>
      <img src={image} alt={title}></img>
      <button onClick={() => handleAddToCart()}>Add To Cart</button>
    </div>
  );
}
export default React.memo(ProductCard);
