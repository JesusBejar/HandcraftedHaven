import React from 'react';


export default function SellerCard({ sellerName, sellerCategory, sellerImg, _id, sellerDescription }) {
    return (
        
        <div style={{width: '300px', height:'420px', boxShadow: '1px 1px 5px grey', borderRadius: '10px', alignSelf: 'center', margin:'10px'}}>
            <div alt={sellerName} style={{borderRadius:'10px 10px 0px 0px', width:'300px', height:'200px', backgroundImage: `url(${sellerImg})`, backgroundSize:'cover', backgroundPosition:'center', margin:'0'}}/> 
            <h2 style={{fontSize:'1em', fontWeight:'bold'}}>{sellerName.toUpperCase()}</h2>
            <p>Category: {sellerCategory}</p>
           <a href={`/profile/${_id}`}>Visit Their Page</a>
</div>
        
    )
}
