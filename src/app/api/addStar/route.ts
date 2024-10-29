import { NextResponse } from 'next/server';
import dbConnect from '@/src/db/db';
// import Star from '@/src/models/starModels'; 
import mongoose from 'mongoose';

export async function POST(req: Request) {
  try {
    await dbConnect();

    // Parse the request body for the new star data
    const body = await req.json();
    const { productId, userId } = body;

    // Validate the input
    if (!productId || !userId) {
      return NextResponse.json({ msg: 'Product ID and User ID are required' }, { status: 400 });
    }

    // Check if productId and userId are valid ObjectIds
    if (!mongoose.Types.ObjectId.isValid(productId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ msg: 'Invalid Product ID or User ID' }, { status: 400 });
    }

    // Create a new star
    const newStar = new Star({
      productId,
      userId,
    });

    // Save the star to the database
    await newStar.save();

    return NextResponse.json({ msg: 'Star added successfully', star: newStar }, { status: 201 });
  } catch (error) {
    console.error("Error adding star:", error);
    return NextResponse.json({ msg: 'Failed to add star', error }, { status: 500 });
  }
}
