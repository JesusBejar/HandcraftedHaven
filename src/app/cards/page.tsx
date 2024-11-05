'use client';

import React, { useState } from 'react';
import useFetchCards from '../ui/useFetchCards'; // Import your custom hook
import Link from 'next/link'; // Import Link from Next.js

interface Card {
    id: string;
    title: string;
    price?: number;
    description: string;
    imageUrl: string;
}

const CardsPage: React.FC = () => {
    const { cardData, loading, error } = useFetchCards(); // Use the custom hook
    const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term
    const [minPrice, setMinPrice] = useState<number | ''>(''); // State for minimum price filter
    const [maxPrice, setMaxPrice] = useState<number | ''>(''); // State for maximum price filter

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
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-600">Error: {error}</div>;
    }

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Products</h1>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 mb-4 border border-gray-300 rounded-md w-full max-w-md"
            />

            {/* Price Filter */}
            <div className="flex gap-2 mb-5">
                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="p-2 border border-gray-300 rounded-md w-full max-w-[150px]"
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="p-2 border border-gray-300 rounded-md w-full max-w-[150px]"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCards.length > 0 ? (
                    filteredCards.map((card) => (
                        <div key={card.id} className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                            <img src={card.imageUrl} alt={card.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold">{card.title}</h2>
                                <p className="text-gray-700">{card.description}</p>
                                <p className="text-gray-900 font-bold">Price: ${card.price}</p>
                                {/* Link to details page */}
                                <Link href={`/cards/card-view/${card.id}`}>
                                    Details
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No products found</div>
                )}
            </div>
        </div>
    );
};

export default CardsPage;
