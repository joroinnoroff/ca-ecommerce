import { SearchIcon } from "lucide-react";
import React, { useState } from "react";
import style from './style.module.css'
import { Link } from "react-router-dom";
export default function Search({ products, onItemClick }) {
  const [inputValue, setInputValue] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([])

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);

    const filtered = products.filter(product => product.title.toLowerCase().includes(inputValue.toLowerCase()));
    setFilteredProducts(filtered)
  };

  const handleItemClick = (product) => {
    onItemClick(product);

    setInputValue('');
    setFilteredProducts([])
  }
  return (
    <div className={style.SearchCon}>
      <input
        type="text"
        placeholder="Search for Items here"
        value={inputValue}
        onChange={handleInputChange}
        className={style.SearchInput}
      />
      {inputValue && <SearchIcon />}

      {filteredProducts.length > 0 && (
        <div className={style.PreviewContainer}>
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className={style.PreviewItem}

            >
              <Link to={`/products/${product.id}`} onClick={handleItemClick}>
                <img src={product.image.url} alt={product.title} />
                <p>{product.title}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}