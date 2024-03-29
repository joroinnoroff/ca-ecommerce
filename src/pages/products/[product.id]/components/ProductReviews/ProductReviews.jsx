// ProductReviews.js
import React from 'react';
import style from './style.module.css'
function ProductReviews({ reviews }) {
  if (reviews.length === 0) {
    return <div className={style.Reviews}>
      <h1>Product Reviews</h1>

      No Reviews yet</div>;
  }

  return (
    <div className={style.Reviews}>
      <h1>Product Reviews</h1>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <h2><span className={style.UserIcon}></span> {review.username}</h2>
            <p>Rating: {review.rating}</p>
            <p>Description: {review.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductReviews;