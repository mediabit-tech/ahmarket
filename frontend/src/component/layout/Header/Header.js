import React from 'react';
import logo from '../../../images/logo.png';
import './Header.css';
import { FaSearch, FaCartArrowDown, FaUser } from 'react-icons/fa';

const Header = () => {
    return (
        <>
            <nav className="main-nav sticky">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>

                <div className="menu-link">
                    <ul>
                        <li>
                            <a href="#">Home</a>
                        </li>
                        <li>
                            <a href="#">Product</a>
                        </li>
                        <li>
                            <a href="#">Contact</a>
                        </li>
                        <li>
                            <a href="#">About</a>
                        </li>
                    </ul>
                </div>

                {/* Its only for icons not social media */}
                <div className="social-media">
                    <ul className="social-media-desktop">
                        <li>
                            <a href="#"><FaSearch className='search'/></a>
                        </li>
                        <li>
                            <a href="#"><FaCartArrowDown className='cart'/></a>
                        </li>
                        <li>
                            <a href="#"><FaUser className='user'/></a>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* <section className="hero-section">
                <Home />
            </section> */}

        </>
    );
};

export default Header;
