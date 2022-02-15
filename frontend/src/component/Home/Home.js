import { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loader/loader";
import { useAlert } from "react-alert";
import ProductCard from "./ProductCard.js";

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products, productCount } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        if (error) {
            return alert.error(error);
        }
        dispatch(getProduct());
    }, [dispatch, error, alert]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title="AH Market - Your local shop" />

                    <div className="banner">
                        <p>Welcome to AH Market</p>
                        <h1>Find amazing products below</h1>

                        <a href="#container">
                            <button>
                                Scroll <CgMouse />
                            </button>
                        </a>
                    </div>

                    <h2 className="homeHeading">Featured Products</h2>

                    <div className="container" id="container">
                        {/* map funtions */}
                        {products &&
                            products.map((product) => <ProductCard key={product._id} product={product} />)}
                    </div>
                </>
            )}
        </Fragment>
    );
};

export default Home;
