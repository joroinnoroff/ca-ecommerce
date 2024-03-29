import React from 'react';
import { Link } from 'react-router-dom';
import RoundedButton from '../common/RoundedButton/RoundedButton';
import style from './style.module.css';
import { motion } from 'framer-motion';

export default function Hero() {
  const gifUrl = "https://gifdb.com/images/high/cold-foggy-mountain-rbvi7wvg05uz8m2f.webp";

  return (
    <div className={style.Hero}>
      <motion.div
        className={style.Button}
        initial={{ opacity: 0, y: -20 }} // Set initial opacity to 0 and move up slightly
        animate={{ opacity: 1, y: 0 }} // Animate opacity to 1 and move back to original position
        transition={{ duration: 1.5, delay: 2.5, type: 'spring', damping: 10 }} // Set transition properties
      >
        <Link to="/AllProducts">
          <RoundedButton backgroundColor={"#fff"} >
            <p id='W'>View all</p>
          </RoundedButton>
        </Link>
      </motion.div>
    </div>
  );
}
