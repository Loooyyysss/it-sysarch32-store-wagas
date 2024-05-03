import React from "react";
import ProductCard from "./Product";
import { Link } from "react-router-dom";

function ProductList({ productList }) {
  return (
    <>
      {productList.map((product) => (
        // Wrap each product card with a Link component that navigates to the product details page
        <Link key={product.id} to={`/product/${product.id}`} className="product-link">
          <ProductCard product={product} />
        </Link>
      ))}
    </>
  );
}

export default ProductList;
