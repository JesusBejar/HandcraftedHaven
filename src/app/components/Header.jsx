'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import LogOutButton from '../ui/logout-button';
import image from '../../../public/logo_handcraftedhaven.png';
import Cookies from 'js-cookie';


export default function Header() {
    const isLoggedIn = Cookies.get('token')
    const [isMobile, setIsMobile] = useState(false);
    const currentPath = usePathname();

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

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/cards', label: 'Products' },
        { path: isLoggedIn?'/profile':'login', label: 'Profile' }
    ];

    console.log(currentPath);

    return (
        <header style={{ display: 'flex', flexDirection: 'row' }}>
            <Image src={image} alt="logo" style={{ width: '50px', height: '50px', margin:'10px'}} />
            
            <nav style={{ display: isMobile ? 'none' : 'block', margin: '0 auto' }}>
                <ul style={{ display: 'flex', flexDirection: 'row' }}>
                    {navLinks.filter(link => link.path !== currentPath).map(link => (
                        <li key={link.path}><a href={link.path}>{link.label}</a></li>
                    ))}
                </ul>
            </nav>

            {!isMobile && (currentPath === '/login' || currentPath === '/register' ? '' : <div className='login-button' style={{ minWidth: '165px' }}><LogOutButton isLoggedIn /></div>)}

            {isMobile && (
                <>
                    <button className='menu-button' onClick={toggleMenu} style={{ backgroundColor: 'transparent', fontSize: '2em' }}>
                        ☰
                    </button>
                    {isOpen && (
                        <div className='dropdown-menu' style={{ position: 'absolute', top: '60px', right: '20px', backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px', zIndex: 1000 }}>
                            <ul style={{ listStyle: 'none', padding: '20px', margin: '0' }}>
                                {navLinks.filter(link => link.path !== currentPath).map(link => (
                                    <li key={link.path} style={{ margin: '10px 0' }}><a href={link.path}>{link.label}</a></li>
                                ))}
                            </ul>
                            {currentPath === '/login' || currentPath === '/register' ? '' : <div className='login-button' style={{ minWidth: '70px', margin: '5px 0' }}><LogOutButton isLoggedIn /></div>}
                        </div>
                    )}
                </>
            )}
        </header>
    )
}
