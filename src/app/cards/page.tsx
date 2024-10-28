'use client'

import React, { useEffect, useState } from 'react';
import Card from './card-view/page';

interface Card {
    id: number;
    title: string;
    price: number;
    description: string;
    imageUrl: string;
}

const CardsPage: React.FC = () => {
    const [cardData, setCardData] = useState<Card[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch('/api/cards/cards'); 
                if (!response.ok) {
                    throw new Error('Failed to fetch card data');
                }
                const data: Card[] = await response.json();
                setCardData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Cards</h1>
            <div className="card-list" style={{ display: 'flex', flexWrap: 'wrap' }}>
                {cardData.map((card) => (
                    <Card key={card.id} {...card} />
                ))}
            </div>
        </div>
    );
};

console.log(Card)
export default CardsPage;
