//client side routing
'use client';
import React , {useState, useEffect} from "react";

import SellerCard from "./components/SellerCard";

interface Sellers {
  seller_details: {
    category: string;
    business_name: string;
    bus_description: string;
  };
  profile_img: string;
  _id: string;
}


export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [sellers, setSellers] = useState<Sellers[]>([]);


  useEffect(() => {
  async function fetchCardData() {
    try {
      const response = await fetch('/api/getAllSellers');
      const data = await response.json();
      console.log(data);
      setSellers(data);
    } catch (error) {
      console.error('Error fetching card data:', error);
    }
  }

  fetchCardData();
  }, []);

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
    <div style={{ paddingTop: '60px', margin:'0 auto' }}>
      <h1 style={{ fontSize: '2em' }}>Welcome To Handcrafted Haven</h1>
      <p>Handcrafted Haven is a platform for artisans to showcase their work and sell their products. Here are some of our sellers. Click on their card to check out their page</p>
      <div style={{ display: 'flex', flexWrap:'wrap', margin: '0 auto', flexDirection: isMobile? 'column' : 'row' , paddingTop:'20px', paddingBottom:'20px', columnCount: isMobile? 1:3}}>
      {sellers.map((seller) => (
      <SellerCard
        key={seller.seller_details.business_name}
        sellerName={seller.seller_details.business_name}
        sellerCategory={seller.seller_details.category}
        sellerImg={seller.profile_img}
        sellerDescription={seller.seller_details.bus_description}
        _id={seller._id}
      />
      ))}
      </div>
    </div>
  );
}
