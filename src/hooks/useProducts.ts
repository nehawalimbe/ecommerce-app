import { useEffect, useState } from "react";
import type { Product } from "../types/Product";

function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function getProducts() {
      try {
        const productResponse = await fetch(
          "https://fakestoreapi.com/products",
          { signal: controller.signal },
        );

        if (!productResponse.ok) {
          throw new Error("Error while fetching products");
        }

        const productApiData: Product[] = await productResponse.json();

        if (!controller.signal.aborted) {
          setProducts(productApiData);
        }
      } catch (requestError) {
        if (controller.signal.aborted) {
          return;
        }

        setError(
          requestError instanceof Error
            ? requestError.message
            : "Something went wrong",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void getProducts();

    return () => controller.abort();
  }, []);

  return { products, loading, error };
}

export default useProducts;
