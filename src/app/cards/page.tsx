"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
 
interface Card {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
}
 
export default function CardsPage() {
  const [cardData, setCardData] = useState<Card[]>([]);
 
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('/api/getAllProducts');
        if (response.ok) {
          const data = await response.json();
          setCardData(data);
        } else {
          console.error("Failed to fetch products:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
 
    fetchCards();
  }, []);
 
  return (
    <div>
      <h1>Cards</h1>
      <div className="card-list">
        {cardData.map((card) => (
          <div key={card._id} className="card-item">
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            <Link href={`/cards/card-view/${card._id}`}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}