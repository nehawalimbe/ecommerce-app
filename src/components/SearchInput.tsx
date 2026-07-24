type Props = {
  searchText: string;
  onSearchInputChange: (value: string) => void;
};
function SearchInput({ searchText, onSearchInputChange }: Props) {
  return (
    <div className="filter-field search-content">
      <label className="filter-label" htmlFor="product-search">
        Search products
      </label>
      <input
        id="product-search"
        name="search"
        type="search"
        value={searchText}
        placeholder="Search by product name"
        onChange={(e) => onSearchInputChange(e.target.value)}
      />
    </div>
  );
}
export default SearchInput;
