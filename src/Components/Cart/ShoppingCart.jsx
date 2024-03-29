import React, { useState } from 'react';
import { ShoppingCartIcon, XIcon, PlusIcon, MinusIcon } from 'lucide-react';
import { motion, AnimatePresence, spring } from 'framer-motion'; // Import motion components
import style from './style.module.css';
import RoundedButton from '../common/RoundedButton/RoundedButton';
import { Link } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

function ShoppingCart({ cartItems, removeFromCart, addItemToCart }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const handleAddItem = (productId, productData) => {
    addItemToCart(productId, productData);
    toast.success("Added 1 more to cart")
  };

  const handleRemoveItem = (index) => {
    removeFromCart(index);
    toast.success("Removed 1 item from cart")
  };


  const totalPrice = cartItems.reduce((total, item) => {
    // If there's a discounted price, use that; otherwise, use regular price
    const price = item.productData.discountPrice || item.productData.price;
    return total + price * item.quantity;
  }, 0).toFixed(2); // <-- Add toFixed(2) to round to 2 decimal places

  const totalItemsInCart = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  return (
    <>
      <Toaster closeButton position="top-center" />
      <motion.div
        className={style.BackgroundContainer}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={spring}
      >
        <div onClick={toggleCart} className={style.openClose}>
          {isOpen ? (
            <span className={style.Open}>
              <XIcon color='#000' />
            </span>
          ) : (
            <div className={style.Icon}>

              <ShoppingCartIcon />
              <p>{totalItemsInCart}</p>
            </div>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={style.CartContainer}
            initial={{ opacity: 0, y: -20, scale: 0.8 }} // Adjust initial properties for smoother opening
            animate={{ opacity: 1, y: 0, scale: 1 }} // Keep the same animation properties for smooth transition
            exit={{ opacity: 0, y: -20, scale: 0.8 }} // Adjust exit properties for smoother closing
            transition={{ type: "spring", stiffness: 260, damping: 30 }} // Adjust transition type and parameters

          >
            <h2>Shopping Cart</h2>
            <p>Total Items: {totalItemsInCart}</p>
            <ul>
              {cartItems.map((item, index) => (
                <motion.li
                  key={index}
                  className={style.CartItems}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className='flex items-center'>
                    <PlusIcon onClick={() => handleAddItem(item.productId, item.productData)} className="" />
                    <MinusIcon onClick={() => handleRemoveItem(index)} className="" />
                  </div>
                  <span>{item.productData.title}</span>
                  <span>${item.productData.discountedPrice}</span>
                  <span>Quantity: {item.quantity}</span>
                  <Link to={`/products/${item.productId}`} onClick={toggleCart}>
                    {item.productData.image && item.productData.image.url && (
                      <img src={item.productData.image.url} alt={item.productData.title} draggable="false" />
                    )}
                  </Link>
                </motion.li>
              ))}

              <span>Free shipping</span>
              <span className={style.Total}>Cart total: {totalPrice}</span>
              <Link to="/CheckOut" onClick={toggleCart}>
                <RoundedButton backgroundColor='#fff'>
                  <p>Go to checkout</p>
                </RoundedButton>
              </Link>
            </ul>
            <div className={style.Links}>

              <small>
                Customer Service
              </small>
              <small>
                Warrentys
              </small>

              <small>
                Contact
              </small>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ShoppingCart;
