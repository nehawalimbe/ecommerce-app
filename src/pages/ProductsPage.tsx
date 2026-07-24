import { useState, useMemo, useCallback, useEffect } from "react";
import ProductList from "./../components/ProductList";
import type { Product } from "./../types/Product";
import ProductFilters from "./../components/ProductFilters";
// import useProducts from "./../hooks/useProducts";
import { useDispatch, useSelector } from "react-redux";
import type { RootAction, RootState } from "../store/store";
import { fetchProducts } from "../store/productSlice";

function ProductsPage() {
  // const { products, loading, error } = useProducts();
  const dispatch = useDispatch<RootAction>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("price_low_high");
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const sortedProducts = useMemo(() => {
    const filteredProducts = products
      .filter((product) => {
        return product.title
          .toLowerCase()
          .includes(searchText.toLowerCase().trim());
      })
      .filter((product) => {
        return selectedCategory === "all"
          ? true
          : product.category === selectedCategory;
      });
    return [...filteredProducts].sort((a: Product, b: Product) => {
      if (sortBy === "price_low_high") return a.price - b.price;
      else if (sortBy === "price_high_low") return b.price - a.price;
      else return (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0);
    });
  }, [products, searchText, selectedCategory, sortBy]);
  const handleSearchTextChange = useCallback((value: string) => {
    setSearchText(value);
  }, []);
  const handleSelectedCategoryChange = useCallback((value: string) => {
    setSelectedCategory(value);
  }, []);
  const handleSortByChange = useCallback((value: string) => {
    setSortBy(value);
  }, []);

  const resultCountLabel = loading
    ? "Loading products"
    : error
      ? "Products unavailable"
      : `${sortedProducts.length} ${sortedProducts.length === 1 ? "product" : "products"}`;

  return (
    <section
      className="products-page-content"
      aria-labelledby="products-heading"
    >
      <header className="products-page-header">
        <div>
          <p className="page-eyebrow">Our collection</p>
          <h1 id="products-heading">Find your next favorite</h1>
          <p className="page-description">
            Search, filter, and sort products to find exactly what you need.
          </p>
        </div>
        <p className="product-count" aria-live="polite">
          {resultCountLabel}
        </p>
      </header>

      <ProductFilters
        searchText={searchText}
        onSearchTextChange={handleSearchTextChange}
        selectedCategory={selectedCategory}
        onSelectedCategoryChange={handleSelectedCategoryChange}
        sortBy={sortBy}
        onSortByChange={handleSortByChange}
      />

      <div className="product-results">
        {loading ? (
          <div className="status-state" role="status">
            <span className="loading-spinner" aria-hidden="true" />
            <h2>Loading products</h2>
            <p>Please wait while we prepare the collection.</p>
          </div>
        ) : error ? (
          <div className="status-state error-state" role="alert">
            <h2>We couldn&apos;t load the products</h2>
            <p>{error}</p>
            <button type="button" onClick={() => dispatch(fetchProducts())}>
              Try again
            </button>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="status-state">
            <h2>No products found</h2>
            <p>Try another search term or choose a different category.</p>
          </div>
        ) : (
          <ProductList productList={sortedProducts} />
        )}
      </div>
    </section>
  );
}
export default ProductsPage;
