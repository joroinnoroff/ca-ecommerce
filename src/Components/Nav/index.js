// Nav.js
import React, { useEffect, useState } from 'react';
import Styles from './style.module.css';
import { motion, useAnimation } from 'framer-motion';
import ShoppingCart from '../Cart/ShoppingCart';
import { Link } from 'react-router-dom';
import Search from '../SearchProducts/Search';
const words = "NOROFF - ECOMMERCE";

export default function Nav({ addItemToCart, cartItems, removeFromCart }) { 
  const [isLoading, setIsLoading] = useState(true);
  const controls = useAnimation();
  const [products, setProducts] = useState([]); // State to hold products

  // Define handleItemClick function
  const handleItemClick = (product) => {
    // Navigate to product page
    // You can use Link component to navigate to the product page
    // The product id is used in the URL to uniquely identify the product
  };

  useEffect(() => {
    const startAnimation = () => {
      setTimeout(() => {
        setIsLoading(false);
        controls.start(i => ({
          opacity: 1,
          transition: { delay: i * 0.1 }
        }));
      }, 2000); // Delay of 2 seconds
    };

    if (isLoading) {
      startAnimation();
    }
  }, [isLoading, controls]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://v2.api.noroff.dev/online-shop");
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
      
        setProducts(data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, []);

  return (
    <div className={Styles.Nav}>
      <Link to="/"  className={Styles.Logo}>
        {words.split('').map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={controls}
            custom={index}
           
          >
            {letter}
          </motion.span>
        ))}
      </Link>

      <Link to={"/ContactUs"} className="border rounded p-2 w-32 text-center ">
        Contact us 
      </Link>

      {/* Pass products and onItemClick down to Search */}
      <Search products={products} onItemClick={handleItemClick} />

      <div className={Styles.Cart}>
        <ShoppingCart
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          addItemToCart={addItemToCart}
        />
      </div>
    </div>
  );
}
