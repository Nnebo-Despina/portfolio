import React, { useEffect } from 'react'
import { useState } from 'react';
import '../styles/NavBar.css'
import { Link } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';

const NavBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menu, setMenu] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
        setIsScrolled(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
    <>
        <nav className="nav-section">
            <div className={isScrolled ? "nav-two-cont" : "nav-one-cont"}>

                {/* Logo */}
                <div className='nav-logo'>
                    <div className='nav-logo-div'>
                        <div className="logo-img"></div>
                    </div>
                    <p>Despina</p>
                </div>

                {/* ================= DESKTOP NOT SCROLLED ================= */}
                {!isMobile && !isScrolled && (
                    <div className='nav-menu'>
                        <p 
                            className='nav-menu-button'
                            onClick={() => setMenu(!menu)}
                        >
                            <BiMenu size='18'/> Menu
                        </p>

                        {menu && (
                            <div className="nav-menu-option">
                                <p><Link to='/'>Home</Link></p>
                                <p><Link to='/services'>Services</Link></p>
                                <p><Link to='/about-me'>About Me</Link></p>
                                <p><Link to='/projects'>Projects</Link></p>
                                <p><Link to='/contact'>Contact Me</Link></p>
                            </div>
                        )}
                    </div>
                )}

                {/* ================= DESKTOP SCROLLED ================= */}
                {!isMobile && isScrolled && (
                    <>
                        <div className='nav-links'>
                            <ul>
                                <li><Link to='/'>Home</Link></li>
                                <li><Link to='/services'>Services</Link></li>
                                <li><Link to='/about-me'>About Me</Link></li>
                                <li><Link to='/projects'>Projects</Link></li>
                            </ul>
                        </div>

                        <div className="nav-button">
                            <Link to='/contact'>
                                <button>Contact Me</button>
                            </Link>
                        </div>
                    </>
                )}

                {/* ================= MOBILE (ALWAYS MENU) ================= */}
                {isMobile && (
                    <div className='nav-menu'>
                        <p 
                            className='nav-menu-button'
                            onClick={() => setMenu(!menu)}
                        >
                            <BiMenu size='18'/> Menu
                        </p>

                        {menu && (
                            <div className="nav-menu-option">
                                <p><Link to='/'>Home</Link></p>
                                <p><Link to='/services'>Services</Link></p>
                                <p><Link to='/about-me'>About Me</Link></p>
                                <p><Link to='/projects'>Projects</Link></p>
                                <p><Link to='/contact'>Contact Me</Link></p>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </nav>
    </>
  )
}

export default NavBar


