import { useDebugValue, useEffect, useRef } from "react";

type Props = {
  searchText: string;
  onSearchInputChange: (value: string) => void;
};
function SearchInput({ searchText, onSearchInputChange }: Props) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  return (
    <div className="search-content">
      <input
        type="text"
        value={searchText}
        placeholder="Search MyProduct.in"
        onChange={(e) => onSearchInputChange(e.target.value)}
        ref={searchInputRef}
      ></input>
    </div>
  );
}
export default SearchInput;
