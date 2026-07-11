import React from "react";
import type { Product } from "../types/Product";
// import { useCart } from "../context/CartContext";
import { addToCart } from "../store/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
type ProductCardProps = {
  productData: Product;
};
function ProductCard({ productData }: ProductCardProps) {
  const { id, title, price, description, image } = productData;
  // ******************** Below Logic is for Context ***************************
  // const cartContext = useCart();
  // const { addToCart } = cartContext;
  // ******************** Below Logic is for Context ***************************
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ******************** Below Logic is for Context ***************************
  // const handleAddToCart = () => {
  //   addToCart(productData);
  //   navigate("/cart");
  // };
  // ******************** Below Logic is for Context ***************************

  const handleAddToCart = () => {
    dispatch(addToCart(productData));
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
