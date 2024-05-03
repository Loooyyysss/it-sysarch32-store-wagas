import React from "react";
import { useCart } from "./CartContext"; // Import the useCart hook

function Navbar() {
  const { cartItems } = useCart(); // Destructure cartItems from the context

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><h1 className="store-name"><a href="http://localhost:3000/">Hempire</a></h1></li>
        <li><h3><a href="/strains">Strains</a></h3></li>
        <li><button className="cart-button">{cartItems.length}</button></li> {/* Display cartItems.length as the counter */}
      </ul>
    </nav>
  );
}

export default Navbar;
