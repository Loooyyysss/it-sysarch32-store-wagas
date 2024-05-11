import { useEffect, useState } from "react";
import './App.css';
import { db } from './config/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import Navbar from "./Navbar";
import ProductCard from "./Product";
import CartPage from "./Cart";
import ProductDetails from "./ProductDetails"; // Import the ProductDetails component
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route


// ProductList component
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

function App() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const getProductList = async () => {
      try {
        const productCollectionRef = collection(db, "products");
        const data = await getDocs(productCollectionRef);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setProductList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getProductList();
  }, []);

  return (
    
      <div className='App'>
        <Navbar />
        <div>
          <img src="https://i.pinimg.com/736x/7f/6c/8d/7f6c8d2f939bf6c2d2657cc31616a5f3.jpg" className="shop" alt="Hempire" />
        </div>
        <h1 className="featured-products">Featured Products</h1>
        <Router>
        <div className="card-container">
          <Routes>
            {/* Route for the product details page */}
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            {/* Route for the product list */}
            <Route path="/" element={<ProductList productList={productList} />} />
          </Routes>
        </div>
        </Router>
      </div>
    
  );
}



export default App;
