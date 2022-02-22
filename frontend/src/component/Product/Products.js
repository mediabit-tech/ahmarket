import React, { Fragment, useEffect, useState } from 'react';
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, clearErrors } from "../../actions/productAction";
import Loader from "../layout/loader/loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from 'react-js-pagination';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { useAlert } from "react-alert";

const Products = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  // Initialize the price
  const [price, setPrice] = useState([0, 10000]);

  const { keyword } = useParams();
  const { products, loading, error, productsCount, resultPerPage } = useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  }

  const priceHandler = (e, newPrice) => {
      e.preventDefault();
      setPrice(newPrice);
      console.log(newPrice);
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage));
  }, [dispatch, keyword, currentPage, alert, error]);

  // let count = filteredProductsCount;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productsHeading"><b>Products</b></h2>

          <div className="products">
            {products && products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Price Filter */}
          <div className="filetrBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={10000}
            />
          </div>

          {resultPerPage < productsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}

        </Fragment>
      )}
    </Fragment>
  )
}

export default Products