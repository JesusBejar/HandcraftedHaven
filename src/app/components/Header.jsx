'use client';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoginComponent from './LoginComponent';

export default function Header() {
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIsMobile(); // Initial check
        window.addEventListener('resize', checkIsMobile); // Update on resize

        return () => {
            window.removeEventListener('resize', checkIsMobile); // Cleanup on unmount
        };
    }, []);

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const responsiveFlex = { display: 'flex', flexDirection: isMobile ? 'column' : 'row' };

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/products', label: 'Products' },
        { path: '/profile', label: 'Profile' }
    ];

    console.log(currentPath);

    return (
        <header style={responsiveFlex}>
            <h1>Handcrafted Heaven</h1>
            {isMobile && <button onClick={toggleMenu} style={{ alignSelf: 'flex-end', backgroundColor: 'white' }}>
                ☰
            </button>}
            <nav style={{ display: isOpen || !isMobile ? 'block' : 'none', margin: '0 auto' }}>
                <ul style={responsiveFlex}>
                    {navLinks.filter(link => link.path !== currentPath).map(link => (
                        <li key={link.path}><a href={link.path}>{link.label}</a></li>
                    ))}
                </ul>
            </nav>
            { currentPath !== '/login' || currentPath !== '/register' && <LoginComponent /> }
        </header>
    );
}
