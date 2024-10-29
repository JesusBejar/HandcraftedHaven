'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import LogOutButton from '../ui/logout-button';
import image from '../../../public/logo_handcraftedhaven.png';
import Cookies from 'js-cookie';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const currentPath = usePathname();
    // Function to check for cookie changes
    const checkCookie = () => {
        const currentCookie = Cookies.get('token');
        setIsLoggedIn(!!currentCookie);
    };
    console.log(isLoggedIn)
    useEffect(() => {
        checkCookie(); // Initial check

        const intervalId = setInterval(checkCookie, 100); // Check every 100ms

        return () => {
            clearInterval(intervalId); // Cleanup on unmount
        };
    }, []);
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIsMobile(); // Initial check
        window.addEventListener('resize', checkIsMobile);

        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/cards', label: 'Products' },
        { path: isLoggedIn ? '/profile' : '/login', label: 'Profile' }
    ];

    return (
        <header style={{ display: 'flex', flexDirection: 'row', marginBottom:'20px' }}>
            <Image src={image} alt="logo" style={{ width: '50px', height: '50px', margin: '10px' }} />

            <nav style={{ display: isMobile ? 'none' : 'block'}}>
                <ul style={{ display: 'flex', flexDirection: 'row' }}>
                    {navLinks.filter(link => link.path !== currentPath).map(link => (
                        <li key={link.path}><a href={link.path}>{link.label}</a></li>
                    ))}
                </ul>
            </nav>

            {!isMobile && currentPath !== '/login' && currentPath !== '/register' && (
                <div className='login-button' style={{ minWidth: '165px' , position: 'absolute', right:'10px'}}>
                    {isLoggedIn ? <LogOutButton /> : <a href='/login'>Login</a>}
                </div>
            )}

            {isMobile && (
                <>
                    <button className='menu-button' onClick={toggleMenu} style={{ backgroundColor: 'transparent', fontSize: '2em' , position:'absolute', right:'10px'}}>
                        ☰
                    </button>
                    {isOpen && (
                        <div className='dropdown-menu' style={{ position: 'absolute', top: '60px', right: '10%', backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px', zIndex: 1000,  width: '200px',height: '150px' }}>
                            <ul style={{ listStyle: 'none', padding: '5px', margin: '0' }}>
                                {navLinks.filter(link => link.path !== currentPath).map(link => (
                                    <li key={link.path} style={{ margin: '10px 0' }}><a href={link.path}>{link.label}</a></li>
                                ))}
                            </ul>
                            {currentPath === '/login' || currentPath === '/register' ? '' : <div className='login-button' style={{ minWidth: '70px' }}> {isLoggedIn ? <LogOutButton /> : <a href='/login'>Login</a>}</div>}
                        </div>
                    )}
                </>
            )}
        </header>
    );
}
