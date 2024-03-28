import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import logo from '../assets/Appointme-07.png'
import { Link } from 'react-router-dom';
import '../styles/navbar.css'
const Navbar = () => {
    // State to manage the navbar's visibility
    const [nav, setNav] = useState(false);

    // Toggle function to handle the navbar's display
    const handleNav = () => {
        setNav(!nav);
    };

    // Array containing navigation items
    const navItems = [
        { id: 1, text: 'Sign Up', link: '/register' },
        // { id: 2, text: 'Contact Us', link: '/index#contact' },
        // { id: 3, text: 'About Us', link: '#AboutUs' },
        { id: 4, text: 'Sign in', link: '/login' },
    ];

    return (
        <div className='navMod bg-pink-500 flex justify-between items-center h-24  mx-auto px-4 text-white'>
            <img src={logo} class="" height="180px" width="180px" alt="FlowBite Logo" />

            {/* Desktop Navigation */}
            <ul className='hidden md:flex'>
                {navItems.map(item => (
                    <li color='black'
                        key={item.id}
                        className='p-4 hover:bg-[#faa4d3] rounded-xl m-2 cursor-pointer duration-300 hover:text-black'
                    >
                        <Link to={item.link} style={{ color: 'white', textDecoration: 'none', fontSize: '20px' }}>
                            {item.text}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Mobile Navigation Icon */}
            <div onClick={handleNav} className='block md:hidden'>
                {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>

            {/* Mobile Navigation Menu */}
            <ul
                className={
                    nav
                        ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-pink-500 ease-in-out duration-500'
                        : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
                }
            >
                <img src={logo} class="" height="180px" width="180px" alt="AppointMe Logo" />


                {/* Mobile Navigation Items */}
                {navItems.map(item => (
                    <li
                        key={item.id}
                        className='p-4 border-b rounded-xl hover:bg-[#d43ecd] duration-300 hover:text-black cursor-pointer border-gray-600'
                    >
                        {item.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Navbar;