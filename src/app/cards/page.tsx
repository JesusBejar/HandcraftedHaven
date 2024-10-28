'use client';

import React, { useEffect, useState } from 'react';
import Card from './card-view/page';

interface Card {
    id: string;
    title: string;
    price?: number;
    description: string;
    imageUrl: string;
}

const CardsPage: React.FC = () => {
    const [cardData, setCardData] = useState<Card[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term
    const [minPrice, setMinPrice] = useState<number | ''>(''); // State for minimum price filter
    const [maxPrice, setMaxPrice] = useState<number | ''>(''); // State for maximum price filter

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch('/api/getAllProducts');
                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }

                // Fetch product data from MongoDB and transform it
                const data = await response.json();
                const transformedData = data.map((product: any) => ({
                    id: product._id,
                    title: product.title,
                    description: product.description,
                    imageUrl: product.imageUrl,
                    price: product.price || 0,
                }));

                setCardData(transformedData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, []);

    const filteredCards = cardData.filter(card => {
        const matchesSearch = 
            card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesPrice =
            (minPrice === '' || (card.price && card.price >= minPrice)) &&
            (maxPrice === '' || (card.price && card.price <= maxPrice));

        return matchesSearch && matchesPrice;
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Products</h1>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    padding: '10px',
                    marginBottom: '10px',
                    width: '100%',
                    maxWidth: '400px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                }}
            />

            {/* Price Filter */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    style={{
                        padding: '10px',
                        width: '100%',
                        maxWidth: '150px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                    }}
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    style={{
                        padding: '10px',
                        width: '100%',
                        maxWidth: '150px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                    }}
                />
            </div>

            <div className="card-list" style={{ display: 'flex', flexWrap: 'wrap' }}>
                {filteredCards.length > 0 ? (
                    filteredCards.map((card) => (
                        <Card key={card.id} {...card} />
                    ))
                ) : (
                    <div>No products found</div>
                )}
            </div>
        </div>
    );
};

export default CardsPage;
