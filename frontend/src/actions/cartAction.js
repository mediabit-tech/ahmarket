import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
} from "../constants/cartConstant";
import axios from "axios";

// add items to cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity,
        }
    });

    // store items into local storage
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// remove items from cart
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id,
    });
    // store items into local storage
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};