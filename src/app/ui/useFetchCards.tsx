"use client"
import { useEffect, useState } from 'react';

interface Card {
    id: string;
    title: string;
    price?: number;
    description: string;
    imageUrl: string;
}

const useFetchCards = () => {
    const [cardData, setCardData] = useState<Card[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch('/api/getAllProducts');
                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }

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

    return { cardData, loading, error };
};

export default useFetchCards;
