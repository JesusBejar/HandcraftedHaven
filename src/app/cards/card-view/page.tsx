'use client'

import React from 'react';
import Link from 'next/link';

interface CardProps {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
}

const Card: React.FC<CardProps> = ({ id, title, price, imageUrl }) => {
    return (
        <div
            className="card-item"
            style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                margin: '16px',
                width: '250px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
            }}
        >
            <img
                alt={title}
                style={{ width: '100%', borderRadius: '4px' }}
            />
            <h2>{title}</h2>
            <p>{price}</p>
            <Link href={`/cards/card-view/${id}`}>
                <a style={{ textDecoration: 'none', color: '#0070f3' }}>View Details</a>
            </Link>
        </div>
    );
};

export default Card;