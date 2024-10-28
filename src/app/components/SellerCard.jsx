import React from 'react';
import Image from 'next/image';


export default function SellerCard({ sellerName, sellerCategory, sellerImg }) {
    
    return (
        <div style={{maxWidth: '300px', maxHeight:'400px', boxShadow: '1px 1px 5px grey', padding:'20px', borderRadius: '10px', margin:'10px', alignSelf: 'center'}}>
            <Image src={sellerImg} alt={sellerName} style={{borderRadius:'10px'}}/> 
            <h2>{sellerName}</h2>
            <p>{sellerCategory}</p>
        </div>
    );
}
