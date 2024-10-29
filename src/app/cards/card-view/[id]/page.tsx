// app/cards/card-view/[id]/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Product {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  price: number;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams(); 
  const router = useRouter(); // Access the router for navigation
  const [productData, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const response = await fetch(`/api/productsById/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }

        const data = await response.json();
        const productData = data.product;
        
        setProduct(productData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleBuyNow = () => {
    alert("Buy Now clicked!");
  };

  const handleAddToCart = () => {
    alert("Added to cart!");
  };

  const goBackToCardsPage = () => {
    router.push('/cards'); // Navigate back to the cards page
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!productData) {
    return <p>No product found.</p>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      {/* Back Link */}
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={goBackToCardsPage} 
          style={{ 
            backgroundColor: 'transparent', 
            color: '#0070f3', 
            border: 'none', 
            cursor: 'pointer', 
            textDecoration: 'underline' 
          }}
        >
          &larr; Back to Cards
        </button>
      </div>

      {/* Page Title */}
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Product Details</h1>

      <div style={{ border: '1px solid #0b7a75', borderRadius: '8px', padding: '16px', textAlign: 'center', backgroundColor: '#F0F3F5' }}>
        {productData.imageUrl && (
          <img
            src={productData.imageUrl}
            alt={productData.title}
            style={{ width: '100%', maxWidth: '500px', borderRadius: '8px', marginBottom: '20px' }}
          />
        )}
        <h2>{productData.title}</h2>
        <p style={{ fontSize: '20px', fontWeight: 'bold' }}>${productData.price}</p>
        <p>{productData.description}</p>

        {/* Buy Now and Add to Cart Buttons */}
        <div style={{ marginTop: '20px' }}>
        <button 
      onClick={handleBuyNow} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        padding: '10px 20px', 
        margin: '10px', 
        backgroundColor: isHovered ? '#ef4444' : '#7f1d1d', // Darker red on hover
        color: 'white', 
        border: 'none', 
        borderRadius: '5px', 
        cursor: 'pointer',
        transition: 'background-color 0.3s ease' // Smooth transition
      }}
    >
            Buy Now
          </button>
          <button 
            onClick={handleAddToCart} 
            style={{ 
              padding: '10px 20px', 
              margin: '10px', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: 'pointer' 
            }}

            className="text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
