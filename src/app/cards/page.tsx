import React from 'react';
import Link from 'next/link';

interface Card {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const cardData: Card[] = [];

export default function cardsPage() {
  return (
    <div>
      <h1>Cards</h1>
      <div className="card-list">
        {cardData.map((card) => (
          <div key={card.id} className="card-item">
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            <Link href={`/cards/card-view/${card.id}`}>
              <a>View Details</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};