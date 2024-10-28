/* eslint-disable @next/next/no-img-element */
import React from 'react';



export default function SellerCard({ sellerName, sellerCategory, sellerImg }) {
    
    return (
        <div style={{maxWidth: '300px', maxHeight:'400px', boxShadow: '1px 1px 5px grey', padding:'20px', borderRadius: '10px', margin:'10px'}}>
        
        <img src={sellerImg} alt={sellerName} style={{maxWidth:'100%'}}/> 
        <h2>{sellerName}</h2>
        <p>{sellerCategory}</p>
        </div>
    );
}
