import React from "react";
import type { Product } from "../types/Product";
// import { useCart } from "../context/CartContext";
import { addToCart } from "../store/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
type ProductCardProps = {
  productData: Product;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function ProductCard({ productData }: ProductCardProps) {
  const { id, title, price, description, image, category, rating } =
    productData;
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
    <article className="product-card">
      <Link
        className="product-image-link"
        to={`/product/${id}`}
        aria-label={`View ${title}`}
      >
        <span className="product-image-wrapper">
          <img className="product-image" src={image} alt="" />
        </span>
      </Link>

      <div className="product-card-content">
        <p className="product-category">{category}</p>
        <h2 className="product-title">
          <Link to={`/product/${id}`} title={title}>
            {title}
          </Link>
        </h2>

        <div className="product-meta">
          <p className="product-price">{currencyFormatter.format(price)}</p>
          {rating && (
            <p
              className="product-rating"
              aria-label={`${rating.rate} out of 5 stars, ${rating.count} reviews`}
            >
              <span aria-hidden="true">{"\u2605"} {rating.rate}</span>
              <span className="rating-count" aria-hidden="true">
                ({rating.count})
              </span>
            </p>
          )}
        </div>

        <p className="product-description">{description}</p>
        <button
          className="add-to-cart-button"
          type="button"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}
export default React.memo(ProductCard);
