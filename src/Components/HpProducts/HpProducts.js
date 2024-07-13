import React, { useState, useEffect, useRef } from 'react';
import Lottie from "lottie-react";
import Loading from '../../animations/Loadingskeleton.json';
import style from './style.module.css';
import RoundedButton from '../common/RoundedButton/RoundedButton';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';

const words = "Todays offers";

export default function HpProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const controls = useAnimation(); // Animation control for both background and text
  
  useEffect(() => {
    setLoading(true); // Set loading to true when starting to fetch products
  
    const fetchProducts = async () => {

      const url = process.env.REACT_APP_API_URL
      const endpoint = '/online-shop';
      try {
        const response = await fetch(url + endpoint);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
         
        setProducts(data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };
  
    fetchProducts();
  }, []);

  useEffect(() => {
    const startAnimation = async () => {
      setLoading(true);
      controls.start(i => ({
        opacity: 1,
        transition: { delay: i * 0.1 }
      }));
    };

    if (loading) {
      startAnimation();
    }
  }, [loading, controls]);

  useEffect(() => {
    if (!loading) {
      controls.start("visible"); // Start animation for both background and text
    }
  }, [loading, controls]);
  

  return (
    <motion.div ref={containerRef} className={style.Container}>
      <div className={style.BackgroundAnimation}>
        {/* Animate each letter of the word "Today's offers" individually */}
        {words.split('').map((letter, index) => (
          <motion.span
          key={index}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 80 }
          }}
          initial="hidden"
          animate={controls}
          transition={{ delay: index * 0.1 }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {loading ? (
        <div className={style.Loader}>
          {[1, 2, 3].map((_, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.5, delay: index * 0.1 + 1 }}
            >
              <Lottie animationData={Loading} width={20} height={20} style={{height: "500px", width: "auto", overflow: "auto"}}/>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className={style.Products}>
          {products.slice(0, 6).map((product, index) => (
            <Link to={`/products/${product.id}`} key={product.id}>
            <motion.div 
              key={product.id} 
              className={style.Product}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 50 }
              }}
              initial="hidden"
              animate={controls}
              transition={{ delay: index * 0.1 }}
            >
                  <img src={product.image.url} alt={product.title} />
                  <h3>{product.description}</h3>
                  {product.discountedPrice && product.discountedPrice < product.price ? (
    <>
        <p className={style.Old}>Price: {product.price}</p>
        <h1>New Price: ${product.discountedPrice}</h1>
    </>
) : (
    <h1>Price: ${product.price}</h1>
)}
                  <div className={style.Button}>
                    <div>
                      <RoundedButton 
                        backgroundColor='#fff' 
                      >
                        <p>View Item</p>
                      </RoundedButton>
                    </div>
                  </div>
            </motion.div>
                </Link>
          ))}
        </div>
      )}
    </motion.div>
  );
}
