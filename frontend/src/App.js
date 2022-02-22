import './App.css';
import webFont from 'webfontloader';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Header from './component/layout/Header/Header';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home.js';
import ProductDetails from './component/Product/ProductDetails.js';
import Products from './component/Product/Products.js';
import Search from './component/Product/Search.js';

function App() {

  React.useEffect(() => {
    webFont.load({
      google: {
        families: ["Poppins", "Roboto"],
      },
    });
  }, []);

  return (
    <Router>
      <Header />

      <Routes>
        <Route extact path='/' element={<Home />} />
        <Route extact path='/product/:id' element={<ProductDetails />} />
        <Route extact path='/products' element={<Products />} />
        <Route path='/products/:keyword' element={<Products />} />
        <Route extact path='/search' element={<Search />} />
      </Routes>
      
      <Footer />
    </Router>
  );
}

export default App;
