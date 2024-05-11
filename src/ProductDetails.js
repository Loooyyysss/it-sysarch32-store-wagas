import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { db } from './config/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { useCart } from './CartContext';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PF9CGJrecP0hJeCDUGso95HtTCc5Oo1cEDKk0g7Vr5Z3gi5LvxShZ7Lqq2ZdQ7pUJVl08LgVCtKF5rMRpypO2K700akA1oiXw'); // Replace with your publishable key

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
    addToCart(product);
    console.log("Product added to cart:", product);
  };

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    // Make a request to your backend to create a checkout session
    const response = await fetch('http://localhost:4000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, quantity: 1 }), // Send product ID and quantity to the backend
    });

    if (response.ok) {
      // If the request is successful, retrieve the session ID from the response
      const session = await response.json();

      // Redirect the user to the Stripe Checkout page using the session ID
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error("Error redirecting to Stripe Checkout:", result.error.message);
      }
    } else {
      console.error("Error creating checkout session");
    }
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
      <button onClick={handleCheckout} className="button">Checkout</button> {/* Added checkout button */}
    </div>
  );
}

export default ProductDetails;
