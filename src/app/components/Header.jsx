'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import LogOutButton from '../ui/logout-button';
import image from '../../../public/logo_handcraftedhaven.png';


export default function Header() {
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
        { path: '/profile', label: 'Profile' }
    ];

    console.log(currentPath);

    return (
        <header style={ {display: 'flex', flexDirection: 'row'} }>
            <Image src={image} alt="logo" style={{ width: '50px', height: '50px', margin: '10px' }} />
            
            <nav style={{ display: isOpen || !isMobile ? 'block' : 'none', margin: '0 auto' }}>
                <ul style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
                    {navLinks.filter(link => link.path !== currentPath).map(link => (
                        <li key={link.path}><a href={link.path}>{link.label}</a></li>
                    ))}
                </ul>
                {isMobile &&  currentPath === '/login' || currentPath === '/register' ?'' :<div class='login-button' style={{minWidth: isMobile? '70px': '165'}}><LogOutButton /></div> }
            </nav>

            { currentPath === '/login' || currentPath === '/register' ?'' : !isMobile?<div class='login-button' style={{minWidth: isMobile? '70px': '165'}}><LogOutButton /></div> : ''}
            {isMobile && <button class='menu-button' onClick={toggleMenu} style={{ alignSelf: 'flex-end', backgroundColor: 'transparent', fontSize:'2em', position:'absolute', right: '20px'}}>
                ☰
            </button>}
        </header>
    );
}
