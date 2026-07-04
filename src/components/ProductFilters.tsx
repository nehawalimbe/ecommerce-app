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
    <div className="header-container">
      <SearchInput
        searchText={searchText}
        onSearchInputChange={(value) => onSearchTextChange(value)}
      ></SearchInput>
      <select
        name="categories"
        value={selectedCategory}
        onChange={(e) => onSelectedCategoryChange(e.target.value)}
      >
        <option value="all">All</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
        <option value="men's clothing">Men's clothing</option>
        <option value="women's clothing">Women's clothing</option>
      </select>
      <label>Sort By</label>
      <select
        name="sortBy"
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value)}
      >
        <option value="price_low_high">Price: Low to High</option>
        <option value="price_high_low">Price: High to Low</option>
        <option value="rating_high_low">Rating: High to Low</option>
      </select>
    </div>
  );
}

export default ProductFilters;
