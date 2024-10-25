import React from 'react';
// import {Image } from 'next/image';

export default function SellerCard({ sellerName, sellerCategory }) {
    return (
        <div style={{maxWidth: '100px'}}>
        {/* <Image src={sellerImg} alt={sellerName} width={100} height={100} /> */}
        <h2>{sellerName}</h2>
        <p>{sellerCategory}</p>
        </div>
    );
}
