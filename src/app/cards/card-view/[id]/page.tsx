// app/cards/card-view/[id]/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Product {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string; // ISO string for date
  price: number;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams(); // Get the id from the URL parameters
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
        if (!id) return; // Ensure id is available before fetching

        try {
            const response = await fetch(`/api/productsById/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch product data');
            }

            const data = await response.json();
            console.log(data); // Check the structure of the data

            // Check if the data is an array and access the first item
            const productData = Array.isArray(data) ? data[0] : data;

            setProduct(productData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    fetchProduct();
}, [id]);


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
        {product?.imageUrl && (
          <img
            src={product.imageUrl}
            alt={product.title}
            style={{ width: '100%', maxWidth: '500px', borderRadius: '8px', marginBottom: '20px' }}
          />
        )}
        <h2>{product?.title}</h2>
        {product?.price && <p style={{ fontSize: '20px', fontWeight: 'bold' }}>${product.price}</p>}
        <p>{product?.description}</p>
      </div>
    </div>
  );
};

export default ProductDetailPage;
