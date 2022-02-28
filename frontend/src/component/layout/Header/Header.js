import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo.png';
import './Header.css';
import { FaSearch, FaCartArrowDown, FaUser } from 'react-icons/fa';

const Header = () => {
    return (
        <>
            <nav className="main-nav sticky">
                <div className="logo">
                    <Link to="/" className="Nav__brand">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>

                <div className="menu-link">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="#">Contact</Link></li>
                        <li><Link to="#">About</Link></li>
                    </ul>
                </div>

                {/* Its only for icons not social media */}
                <div className="social-media">
                    <ul className="social-media-desktop">
                        <li><Link to="/search"><FaSearch className='search' /></Link></li>
                        <li><Link to="#"><FaCartArrowDown className='cart' /></Link></li>
                        <li><Link to="/login"><FaUser className='user' /></Link></li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Header;
