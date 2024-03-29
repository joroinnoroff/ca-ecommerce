
import React from "react";
import style from './style.module.css';
import RoundedButton from "../../../../Components/common/RoundedButton/RoundedButton";



export default function FilterItems({ onTagSelect, onSearchQueryChange }) {


  const handleTagSelect = (tag) => {
    console.log("Selected tag:", tag); // Log the selected tag
    onTagSelect(tag);

  };




  return (
    <div className={style.Container}>
      <span>Filter Products here</span>


      <div className={style.FilterContainer}>
        <RoundedButton backgroundColor="" onClick={() => handleTagSelect("electronics")}><p>Electronics</p></RoundedButton>
        <RoundedButton backgroundColor="" onClick={() => handleTagSelect("beauty")}><p>Beauty</p></RoundedButton>
        <RoundedButton backgroundColor="" onClick={() => handleTagSelect("fashion")}><p>Fashion</p></RoundedButton>
      </div>
    </div>
  );
}
