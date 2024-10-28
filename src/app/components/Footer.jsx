'use client';
import React, { useState, useEffect } from 'react';


const css = {margin: '0 auto',padding: '10px',position: 'absolute',width: '100%', boxShadow: '0px 5px 0px 5px #000', backgroundColor: 'white', textAlign: 'center'};
const desktopCSS = {margin: '0 auto',padding: '10px',width: '100%', boxShadow: '0px 5px 0px 5px #000', backgroundColor: 'white', textAlign: 'center'};
export default function Footer() {
    const [isMobile, setIsMobile] = useState(false);
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
    return (
        <footer style={isMobile? css : desktopCSS}>
            <p>Kalina Warner | Alyssa Kucharyski | Marcos Antunes | Jose Albancado | Terence Borjal | Jesus Israel Bejar</p> 
            <p>Handcrafted Heaven © 2024</p>
        </footer>
    );
    }
