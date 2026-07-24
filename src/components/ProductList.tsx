import ProductCard from "./ProductCard";
import type { Product } from "../types/Product";
type ProductListProps = {
  productList: Product[];
};
function ProductList({ productList }: ProductListProps) {
  return (
    <section className="product-list-container" aria-label="Product results">
      {productList.map((product) => (
        <ProductCard key={product.id} productData={product} />
      ))}
    </section>
  );
}
export default ProductList;
