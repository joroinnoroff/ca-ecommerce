import React, { useState, useEffect } from 'react';
import style from './styles/style.module.css';
import { useParams } from 'react-router-dom';
import RoundedButton from '../../../Components/common/RoundedButton/RoundedButton';
import ProductReviews from './components/ProductReviews/ProductReviews'; // Import ProductReviews component
import Lottie from 'lottie-react'
import Loading from '../../../animations/Loadingskeleton.json'
import { toast, Toaster } from 'sonner';
import { ArrowLeft } from 'lucide-react';
function ProductDetails({ addItemToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const url = `https://v2.api.noroff.dev/online-shop/${id}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product && product.data) {
      addItemToCart(id, product.data); // Add the product to the cart
      toast.success('Item Added to Cart'); // Display success toast
    } else {
      toast.error('Error adding item to cart'); // Display error toast
    }
  };

  if (isLoading) {
    return <div>              <Lottie animationData={Loading} width={20} height={20} style={{height: "600px", width: "auto", overflow: "auto"}}/></div>;
  }

  if (!product || !product.data) {
    return <div>Product not found</div>;
  }

  const { title, description, price, discountedPrice, image, reviews, tags } = product.data;

  return (
    <div>
        <Toaster closeButton position="top-center" />


        <ArrowLeft/>
      <div className={style.ProductContainer} key={id}>
        {image && image.url && <img src={image.url} alt={title} />}
        <div className={style.col2}>
          <h1>{title}</h1>
          <p className={style.Description}>{description}</p>
          <small>Category: {tags}</small>
          {discountedPrice ? (
        <>
          <p className={style.Old}>Price: {price}</p>
          <h1>New Price: {discountedPrice}</h1>
        </>
      ) : (
        <h1>Price: {price}</h1>
      )}
          <div>
            <RoundedButton backgroundColor="#fff" onClick={handleAddToCart} type="submit">
              <p>Add to cart</p>
            </RoundedButton>
          </div>
        </div>
      </div>
      <hr />
      {/* Render ProductReviews component and pass reviews array as prop */}
      <ProductReviews reviews={reviews} />
    </div>
  );
}
export default ProductDetails;
