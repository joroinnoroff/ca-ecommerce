import {  Info, Mail, MapIcon, MinusIcon, PlusIcon } from 'lucide-react';
import React from 'react';
import RoundedButton from '../Components/common/RoundedButton/RoundedButton';
import style from './CheckOutStyle/style.module.css';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion'
function CheckOut({ cartItems, removeFromCart, addItemToCart }) {
 


 

  const totalPrice = cartItems.reduce((total, item) => {
    // If there's a discounted price, use that; otherwise, use regular price
    const price = item.productData.discountPrice || item.productData.price;
    return total + price * item.quantity;
  }, 0).toFixed(2); // <-- Add toFixed(2) to round to 2 decimal places
  

  const totalItemsInCart = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);




  const handleAddItem = (productId, productData) => {
    addItemToCart(productId, productData); // Call the addItemToCart function passed as props
  };
  // Function to remove an item from the cart
  const handleRemoveItem = (index) => {
    removeFromCart(index); // Call the removeFromCart function passed as props
  };


  return (
    <div className={style.Container}>
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        Checkout
      </motion.h1>
      {totalItemsInCart > 0 ? (
        <>
             <motion.ul
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
            <span>Total Items in Cart: {totalItemsInCart}</span>
            {cartItems.map((item, index) => (
              <li key={index}>
                <span>{item.productData.title}</span>
                <div>
                  <div>
                    ${item.productData.discountPrice
                      ? item.productData.discountPrice
                      : item.productData.price}
                  </div>
                </div>
                <span>Quantity: {item.quantity}</span>

                <div className={style.Counter}>
                      {/* Call handleAddItem and handleRemoveItem with index */}
                      <PlusIcon onClick={() => handleAddItem(item.productId, item.productData)} />
                      <MinusIcon onClick={() => handleRemoveItem(index)} />
                    </div>
                {item.productData.image && item.productData.image.url && (
                  <img src={item.productData.image.url} alt={item.productData.title} draggable="false"/>
                )}
              </li>
            ))}
          </motion.ul>

          {/* Display the total price */}
          <motion.div
        className={style.CheckForm}
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
            <small>Your Total is</small>
            <p>Price: ${totalPrice}</p>
            <small>Shipping: Free</small>
            <h1>Total Price: ${totalPrice}</h1>
            <span>Checkout to choose payment method</span>

            <div className={style.Payment}>
              <img src="/assets/vipps.avif" alt="Vipps" />
              <img src="/assets/mastercard.png" alt="Mastercard" />
              <img src="/assets/visa.webp" alt="Visa" />
            </div>
            <Link to="/Complete">
              <div className={style.Button}>
                <RoundedButton backgroundColor='#fff'>
                  <p>
                    Continue to checkout
                  </p>
                </RoundedButton>
              </div>
            </Link>
          </motion.div>
        </>
      ) : (
        <div className={style.CheckForm}>
          <span>You have no items in your shopping cart.</span>
          <Link to="/AllProducts">
            <div className={style.Button}>
              <RoundedButton backgroundColor='#fff'>
                <p>
                  Shop now
                </p>
              </RoundedButton>
            </div>
          </Link>

 
        </div>
      )}
      
      <div className={style.Locate}>
            <div className={style.LocateCon}>
              <MapIcon />
                <span className='font-bold '>FIND AN ECOMMERCE STORE</span>
                <p className='font-extralight text-sm mb-3'>Locate a brand store, partner store or retail partner in your area.</p>

                <h1>FIND A STORE</h1>
            </div>
            <div className={style.LocateCon}>
              <Mail/>
              <span className='font-bold '> BE THE FIRST TO KNOW</span>
              <p className='font-extralight text-sm mb-3'>
              Subscribe to receive new product releases, exclusive discount codes, invites to events and a chance to win.
              </p>
              <h1>SIGN UP FOR EMAILS</h1>
            </div>
            <div className={style.LocateCon}>
              <Info/>
              <span className='font-bold text-md'>CUSTOMER SUPPORT CENTER</span>
              <p className='font-extralight text-sm mb-3'>
              Need more information? Have a repair concern? No problem. We're here to help.
              </p>
              <h1>FIND ANSWERS</h1>
            </div>
          
          </div>
    </div>
  );
}

export default CheckOut;
