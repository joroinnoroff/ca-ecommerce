import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './Components/Hero';
import HpProducts from './Components/HpProducts/HpProducts';
import AllProducts from './pages/AllProducts';
import NotFound from './pages/NotFound';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import Preloader from '../src/Components/Preloader/index';
import Nav from './Components/Nav';
import ProductDetails from './pages/products/[product.id]';
 
import CheckOut from './pages/CheckOut'; // Import the ViewCart component
import Contact from './pages/ContactUs';
import Complete from './pages/CheckComplete';

function HomePage() {
  return (
    <>
      <Hero />
      <HpProducts />
      
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    (
      async () => {
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.cursor = 'default';
          window.scrollTo(0, 0);
        }, 1000);
      }
    )();
  }, []);

  const addItemToCart = (productId, productData) => {
    const existingProductIndex = cartItems.findIndex((item) => item.productId === productId);
  
    if (existingProductIndex !== -1) {
     
      const updatedCartItems = cartItems.map((item, index) => {
        if (index === existingProductIndex) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCartItems(updatedCartItems);
    } else {
 
      setCartItems([...cartItems, { productId, quantity: 1, productData }]);
    }
  };
  
 
 

  const removeFromCartFunction = (index) => {
    const newCartItems = [...cartItems];
    const currentItem = newCartItems[index];
  
    if (currentItem.quantity === 1) {
 
      newCartItems.splice(index, 1);
    } else {
    
      newCartItems[index].quantity -= 1;
    }
  
    setCartItems(newCartItems);
  };


  return (
    <Router>
      <div className="App">
        <AnimatePresence mode='wait'>
          {isLoading && <Preloader />}
        </AnimatePresence>
        <Nav
        addItemToCart={addItemToCart}
  removeFromCart={removeFromCartFunction} // Pass removeFromCartFunction as a prop
  cartItems={cartItems} // Pass cartItems as a prop
/>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/AllProducts" element={<AllProducts addItemToCart={(productId, productData) => addItemToCart(productId, productData)} cartItems={cartItems}/>} />
          <Route path="/products/:id" element={<ProductDetails addItemToCart={(productId, productData) => addItemToCart(productId, productData)} cartItems={cartItems}/>} />

          <Route path="/CheckOut" element={<CheckOut         addItemToCart={addItemToCart}
            removeFromCart={removeFromCartFunction}  
            cartItems={cartItems} />} />  

          <Route
            path="/Complete"
            element={<Complete cartItems={cartItems} setCartItems={setCartItems} />}
          />

          <Route path="*" element={<NotFound />} />


          <Route path='/ContactUs' element={<div>

            <Contact/>
            <AnimatePresence mode='wait'>
          {isLoading && <Preloader />}
        </AnimatePresence>
          </div>}/>
        </Routes>
    
      </div>
    </Router>
  );
}

export default App;
