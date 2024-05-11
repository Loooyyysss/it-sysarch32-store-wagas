// CartPage.js
import React from "react";
import { useCart } from "./CartContext"; // Import the useCart hook

function CartPage() {
  const { cartItems, removeFromCart } = useCart(); // Destructure cartItems and removeFromCart from the context

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  // Function to handle removing an item from cart
  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
  };

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price}
                <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
              </li>
            ))}
          </ul>
          <p>Total Price: ${totalPrice}</p>
          <button>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
