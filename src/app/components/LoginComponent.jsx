import Cookies from "js-cookie";
import React from "react";

export default function LoginComponent() {
    const isLoggedIn = Cookies.get('token');
    return (  
       <button style={{color:'white', maxWidth:'60px' , border:'10px', margin:'0 auto', padding:'10px'}} onClick={() => { if (isLoggedIn) { Cookies.remove() } else { window.location.assign('/login'); } }}>{isLoggedIn ? 'Logout' : 'Login'}</button>
    );
}