import React, { Fragment, useState } from 'react';

const Search = () => {

    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()) {

        }
    }

  return (
    <Fragment>
        <form className="searchBox" onSubmit={searchSubmitHandler}>
            <input type="text" placeholder="Search a product..." onChange={(e) => setKeyword(e.target.value)} />
            <input type="submit" value="Search" />
        </form>
    </Fragment>
  )
}

export default Search