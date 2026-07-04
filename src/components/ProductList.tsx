import ProductCard from "./ProductCard";
import type { Product } from "../types/Product";
type ProductListProps = {
  productList: Product[];
};
function ProductList({ productList }: ProductListProps) {
  return (
    <div className="product-list-container">
      {productList.map((product) => (
        <ProductCard key={product.id} productData={product}></ProductCard>
      ))}
    </div>
  );
}
export default ProductList;
