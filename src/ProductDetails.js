import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { db } from './config/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { useCart } from './CartContext';


function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productRef = doc(db, "products", productId);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          setProduct({ id: productSnap.id, ...productSnap.data() });
        } else {
          console.log("No such product!");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = () => {
    // Handle adding the product to the cart
    addToCart(product);
    console.log("Product added to cart:", product);
  };

  if (!product) {
    return <Navigate to="/" />;
  }

  return (
    <div className="product-details">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
        <div className="card-body">
          <h1 className="product-name">{product.name}</h1>
          <h2 className="product-availability" style={{ color: product.Availability ? "green" : "red" }}>{product.Availability ? "Available" : "Not Available"}</h2>
          <p className="product-description">Description: {product.description}</p>
          <p className="product-price">Price: {product.price}</p>
        </div>
      <p>Potency: {product.potency}</p>
      <button onClick={handleAddToCart} className="button">Add to Cart</button>
    </div>
  );
}

export default ProductDetails;
