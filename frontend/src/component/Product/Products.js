import React, { Fragment, useEffect } from 'react';
import "./Products.css";
import {useDispatch, useSelector} from "react-redux";
import { getProduct, clearErrors } from "../../actions/productAction";
import Loader from "../layout/loader/loader";
import ProductCard from "../Home/ProductCard";

const Products = () => {

    const dispatch = useDispatch();
    const {products, loading, error, productsCount} = useSelector((state) => state.products);

    useEffect(() => {
      dispatch(getProduct());
    }, [dispatch])
    

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

          </Fragment>
      )}
    </Fragment>
  )
}

export default Products