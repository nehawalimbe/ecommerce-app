import { useParams } from "react-router-dom";
import type { Product } from "../types/Product";
import { useEffect, useState } from "react";

function ProductDetails() {
  const [productData, setProductData] = useState<Product>();
  const { id } = useParams();
  const productId = Number(id);
  useEffect(() => {
    getProductData();
  }, [productId]);

  const getProductData = async () => {
    if (Number.isNaN(productId)) {
      return;
    }
    let productDataRes = await fetch(
      `https://fakestoreapi.com/products/${productId}`,
    );
    if (!productDataRes.ok) {
      throw Error("Error while fetching product data");
    }
    let productData = await productDataRes.json();
    setProductData(productData);
  };

  if (Number.isNaN(productId)) {
    return <div>Invalid Product Id</div>;
  }
  
  if (!productData) {
    return <div>Product Not Found</div>;
  }
  return (
    <div className="product-container">
      <h1 className="product-title">{productData.title}</h1>
      <h2>{productData.price}</h2>
      <p>{productData.description}</p>
      <img src={productData.image} alt={productData.title}></img>
    </div>
  );
}
export default ProductDetails;
