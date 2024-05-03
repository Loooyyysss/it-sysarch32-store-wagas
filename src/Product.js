// Product.js
import React from "react";
import { Link } from 'react-router-dom'; // Import Link component

function ProductCard({ product }) {
  // Check if the product object is undefined
  if (!product) {
    return null; // Return null if product is undefined
  }

  return (
    <div key={product.id} className="product-container">
      <Link to={`/product/${product.id}`} className="product-link"> {/* Wrap the product card in a Link component */}
        <img src={product.imageUrl} alt={product.name} className="product-image" />
        <div className="card-body">
          <h1 className="product-name">{product.name}</h1>
          <h2 className="product-availability" style={{ color: product.Availability ? "green" : "red" }}>{product.Availability ? "Available" : "Not Available"}</h2>
          <p className="product-description">Description: {product.description}</p>
          <p className="product-price">Price: {product.price}</p>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
