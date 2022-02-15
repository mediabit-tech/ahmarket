import React, { Fragment, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import getProductDetails from '../../actions/productAction';

// React Hooks component name always start from UPPERCASE like ProductDetails
const ProductDetails = ({match}) => {
    const { productId } = match.params;

    const dispatch = useDispatch();

    const {product, loading, error} = useSelector((state) => 
    state.productDetails.find(product => product._id === productId));

    useEffect(() => {
        dispatch(getProductDetails(productId))
    }, [dispatch, productId]);

    return (
        <Fragment>
            <div className="ProductDetails">
                <div>
                    <Carousel>
                        {product.images &&
                        product.images.map((item, i) => (
                            <img key={item.url} src={item.url} alt={`${i} Slide`} className="CarouselImage" />
                        ))}
                    </Carousel>
                </div>
            </div>
        </Fragment>
    );
}

export default ProductDetails