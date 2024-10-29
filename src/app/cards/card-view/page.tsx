

import React from 'react';
import Link from 'next/link';

interface CardProps {
    id: string; // Change from number to string to match MongoDB `_id`
    title: string;
    price?: number;
    description: string;
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
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                backgroundColor: '#fff',
                transition: 'transform 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            <img
                src={imageUrl}
                alt={title}
                style={{ 
                    width: '100%', 
                    height: '150px', 
                    borderRadius: '4px', 
                    objectFit: 'cover', 
                    marginBottom: '12px' 
                }}
            />
            <h2 style={{ fontSize: '20px', color: '#333', margin: '8px 0' }}>{title}</h2>
            {price !== undefined && (
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#4CAF50' }}>
                    ${price.toFixed(2)}
                </p>
            )}
           <Link
  href={`/cards/card-view/${id}`}
  style={{
    textDecoration: 'none',
    color: '#0070f3',
    fontSize: '16px',
    marginTop: '12px',
    display: 'inline-block',
  }}
>
  View Details
</Link>
        </div>
    );
};

export default Card;
