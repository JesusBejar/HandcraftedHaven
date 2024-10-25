import React from 'react';

const cardData = [
  { id: 1, title: 'Card 1', description: 'This is the first card.' },
  { id: 2, title: 'Card 2', description: 'This is the second card.' },
  { id: 3, title: 'Card 3', description: 'This is the third card.' },
];

export default function cardViewPage() {
  const card = cardData.find((card) => card.id);

  if (!card) {
    return <p>Card not found!</p>;
  }

  return (
    <div>
      <h1>{card.title}</h1>
      <p>{card.description}</p>
    </div>
  );
};
