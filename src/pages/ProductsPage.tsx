import { useState, useMemo, useCallback } from "react";
import ProductList from "./../components/ProductList";
import type { Product } from "./../types/Product";
import ProductFilters from "./../components/ProductFilters";
import useProducts from "./../hooks/useProducts";

function ProductsPage() {
  const { products, loading, error } = useProducts();
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("price_low_high");

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
  return (
    <div className="products-page-content">
      <ProductFilters
        searchText={searchText}
        onSearchTextChange={handleSearchTextChange}
        selectedCategory={selectedCategory}
        onSelectedCategoryChange={handleSelectedCategoryChange}
        sortBy={sortBy}
        onSortByChange={handleSortByChange}
      />
      {!loading && products.length > 0 && sortedProducts.length === 0 ? (
        <div>No products found</div>
      ) : (
        <ProductList productList={sortedProducts} />
      )}

      {error && <div>{error}</div>}
      {loading && <div>Loading......</div>}
    </div>
  );
}
export default ProductsPage;
