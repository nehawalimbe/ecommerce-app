import SearchInput from "../components/SearchInput";

type FilterProps = {
  searchText: string;
  onSearchTextChange: (value: string) => void;
  selectedCategory: string;
  onSelectedCategoryChange: (value: string) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
};
function ProductFilters({
  searchText,
  onSearchTextChange,
  selectedCategory,
  onSelectedCategoryChange,
  sortBy,
  onSortByChange,
}: FilterProps) {
  return (
    <section className="header-container" aria-label="Product filters">
      <SearchInput
        searchText={searchText}
        onSearchInputChange={onSearchTextChange}
      />

      <div className="filter-field">
        <label className="filter-label" htmlFor="category-filter">
          Category
        </label>
        <select
          id="category-filter"
          name="category"
          value={selectedCategory}
          onChange={(e) => onSelectedCategoryChange(e.target.value)}
        >
          <option value="all">All categories</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's clothing</option>
          <option value="women's clothing">Women's clothing</option>
        </select>
      </div>

      <div className="filter-field">
        <label className="filter-label" htmlFor="sort-filter">
          Sort by
        </label>
        <select
          id="sort-filter"
          name="sortBy"
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
        >
          <option value="price_low_high">Price: Low to High</option>
          <option value="price_high_low">Price: High to Low</option>
          <option value="rating_high_low">Rating: High to Low</option>
        </select>
      </div>
    </section>
  );
}

export default ProductFilters;
