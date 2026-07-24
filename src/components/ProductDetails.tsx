import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../store/cartSlice";
import type { RootAction } from "../store/store";
import type { Product } from "../types/Product";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function ProductDetails() {
  const { id } = useParams();
  const productId = Number(id);
  const isValidProductId = Number.isInteger(productId) && productId > 0;
  const dispatch = useDispatch<RootAction>();
  const navigate = useNavigate();
  const [productData, setProductData] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!isValidProductId) {
      return;
    }

    const controller = new AbortController();

    async function fetchProduct() {
      setLoading(true);
      setError("");
      setProductData(undefined);

      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${productId}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("The product could not be loaded.");
        }

        const product: Product | null = await response.json();

        if (!controller.signal.aborted) {
          setProductData(product ?? undefined);
        }
      } catch (requestError) {
        if (controller.signal.aborted) {
          return;
        }

        setError(
          requestError instanceof Error
            ? requestError.message
            : "Something went wrong while loading the product.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void fetchProduct();

    return () => controller.abort();
  }, [isValidProductId, productId, retryCount]);

  const handleAddToCart = () => {
    if (!productData) {
      return;
    }

    dispatch(addToCart(productData));
    navigate("/cart");
  };

  if (!isValidProductId) {
    return (
      <section className="status-state" role="alert">
        <h1>Invalid product</h1>
        <p>The product address does not contain a valid product ID.</p>
        <Link className="back-link" to="/">
          Back to products
        </Link>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="status-state" role="status">
        <span className="loading-spinner" aria-hidden="true" />
        <h1>Loading product</h1>
        <p>Please wait while we fetch the product details.</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="status-state error-state" role="alert">
        <h1>We couldn&apos;t load this product</h1>
        <p>{error}</p>
        <div className="status-actions">
          <button type="button" onClick={() => setRetryCount((count) => count + 1)}>
            Try again
          </button>
          <Link className="back-link" to="/">
            Back to products
          </Link>
        </div>
      </section>
    );
  }

  if (!productData) {
    return (
      <section className="status-state">
        <h1>Product not found</h1>
        <p>The product may have been removed or is no longer available.</p>
        <Link className="back-link" to="/">
          Back to products
        </Link>
      </section>
    );
  }

  return (
    <article className="product-details">
      <div className="product-detail-image-panel">
        <img
          className="product-detail-image"
          src={productData.image}
          alt={productData.title}
        />
      </div>

      <div className="product-detail-content">
        <Link className="back-link" to="/">
          <span aria-hidden="true">&larr;</span> Back to products
        </Link>
        <p className="product-category">{productData.category}</p>
        <h1>{productData.title}</h1>

        {productData.rating && (
          <p
            className="product-detail-rating"
            aria-label={`${productData.rating.rate} out of 5 stars, ${productData.rating.count} reviews`}
          >
            <span aria-hidden="true">
              {"\u2605"} {productData.rating.rate}
            </span>
            <span className="rating-count" aria-hidden="true">
              {productData.rating.count} reviews
            </span>
          </p>
        )}

        <p className="product-detail-price">
          {currencyFormatter.format(productData.price)}
        </p>
        <p className="product-detail-description">{productData.description}</p>
        <button
          className="product-detail-button"
          type="button"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}

export default ProductDetails;
