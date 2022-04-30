import './App.css';
import webFont from 'webfontloader';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Header from './component/layout/Header/Header';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions';
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import Payment from './component/Cart/Payment';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Poppins", "Roboto"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      {/* {stripeApiKey && (<Elements stripe={loadStripe(stripeApiKey)} > */}
      <Routes>
        <Route extact path='/' element={<Home />} />
        <Route extact path='/product/:id' element={<ProductDetails />} />
        <Route extact path='/products' element={<Products />} />
        <Route path='/products/:keyword' element={<Products />} />
        <Route extact path='/search' element={<Search />} />
        <Route extact path='/account' element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        <Route extact path='/me/update' element={isAuthenticated ? <UpdateProfile /> : <Navigate to="/login" />} />
        <Route extact path='/password/update' element={isAuthenticated ? <UpdatePassword /> : <Navigate to="/login" />} />
        <Route extact path='/password/forgot' element={<ForgotPassword />} />
        <Route extact path='/password/reset/:token' element={<ResetPassword />} />
        <Route extact path='/login' element={<LoginSignUp />} />
        <Route extact path='/cart' element={<Cart />} />
        <Route extact path='/login/shipping' element={isAuthenticated ? <Shipping /> : <Navigate to="/login" />} />
        <Route extact path='/order/confirm' element={isAuthenticated ? <ConfirmOrder /> : <Navigate to="/login" />} />
        
        <Route extact path='/process/payment' element={isAuthenticated ? <Payment /> : <Navigate to="/login" />} />
      
      </Routes>
      {/* </Elements>)} */}
      <Footer />
    </Router>
  );
}

export default App;
