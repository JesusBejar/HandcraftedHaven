'use client';
import React, {useState, useEffect} from 'react';
import Link from 'next/link';

// call our get all products endpoint to get card data
interface CardData {
  _id: string;
  title: string;
  description: string;
}

export default function Cards() {
  const [cardData, setCardData] = useState<CardData[]>([]);
useEffect(() => {
  async function fetchCardData() {
    try {
      const response = await fetch('/api/getAllProducts');
      const data = await response.json();
      setCardData(data);
    } catch (error) {
      console.error('Error fetching card data:', error);
    }
  }

  fetchCardData();
}, []);
  return (
    <div>
      <h1>Cards</h1>
      <div className="card-list">
        {cardData.map((card) => (
          <div key={card._id} className="card-item">
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            <Link href={`/cards/${card._id}`}>
              <a>View Details</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};