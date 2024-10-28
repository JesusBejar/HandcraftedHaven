//client side routing
'use client';
import React , {useState, useEffect} from "react";

import SellerCard from "./components/SellerCard";

const sellers = [
 {
  img: 'https://assets.weforum.org/article/image/responsive_big_webp_RZ1E1wABkNXxD1b1rOO49bmLKLAsN7k85jQwVYsBOkw.webp',
  sellerName: "Sally's Soap",
  sellerCategory: "Soap",
 },
  {
    img: 'https://assets.weforum.org/article/image/responsive_big_webp_RZ1E1wABkNXxD1b1rOO49bmLKLAsN7k85jQwVYsBOkw.webp',
    sellerName: "Jenny's Jewelry",
    sellerCategory: "Jewelry",
  },
  {
    img: 'https://assets.weforum.org/article/image/responsive_big_webp_RZ1E1wABkNXxD1b1rOO49bmLKLAsN7k85jQwVYsBOkw.webp',
    sellerName: "Tom's T-Shirts",
    sellerCategory: "Clothing",
  }
];

export default function Home() {
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
    <div style={{ padding: '20px', margin:'0 auto' }}>
      <h1 style={{ fontSize: '2em' }}>Welcome To Handcrafted Haven</h1>
      <p>Handcrafted Haven is a platform for artisans to showcase their work and sell their products. Here are some of our sellers. Click on their card to check out their page</p>
      <div style={{ display: 'flex', margin: '0 auto', flexDirection: isMobile? 'column' : 'row' }}>
      {sellers.map((seller) => (
      <SellerCard
        key={seller.sellerName}
        sellerName={seller.sellerName}
        sellerCategory={seller.sellerCategory}
        sellerImg={seller.img}
      />
      ))}
      </div>
    </div>
  );
}
