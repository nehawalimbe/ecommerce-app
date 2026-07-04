import { useEffect, useState } from "react";
import type { Product } from "../types/Product";

function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const productRes = await fetch("https://fakestoreapi.com/products");
      if (!productRes.ok) {
        throw Error("Error while fetching products");
      }
      const productApiData: Product[] = await productRes.json();
      setProducts(productApiData);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
  };
}

export default useProducts;
