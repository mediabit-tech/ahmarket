import React, { Fragment, useState } from 'react';
import './Search.css';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';

const Search = () => {

  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  }

  return (
    <Fragment>

      <MetaData title="Search a product - AH Market" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input type="text" placeholder="Search a product..." onChange={(e) => setKeyword(e.target.value)} />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  )
}

export default Search