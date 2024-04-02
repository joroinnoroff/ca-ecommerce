import React, { useState, useEffect, useRef } from 'react';
import Lottie from "lottie-react";
import Loading from '../animations/Loadingskeleton.json';
import style from '../pages/AllProductsStyle/style.module.css';
import { motion, useAnimation } from 'framer-motion';
import RoundedButton from '../Components/common/RoundedButton/RoundedButton';
import { Link } from 'react-router-dom';
import FilterItems from './products/components/Filtering/Filter';
import { Skeleton } from '../Components/ui/skeleton';
import { XIcon } from 'lucide-react';

 
const words = "Everything:";

export default function AllProducts({ }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredTag, setFilteredTag] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const containerRef = useRef(null);
  const controls = useAnimation();
  const [searchQuery, setSearchQuery] = useState(''); 


  useEffect(() => {
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
        setFilteredProducts(data.data);
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
    if (!loading) {
      controls.start("visible");
    }
  }, [loading, controls]);

  useEffect(() => {
    const startProductAnimations = async () => {
      for (let index = 0; index < filteredProducts.length; index++) {
        await controls.start(i => ({
          opacity: 1,
          transition: { delay: i * 0.1 }
        }));
      }
    };
  
    startProductAnimations();
  }, [filteredProducts, controls]);
  

  useEffect(() => {
    if (filteredTag !== null) {
      controls.start("visible");
    }
  }, [filteredTag, controls]);

  const handleTagSelect = (tag) => {
    if (tag === filteredTag) {
      // If the same tag is clicked twice, clear the filter
      setFilteredTag(null);
      setFilteredProducts(products);
      // Restart animation
      controls.start("visible");
    } else {
      // Apply the filter based on the selected tag
      const filtered = tag ? products.filter(product => product.tags.includes(tag)) : products;
      setFilteredTag(tag);
      setFilteredProducts(filtered);
      // Start animation when a new filter is applied
      controls.start("visible");
    }
  };
  const handleSearchQueryChange = (query) => {
    setSearchQuery(query.trim().toLowerCase()); // Trim and convert the query to lowercase
    if (query.trim() === '') {
      controls.set("visible"); // Set animation controls to visible
    }
  };
  useEffect(() => {
    if (searchQuery.trim() === '') {
      controls.start("visible");
    }
  }, [searchQuery, controls]);
  
  
  const searchedAndFilteredPosts = filteredProducts.filter((product) => {
    const matchesFilteredTag = !filteredTag || product.tags.includes(filteredTag);
    if (!matchesFilteredTag) {
      return false;
    }
  
    const title = product.title ? product.title.toLowerCase() : '';
    const body = product.body ? product.body.toLowerCase() : '';
    const combinedText = (title + ' ' + body).toLowerCase(); // Convert combined text to lowercase
    const normalizedSearchQuery = searchQuery.trim().toLowerCase(); // Convert search query to lowercase
  
    if (!normalizedSearchQuery) {
      return true;
    }
  
    return combinedText.includes(normalizedSearchQuery); // Check if search query is present in combined text
  });
  
  
  
  
  
  
  
  

  return (
    <motion.div ref={containerRef} className={style.Container}>
      {loading ? (
        <div className={style.Loader}>
          <div className=' absolute md:top-[37%] top-[45%] md:right-[3%] xl:left-[27%] md:left-[20%]   left-[3%]'>
            <Skeleton className="bg-gray-400 h-10 w-[20rem] xl:w-[26rem]"/>
 
          </div>
        <div className=''>
        <Skeleton className="bg-gray-400 w-52 h-4 absolute lg:top-[48%] top-[68%] sm:left-[27%] left-[3%]"/>
        <Skeleton className="bg-gray-400 w-52 h-4 absolute lg:top-[46%] top-[70%] sm:left-[27%] left-[3%]"/>


        <Skeleton className="bg-gray-400 w-28 h-10 absolute lg:top-[52%] top-[75%] lg:left-[20%]  rounded-full"/>
        <Skeleton className="bg-gray-400 w-28 h-10 absolute lg:top-[52%] top-[75%] left-[33%] rounded-full"/>
        <Skeleton className="bg-gray-400 w-28 h-10 absolute lg:top-[52%] top-[75%] lg:left-[45%] left-[65%] rounded-full"/>
        </div>
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
        <div>
          <h1 className={style.BackgroundAnimation}>
            {filteredTag ? (
              <motion.span
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 0 }
                }}
                initial="hidden"
                animate="visible"
              >
                {filteredTag}:
              </motion.span>
            ) : (
              words.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  variants={{
                    visible: { opacity: 1, y: 0 },
                    hidden: { opacity: 0, y: 80 }
                  }}
                  initial="hidden"
                  animate={filteredTag === null ? "visible" : controls}
                  transition={{ delay: index * 0.1 }}
                >
                  {letter}
                </motion.span>
              ))
            )}
            <span>{filteredProducts.length}</span>
          </h1>

          <div className={style.FilterButtons}>
            <FilterItems onTagSelect={handleTagSelect} activeTag={filteredTag}  onSearchQueryChange={handleSearchQueryChange}/>
            {filteredTag && (
            <div className={style.ClearFilter}>
            <RoundedButton backgroundColor="" onClick={() => {
              handleTagSelect(null);
              controls.start("visible");
            }}>All Products<XIcon/></RoundedButton>
          </div>
            )}
          </div>

          <div className={`${style.Products}`}>
          {searchedAndFilteredPosts.map((product, index) => (
            <motion.div
  key={product.id}
  className={`${style.Product} ${style.GridProduct}`}
  variants={{
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 50 }
  }}
  initial="hidden" // Ensure that the initial state is set correctly
  animate={controls} // Use the animation controls
  transition={{ delay: index * 0.1 }}
>
                 <Link to={`/products/${product.id}`}>
                  <img src={product.image.url} alt={product.title} />
                  <h1>{product.title}</h1>
                  <h3>{product.description}</h3>
                  {product.discountedPrice && product.discountedPrice < product.price ? (
    <>
        <p className={style.Old}>Price: {product.price}</p>
        <h1>New Price: {product.discountedPrice}</h1>
    </>
) : (
    <h1>Price: {product.price}</h1>
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
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
