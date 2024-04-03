import { MinusIcon, PlusIcon } from 'lucide-react';
import React, { useState } from 'react';
import RoundedButton from '../Components/common/RoundedButton/RoundedButton';
import style from './CheckOutStyle/style.module.css';
import { Link } from 'react-router-dom';
import CheckAni from '../animations/purchase.json'
import Lottie from 'lottie-react'
 
function Complete({cartItems, setCartItems}) {
 
 
  const clearCartItems = () => {
    setCartItems([]);
  }
 
  const totalPrice = cartItems.reduce((total, item) => {
    // If there's a discounted price, use that; otherwise, use regular price
    const price = item.productData.discountedPrice ? item.productData.discountedPrice : item.productData.price;
    return total + price * item.quantity;
  }, 0).toFixed(2); // <-- Add toFixed(2) to round to 2 decimal places
  

  return (
    <div className={style.Container}>
      <Lottie animationData={CheckAni}style={{width: 100}} loop={false}/>
      <h1 className='text-white'>Checkout Complete</h1>
      <p className=''>You will shortly receive an email regarding your order.</p>
      
      <span>Want to keep shopping?</span>
      <div className="w-3/12 text-white mt-10">
      <Link to="/AllProducts" onClick={clearCartItems}>
          <RoundedButton backgroundColor='#fff'>
            <p>Shop now</p>
          </RoundedButton>
        </Link>
      </div>
      <ul>
      
        <h1>Thank you for your purchase of  </h1>
        {cartItems.map((item, index) => (
          <li key={index}>
            <span>{item.productData.title}</span>
            <div>
            <span>
                {item.productData.discountedPrice ? (
      <span> {item.productData.discountedPrice}</span>
    ) : (
      <span>{item.productData.price}</span>
    )}
                </span>
            </div>
            <span>Quantity: {item.quantity}</span>

       
            {item.productData.image && item.productData.image.url && (
              <img src={item.productData.image.url} alt={item.productData.title} draggable="false"/>
            )}
          </li>
        ))}

        <span> Your Total is: {totalPrice}</span>
      </ul>

      

    </div>
  );
}

export default Complete;
