import React from 'react';
import Link from 'next/link';
import mongoose from 'mongoose';
import Product from '../../models/productModels'; // Adjust the path if necessary

interface Card {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface CardsPageProps {
  products: Card[];
}

export default function CardsPage({ products }: CardsPageProps) {
  return (
    <div>
      <h1>Products</h1>
      <div className="card-list">
        {products.map((product) => (
          <div key={product._id} className="card-item">
            <img src={product.imageUrl} alt={product.title} width={200} height={150} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <Link href={`/cards/${product._id}`}>
              <a>View Details</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  await mongoose.connect(process.env.MONGODB_URI!);

  const products = await Product.find({}).lean();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}